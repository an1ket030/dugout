import { describe, it, expect } from 'vitest'
import { RNG, rng } from './rng'

describe('RNG — xoshiro128**', () => {
  it('produces same sequence for same seed', () => {
    const a = new RNG(42)
    const b = new RNG(42)
    for (let i = 0; i < 20; i++) {
      expect(a.float()).toBe(b.float())
    }
  })

  it('produces different sequence for different seeds', () => {
    const a = new RNG(1)
    const b = new RNG(2)
    const aVals = Array.from({ length: 10 }, () => a.float())
    const bVals = Array.from({ length: 10 }, () => b.float())
    expect(aVals).not.toEqual(bVals)
  })

  it('int() stays within bounds', () => {
    const r = new RNG(999)
    for (let i = 0; i < 1000; i++) {
      const v = r.int(1, 10)
      expect(v).toBeGreaterThanOrEqual(1)
      expect(v).toBeLessThanOrEqual(10)
    }
  })

  it('chance() approximate distribution', () => {
    const r = new RNG(7)
    let trues = 0
    for (let i = 0; i < 10000; i++) if (r.chance(0.3)) trues++
    expect(trues / 10000).toBeCloseTo(0.3, 1)
  })

  it('state serialise/restore gives same sequence', () => {
    const r = new RNG(123)
    r.float(); r.float()  // advance
    const snap = r.getState()
    const after = Array.from({ length: 5 }, () => r.float())
    r.setState(snap)
    const replay = Array.from({ length: 5 }, () => r.float())
    expect(after).toEqual(replay)
  })

  it('singleton rng works after seed', () => {
    rng.seed(55555)
    const a = rng.float()
    rng.seed(55555)
    const b = rng.float()
    expect(a).toBe(b)
  })
})
