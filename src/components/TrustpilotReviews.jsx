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
        <section className="trustpilot-section">
            <div className="section-inner">
                <div className="trustpilot-header">
                    <div className="trustpilot-logo-row">
                        <span className="trustpilot-star">★</span>
                        <span className="trustpilot-brand">Trustpilot</span>
                    </div>
                    <div className="trustpilot-rating">
                        <div className="stars">★★★★★</div>
                        <span>Excellent <strong>4.9/5</strong></span>
                    </div>
                </div>

                <div className="reviews-grid">
                    {reviews.map((review) => (
                        <div key={review.id} className="review-card glass-card">
                            <div className="review-stars">{'★'.repeat(review.stars)}</div>
                            <h4 className="review-title">{review.title}</h4>
                            <p className="review-text">"{review.text}"</p>
                            <div className="review-author">
                                <strong>{review.author}</strong>
                                <span>{review.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
