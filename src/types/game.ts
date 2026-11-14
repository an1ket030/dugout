/**
 * Core data types for The Dugout.
 * Single source of truth — all systems reference these interfaces.
 */

// ============================================================
// ENUMERATIONS
// ============================================================

export type ManagerOrigin = 'ex_player' | 'coach' | 'outsider'
export type Tier = 1 | 2 | 3 | 4 | 5 | 6   // Tier 6 = non-league start
export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'DM' | 'CM' | 'AM' | 'LW' | 'RW' | 'ST'
export type Foot = 'left' | 'right' | 'both'
export type Morale = 'ecstatic' | 'good' | 'okay' | 'low' | 'miserable'
export type Relationship = 'loyal' | 'friendly' | 'neutral' | 'tense' | 'hostile'
export type GamePhase = 'menu' | 'origin' | 'prologue' | 'hub' | 'match' | 'transfer' | 'cutscene' | 'team_talk' | 'press'
export type Season = number   // e.g. 2026
export type Week = number     // 1–46 within a season
export type Formation = '4-4-2' | '4-3-3' | '4-2-3-1' | '3-5-2' | '5-3-2'

export interface Tactics {
  mentality: 'defensive' | 'balanced' | 'attacking'
  pressing: number    // 0–10
  tempo: number       // 0–10
  width: number       // 0–10
}

// ============================================================
// MANAGER
// ============================================================

export interface Manager {
  id: string
  name: string
  origin: ManagerOrigin
  reputation: number          // 0–100, affects transfer & job market
  corruptionScore: number     // 0–100, tracks shadowy decisions
  tacticalRating: number      // 0–100
  motivationRating: number    // 0–100
  traits: string[]            // e.g. ['Press Resistant', 'Talker', 'Instinctive']
}

// ============================================================
// PLAYER
// ============================================================

export interface Player {
  id: string
  name: string
  age: number
  nationality: string
  position: Position
  preferredFoot: Foot

  // Core attributes (1–20)
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number

  // Hidden / narrative
  potential: number           // 1–20, only manager can see partially
  morale: Morale
  fitness: number             // 0–100
  loyalty: number             // 0–100

  // Contract
  wage: number                // weekly £
  contractEnds: Season
  transferValue: number       // £

  // Relationships
  relationshipWithManager: Relationship
  relationshipWithClub: Relationship
}

// ============================================================
// CLUB
// ============================================================

export interface Club {
  id: string
  name: string
  shortName: string
  city: string
  tier: Tier
  colours: { primary: string; secondary: string }

  // Finances
  budget: number              // transfer budget £
  wageBill: number            // weekly total £
  debtLevel: number           // 0–100

  // Facilities (1–5)
  trainingGrade: number
  stadiumCapacity: number
  youthAcademy: number

  // Board
  boardConfidence: number     // 0–100
  boardObjective: string      // e.g. 'Avoid relegation'
}

// ============================================================
// MATCH
// ============================================================

export interface MatchResult {
  homeClubId: string
  awayClubId: string
  homeGoals: number
  awayGoals: number
  events: MatchEvent[]
  rating: PlayerRatings
  attendance: number
}

export interface MatchEvent {
  minute: number
  type: 'goal' | 'red_card' | 'yellow_card' | 'injury' | 'sub' | 'penalty'
  playerId: string
  detail?: string
}

export type PlayerRatings = Record<string, number>  // playerId → 1–10

// ============================================================
// FIXTURE
// ============================================================

export interface Fixture {
  id: string
  season: Season
  week: Week
  homeClubId: string
  awayClubId: string
  competition: string
  result?: MatchResult
  played: boolean
}

// ============================================================
// NARRATIVE
// ============================================================

export interface StoryFlag {
  key: string
  value: boolean | number | string
}

export interface DialogueLine {
  speaker: string
  text: string
  portrait?: string
}

export interface Choice {
  id: string
  text: string
  consequence?: string   // human-readable hint
  corruptionGain?: number
  relationshipEffect?: Record<string, number>
}

// ============================================================
// GAME STATE (top-level save blob)
// ============================================================

export interface GameState {
  id: string              // save slot id
  created: number         // timestamp
  updated: number

  // Meta
  rngSeed: number
  rngState: [number, number, number, number]
  gamePhase: GamePhase

  // Current context
  currentSeason: Season
  currentWeek: Week
  currentClubId: string

  // Entities
  manager: Manager
  clubs: Record<string, Club>
  players: Record<string, Player>
  squad: string[]         // player ids for current club
  fixtures: Fixture[]

  // Story
  flags: Record<string, boolean | number | string>
  storyProgress: string   // ink knot name

  // History
  results: MatchResult[]
  leagueTable: LeagueRow[]
}

export interface LeagueRow {
  clubId: string
  played: number
  won: number
  drawn: number
  lost: number
  gf: number
  ga: number
  points: number
}
