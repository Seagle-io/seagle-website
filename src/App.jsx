import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero'
import Partners from './components/Partners.jsx'
import TrustpilotReviews from './components/TrustpilotReviews.jsx'
import Footer from './components/Footer.jsx'
import BackgroundWave from './components/BackgroundWave.jsx'
import FlowFieldParticles from './components/FlowFieldParticles.jsx'
import ContactForm from './components/ContactForm.jsx'
import { useI18n } from './i18n.jsx'

export default function App({ navigate }) {
  const { t } = useI18n()

  return (
    <div className="relative overflow-hidden isolate" id="top">
      <FlowFieldParticles fullscreen />
      <main className="relative z-10" id="main">
        <Hero navigate={navigate} />
        <Partners />

        {/* SOLUTIONS SECTION */}
        <section id="solutions" className="relative py-[100px] px-5 z-10 scroll-mt-[80px]">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-accent-2 bg-[rgba(24,184,196,0.1)] px-3 py-1.5 rounded border border-[rgba(24,184,196,0.2)] font-['Space_Grotesk']">{t('solutions.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('solutions.title')}</h2>
              <p className="text-muted mb-[18px]">{t('solutions.lead')}</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
              <div className="bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group animate-fade-in-up delay-100">
                <div className="w-12 h-12 bg-[rgba(24,184,196,0.1)] rounded-xl flex items-center justify-center text-accent-2 mb-5 text-2xl">⚡</div>
                <h3 className="text-lg font-bold mb-3">{t('solutions.card1.title')}</h3>
                <p className="text-muted mb-4">{t('solutions.card1.desc')}</p>
                <a href="#" className="no-underline px-4 py-2.5 rounded-full border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] font-semibold inline-flex items-center gap-2 text-sm">{t('solutions.cta')}</a>
              </div>
              <div className="bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group animate-fade-in-up delay-200">
                <div className="w-12 h-12 bg-[rgba(24,184,196,0.1)] rounded-xl flex items-center justify-center text-accent-2 mb-5 text-2xl">📊</div>
                <h3 className="text-lg font-bold mb-3">{t('solutions.card2.title')}</h3>
                <p className="text-muted mb-4">{t('solutions.card2.desc')}</p>
                <a href="#" className="no-underline px-4 py-2.5 rounded-full border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] font-semibold inline-flex items-center gap-2 text-sm">{t('solutions.cta')}</a>
              </div>
              <div className="bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group animate-fade-in-up delay-300">
                <div className="w-12 h-12 bg-[rgba(24,184,196,0.1)] rounded-xl flex items-center justify-center text-accent-2 mb-5 text-2xl">👁️</div>
                <h3 className="text-lg font-bold mb-3">{t('solutions.card3.title')}</h3>
                <p className="text-muted mb-4">{t('solutions.card3.desc')}</p>
                <a href="#" className="no-underline px-4 py-2.5 rounded-full border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] font-semibold inline-flex items-center gap-2 text-sm">{t('solutions.cta')}</a>
              </div>
              <div className="bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group animate-fade-in-up delay-300">
                <div className="w-12 h-12 bg-[rgba(24,184,196,0.1)] rounded-xl flex items-center justify-center text-accent-2 mb-5 text-2xl">🧠</div>
                <h3 className="text-lg font-bold mb-3">{t('solutions.card4.title')}</h3>
                <p className="text-muted mb-4">{t('solutions.card4.desc')}</p>
                <a href="#" className="no-underline px-4 py-2.5 rounded-full border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] font-semibold inline-flex items-center gap-2 text-sm">{t('solutions.cta')}</a>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section id="industries" className="relative py-[100px] px-5 z-10 scroll-mt-[80px]">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-accent-2 bg-[rgba(24,184,196,0.1)] px-3 py-1.5 rounded border border-[rgba(24,184,196,0.2)] font-['Space_Grotesk']">{t('industries.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('industries.title')}</h2>
            </div>
            <div className="flex flex-col gap-10 relative">
              <div className="flex gap-8 items-start relative pl-8 border-l border-[rgba(24,184,196,0.2)] max-md:flex-col max-md:gap-3 before:content-[''] before:absolute before:-left-[5px] before:top-0 before:w-[9px] before:h-[9px] before:rounded-full before:bg-accent before:shadow-[0_0_10px_var(--accent)] bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border-y border-r border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3">{t('industries.finance.title')}</h3>
                  <p className="text-muted">{t('industries.finance.desc')}</p>
                </div>
              </div>
              <div className="flex gap-8 items-start relative pl-8 border-l border-[rgba(24,184,196,0.2)] max-md:flex-col max-md:gap-3 before:content-[''] before:absolute before:-left-[5px] before:top-0 before:w-[9px] before:h-[9px] before:rounded-full before:bg-accent before:shadow-[0_0_10px_var(--accent)] bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border-y border-r border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3">{t('industries.health.title')}</h3>
                  <p className="text-muted">{t('industries.health.desc')}</p>
                </div>
              </div>
              <div className="flex gap-8 items-start relative pl-8 border-l border-[rgba(24,184,196,0.2)] max-md:flex-col max-md:gap-3 before:content-[''] before:absolute before:-left-[5px] before:top-0 before:w-[9px] before:h-[9px] before:rounded-full before:bg-accent before:shadow-[0_0_10px_var(--accent)] bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border-y border-r border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3">{t('industries.manufacturing.title')}</h3>
                  <p className="text-muted">{t('industries.manufacturing.desc')}</p>
                </div>
              </div>
              <div className="flex gap-8 items-start relative pl-8 border-l border-[rgba(24,184,196,0.2)] max-md:flex-col max-md:gap-3 before:content-[''] before:absolute before:-left-[5px] before:top-0 before:w-[9px] before:h-[9px] before:rounded-full before:bg-accent before:shadow-[0_0_10px_var(--accent)] bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border-y border-r border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3">{t('industries.retail.title')}</h3>
                  <p className="text-muted">{t('industries.retail.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section id="tech" className="relative py-[100px] px-5 z-10 scroll-mt-[80px]">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-accent-2 bg-[rgba(24,184,196,0.1)] px-3 py-1.5 rounded border border-[rgba(24,184,196,0.2)] font-['Space_Grotesk']">{t('tech.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('tech.title')}</h2>
              <p className="text-muted mb-[18px]">{t('tech.lead')}</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 bg-[linear-gradient(rgba(24,184,196,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(24,184,196,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
              <div className="flex flex-col items-center text-center p-6 border border-[rgba(255,255,255,0.05)] rounded-2xl bg-[rgba(255,255,255,0.02)]">
                <strong className="text-accent-2 mb-2 block">NLP</strong>
                <span>{t('tech.nlp')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 border border-[rgba(255,255,255,0.05)] rounded-2xl bg-[rgba(255,255,255,0.02)]">
                <strong className="text-accent-2 mb-2 block">VISION</strong>
                <span>{t('tech.vision')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 border border-[rgba(255,255,255,0.05)] rounded-2xl bg-[rgba(255,255,255,0.02)]">
                <strong className="text-accent-2 mb-2 block">ML</strong>
                <span>{t('tech.ml')}</span>
              </div>
              <div className="flex flex-col items-center text-center p-6 border border-[rgba(255,255,255,0.05)] rounded-2xl bg-[rgba(255,255,255,0.02)]">
                <strong className="text-accent-2 mb-2 block">DATA</strong>
                <span>{t('tech.data')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / INTERNATIONAL SECTION */}
        <section id="trust" className="relative py-[100px] px-5 z-10 scroll-mt-[80px]">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-accent-2 bg-[rgba(24,184,196,0.1)] px-3 py-1.5 rounded border border-[rgba(24,184,196,0.2)] font-['Space_Grotesk']">{t('trust.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('trust.title')}</h2>
            </div>
            <div className="bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group">
              <div className="w-full h-[300px] bg-[radial-gradient(circle_at_50%_50%,rgba(24,184,196,0.1)_0%,transparent_60%),url('data:image/svg+xml,%3Csvg%20width=\'100\'%20height=\'100\'%20viewBox=\'0%200%20100%20100\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath%20d=\'M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z\'%20fill=\'%2318B8C4\'%20fill-opacity=\'0.1\'%20fill-rule=\'evenodd\'/%3E%3C/svg%3E')] rounded-[24px] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-muted text-sm tracking-[0.1em] uppercase">
                {/* Map background set in CSS */}
              </div>
              <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] mt-[30px]">
                <div className="flex items-center gap-3.5 px-[18px] py-4 rounded-[18px] no-underline text-text bg-[rgba(6,18,33,0.72)] border border-[rgba(24,184,196,0.22)] transition-all duration-300 shadow-[0_18px_36px_rgba(5,14,26,0.28)] min-h-[112px] hover:border-[rgba(24,184,196,0.45)] hover:-translate-y-[2px] hover:shadow-[0_22px_44px_rgba(5,14,26,0.32)]">
                  <div className="flex flex-col gap-1">
                    <strong className="text-[15px] tracking-[0.04em] uppercase text-accent-2">{t('trust.global')}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 px-[18px] py-4 rounded-[18px] no-underline text-text bg-[rgba(6,18,33,0.72)] border border-[rgba(24,184,196,0.22)] transition-all duration-300 shadow-[0_18px_36px_rgba(5,14,26,0.28)] min-h-[112px] hover:border-[rgba(24,184,196,0.45)] hover:-translate-y-[2px] hover:shadow-[0_22px_44px_rgba(5,14,26,0.32)]">
                  <div className="flex flex-col gap-1">
                    <strong className="text-[15px] tracking-[0.04em] uppercase text-accent-2">{t('trust.security')}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 px-[18px] py-4 rounded-[18px] no-underline text-text bg-[rgba(6,18,33,0.72)] border border-[rgba(24,184,196,0.22)] transition-all duration-300 shadow-[0_18px_36px_rgba(5,14,26,0.28)] min-h-[112px] hover:border-[rgba(24,184,196,0.45)] hover:-translate-y-[2px] hover:shadow-[0_22px_44px_rgba(5,14,26,0.32)]">
                  <div className="flex flex-col gap-1">
                    <strong className="text-[15px] tracking-[0.04em] uppercase text-accent-2">{t('trust.support')}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustpilotReviews />

        {/* RESOURCES SECTION */}
        <section id="resources" className="relative py-[100px] px-5 z-10 scroll-mt-[80px]">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-accent-2 bg-[rgba(24,184,196,0.1)] px-3 py-1.5 rounded border border-[rgba(24,184,196,0.2)] font-['Space_Grotesk']">{t('resources.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('resources.title')}</h2>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              <article className="bg-surface rounded-2xl overflow-hidden border border-border transition-transform duration-300 hover:-translate-y-1 hover:border-accent">
                <div className="h-[160px] bg-[linear-gradient(135deg,rgba(24,184,196,0.2),rgba(10,30,63,0.8))]"></div>
                <div className="p-5">
                  <span className="text-[11px] text-accent-2 uppercase tracking-[0.05em] font-bold">{t('resources.1.tag')}</span>
                  <h3 className="text-lg font-bold mb-3">{t('resources.1.title')}</h3>
                  <a href="#" className="no-underline px-4 py-2.5 rounded-full border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] font-semibold inline-flex items-center gap-2 text-sm">{t('resources.read')}</a>
                </div>
              </article>
              <article className="bg-surface rounded-2xl overflow-hidden border border-border transition-transform duration-300 hover:-translate-y-1 hover:border-accent">
                <div className="h-[160px] bg-[linear-gradient(135deg,rgba(24,184,196,0.2),rgba(10,30,63,0.8))]"></div>
                <div className="p-5">
                  <span className="text-[11px] text-accent-2 uppercase tracking-[0.05em] font-bold">{t('resources.2.tag')}</span>
                  <h3 className="text-lg font-bold mb-3">{t('resources.2.title')}</h3>
                  <a href="#" className="no-underline px-4 py-2.5 rounded-full border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] font-semibold inline-flex items-center gap-2 text-sm">{t('resources.read')}</a>
                </div>
              </article>
              <article className="bg-surface rounded-2xl overflow-hidden border border-border transition-transform duration-300 hover:-translate-y-1 hover:border-accent">
                <div className="h-[160px] bg-[linear-gradient(135deg,rgba(24,184,196,0.2),rgba(10,30,63,0.8))]"></div>
                <div className="p-5">
                  <span className="text-[11px] text-accent-2 uppercase tracking-[0.05em] font-bold">{t('resources.3.tag')}</span>
                  <h3 className="text-lg font-bold mb-3">{t('resources.3.title')}</h3>
                  <a href="#" className="no-underline px-4 py-2.5 rounded-full border border-accent text-accent bg-transparent hover:bg-[rgba(24,184,196,0.12)] font-semibold inline-flex items-center gap-2 text-sm">{t('resources.read')}</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="relative py-[100px] px-5 z-10 scroll-mt-[80px]">
          <div className="max-w-[1160px] mx-auto flex flex-col gap-8">
            <div className="max-w-[700px] mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-accent-2 bg-[rgba(24,184,196,0.1)] px-3 py-1.5 rounded border border-[rgba(24,184,196,0.2)] font-['Space_Grotesk']">{t('contact.label')}</span>
              <h2 className="text-[clamp(28px,4vw,44px)] leading-[1.15] mt-4 mb-4 font-extrabold tracking-[-0.02em] bg-[linear-gradient(135deg,#fff_30%,var(--accent-2)_100%)] bg-clip-text text-transparent">{t('contact.title')}</h2>
              <p className="text-muted mb-[18px]">{t('contact.lead')}</p>
            </div>
            <div className="bg-[rgba(14,30,55,0.4)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden hover:bg-[rgba(14,30,55,0.6)] hover:border-[rgba(24,184,196,0.3)] hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group">
              <ContactForm />
              <div style={{ marginTop: '20px', textAlign: 'center', color: 'var(--muted)' }}>
                <p>{t('contact.info.email')} • {t('contact.info.phone')}</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
