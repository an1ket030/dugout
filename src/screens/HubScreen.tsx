/**
 * Hub Screen — The Manager's Office / The Dugout
 * Graphic novel desk aesthetic: rain-streaked pitch window, tactile folders,
 * matchday posters, boardroom pressure gauges, and direct access to Phase 1 mini-games.
 */

import { useState } from 'react'
import { useStore } from '../store/gameStore'
import { saveGame } from '../engine/persistence'
import { sfx } from '../engine/audioSynth'
import SquadModal from '../components/hub/SquadModal'
import LeagueTableModal from '../components/hub/LeagueTableModal'
import BoardModal from '../components/hub/BoardModal'
import RainOverlay from '../components/ui/RainOverlay'
import CharacterPortrait from '../components/narrative/CharacterPortrait'
import type { Player } from '../types/game'

export default function HubScreen() {
  const gameState = useStore(s => s.gameState)
  const setPhase = useStore(s => s.setPhase)
  const addNotification = useStore(s => s.addNotification)

  const [activeModal, setActiveModal] = useState<'squad' | 'table' | 'board' | null>(null)

  if (!gameState) return null

  const { manager, currentSeason, currentWeek } = gameState
  const club = gameState.clubs[gameState.currentClubId]

  // Find next unplayed fixture
  const nextFixture = gameState.fixtures.find(f => !f.played)
  const isHome = nextFixture ? nextFixture.homeClubId === club.id : true
  const opponentClub = nextFixture
    ? gameState.clubs[isHome ? nextFixture.awayClubId : nextFixture.homeClubId]
    : null

  // Calculate current league position
  const leaguePosIndex = gameState.leagueTable.findIndex(row => row.clubId === club.id)
  const leaguePos = leaguePosIndex !== -1 ? leaguePosIndex + 1 : 11
  const ordinalSuffix = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd']
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  // Calculate recent form
  const recentResults = gameState.results.slice(0, 5)
  const formList = recentResults.length > 0
    ? recentResults.map(r => {
        const uGoals = r.homeClubId === club.id ? r.homeGoals : r.awayGoals
        const oGoals = r.homeClubId === club.id ? r.awayGoals : r.homeGoals
        return uGoals > oGoals ? 'W' : uGoals === oGoals ? 'D' : 'L'
      })
    : ['L', 'L', 'L', 'D', 'L']

  const squadList: Player[] = gameState.squad
    .map(id => gameState.players[id])
    .filter(Boolean)

  async function handleManualSave() {
    sfx.stampSlam()
    if (!gameState) return
    await saveGame(gameState)
    addNotification({
      type: 'success',
      title: 'Dossier Saved',
      body: `Season ${currentSeason}, Week ${currentWeek} committed to archive.`,
      duration: 3000,
    })
  }

  function openModal(modal: 'squad' | 'table' | 'board') {
    sfx.paperRustle()
    setActiveModal(modal)
  }

  return (
    <div className="w-full h-full flex flex-col bg-noir-950 text-slate-mist select-none overflow-hidden relative">
      <RainOverlay opacity={0.2} />

      {/* Top Manager Dossier Header */}
      <header className="border-b-2 border-slate-foggy/20 bg-noir-900/90 px-8 py-3.5 flex items-center justify-between shrink-0 z-20 shadow-dossier">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-amber-dugout bg-pitch-900 flex items-center justify-center font-headline text-lg text-amber-gold shadow-amber-glow">
            CV
          </div>
          <div>
            <div className="text-xl font-headline tracking-wide text-slate-mist flex items-center gap-2">
              <span>{club?.name ?? 'Calder Vale Town FC'}</span>
              <span className="stamp stamp-amber text-[8px] py-0 px-1.5">TIER 6</span>
            </div>
            <div className="text-[11px] font-dossier text-slate-foggy uppercase tracking-widest">
              Manager: {manager.name} ({manager.origin.replace('_', ' ')}) · Week {currentWeek}
            </div>
          </div>
        </div>

        {/* Vital Indicators */}
        <div className="flex items-center gap-6 text-xs font-dossier">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-foggy uppercase">Board Confidence</span>
            <span className={`font-bold ${club.boardConfidence < 45 ? 'text-red-siren' : 'text-amber-gold'}`}>
              {club.boardConfidence}%
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-foggy uppercase">Weekly Wages</span>
            <span className="font-bold text-slate-mist">£{club.wageBill}/wk</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-foggy uppercase">Treasury</span>
            <span className="font-bold text-green-400">£{club.budget.toLocaleString()}</span>
          </div>

          <button
            onClick={handleManualSave}
            className="py-1 px-3.5 font-dossier text-[10px] font-bold uppercase tracking-wider border border-amber-dugout/50 text-amber-gold hover:bg-amber-dugout hover:text-noir-950 transition-colors rounded shadow-comic"
          >
            Save File
          </button>
        </div>
      </header>

      {/* Main Dugout Workspace */}
      <main className="flex-1 overflow-y-auto p-6 z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* NEXT MATCH POSTER CARD */}
          <div className="md:col-span-2 comic-panel comic-panel-amber p-6 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-foggy/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="stamp stamp-red text-[9px]">NEXT FIXTURE</span>
                  <span className="text-xs font-dossier text-slate-foggy uppercase tracking-wider">
                    {nextFixture?.competition} · Matchday {nextFixture?.week}
                  </span>
                </div>
                <span className="text-xs font-dossier text-amber-dugout font-bold">
                  Saturday 3:00 PM · Lancashire Drizzle
                </span>
              </div>

              {nextFixture && opponentClub ? (
                <div className="flex items-center justify-around py-4">
                  <div className="text-center w-5/12">
                    <span className="text-[10px] font-dossier text-slate-foggy uppercase block mb-1">
                      {isHome ? 'HOME GROUND' : 'AWAY VENUE'}
                    </span>
                    <h3 className="font-headline text-3xl md:text-4xl text-slate-mist">
                      {isHome ? club.shortName : opponentClub.shortName}
                    </h3>
                  </div>

                  <div className="text-center">
                    <span className="font-headline text-4xl text-amber-gold/80 block">VS</span>
                  </div>

                  <div className="text-center w-5/12">
                    <span className="text-[10px] font-dossier text-slate-foggy uppercase block mb-1">
                      {!isHome ? 'HOME GROUND' : 'AWAY OPPONENT'}
                    </span>
                    <h3 className="font-headline text-3xl md:text-4xl text-slate-mist">
                      {!isHome ? club.shortName : opponentClub.shortName}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-slate-foggy font-serif italic">
                  All scheduled fixtures for the current round completed.
                </div>
              )}
            </div>

            {/* Match Actions */}
            <div className="pt-4 border-t border-slate-foggy/15 flex flex-wrap gap-3">
              <button
                onClick={() => { sfx.stampSlam(); setPhase('team_talk') }}
                className="py-3 px-6 bg-amber-dugout text-noir-950 font-dossier font-bold text-xs uppercase tracking-widest hover:bg-amber-gold transition-colors rounded shadow-comic choice-glow"
              >
                🗣️ Give Team Talk & Play Match →
              </button>

              <button
                onClick={() => { sfx.refereeWhistle(); setPhase('match') }}
                className="py-3 px-6 border border-slate-foggy/40 text-slate-mist font-dossier text-xs uppercase tracking-widest hover:border-amber-dugout hover:text-amber-gold transition-colors rounded"
              >
                Direct Match Simulation
              </button>

              <button
                onClick={() => openModal('squad')}
                className="py-3 px-4 border border-slate-foggy/30 text-slate-foggy font-dossier text-xs uppercase tracking-widest hover:text-slate-mist transition-colors rounded"
              >
                Tactics & Starting XI
              </button>
            </div>
          </div>

          {/* CLUB PULSE & SURVIVAL SITUATION */}
          <div className="comic-panel p-6 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-foggy/20 pb-3 mb-4">
                <span className="font-headline text-xl text-slate-mist">SURVIVAL PULSE</span>
                <span className={`stamp ${leaguePos >= 11 ? 'stamp-red' : 'stamp-green'} text-[9px]`}>
                  {leaguePos >= 11 ? 'RELEGATION ZONE' : 'SAFE'}
                </span>
              </div>

              <div className="space-y-3 font-dossier text-xs">
                <div
                  onClick={() => openModal('table')}
                  className="flex justify-between items-center cursor-pointer p-1.5 -mx-1.5 hover:bg-noir-900 rounded transition-colors"
                >
                  <span className="text-slate-foggy">Table Position:</span>
                  <span className={`font-bold text-sm ${leaguePos >= 11 ? 'text-red-siren' : 'text-slate-mist'}`}>
                    {ordinalSuffix(leaguePos)} / 12 clubs
                  </span>
                </div>

                <div className="flex justify-between items-center p-1.5 -mx-1.5">
                  <span className="text-slate-foggy">Form (Last 5):</span>
                  <div className="flex gap-1">
                    {formList.map((f, i) => (
                      <span
                        key={i}
                        className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                          f === 'W' ? 'bg-green-600 text-white' : f === 'D' ? 'bg-amber-dugout text-noir-950' : 'bg-red-siren text-white'
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  onClick={() => openModal('board')}
                  className="flex justify-between items-center cursor-pointer p-1.5 -mx-1.5 hover:bg-noir-900 rounded transition-colors"
                >
                  <span className="text-slate-foggy">Club Debt:</span>
                  <span className="text-red-siren font-bold">{club.debtLevel}% (£180k)</span>
                </div>

                <div
                  onClick={() => openModal('squad')}
                  className="flex justify-between items-center cursor-pointer p-1.5 -mx-1.5 hover:bg-noir-900 rounded transition-colors"
                >
                  <span className="text-slate-foggy">Squad Registered:</span>
                  <span className="text-slate-mist font-bold">{squadList.length} Players</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-foggy/15">
              <span className="text-[10px] font-dossier text-slate-foggy uppercase block mb-1">
                Arthur Pendelton's Directive:
              </span>
              <p className="font-serif italic text-xs text-amber-warm">
                "{club.boardObjective}"
              </p>
            </div>
          </div>

          {/* MANAGEMENT OFFICE DOSSIERS */}
          <div className="comic-panel p-6 rounded-lg">
            <span className="text-[10px] font-dossier text-amber-dugout uppercase tracking-widest block mb-2">
              Management Office
            </span>
            <h3 className="font-headline text-2xl text-slate-mist mb-4">TACTICAL DOSSIERS</h3>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => openModal('squad')}
                className="flex items-center gap-3 p-2.5 bg-noir-950 border border-slate-foggy/20 hover:border-amber-dugout rounded transition-colors text-left"
              >
                <span className="text-xl">⚽</span>
                <div>
                  <div className="font-headline text-base text-slate-mist">Squad & Fitness Roster</div>
                  <div className="text-[10px] font-dossier text-slate-foggy">Condition, morale, wages, attributes</div>
                </div>
              </button>

              <button
                onClick={() => openModal('table')}
                className="flex items-center gap-3 p-2.5 bg-noir-950 border border-slate-foggy/20 hover:border-amber-dugout rounded transition-colors text-left"
              >
                <span className="text-xl">🏆</span>
                <div>
                  <div className="font-headline text-base text-slate-mist">Northern Counties East Table</div>
                  <div className="text-[10px] font-dossier text-slate-foggy">Standings, GD, promotion & drop zones</div>
                </div>
              </button>

              <button
                onClick={() => openModal('board')}
                className="flex items-center gap-3 p-2.5 bg-noir-950 border border-slate-foggy/20 hover:border-amber-dugout rounded transition-colors text-left"
              >
                <span className="text-xl">💼</span>
                <div>
                  <div className="font-headline text-base text-slate-mist">Boardroom & Club Treasury</div>
                  <div className="text-[10px] font-dossier text-slate-foggy">Arthur's confidence, financial solvency</div>
                </div>
              </button>

              <button
                onClick={() => { sfx.stampSlam(); setPhase('press') }}
                className="flex items-center gap-3 p-2.5 bg-noir-950 border border-amber-dugout/40 hover:border-amber-gold rounded transition-colors text-left choice-glow"
              >
                <span className="text-xl">🎙️</span>
                <div>
                  <div className="font-headline text-base text-amber-gold">Media Press Conference</div>
                  <div className="text-[10px] font-dossier text-slate-foggy">Face Maya Higgins & the press corps</div>
                </div>
              </button>
            </div>
          </div>

          {/* STORY ENCOUNTER CARD */}
          <div className="md:col-span-2 comic-panel comic-panel-amber p-6 rounded-lg flex items-center gap-6">
            <div className="w-24 shrink-0 hidden sm:block">
              <CharacterPortrait characterId="eddie" mood="skeptical" size="md" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="stamp stamp-amber text-[8px]">KIT ROOM WHISPER</span>
                <span className="text-[11px] font-dossier text-slate-foggy uppercase">
                  Eddie Marlowe · Kit Man
                </span>
              </div>

              <p className="font-serif text-base text-slate-mist leading-relaxed italic mb-3">
                "There's something buried under the floorboards of this club, gaffer. You keep winning matches,
                and people are going to start asking questions they shouldn't."
              </p>

              <button
                onClick={() => { sfx.paperRustle(); setPhase('cutscene') }}
                className="py-2 px-5 bg-noir-950 border border-amber-dugout text-amber-gold font-dossier text-xs uppercase font-bold tracking-widest hover:bg-amber-dugout hover:text-noir-950 transition-colors rounded shadow-comic"
              >
                Replay Kit Room Prologue Scene →
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-foggy/15 bg-noir-900/90 px-8 py-2.5 flex items-center justify-between text-xs font-dossier text-slate-foggy z-20">
        <span>Manager Traits: {manager.traits.join(' · ')}</span>
        <button
          onClick={() => { sfx.paperRustle(); setPhase('menu') }}
          className="hover:text-amber-gold transition-colors uppercase tracking-wider"
        >
          ← Main Menu
        </button>
      </footer>

      {/* Modals */}
      {activeModal === 'squad' && (
        <SquadModal squad={squadList} onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'table' && (
        <LeagueTableModal
          leagueTable={gameState.leagueTable}
          clubs={gameState.clubs}
          userClubId={club.id}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'board' && (
        <BoardModal club={club} manager={manager} onClose={() => setActiveModal(null)} />
      )}
    </div>
  )
}
