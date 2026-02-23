import type { CSSProperties } from "react";

const STAR_COUNT = 180;
const LEAF_COUNT = 22;
const DUST_COUNT = 34;
const BUTTERFLY_COUNT = 8;

const stars = Array.from({ length: STAR_COUNT }, (_, index) => {
  const x = (index * 37 + (index % 7) * 11) % 100;
  const y = (index * 29 + (index % 9) * 13) % 100;
  const size = 1 + (index % 4) * 0.55;
  const delay = ((index * 19) % 16) / 2;
  const duration = 5.6 + (index % 6) * 1.2;
  const opacity = 0.28 + (index % 4) * 0.11;
  const glow = 3 + (index % 4) * 1.4;
  const glowOpacity = 0.2 + (index % 4) * 0.07;

  return { x, y, size, delay, duration, opacity, glow, glowOpacity };
});

const leaves = Array.from({ length: LEAF_COUNT }, (_, index) => {
  const x = -12 + ((index * 17 + (index % 4) * 13) % 122);
  const y = -22 - (index % 6) * 12;
  const size = 8 + (index % 5) * 2.4;
  const delay = ((index * 7) % 36) / 3;
  const duration = 17 + (index % 6) * 2.1;
  const driftX = (index % 2 === 0 ? 1 : -1) * (42 + (index % 5) * 17);
  const driftY = 370 + (index % 5) * 44;
  const spin = (index % 2 === 0 ? 1 : -1) * (56 + (index % 3) * 19);
  const opacity = 0.09 + (index % 4) * 0.05;
  const blur = (index % 3) * 0.55;

  return { x, y, size, delay, duration, driftX, driftY, spin, opacity, blur };
});

const dust = Array.from({ length: DUST_COUNT }, (_, index) => {
  const x = (index * 29 + (index % 7) * 11) % 100;
  const y = 12 + ((index * 17 + (index % 5) * 7) % 74);
  const size = 1.5 + (index % 4) * 1.35;
  const delay = ((index * 11) % 24) / 3;
  const duration = 10.4 + (index % 6) * 1.6;
  const drift = (index % 2 === 0 ? 1 : -1) * (18 + (index % 5) * 8);
  const rise = 10 + (index % 4) * 3.5;
  const opacity = 0.07 + (index % 4) * 0.045;

  return { x, y, size, delay, duration, drift, rise, opacity };
});

const butterflies = Array.from({ length: BUTTERFLY_COUNT }, (_, index) => {
  const x = 8 + ((index * 23 + (index % 3) * 17) % 78);
  const y = 24 + ((index * 13 + (index % 4) * 11) % 42);
  const delay = ((index * 11) % 28) / 3;
  const duration = 19 + (index % 4) * 4.8;
  const driftX = (index % 2 === 0 ? 1 : -1) * (120 + (index % 4) * 38);
  const driftY = (index % 2 === 0 ? 1 : -1) * (18 + (index % 3) * 12);
  const turn = (index % 2 === 0 ? 1 : -1) * (9 + (index % 4) * 3);
  const scale = 0.78 + (index % 4) * 0.14;
  const opacity = 0.42 + (index % 3) * 0.12;

  return { x, y, delay, duration, driftX, driftY, turn, scale, opacity };
});

export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aot-scene dark:hidden" />
      <div className="aot-atmosphere dark:hidden" />
      <div className="aot-clouds dark:hidden" />
      <div className="aot-sunray aot-sunray-a dark:hidden" />
      <div className="aot-sunray aot-sunray-b dark:hidden" />
      <div className="aot-wall-layer aot-wall-back dark:hidden" />
      <div className="aot-wall-layer aot-wall-mid dark:hidden" />
      <div className="aot-wall-layer aot-wall-front dark:hidden" />
      <div className="aot-trees dark:hidden" />
      <div className="aot-hills dark:hidden" />
      <div className="aot-branch aot-branch-left dark:hidden" />
      <div className="aot-branch aot-branch-right dark:hidden" />
      <div className="aot-vignette dark:hidden" />

      {dust.map((particle, index) => {
        const style = {
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: particle.opacity,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
          "--dust-drift": `${particle.drift}px`,
          "--dust-rise": `${particle.rise}px`,
          "--dust-opacity": `${particle.opacity}`,
        } as CSSProperties;

        return <span key={`dust-${index}`} className="aot-dust dark:hidden" style={style} />;
      })}

      {leaves.map((leaf, index) => {
        const style = {
          left: `${leaf.x}%`,
          top: `${leaf.y}%`,
          width: `${leaf.size}px`,
          height: `${Math.max(4.6, leaf.size * 0.72)}px`,
          opacity: leaf.opacity,
          filter: `blur(${leaf.blur}px)`,
          animationDelay: `${leaf.delay}s`,
          animationDuration: `${leaf.duration}s`,
          "--leaf-drift-x": `${leaf.driftX}px`,
          "--leaf-drift-y": `${leaf.driftY}px`,
          "--leaf-spin": `${leaf.spin}deg`,
          "--leaf-opacity": `${leaf.opacity}`,
        } as CSSProperties;

        return <span key={`leaf-${index}`} className="aot-leaf dark:hidden" style={style} />;
      })}

      {butterflies.map((butterfly, index) => {
        const style = {
          left: `${butterfly.x}%`,
          top: `${butterfly.y}%`,
          animationDelay: `${butterfly.delay}s`,
          animationDuration: `${butterfly.duration}s`,
          "--bf-drift-x": `${butterfly.driftX}px`,
          "--bf-drift-y": `${butterfly.driftY}px`,
          "--bf-turn": `${butterfly.turn}deg`,
          "--bf-scale": `${butterfly.scale}`,
          "--bf-opacity": `${butterfly.opacity}`,
        } as CSSProperties;

        return (
          <span key={`butterfly-${index}`} className="aot-butterfly dark:hidden" style={style}>
            <span className="aot-butterfly-core">
              <span className="aot-bfly-wing aot-bfly-wing-left" />
              <span className="aot-bfly-wing aot-bfly-wing-right" />
              <span className="aot-bfly-body" />
            </span>
          </span>
        );
      })}
      {stars.map((star, index) => (
        <span
          key={`star-${index}`}
          className="star hidden dark:block"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${star.glow}px rgba(190, 218, 255, ${star.glowOpacity})`,
          }}
        />
      ))}
    </div>
  );
}
