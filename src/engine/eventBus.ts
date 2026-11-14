/**
 * Event Bus — typed pub/sub bridge between all layers.
 * React UI, Phaser canvas, Ink story runner, and simulation core
 * all communicate exclusively through this bus.
 */

type Listener<T = unknown> = (payload: T) => void

class EventBus {
  private listeners: Map<string, Set<Listener>> = new Map()

  on<T>(event: string, listener: Listener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(listener as Listener)
    // Return unsubscribe function
    return () => this.off(event, listener as Listener)
  }

  off(event: string, listener: Listener): void {
    this.listeners.get(event)?.delete(listener)
  }

  emit<T>(event: string, payload?: T): void {
    this.listeners.get(event)?.forEach(l => l(payload))
  }

  once<T>(event: string, listener: Listener<T>): void {
    const wrapper: Listener = (payload) => {
      listener(payload as T)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
  }
}

// Singleton — import this everywhere
export const bus = new EventBus()

// ============================================================
// TYPED EVENT CATALOGUE
// (Keeps event names from becoming stringly-typed magic strings)
// ============================================================

export const Events = {
  // Story ↔ React
  DIALOGUE_LINE:        'story:dialogue_line',
  DIALOGUE_CHOICES:     'story:choices',
  CHOICE_MADE:          'story:choice_made',
  STORY_FLAG_CHANGED:   'story:flag_changed',
  STORY_SCENE_END:      'story:scene_end',
  CUTSCENE_START:       'story:cutscene_start',
  CUTSCENE_END:         'story:cutscene_end',

  // Match engine → React / Phaser
  MATCH_START:          'match:start',
  MATCH_GOAL:           'match:goal',
  MATCH_EVENT:          'match:event',
  MATCH_HALFTIME:       'match:halftime',
  MATCH_END:            'match:end',
  PLAYER_INJURED:       'match:player_injured',

  // Hub / management
  WEEK_ADVANCE:         'hub:week_advance',
  SEASON_END:           'hub:season_end',
  TRANSFER_OFFER:       'hub:transfer_offer',
  PLAYER_MORALE_CHANGE: 'hub:morale_change',

  // UI
  PHASE_CHANGE:         'ui:phase_change',
  SAVE_REQUESTED:       'ui:save',
  LOAD_REQUESTED:       'ui:load',
  NOTIFICATION:         'ui:notification',

  // Audio
  AUDIO_PLAY:           'audio:play',
  AUDIO_STOP:           'audio:stop',
  AUDIO_AMBIENT:        'audio:ambient',
} as const

export type EventKey = typeof Events[keyof typeof Events]
