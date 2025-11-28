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
    const to = 'contact@seagle.io'
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
    <form className="grid gap-3.5" onSubmit={onSubmit}>
      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-text">{t('contact.name')}</label>
        <input className="w-full rounded-xl border border-border bg-surface-soft text-text px-3.5 py-3 font-sans text-[15px] transition-colors duration-300 focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-[rgba(24,184,196,0.18)]" type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('contact.namePh')} required />
      </div>
      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-text">{t('contact.email')}</label>
        <input className="w-full rounded-xl border border-border bg-surface-soft text-text px-3.5 py-3 font-sans text-[15px] transition-colors duration-300 focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-[rgba(24,184,196,0.18)]" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
      </div>
      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-text">{t('contact.subject')}</label>
        <input className="w-full rounded-xl border border-border bg-surface-soft text-text px-3.5 py-3 font-sans text-[15px] transition-colors duration-300 focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-[rgba(24,184,196,0.18)]" type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder={t('contact.subjectPh')} />
      </div>
      <div className="grid gap-1.5">
        <label className="text-sm font-semibold text-text">{t('contact.message')}</label>
        <textarea className="w-full rounded-xl border border-border bg-surface-soft text-text px-3.5 py-3 font-sans text-[15px] transition-colors duration-300 focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-[rgba(24,184,196,0.18)] resize-y max-w-full" value={message} onChange={e => setMessage(e.target.value)} placeholder={t('contact.messagePh')} rows={6} required />
      </div>
      <div className="flex justify-end">
        <button className="no-underline px-[22px] py-[14px] rounded-[14px] font-semibold inline-flex items-center gap-2 border border-transparent transition-all duration-250 ease-out bg-[linear-gradient(130deg,var(--accent),var(--accent-2))] text-[#043640] shadow-[0_18px_36px_rgba(24,184,196,0.28)] hover:-translate-y-[2px] hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!isValid}>{t('contact.send')}</button>
      </div>
      {status ? <div className="text-muted text-[13px]" aria-live="polite">{status}</div> : null}
    </form>
  )
}
