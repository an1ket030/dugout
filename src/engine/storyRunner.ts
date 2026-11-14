/**
 * Ink story runner — wraps inkjs and bridges to the event bus.
 * Loads compiled .ink.json files, advances the story,
 * and emits typed events for the React UI to consume.
 */

import { Story } from 'inkjs'
import { bus, Events } from './eventBus'
import type { Choice } from '../types/game'

class StoryRunner {
  private story: InstanceType<typeof Story> | null = null
  private resolveChoice: ((index: number) => void) | null = null

  async load(inkJson: object): Promise<void> {
    this.story = new Story(JSON.stringify(inkJson))
    this._bindExternalFunctions()
  }

  /** Call to advance and emit all lines until a choice or end */
  async run(): Promise<void> {
    if (!this.story) return
    while (this.story.canContinue || this.story.currentChoices.length > 0) {
      if (this.story.canContinue) {
        const text = this.story.Continue()
        const tags = this.story.currentTags ?? []
        const speaker = this._extractTag(tags, 'speaker') ?? ''
        const portrait = this._extractTag(tags, 'portrait') ?? undefined

        bus.emit(Events.DIALOGUE_LINE, { speaker, text: text?.trim(), portrait })

        // Pause between lines — React controls pacing via DIALOGUE_LINE
        await this._waitForAdvance()

      } else if (this.story.currentChoices.length > 0) {
        const choices: Choice[] = this.story.currentChoices.map((c, i) => ({
          id: String(i),
          text: c.text,
        }))
        bus.emit(Events.DIALOGUE_CHOICES, { choices })

        // Wait for player to pick
        const choiceIndex = await this._waitForChoice()
        this.story.ChooseChoiceIndex(choiceIndex)

      } else {
        break
      }
    }
    bus.emit(Events.STORY_SCENE_END, {})
  }

  /** Advance past the current dialogue line */
  advance(): void {
    if (this._resolveAdvance) {
      const r = this._resolveAdvance
      this._resolveAdvance = null
      r()
    }
  }

  /** Set a variable in the Ink story */
  setVariable(name: string, value: boolean | number | string): void {
    if (!this.story) return
    this.story.variablesState[name] = value
  }

  /** Read a variable from the Ink story */
  getVariable(name: string): boolean | number | string | null {
    if (!this.story) return null
    return this.story.variablesState[name] as boolean | number | string | null
  }

  /** Jump to a named knot */
  jumpTo(knot: string): void {
    this.story?.ChoosePathString(knot)
  }

  // ---- Private ----

  private _resolveAdvance: (() => void) | null = null

  private _waitForAdvance(): Promise<void> {
    return new Promise((resolve) => {
      this._resolveAdvance = resolve
    })
  }

  private _waitForChoice(): Promise<number> {
    return new Promise((resolve) => {
      this.resolveChoice = resolve
    })
  }

  chooseOption(index: number): void {
    if (this.resolveChoice) {
      const r = this.resolveChoice
      this.resolveChoice = null
      r(index)
      bus.emit(Events.CHOICE_MADE, { index })
    }
  }

  private _extractTag(tags: string[], key: string): string | undefined {
    for (const tag of tags) {
      const [k, v] = tag.split(':').map(s => s.trim())
      if (k === key) return v
    }
    return undefined
  }

  private _bindExternalFunctions(): void {
    if (!this.story) return
    // e.g. BindExternalFunction for game-state reads/writes from Ink
    // Will be extended as we write more Ink content
  }
}

// Singleton
export const storyRunner = new StoryRunner()
