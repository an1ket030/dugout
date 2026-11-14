/**
 * Origin Selection Screen — Tactical Dossier Case Files
 * High-contrast graphic novel styling: official FA dossiers, rubber stamps,
 * tactile audio, and visceral backstory presentation.
 */

import { useState } from 'react'
import { useStore } from '../store/gameStore'
import { createInitialGameState } from '../engine/worldGen'
import { saveGame } from '../engine/persistence'
import { sfx } from '../engine/audioSynth'
import RainOverlay from '../components/ui/RainOverlay'
import type { Manager, ManagerOrigin } from '../types/game'

const ORIGINS: Array<{
  id: ManagerOrigin
  code: string
  title: string
  subtitle: string
  description: string
  traits: string[]
  stats: { tactical: number; motivation: number; reputation: number }
  quote: string
  stamp: string
}> = [
  {
    id: 'ex_player',
    code: 'DOSSIER-01 // RETIRED PRO',
    title: 'The Ex-Player',
    subtitle: 'Lower-League Journeyman · 280 Appearances',
    description:
      'You know what a losing dressing room smells like: damp towels, cold tea, and fear. You know when a centre-half is faking a hamstring twinge to avoid Tuesday night in the rain. Players respect you because you were one of them.',
    traits: ['Reads the Room', 'Dressing Room Authority', 'Short-Fused'],
    stats: { tactical: 55, motivation: 75, reputation: 65 },
    quote: '"I wasn\'t world-class with my feet. I\'ll be world-class with my mind."',
    stamp: 'FORMER PRO',
  },
  {
    id: 'coach',
    code: 'DOSSIER-02 // UEFA B LICENCE',
    title: 'The Coach',
    subtitle: 'Tactical Analyst · 10 Years on Touchlines',
    description:
      'You\'ve spent a decade carrying cones, designing pressing triggers, and watching head coaches take the glory. You see football as geometry and pressure zones. The tactical board is your weapon.',
    traits: ['Tactician', 'Set-Piece Specialist', 'Unproven Negotiator'],
    stats: { tactical: 78, motivation: 55, reputation: 45 },
    quote: '"Games are won on Tuesday night on the whiteboard, not by shouting on Saturday."',
    stamp: 'ACCREDITED',
  },
  {
    id: 'outsider',
    code: 'DOSSIER-03 // ZERO CONNECTIONS',
    title: 'The Outsider',
    subtitle: 'Amateur Tactician · Ambition Over Pedigree',
    description:
      'You have no football pedigree, no famous surname, and no friends in Fleet Street. The committee hired you because every respectable manager laughed at their budget. That chip on your shoulder is dangerous.',
    traits: ['Underdog Mentality', 'Unpredictable', 'No Safety Net'],
    stats: { tactical: 48, motivation: 70, reputation: 30 },
    quote: '"They told me I don\'t belong in the dugout. I\'ll make sure they never forget me."',
    stamp: 'WILDCARD',
  },
]

export default function OriginScreen() {
  const [selected, setSelected] = useState<ManagerOrigin>('ex_player')
  const [nameInput, setNameInput] = useState('')
  const [step, setStep] = useState<'pick' | 'name'>('pick')
  const { setGameState, setPhase } = useStore()

  function handleCardClick(id: ManagerOrigin) {
    sfx.paperRustle()
    setSelected(id)
  }

  function confirmOrigin() {
    sfx.stampSlam()
    setStep('name')
  }

  async function startGame() {
    if (!selected || !nameInput.trim()) return
    sfx.stampSlam()
    const origin = ORIGINS.find(o => o.id === selected)!
    const seed = Date.now() & 0xffffffff

    const manager: Manager = {
      id: 'player',
      name: nameInput.trim() || 'The Gaffer',
      origin: selected,
      reputation: origin.stats.reputation,
      corruptionScore: 0,
      tacticalRating: origin.stats.tactical,
      motivationRating: origin.stats.motivation,
      traits: origin.traits,
    }

    const gs = createInitialGameState(manager, seed)
    await saveGame(gs)
    setGameState(gs)
    setPhase('prologue')
  }

  const selectedDossier = ORIGINS.find(o => o.id === selected)!

  if (step === 'name') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-noir-950 p-6 relative">
        <RainOverlay opacity={0.2} />

        <div className="max-w-md w-full bg-parchment-light text-noir-950 p-8 rounded shadow-2xl border-4 border-noir-900 z-10">
          <div className="flex justify-between items-center border-b-2 border-noir-900/20 pb-3 mb-6">
            <span className="text-[10px] font-dossier tracking-widest uppercase text-noir-700">
              OFFICIAL FA REGISTRATION FORM #884-A
            </span>
            <span className="stamp stamp-red text-[9px]">{selectedDossier.stamp}</span>
          </div>

          <div className="mb-6">
            <span className="text-xs font-dossier uppercase tracking-widest text-noir-600 block mb-1">
              Selected Background: {selectedDossier.title}
            </span>
            <h2 className="font-headline text-3xl tracking-tight text-noir-950">
              WHAT IS YOUR SURNAME, GAFFER?
            </h2>
            <p className="font-serif text-xs text-noir-700 italic mt-1 leading-snug">
              The name that will be shouted from the terraces and printed on tomorrow's match programme.
            </p>
          </div>

          <div className="mb-6">
            <label className="text-[10px] font-dossier uppercase text-noir-700 block mb-1">
              Manager Surname:
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && nameInput.trim() && startGame()}
              placeholder="e.g. Vance, Gallagher, Davies..."
              maxLength={20}
              className="w-full bg-parchment-dark/40 border-2 border-noir-900 text-noir-950 text-xl font-headline py-2.5 px-4 outline-none focus:bg-white transition-colors"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { sfx.paperRustle(); setStep('pick') }}
              className="py-2.5 px-5 font-dossier text-xs uppercase font-bold border border-noir-800 text-noir-800 hover:bg-noir-900 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={startGame}
              disabled={!nameInput.trim()}
              className="flex-1 py-2.5 px-5 font-dossier text-xs uppercase font-bold bg-noir-950 text-parchment-light hover:bg-amber-dugout hover:text-noir-950 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-comic"
            >
              Sign Contract & Enter Dugout →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col bg-noir-950 text-slate-mist select-none overflow-hidden relative p-8">
      <RainOverlay opacity={0.2} />

      {/* Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 mb-6">
        <div>
          <span className="text-xs font-dossier text-amber-dugout tracking-[0.3em] uppercase block">
            Act I · Character Foundation
          </span>
          <h1 className="font-headline text-4xl text-slate-mist tracking-wide">
            CHOOSE YOUR MANAGER ORIGIN
          </h1>
        </div>
        <button
          onClick={() => { sfx.paperRustle(); setPhase('menu') }}
          className="text-xs font-dossier text-slate-foggy hover:text-amber-gold uppercase tracking-widest border border-slate-foggy/20 px-3 py-1.5 rounded transition-colors"
        >
          ← Main Menu
        </button>
      </header>

      {/* 3 Dossier Cards */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto z-10 pb-4">
        {ORIGINS.map(orig => {
          const isSelected = selected === orig.id
          return (
            <div
              key={orig.id}
              onClick={() => handleCardClick(orig.id)}
              className={`
                p-6 rounded cursor-pointer transition-all duration-200 flex flex-col justify-between border-2
                ${isSelected
                  ? 'bg-noir-900 border-amber-dugout shadow-amber-glow scale-[1.02]'
                  : 'bg-noir-900/60 border-slate-foggy/20 hover:border-slate-foggy/50 opacity-80 hover:opacity-100'
                }
              `}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-dossier text-slate-foggy">{orig.code}</span>
                  <span className={`stamp ${isSelected ? 'stamp-amber' : 'stamp-red'} text-[9px]`}>
                    {orig.stamp}
                  </span>
                </div>

                <h2 className={`font-headline text-3xl mb-1 ${isSelected ? 'text-amber-gold' : 'text-slate-mist'}`}>
                  {orig.title}
                </h2>
                <span className="text-[11px] font-dossier text-amber-dugout/80 block mb-3 uppercase tracking-wider">
                  {orig.subtitle}
                </span>

                <p className="font-serif text-sm text-slate-foggy leading-relaxed mb-4">
                  {orig.description}
                </p>

                {/* Traits */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {orig.traits.map(t => (
                    <span key={t} className="text-[10px] font-dossier px-2 py-0.5 bg-noir-950 border border-slate-foggy/20 text-slate-mist">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats & Quote */}
              <div className="border-t border-slate-foggy/15 pt-4">
                <div className="space-y-1.5 text-xs font-dossier mb-4">
                  <StatBar label="Tactical Acumen" val={orig.stats.tactical} highlight={isSelected} />
                  <StatBar label="Motivation Drive" val={orig.stats.motivation} highlight={isSelected} />
                  <StatBar label="Starting Reputation" val={orig.stats.reputation} highlight={isSelected} />
                </div>

                <p className="font-serif text-xs italic text-slate-foggy/70 border-l-2 border-amber-dugout/40 pl-2.5">
                  {orig.quote}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Confirmation Bottom Bar */}
      <footer className="max-w-6xl w-full mx-auto pt-4 flex justify-end z-10">
        <button
          onClick={confirmOrigin}
          className="py-3 px-10 font-dossier text-xs font-bold uppercase tracking-widest bg-amber-dugout text-noir-950 hover:bg-amber-gold transition-colors rounded shadow-comic choice-glow"
        >
          Confirm Background & Proceed →
        </button>
      </footer>
    </div>
  )
}

function StatBar({ label, val, highlight }: { label: string; val: number; highlight: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[10px] text-slate-foggy w-32 truncate">{label}</span>
      <div className="flex-1 h-1.5 bg-noir-950 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${highlight ? 'bg-amber-dugout' : 'bg-slate-foggy/40'}`}
          style={{ width: `${val}%` }}
        />
      </div>
      <span className="text-[10px] text-slate-mist w-6 text-right font-bold">{val}</span>
    </div>
  )
}
