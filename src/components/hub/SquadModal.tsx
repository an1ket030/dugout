/**
 * Squad & Fitness Modal — Tactical Dossier
 * Graphic novel styling with player dossiers, attribute bars, and tactile sfx.
 */

import { useState } from 'react'
import { sfx } from '../../engine/audioSynth'
import type { Player } from '../../types/game'

interface SquadModalProps {
  squad: Player[]
  onClose: () => void
}

export default function SquadModal({ squad, onClose }: SquadModalProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(squad[0] || null)

  const posColor = (pos: string) => {
    if (pos === 'GK') return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10'
    if (['CB', 'LB', 'RB'].includes(pos)) return 'text-blue-400 border-blue-400/50 bg-blue-400/10'
    if (['DM', 'CM', 'AM'].includes(pos)) return 'text-green-400 border-green-400/50 bg-green-400/10'
    return 'text-red-400 border-red-400/50 bg-red-400/10'
  }

  const moraleColor = (morale: string) => {
    if (morale === 'ecstatic') return 'text-emerald-400'
    if (morale === 'good') return 'text-green-400'
    if (morale === 'okay') return 'text-slate-300'
    if (morale === 'low') return 'text-amber-400'
    return 'text-red-siren'
  }

  function handleSelect(p: Player) {
    sfx.typewriterTick()
    setSelectedPlayer(p)
  }

  return (
    <div className="fixed inset-0 z-50 bg-noir-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-noir-900 border-2 border-slate-foggy/30 rounded shadow-dossier flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b-2 border-slate-foggy/15 flex items-center justify-between bg-noir-950">
          <div className="flex items-center gap-3">
            <span className="stamp stamp-amber text-[9px]">SQUAD REGISTRATION</span>
            <div>
              <h2 className="font-headline text-2xl text-slate-mist tracking-wide">CALDER VALE SQUAD ROSTER</h2>
              <p className="text-[10px] font-dossier text-slate-foggy uppercase tracking-wider">
                {squad.length} Players Under First-Team Contract · Weekly Wage Bill: £{squad.reduce((acc, p) => acc + p.wage, 0)}
              </p>
            </div>
          </div>
          <button
            onClick={() => { sfx.paperRustle(); onClose() }}
            className="text-slate-foggy hover:text-amber-gold text-lg px-2.5 py-1 font-dossier transition-colors rounded border border-slate-foggy/20"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Player Table */}
          <div className="flex-1 overflow-y-auto border-r border-slate-foggy/15">
            <table className="w-full text-left text-xs font-dossier">
              <thead className="bg-noir-950 sticky top-0 text-slate-foggy/80 uppercase text-[10px] tracking-wider border-b border-slate-foggy/15">
                <tr>
                  <th className="py-2.5 px-3">Pos</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-2">Age</th>
                  <th className="py-2.5 px-2">Fitness</th>
                  <th className="py-2.5 px-2">Morale</th>
                  <th className="py-2.5 px-3">Wage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-foggy/10">
                {squad.map((p, idx) => (
                  <tr
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`cursor-pointer transition-colors ${
                      selectedPlayer?.id === p.id ? 'bg-amber-dugout/20 text-slate-mist' : 'hover:bg-noir-850 text-slate-mist/90'
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] border font-bold ${posColor(p.position)}`}>
                        {p.position}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-serif text-sm">
                      {p.name} {idx < 11 && <span className="text-[10px] text-amber-gold font-dossier font-bold">★ XI</span>}
                    </td>
                    <td className="py-2.5 px-2 text-slate-foggy">{p.age}</td>
                    <td className="py-2.5 px-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-noir-950 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${p.fitness >= 85 ? 'bg-green-500' : p.fitness >= 70 ? 'bg-amber-dugout' : 'bg-red-siren'}`}
                            style={{ width: `${p.fitness}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-foggy">{p.fitness}%</span>
                      </div>
                    </td>
                    <td className={`py-2.5 px-2 capitalize text-[11px] font-bold ${moraleColor(p.morale)}`}>
                      {p.morale}
                    </td>
                    <td className="py-2.5 px-3 text-slate-foggy">£{p.wage}/wk</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dossier Card on Selected Player */}
          {selectedPlayer && (
            <div className="w-80 p-5 bg-noir-950 overflow-y-auto flex flex-col gap-4 text-xs font-dossier">
              <div className="border-b border-slate-foggy/15 pb-3">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] border font-bold mb-1.5 ${posColor(selectedPlayer.position)}`}>
                  {selectedPlayer.position} · PRIMARY ROLE
                </span>
                <h3 className="font-headline text-2xl text-slate-mist">{selectedPlayer.name}</h3>
                <p className="text-slate-foggy text-[11px] mt-0.5">
                  Age {selectedPlayer.age} · {selectedPlayer.nationality} · Foot: {selectedPlayer.preferredFoot}
                </p>
              </div>

              {/* Attributes (1-20 Scale) */}
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-amber-dugout mb-2 font-bold">Technical Assessment</h4>
                <div className="grid grid-cols-2 gap-2">
                  <AttrItem label="Pace" val={selectedPlayer.pace} />
                  <AttrItem label="Shooting" val={selectedPlayer.shooting} />
                  <AttrItem label="Passing" val={selectedPlayer.passing} />
                  <AttrItem label="Dribbling" val={selectedPlayer.dribbling} />
                  <AttrItem label="Defending" val={selectedPlayer.defending} />
                  <AttrItem label="Physical" val={selectedPlayer.physical} />
                </div>
              </div>

              {/* Contract */}
              <div className="border-t border-slate-foggy/15 pt-3 space-y-1.5 text-slate-foggy text-[11px]">
                <div className="flex justify-between">
                  <span>Contract Terms:</span>
                  <span className="text-slate-mist font-bold">£{selectedPlayer.wage} per week</span>
                </div>
                <div className="flex justify-between">
                  <span>Expires:</span>
                  <span className="text-slate-mist">{selectedPlayer.contractEnds}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Valuation:</span>
                  <span className="text-slate-mist font-bold">£{selectedPlayer.transferValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Manager Loyalty:</span>
                  <span className="text-amber-gold capitalize font-bold">{selectedPlayer.relationshipWithManager}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-slate-foggy/15 bg-noir-950 flex justify-end">
          <button
            onClick={() => { sfx.paperRustle(); onClose() }}
            className="px-6 py-2 text-xs font-dossier uppercase font-bold tracking-widest border border-slate-foggy/30 text-slate-foggy hover:border-amber-dugout hover:text-amber-gold transition-colors rounded"
          >
            Close Roster
          </button>
        </div>
      </div>
    </div>
  )
}

function AttrItem({ label, val }: { label: string; val: number }) {
  return (
    <div className="flex justify-between items-center bg-noir-900 px-2 py-1.5 border border-slate-foggy/15 rounded">
      <span className="text-slate-foggy">{label}</span>
      <span className={`font-bold ${val >= 14 ? 'text-amber-gold' : val >= 9 ? 'text-slate-mist' : 'text-slate-500'}`}>
        {val}
      </span>
    </div>
  )
}
