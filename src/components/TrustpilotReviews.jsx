import React from 'react'
import { useI18n } from '../i18n.jsx'

export default function TrustpilotReviews() {
    const { t } = useI18n()

    const reviews = [
        {
            id: 1,
            author: 'Jean Dupont',
            role: 'CTO, TechCorp',
            title: t('reviews.1.title'),
            text: t('reviews.1.text'),
            stars: 5,
        },
        {
            id: 2,
            author: 'Sarah Connor',
            role: 'Head of Data, SkyNet',
            title: t('reviews.2.title'),
            text: t('reviews.2.text'),
            stars: 5,
        },
        {
            id: 3,
            author: 'Marc Zuckerberg',
            role: 'CEO, Meta',
            title: t('reviews.3.title'),
            text: t('reviews.3.text'),
            stars: 5,
        },
    ]

    return (
        <section className="py-[60px] border-b border-border relative z-10">
            <div className="max-w-[1160px] mx-auto flex flex-col gap-8 px-5">
                <div className="flex flex-col items-center gap-2.5 mb-10">
                    <div className="flex items-center gap-2 text-2xl font-bold text-text">
                        <span className="text-accent">★</span>
                        <span>Trustpilot</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="text-accent tracking-[2px] text-xl">★★★★★</div>
                        <span>Excellent <strong>4.9/5</strong></span>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="flex flex-col gap-3 p-6 bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[24px] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group">
                            <div className="text-accent text-lg tracking-[1px]">{'★'.repeat(review.stars)}</div>
                            <h4 className="m-0 text-lg font-semibold">{review.title}</h4>
                            <p className="text-muted italic grow">"{review.text}"</p>
                            <div className="flex flex-col text-sm mt-3 border-t border-border pt-3">
                                <strong className="text-text">{review.author}</strong>
                                <span className="text-muted">{review.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
