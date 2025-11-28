import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Expertise() {
    const { t } = useI18n()

    const pillars = [
        {
            label: t('expertise.pillar1.label'),
            text: t('expertise.pillar1.text'),
        },
        {
            label: t('expertise.pillar2.label'),
            text: t('expertise.pillar2.text'),
        },
    ]

    return (
        <section id="expertise" className="relative z-10 py-24 px-6 bg-surface-soft/30">
            <div className="max-w-6xl mx-auto">
                <div className="max-w-3xl mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t('expertise.title')}</h2>
                    <p className="text-lg text-muted leading-relaxed">{t('expertise.intro')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {pillars.map((pillar, idx) => (
                        <div key={idx} className="bg-surface border border-border rounded-3xl p-8 md:p-10 hover:border-accent/30 transition-colors duration-300">
                            <h3 className="text-xl md:text-2xl font-bold text-accent-2 mb-4">{pillar.label}</h3>
                            <p className="text-muted leading-relaxed">{pillar.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
