import heroBg from "@/assets/hero-bg.jpg";
import Countdown from "@/components/Countdown";
import TimelineEvent from "@/components/TimelineEvent";
import { BookOpen, Feather, Heart, Award, ExternalLink } from "lucide-react";

const DEADLINE = new Date("2026-04-12T23:59:00");
const CEREMONY = new Date("2026-05-23T15:00:00");

const themes = [
  { icon: Heart, label: "La Santé Mentale" },
  { icon: Feather, label: "La Confiance en Soi" },
  { icon: BookOpen, label: "Le Patrimoine" },
  { icon: Award, label: "Les Droits des Enfants" },
];

const timeline = [
  { date: "23 Mars", title: "Lancement officiel de la communication" },
  { date: "12 Avril", title: "Clôture des inscriptions (23h59)", active: true },
  { date: "13 Avril – 4 Mai", title: "Phase d'évaluation par le Grand Jury" },
  { date: "5 Mai", title: "Annonce des 3 lauréats" },
  { date: "21–23 Mai", title: "Journées de l'Excellence Kalamu" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Savane africaine au coucher du soleil"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-4 font-body">
              Association Kalamu présente
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-4 leading-tight">
              Concours d'Écriture
              <br />
              <span className="text-primary">Kalamu</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg sm:text-xl font-heading italic mb-2">
              « Grandir par la lecture, s'élever par l'écriture »
            </p>
            <p className="text-primary-foreground/60 text-sm font-body mb-10">
              2ème Édition — 2026 • Thème : La Santé Mentale des Jeunes
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <Countdown targetDate={DEADLINE} label="Clôture des inscriptions" />
          </div>

          <div className="mt-10 animate-fade-in-up" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <a
              href="https://kalamu-association.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all hover:scale-105"
            >
              Visiter le site Kalamu <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            Thématiques 2026
          </h2>
          <p className="text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
            Genre : <strong>Poésie uniquement</strong> — Un recueil d'un minimum de 20 poèmes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-all hover:-translate-y-1 group"
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-body font-medium text-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline & Ceremony */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
              Calendrier
            </h2>
            <div>
              {timeline.map((e) => (
                <TimelineEvent key={e.date} {...e} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Cérémonie des Prix
            </h2>
            <p className="text-muted-foreground font-body text-sm mb-8">
              Samedi 23 Mai 2026 — Lectures scéniques, témoignages et récompenses des lauréats.
            </p>
            <Countdown targetDate={CEREMONY} label="Journées de l'Excellence" />

            <div className="mt-10 bg-background rounded-xl p-6 border border-border">
              <h3 className="font-heading font-bold text-foreground mb-3">🏆 Prix du Lauréat</h3>
              <p className="text-sm text-muted-foreground font-body">
                Le premier prix inclut l'<strong>édition professionnelle</strong> de votre premier recueil de poèmes. Une opportunité unique de devenir un auteur publié.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 text-center border-t border-border">
        <p className="text-muted-foreground text-sm font-body">
          © 2026 Association Kalamu — « Grandir par la lecture, s'élever par l'écriture »
        </p>
        <a
          href="https://kalamu-association.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-body hover:underline mt-2 inline-block"
        >
          kalamu-association.netlify.app
        </a>
      </footer>
    </div>
  );
};

export default Index;
