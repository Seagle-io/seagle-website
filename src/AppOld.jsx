import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
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
    <div className="app" id="top">
      <FlowFieldParticles fullscreen />
      <Navbar navigate={navigate} currentPage="home" />
      <BackgroundWave />
      <main id="main">
        <Hero navigate={navigate} />
        <Partners />

        {/* SOLUTIONS SECTION */}
        <section id="solutions" className="section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('solutions.label')}</span>
              <h2>{t('solutions.title')}</h2>
              <p className="lead">{t('solutions.lead')}</p>
            </div>
            <div className="solutions-grid">
              <div className="glass-card animate-fade-in-up delay-100">
                <div className="solution-icon">⚡</div>
                <h3>{t('solutions.card1.title')}</h3>
                <p>{t('solutions.card1.desc')}</p>
                <a href="#" className="btn outline small">{t('solutions.cta')}</a>
              </div>
              <div className="glass-card animate-fade-in-up delay-200">
                <div className="solution-icon">📊</div>
                <h3>{t('solutions.card2.title')}</h3>
                <p>{t('solutions.card2.desc')}</p>
                <a href="#" className="btn outline small">{t('solutions.cta')}</a>
              </div>
              <div className="glass-card animate-fade-in-up delay-300">
                <div className="solution-icon">👁️</div>
                <h3>{t('solutions.card3.title')}</h3>
                <p>{t('solutions.card3.desc')}</p>
                <a href="#" className="btn outline small">{t('solutions.cta')}</a>
              </div>
              <div className="glass-card animate-fade-in-up delay-300">
                <div className="solution-icon">🧠</div>
                <h3>{t('solutions.card4.title')}</h3>
                <p>{t('solutions.card4.desc')}</p>
                <a href="#" className="btn outline small">{t('solutions.cta')}</a>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section id="industries" className="section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('industries.label')}</span>
              <h2>{t('industries.title')}</h2>
            </div>
            <div className="use-cases-container">
              <div className="use-case-item glass-card">
                <div className="use-case-content">
                  <h3>{t('industries.finance.title')}</h3>
                  <p>{t('industries.finance.desc')}</p>
                </div>
              </div>
              <div className="use-case-item glass-card">
                <div className="use-case-content">
                  <h3>{t('industries.health.title')}</h3>
                  <p>{t('industries.health.desc')}</p>
                </div>
              </div>
              <div className="use-case-item glass-card">
                <div className="use-case-content">
                  <h3>{t('industries.manufacturing.title')}</h3>
                  <p>{t('industries.manufacturing.desc')}</p>
                </div>
              </div>
              <div className="use-case-item glass-card">
                <div className="use-case-content">
                  <h3>{t('industries.retail.title')}</h3>
                  <p>{t('industries.retail.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section id="tech" className="section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('tech.label')}</span>
              <h2>{t('tech.title')}</h2>
              <p className="lead">{t('tech.lead')}</p>
            </div>
            <div className="tech-stack-grid tech-grid-bg">
              <div className="tech-item">
                <strong>NLP</strong>
                <span>{t('tech.nlp')}</span>
              </div>
              <div className="tech-item">
                <strong>VISION</strong>
                <span>{t('tech.vision')}</span>
              </div>
              <div className="tech-item">
                <strong>ML</strong>
                <span>{t('tech.ml')}</span>
              </div>
              <div className="tech-item">
                <strong>DATA</strong>
                <span>{t('tech.data')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / INTERNATIONAL SECTION */}
        <section id="trust" className="section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('trust.label')}</span>
              <h2>{t('trust.title')}</h2>
            </div>
            <div className="glass-card">
              <div className="trust-map-placeholder">
                {/* Map background set in CSS */}
              </div>
              <div className="reassurance-list" style={{ marginTop: '30px' }}>
                <div className="reassurance-link">
                  <div className="reassurance-text">
                    <strong>{t('trust.global')}</strong>
                  </div>
                </div>
                <div className="reassurance-link">
                  <div className="reassurance-text">
                    <strong>{t('trust.security')}</strong>
                  </div>
                </div>
                <div className="reassurance-link">
                  <div className="reassurance-text">
                    <strong>{t('trust.support')}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustpilotReviews />

        {/* RESOURCES SECTION */}
        <section id="resources" className="section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('resources.label')}</span>
              <h2>{t('resources.title')}</h2>
            </div>
            <div className="resources-grid">
              <article className="resource-card">
                <div className="resource-image"></div>
                <div className="resource-content">
                  <span className="resource-tag">{t('resources.1.tag')}</span>
                  <h3>{t('resources.1.title')}</h3>
                  <a href="#" className="btn outline small">{t('resources.read')}</a>
                </div>
              </article>
              <article className="resource-card">
                <div className="resource-image"></div>
                <div className="resource-content">
                  <span className="resource-tag">{t('resources.2.tag')}</span>
                  <h3>{t('resources.2.title')}</h3>
                  <a href="#" className="btn outline small">{t('resources.read')}</a>
                </div>
              </article>
              <article className="resource-card">
                <div className="resource-image"></div>
                <div className="resource-content">
                  <span className="resource-tag">{t('resources.3.tag')}</span>
                  <h3>{t('resources.3.title')}</h3>
                  <a href="#" className="btn outline small">{t('resources.read')}</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-label">{t('contact.label')}</span>
              <h2>{t('contact.title')}</h2>
              <p className="lead">{t('contact.lead')}</p>
            </div>
            <div className="glass-card">
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
