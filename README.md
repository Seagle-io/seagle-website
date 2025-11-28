# Seagle Website

Landing page one-page pour Seagle, spécialisée dans l'IA sur mesure et le logiciel propriétaire.

## Structure

Le site est une Single Page Application (SPA) construite avec React et Vite. Elle suit une structure minimaliste et premium.

### Sections
1.  **Hero** : Introduction avec logo en filigrane, catchphrase et tags.
2.  **Expertise** : Présentation des deux piliers (IA sur mesure & Logiciel propriétaire).
3.  **À propos** : Vision de l'entreprise (Aigle & Mer).
4.  **Contact** : Simple appel à l'action (Mailto & LinkedIn).

### Technologies
*   **React** : Framework UI.
*   **Tailwind CSS** : Styling utilitaire pour un design rapide et responsive.
*   **Three.js** : Utilisé pour l'effet de particules en arrière-plan (`FlowFieldParticles`).
*   **Vite** : Bundler et serveur de développement.

## Installation & Démarrage

1.  Installer les dépendances :
    ```bash
    npm install
    ```

2.  Lancer le serveur de développement :
    ```bash
    npm run dev
    ```

3.  Construire pour la production :
    ```bash
    npm run build
    ```

## Personnalisation

*   **Contenu** : Tout le texte est géré dans `src/i18n.jsx`.
*   **Styles** : Les variables globales et styles de base sont dans `src/index.css` (et `styles.css` pour la version HTML statique si utilisée).
*   **Particules** : L'effet visuel est dans `src/components/FlowFieldParticles.jsx`.

## Note sur la version HTML statique
Une version HTML/CSS/JS Vanilla est également disponible à la racine (`index.html`, `styles.css`, `particles.js`) pour un déploiement ultra-léger sans build step si nécessaire.
