import React, { createContext, useContext, useMemo, useState } from 'react'

const I18nContext = createContext({ lang: 'fr', setLang: () => { }, t: (k) => k })

const dict = {
  fr: {
    'navbar.home': 'Accueil',
    'navbar.solutions': 'Solutions',
    'navbar.industries': 'Industries',
    'navbar.technology': 'Technologie',
    'navbar.resources': 'Ressources',
    'navbar.contact': 'Contact',
    'navbar.lang': 'EN',

    'hero.tagline': 'GLOBAL AI SOLUTIONS',
    'hero.title': 'Solutions IA pour un monde connecté',
    'hero.subtitle': 'Nous concevons et déployons des solutions d’intelligence artificielle souveraines et performantes pour les entreprises partout dans le monde.',
    'solutions.card3.desc': 'Analysez et interprétez vos flux visuels en temps réel.',
    'solutions.card4.title': 'IA Générative',
    'solutions.card4.desc': 'Créez du contenu et des interactions naturelles à grande échelle.',
    'solutions.cta': 'En savoir plus',

    'industries.label': 'Secteurs',
    'industries.title': 'L’IA au service de votre industrie',
    'industries.finance.title': 'Finance & Assurance',
    'industries.finance.desc': 'Détection de fraude, scoring de crédit et trading algorithmique.',
    'industries.health.title': 'Santé & Pharma',
    'industries.health.desc': 'Diagnostic assisté, découverte de médicaments et suivi patient.',
    'industries.manufacturing.title': 'Industrie 4.0',
    'industries.manufacturing.desc': 'Maintenance prédictive et contrôle qualité automatisé.',
    'industries.retail.title': 'Retail & E-commerce',
    'industries.retail.desc': 'Personnalisation client et optimisation de la supply chain.',

    'tech.label': 'Technologie',
    'tech.title': 'Une stack technologique de pointe',
    'tech.lead': 'Nous maîtrisons l’état de l’art des modèles et infrastructures IA.',
    'tech.nlp': 'NLP & LLMs',
    'tech.vision': 'Computer Vision',
    'tech.ml': 'Machine Learning',
    'tech.data': 'Data Pipelines',

    'trust.label': 'Confiance',
    'trust.title': 'Un partenaire global et sécurisé',
    'trust.global': 'Déploiement sur 3 continents',
    'trust.security': 'Conformité RGPD & ISO 27001',
    'trust.support': 'Support technique 24/7',

    'resources.label': 'Insights',
    'resources.title': 'Dernières publications',
    'resources.read': 'Lire l’article',
    'resources.1.title': 'L’avenir de l’IA générative en entreprise',
    'resources.1.tag': 'Whitepaper',
    'resources.2.title': 'Cas client : +40% de productivité logistique',
    'resources.2.tag': 'Case Study',
    'resources.3.title': 'Sécurité des données à l’ère de l’IA',
    'resources.3.tag': 'Article',

    'contact.label': 'Contact',
    'contact.title': 'Discutons de vos projets IA',
    'contact.lead': 'Nos experts sont à votre disposition pour analyser vos besoins.',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email professionnel',
    'contact.form.message': 'Votre message',
    'contact.form.submit': 'Envoyer le message',
    'contact.info.email': 'contact@seagle.io',
    'contact.info.phone': '+33 1 00 00 00 00',

    'reviews.1.title': 'Une révolution pour notre logistique',
    'reviews.1.text': 'L’intégration des agents autonomes Seagle a réduit nos délais de traitement de 30%.',
    'reviews.2.title': 'Support technique exceptionnel',
    'reviews.2.text': 'Une équipe réactive et une technologie robuste. Je recommande vivement.',
    'reviews.3.title': 'Visionnaire et efficace',
    'reviews.3.text': 'Seagle nous a permis de déployer nos modèles prédictifs en un temps record.',

    'footer.rights': 'Tous droits réservés.',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
  },
  en: {
    'navbar.home': 'Home',
    'navbar.solutions': 'Solutions',
    'navbar.industries': 'Industries',
    'navbar.technology': 'Technology',
    'navbar.resources': 'Resources',
    'navbar.contact': 'Contact',
    'navbar.lang': 'FR',

    'hero.tagline': 'GLOBAL AI SOLUTIONS',
    'hero.title': 'AI solutions for a connected world',
    'hero.subtitle': 'We design and deploy sovereign and high-performance artificial intelligence solutions for enterprises worldwide.',
    'hero.cta': 'Request a Demo',
    'hero.secondary': 'Talk to an Expert',
    'partners.label': 'Partners',
    'partners.title': 'Trusted by Industry Leaders',
    'hero.reassurance.clients': '+500 Clients',
    'hero.reassurance.global': 'Global Presence',
    'hero.reassurance.security': 'Certified Security',

    'solutions.label': 'Our Expertise',
    'solutions.title': 'A complete Artificial Intelligence suite',
    'solutions.lead': 'From intelligent automation to predictive analytics, our modules integrate seamlessly into your ecosystem.',
    'solutions.card1.title': 'Automation',
    'solutions.card1.desc': 'Optimize your business processes with intelligent autonomous agents.',
    'solutions.card2.title': 'Predictive Analytics',
    'solutions.card2.desc': 'Anticipate market trends and user behaviors.',
    'solutions.card3.title': 'Computer Vision',
    'solutions.card3.desc': 'Analyze and interpret your visual streams in real-time.',
    'solutions.card4.title': 'Generative AI',
    'solutions.card4.desc': 'Create content and natural interactions at scale.',
    'solutions.cta': 'Learn more',

    'industries.label': 'Industries',
    'industries.title': 'AI serving your industry',
    'industries.finance.title': 'Finance & Insurance',
    'industries.finance.desc': 'Fraud detection, credit scoring, and algorithmic trading.',
    'industries.health.title': 'Health & Pharma',
    'industries.health.desc': 'Assisted diagnosis, drug discovery, and patient monitoring.',
    'industries.manufacturing.title': 'Industry 4.0',
    'industries.manufacturing.desc': 'Predictive maintenance and automated quality control.',
    'industries.retail.title': 'Retail & E-commerce',
    'industries.retail.desc': 'Customer personalization and supply chain optimization.',

    'tech.label': 'Technology',
    'tech.title': 'State-of-the-art Tech Stack',
    'tech.lead': 'We master the cutting edge of AI models and infrastructure.',
    'tech.nlp': 'NLP & LLMs',
    'tech.vision': 'Computer Vision',
    'tech.ml': 'Machine Learning',
    'tech.data': 'Data Pipelines',

    'trust.label': 'Trust',
    'trust.title': 'A secure global partner',
    'trust.global': 'Deployed on 3 continents',
    'trust.security': 'GDPR & ISO 27001 Compliant',
    'trust.support': '24/7 Technical Support',

    'resources.label': 'Insights',
    'resources.title': 'Latest Publications',
    'resources.read': 'Read Article',
    'resources.1.title': 'The Future of Generative AI in Enterprise',
    'resources.1.tag': 'Whitepaper',
    'resources.2.title': 'Client Case: +40% Logistics Productivity',
    'resources.2.tag': 'Case Study',
    'resources.3.title': 'Data Security in the AI Era',
    'resources.3.tag': 'Article',

    'contact.label': 'Contact',
    'contact.title': 'Let’s discuss your AI projects',
    'contact.lead': 'Our experts are available to analyze your needs.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Work Email',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.info.email': 'contact@seagle.io',
    'contact.info.phone': '+1 (555) 000-0000',

    'reviews.1.title': 'A revolution for our logistics',
    'reviews.1.text': 'Integrating Seagle autonomous agents reduced our processing times by 30%.',
    'reviews.2.title': 'Exceptional technical support',
    'reviews.2.text': 'Responsive team and robust technology. Highly recommended.',
    'reviews.3.title': 'Visionary and efficient',
    'reviews.3.text': 'Seagle allowed us to deploy our predictive models in record time.',

    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
  }
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('fr')
  const t = useMemo(() => (key) => dict[lang]?.[key] ?? key, [lang])
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() { return useContext(I18nContext) }
