/**
 * Full-screen loading overlay.
 */

import { useStore } from '../../store/gameStore'

export default function LoadingOverlay() {
  const message = useStore(s => s.loadingMessage)

  return (
    <div className="fixed inset-0 z-[100] bg-pitch-950/95 backdrop-blur flex flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 border-2 border-amber-dugout/20 rounded-full" />
        <div className="absolute inset-0 border-t-2 border-amber-dugout rounded-full animate-spin" />
      </div>
      {message && (
        <p className="text-slate-foggy text-sm font-mono uppercase tracking-widest">
          {message}
        </p>
      )}
    </div>
  )
}
