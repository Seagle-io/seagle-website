import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function About() {
    const { t } = useI18n()

    return (
        <section id="about" className="relative z-10 py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">{t('about.title')}</h2>
                <div className="flex flex-col gap-6 text-lg text-muted leading-relaxed">
                    <p>{t('about.text1')}</p>
                    <p className="text-white font-medium">{t('about.text2')}</p>
                    <p>{t('about.text3')}</p>
                </div>
            </div>
        </section>
    )
}
