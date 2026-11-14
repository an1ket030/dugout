/**
 * Match Screen — Graphic Novel 2D Pitch & Live Match Simulation
 * Atmospheric rain, tactile sound effects, live commentary ticker,
 * tactical half-time talks, and post-match ratings.
 */

import { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/gameStore'
import { rng } from '../engine/rng'
import { saveGame } from '../engine/persistence'
import { sfx } from '../engine/audioSynth'
import RainOverlay from '../components/ui/RainOverlay'
import type { Player, MatchResult, Formation } from '../types/game'

interface MatchScreenProps {
  onFinish?: () => void
}

export default function MatchScreen({ onFinish }: MatchScreenProps) {
  const gameState = useStore(s => s.gameState)
  const patchGameState = useStore(s => s.patchGameState)
  const setPhase = useStore(s => s.setPhase)
  const addNotification = useStore(s => s.addNotification)

  const [matchStage, setMatchStage] = useState<'pre' | 'first_half' | 'halftime' | 'second_half' | 'fulltime'>('pre')
  const [minute, setMinute] = useState(0)
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [commentary, setCommentary] = useState<Array<{ minute: number; text: string; type?: string }>>([])
  const [simSpeed, setSimSpeed] = useState<number>(1) // 1x or 2x
  const [goalBanner, setGoalBanner] = useState<string | null>(null)

  // Tactics
  const [formation, setFormation] = useState<Formation>('4-4-2')
  const [mentality, setMentality] = useState<'defensive' | 'balanced' | 'attacking'>('balanced')

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Post-match result
  const [finalResult, setFinalResult] = useState<MatchResult | null>(null)

  if (!gameState) return null

  const userClub = gameState.clubs[gameState.currentClubId]

  const currentFixture = gameState.fixtures.find(f => !f.played) || {
    id: 'fix_mock',
    season: gameState.currentSeason,
    week: gameState.currentWeek,
    homeClubId: 'calder_vale',
    awayClubId: 'brierfield',
    competition: 'Northern Counties East League',
    played: false,
  }

  const isHome = currentFixture.homeClubId === userClub.id
  const opponentClub = gameState.clubs[isHome ? currentFixture.awayClubId : currentFixture.homeClubId] || {
    id: 'brierfield',
    name: 'Brierfield FC',
    shortName: 'Brierfield',
    city: 'Brierfield',
    tier: 6,
    colours: { primary: '#2d3748', secondary: '#cbd5e0' },
    budget: 10000,
    wageBill: 3300,
    debtLevel: 50,
    trainingGrade: 1,
    stadiumCapacity: 1500,
    youthAcademy: 1,
    boardConfidence: 60,
    boardObjective: 'Mid-table',
  }

  const homeClub = isHome ? userClub : opponentClub
  const awayClub = isHome ? opponentClub : userClub

  const userStarters: Player[] = gameState.squad
    .map(id => gameState.players[id])
    .filter(Boolean)
    .slice(0, 11)

  // Simulation timer
  useEffect(() => {
    if (matchStage !== 'first_half' && matchStage !== 'second_half') return

    const intervalMs = simSpeed === 1 ? 380 : 160

    const timer = setInterval(() => {
      setMinute(prevMin => {
        const nextMin = prevMin + 1

        generateMatchTickEvents(nextMin)

        if (nextMin === 45 && matchStage === 'first_half') {
          clearInterval(timer)
          setMatchStage('halftime')
          sfx.refereeWhistle()
          addCommentary(45, 'The referee blows the whistle for half-time. The players jog towards the tunnel.', 'whistle')
          return 45
        }

        if (nextMin >= 90 && matchStage === 'second_half') {
          clearInterval(timer)
          sfx.refereeWhistle()
          finishMatch(90)
          return 90
        }

        return nextMin
      })
    }, intervalMs)

    return () => clearInterval(timer)
  }, [matchStage, simSpeed, homeScore, awayScore])

  // Canvas Pitch Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let ballX = 360
    let ballY = 190
    let targetX = 360
    let targetY = 190

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Pitch Grass / Mud Texture
      ctx.fillStyle = '#0f1c11'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cut grass stripes
      ctx.fillStyle = '#142417'
      for (let i = 0; i < canvas.width; i += 60) {
        if ((i / 60) % 2 === 0) {
          ctx.fillRect(i, 0, 30, canvas.height)
        }
      }

      // Muddy goalmouths
      ctx.fillStyle = '#221911'
      ctx.fillRect(30, canvas.height / 2 - 40, 45, 80)
      ctx.fillRect(canvas.width - 75, canvas.height / 2 - 40, 45, 80)

      // White Markings
      ctx.strokeStyle = '#435e47'
      ctx.lineWidth = 2

      // Boundary
      ctx.strokeRect(30, 20, canvas.width - 60, canvas.height - 40)
      // Halfway line
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, 20)
      ctx.lineTo(canvas.width / 2, canvas.height - 20)
      ctx.stroke()
      // Centre circle
      ctx.beginPath()
      ctx.arc(canvas.width / 2, canvas.height / 2, 55, 0, Math.PI * 2)
      ctx.stroke()

      // Left Penalty Box
      ctx.strokeRect(30, canvas.height / 2 - 75, 100, 150)
      ctx.strokeRect(30, canvas.height / 2 - 35, 35, 70)
      // Right Penalty Box
      ctx.strokeRect(canvas.width - 130, canvas.height / 2 - 75, 100, 150)
      ctx.strokeRect(canvas.width - 65, canvas.height / 2 - 35, 35, 70)

      // Ball Physics
      if (Math.hypot(targetX - ballX, targetY - ballY) < 12) {
        targetX = rng.int(80, canvas.width - 80)
        targetY = rng.int(50, canvas.height - 50)
      } else {
        ballX += (targetX - ballX) * 0.06
        ballY += (targetY - ballY) * 0.06
      }

      // Draw Ball
      ctx.fillStyle = '#fdfbf7'
      ctx.beginPath()
      ctx.arc(ballX, ballY, 4.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.lineWidth = 1
      ctx.strokeStyle = '#000000'
      ctx.stroke()

      // Team Dots
      ctx.fillStyle = homeClub.colours.secondary || '#d4882b'
      drawTeamDots(ctx, canvas, true)

      ctx.fillStyle = awayClub.colours.secondary || '#cbd5e0'
      drawTeamDots(ctx, canvas, false)

      animationFrameRef.current = requestAnimationFrame(render)
    }

    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [homeClub, awayClub])

  function drawTeamDots(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, isLeft: boolean) {
    const xBase = isLeft ? 100 : canvas.width - 100
    const dir = isLeft ? 1 : -1

    const positions = [
      { x: xBase - dir * 45, y: canvas.height / 2 }, // GK
      { x: xBase + dir * 30, y: 70 },
      { x: xBase + dir * 30, y: 150 },
      { x: xBase + dir * 30, y: 230 },
      { x: xBase + dir * 30, y: 310 }, // Back 4
      { x: xBase + dir * 110, y: 80 },
      { x: xBase + dir * 100, y: 150 },
      { x: xBase + dir * 100, y: 230 },
      { x: xBase + dir * 110, y: 300 }, // Mid 4
      { x: xBase + dir * 170, y: 140 },
      { x: xBase + dir * 170, y: 240 }, // Front 2
    ]

    positions.forEach(pos => {
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 5.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#070908'
      ctx.lineWidth = 1.5
      ctx.stroke()
    })
  }

  function addCommentary(min: number, text: string, type?: string) {
    setCommentary(prev => [{ minute: min, text, type }, ...prev])
  }

  function generateMatchTickEvents(currMin: number) {
    // Chance of goal: ~1 in 25 ticks
    if (rng.chance(0.048)) {
      const userScoringChance = mentality === 'attacking' ? 0.62 : mentality === 'defensive' ? 0.38 : 0.5
      const isHomeScoring = isHome ? rng.chance(userScoringChance) : rng.chance(1 - userScoringChance)

      sfx.stampSlam()

      if (isHomeScoring) {
        setHomeScore(s => s + 1)
        const scorer = isHome ? (userStarters[rng.int(7, 10)]?.name || 'Liam Clegg') : 'Hardwick'
        setGoalBanner(`GOAL! ${scorer} (${homeClub.shortName})`)
        setTimeout(() => setGoalBanner(null), 2500)
        addCommentary(currMin, `GOAL! ${scorer} smashes it into the top corner! ${homeClub.shortName} strike!`, 'goal')
      } else {
        setAwayScore(s => s + 1)
        const scorer = !isHome ? (userStarters[rng.int(7, 10)]?.name || 'Liam Clegg') : 'Sutton'
        setGoalBanner(`GOAL! ${scorer} (${awayClub.shortName})`)
        setTimeout(() => setGoalBanner(null), 2500)
        addCommentary(currMin, `GOAL! ${scorer} breaks through and scores for ${awayClub.shortName}!`, 'goal')
      }
    } else if (rng.chance(0.08)) {
      const commentaries = [
        `Crunching slide tackle in the mud by ${userStarters[2]?.name || 'Terry Moss'}! Great defending.`,
        `Dangerous set-piece whipped across the six-yard box, cleared behind for a corner.`,
        `Heavy collision in the centre circle. Referee brandishes a stern verbal caution.`,
        `Slick passing move on the flank by ${userClub.shortName}, crowd roars encouragement!`,
        `Goalkeeper makes a flying fingertip save to tip it around the post!`,
        `Shot from the edge of the area whistles inches wide of the upright!`,
      ]
      addCommentary(currMin, rng.pick(commentaries))
    }
  }

  function startMatch() {
    sfx.refereeWhistle()
    setMatchStage('first_half')
    addCommentary(1, `Kick-off at Calder Vale! The whistle blows as freezing rain beats down on the corrugated roof.`)
  }

  function applyHalfTimeTalk(type: 'inspire' | 'focus' | 'berate') {
    sfx.stampSlam()
    if (type === 'inspire') {
      addCommentary(45, `Manager talk: "Remember who you're playing for! Lift your heads!" Squad roars in reply.`, 'tactics')
      setMentality('attacking')
    } else if (type === 'focus') {
      addCommentary(45, `Manager talk: "Discipline. Lock the doors, do not give them an inch."`, 'tactics')
      setMentality('defensive')
    } else {
      addCommentary(45, `Manager talk: Full-blown hairdryer! Teacups rattle in the sink.`, 'tactics')
    }
    setMatchStage('second_half')
    sfx.refereeWhistle()
    addCommentary(46, `The teams return to the pitch for the second half. Play resumes!`)
  }

  async function finishMatch(finalMin: number) {
    if (!gameState) return
    const currentState = gameState
    setMatchStage('fulltime')
    addCommentary(finalMin, `FULL TIME! The referee brings an intense contest to an end.`, 'whistle')

    const userGoals = isHome ? homeScore : awayScore
    const oppGoals = isHome ? awayScore : homeScore
    const won = userGoals > oppGoals
    const drawn = userGoals === oppGoals

    const ratings: Record<string, number> = {}
    userStarters.forEach(p => {
      ratings[p.id] = Math.round((6.0 + (won ? 1.3 : drawn ? 0.3 : -0.7) + rng.float() * 0.8) * 10) / 10
    })

    const result: MatchResult = {
      homeClubId: homeClub.id,
      awayClubId: awayClub.id,
      homeGoals: homeScore,
      awayGoals: awayScore,
      events: [],
      rating: ratings,
      attendance: rng.int(850, 1220),
    }
    setFinalResult(result)

    const ptsWon = won ? 3 : drawn ? 1 : 0
    const updatedTable = currentState.leagueTable.map(row => {
      if (row.clubId === userClub.id) {
        return {
          ...row,
          played: row.played + 1,
          won: row.won + (won ? 1 : 0),
          drawn: row.drawn + (drawn ? 1 : 0),
          lost: row.lost + (!won && !drawn ? 1 : 0),
          gf: row.gf + userGoals,
          ga: row.ga + oppGoals,
          points: row.points + ptsWon,
        }
      }
      return row
    })

    updatedTable.sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga))

    const boardDelta = won ? +7 : drawn ? +2 : -5
    const newBoardConfidence = Math.max(0, Math.min(100, userClub.boardConfidence + boardDelta))

    const updatedClubs = {
      ...currentState.clubs,
      [userClub.id]: {
        ...userClub,
        boardConfidence: newBoardConfidence,
      },
    }

    const updatedFixtures = currentState.fixtures.map(f =>
      f.id === currentFixture.id ? { ...f, played: true, result } : f
    )

    const updatedState: typeof currentState = {
      ...currentState,
      currentWeek: currentState.currentWeek + 1,
      clubs: updatedClubs,
      fixtures: updatedFixtures,
      leagueTable: updatedTable,
      results: [result, ...currentState.results],
      flags: {
        ...currentState.flags,
        firstMatchPlayed: true,
      },
    }

    patchGameState(updatedState)
    await saveGame(updatedState)

    addNotification({
      type: won ? 'success' : drawn ? 'info' : 'danger',
      title: won ? 'Victory at Calder Vale!' : drawn ? 'Point Earned' : 'Defeat',
      body: `Final whistle: ${userClub.shortName} ${userGoals} - ${oppGoals} ${opponentClub.shortName}`,
      duration: 6000,
    })
  }

  function handleReturnToHub() {
    sfx.paperRustle()
    if (onFinish) {
      onFinish()
    } else {
      setPhase('hub')
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-noir-950 text-slate-mist select-none overflow-hidden relative">
      <RainOverlay opacity={0.3} />

      {/* Goal Celebration Graphic Flash Banner */}
      {goalBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-dugout text-noir-950 px-8 py-3 rounded border-2 border-noir-950 shadow-2xl animate-bounce">
          <span className="font-headline text-3xl tracking-wide">{goalBanner}</span>
        </div>
      )}

      {/* Scoreboard Header */}
      <header className="border-b-2 border-slate-foggy/20 bg-noir-900/95 px-8 py-3 flex items-center justify-between shrink-0 z-20 shadow-dossier">
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="font-headline text-2xl text-slate-mist tracking-wide block">{homeClub.name}</span>
            <span className="text-[10px] font-dossier text-slate-foggy uppercase">HOME</span>
          </div>

          <div className="px-5 py-1.5 bg-noir-950 border-2 border-amber-dugout rounded flex items-center gap-4 shadow-comic">
            <span className="font-headline text-4xl text-amber-gold">{homeScore}</span>
            <span className="text-slate-foggy font-headline text-2xl">-</span>
            <span className="font-headline text-4xl text-amber-gold">{awayScore}</span>
          </div>

          <div className="text-left">
            <span className="font-headline text-2xl text-slate-mist tracking-wide block">{awayClub.name}</span>
            <span className="text-[10px] font-dossier text-slate-foggy uppercase">AWAY</span>
          </div>
        </div>

        {/* Clock & Speed controls */}
        <div className="flex items-center gap-4 font-dossier">
          <div className="px-3.5 py-1.5 border border-amber-dugout/50 font-bold text-base text-amber-gold bg-noir-950 rounded">
            {minute}' {matchStage === 'halftime' ? '(HT)' : matchStage === 'fulltime' ? '(FT)' : ''}
          </div>

          {(matchStage === 'first_half' || matchStage === 'second_half') && (
            <button
              onClick={() => {
                sfx.typewriterTick()
                setSimSpeed(s => s === 1 ? 2 : 1)
              }}
              className="text-xs px-3 py-1.5 border border-slate-foggy/30 hover:border-amber-dugout text-slate-foggy hover:text-slate-mist transition-colors rounded uppercase"
            >
              Speed: {simSpeed}x
            </button>
          )}
        </div>
      </header>

      {/* Main Pitch Arena & Commentary */}
      <div className="flex-1 flex overflow-hidden z-10">
        {/* Left: 2D Pitch Canvas */}
        <div className="flex-1 flex flex-col p-4 border-r border-slate-foggy/15">
          <div className="relative flex-1 bg-noir-900 border-2 border-slate-foggy/30 rounded overflow-hidden flex items-center justify-center shadow-dossier">
            <canvas
              ref={canvasRef}
              width={720}
              height={380}
              className="w-full h-full object-contain"
            />

            {/* Pre-Match Overlay */}
            {matchStage === 'pre' && (
              <div className="absolute inset-0 bg-noir-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                <span className="stamp stamp-amber text-[10px] mb-2">OFFICIAL MATCHDAY PROTOCOL</span>
                <h2 className="font-headline text-5xl text-slate-mist mb-1 tracking-wide">
                  {homeClub.shortName} VS {awayClub.shortName}
                </h2>
                <p className="text-xs text-slate-foggy font-dossier max-w-md mb-6 italic">
                  Calder Vale Ground · Attendance ~1,080 · Wet Lancashire Drizzle (4°C) · Pitch sodden
                </p>

                <div className="flex gap-4 mb-6 text-xs font-dossier">
                  <div>
                    <label className="text-slate-foggy block mb-1">Starting Shape</label>
                    <select
                      value={formation}
                      onChange={e => { sfx.paperRustle(); setFormation(e.target.value as Formation) }}
                      className="bg-noir-900 border border-slate-foggy/40 text-slate-mist px-3 py-1.5 outline-none rounded"
                    >
                      <option value="4-4-2">4-4-2 (Traditional Direct)</option>
                      <option value="4-3-3">4-3-3 (Wide Attack)</option>
                      <option value="4-2-3-1">4-2-3-1 (Midfield Control)</option>
                      <option value="3-5-2">3-5-2 (Wingback Overload)</option>
                      <option value="5-3-2">5-3-2 (Park the Bus)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-foggy block mb-1">Mentality</label>
                    <select
                      value={mentality}
                      onChange={e => { sfx.paperRustle(); setMentality(e.target.value as 'defensive' | 'balanced' | 'attacking') }}
                      className="bg-noir-900 border border-slate-foggy/40 text-slate-mist px-3 py-1.5 outline-none rounded"
                    >
                      <option value="defensive">Defensive (Absorb & Counter)</option>
                      <option value="balanced">Balanced (Structured)</option>
                      <option value="attacking">Attacking (High Line)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={startMatch}
                  className="py-3.5 px-10 bg-amber-dugout text-noir-950 font-dossier font-bold text-sm uppercase tracking-widest hover:bg-amber-gold transition-colors rounded shadow-comic choice-glow"
                >
                  Referee Whistle: Kick Off →
                </button>
              </div>
            )}

            {/* Half-Time Dressing Room Overlay */}
            {matchStage === 'halftime' && (
              <div className="absolute inset-0 bg-noir-950/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                <span className="stamp stamp-amber text-[10px] mb-2">HALF-TIME DRESSING ROOM</span>
                <h3 className="font-headline text-3xl text-slate-mist mb-1">
                  Current Score: {userClub.shortName} {isHome ? homeScore : awayScore} - {isHome ? awayScore : homeScore} {opponentClub.shortName}
                </h3>
                <p className="text-xs text-slate-foggy font-serif max-w-md mb-6 italic">
                  Players are catching their breath, sipping lukewarm tea. What is your tactical intervention?
                </p>

                <div className="flex flex-col gap-2.5 w-80">
                  <button
                    onClick={() => applyHalfTimeTalk('inspire')}
                    className="p-3 border border-amber-dugout/50 hover:border-amber-dugout text-left text-xs font-dossier text-slate-mist hover:bg-amber-dugout/10 transition-colors rounded"
                  >
                    <div className="text-amber-gold font-bold mb-0.5">"Raise the tempo, attack them!"</div>
                    <div className="text-slate-foggy text-[10px]">Switches mentality to Attacking.</div>
                  </button>

                  <button
                    onClick={() => applyHalfTimeTalk('focus')}
                    className="p-3 border border-slate-foggy/30 hover:border-slate-foggy text-left text-xs font-dossier text-slate-mist hover:bg-noir-850 transition-colors rounded"
                  >
                    <div className="text-slate-mist font-bold mb-0.5">"Hold our defensive shape."</div>
                    <div className="text-slate-foggy text-[10px]">Switches mentality to Defensive.</div>
                  </button>

                  <button
                    onClick={() => applyHalfTimeTalk('berate')}
                    className="p-3 border border-red-siren/40 hover:border-red-siren text-left text-xs font-dossier text-slate-mist hover:bg-red-siren/10 transition-colors rounded"
                  >
                    <div className="text-red-siren font-bold mb-0.5">"Wake up! Not good enough."</div>
                    <div className="text-slate-foggy text-[10px]">Aggressive reality check.</div>
                  </button>
                </div>
              </div>
            )}

            {/* Full-Time Report Overlay */}
            {matchStage === 'fulltime' && finalResult && (
              <div className="absolute inset-0 bg-noir-950/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center overflow-y-auto">
                <span className="stamp stamp-green text-[10px] mb-2">FULL TIME CLASSIFICATION</span>
                <h2 className="font-headline text-5xl text-slate-mist mb-1">
                  {homeClub.shortName} {homeScore} - {awayScore} {awayClub.shortName}
                </h2>
                <p className="text-xs font-dossier text-slate-foggy mb-6">
                  Official Attendance: {finalResult.attendance.toLocaleString()} · Official League Points Applied
                </p>

                {/* Ratings */}
                <div className="w-full max-w-md bg-noir-900 border border-slate-foggy/20 p-4 mb-6 text-left rounded shadow-dossier">
                  <h4 className="text-[10px] font-dossier text-amber-dugout uppercase tracking-wider mb-2">
                    {userClub.shortName} Match Performance Ratings
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-dossier">
                    {userStarters.map(p => (
                      <div key={p.id} className="flex justify-between border-b border-slate-foggy/10 py-1">
                        <span className="text-slate-foggy truncate pr-2">{p.position} {p.name}</span>
                        <span className={`font-bold ${
                          (finalResult.rating[p.id] || 6) >= 7.5 ? 'text-amber-gold' :
                          (finalResult.rating[p.id] || 6) <= 5.5 ? 'text-red-siren' : 'text-slate-mist'
                        }`}>
                          {finalResult.rating[p.id] || 6.0}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleReturnToHub}
                  className="py-3 px-10 bg-amber-dugout text-noir-950 font-dossier font-bold text-sm uppercase tracking-widest hover:bg-amber-gold transition-colors rounded shadow-comic"
                >
                  Return to Dugout Office →
                </button>
              </div>
            )}
          </div>

          {/* Under pitch: Tactical shout bar */}
          {(matchStage === 'first_half' || matchStage === 'second_half') && (
            <div className="mt-3 flex items-center justify-between text-xs font-dossier bg-noir-900/90 p-3 border border-slate-foggy/20 rounded">
              <div className="flex items-center gap-3">
                <span className="text-slate-foggy uppercase text-[10px]">Touchline Shouts:</span>
                {(['defensive', 'balanced', 'attacking'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      sfx.typewriterTick()
                      setMentality(m)
                      addCommentary(minute, `Tactical order from gaffer: SHIFT TO ${m.toUpperCase()}!`, 'tactics')
                    }}
                    className={`px-3 py-1 uppercase tracking-wider border rounded transition-colors ${
                      mentality === m
                        ? 'border-amber-dugout text-amber-gold bg-amber-dugout/15 font-bold'
                        : 'border-slate-foggy/20 text-slate-foggy hover:text-slate-mist'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="text-slate-foggy text-[11px] italic">
                Weather: Continuous rain · Floodlights on
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Commentary Feed */}
        <div className="w-80 flex flex-col bg-noir-900/80 p-4 border-l border-slate-foggy/15">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-foggy/15">
            <span className="font-headline text-lg text-slate-mist tracking-wide">MATCH TICKER</span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 font-dossier text-xs">
            {commentary.map((c, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded border transition-all ${
                  c.type === 'goal'
                    ? 'border-amber-dugout bg-amber-dugout/20 text-amber-gold font-bold shadow-comic'
                    : c.type === 'tactics'
                    ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                    : c.type === 'whistle'
                    ? 'border-slate-foggy/30 bg-noir-950 text-slate-mist'
                    : 'border-slate-foggy/15 bg-noir-950/60 text-slate-foggy'
                }`}
              >
                <span className="text-amber-dugout font-bold mr-2">{c.minute}'</span>
                <span className="leading-relaxed">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
