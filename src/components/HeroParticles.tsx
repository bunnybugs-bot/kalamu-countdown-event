const particles = [
  { size: 10, left: "8%",  bottom: "20%", delay: "0s"   },
  { size: 16, left: "18%", bottom: "35%", delay: "1.5s" },
  { size: 8,  left: "30%", bottom: "15%", delay: "0.8s" },
  { size: 20, left: "45%", bottom: "40%", delay: "2.2s" },
  { size: 12, left: "60%", bottom: "25%", delay: "0.3s" },
  { size: 18, left: "72%", bottom: "50%", delay: "1.8s" },
  { size: 9,  left: "85%", bottom: "30%", delay: "1.1s" },
  { size: 14, left: "93%", bottom: "45%", delay: "2.7s" },
];

const HeroParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {particles.map((p, i) => (
      <div
        key={i}
        className="ink-particle"
        style={{
          width: p.size,
          height: p.size,
          left: p.left,
          bottom: p.bottom,
          animationDelay: p.delay,
        }}
      />
    ))}
  </div>
);

export default HeroParticles;
