/**
 * Squad generation — creates a believable non-league squad for Calder Vale Town.
 * All names are fictional. Attributes reflect Tier 6 quality (average ~8/20).
 */

import { rng } from './rng'
import type { Player, Position, Morale } from '../types/game'

const FIRST_NAMES = [
  'James','Lee','Danny','Scott','Craig','Paul','Adam','Luke','Ryan','Mark',
  'Jamie','Karl','Dean','Liam','Nathan','Sean','Gary','Tony','Dave','Pete',
  'Jordan','Tyler','Bradley','Ellis','Reece','Ethan','Lewis','Jay','Kai','Callum',
]
const LAST_NAMES = [
  'Walsh','Birch','Hobson','Fletcher','Greenwood','Hardwick','Marsden','Sutton',
  'Booth','Clayton','Naylor','Ramsbottom','Ashton','Whittle','Heywood','Moss',
  'Hartley','Sharpe','Bottomley','Rawlinson','Firth','Lumb','Hopwood','Clegg',
]

const POSITIONS: Position[] = ['GK','CB','CB','LB','RB','DM','CM','CM','AM','RW','LW','ST','ST','DM','CB']

function randAttr(base: number, spread = 3): number {
  return Math.min(20, Math.max(1, Math.round(base + rng.int(-spread, spread))))
}

function generatePlayer(position: Position, tier: number): Player {
  const base = Math.max(4, 12 - tier)   // tier 6 → avg ~6, tier 1 → avg ~12
  const age = rng.int(17, 35)
  const potential = rng.int(base, Math.min(20, base + 6))
  const morale: Morale = rng.pick(['okay', 'okay', 'good', 'low'] as Morale[])

  const isGoalie = position === 'GK'
  const pace     = isGoalie ? randAttr(5) : randAttr(base)
  const shooting = isGoalie ? randAttr(3) : (position === 'ST' || position === 'AM' ? randAttr(base + 1) : randAttr(base - 1))
  const passing  = randAttr(base)
  const dribbling = isGoalie ? randAttr(4) : randAttr(base)
  const defending = (position === 'CB' || position === 'DM' || position === 'GK') ? randAttr(base + 2) : randAttr(base - 2)
  const physical  = randAttr(base)

  const firstName = rng.pick(FIRST_NAMES)
  const lastName  = rng.pick(LAST_NAMES)

  const wage = rng.int(60, 350)   // £/week — non-league scale

  return {
    id: `player_${crypto.randomUUID().slice(0,8)}`,
    name: `${firstName} ${lastName}`,
    age,
    nationality: 'English',
    position,
    preferredFoot: rng.pick(['left', 'right', 'right', 'right'] as const),
    pace,
    shooting,
    passing,
    dribbling,
    defending,
    physical,
    potential,
    morale,
    fitness: rng.int(70, 100),
    loyalty: rng.int(30, 80),
    wage,
    contractEnds: 2026 + rng.int(0, 2),
    transferValue: wage * 52 * rng.int(1, 3),
    relationshipWithManager: 'neutral',
    relationshipWithClub: rng.pick(['neutral', 'friendly', 'neutral']),
  }
}

export function generateSquad(tier: number = 6, size: number = 20): Player[] {
  const squad: Player[] = []
  const positionPool: Position[] = [...POSITIONS]
  rng.shuffle(positionPool)

  // Ensure at least 1 GK, 4 defenders, etc.
  const mandatory: Position[] = ['GK', 'CB', 'CB', 'LB', 'RB', 'DM', 'CM', 'CM', 'ST', 'RW', 'LW']
  for (const pos of mandatory) {
    squad.push(generatePlayer(pos, tier))
  }

  // Fill rest randomly
  while (squad.length < size) {
    const pos = rng.pick(POSITIONS)
    squad.push(generatePlayer(pos, tier))
  }

  return squad
}
