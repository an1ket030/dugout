/**
 * Cutscene / Visual Novel Screen — Graphic Novel Presentation
 * Full-height illustrated character portraits, typewriter audio ticks,
 * comic-panel speech balloons, and high-impact decision consequences.
 */

import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/gameStore'
import { sfx } from '../engine/audioSynth'
import CharacterPortrait from '../components/narrative/CharacterPortrait'
import RainOverlay from '../components/ui/RainOverlay'

interface DialogueLine {
  speaker: string
  characterId: string
  mood: 'neutral' | 'stern' | 'skeptical' | 'furious' | 'relieved' | 'smirking'
  text: string
  location?: string
}

interface Choice {
  id: string
  text: string
  consequenceHint?: string
  flagChange?: { key: string; value: unknown }
}

const ACT1_SCENE_1: DialogueLine[] = [
  {
    speaker: 'NARRATOR',
    characterId: 'narrator',
    mood: 'neutral',
    location: 'CALDER VALE · THE SHED · RAIN 4°C',
    text: 'Lancashire in November. The kind of wet cold that gets inside your marrow and stays there until April.',
  },
  {
    speaker: 'NARRATOR',
    characterId: 'narrator',
    mood: 'neutral',
    location: 'CALDER VALE TOWN FC · THE OLD MILL GROUND',
    text: 'Founded 1887. Once famous for beating Aston Villa in the FA Cup in 1923. Now 19th in the Northern Counties East League. Eleven games without a win.',
  },
  {
    speaker: 'NARRATOR',
    characterId: 'narrator',
    mood: 'neutral',
    location: 'CORRUGATED IRON TUNNEL',
    text: 'Three managers were offered the job before you. All three took one look at the leaking dressing room ceiling and the club balance sheet, and drove straight back to Manchester.',
  },
  {
    speaker: 'EDDIE MARLOWE',
    characterId: 'eddie',
    mood: 'neutral',
    location: 'THE KIT ROOM · STEAM & DAMP WOOL',
    text: 'You\'ll be wanting the kit room, then. I\'m Eddie Marlowe. I\'ve washed the socks, oiled the leather, and buried eight managers in twenty-five years.',
  },
  {
    speaker: 'EDDIE MARLOWE',
    characterId: 'eddie',
    mood: 'skeptical',
    location: 'THE KIT ROOM',
    text: 'Word of advice, son—free of charge. Chairman Arthur Pendelton smiles when he\'s about to sack you. When he looks you in the eye, listen to what he doesn\'t say.',
  },
  {
    speaker: 'EDDIE MARLOWE',
    characterId: 'eddie',
    mood: 'smirking',
    location: 'THE KIT ROOM',
    text: 'Now then. Are you here to pick up a paycheck until Christmas, or are you foolish enough to try and save this place?',
  },
]

const SCENE_1_CHOICES: Choice[] = [
  {
    id: 'c1',
    text: '"I didn\'t come here to make friends, Eddie. I came here to win football matches."',
    consequenceHint: 'Eddie respects cold professionalism. Authority +1',
  },
  {
    id: 'c2',
    text: '"Tell me about the dressing room. Who actually runs it?"',
    consequenceHint: 'Gains insight into Captain Terry Moss. Insight +1',
  },
  {
    id: 'c3',
    text: '"How long has Arthur Pendelton been running this club into the ground?"',
    consequenceHint: 'Dangerous question. Eddie raises an eyebrow. Corruption path unlocked.',
  },
]

export default function CutsceneScreen() {
  const { setPhase, patchFlag } = useStore()

  const [lines] = useState<DialogueLine[]>(ACT1_SCENE_1)
  const [lineIndex, setLineIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showChoices, setShowChoices] = useState(false)
  const [choiceChosen, setChoiceChosen] = useState<string | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currLine = lines[lineIndex]

  // Typewriter effect with procedural audio tick
  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    let charIdx = 0
    const fullText = currLine.text

    function tick() {
      if (charIdx < fullText.length) {
        setDisplayedText(fullText.slice(0, charIdx + 1))
        charIdx++
        if (charIdx % 2 === 0) {
          sfx.typewriterTick()
        }
        timerRef.current = setTimeout(tick, 22)
      } else {
        setIsTyping(false)
        if (lineIndex === lines.length - 1) {
          setTimeout(() => setShowChoices(true), 400)
        }
      }
    }
    tick()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [lineIndex, currLine])

  function handleAdvance() {
    if (isTyping) {
      // Skip typewriter animation immediately
      setDisplayedText(currLine.text)
      setIsTyping(false)
      if (lineIndex === lines.length - 1) {
        setShowChoices(true)
      }
      return
    }

    if (showChoices || choiceChosen) return

    if (lineIndex < lines.length - 1) {
      sfx.paperRustle()
      setLineIndex(i => i + 1)
    }
  }

  function handleChooseOption(choice: Choice) {
    sfx.stampSlam()
    setChoiceChosen(choice.text)
    setShowChoices(false)

    patchFlag('prologueChoice', choice.id)
    patchFlag('eddieTrust', 55)

    setTimeout(() => {
      setPhase('hub')
    }, 1400)
  }

  return (
    <div
      onClick={handleAdvance}
      className="w-full h-full flex flex-col justify-between bg-noir-950 text-slate-mist select-none overflow-hidden relative cursor-pointer p-6"
    >
      <RainOverlay opacity={0.25} />

      {/* Atmospheric Background & Floodlight Cone */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(212, 136, 43, 0.12) 0%, #070908 70%)',
        }}
      />

      {/* Top Header: Location Placard & Skip */}
      <header className="flex items-center justify-between z-20 max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="stamp stamp-amber text-[10px]">SCENE // ACT I BEAT 1</span>
          <span className="text-xs font-dossier text-slate-foggy uppercase tracking-widest">
            {currLine.location || 'THE OLD MILL GROUND'}
          </span>
        </div>

        <button
          onClick={e => {
            e.stopPropagation()
            sfx.paperRustle()
            setPhase('hub')
          }}
          className="text-xs font-dossier uppercase text-slate-foggy/60 hover:text-amber-gold transition-colors tracking-widest border border-slate-foggy/20 px-3 py-1 rounded"
        >
          Skip Scene →
        </button>
      </header>

      {/* Center Character Art Stage */}
      <div className="flex-1 flex items-end justify-center z-10 relative max-w-5xl w-full mx-auto">
        {currLine.speaker !== 'NARRATOR' && (
          <div className="relative mb-[-15px] transition-all duration-300">
            <CharacterPortrait
              characterId={currLine.characterId}
              mood={currLine.mood}
              size="hero"
            />
          </div>
        )}
      </div>

      {/* Bottom Graphic Novel Dialogue Panel */}
      <div className="relative z-20 max-w-4xl w-full mx-auto mb-2">
        <div className="comic-panel comic-panel-amber p-6 rounded-lg backdrop-blur-md bg-noir-900/95 shadow-dossier">
          {/* Speaker Badge */}
          <div className="flex items-center justify-between mb-3 border-b border-slate-foggy/15 pb-2">
            <div className="flex items-center gap-3">
              <span className="font-headline text-2xl tracking-wider text-amber-gold">
                {currLine.speaker}
              </span>
              {currLine.speaker !== 'NARRATOR' && (
                <span className="text-[10px] font-dossier uppercase px-2 py-0.5 rounded bg-noir-950 border border-amber-dugout/40 text-amber-warm">
                  Mood: {currLine.mood}
                </span>
              )}
            </div>

            <span className="text-[11px] font-dossier text-slate-foggy">
              {lineIndex + 1} / {lines.length}
            </span>
          </div>

          {/* Dialogue Text */}
          <p className="font-serif text-xl text-slate-mist leading-relaxed min-h-[4rem]">
            {displayedText}
            {isTyping && <span className="text-amber-gold animate-pulse font-bold ml-1">▌</span>}
          </p>

          {/* Continue Prompt */}
          {!isTyping && !showChoices && !choiceChosen && (
            <div className="text-right mt-2">
              <span className="text-[11px] font-dossier text-amber-dugout/80 uppercase tracking-widest animate-pulse">
                Click or press Space to continue ▾
              </span>
            </div>
          )}

          {/* Decision Choices */}
          {showChoices && !choiceChosen && (
            <div
              className="mt-5 flex flex-col gap-2.5 pt-4 border-t border-slate-foggy/15"
              onClick={e => e.stopPropagation()}
            >
              <span className="text-[10px] font-dossier uppercase tracking-[0.25em] text-amber-dugout block">
                Define Your Approach:
              </span>
              {SCENE_1_CHOICES.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleChooseOption(c)}
                  className="p-3.5 border border-slate-foggy/25 bg-noir-950 hover:border-amber-gold hover:bg-amber-dugout/10 text-left transition-all rounded choice-glow group"
                >
                  <div className="font-display text-base text-slate-mist group-hover:text-amber-gold font-bold">
                    › {c.text}
                  </div>
                  {c.consequenceHint && (
                    <div className="text-[11px] font-dossier text-slate-foggy mt-1 italic">
                      {c.consequenceHint}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Choice Made Acknowledgement */}
          {choiceChosen && (
            <div className="mt-4 pt-3 border-t border-slate-foggy/15 flex items-center justify-between text-xs font-dossier text-amber-warm">
              <span>Decision registered. The gaffer's tenure begins...</span>
              <span className="stamp stamp-green text-[9px]">SAVED TO DOSSIER</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
