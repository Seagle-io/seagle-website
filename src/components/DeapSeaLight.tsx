import type { CSSProperties } from "react"

const styles = `
@keyframes smoothBg {
  from {
    background-position: -60% 50%, -60% 50%;
  }
  to {
    background-position: 160% 50%, 160% 50%;
  }
}

.dsl {
  position: fixed;
  inset: 0;
  z-index: -2;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, black 0%, black 25%, transparent 85%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 25%, transparent 85%);
}

.dsl-hero {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  --stripes: linear-gradient(
    40deg,
    transparent 0%,
    transparent 22%,
    var(--stripe-color) 32%,
    var(--stripe-color) 42%,
    transparent 52%,
    transparent 60%,
    var(--stripe-color) 70%,
    var(--stripe-color) 80%,
    transparent 90%,
    transparent 100%
  );

  --rainbow: linear-gradient(
    40deg,
    transparent 0%,
    transparent 22%,
    #cfcfcf 32%,
    #a8a8a8 42%,
    transparent 52%,
    transparent 60%,
    #777777 70%,
    #3a3a3a 80%,
    transparent 90%,
    transparent 100%
  );
  background-image: var(--stripes), var(--rainbow);
  background-size: 360%, 220%;
  background-position: 50% 50%, 50% 50%;
  background-repeat: no-repeat, no-repeat;

  filter: blur(8px) invert(100%) brightness(0.85) saturate(105%);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

.dsl-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.34) 0%,
    rgba(0, 0, 0, 0.14) 14%,
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.14) 86%,
    rgba(0, 0, 0, 0.34) 100%
  );
  pointer-events: none;
  z-index: 2;
}

.dsl-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  background-repeat: no-repeat, no-repeat;
  animation: smoothBg 35s linear infinite;
  background-attachment: fixed;
  mix-blend-mode: difference;
  mask-image: linear-gradient(to bottom, black 0%, black 35%, transparent 70%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 35%, transparent 70%);
  z-index: 1;
}

.dsl-dark .dsl-hero,
.dsl-dark .dsl-hero::after {
  filter: blur(8px) opacity(80%) saturate(180%);
}
`;

export function DeapSeaLight() {
  const variableStyle = {
    "--stripe-color": "var(--color-light-sea)",
  } as CSSProperties;

  return (
    <section className="dsl dsl-dark" style={variableStyle}>
      <style>{styles}</style>
      <div className="w-full dsl-hero" aria-hidden />
    </section>
  );
}

export default DeapSeaLight;
