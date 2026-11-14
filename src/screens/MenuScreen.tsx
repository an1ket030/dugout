/**
 * Main Menu Screen — Graphic Novel Poster Aesthetic
 * Dramatic Lancashire rain, sweeping stadium floodlights, bold typography,
 * tactile audio feedback, and dark gritty atmosphere.
 */

import { useState, useEffect } from 'react'
import { useStore } from '../store/gameStore'
import { listSaves, loadGame } from '../engine/persistence'
import { sfx } from '../engine/audioSynth'
import RainOverlay from '../components/ui/RainOverlay'

export default function MenuScreen() {
  const setPhase = useStore(s => s.setPhase)
  const setGameState = useStore(s => s.setGameState)
  const [latestSaveId, setLatestSaveId] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    listSaves().then(saves => {
      if (saves.length > 0) {
        setLatestSaveId(saves[0].id)
      }
    })
  }, [])

  const handleContinue = async () => {
    sfx.stampSlam()
    if (!latestSaveId) return
    const save = await loadGame(latestSaveId)
    if (save) {
      setGameState(save)
      setPhase(save.gamePhase || 'hub')
    }
  }

  const handleNewGame = () => {
    sfx.stampSlam()
    setPhase('origin')
  }

  const toggleAudio = () => {
    const isNowMuted = sfx.toggleMute()
    setMuted(isNowMuted)
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden select-none bg-noir-950 p-8">
      {/* Rain canvas effect */}
      <RainOverlay opacity={0.3} />

      {/* Atmospheric Floodlight & Vignette Gradients */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 15%, rgba(212, 136, 43, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 10% 85%, rgba(26, 38, 24, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 90% 85%, rgba(139, 30, 30, 0.2) 0%, transparent 50%),
            linear-gradient(180deg, #070908 0%, #0d120f 50%, #070908 100%)
          `,
        }}
      />

      {/* Floodlight Beam Graphics */}
      <div className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-b from-white/10 via-transparent to-transparent -rotate-12 pointer-events-none opacity-40 floodlight-flicker" />
      <div className="absolute top-0 right-1/4 w-96 h-full bg-gradient-to-b from-amber-gold/10 via-transparent to-transparent rotate-12 pointer-events-none opacity-30 floodlight-flicker" />

      {/* Top Bar / Audio Mute & Meta */}
      <header className="w-full flex items-center justify-between z-20 max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="stamp stamp-amber text-[10px]">LANCASHIRE LEAGUE ARCHIVES</span>
          <span className="text-[11px] font-dossier text-slate-foggy uppercase tracking-widest hidden sm:inline">
            EST. 1887 · CALDER VALE
          </span>
        </div>

        <button
          onClick={toggleAudio}
          className="text-xs font-dossier px-3 py-1.5 border border-slate-foggy/20 text-slate-foggy hover:text-amber-gold hover:border-amber-dugout transition-colors rounded"
        >
          {muted ? '🔇 AUDIO: MUTED' : '🔊 AUDIO: ON'}
        </button>
      </header>

      {/* Centre Poster Title Card */}
      <div className="relative z-20 flex flex-col items-center text-center my-auto max-w-2xl">
        {/* Crest stamp badge */}
        <div className="w-16 h-16 rounded-full border-2 border-amber-dugout/80 bg-noir-900 flex items-center justify-center mb-4 shadow-amber-glow">
          <span className="font-headline text-3xl text-amber-gold">CV</span>
        </div>

        <div className="space-y-1 mb-6">
          <span className="text-xs font-dossier uppercase tracking-[0.45em] text-amber-dugout font-bold block">
            A Graphic Novel of Survival & Ambition
          </span>
          <h1
            className="font-headline text-8xl md:text-9xl text-slate-mist tracking-tight leading-none drop-shadow-2xl"
            style={{
              textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 40px rgba(212,136,43,0.3)',
            }}
          >
            THE DUGOUT
          </h1>
          <p className="font-serif italic text-slate-foggy text-lg max-w-lg mx-auto pt-2 leading-snug">
            "Every door you walk through is one you forced open."
          </p>
        </div>

        {/* Menu Actions */}
        <div className="flex flex-col gap-3 w-72 mt-2">
          <button
            onClick={handleNewGame}
            onMouseEnter={() => sfx.typewriterTick()}
            className="py-3.5 px-6 font-dossier text-sm font-bold uppercase tracking-widest bg-amber-dugout text-noir-950 hover:bg-amber-gold transition-all duration-200 rounded shadow-comic choice-glow"
          >
            › New Campaign
          </button>

          {latestSaveId && (
            <button
              onClick={handleContinue}
              onMouseEnter={() => sfx.typewriterTick()}
              className="py-3 px-6 font-dossier text-sm font-bold uppercase tracking-widest border border-slate-foggy/40 text-slate-mist bg-noir-900/80 hover:border-amber-dugout hover:text-amber-gold transition-all duration-200 rounded shadow-comic"
            >
              Resume Season
            </button>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <footer className="w-full flex items-center justify-between z-20 max-w-6xl text-[11px] font-dossier text-slate-foggy/60">
        <span>THE DUGOUT · PHASE 1 BUILD · NORTHERN PYRAMID</span>
        <span>PEAKY BLINDERS / WORKING-CLASS GRIT</span>
      </footer>
    </div>
  )
}
