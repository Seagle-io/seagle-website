import React, { useMemo, useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { z } from 'zod'

const DEFAULT_MODEL = {
  name: 'Product',
  fields: {
    name: 'string',
    price: 'number',
    description: 'string',
    tags: 'string[]',
  },
}

const STOPWORDS = new Set([
  'the','a','an','and','or','but','for','nor','so','to','of','in','on','at','by','with','from','as','is','it','that','this','these','those','are','be','was','were','will','would','can','could','should','about','into','over','than','then','too','very','if','when','while','just','not','no','yes'
])

function toKeywords(text, max = 6) {
  const freq = new Map()
  for (const raw of text.toLowerCase().match(/[a-zA-Z][a-zA-Z\-]{2,}/g) || []) {
    if (STOPWORDS.has(raw)) continue
    freq.set(raw, (freq.get(raw) || 0) + 1)
  }
  return [...freq.entries()]
    .sort((a,b) => b[1]-a[1])
    .slice(0, max)
    .map(([w]) => w)
}

function extractPrice(text) {
  const currency = text.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/)
  if (currency) return Number(currency[1])
  const number = text.match(/\b([0-9]+(?:\.[0-9]{1,2})?)\b/)
  if (number) return Number(number[1])
  return undefined
}

function firstSentence(text) {
  const m = text.trim().match(/[^.!?]+[.!?]?/)
  return m ? m[0].trim() : text.trim()
}

function deriveName(text) {
  const line = firstSentence(text)
  // Grab a capitalized phrase up to 6 words
  const m = line.match(/([A-Z][\w\-]*(?:\s+[A-Z][\w\-]*){0,5})/)
  if (m) return m[1].trim()
  return line.split(/[,\-:–—]/)[0].slice(0, 60).trim()
}

function generateStructuredData(model, prompt) {
  const fields = model.fields || {}
  const out = {}

  for (const [key, type] of Object.entries(fields)) {
    const t = String(type).toLowerCase()
    if (t === 'string') {
      if (key === 'name') out[key] = deriveName(prompt)
      else if (key === 'description') out[key] = firstSentence(prompt)
      else out[key] = prompt.slice(0, 120)
    } else if (t === 'number') {
      const price = extractPrice(prompt)
      out[key] = typeof price === 'number' ? price : Number((Math.random()*100).toFixed(2))
    } else if (t === 'string[]') {
      out[key] = toKeywords(prompt, 6)
    } else if (t === 'boolean') {
      out[key] = /\b(yes|true|enable|enabled|on)\b/i.test(prompt)
    } else {
      out[key] = null
    }
  }

  return out
}

export default function ModelOrientedAI() {
  const { t } = useI18n()
  const [modelText, setModelText] = useState(JSON.stringify(DEFAULT_MODEL, null, 2))
  const [prompt, setPrompt] = useState('Introducing Aurora Mug — a double‑walled stainless steel coffee mug, 12oz, leak‑proof lid, keeps drinks hot for 6 hours. Perfect for commuters and campers. $24.99 launch price.')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])

  const parsedModel = useMemo(() => {
    try {
      const m = JSON.parse(modelText)
      setError('')
      return m
    } catch (e) {
      setError('Model JSON is invalid')
      return null
    }
  }, [modelText])

  function zodForModel(model){
    const fields = model?.fields || {}
    const shape = {}
    for (const [k, t] of Object.entries(fields)){
      const tt = String(t).toLowerCase()
      if (tt === 'string') shape[k] = z.string()
      else if (tt === 'number') shape[k] = z.number()
      else if (tt === 'string[]') shape[k] = z.array(z.string())
      else if (tt === 'boolean') shape[k] = z.boolean()
      else shape[k] = z.any()
    }
    return z.object(shape)
  }

  function onGenerate() {
    if (!parsedModel) return
    const out = generateStructuredData(parsedModel, prompt)
    const schema = zodForModel(parsedModel)
    const res = schema.safeParse(out)
    if (!res.success){
      setValidationErrors(res.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })))
    } else {
      setValidationErrors([])
    }
    setResult(out)
  }

  function onCopy(json) {
    navigator.clipboard?.writeText(json).catch(() => {})
  }

  function onExport(json) {
    try {
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'structured-data.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      // no-op
    }
  }

  const sampleOutput = useMemo(() => {
    if (!parsedModel) return ''
    return JSON.stringify(generateStructuredData(parsedModel, prompt), null, 2)
  }, [parsedModel, prompt])

  return (
    <section className="moai">
      <div className="panel presets">
        <div style={{display:'flex', gap:8, flexWrap:'wrap', alignItems:'center'}}>
          <strong>Presets:</strong>
          <button className="ghost" onClick={()=>{
            const p = { name:'Product', fields:{ name:'string', price:'number', description:'string', tags:'string[]' } }
            setModelText(JSON.stringify(p,null,2))
          }}>Produit</button>
          <button className="ghost" onClick={()=>{
            const a = { name:'Article', fields:{ title:'string', summary:'string', author:'string', tags:'string[]' } }
            setModelText(JSON.stringify(a,null,2))
          }}>Article</button>
          <button className="ghost" onClick={()=>{
            const u = { name:'Profile', fields:{ username:'string', bio:'string', verified:'boolean' } }
            setModelText(JSON.stringify(u,null,2))
          }}>Profil</button>
          <button className="ghost" onClick={()=>{
            setModelText(JSON.stringify(DEFAULT_MODEL,null,2))
            setPrompt('')
            setValidationErrors([])
          }}>Reset</button>
        </div>
      </div>
      <div className="panel">
        <h2>{t('moai.step1')}</h2>
        <p className="hint">{t('moai.step1.hint')}</p>
        <textarea
          value={modelText}
          onChange={(e) => setModelText(e.target.value)}
          spellCheck={false}
          className={`code ${error ? 'has-error' : ''}`}
          aria-invalid={!!error}
        />
        {error ? <div className="error">{error}</div> : null}
      </div>

      <div className="panel">
        <h2>{t('moai.step2')}</h2>
        <p className="hint">{t('moai.step2.hint')}</p>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="prompt"
        />
        <button className="primary" onClick={onGenerate} disabled={!parsedModel}>{t('moai.generate')}</button>
      </div>

      <div className="panel">
        <h2>{t('moai.step3')}</h2>
        <div className="actions">
          <button onClick={() => onCopy(sampleOutput)}>{t('moai.copy')}</button>
          <button onClick={() => onExport(sampleOutput)}>{t('moai.export')}</button>
        </div>
        <pre className="code" aria-live="polite">{sampleOutput}</pre>
        {validationErrors.length > 0 && (
          <div className="error" role="alert">
            {validationErrors.map((e, i) => (
              <div key={i}>{e.path}: {e.message}</div>
            ))}
          </div>
        )}
        {result && (
          <details className="details">
            <summary>Last generated object</summary>
            <pre className="code">{JSON.stringify(result, null, 2)}</pre>
          </details>
        )}
      </div>
    </section>
  )
}
