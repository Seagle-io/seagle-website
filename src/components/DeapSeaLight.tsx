import type { CSSProperties } from "react";

const styles = `
@keyframes smoothBg {
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
}

.dsl {
  position: absolute;
  width: 100%;
}

.dsl-hero {
  min-height: 60vh;
  --stripes: repeating-linear-gradient(
    40deg,
    var(--stripe-color) 0%,
    var(--stripe-color) 1%,
    transparent 10%,
    transparent 12%,
    var(--stripe-color) 16%
  );

  --rainbow: repeating-linear-gradient(
    40deg,
    #FFFFFF 10%,
    #d9d9d9 15%,
    #afafaf 20%,
    #6f6f6f 25%,
    #313131 30%
  );
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;

  filter: blur(10px) invert(100%);
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}

.dsl-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  animation: smoothBg 60s linear infinite;
  background-attachment: fixed;
  mix-blend-mode: difference;
}

.dsl-dark .dsl-hero,
.dsl-dark .dsl-hero::after {
  filter: blur(10px) opacity(50%) saturate(200%);
}
`;

export function DeapSeaLight() {
  const variableStyle = {
    "--stripe-color": "#000",
  } as CSSProperties;

  return (
    <section className="dsl dsl-dark" style={variableStyle}>
      <style>{styles}</style>
      <div className="w-2xl dsl-hero" aria-hidden />
    </section>
  );
}

export default DeapSeaLight;
