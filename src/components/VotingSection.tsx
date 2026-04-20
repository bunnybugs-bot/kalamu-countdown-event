import { useEffect, useState } from "react";
import { Award, CheckCircle, Users, Loader2 } from "lucide-react";

const FINALISTS = [
  { id: 1, name: "El Hadji Ibrahima Khalil Barry", city: "Kaolack" },
  { id: 2, name: "Ousseynou Gueye", city: "Rufisque" },
  { id: 3, name: "Djibril Diallo", city: "Kaolack" },
  { id: 4, name: "Amy Dione", city: "Dakar" },
  { id: 5, name: "Aliou Ndiaye", city: "Kaolack" },
  { id: 6, name: "Pape Diatta Sène", city: "Dakar" },
  { id: 7, name: "Souado Djité Thiam", city: "Kaolack" },
  { id: 8, name: "Baye Cheikh", city: "Kaolack" },
  { id: 9, name: "Hawa Ba", city: "Kaolack" },
  { id: 10, name: "Oumouratou Bangoura", city: "Kaolack" },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const LOCAL_VOTE_KEY = "kalamu_2026_voted_for";

type VoteRow = { finalist_id: number; vote_count: number };

async function fetchVotes(): Promise<VoteRow[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/votes?select=finalist_id,vote_count`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  if (!res.ok) throw new Error("Erreur lors de la récupération des votes");
  return res.json();
}

async function castVote(finalistId: number): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_vote`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_finalist_id: finalistId }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'enregistrement du vote");
}

const RevealSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <div className={className} style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

const VotingSection = () => {
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [myVote, setMyVote] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalVotes = Object.values(votes).reduce((s, v) => s + v, 0);

  useEffect(() => {
    // Restore local vote
    const stored = localStorage.getItem(LOCAL_VOTE_KEY);
    if (stored) setMyVote(parseInt(stored, 10));

    // Load votes from Supabase
    fetchVotes()
      .then((rows) => {
        const map: Record<number, number> = {};
        rows.forEach((r) => { map[r.finalist_id] = r.vote_count; });
        setVotes(map);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les votes. Vérifiez la connexion.");
        setLoading(false);
      });
  }, []);

  const handleVote = async (id: number) => {
    if (myVote !== null || voting) return;
    setVoting(true);
    setError(null);
    try {
      await castVote(id);
      setMyVote(id);
      localStorage.setItem(LOCAL_VOTE_KEY, String(id));
      setVotes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
      const finalist = FINALISTS.find((f) => f.id === id);
      setSuccessMsg(`Votre vote pour ${finalist?.name} a été enregistré !`);
    } catch {
      setError("Erreur lors du vote. Veuillez réessayer.");
    } finally {
      setVoting(false);
    }
  };

  const pct = (id: number) => {
    if (!totalVotes) return 0;
    return +((votes[id] ?? 0) / totalVotes * 100).toFixed(1);
  };

  const leader = totalVotes > 0
    ? FINALISTS.reduce((a, f) => (votes[f.id] ?? 0) > (votes[a.id] ?? 0) ? f : a, FINALISTS[0])
    : null;

  return (
    <section className="py-20 px-4 bg-card" id="vote">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <RevealSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-body font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
              Votes ouverts — dès le 20 Avril 2026
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
              Vote du Public
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-sm">
              Votre voix représente <strong>20%</strong> de la note finale. Le Grand Jury attribue les{" "}
              <strong>80%</strong> restants. Un seul vote par personne.
            </p>
          </div>
        </RevealSection>

        {/* Score pills */}
        <RevealSection delay={100}>
          <div className="flex justify-center gap-4 mb-10 flex-wrap">
            <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-5 py-3">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Grand Jury</span>
              <span className="font-heading font-bold text-2xl text-primary">80%</span>
            </div>
            <div className="flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-5 py-3">
              <Users className="w-4 h-4" />
              <span className="font-body text-sm font-medium">Vote public</span>
              <span className="font-heading font-bold text-2xl">20%</span>
            </div>
          </div>
        </RevealSection>

        {/* Success banner */}
        {successMsg && (
          <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-3 font-body text-sm">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            {successMsg}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 font-body text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground font-body text-sm">
            <Loader2 className="w-5 h-5 animate-spin" />
            Chargement des votes...
          </div>
        ) : (
          <>
            {/* Finalists grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {FINALISTS.map((f, i) => {
                const isVoted = myVote === f.id;
                const hasVoted = myVote !== null;
                const voteCount = votes[f.id] ?? 0;
                const vpct = pct(f.id);

                return (
                  <RevealSection key={f.id} delay={i * 60}>
                    <div
                      className={`bg-background rounded-xl border p-5 transition-all ${
                        isVoted
                          ? "border-primary ring-1 ring-primary/20"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-semibold flex-shrink-0 ${
                            isVoted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {f.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-foreground text-sm leading-tight">
                            {f.name}
                          </p>
                          <p className="font-body text-xs text-muted-foreground mt-0.5">{f.city}</p>
                        </div>
                        {isVoted && (
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        )}
                      </div>

                      {/* Vote bar */}
                      <div className="mb-3">
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-700"
                            style={{ width: `${vpct}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1.5">
                          <span className="text-xs font-body text-muted-foreground">
                            {voteCount} vote{voteCount !== 1 ? "s" : ""}
                          </span>
                          <span className="text-xs font-body font-medium text-primary">
                            {vpct}%
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleVote(f.id)}
                        disabled={hasVoted || voting}
                        className={`w-full py-2 rounded-lg text-sm font-body font-medium transition-all ${
                          isVoted
                            ? "bg-primary text-primary-foreground cursor-default"
                            : hasVoted
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "border border-border hover:border-primary hover:text-primary hover:bg-primary/5 text-foreground"
                        }`}
                      >
                        {isVoted ? "✓ Votre vote" : voting ? "Enregistrement..." : "Voter"}
                      </button>
                    </div>
                  </RevealSection>
                );
              })}
            </div>

            {/* Dashboard */}
            <RevealSection delay={200}>
              <div className="bg-background rounded-xl border border-border p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">
                  Tableau de bord
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-1">
                      Total votes
                    </p>
                    <p className="text-2xl font-heading font-bold text-foreground">{totalVotes}</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-1">
                      En tête
                    </p>
                    <p className="text-sm font-body font-medium text-primary leading-tight">
                      {leader ? leader.name.split(" ")[0] + " " + leader.name.split(" ")[1] : "—"}
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-border col-span-2 sm:col-span-1">
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wide mb-1">
                      Résultats officiels
                    </p>
                    <p className="text-sm font-body font-medium text-foreground">11 Mai 2026</p>
                  </div>
                </div>
                <p className="text-xs font-body text-muted-foreground text-center">
                  Un vote par navigateur · Les votes publics influencent 20% de la note finale
                </p>
              </div>
            </RevealSection>
          </>
        )}
      </div>
    </section>
  );
};

export default VotingSection;