/**
 * Audio Manager — thin Howler.js wrapper.
 * Handles BGM (looping ambient tracks) and SFX (one-shots),
 * with volume control and mute state.
 */

import { Howl, Howler } from 'howler'
import { bus, Events } from './eventBus'

interface AudioTrack {
  howl: Howl
  key: string
}

class AudioManager {
  private bgm: AudioTrack | null = null
  private sfxPool: Map<string, Howl> = new Map()
  private _muted = false
  private _bgmVolume = 0.5
  private _sfxVolume = 0.8

  constructor() {
    bus.on<{ key: string; src: string }>(Events.AUDIO_AMBIENT, ({ key, src }) => {
      this.playBGM(key, src)
    })
    bus.on<{ key: string; src: string }>(Events.AUDIO_PLAY, ({ key, src }) => {
      this.playSFX(key, src)
    })
    bus.on(Events.AUDIO_STOP, () => {
      this.stopBGM()
    })
  }

  playBGM(key: string, src: string) {
    if (this.bgm?.key === key) return
    this.stopBGM()
    const howl = new Howl({
      src: [src],
      loop: true,
      volume: this._muted ? 0 : this._bgmVolume,
      html5: true,
    })
    howl.play()
    this.bgm = { howl, key }
  }

  stopBGM() {
    this.bgm?.howl.fade(this.bgm.howl.volume(), 0, 400)
    setTimeout(() => { this.bgm?.howl.stop(); this.bgm = null }, 450)
  }

  playSFX(key: string, src: string) {
    let howl = this.sfxPool.get(key)
    if (!howl) {
      howl = new Howl({ src: [src], volume: this._sfxVolume })
      this.sfxPool.set(key, howl)
    }
    howl.volume(this._muted ? 0 : this._sfxVolume)
    howl.play()
  }

  mute(muted: boolean) {
    this._muted = muted
    Howler.mute(muted)
  }

  setBGMVolume(v: number) {
    this._bgmVolume = Math.max(0, Math.min(1, v))
    this.bgm?.howl.volume(this._bgmVolume)
  }

  setSFXVolume(v: number) {
    this._sfxVolume = Math.max(0, Math.min(1, v))
  }
}

export const audio = new AudioManager()
