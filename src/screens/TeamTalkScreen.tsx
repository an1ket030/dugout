/**
 * Team Talk Mini-Game — Dressing Room Pre-Match
 * Mechanical balance: Motivation vs Pressure.
 * Getting the squad into the "Fired Up" sweet spot without panic or apathy.
 */

import { useState } from 'react'
import { useStore } from '../store/gameStore'
import { sfx } from '../engine/audioSynth'
import CharacterPortrait from '../components/narrative/CharacterPortrait'
import type { Player } from '../types/game'

interface TeamTalkScreenProps {
  onComplete: (talkBonus: number) => void
}

export default function TeamTalkScreen({ onComplete }: TeamTalkScreenProps) {
  const gameState = useStore(s => s.gameState)
  const addNotification = useStore(s => s.addNotification)

  const [step, setStep] = useState<'room' | 'individual' | 'rally' | 'result'>('room')
  const [temperament, setTemperament] = useState(38) // 0 (Despondent) to 100 (Panicked/Furious)
  const [log, setLog] = useState<string[]>([])
  const [selectedTone, setSelectedTone] = useState<string | null>(null)
  const [finalRating, setFinalRating] = useState<string>('')

  if (!gameState) return null

  const starters: Player[] = gameState.squad
    .map(id => gameState.players[id])
    .filter(Boolean)
    .slice(0, 11)

  const getTemperamentStatus = (val: number) => {
    if (val < 30) return { label: 'Despondent & Defeated', color: 'text-red-siren' }
    if (val < 50) return { label: 'Tense & Anxious', color: 'text-amber-dugout' }
    if (val <= 78) return { label: 'Fired Up (Optimal)', color: 'text-green-400' }
    if (val <= 88) return { label: 'Overheated & Reckless', color: 'text-amber-gold' }
    return { label: 'Panicked / Paralyzed', color: 'text-red-blood' }
  }

  const currentStatus = getTemperamentStatus(temperament)

  function handleRoomChoice(tone: 'passionate' | 'calm' | 'aggressive') {
    sfx.stampSlam()
    setSelectedTone(tone)

    if (tone === 'passionate') {
      setTemperament(t => Math.min(100, t + 22))
      setLog(l => [
        ...l,
        'GAFFER: "Forget the last 11 games. Today is where our season starts. Look at the badges on your shirts!"',
        'Reaction: Several players sit up straight. Terry Moss nods with a clenched jaw.',
      ])
    } else if (tone === 'calm') {
      setTemperament(t => Math.min(100, t + 12))
      setLog(l => [
        ...l,
        'GAFFER: "Stick to the tactical structure. Clear your heads. We do not panic."',
        'Reaction: The room relaxes slightly, but tension remains in the corners.',
      ])
    } else {
      setTemperament(t => Math.min(100, t + 35))
      setLog(l => [
        ...l,
        'GAFFER: "Look at the league table! We are in the mud. If anyone here isn\'t ready to bleed for 90 minutes, take your boots off now."',
        'Reaction: Heart rates spike. Strikers look wide-eyed, defenders square their shoulders.',
      ])
    }
    setStep('individual')
  }

  function handleIndividualChoice(target: 'moss' | 'clegg' | 'birch') {
    sfx.paperRustle()

    if (target === 'moss') {
      setTemperament(t => Math.min(100, t + 10))
      setLog(l => [
        ...l,
        'To Terry Moss: "Terry, lead from the back. Win that first aerial header and set the standard."',
        'Terry Moss snaps his shin guards into place: "They won\'t get a sniff, boss."',
      ])
    } else if (target === 'clegg') {
      setTemperament(t => Math.max(10, t - 8))
      setLog(l => [
        ...l,
        'To Liam Clegg: "Liam, you\'re 19. Nobody expects you to carry the world. Just play with total freedom."',
        'Liam Clegg exhales a deep breath: "Thanks gaffer. I\'m ready."',
      ])
    } else {
      setTemperament(t => Math.min(100, t + 8))
      setLog(l => [
        ...l,
        'To Dave Birch: "Dave, command the 18-yard box. Be the loudest man in Lancashire today."',
        'Dave Birch slaps his gloves together: "Consider it locked."',
      ])
    }
    setStep('rally')
  }

  function handleFinalRally(shout: 'battle' | 'glory' | 'pride') {
    sfx.stampSlam()
    let delta = 0
    let shoutText = ''

    if (shout === 'battle') {
      delta = 10
      shoutText = '"SEND THEM BACK DOWN THE ROAD WITH NOTHING! INTO THEM!"'
    } else if (shout === 'glory') {
      delta = 6
      shoutText = '"PLAY YOUR FOOTBALL. SHOW THIS TOWN WHO WE ARE."'
    } else {
      delta = 2
      shoutText = '"DO IT FOR EACH OTHER. NINETY MINUTES OF HONEST WORK."'
    }

    const finalVal = Math.min(100, Math.max(0, temperament + delta))
    setTemperament(finalVal)
    setLog(l => [...l, `FINAL SHOUT: ${shoutText}`])

    let rating = ''
    let bonus = 0
    if (finalVal >= 55 && finalVal <= 80) {
      rating = 'MASTERFUL TEAM TALK — SQUAD IS FIRED UP'
      bonus = 1.15
    } else if (finalVal > 80) {
      rating = 'OVERCOOKED — SQUAD IS NERVOUS & RECKLESS'
      bonus = 0.95
    } else {
      rating = 'UNDERWHELMING — SQUAD FEELS COLD'
      bonus = 1.0
    }

    setFinalRating(rating)
    setStep('result')
  }

  return (
    <div className="w-full h-full flex flex-col bg-pitch-950 text-slate-mist select-none overflow-hidden relative">
      {/* Background dressing room atmosphere */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #203522 0%, #070908 75%)',
        }}
      />

      {/* Header */}
      <header className="border-b border-slate-foggy/15 bg-noir-900/90 px-8 py-4 flex items-center justify-between z-10">
        <div>
          <span className="text-xs font-dossier text-amber-dugout tracking-[0.3em] uppercase block">
            Pre-Match Ritual · Calder Vale Dressing Room
          </span>
          <h1 className="font-headline text-3xl tracking-wide text-slate-mist">
            THE GAFFER'S ADDRESS
          </h1>
        </div>

        {/* Squad Temperament Meter */}
        <div className="flex flex-col items-end w-72">
          <div className="flex justify-between w-full text-xs font-dossier mb-1.5">
            <span className="text-slate-foggy">Squad Temperament:</span>
            <span className={`font-bold ${currentStatus.color}`}>{currentStatus.label}</span>
          </div>
          <div className="w-full h-3 bg-noir-950 rounded-full border border-slate-foggy/20 overflow-hidden relative">
            {/* Optimal Zone Marker (55% - 80%) */}
            <div className="absolute top-0 bottom-0 left-[55%] w-[25%] bg-green-500/25 border-x border-green-400/40 z-0" />
            <div
              className={`h-full transition-all duration-500 relative z-10 ${
                temperament > 80 ? 'bg-red-siren' : temperament >= 55 ? 'bg-green-400' : 'bg-amber-dugout'
              }`}
              style={{ width: `${temperament}%` }}
            />
          </div>
          <span className="text-[10px] font-dossier text-slate-foggy mt-1">
            Target: Green Zone (55% – 80%)
          </span>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6 z-10 max-w-6xl mx-auto w-full">
        {/* Left: Dressing Room Captain Visual & Starters Grid */}
        <div className="w-72 flex flex-col items-center justify-between bg-noir-900/70 border border-slate-foggy/20 p-5 rounded">
          <div className="text-center">
            <span className="text-[10px] font-dossier text-amber-dugout uppercase tracking-widest block mb-1">
              Club Captain
            </span>
            <h3 className="font-headline text-2xl text-slate-mist">Terry Moss</h3>
          </div>

          <CharacterPortrait characterId="terry" mood={temperament > 80 ? 'furious' : temperament >= 55 ? 'stern' : 'neutral'} size="lg" />

          {/* Starters chips */}
          <div className="w-full border-t border-slate-foggy/10 pt-3">
            <span className="text-[10px] font-dossier text-slate-foggy uppercase block mb-1.5">
              Listening in silence ({starters.length} starters):
            </span>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
              {starters.map(p => (
                <span key={p.id} className="text-[10px] font-dossier px-1.5 py-0.5 bg-pitch-900 border border-slate-foggy/15 text-slate-mist/80">
                  {p.position} {p.name.split(' ')[1]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Center/Right: Interactive Decision Flow & Live Room Reaction Log */}
        <div className="flex-1 flex flex-col bg-noir-900/80 border border-slate-foggy/20 p-6 rounded shadow-dossier">
          {/* Reaction Log Feed */}
          <div className="flex-1 bg-noir-950 border border-slate-foggy/10 p-4 overflow-y-auto flex flex-col gap-2 font-dossier text-xs mb-6 rounded">
            {log.length === 0 ? (
              <div className="text-slate-foggy/60 italic py-12 text-center">
                The players are laced up, steam rising from damp training jackets.
                Every eye in the dressing room turns to you. What is your tone?
              </div>
            ) : (
              log.map((line, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded ${
                    line.startsWith('GAFFER')
                      ? 'bg-amber-dugout/10 border-l-2 border-amber-dugout text-amber-warm font-bold'
                      : line.startsWith('FINAL')
                      ? 'bg-red-siren/10 border-l-2 border-red-siren text-red-300 font-bold text-sm py-3'
                      : 'text-slate-mist/90 pl-3 italic border-l border-slate-foggy/20'
                  }`}
                >
                  {line}
                </div>
              ))
            )}
          </div>

          {/* Controls per Step */}
          {step === 'room' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-dossier text-amber-dugout uppercase tracking-widest">
                Phase 1: Choose Your General Team Approach
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handleRoomChoice('passionate')}
                  className="p-3.5 border border-amber-dugout/40 hover:border-amber-gold hover:bg-amber-dugout/10 text-left transition-all rounded choice-glow"
                >
                  <div className="font-headline text-lg text-amber-gold">Passionate Roar</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Appeal to club pride and hunger. Big boost to motivation.
                  </div>
                </button>
                <button
                  onClick={() => handleRoomChoice('calm')}
                  className="p-3.5 border border-slate-foggy/30 hover:border-slate-mist hover:bg-pitch-800 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-slate-mist">Tactical Calm</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Steady their trembling hands. Keeps pressure low and controlled.
                  </div>
                </button>
                <button
                  onClick={() => handleRoomChoice('aggressive')}
                  className="p-3.5 border border-red-siren/40 hover:border-red-siren hover:bg-red-siren/10 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-red-siren">Demand Blood</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Brutal reality check. High risk of overcooking the room.
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 'individual' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-dossier text-amber-dugout uppercase tracking-widest">
                Phase 2: Single Out a Key Player
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handleIndividualChoice('moss')}
                  className="p-3.5 border border-slate-foggy/30 hover:border-amber-dugout hover:bg-pitch-800 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-slate-mist">Challenge Terry Moss</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Put responsibility on your grizzled veteran captain.
                  </div>
                </button>
                <button
                  onClick={() => handleIndividualChoice('clegg')}
                  className="p-3.5 border border-slate-foggy/30 hover:border-amber-dugout hover:bg-pitch-800 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-slate-mist">Reassure Liam Clegg</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Take the weight off your 19-year-old winger's shoulders.
                  </div>
                </button>
                <button
                  onClick={() => handleIndividualChoice('birch')}
                  className="p-3.5 border border-slate-foggy/30 hover:border-amber-dugout hover:bg-pitch-800 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-slate-mist">Command Goalkeeper</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Instruct Dave Birch to organize the defensive backline.
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 'rally' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-dossier text-amber-dugout uppercase tracking-widest">
                Phase 3: The Parting Roar as They Touch the Tunnel Door
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => handleFinalRally('battle')}
                  className="p-3.5 border border-red-siren/40 hover:border-red-siren hover:bg-red-siren/10 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-red-siren">"Into Them!"</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    High aggression (+10 pressure).
                  </div>
                </button>
                <button
                  onClick={() => handleFinalRally('glory')}
                  className="p-3.5 border border-amber-dugout/40 hover:border-amber-gold hover:bg-amber-dugout/10 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-amber-gold">"Show Them Who We Are"</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Balanced tactical pride (+6 pressure).
                  </div>
                </button>
                <button
                  onClick={() => handleFinalRally('pride')}
                  className="p-3.5 border border-slate-foggy/30 hover:border-slate-mist hover:bg-pitch-800 text-left transition-all rounded"
                >
                  <div className="font-headline text-lg text-slate-mist">"Honest Work"</div>
                  <div className="text-[11px] text-slate-foggy font-serif mt-1">
                    Measured discipline (+2 pressure).
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="flex flex-col items-center justify-center p-4 bg-noir-950 border border-amber-dugout/30 rounded text-center">
              <span className="stamp stamp-amber mb-3">TEAM TALK CONCLUDED</span>
              <h2 className="font-headline text-2xl text-slate-mist mb-1">{finalRating}</h2>
              <p className="text-xs font-dossier text-slate-foggy max-w-md mb-4">
                The players storm out of the dressing room into the cold drizzle, boots echoing sharply on the concrete tunnel.
              </p>
              <button
                onClick={() => onComplete(temperament >= 55 && temperament <= 80 ? 1.15 : 1.0)}
                className="py-3 px-10 bg-amber-dugout text-noir-950 font-dossier font-bold uppercase tracking-widest hover:bg-amber-gold transition-colors rounded shadow-comic"
              >
                Lead Squad into the Tunnel →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
