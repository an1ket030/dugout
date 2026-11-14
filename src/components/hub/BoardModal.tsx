/**
 * Board & Finances Modal — The Chairman's Office
 * Graphic novel styling: Arthur Pendelton's portrait, confidence meter,
 * and high-tension financial balance sheet.
 */

import { sfx } from '../../engine/audioSynth'
import CharacterPortrait from '../narrative/CharacterPortrait'
import type { Club, Manager } from '../../types/game'

interface BoardModalProps {
  club: Club
  manager: Manager
  onClose: () => void
}

export default function BoardModal({ club, manager, onClose }: BoardModalProps) {
  const confidence = club.boardConfidence
  const status =
    confidence >= 80 ? 'Untouchable' :
    confidence >= 60 ? 'Stable' :
    confidence >= 40 ? 'Under Formal Review' :
    'Imminent Sacking Danger'

  const statusColor =
    confidence >= 60 ? 'text-green-400 border-green-500/40 bg-green-500/10' :
    confidence >= 40 ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' :
    'text-red-siren border-red-500/40 bg-red-500/10'

  return (
    <div className="fixed inset-0 z-50 bg-noir-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-noir-900 border-2 border-slate-foggy/30 rounded shadow-dossier flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b-2 border-slate-foggy/15 flex items-center justify-between bg-noir-950">
          <div className="flex items-center gap-3">
            <span className="stamp stamp-red text-[9px]">EXECUTIVE SUITE</span>
            <div>
              <h2 className="font-headline text-2xl text-slate-mist tracking-wide">
                BOARDROOM & TREASURY
              </h2>
              <p className="text-[10px] font-dossier text-slate-foggy uppercase tracking-wider">
                {club.name} · Chairman Arthur Pendelton
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
        <div className="p-6 overflow-y-auto flex gap-6 text-xs font-dossier">
          {/* Chairman Visual */}
          <div className="w-64 flex flex-col items-center bg-noir-950 border border-slate-foggy/20 p-4 rounded text-center shrink-0">
            <CharacterPortrait characterId="arthur" mood={confidence < 45 ? 'furious' : 'skeptical'} size="md" />
            <span className="font-headline text-xl text-slate-mist mt-3">Arthur Pendelton</span>
            <span className="text-[10px] font-dossier text-amber-dugout uppercase">Owner & Textile Merchant</span>
            <p className="font-serif italic text-xs text-slate-foggy mt-2 leading-relaxed">
              "I took a punt on you because the bank manager is threatening to padlock the turnstiles. Don't embarrass me."
            </p>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-5">
            {/* Confidence Bar */}
            <div className="bg-noir-950 p-4 border border-slate-foggy/20 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-foggy uppercase tracking-wider">Job Security Rating:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] border font-bold ${statusColor}`}>
                  {confidence}% · {status}
                </span>
              </div>
              <div className="w-full h-3 bg-noir-900 rounded-full border border-slate-foggy/20 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    confidence >= 60 ? 'bg-green-500' : confidence >= 40 ? 'bg-amber-dugout' : 'bg-red-siren'
                  }`}
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>

            {/* Directive */}
            <div className="border border-amber-dugout/30 bg-amber-dugout/5 p-4 rounded">
              <span className="text-amber-gold uppercase tracking-widest text-[10px] font-bold block mb-1">
                Mandatory Directive
              </span>
              <p className="font-headline text-2xl text-slate-mist tracking-wide">
                "{club.boardObjective}"
              </p>
            </div>

            {/* Balance Sheet */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-noir-950 border border-slate-foggy/20 rounded">
                <span className="text-slate-foggy block text-[10px] uppercase">Transfer Reserves</span>
                <span className="text-green-400 font-bold text-base">£{club.budget.toLocaleString()}</span>
              </div>

              <div className="p-3 bg-noir-950 border border-slate-foggy/20 rounded">
                <span className="text-slate-foggy block text-[10px] uppercase">Weekly Wage Bill</span>
                <span className="text-slate-mist font-bold text-base">£{club.wageBill.toLocaleString()} / wk</span>
              </div>

              <div className="p-3 bg-noir-950 border border-slate-foggy/20 rounded">
                <span className="text-slate-foggy block text-[10px] uppercase">Stadium Capacity</span>
                <span className="text-slate-mist font-bold text-base">{club.stadiumCapacity.toLocaleString()} seats</span>
              </div>

              <div className="p-3 bg-noir-950 border border-slate-foggy/20 rounded">
                <span className="text-slate-foggy block text-[10px] uppercase">Historic Debt</span>
                <span className="text-red-siren font-bold text-base">{club.debtLevel}% (£180,000)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-slate-foggy/15 bg-noir-950 flex justify-end">
          <button
            onClick={() => { sfx.paperRustle(); onClose() }}
            className="px-6 py-2 text-xs font-dossier uppercase font-bold tracking-widest border border-slate-foggy/30 text-slate-foggy hover:border-amber-dugout hover:text-amber-gold transition-colors rounded"
          >
            Leave Boardroom
          </button>
        </div>
      </div>
    </div>
  )
}
