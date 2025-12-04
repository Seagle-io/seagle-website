# Model‑Oriented AI — Single Page (React + Vite)

This repository contains a minimal React single page that demonstrates a "model‑oriented AI" idea: define a small JSON model, write a natural‑language description, and generate structured data conforming to the model using simple, deterministic heuristics (no external APIs).

## Quick start

- Prereqs: Node.js 18+ and npm
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Open the URL printed by Vite (usually `http://localhost:5173`)

## What’s inside

- `index.html` — Vite entry
- `src/App.jsx` — App shell
- `src/pages/ModelOrientedAI.jsx` — Main page with:
  - Model editor (JSON)
  - Prompt textarea
  - Generator that maps prompt → structured JSON based on the model
- `src/styles.css` — Minimal styling

## Notes

- The generator here is intentionally simple (regex + keyword extraction) to keep the demo self‑contained. If you want to use a real LLM, you can swap `generateStructuredData(...)` with an API call and validate the response against the model.
- You can customize the default model or extend types beyond `string`, `number`, `string[]`, and `boolean`.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build

## IDE / Tailwind IntelliSense

Pour bénéficier de l’autocomplétion Tailwind y compris dans les blocs `cva(...)`, ajoutez la configuration suivante dans votre éditeur (exemple VS Code) :

- Créez `.vscode/settings.json` avec :
  ```json
  {
    "tailwindCSS.experimental.classRegex": [
      ["cva\\(([^)]*)\\)", "(?:['\"`]([^'\"`]*?)['\"`])"]
    ]
  }
  ```

## Déploiement GitHub Pages

Un workflow est prêt: `.github/workflows/deploy.yml`.

1) Poussez vos fichiers sur la branche `main`.
2) Dans GitHub → Settings → Pages: Source = GitHub Actions.
3) Le site sera disponible à l’URL fournie par l’action (souvent `https://<votre-user>.github.io/seagle-website/`).

Vite ajuste automatiquement `base` pour GitHub Pages lors du build en CI.

## Modèle 3D (Aigle)

- Placez un modèle GLB/GLTF d’aigle dans `public/models/eagle.glb`.
- Le composant charge automatiquement ce fichier. En cas d’échec, un oiseau procédural s’affiche en fallback.
- Formats: `.glb` recommandé. Si le fichier s’appelle autrement, modifiez `src/components/GltfEagle.jsx` prop `src` dans `Hero.jsx`.
