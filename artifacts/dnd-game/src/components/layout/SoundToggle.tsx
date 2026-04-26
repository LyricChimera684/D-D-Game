import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isMuted, setMuted, subscribeMuted } from "@/lib/sound";

export function SoundToggle() {
  const [muted, setLocalMuted] = useState<boolean>(() => isMuted());

  useEffect(() => subscribeMuted(setLocalMuted), []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setLocalMuted(next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 text-muted-foreground hover:text-primary transition-colors"
      title={muted ? "Sound is off — click to enable" : "Sound is on — click to mute"}
      aria-label={muted ? "Enable sound effects" : "Mute sound effects"}
      aria-pressed={!muted}
    >
      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
}
