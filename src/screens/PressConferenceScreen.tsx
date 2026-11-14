/**
 * Press Conference Mini-Game — The Media Room
 * Flashbulbs, tough questions, and volatile reactions from Board, Fans, and Squad.
 */

import { useState } from 'react'
import { useStore } from '../store/gameStore'
import { sfx } from '../engine/audioSynth'
import CharacterPortrait from '../components/narrative/CharacterPortrait'

interface PressConferenceProps {
  onComplete: () => void
}

interface Question {
  journalist: string
  outlet: string
  avatar: string
  text: string
  options: Array<{
    id: string
    text: string
    tone: string
    effects: {
      reputation: number
      board: number
      fans: number
      morale: number
    }
  }>
}

const QUESTIONS: Question[] = [
  {
    journalist: 'Maya Higgins',
    outlet: 'Lancashire Telegraph',
    avatar: 'maya',
    text: '"Gaffer, Calder Vale hasn\'t won a competitive match in over 80 days. The fans are calling this squad uncoachable. Are you confident you actually have the players to survive this division?"',
    options: [
      {
        id: '1a',
        text: '"I believe completely in these lads. They\'ve been poorly managed in the past, but the quality is there."',
        tone: 'Back the Squad',
        effects: { reputation: 2, board: -2, fans: 4, morale: 6 },
      },
      {
        id: '1b',
        text: '"The league table doesn\'t lie. Some players here need to look in the mirror or look for a new club in January."',
        tone: 'Public Warning',
        effects: { reputation: 4, board: 3, fans: 2, morale: -5 },
      },
      {
        id: '1c',
        text: '"Judge us after five games under my watch. Talk is cheap, Maya."',
        tone: 'Defiant & Direct',
        effects: { reputation: 3, board: 1, fans: 5, morale: 2 },
      },
    ],
  },
  {
    journalist: 'Bob Craddock',
    outlet: 'Northern Football Gazette',
    avatar: 'narrator',
    text: '"Rumours in the town say Chairman Arthur Pendelton gave you a 3-match ultimatum before you even signed your contract. Is your head already on the chopping block?"',
    options: [
      {
        id: '2a',
        text: '"Arthur and I have a clear understanding. We are united in rescuing this historic football club."',
        tone: 'Corporate Diplomacy',
        effects: { reputation: 1, board: 6, fans: -2, morale: 0 },
      },
      {
        id: '2b',
        text: '"In football management, your head is always on the block. I don\'t fear the sack, Bob. I fear regret."',
        tone: 'Philosophical Grit',
        effects: { reputation: 5, board: 1, fans: 6, morale: 3 },
      },
      {
        id: '2c',
        text: '"Next question. I don\'t entertain gutter gossip."',
        tone: 'Hostile Shut-Down',
        effects: { reputation: -3, board: 2, fans: 1, morale: 1 },
      },
    ],
  },
  {
    journalist: 'Gary "Pasty" Walker',
    outlet: 'Calder Vale Fan Podcast',
    avatar: 'narrator',
    text: '"Boss, people in this mill town work 50-hour weeks in the wet cold and spend their last £14 on tickets. What promise can you make to the working folks on the terraces?"',
    options: [
      {
        id: '3a',
        text: '"I can\'t promise we will win every match. But I promise every player will crawl off that pitch with empty lungs."',
        tone: 'Working-Class Blood Pact',
        effects: { reputation: 4, board: 0, fans: 8, morale: 4 },
      },
      {
        id: '3b',
        text: '"We need patience and tactical realism. Rome wasn\'t built in a day, and neither is non-league survival."',
        tone: 'Cautious Realism',
        effects: { reputation: 1, board: 2, fans: -4, morale: 1 },
      },
      {
        id: '3c',
        text: '"Get behind the boys for 90 minutes. Don\'t boo after 20 minutes if things are tough."',
        tone: 'Demand Fan Loyalty',
        effects: { reputation: 0, board: 1, fans: -6, morale: 3 },
      },
    ],
  },
]

export default function PressConferenceScreen({ onComplete }: PressConferenceProps) {
  const gameState = useStore(s => s.gameState)
  const patchGameState = useStore(s => s.patchGameState)
  const addNotification = useStore(s => s.addNotification)

  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [flash, setFlash] = useState(false)
  const [headline, setHeadline] = useState<string | null>(null)
  const [metrics, setMetrics] = useState({
    reputation: gameState?.manager.reputation || 50,
    boardConfidence: gameState ? gameState.clubs[gameState.currentClubId]?.boardConfidence || 50 : 50,
    fanSentiment: 45,
    squadMorale: 40,
  })

  if (!gameState) return null

  const currentQ = QUESTIONS[currentQIndex]

  function triggerFlash() {
    setFlash(true)
    sfx.stampSlam()
    setTimeout(() => setFlash(false), 80)
  }

  function handleSelectOption(opt: typeof QUESTIONS[0]['options'][0]) {
    triggerFlash()

    // Update local metrics
    setMetrics(prev => ({
      reputation: Math.max(0, Math.min(100, prev.reputation + opt.effects.reputation)),
      boardConfidence: Math.max(0, Math.min(100, prev.boardConfidence + opt.effects.board)),
      fanSentiment: Math.max(0, Math.min(100, prev.fanSentiment + opt.effects.fans)),
      squadMorale: Math.max(0, Math.min(100, prev.squadMorale + opt.effects.morale)),
    }))

    const nextIdx = currentQIndex + 1
    if (nextIdx < QUESTIONS.length) {
      setCurrentQIndex(nextIdx)
    } else {
      if (!gameState) return
      const currentState = gameState

      // Completed all questions — generate headline
      const generatedHeadline =
        opt.tone === 'Working-Class Blood Pact' || opt.tone === 'Back the Squad'
          ? '"NEW GAFFER VOWS TO BLEED FOR CALDER VALE"'
          : opt.tone === 'Public Warning'
          ? '"GAFFER WARNS SQUAD: SHAPE UP OR SHIP OUT"'
          : '"DEFIANT GAFFER SHRUGS OFF BOARDROOM CRISIS"'

      setHeadline(generatedHeadline)

      // Commit to game state
      const userClub = currentState.clubs[currentState.currentClubId]
      patchGameState({
        manager: {
          ...currentState.manager,
          reputation: Math.max(0, Math.min(100, currentState.manager.reputation + 4)),
        },
        clubs: {
          ...currentState.clubs,
          [userClub.id]: {
            ...userClub,
            boardConfidence: Math.max(0, Math.min(100, metrics.boardConfidence)),
          },
        },
        flags: {
          ...currentState.flags,
          firstPressConferenceDone: true,
          pressHeadline: generatedHeadline,
        },
      })
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-noir-950 text-slate-mist select-none overflow-hidden relative">
      {/* Camera Flash Overlay */}
      {flash && <div className="fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-75" />}

      {/* Top Header */}
      <header className="border-b border-slate-foggy/15 bg-noir-900/90 px-8 py-3 flex items-center justify-between z-10">
        <div>
          <span className="text-xs font-dossier text-amber-dugout tracking-[0.3em] uppercase block">
            Media Room · Matchday Press Conference
          </span>
          <h1 className="font-headline text-2xl tracking-wide text-slate-mist">
            FACING THE PRESS CORPS
          </h1>
        </div>

        {/* Live Reaction Meters */}
        <div className="flex items-center gap-6 font-dossier text-xs">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-foggy uppercase">Board</span>
            <span className="font-bold text-amber-gold">{metrics.boardConfidence}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-foggy uppercase">Fans</span>
            <span className="font-bold text-green-400">{metrics.fanSentiment}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-foggy uppercase">Squad</span>
            <span className="font-bold text-slate-mist">{metrics.squadMorale}%</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-foggy uppercase">Reputation</span>
            <span className="font-bold text-amber-dugout">{metrics.reputation}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6 z-10 max-w-5xl mx-auto w-full items-center">
        {!headline ? (
          <>
            {/* Left: Questioning Journalist Portrait & Credentials */}
            <div className="w-80 flex flex-col items-center justify-between bg-noir-900/80 border border-slate-foggy/20 p-6 rounded shadow-dossier">
              <div className="text-center w-full">
                <span className="stamp stamp-red text-[10px] mb-2 inline-block">ACCREDITED PRESS</span>
                <h3 className="font-headline text-2xl text-slate-mist mt-1">{currentQ.journalist}</h3>
                <span className="text-xs font-dossier text-amber-dugout block">{currentQ.outlet}</span>
              </div>

              <CharacterPortrait characterId={currentQ.avatar} mood="smirking" size="lg" className="my-3" />

              <div className="w-full text-center border-t border-slate-foggy/10 pt-2">
                <span className="text-[11px] font-dossier text-slate-foggy">
                  Question {currentQIndex + 1} of {QUESTIONS.length}
                </span>
              </div>
            </div>

            {/* Right: Question Text Balloon & Response Cards */}
            <div className="flex-1 flex flex-col justify-between h-[450px]">
              {/* Question Speech Balloon */}
              <div className="comic-panel comic-panel-amber p-6 rounded">
                <span className="text-[10px] font-dossier text-amber-dugout uppercase tracking-widest block mb-2">
                  Microphone Recorded:
                </span>
                <p className="font-display text-lg text-slate-mist leading-relaxed italic">
                  {currentQ.text}
                </p>
              </div>

              {/* Response Options */}
              <div className="flex flex-col gap-2.5 mt-4">
                {currentQ.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className="p-3.5 border border-slate-foggy/25 bg-noir-900/90 hover:border-amber-dugout hover:bg-amber-dugout/10 text-left transition-all rounded choice-glow group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-dossier text-xs text-amber-gold uppercase tracking-wider font-bold">
                        › {opt.tone}
                      </span>
                      <span className="text-[10px] font-dossier text-slate-foggy opacity-0 group-hover:opacity-100 transition-opacity">
                        Rep {opt.effects.reputation > 0 ? `+${opt.effects.reputation}` : opt.effects.reputation} · Fans {opt.effects.fans > 0 ? `+${opt.effects.fans}` : opt.effects.fans}
                      </span>
                    </div>
                    <div className="font-display text-sm text-slate-mist group-hover:text-white">
                      {opt.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Newspaper Front Page Result */
          <div className="w-full max-w-xl mx-auto bg-parchment-light text-noir-950 p-8 rounded shadow-2xl border-4 border-noir-900 flex flex-col items-center text-center">
            <span className="text-xs font-dossier uppercase tracking-[0.4em] text-noir-700 block border-b border-noir-800/20 pb-2 w-full">
              The Lancashire Telegraph · Sports Special Edition
            </span>
            <h2 className="font-headline text-5xl mt-4 mb-3 tracking-tight text-noir-950 leading-none">
              {headline}
            </h2>
            <p className="font-serif text-sm text-noir-800 max-w-md italic mb-6 leading-relaxed">
              "The new man in the Calder Vale dugout did not hold back in front of the cameras today,
              leaving supporters and board members with plenty to ponder before the weekend."
            </p>

            <div className="w-full grid grid-cols-3 gap-2 py-3 border-y border-noir-900/20 text-xs font-dossier mb-6">
              <div>
                <span className="block text-noir-600 text-[10px] uppercase">Board Stance</span>
                <span className="font-bold text-noir-900">{metrics.boardConfidence}%</span>
              </div>
              <div>
                <span className="block text-noir-600 text-[10px] uppercase">Fan Sentiment</span>
                <span className="font-bold text-noir-900">{metrics.fanSentiment}%</span>
              </div>
              <div>
                <span className="block text-noir-600 text-[10px] uppercase">Media Rating</span>
                <span className="font-bold text-noir-900">{metrics.reputation}/100</span>
              </div>
            </div>

            <button
              onClick={onComplete}
              className="py-3 px-8 bg-noir-950 text-parchment-light font-dossier uppercase tracking-widest text-xs font-bold hover:bg-noir-800 transition-colors rounded shadow-comic"
            >
              Return to Dugout Office →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
