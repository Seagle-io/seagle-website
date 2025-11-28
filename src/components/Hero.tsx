import React from 'react'
import { useI18n } from '../i18n.jsx'
import logo from '@/assets/seagle_logo.png'

interface HeroProps {
    navigate?: (path: string) => void
}

export default function Hero({ navigate }: HeroProps) {
    const { t } = useI18n()
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
            {/* Background Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 ">
                <img src={logo} alt="" className="w-[80vw] max-w-[800px] h-auto object-contain grayscale" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                    {t('hero.catch_phrase')}
                </h1>

                <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
                    {t('hero.text')}
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <span className="px-5 py-2.5 rounded-full bg-surface border border-border text-sm font-medium text-accent-2 tracking-wide">
                        {t('hero.tag1')}
                    </span>
                    <span className="px-5 py-2.5 rounded-full bg-surface border border-border text-sm font-medium text-accent-2 tracking-wide">
                        {t('hero.tag2')}
                    </span>
                </div>
            </div>
        </section>
    )
}
