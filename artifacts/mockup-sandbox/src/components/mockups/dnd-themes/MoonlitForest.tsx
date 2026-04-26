export function MoonlitForest() {
  const chars = [
    { name: "Sylvara", race: "Wood Elf", cls: "Druid", level: 6, hp: 48, maxHp: 52, xp: 4900 },
    { name: "Stonebrook", race: "Gnome", cls: "Artificer", level: 4, hp: 28, maxHp: 32, xp: 1750 },
    { name: "Nyx", race: "Changeling", cls: "Bard", level: 5, hp: 38, maxHp: 44, xp: 3200 },
  ];

  return (
    <div style={{
      fontFamily: "'Palatino Linotype', 'Book Antiqua', serif",
      background: "linear-gradient(160deg, #020d08 0%, #04180e 40%, #061208 100%)",
      minHeight: "100vh",
      color: "#c9e8d0",
    }}>
      {/* Ambient stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 5 === 0 ? 3 : 2,
            height: i % 5 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: "#c9e8d0",
            opacity: 0.15 + (i % 4) * 0.08,
            top: `${(i * 23) % 80}%`,
            left: `${(i * 37 + 5) % 95}%`,
          }}/>
        ))}
      </div>

      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 62,
        background: "rgba(2,20,10,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(80,200,120,0.15)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🌿</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.14em", color: "#6ee88a" }}>Realms of Replit</div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "rgba(110,232,138,0.35)", marginTop: 1 }}>where nature meets the arcane</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 28 }}>
          {["Hub", "Campaigns", "Notices"].map(n => (
            <a key={n} style={{ fontSize: 12, letterSpacing: "0.12em", color: "rgba(180,220,190,0.5)", textDecoration: "none", cursor: "pointer" }}>{n}</a>
          ))}
        </nav>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, fontSize: 12,
          background: "rgba(80,200,120,0.08)",
          border: "1px solid rgba(80,200,120,0.2)",
          padding: "6px 14px", borderRadius: 20,
        }}>
          <span style={{ color: "#6ee88a", fontSize: 10 }}>●</span>
          <span style={{ color: "rgba(180,220,190,0.7)" }}>sylvara</span>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: "44px 40px 28px", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* moon */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%", margin: "0 auto 20px",
          background: "radial-gradient(circle at 35% 35%, #f0faf2, #c8e8d0)",
          boxShadow: "0 0 60px rgba(110,232,138,0.15), 0 0 120px rgba(110,232,138,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32,
        }}>🌙</div>
        <div style={{
          fontSize: 30, fontWeight: 700, color: "#e8f5ec",
          textShadow: "0 0 30px rgba(110,232,138,0.2)",
          marginBottom: 8,
        }}>
          Return, <span style={{ color: "#6ee88a", fontStyle: "italic" }}>Sylvara</span>
        </div>
        <p style={{ color: "rgba(180,220,190,0.4)", fontSize: 14, fontStyle: "italic", marginBottom: 28 }}>
          The forest whispers of new adventures on the wind.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {[
            { label: "Browse Campaigns", primary: true },
            { label: "New Character", primary: false },
            { label: "Notice Board", primary: false },
          ].map(b => (
            <button key={b.label} style={{
              padding: "10px 22px", borderRadius: 99, fontSize: 12, fontWeight: 600,
              letterSpacing: "0.1em", cursor: "pointer",
              background: b.primary ? "linear-gradient(135deg, #2d7a45, #1a5c30)" : "transparent",
              border: b.primary ? "none" : "1px solid rgba(80,200,120,0.2)",
              color: b.primary ? "#c9e8d0" : "rgba(180,220,190,0.5)",
              boxShadow: b.primary ? "0 0 20px rgba(80,200,120,0.2), inset 0 1px 0 rgba(110,232,138,0.15)" : "none",
            }}>{b.label}</button>
          ))}
        </div>
      </section>

      {/* Characters */}
      <section style={{ padding: "8px 40px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
          <span style={{ fontSize: 16 }}>🌿</span>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(180,220,190,0.6)" }}>YOUR COMPANIONS</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(80,200,120,0.2), transparent)" }}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {chars.map((c, idx) => (
            <div key={c.name} style={{
              background: "rgba(10,40,18,0.7)",
              border: "1px solid rgba(80,200,120,0.12)",
              borderRadius: 14,
              padding: 22,
              backdropFilter: "blur(8px)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Corner leaf accent */}
              <div style={{ position: "absolute", top: 0, right: 0, fontSize: 28, opacity: 0.06, transform: "rotate(45deg)", userSelect: "none" }}>🍃</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#e0f0e4" }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(180,220,190,0.4)", marginTop: 2, letterSpacing: "0.1em" }}>{c.race} · {c.cls}</div>
                </div>
                <div style={{
                  background: "rgba(80,200,120,0.1)", border: "1px solid rgba(80,200,120,0.2)",
                  borderRadius: 8, padding: "4px 10px",
                  fontSize: 13, fontWeight: 700, color: "#6ee88a",
                }}>Lv {c.level}</div>
              </div>

              {/* HP */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(180,220,190,0.35)", marginBottom: 5, letterSpacing: "0.08em" }}>
                  <span>HEALTH</span><span>{c.hp} / {c.maxHp}</span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{
                    width: `${(c.hp / c.maxHp) * 100}%`, height: "100%", borderRadius: 99,
                    background: "linear-gradient(90deg, #2d7a45, #6ee88a)",
                    boxShadow: "0 0 8px rgba(110,232,138,0.3)",
                  }}/>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 11 }}>
                <span style={{ color: "rgba(180,220,190,0.35)" }}>XP <span style={{ color: "#6ee88a" }}>{c.xp.toLocaleString()}</span></span>
                <button style={{ background: "none", border: "none", color: "rgba(239,68,68,0.4)", fontSize: 11, cursor: "pointer" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", paddingBottom: 24, position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: 11, color: "rgba(110,232,138,0.25)", letterSpacing: "0.25em" }}>
          ♪  FOREST AMBIENCE  ·  CLICK TO HEAR
        </span>
      </div>
    </div>
  );
}
