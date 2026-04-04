const TimelineEvent = ({ date, title, active }: { date: string; title: string; active?: boolean }) => (
  <div className="flex items-start gap-4 group">
    <div className="flex flex-col items-center">
      <div className={`w-4 h-4 rounded-full border-2 ${active ? "bg-primary border-primary animate-pulse-glow" : "border-muted-foreground/40 bg-card"}`} />
      <div className="w-0.5 h-12 bg-border" />
    </div>
    <div className="-mt-1">
      <p className="text-xs font-medium uppercase tracking-wider text-primary font-body">{date}</p>
      <p className={`text-sm font-body ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{title}</p>
    </div>
  </div>
);

export default TimelineEvent;
