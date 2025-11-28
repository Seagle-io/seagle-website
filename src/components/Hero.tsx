import React from 'react'
import { useI18n } from '../i18n.jsx'
import logo from '@/assets/seagle_logo.png'

interface HeroProps {
    navigate?: (path: string) => void
}

export default function Hero({ navigate }: HeroProps) {
    const { t } = useI18n()
    return (
        <section id="hero" className="relative z-10 pt-[140px] px-5 pb-[100px]" aria-label="Accueil">
            <div className="max-w-[1200px] mx-auto relative">
                <div className="flex flex-col relative">
                    <img className="absolute opacity-10 pointer-events-none max-w-[50%] right-0 top-1/2 -translate-y-1/2" src={logo} alt="Logo" />
                    <div className="flex flex-col gap-[22px] w-full relative z-10">
                        <div className="flex flex-col gap-1.5 uppercase tracking-[0.18em] text-[13px] text-accent-2">
                            <span className="font-extrabold text-4xl tracking-[0.3em]">SEAGLE</span>
                        </div>
                        <h1 className="m-0 text-[clamp(32px,6vw,60px)] leading-[1.1] font-bold">{t('hero.title')}</h1>
                        <p className="text-muted mb-[18px]">{t('hero.subtitle')}</p>
                        <div className="flex gap-3.5 flex-wrap">
                            <a
                                className="no-underline px-[22px] py-[14px] rounded-[14px] font-semibold inline-flex items-center gap-2 border border-transparent transition-all duration-250 ease-out bg-[linear-gradient(130deg,var(--accent),var(--accent-2))] text-[#043640] shadow-[0_18px_36px_rgba(24,184,196,0.28)] hover:-translate-y-0.5 hover:brightness-105 relative after:content-[''] after:absolute after:-inset-2 after:rounded-[inherit] after:border after:border-[rgba(24,184,196,0.35)] after:opacity-0 after:animate-[pulse_2.6s_ease_infinite]"
                                href="#contact"
                            >
                                {t('hero.cta')}
                            </a>
                            <button
                                type="button"
                                className="no-underline px-[22px] py-[14px] rounded-[14px] font-semibold inline-flex items-center gap-2 border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] transition-all duration-250 ease-out"
                                onClick={() => navigate?.('/contact')}
                            >
                                {t('hero.secondary')}
                            </button>
                        </div>
                        <div className="flex gap-10 mt-10">
                            <div className="flex flex-col">
                                <strong className="text-accent-2 text-[18px]">+500</strong>
                                <span className="text-[12px] text-muted uppercase">Clients</span>
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-accent-2 text-[18px]">3</strong>
                                <span className="text-[12px] text-muted uppercase">Continents</span>
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-accent-2 text-[18px]">24/7</strong>
                                <span className="text-[12px] text-muted uppercase">Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
