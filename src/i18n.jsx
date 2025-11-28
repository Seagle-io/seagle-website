import React, { createContext, useContext, useMemo, useState } from 'react'

const I18nContext = createContext({ lang: 'fr', setLang: () => { }, t: (k) => k })

const dict = {
  fr: {
    'navbar.home': 'Accueil',
    'navbar.expertise': 'Expertise',
    'navbar.about': 'À propos',
    'navbar.contact': 'Contact',
    'navbar.lang': 'EN',

    'hero.catch_phrase': 'L’IA sur mesure, installée chez vous.',
    'hero.text': 'Seagle installe et développe des solutions d’intelligence artificielle adaptées à votre activité. Nous créons également notre propre logiciel pour piloter vos IA avec simplicité et précision.',
    'hero.tag1': 'Installation d’IA sur mesure',
    'hero.tag2': 'Logiciel propriétaire Seagle',

    'expertise.title': 'Notre expertise',
    'expertise.intro': 'Nous accompagnons nos clients avec une expertise focalisée sur deux piliers complémentaires : l’IA sur mesure et un logiciel propriétaire pensé pour le pilotage au quotidien.',
    'expertise.pillar1.label': 'IA sur mesure',
    'expertise.pillar1.text': 'Nous concevons et intégrons des solutions d’intelligence artificielle adaptées à votre contexte, vos outils et vos usages. L’objectif : automatiser ce qui doit l’être, augmenter vos équipes et générer de la valeur concrète, sans complexifier votre organisation.',
    'expertise.pillar2.label': 'Logiciel propriétaire Seagle',
    'expertise.pillar2.text': 'En parallèle, nous développons notre propre logiciel pour centraliser, suivre et piloter les IA déployées. Il offre une vision claire des performances, facilite les ajustements et garantit une exploitation sereine et maîtrisée de vos modèles.',

    'about.title': 'À propos de Seagle',
    'about.text1': 'Seagle est une entreprise spécialisée dans l’intégration et le développement d’intelligences artificielles appliquées. Nous combinons une approche technique exigeante à une vision simple : mettre l’IA au service de votre quotidien, sans complexité inutile.',
    'about.text2': 'Notre identité repose sur deux valeurs fortes : la vision, représentée par l’aigle, et la fluidité, inspirée par la mer.',
    'about.text3': 'Ensemble, elles guident notre manière de concevoir des solutions puissantes, élégantes et adaptées à chaque client.',

    'contact.title': 'Contact',
    'contact.text': 'Une question, un projet, une idée ? Échangeons simplement autour de votre besoin. Aucun engagement, juste une conversation.',
    'contact.cta_primary': 'Discuter de votre projet',
    'contact.cta_secondary': 'LinkedIn',

    'footer.rights': 'Tous droits réservés.',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
  },
  en: {
    'navbar.home': 'Home',
    'navbar.expertise': 'Expertise',
    'navbar.about': 'About',
    'navbar.contact': 'Contact',
    'navbar.lang': 'FR',

    'hero.catch_phrase': 'Custom AI, installed at your premises.',
    'hero.text': 'Seagle installs and develops artificial intelligence solutions tailored to your activity. We also create our own software to pilot your AIs with simplicity and precision.',
    'hero.tag1': 'Custom AI Installation',
    'hero.tag2': 'Seagle Proprietary Software',

    'expertise.title': 'Our Expertise',
    'expertise.intro': 'We support our clients with expertise focused on two complementary pillars: custom AI and proprietary software designed for daily management.',
    'expertise.pillar1.label': 'Custom AI',
    'expertise.pillar1.text': 'We design and integrate artificial intelligence solutions adapted to your context, tools, and usage. The goal: automate what needs to be, augment your teams, and generate concrete value without complicating your organization.',
    'expertise.pillar2.label': 'Seagle Proprietary Software',
    'expertise.pillar2.text': 'In parallel, we develop our own software to centralize, track, and pilot deployed AIs. It offers a clear view of performance, facilitates adjustments, and ensures serene and controlled operation of your models.',

    'about.title': 'About Seagle',
    'about.text1': 'Seagle is a company specializing in the integration and development of applied artificial intelligence. We combine a demanding technical approach with a simple vision: putting AI at the service of your daily life, without unnecessary complexity.',
    'about.text2': 'Our identity rests on two strong values: vision, represented by the eagle, and fluidity, inspired by the sea.',
    'about.text3': 'Together, they guide our way of designing powerful, elegant solutions adapted to each client.',

    'contact.title': 'Contact',
    'contact.text': 'A question, a project, an idea? Let’s simply discuss your needs. No commitment, just a conversation.',
    'contact.cta_primary': 'Discuss your project',
    'contact.cta_secondary': 'LinkedIn',

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
