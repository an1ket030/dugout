/**
 * League Table Modal — Official League Standings
 * Graphic novel styling: authentic newspaper masthead, promotion & drop zones.
 */

import { sfx } from '../../engine/audioSynth'
import type { LeagueRow, Club } from '../../types/game'

interface LeagueTableModalProps {
  leagueTable: LeagueRow[]
  clubs: Record<string, Club>
  userClubId: string
  onClose: () => void
}

export default function LeagueTableModal({
  leagueTable,
  clubs,
  userClubId,
  onClose,
}: LeagueTableModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-noir-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl max-h-[90vh] bg-noir-900 border-2 border-slate-foggy/30 rounded shadow-dossier flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b-2 border-slate-foggy/15 flex items-center justify-between bg-noir-950">
          <div className="flex items-center gap-3">
            <span className="stamp stamp-amber text-[9px]">OFFICIAL STANDINGS</span>
            <div>
              <h2 className="font-headline text-2xl text-slate-mist tracking-wide">
                NORTHERN COUNTIES EAST LEAGUE
              </h2>
              <p className="text-[10px] font-dossier text-slate-foggy uppercase tracking-wider">
                Division One · Tier 6 Pyramid
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
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left text-xs font-dossier">
            <thead className="bg-noir-950 text-slate-foggy/80 uppercase text-[10px] tracking-wider border-b border-slate-foggy/15">
              <tr>
                <th className="py-2.5 px-3 w-10">Pos</th>
                <th className="py-2.5 px-3">Club</th>
                <th className="py-2.5 px-2 text-center w-10">P</th>
                <th className="py-2.5 px-2 text-center w-10">W</th>
                <th className="py-2.5 px-2 text-center w-10">D</th>
                <th className="py-2.5 px-2 text-center w-10">L</th>
                <th className="py-2.5 px-2 text-center w-12">GD</th>
                <th className="py-2.5 px-3 text-right w-12 font-bold">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-foggy/10">
              {leagueTable.map((row, idx) => {
                const club = clubs[row.clubId]
                const isUser = row.clubId === userClubId
                const gd = row.gf - row.ga
                const isPromo = idx < 2
                const isRelegation = idx >= leagueTable.length - 2

                return (
                  <tr
                    key={row.clubId}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-amber-dugout/25 text-amber-gold font-bold shadow-comic'
                        : 'hover:bg-noir-850 text-slate-mist'
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <span className={`inline-block w-5 text-center font-bold ${
                        isPromo ? 'text-green-400' : isRelegation ? 'text-red-siren' : 'text-slate-foggy'
                      }`}>
                        {idx + 1}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-serif text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-slate-foggy/30"
                          style={{ background: club?.colours?.primary || '#333' }}
                        />
                        <span>{club?.name || row.clubId}</span>
                        {isUser && <span className="text-[10px] font-dossier text-amber-dugout font-bold uppercase">(You)</span>}
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-foggy">{row.played}</td>
                    <td className="py-2.5 px-2 text-center text-slate-foggy">{row.won}</td>
                    <td className="py-2.5 px-2 text-center text-slate-foggy">{row.drawn}</td>
                    <td className="py-2.5 px-2 text-center text-slate-foggy">{row.lost}</td>
                    <td className="py-2.5 px-2 text-center font-dossier">
                      <span className={gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-siren' : 'text-slate-foggy'}>
                        {gd > 0 ? `+${gd}` : gd}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-dossier font-bold text-slate-mist">
                      {row.points}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-slate-foggy/15 flex items-center gap-6 text-[11px] font-dossier text-slate-foggy">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-green-400" />
              <span>Positions 1-2: Automatic Promotion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-red-siren" />
              <span>Bottom 2: Drop into Step 7 County Leagues</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-slate-foggy/15 bg-noir-950 flex justify-end">
          <button
            onClick={() => { sfx.paperRustle(); onClose() }}
            className="px-6 py-2 text-xs font-dossier uppercase font-bold tracking-widest border border-slate-foggy/30 text-slate-foggy hover:border-amber-dugout hover:text-amber-gold transition-colors rounded"
          >
            Close Table
          </button>
        </div>
      </div>
    </div>
  )
}
