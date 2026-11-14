/**
 * xoshiro128** — fast, seedable PRNG
 * Deterministic: same seed always produces same sequence.
 * Used throughout simulation core for reproducible match results.
 */

type State = [number, number, number, number]

function rotl(x: number, k: number): number {
  return (x << k) | (x >>> (32 - k))
}

export class RNG {
  private s: State

  constructor(seed: number) {
    // SplitMix32 to initialise state from a single integer seed
    let h = seed | 0
    const sm = () => {
      h = (h + 0x9e3779b9) | 0
      let v = h
      v = Math.imul(v ^ (v >>> 16), 0x85ebca6b)
      v = Math.imul(v ^ (v >>> 13), 0xc2b2ae35)
      return (v ^ (v >>> 16)) >>> 0
    }
    this.s = [sm(), sm(), sm(), sm()]
  }

  /** Returns a random uint32 */
  next(): number {
    const [s0, s1, s2, s3] = this.s
    const result = (Math.imul(rotl(Math.imul(s1, 5), 7), 9)) >>> 0
    const t = (s1 << 9) >>> 0
    this.s[2] = (s2 ^ s0) >>> 0
    this.s[3] = (s3 ^ s1) >>> 0
    this.s[1] = (s1 ^ s2) >>> 0
    this.s[0] = (s0 ^ s3) >>> 0
    this.s[2] = (this.s[2] ^ t) >>> 0
    this.s[3] = rotl(s3, 11)
    return result
  }

  /** Returns a float in [0, 1) */
  float(): number {
    return this.next() / 0x100000000
  }

  /** Returns an integer in [min, max] inclusive */
  int(min: number, max: number): number {
    return Math.floor(this.float() * (max - min + 1)) + min
  }

  /** Returns true with given probability (0–1) */
  chance(p: number): boolean {
    return this.float() < p
  }

  /** Picks a random element from an array */
  pick<T>(arr: T[]): T {
    return arr[this.int(0, arr.length - 1)]
  }

  /** Shuffles array in-place using Fisher-Yates */
  shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.int(0, i)
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  /** Serialise state for save/load */
  getState(): State {
    return [...this.s] as State
  }

  /** Restore state from serialised form */
  setState(state: State): void {
    this.s = [...state] as State
  }
}

/** Singleton seeded from current date — replaced on new game / save load */
let _globalRng: RNG = new RNG(Date.now() & 0xffffffff)

export const rng = {
  seed(seed: number) { _globalRng = new RNG(seed) },
  float: () => _globalRng.float(),
  int: (min: number, max: number) => _globalRng.int(min, max),
  chance: (p: number) => _globalRng.chance(p),
  pick: <T>(arr: T[]) => _globalRng.pick(arr),
  shuffle: <T>(arr: T[]) => _globalRng.shuffle(arr),
  getState: () => _globalRng.getState(),
  setState: (s: State) => _globalRng.setState(s),
}
