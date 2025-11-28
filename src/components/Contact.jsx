import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Contact() {
    const { t } = useI18n()

    return (
        <section id="contact" className="relative py-[120px] px-6 text-center z-10">
            <div className="max-w-[600px] mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
                    {t('contact.title')}
                </h2>
                <p className="text-lg text-muted mb-10 leading-relaxed">
                    {t('contact.text')}
                </p>

                <div className="flex flex-wrap justify-center gap-5">
                    <a
                        href="mailto:contact@seagle.fr"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium text-sm transition-transform hover:-translate-y-0.5"
                    >
                        {t('contact.cta_primary')}
                    </a>
                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border text-primary font-medium text-sm bg-transparent hover:bg-surface transition-colors"
                    >
                        {t('contact.cta_secondary')}
                    </a>
                </div>
            </div>
        </section>
    )
}
