/**
 * Procedural Web Audio Sound Synthesizer.
 * Generates tactile graphic novel SFX (typewriter, paper, stamp, rain rumble)
 * directly in the browser with zero external audio assets required.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null
  private ambientNoiseNode: AudioNode | null = null
  private isMuted = false

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  // Typewriter keystroke tick
  typewriterTick() {
    if (this.isMuted) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const filter = this.ctx.createBiquadFilter()

      filter.type = 'bandpass'
      filter.frequency.value = 1800 + Math.random() * 400
      filter.Q.value = 3

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(800 + Math.random() * 300, this.ctx.currentTime)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Paper dossier rustle / folder flip
  paperRustle() {
    if (this.isMuted) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const bufferSize = this.ctx.sampleRate * 0.1
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const noise = this.ctx.createBufferSource()
      noise.buffer = buffer

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 900
      filter.Q.value = 1.2

      const gain = this.ctx.createGain()
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(this.ctx.destination)

      noise.start()
    } catch {}
  }

  // Stamp slam on major decision
  stampSlam() {
    if (this.isMuted) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(140, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.22)
    } catch {}
  }

  // Referee whistle
  refereeWhistle() {
    if (this.isMuted) return
    try {
      this.initCtx()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(2600, this.ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(2800, this.ctx.currentTime + 0.12)
      osc.frequency.linearRampToValueAtTime(2500, this.ctx.currentTime + 0.25)

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.32)
    } catch {}
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  getMuted(): boolean {
    return this.isMuted
  }
}

export const sfx = new SoundSynthesizer()
