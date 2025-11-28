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
        <section className="partners-section" aria-label={t('partners.label')}>
            <div className="partners-container">
                <p className="partners-label">{t('partners.title')}</p>
                <div className="marquee-wrapper">
                    <div className="marquee-content">
                        {allPartners.map((p, i) => (
                            <div key={i} className="partner-logo">
                                <img src={p.logo} alt={p.name} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
