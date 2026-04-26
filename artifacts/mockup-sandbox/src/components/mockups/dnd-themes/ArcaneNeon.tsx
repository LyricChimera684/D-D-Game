export function ArcaneNeon() {
  const chars = [
    { name: "Zyx the Void", race: "Tiefling", cls: "Warlock", level: 5, hp: 38, maxHp: 45, xp: 2400, color: "#a855f7" },
    { name: "Sable", race: "Half-Elf", cls: "Rogue", level: 3, hp: 22, maxHp: 26, xp: 900, color: "#06b6d4" },
    { name: "Ironclad", race: "Dwarf", cls: "Fighter", level: 7, hp: 62, maxHp: 70, xp: 6200, color: "#f59e0b" },
  ];

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(135deg, #080010 0%, #0d0520 50%, #050015 100%)",
      minHeight: "100vh",
      color: "#e2d9f3",
    }}>
      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 60,
        background: "rgba(120, 40, 220, 0.08)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(168, 85, 247, 0.2)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, filter: "drop-shadow(0 0 8px #a855f7)" }}>⚡</span>
          <span style={{
            fontWeight: 700, fontSize: 16, letterSpacing: "0.12em",
            background: "linear-gradient(90deg, #a855f7, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>REALMS OF REPLIT</span>
        </div>
        <nav style={{ display: "flex", gap: 28 }}>
          {["Hub", "Campaigns", "Notices"].map(n => (
            <a key={n} style={{ fontSize: 12, letterSpacing: "0.15em", color: "rgba(196,168,255,0.7)", textDecoration: "none", cursor: "pointer" }}>{n}</a>
          ))}
        </nav>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(168,85,247,0.1)", borderRadius: 8,
          border: "1px solid rgba(168,85,247,0.3)",
          padding: "6px 14px", fontSize: 13,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", display: "inline-block", boxShadow: "0 0 8px #a855f7" }}/>
          xylara_99
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: "48px 40px 32px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(90deg, #a855f7, #06b6d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          fontSize: 36, fontWeight: 800, letterSpacing: "0.04em", marginBottom: 10,
        }}>Welcome back, xylara_99</div>
        <p style={{ color: "rgba(196,168,255,0.5)", fontSize: 15, marginTop: 0 }}>
          The arcane nexus hums with power. Your destiny awaits.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
          {[
            { label: "Browse Campaigns", primary: true },
            { label: "New Character", primary: false },
            { label: "Notice Board", primary: false },
          ].map(b => (
            <button key={b.label} style={{
              padding: "10px 22px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              letterSpacing: "0.12em", cursor: "pointer",
              background: b.primary ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "transparent",
              border: b.primary ? "none" : "1px solid rgba(168,85,247,0.35)",
              color: b.primary ? "#fff" : "rgba(196,168,255,0.7)",
              boxShadow: b.primary ? "0 0 20px rgba(168,85,247,0.4)" : "none",
            }}>{b.label}</button>
          ))}
        </div>
      </section>

      {/* Characters */}
      <section style={{ padding: "8px 40px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span style={{ color: "#a855f7", fontSize: 18 }}>◈</span>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "0.1em" }}>YOUR HEROES</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(168,85,247,0.3), transparent)", marginLeft: 10 }}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {chars.map((c) => (
            <div key={c.name} style={{
              background: "rgba(168,85,247,0.05)",
              border: `1px solid rgba(168,85,247,0.2)`,
              borderRadius: 16,
              padding: 24,
              backdropFilter: "blur(12px)",
              boxShadow: `0 0 30px rgba(168,85,247,0.08), inset 0 0 40px rgba(168,85,247,0.03)`,
              position: "relative", overflow: "hidden",
            }}>
              {/* glow top-right */}
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${c.color}22, transparent 70%)`, pointerEvents: "none" }}/>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(196,168,255,0.5)", letterSpacing: "0.1em" }}>{c.race} · {c.cls}</div>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `linear-gradient(135deg, ${c.color}33, ${c.color}11)`,
                  border: `1px solid ${c.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 800, color: c.color,
                }}>
                  {c.level}
                </div>
              </div>
              {/* HP bar */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(196,168,255,0.5)", marginBottom: 5 }}>
                  <span>HEALTH</span><span>{c.hp}/{c.maxHp}</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${(c.hp / c.maxHp) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`, borderRadius: 99 }}/>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(196,168,255,0.5)", marginTop: 12 }}>
                <span>XP: <span style={{ color: c.color }}>{c.xp.toLocaleString()}</span></span>
                <button style={{ background: "transparent", border: "none", color: "rgba(239,68,68,0.6)", fontSize: 11, cursor: "pointer" }}>✕ Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sound-effect indicator */}
      <div style={{ textAlign: "center", paddingBottom: 24 }}>
        <span style={{ fontSize: 11, color: "rgba(168,85,247,0.4)", letterSpacing: "0.2em" }}>
          ♪  ARCANE AMBIENCE  ·  CLICK FOR SOUND
        </span>
      </div>
    </div>
  );
}
