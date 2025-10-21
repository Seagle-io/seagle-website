import React, { createContext, useContext, useState, useMemo } from 'react'

const I18nContext = createContext({ lang: 'fr', setLang: () => {}, t: (k) => k })

const dict = {
  fr: {
    'navbar.product': 'Produit',
    'navbar.demo': 'Démo',
    'navbar.about': 'À propos',
    'navbar.pricing': 'Tarifs',
    'navbar.contact': 'Contact',
    'navbar.try': 'Essayer',
    'navbar.lang': 'EN',

    'hero.title': 'Structurer l’IA selon votre modèle',
    'hero.subtitle': 'SIGLE AI transforme vos descriptions en données propres et validées par votre modèle. Un rendu cohérent, simple à intégrer, taillé pour la production.',
    'hero.try': 'Essayer la démo',
    'hero.discover': 'Découvrir le produit',

    'product.title': 'Pourquoi SIGLE AI ?',
    'product.lead': 'De la prose à la structure, sans friction.',
    'product.f1.title': 'Orienté modèle',
    'product.f1.desc': 'Définissez vos schémas, obtenez des sorties propres et validées. Plus de JSON approximatif.',
    'product.f2.title': 'Intégration simple',
    'product.f2.desc': 'SDK léger, API claire, et contrôle total sur les champs générés.',
    'product.f3.title': 'Temps réel',
    'product.f3.desc': 'Des retours immédiats pour vos utilisateurs: aperçu, validation, correction.',

    'about.title': 'À propos',
    'about.body': 'SIGLE AI est une jeune entreprise dédiée à l’IA orientée modèle. Notre mission: transformer des descriptions en données fiables et directement exploitables.',

    'pricing.title': 'Tarifs',
    'pricing.starter': 'Starter',
    'pricing.starter.desc': 'Pour démarrer rapidement',
    'pricing.pro': 'Pro',
    'pricing.pro.desc': 'Pour les équipes',
    'pricing.enterprise': 'Enterprise',
    'pricing.enterprise.desc': 'Pour la production à grande échelle',
    'pricing.cta': 'Nous contacter',

    'demo.title': 'Démo en direct',
    'demo.lead': 'Décrivez votre produit, obtenez un objet structuré.',

    'moai.step1': '1) Définir le modèle',
    'moai.step1.hint': 'Fournissez un JSON minimal. Les clés dans « fields » deviennent votre sortie structurée.',
    'moai.step2': '2) Décrire votre élément',
    'moai.step2.hint': 'Rédigez un texte libre. Le générateur le mappe vers le modèle.',
    'moai.generate': 'Générer les données structurées',
    'moai.step3': '3) Sortie structurée',
    'moai.copy': 'Copier JSON',
    'moai.export': 'Exporter JSON',

    'footer.made': 'SIGLE AI — Solutions d’IA orientées modèle.',
    'footer.back': 'Retour en haut',
  },
  en: {
    'navbar.product': 'Product',
    'navbar.demo': 'Demo',
    'navbar.about': 'About',
    'navbar.pricing': 'Pricing',
    'navbar.contact': 'Contact',
    'navbar.try': 'Try',
    'navbar.lang': 'FR',

    'hero.title': 'Structure AI to match your model',
    'hero.subtitle': 'SIGLE AI turns descriptions into clean, model‑validated data. Consistent results, easy to integrate, built for production.',
    'hero.try': 'Try the demo',
    'hero.discover': 'See the product',

    'product.title': 'Why SIGLE AI?',
    'product.lead': 'From prose to structure, without friction.',
    'product.f1.title': 'Model‑oriented',
    'product.f1.desc': 'Define schemas, get clean validated outputs. No more flaky JSON.',
    'product.f2.title': 'Easy integration',
    'product.f2.desc': 'Lightweight SDK, clear API, full control on generated fields.',
    'product.f3.title': 'Real‑time',
    'product.f3.desc': 'Instant feedback for users: preview, validation, corrections.',

    'about.title': 'About',
    'about.body': 'SIGLE AI builds model‑oriented AI. Our mission: turn descriptions into reliable, production‑ready data.',

    'pricing.title': 'Pricing',
    'pricing.starter': 'Starter',
    'pricing.starter.desc': 'Get started quickly',
    'pricing.pro': 'Pro',
    'pricing.pro.desc': 'For teams',
    'pricing.enterprise': 'Enterprise',
    'pricing.enterprise.desc': 'Scale to production',
    'pricing.cta': 'Contact us',

    'demo.title': 'Live demo',
    'demo.lead': 'Describe your product, get a structured object.',

    'moai.step1': '1) Define the model',
    'moai.step1.hint': 'Provide minimal JSON. Keys under "fields" appear in the output.',
    'moai.step2': '2) Describe your item',
    'moai.step2.hint': 'Write natural language. The generator maps it into the model.',
    'moai.generate': 'Generate Structured Data',
    'moai.step3': '3) Structured output',
    'moai.copy': 'Copy JSON',
    'moai.export': 'Export JSON',

    'footer.made': 'SIGLE AI — Model‑oriented AI.',
    'footer.back': 'Back to top',
  },
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('fr')
  const t = useMemo(() => (key) => dict[lang]?.[key] ?? key, [lang])
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(){ return useContext(I18nContext) }

