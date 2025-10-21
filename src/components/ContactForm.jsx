import React, { useMemo, useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function ContactForm() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const isValid = useMemo(() => {
    const okName = name.trim().length >= 2
    const okEmail = /.+@.+\..+/.test(email)
    const okMsg = message.trim().length >= 10
    return okName && okEmail && okMsg
  }, [name, email, message])

  function onSubmit(e) {
    e.preventDefault()
    if (!isValid) {
      setStatus(t('contact.error'))
      return
    }
    const to = 'contact@seagle.ai'
    const subj = encodeURIComponent(`Seagle Contact: ${subject || t('contact.defaultSubject')}`)
    const bodyLines = [
      `${t('contact.name')}: ${name}`,
      `${t('contact.email')}: ${email}`,
      `${t('contact.subject')}: ${subject || '-'}`,
      '',
      message,
    ]
    const body = encodeURIComponent(bodyLines.join('\n'))
    const href = `mailto:${to}?subject=${subj}&body=${body}`
    try {
      window.location.href = href
      setStatus(t('contact.success'))
    } catch {
      setStatus(t('contact.error'))
    }
  }

  return (
    <div className="panel">
      <h2>{t('navbar.contact')}</h2>
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-row">
          <label>{t('contact.name')}</label>
          <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder={t('contact.namePh')} required />
        </div>
        <div className="form-row">
          <label>{t('contact.email')}</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required />
        </div>
        <div className="form-row">
          <label>{t('contact.subject')}</label>
          <input type="text" value={subject} onChange={e=>setSubject(e.target.value)} placeholder={t('contact.subjectPh')} />
        </div>
        <div className="form-row">
          <label>{t('contact.message')}</label>
          <textarea className="prompt" value={message} onChange={e=>setMessage(e.target.value)} placeholder={t('contact.messagePh')} rows={6} required />
        </div>
        <div className="form-actions">
          <button className="primary" disabled={!isValid}>{t('contact.send')}</button>
        </div>
        {status ? <div className="hint" aria-live="polite">{status}</div> : null}
      </form>
    </div>
  )
}

