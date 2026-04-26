export function IronCrimson() {
  const chars = [
    { name: "Mordhau", race: "Human", cls: "Paladin", level: 8, hp: 71, maxHp: 80, xp: 9200 },
    { name: "Vex Ashwood", race: "Elf", cls: "Ranger", level: 4, hp: 30, maxHp: 36, xp: 1600 },
    { name: "Gnarl", race: "Orc", cls: "Barbarian", level: 6, hp: 48, maxHp: 64, xp: 4800 },
  ];

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#0e0e0e",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      minHeight: "100vh",
      color: "#c9c9c9",
    }}>
      {/* Header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: 64,
        background: "linear-gradient(180deg, rgba(20,5,5,0.98) 0%, rgba(14,0,0,0.95) 100%)",
        borderBottom: "2px solid #8b0000",
        boxShadow: "0 2px 30px rgba(139,0,0,0.5)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24, filter: "drop-shadow(0 0 6px #cc0000)" }}>⚔</span>
          <div>
            <div style={{ fontWeight: 900, fontSize: 17, letterSpacing: "0.2em", color: "#cc0000", lineHeight: 1 }}>REALMS OF REPLIT</div>
            <div style={{ fontSize: 9, letterSpacing: "0.4em", color: "#555", marginTop: 1 }}>BLOOD · STEEL · GLORY</div>
          </div>
        </div>
        <nav style={{ display: "flex", gap: 2 }}>
          {["Hub", "Campaigns", "Notices"].map(n => (
            <a key={n} style={{
              fontSize: 11, letterSpacing: "0.2em", color: "#777", textDecoration: "none",
              padding: "6px 16px", cursor: "pointer",
              borderRight: "1px solid #222",
            }}>{n.toUpperCase()}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#555" }}>
          <span style={{ color: "#cc0000" }}>■</span> MORDHAU
        </div>
      </header>

      {/* Hero */}
      <section style={{
        padding: "40px",
        borderBottom: "1px solid #1a1a1a",
        background: "linear-gradient(180deg, rgba(139,0,0,0.06) 0%, transparent 100%)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#cc0000", marginBottom: 6 }}>── ADVENTURER RETURNS ──</div>
            <div style={{ fontSize: 34, fontWeight: 900, color: "#fff", letterSpacing: "0.04em", textShadow: "0 0 40px rgba(139,0,0,0.5)", lineHeight: 1.1 }}>
              Welcome back,<br />
              <span style={{ color: "#cc0000" }}>Mordhau.</span>
            </div>
            <p style={{ color: "#555", fontSize: 14, marginTop: 12, fontStyle: "italic" }}>
              "The realm remembers your deeds. New battles await."
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "⚔  ENTER CAMPAIGN", primary: true },
              { label: "◈  NEW HERO", primary: false },
              { label: "✦  NOTICE BOARD", primary: false },
            ].map(b => (
              <button key={b.label} style={{
                padding: "11px 28px", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
                cursor: "pointer",
                background: b.primary ? "linear-gradient(180deg, #cc0000 0%, #8b0000 100%)" : "transparent",
                border: b.primary ? "none" : "1px solid #2a2a2a",
                color: b.primary ? "#fff" : "#555",
                fontFamily: "inherit",
                boxShadow: b.primary ? "0 4px 20px rgba(139,0,0,0.5), inset 0 1px 0 rgba(255,100,100,0.2)" : "none",
              }}>{b.label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Characters */}
      <section style={{ padding: "32px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ width: 3, height: 24, background: "#cc0000", boxShadow: "0 0 10px #cc0000" }}/>
          <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.25em", color: "#888" }}>YOUR CHAMPIONS</span>
          <div style={{ flex: 1, height: 1, background: "#1a1a1a" }}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {chars.map((c) => (
            <div key={c.name} style={{
              background: "linear-gradient(180deg, #141414 0%, #101010 100%)",
              border: "1px solid #222",
              borderTop: "2px solid #cc0000",
              padding: "20px 22px",
              position: "relative",
            }}>
              {/* Level badge */}
              <div style={{
                position: "absolute", top: -1, right: 16,
                background: "#cc0000", padding: "2px 10px",
                fontSize: 10, fontWeight: 900, letterSpacing: "0.15em", color: "#fff",
              }}>LVL {c.level}</div>

              <div style={{ fontSize: 18, fontWeight: 900, color: "#e0e0e0", marginBottom: 2, marginTop: 8 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.12em", marginBottom: 16 }}>{c.race} · {c.cls.toUpperCase()}</div>

              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#555", marginBottom: 5, letterSpacing: "0.1em" }}>
                  <span>VITALITY</span><span>{c.hp}/{c.maxHp}</span>
                </div>
                <div style={{ height: 4, background: "#1a1a1a", borderRadius: 0, overflow: "hidden" }}>
                  <div style={{ width: `${(c.hp / c.maxHp) * 100}%`, height: "100%", background: `linear-gradient(90deg, #cc0000, #ff4444)` }}/>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#444", marginTop: 14 }}>
                <span>XP <span style={{ color: "#cc0000" }}>{c.xp.toLocaleString()}</span></span>
                <button style={{ background: "none", border: "none", color: "#333", fontSize: 11, cursor: "pointer" }}>REMOVE</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: "center", padding: "8px 0 24px", fontSize: 10, color: "#333", letterSpacing: "0.3em" }}>
        ♪  BATTLE DRUMS  ·  CLICK TO ENABLE
      </div>
    </div>
  );
}
