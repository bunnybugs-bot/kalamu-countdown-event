import { useState } from "react";
import { Share2, Check, X } from "lucide-react";

const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const text = "Concours d'Écriture Kalamu 2026 — Participez avant le 12 Avril !";

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      color: "bg-[#25D366]",
    },
    {
      label: "Twitter / X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      color: "bg-[#1DA1F2]",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "bg-[#1877F2]",
    },
  ];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-2.5 rounded-full font-body font-semibold text-sm hover:bg-primary/10 transition-all hover:scale-105"
      >
        <Share2 className="w-4 h-4" />
        Partager le concours
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl p-3 shadow-lg z-50 min-w-[200px] animate-fade-in">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="space-y-2 mt-1">
            {shareLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-body text-foreground"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                {s.label}
              </a>
            ))}
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-body text-foreground w-full"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />}
              {copied ? "Lien copié !" : "Copier le lien"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
