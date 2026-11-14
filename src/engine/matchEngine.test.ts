import { describe, it, expect } from 'vitest'
import { simulateMatch, MatchTeam } from './matchEngine'
import { generateSquad } from './squadGen'
import { rng } from './rng'
import type { Club } from '../types/game'

const testClubA: Club = {
  id: 'calder_vale',
  name: 'Calder Vale Town FC',
  shortName: 'Calder Vale',
  city: 'Calder Vale',
  tier: 6,
  colours: { primary: '#1a3a1a', secondary: '#c8842a' },
  budget: 8000,
  wageBill: 3200,
  debtLevel: 70,
  trainingGrade: 1,
  stadiumCapacity: 1200,
  youthAcademy: 1,
  boardConfidence: 50,
  boardObjective: 'Avoid relegation',
}

const testClubB: Club = {
  id: 'brierfield',
  name: 'Brierfield FC',
  shortName: 'Brierfield',
  city: 'Brierfield',
  tier: 6,
  colours: { primary: '#1a202c', secondary: '#718096' },
  budget: 9000,
  wageBill: 3400,
  debtLevel: 60,
  trainingGrade: 1,
  stadiumCapacity: 1500,
  youthAcademy: 1,
  boardConfidence: 50,
  boardObjective: 'Mid-table finish',
}

describe('Match Engine', () => {
  it('simulates a match and returns valid result structure', async () => {
    rng.seed(12345)
    const squadA = generateSquad(6, 16)
    const squadB = generateSquad(6, 16)

    const homeTeam: MatchTeam = {
      club: testClubA,
      squad: squadA,
      formation: '4-4-2',
      tactics: { mentality: 'balanced', pressing: 5, tempo: 5, width: 5 },
    }

    const awayTeam: MatchTeam = {
      club: testClubB,
      squad: squadB,
      formation: '4-4-2',
      tactics: { mentality: 'defensive', pressing: 4, tempo: 4, width: 5 },
    }

    const result = await simulateMatch(homeTeam, awayTeam, false)

    expect(result).toBeDefined()
    expect(result.homeClubId).toBe('calder_vale')
    expect(result.awayClubId).toBe('brierfield')
    expect(result.homeGoals).toBeGreaterThanOrEqual(0)
    expect(result.awayGoals).toBeGreaterThanOrEqual(0)
    expect(result.attendance).toBeGreaterThanOrEqual(300)
    expect(result.attendance).toBeLessThanOrEqual(1200)
    expect(Object.keys(result.rating).length).toBeGreaterThanOrEqual(22)
  })

  it('is deterministic when seeded with the same RNG seed', async () => {
    const runSim = async (seed: number) => {
      rng.seed(seed)
      const squadA = generateSquad(6, 16)
      const squadB = generateSquad(6, 16)
      const homeTeam: MatchTeam = {
        club: testClubA,
        squad: squadA,
        formation: '4-4-2',
        tactics: { mentality: 'attacking', pressing: 7, tempo: 6, width: 5 },
      }
      const awayTeam: MatchTeam = {
        club: testClubB,
        squad: squadB,
        formation: '4-3-3',
        tactics: { mentality: 'balanced', pressing: 5, tempo: 5, width: 5 },
      }
      return await simulateMatch(homeTeam, awayTeam, false)
    }

    const res1 = await runSim(9999)
    const res2 = await runSim(9999)

    expect(res1.homeGoals).toBe(res2.homeGoals)
    expect(res1.awayGoals).toBe(res2.awayGoals)
    expect(res1.events.length).toBe(res2.events.length)
    expect(res1.attendance).toBe(res2.attendance)
  })
})
