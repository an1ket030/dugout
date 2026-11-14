/**
 * Notification stack — top-right toast notifications.
 */

import { useStore } from '../../store/gameStore'

export default function NotificationStack() {
  const notifications = useStore(s => s.notifications)
  const dismiss = useStore(s => s.dismissNotification)

  if (!notifications.length) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-72">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`
            border p-3 backdrop-blur-sm dialogue-enter flex gap-3 items-start
            ${n.type === 'danger'  ? 'border-red-siren/50 bg-pitch-900/90' :
              n.type === 'warning' ? 'border-amber-dugout/50 bg-pitch-900/90' :
              n.type === 'success' ? 'border-green-700/50 bg-pitch-900/90' :
                                     'border-slate-foggy/20 bg-pitch-900/90'}
          `}
        >
          <div className="flex-1">
            <div className={`text-xs font-mono uppercase tracking-widest mb-0.5 ${
              n.type === 'danger' ? 'text-red-siren' :
              n.type === 'warning' ? 'text-amber-dugout' :
              n.type === 'success' ? 'text-green-500' : 'text-slate-foggy'
            }`}>
              {n.title}
            </div>
            {n.body && <p className="text-slate-foggy text-xs leading-snug">{n.body}</p>}
          </div>
          <button
            onClick={() => dismiss(n.id)}
            className="text-slate-foggy/40 hover:text-slate-foggy text-xs mt-0.5 shrink-0"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
