/**
 * Zustand game store — single source of truth for all reactive UI state.
 * Simulation core mutates this via actions; React reads from it.
 */

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type { GameState, GamePhase, Choice } from '../types/game'

// ============================================================
// NOTIFICATION TYPE (UI only, not persisted)
// ============================================================

export interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'danger'
  title: string
  body?: string
  duration?: number  // ms, 0 = persistent
}

// ============================================================
// DIALOGUE STATE (UI only)
// ============================================================

export interface DialogueState {
  active: boolean
  speaker: string
  text: string
  portrait: string | null
  choices: Choice[]
  awaitingChoice: boolean
}

// ============================================================
// STORE SHAPE
// ============================================================

interface DugoutStore {
  // ---- Persistence ----
  gameState: GameState | null
  saveSlots: string[]

  // ---- Current phase ----
  phase: GamePhase

  // ---- Dialogue / story ----
  dialogue: DialogueState

  // ---- Notifications ----
  notifications: NotificationItem[]

  // ---- Loading ----
  loading: boolean
  loadingMessage: string

  // ---- Actions ----
  setPhase: (phase: GamePhase) => void
  setGameState: (gs: GameState) => void
  patchGameState: (patch: Partial<GameState>) => void

  setDialogueLine: (speaker: string, text: string, portrait?: string) => void
  setDialogueChoices: (choices: Choice[]) => void
  clearDialogue: () => void

  addNotification: (n: Omit<NotificationItem, 'id'>) => void
  dismissNotification: (id: string) => void

  setLoading: (loading: boolean, message?: string) => void

  patchFlag: (key: string, value: boolean | number | string) => void
}

const defaultDialogue: DialogueState = {
  active: false,
  speaker: '',
  text: '',
  portrait: null,
  choices: [],
  awaitingChoice: false,
}

export const useStore = create<DugoutStore>()(
  subscribeWithSelector((set, get) => ({
    gameState: null,
    saveSlots: [],
    phase: 'menu',
    dialogue: defaultDialogue,
    notifications: [],
    loading: false,
    loadingMessage: '',

    setPhase: (phase) => set({ phase }),

    setGameState: (gs) => set({ gameState: gs }),

    patchGameState: (patch) =>
      set((s) => ({
        gameState: s.gameState ? { ...s.gameState, ...patch, updated: Date.now() } : null,
      })),

    setDialogueLine: (speaker, text, portrait) =>
      set({
        dialogue: {
          active: true,
          speaker,
          text,
          portrait: portrait ?? null,
          choices: [],
          awaitingChoice: false,
        },
      }),

    setDialogueChoices: (choices) =>
      set((s) => ({
        dialogue: { ...s.dialogue, choices, awaitingChoice: true },
      })),

    clearDialogue: () => set({ dialogue: defaultDialogue }),

    addNotification: (n) => {
      const id = crypto.randomUUID()
      set((s) => ({
        notifications: [...s.notifications, { ...n, id }],
      }))
      if (n.duration && n.duration > 0) {
        setTimeout(() => get().dismissNotification(id), n.duration)
      }
    },

    dismissNotification: (id) =>
      set((s) => ({
        notifications: s.notifications.filter((n) => n.id !== id),
      })),

    setLoading: (loading, message = '') => set({ loading, loadingMessage: message }),

    patchFlag: (key, value) =>
      set((s) => {
        if (!s.gameState) return {}
        return {
          gameState: {
            ...s.gameState,
            flags: { ...s.gameState.flags, [key]: value },
            updated: Date.now(),
          },
        }
      }),
  }))
)
