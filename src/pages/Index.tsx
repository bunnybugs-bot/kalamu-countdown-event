import { useState, useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";
import Countdown from "@/components/Countdown";
import TimelineEvent from "@/components/TimelineEvent";
import HeroParticles from "@/components/HeroParticles";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  BookOpen, Feather, Heart, Award, ExternalLink, Users, Globe,
  Brain, Clock, Calendar, CheckCircle2, ChevronDown, Share2,
  Instagram, Facebook, MessageCircle, ArrowRight, Star,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

// ── dates ──────────────────────────────────────────────────────────────────
const LAUNCH   = new Date("2026-03-23T00:00:00");
const DEADLINE = new Date("2026-04-12T23:59:00");
const CEREMONY = new Date("2026-05-23T15:00:00");

// ── themes ─────────────────────────────────────────────────────────────────
const themes = [
  { icon: Brain,    label: "La Santé Mentale",      highlight: true,  desc: "Explorez l'anxiété, la résilience et le bien-être intérieur des jeunes." },
  { icon: Users,    label: "La Place de la Femme",  highlight: false, desc: "Célébrez la force, la dignité et l'égalité des femmes." },
  { icon: Award,    label: "Les Droits des Enfants",highlight: false, desc: "Défendez l'innocence, l'éducation et la protection de l'enfance." },
  { icon: Feather,  label: "La Confiance en Soi",   highlight: false, desc: "Chantez la puissance du croire en soi et l'estime personnelle." },
  { icon: Globe,    label: "Le Voyage",              highlight: false, desc: "Partez à la découverte intérieure ou vers l'ailleurs." },
  { icon: BookOpen, label: "Le Patrimoine",          highlight: false, desc: "Honorez les racines, la culture et la mémoire collective." },
];

// ── partners ───────────────────────────────────────────────────────────────
const partners = [
  "Direction du Livre et de la Lecture",
  "Centre Culturel Régional de Kaolack",
  "Inspection Académie de Kaolack",
  "Conseil Départemental de Kaolack",
  "Mairie de Kaolack",
  "Alliance Française de Kaolack",
  "Wallonie Bruxelles International",
  "ENABEL",
  "Les Éditions Ceddo",
  "Sénégal Niaay Magazine",
  "ClapFilmGroup",
  "Xela Xel",
  "RTS",
  "Kaolack Infos",
];

// ── timeline ───────────────────────────────────────────────────────────────
const timeline = [
  { date: "23 Mars",       title: "Lancement officiel de la communication" },
  { date: "12 Avril",      title: "Clôture des inscriptions (23h59)", active: true },
  { date: "13 Avril – 4 Mai", title: "Phase d'évaluation par le Grand Jury" },
  { date: "5 Mai",         title: "Délibération finale et annonce des 3 lauréats" },
  { date: "7–19 Mai",      title: "Préparation logistique de la Journée de l'Excellence" },
  { date: "21–23 Mai",     title: "Journées de l'Excellence Kalamu" },
  { date: "25 Mai",        title: "Post-concours, évaluation et rapports" },
];

// ── programme ──────────────────────────────────────────────────────────────
const programme = [
  {
    day: "Jeudi 21 Mai 2026",
    events: [
      { time: "09h00 – 12h00", title: "Journée de Don", desc: "Action sociale orientée vers une structure de soutien psychologique ou un centre de santé de Kaolack." },
      { time: "15h30 – 18h00", title: "Café Livres",    desc: "Rencontre conviviale (auteurs, lecteurs, membres Kalamu) sur l'impact thérapeutique de la lecture." },
    ],
  },
  {
    day: "Vendredi 22 Mai 2026",
    events: [
      { time: "09h00 – 13h00", title: "Exposition \"Du Livre\"",  desc: "Installation de stands pour la Mini Foire du Livre avec les auteurs." },
      { time: "15h00 – 18h00", title: "Panel de discussion",     desc: "Débat sur l'importance du livre dans le développement personnel et la santé mentale des jeunes." },
    ],
  },
  {
    day: "Samedi 23 Mai 2026",
    events: [
      { time: "10h00 – 12h00", title: "Renforcement de Capacités",          desc: "Formation offerte en Prise de Parole en Public." },
      { time: "15h00 – 19h00", title: "Cérémonie Officielle de Remise des Prix", desc: "Lectures scéniques, témoignages et récompenses des lauréats." },
    ],
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Comment soumettre mon œuvre ?",
    a: "Envoyez votre recueil à associationkalamu@gmail.com avec pour objet « Concours Kalamu 2026 – [Votre Prénom et Nom] ». Joignez votre manuscrit en PDF ou Word.",
  },
  {
    q: "Quel format est accepté ?",
    a: "PDF ou Word (.docx), police lisible (Times New Roman ou Garamond, taille 12), pages numérotées, avec une page de garde indiquant votre nom, âge, et thématique choisie.",
  },
  {
    q: "Combien de poèmes minimum ?",
    a: "Un recueil d'un minimum de 20 poèmes portant sur l'une des 6 thématiques proposées. Il n'y a pas de maximum.",
  },
  {
    q: "Qui peut participer ?",
    a: "Tout francophone âgé de 15 à 35 ans, sans restriction géographique ou de nationalité. La participation est entièrement gratuite.",
  },
  {
    q: "Qui compose le jury ?",
    a: "Un Grand Jury indépendant composé d'auteurs publiés, d'universitaires et de professionnels de la culture. Les noms seront annoncés avant la délibération.",
  },
  {
    q: "Y a-t-il des frais d'inscription ?",
    a: "Non, la participation est entièrement gratuite et ouverte à tous.",
  },
  {
    q: "Quand seront annoncés les résultats ?",
    a: "Le 5 mai 2026, après la délibération finale du jury. Les résultats seront communiqués par e-mail aux participants et publiés sur nos réseaux sociaux.",
  },
];

// ── eligibility ────────────────────────────────────────────────────────────
const eligibility = [
  { label: "Âge",             value: "15 à 35 ans" },
  { label: "Langue",          value: "Français uniquement" },
  { label: "Nationalité",     value: "Toutes nationalités" },
  { label: "Genre littéraire",value: "Poésie uniquement" },
  { label: "Format",          value: "Min. 20 poèmes" },
  { label: "Inscription",     value: "Gratuite" },
];

// ── jury ───────────────────────────────────────────────────────────────────
const jury = [
  { initials: "GJ", name: "Grand Jury Littéraire", role: "Auteurs & Universitaires", color: "bg-primary/10 text-primary" },
  { initials: "CC", name: "Comité Culturel",       role: "Professionnels de la culture", color: "bg-secondary/10 text-secondary" },
  { initials: "AK", name: "Association Kalamu",    role: "Organisation & Coordination", color: "bg-accent/10 text-accent" },
];

// ── steps ──────────────────────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Rédigez votre recueil", desc: "Composez un minimum de 20 poèmes sur l'une des 6 thématiques. Laissez parler votre cœur et votre plume." },
  { num: "02", title: "Envoyez votre œuvre", desc: "Adressez votre recueil (PDF ou Word) à associationkalamu@gmail.com avant le 12 avril 2026 à 23h59." },
  { num: "03", title: "Attendez les résultats", desc: "Le Grand Jury évalue les recueils du 13 avril au 4 mai. Les 3 lauréats sont annoncés le 5 mai 2026." },
];

// ── helpers ────────────────────────────────────────────────────────────────
function getDeadlineProgress() {
  const total = DEADLINE.getTime() - LAUNCH.getTime();
  const elapsed = Date.now() - LAUNCH.getTime();
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}

function getWhatsAppShareUrl() {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const text = encodeURIComponent(`Découvrez le Concours d'Écriture Kalamu 2026 ! ${pageUrl}`);
  return `https://wa.me/?text=${text}`;
}

// ── component ──────────────────────────────────────────────────────────────
const Index = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const [copied, setCopied] = useState(false);
  const progress = getDeadlineProgress();

  const stepsReveal     = useScrollReveal();
  const eligReveal      = useScrollReveal();
  const themesReveal    = useScrollReveal();
  const timelineReveal  = useScrollReveal();
  const programmeReveal = useScrollReveal();
  const faqReveal       = useScrollReveal();
  const editionReveal   = useScrollReveal();
  const juryReveal      = useScrollReveal();
  const partnersReveal  = useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setParallaxY(window.scrollY * 0.35);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "Concours d'Écriture Kalamu 2026", url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="hero-gradient-border relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Savane africaine au coucher du soleil"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translateY(${parallaxY}px)` }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        <HeroParticles />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <img src={logo} alt="Logo Kalamu" className="w-32 sm:w-40 mx-auto mb-6" />
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-4 font-body">
              Association Kalamu présente
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-4 leading-tight">
              Concours d'Écriture
              <br />
              <span className="animate-shimmer">Kalamu</span>
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

            {/* Deadline progress bar */}
            <div className="mt-6 max-w-xs mx-auto">
              <div className="flex justify-between text-xs text-primary-foreground/60 font-body mb-1.5">
                <span>23 Mars</span>
                <span className="text-primary font-semibold">{progress}% du temps écoulé</span>
                <span>12 Avril</span>
              </div>
              <div className="h-2 rounded-full bg-primary-foreground/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-10 animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <a
              href="https://kalamu-association.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-semibold text-sm hover:brightness-110 transition-all hover:scale-105"
            >
              Visiter le site Kalamu <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="mailto:associationkalamu@gmail.com"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-full font-body font-semibold text-sm hover:bg-primary-foreground/20 transition-all hover:scale-105"
            >
              Envoyer votre œuvre <Heart className="w-4 h-4" />
            </a>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-sm hover:bg-primary-foreground/20 transition-all hover:scale-105"
            >
              {copied ? "Lien copié ✓" : <><Share2 className="w-4 h-4" /> Partager</>}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── How to participate ─────────────────────────────────────────── */}
      <section
        ref={stepsReveal.ref}
        className={`py-20 px-4 bg-card transition-all duration-700 ${stepsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            Comment participer ?
          </h2>
          <p className="text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
            Trois étapes simples pour rejoindre le Concours Kalamu.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative bg-background rounded-xl p-6 border border-border hover:border-primary/40 transition-colors">
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 z-10" />
                )}
                <span className="text-5xl font-heading font-bold text-primary/20 leading-none">{step.num}</span>
                <h3 className="font-heading font-bold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-sm font-body text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Eligibility ───────────────────────────────────────────────── */}
      <section
        ref={eligReveal.ref}
        className={`py-20 px-4 transition-all duration-700 ${eligReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            Qui peut participer ?
          </h2>
          <p className="text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
            Le concours est ouvert à tous les francophones passionnés d'écriture.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {eligibility.map(({ label, value }) => (
              <div key={label} className="bg-card rounded-xl p-5 border border-border flex flex-col items-center gap-2 hover:border-primary/40 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wide">{label}</p>
                <p className="text-sm font-body font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Themes ────────────────────────────────────────────────────── */}
      <section
        ref={themesReveal.ref}
        className={`py-20 px-4 bg-card transition-all duration-700 ${themesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            Thématiques 2026
          </h2>
          <p className="text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
            Genre : <strong>Poésie uniquement</strong> — Un recueil d'un minimum de 20 poèmes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {themes.map(({ icon: Icon, label, highlight, desc }) => (
              <div
                key={label}
                className={`bg-background rounded-xl p-6 border transition-all hover:-translate-y-1 group cursor-default ${
                  highlight ? "border-primary/60 ring-1 ring-primary/20" : "border-border hover:border-primary/40"
                }`}
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-body font-medium text-foreground">{label}</p>
                {highlight && (
                  <span className="inline-block mt-2 text-xs font-body text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Thème central
                  </span>
                )}
                <p className="text-xs font-body text-muted-foreground mt-3 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-300">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline & Ceremony ───────────────────────────────────────── */}
      <section
        ref={timelineReveal.ref}
        className={`py-20 px-4 transition-all duration-700 ${timelineReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
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
            <div className="mt-10 bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading font-bold text-foreground mb-3">🏆 Prix du Lauréat</h3>
              <p className="text-sm text-muted-foreground font-body">
                Le premier prix inclut l'<strong>édition professionnelle</strong> de votre premier recueil de poèmes. Une opportunité unique de devenir un auteur publié.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Programme ─────────────────────────────────────────────────── */}
      <section
        ref={programmeReveal.ref}
        className={`py-20 px-4 bg-card transition-all duration-700 ${programmeReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground text-center mb-3">
            Programme des Journées de l'Excellence
          </h2>
          <p className="text-muted-foreground font-body text-sm text-center mb-12 max-w-2xl mx-auto">
            3 jours d'activités culturelles, sociales et littéraires à Kaolack.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {programme.map((day) => (
              <div key={day.day} className="bg-background rounded-xl border border-border p-6 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2 mb-5">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-bold text-foreground text-sm">{day.day}</h3>
                </div>
                <div className="space-y-4">
                  {day.events.map((ev) => (
                    <div key={ev.time} className="border-l-2 border-primary/30 pl-4">
                      <div className="flex items-center gap-1.5 text-xs text-primary font-medium font-body mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        {ev.time}
                      </div>
                      <p className="text-sm font-body font-semibold text-foreground">{ev.title}</p>
                      <p className="text-xs font-body text-muted-foreground mt-0.5">{ev.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section
        ref={faqReveal.ref}
        className={`py-20 px-4 transition-all duration-700 ${faqReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground text-center mb-3">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground font-body text-sm text-center mb-12">
            Tout ce que vous devez savoir avant de participer.
          </p>
          <Accordion.Root type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <Accordion.Trigger className="w-full flex items-center justify-between px-5 py-4 text-left font-body font-medium text-foreground hover:bg-muted/40 transition-colors group">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-primary shrink-0 transition-transform group-data-[state=open]:rotate-180" />
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="px-5 pb-4 text-sm font-body text-muted-foreground">{faq.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* ── 1ère Édition ──────────────────────────────────────────────── */}
      <section
        ref={editionReveal.ref}
        className={`py-20 px-4 bg-card transition-all duration-700 ${editionReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-body font-semibold uppercase tracking-[0.25em] text-primary bg-primary/10 px-4 py-1 rounded-full mb-4">
            1ère Édition 2025
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Une première édition marquante
          </h2>
          <p className="text-muted-foreground font-body mb-10 max-w-xl mx-auto">
            La première édition du Concours Kalamu a révélé des talents exceptionnels et confirmé l'importance de la littérature dans l'épanouissement des jeunes francophones.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🥇", label: "1er Prix",   detail: "Édition professionnelle du recueil" },
              { icon: "🥈", label: "2ème Prix",  detail: "Reconnaissance & publication numérique" },
              { icon: "🥉", label: "3ème Prix",  detail: "Mention d'honneur & prix culturel" },
            ].map((prize) => (
              <div key={prize.label} className="bg-background rounded-xl border border-border p-6 hover:border-primary/40 transition-colors">
                <span className="text-4xl">{prize.icon}</span>
                <p className="font-heading font-bold text-foreground mt-3 mb-1">{prize.label}</p>
                <p className="text-xs font-body text-muted-foreground">{prize.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6 text-left">
            <Star className="w-5 h-5 text-primary mb-3" />
            <p className="font-body text-muted-foreground italic text-sm">
              « Le Concours Kalamu m'a permis de réaliser que mes mots pouvaient toucher d'autres âmes. Une expérience transformatrice que je recommande à tous les jeunes passionnés d'écriture. »
            </p>
            <p className="mt-3 text-xs font-body font-semibold text-primary">— Lauréat, 1ère Édition Kalamu</p>
          </div>
        </div>
      </section>

      {/* ── Jury / Équipe ─────────────────────────────────────────────── */}
      <section
        ref={juryReveal.ref}
        className={`py-20 px-4 transition-all duration-700 ${juryReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            Le Jury & l'Organisation
          </h2>
          <p className="text-muted-foreground font-body mb-12 max-w-2xl mx-auto">
            Un jury indépendant et une équipe dédiée pour garantir l'excellence et l'équité du concours.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {jury.map(({ initials, name, role, color }) => (
              <div key={name} className="bg-card rounded-xl border border-border p-6 hover:border-primary/40 transition-colors flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-heading font-bold mb-4 ${color}`}>
                  {initials}
                </div>
                <p className="font-body font-semibold text-foreground text-sm">{name}</p>
                <p className="text-xs font-body text-muted-foreground mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners ──────────────────────────────────────────────────── */}
      <section
        ref={partnersReveal.ref}
        className={`py-16 px-4 bg-card transition-all duration-700 ${partnersReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-3">
            Nos Partenaires
          </h2>
          <p className="text-muted-foreground font-body text-sm">
            Merci à tous ceux qui rendent cet événement possible.
          </p>
        </div>
        <div className="relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...partners, ...partners].map((name, i) => (
              <div
                key={i}
                className="inline-flex items-center justify-center mx-4 px-6 py-3 bg-background border border-border rounded-lg min-w-max"
              >
                <span className="text-sm font-body font-medium text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="py-10 px-4 text-center border-t border-border">
        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <a
            href="https://www.instagram.com/association.kalamu/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/AssociationKalamu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>

        <p className="text-muted-foreground text-sm font-body">
          © 2026 Association Kalamu — « Grandir par la lecture, s'élever par l'écriture »
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
          <a
            href="https://kalamu-association.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm font-body hover:underline"
          >
            kalamu-association.netlify.app
          </a>
          <span className="hidden sm:inline text-border">•</span>
          <a
            href="mailto:associationkalamu@gmail.com"
            className="text-primary text-sm font-body hover:underline"
          >
            associationkalamu@gmail.com
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Index;
