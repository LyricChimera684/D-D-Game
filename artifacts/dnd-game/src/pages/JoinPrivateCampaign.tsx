import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  useJoinCampaign,
  useGetPlayerCharacters,
  getGetPlayerCharactersQueryKey,
} from "@workspace/api-client-react";
import { auth } from "@/lib/auth";
import { sound } from "@/lib/sound";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Key,
  Map,
  Users,
  Clock,
  Cpu,
  Crown,
  ArrowLeft,
  Loader2,
  Shield,
  Swords,
  Hash,
} from "lucide-react";

// ── Tiny helpers ─────────────────────────────────────────────────────────────

function getCampaignAge(createdAt: string) {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

type FoundCampaign = {
  id: number;
  title: string;
  description: string;
  setting: string;
  isPublic: boolean;
  creatorId: number;
  dmType: string;
  humanDmId?: number;
  createdAt: string;
  creatorUsername: string;
};

// ── Character picker ──────────────────────────────────────────────────────────

function CharPicker({
  characters,
  selected,
  onSelect,
}: {
  characters: any[];
  selected: number | "";
  onSelect: (id: number) => void;
}) {
  if (!characters.length) {
    return (
      <p className="text-sm text-muted-foreground font-sans italic text-center py-4">
        No adventurers yet.{" "}
        <a href="/character/new" className="text-primary underline">
          Create one first.
        </a>
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {characters.map((c: any) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`px-3 py-1.5 rounded-full border text-sm font-sans transition-all ${
            selected === c.id
              ? "bg-primary text-primary-foreground border-primary shadow"
              : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {c.name}{" "}
          <span className="opacity-60">
            {c.race} {c.class}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JoinPrivateCampaign() {
  const user = auth.getUser();
  const [, setLocation] = useLocation();

  const [campaignIdInput, setCampaignIdInput] = useState("");
  const [code, setCode] = useState("");
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [campaign, setCampaign] = useState<FoundCampaign | null>(null);

  const [selectedCharId, setSelectedCharId] = useState<number | "">("");
  const [joinError, setJoinError] = useState("");
  const [joining, setJoining] = useState(false);

  const { data: characters } = useGetPlayerCharacters(user?.id || 0, {
    query: {
      queryKey: getGetPlayerCharactersQueryKey(user?.id || 0),
      enabled: !!user?.id,
    },
  });

  const { mutate: joinCampaign } = useJoinCampaign({
    mutation: {
      onSuccess: (session: any) => {
        auth.setSession({
          sessionId: session.id,
          campaignId: session.campaignId,
          characterId: Number(selectedCharId),
        });
        setLocation(`/game/${session.id}`);
      },
      onError: (err: any) => {
        setJoinError(
          err.message || "Failed to join. Check the ID and code and try again.",
        );
        setJoining(false);
      },
    },
  });

  function resetLookup() {
    setCampaign(null);
    setLookupError("");
  }

  async function handleLookup() {
    const id = parseInt(campaignIdInput.trim(), 10);
    const trimmedCode = code.trim();

    if (!id || isNaN(id)) {
      setLookupError("Please enter a valid numeric Campaign ID.");
      return;
    }
    if (!trimmedCode) {
      setLookupError("Please enter the secret code.");
      return;
    }

    setLooking(true);
    setLookupError("");
    setCampaign(null);

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiBase}/api/campaigns/${id}`);
      if (!res.ok) {
        setLookupError("No campaign found with that ID.");
        return;
      }
      const data = await res.json();
      if (data.isPublic) {
        setLookupError(
          "That campaign is public — just join it from the Campaigns page.",
        );
        return;
      }
      setCampaign(data);
    } catch {
      setLookupError("Something went wrong. Please try again.");
    } finally {
      setLooking(false);
    }
  }

  function handleJoin() {
    if (!campaign || !user) return;
    if (!selectedCharId) {
      setJoinError("Choose your adventurer first!");
      return;
    }
    setJoinError("");
    setJoining(true);
    joinCampaign({
      campaignId: campaign.id,
      data: {
        playerId: user.id,
        characterId: Number(selectedCharId),
        inviteCode: code.trim(),
      },
    });
  }

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.click();
              setLocation("/campaigns");
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl">Join Private Campaign</h1>
            <p className="font-sans text-muted-foreground italic text-sm mt-1">
              Enter the Campaign ID and secret code to unlock a hidden realm.
            </p>
          </div>
        </div>

        {/* Step 1 — Enter ID + Code */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/50 border border-border/50 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] space-y-4"
        >
          {/* Campaign ID */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-muted-foreground mb-2">
              <Hash className="w-3 h-3" /> Campaign ID
            </label>
            <Input
              type="number"
              placeholder="e.g. 42"
              value={campaignIdInput}
              onChange={(e) => {
                setCampaignIdInput(e.target.value);
                resetLookup();
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              className="h-12 rounded-full"
            />
          </div>

          {/* Secret Code */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-muted-foreground mb-2">
              <Key className="w-3 h-3 text-secondary" /> Secret Code
            </label>
            <Input
              placeholder="e.g. Mellon"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                resetLookup();
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              className="h-12 rounded-full"
            />
          </div>

          <Button
            onClick={handleLookup}
            disabled={!campaignIdInput.trim() || !code.trim() || looking}
            className="w-full rounded-full"
          >
            {looking ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              "Find Campaign"
            )}
          </Button>

          <AnimatePresence>
            {lookupError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-secondary text-sm font-sans italic text-center bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full"
              >
                {lookupError}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Step 2 — Campaign preview + join */}
        <AnimatePresence>
          {campaign && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Campaign card */}
              <div className="bg-card border border-primary/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(212,175,55,0.08)]">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-2xl text-primary">{campaign.title}</h3>
                  <span className="text-xs font-sans font-semibold text-muted-foreground bg-foreground/5 border border-border/40 px-2 py-0.5 rounded-full shrink-0 mt-1">
                    #{campaign.id}
                  </span>
                </div>
                <p className="font-sans text-muted-foreground italic mb-4">
                  "{campaign.description}"
                </p>
                <div className="space-y-2 text-sm font-sans border-t border-border/30 pt-4">
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Setting:{" "}
                      <span className="text-foreground">
                        {campaign.setting}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>
                      Creator:{" "}
                      <span className="text-foreground">
                        {campaign.creatorUsername}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {campaign.dmType === "player" ? (
                      <>
                        <Crown className="w-4 h-4 text-orange-400" />
                        <span>
                          DM:{" "}
                          <span className="text-orange-400 font-semibold">
                            Player-Hosted
                          </span>
                        </span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-4 h-4 text-primary" />
                        <span>
                          DM:{" "}
                          <span className="text-primary font-semibold">AI</span>
                        </span>
                      </>
                    )}
                  </div>
                  {campaign.createdAt && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {getCampaignAge(campaign.createdAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Character selection */}
              <div className="bg-foreground/5 border border-primary/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="font-display text-base text-primary tracking-wide">
                    Choose Your Adventurer
                  </h3>
                </div>
                <CharPicker
                  characters={(characters ?? []) as any[]}
                  selected={selectedCharId}
                  onSelect={(id) => {
                    setSelectedCharId(id);
                    setJoinError("");
                  }}
                />
              </div>

              {/* Join button */}
              <Button
                className="w-full rounded-full h-12 text-base"
                onClick={handleJoin}
                disabled={joining || !selectedCharId}
              >
                {joining ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entering Realm...
                  </>
                ) : (
                  <>
                    <Swords className="w-4 h-4 mr-2" />
                    Enter Campaign
                  </>
                )}
              </Button>

              <AnimatePresence>
                {joinError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-secondary text-sm text-center font-sans italic bg-secondary/10 border border-secondary/20 px-4 py-2 rounded-full"
                  >
                    {joinError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
