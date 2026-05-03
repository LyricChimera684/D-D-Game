import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useGetPlayerAchievements, getGetPlayerAchievementsQueryKey } from "@workspace/api-client-react";
import { auth } from "@/lib/auth";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, Sparkles } from "lucide-react";

export default function Achievements() {
  const user = auth.getUser();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user?.role === "admin") setLocation("/admin");
  }, [user?.role]);

  const { data: achievements, isLoading } = useGetPlayerAchievements(user?.id || 0, {
    query: { queryKey: getGetPlayerAchievementsQueryKey(user?.id || 0), enabled: !!user?.id },
  });

  if (!user) return null;

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl flex items-center justify-center gap-3">
            <Trophy className="text-primary w-8 h-8 sm:w-10 sm:h-10" /> Hall of Glory
          </h1>
          <p className="text-base sm:text-lg font-sans text-muted-foreground italic max-w-2xl mx-auto">
            Every deed of valor, every cunning trick, every desperate stand — recorded forever in your name.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-28 bg-card animate-pulse rounded-xl border border-border/30 opacity-50" />
              ))}
            </div>
          ) : !achievements?.length ? (
            <div className="text-center py-20 bg-card/30 border border-border/30 rounded-lg">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl mb-2">No Glory Yet</h3>
              <p className="text-muted-foreground font-sans">
                Step into a campaign and forge your first legend. Achievements appear here as you play.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-card border border-border/50 rounded-xl p-4 flex gap-3 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all"
                >
                  <div className="text-4xl shrink-0">{a.icon}</div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg text-primary leading-tight">{a.title}</h3>
                    <p className="font-sans text-sm text-muted-foreground mt-1">{a.description}</p>
                    <p className="font-sans text-xs text-muted-foreground/60 mt-2">
                      {new Date(a.unlockedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </AppLayout>
  );
}
