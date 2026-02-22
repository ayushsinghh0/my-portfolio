const STAR_COUNT = 180;

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

export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((star, index) => (
        <span
          key={`star-${index}`}
          className="star"
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
