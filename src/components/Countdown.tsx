import { useState, useEffect } from "react";

interface TimeLeft {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
}

const getTimeLeft = (target: Date): TimeLeft => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
  return {
    jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
    heures: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    secondes: Math.floor((diff / 1000) % 60),
  };
};

const Countdown = ({ targetDate, label }: { targetDate: Date; label: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = Object.values(timeLeft).every((v) => v === 0);

  return (
    <div className="text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-primary/80 mb-3 font-body">
        {label}
      </p>
      {isExpired ? (
        <p className="text-2xl font-heading text-primary font-bold">Événement en cours !</p>
      ) : (
        <div className="flex justify-center gap-3 sm:gap-5">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-foreground/90 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl sm:text-3xl font-bold text-primary-foreground font-body">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-xs mt-2 text-muted-foreground uppercase tracking-wider font-body">
                {key}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countdown;
