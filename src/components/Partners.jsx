import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function Partners() {
    const { t } = useI18n()

    const partners = [
        { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
        { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
        { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
        { name: 'Oracle', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg' },
        { name: 'Salesforce', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
        { name: 'Nvidia', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
    ]

    // Duplicate the list for seamless scrolling
    const allPartners = [...partners, ...partners]

    return (
        <section className="py-10 bg-[rgba(10,30,63,0.3)] border-b border-border overflow-hidden relative z-10" aria-label={t('partners.label')}>
            <div className="max-w-[1200px] mx-auto text-center">
                <p className="text-sm uppercase tracking-[0.1em] text-muted mb-6">{t('partners.title')}</p>
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex gap-[60px] w-max animate-scroll">
                        {allPartners.map((p, i) => (
                            <div key={i} className="flex items-center justify-center h-10 opacity-60 transition-opacity duration-300 hover:opacity-100">
                                <img src={p.logo} alt={p.name} loading="lazy" className="h-full w-auto max-w-[120px] filter grayscale brightness-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
