import { useState, useEffect } from "react";

const START = new Date("2026-03-23T00:00:00").getTime();
const END = new Date("2026-04-12T23:59:00").getTime();
const TOTAL = END - START;

const DeadlineProgress = () => {
  const [pct, setPct] = useState(() => {
    const elapsed = Date.now() - START;
    return Math.min(100, Math.max(0, (1 - elapsed / TOTAL) * 100));
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - START;
      setPct(Math.min(100, Math.max(0, (1 - elapsed / TOTAL) * 100)));
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex justify-between text-xs font-body text-primary-foreground/60 mb-1.5">
        <span>Temps restant</span>
        <span className="font-semibold text-primary">{pct.toFixed(1)}%</span>
      </div>
      <div className="h-2 rounded-full bg-foreground/30 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 shimmer"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default DeadlineProgress;
