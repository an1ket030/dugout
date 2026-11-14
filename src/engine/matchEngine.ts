/**
 * Match Engine — simulates a 90-minute football match.
 *
 * Design principles:
 *  - Fully deterministic given the same RNG state and inputs
 *  - No Phaser dependency — pure TypeScript, runs headless for tests
 *  - Emits events on the bus so Phaser / React can visualise in real-time
 *  - Results feel explainable: better team wins more often, but upsets happen
 */

import { rng } from './rng'
import { bus, Events } from './eventBus'
import type { Player, Club, MatchResult, MatchEvent, PlayerRatings, Formation, Tactics } from '../types/game'

// ============================================================
// TYPES
// ============================================================

export interface MatchTeam {
  club: Club
  squad: Player[]          // 11 starters + subs
  formation: Formation
  tactics: Tactics
}

interface MatchMoment {
  minute: number
  attackTeam: 'home' | 'away'
  chance: number      // 0–1 probability attack turns to goal
}

// ============================================================
// ATTRIBUTE AGGREGATION
// ============================================================

function teamStrength(team: MatchTeam): number {
  const starters = team.squad.slice(0, 11)
  if (starters.length === 0) return 30

  const avg = starters.reduce((sum, p) => {
    const overall = (p.pace + p.shooting + p.passing + p.dribbling + p.defending + p.physical) / 6
    const fitnessMod = p.fitness / 100
    const moraleMod = { ecstatic: 1.1, good: 1.05, okay: 1.0, low: 0.92, miserable: 0.84 }[p.morale]
    return sum + overall * fitnessMod * moraleMod
  }, 0) / starters.length

  // Tactics modifier
  const tacticBonus = {
    defensive: team.tactics.mentality === 'defensive' ? 1.05 : 1.0,
    balanced: 1.0,
    attacking: team.tactics.mentality === 'attacking' ? 1.05 : 1.0,
  }[team.tactics.mentality]

  return avg * tacticBonus
}

// ============================================================
// MATCH SIMULATION
// ============================================================

export async function simulateMatch(
  home: MatchTeam,
  away: MatchTeam,
  live = false   // if true, emits events with delays for visualisation
): Promise<MatchResult> {
  const homeStr = teamStrength(home)
  const awayStr = teamStrength(away)
  const total = homeStr + awayStr || 1
  const homeAdvantage = 1.08  // home ground bonus

  const homePossession = (homeStr * homeAdvantage) / (homeStr * homeAdvantage + awayStr)

  bus.emit(Events.MATCH_START, { home: home.club.id, away: away.club.id })

  const events: MatchEvent[] = []
  const ratings: PlayerRatings = {}

  // Initialise ratings for all starters
  for (const p of [...home.squad.slice(0, 11), ...away.squad.slice(0, 11)]) {
    ratings[p.id] = 6.0
  }

  let homeGoals = 0
  let awayGoals = 0

  // Generate match moments — roughly 20–30 meaningful chances per game
  const totalMoments = rng.int(18, 28)
  const moments: MatchMoment[] = []

  for (let i = 0; i < totalMoments; i++) {
    const minute = rng.int(1, 90)
    const isHome = rng.chance(homePossession)
    const attackStr = isHome ? homeStr : awayStr
    const defendStr = isHome ? awayStr : homeStr
    const chanceQuality = attackStr / (attackStr + defendStr * 0.9)
    moments.push({ minute, attackTeam: isHome ? 'home' : 'away', chance: chanceQuality * 0.4 })
  }
  moments.sort((a, b) => a.minute - b.minute)

  for (const moment of moments) {
    if (live) await delay(80)

    if (rng.chance(moment.chance)) {
      // GOAL
      const isHome = moment.attackTeam === 'home'
      const scoringTeam = isHome ? home : away
      const scorer = rng.pick(scoringTeam.squad.slice(0, 11).filter(p =>
        ['ST', 'RW', 'LW', 'AM'].includes(p.position)
      ) || scoringTeam.squad.slice(0, 11))

      if (isHome) homeGoals++; else awayGoals++

      const event: MatchEvent = {
        minute: moment.minute,
        type: 'goal',
        playerId: scorer.id,
        detail: `${scorer.name} scores for ${scoringTeam.club.shortName}!`,
      }
      events.push(event)
      ratings[scorer.id] = Math.min(10, (ratings[scorer.id] ?? 6) + 1.5)
      bus.emit(Events.MATCH_GOAL, { event, homeGoals, awayGoals })

    } else if (rng.chance(0.03)) {
      // YELLOW CARD
      const foulingTeam = moment.attackTeam === 'home' ? away : home
      const fouler = rng.pick(foulingTeam.squad.slice(0, 11))
      const event: MatchEvent = {
        minute: moment.minute,
        type: 'yellow_card',
        playerId: fouler.id,
      }
      events.push(event)
      ratings[fouler.id] = Math.max(1, (ratings[fouler.id] ?? 6) - 0.5)
      bus.emit(Events.MATCH_EVENT, { event })

    } else if (rng.chance(0.004)) {
      // INJURY
      const injuredTeam = moment.attackTeam === 'home' ? home : away
      const injured = rng.pick(injuredTeam.squad.slice(0, 11))
      const event: MatchEvent = {
        minute: moment.minute,
        type: 'injury',
        playerId: injured.id,
      }
      events.push(event)
      bus.emit(Events.PLAYER_INJURED, { playerId: injured.id, minute: moment.minute })
      bus.emit(Events.MATCH_EVENT, { event })
    }

    if (moment.minute === 45 && live) {
      bus.emit(Events.MATCH_HALFTIME, { homeGoals, awayGoals })
      await delay(500)
    }
  }

  // Final ratings adjustment
  for (const p of home.squad.slice(0, 11)) {
    ratings[p.id] = Math.round(Math.min(10, Math.max(1,
      (ratings[p.id] ?? 6) + (homeGoals - awayGoals) * 0.1 + rng.float() * 0.4 - 0.2
    )) * 10) / 10
  }
  for (const p of away.squad.slice(0, 11)) {
    ratings[p.id] = Math.round(Math.min(10, Math.max(1,
      (ratings[p.id] ?? 6) + (awayGoals - homeGoals) * 0.1 + rng.float() * 0.4 - 0.2
    )) * 10) / 10
  }

  const result: MatchResult = {
    homeClubId: home.club.id,
    awayClubId: away.club.id,
    homeGoals,
    awayGoals,
    events,
    rating: ratings,
    attendance: rng.int(
      Math.floor(home.club.stadiumCapacity * 0.3),
      home.club.stadiumCapacity,
    ),
  }

  bus.emit(Events.MATCH_END, result)
  return result
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
