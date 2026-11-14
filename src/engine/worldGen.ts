/**
 * World Generation — creates the initial league structure, clubs, squads,
 * and standings for the beginning of Act I.
 *
 * Setting: Calder Vale Town is 19th in the Northern Counties East League (Tier 6).
 * They have 11 points from 18 games, 11 games without a win.
 */

import { rng } from './rng'
import { generateSquad } from './squadGen'
import type { Club, Player, LeagueRow, Fixture, GameState, Manager } from '../types/game'

export const STARTING_CLUBS: Club[] = [
  {
    id: 'calder_vale',
    name: 'Calder Vale Town FC',
    shortName: 'Calder Vale',
    city: 'Calder Vale, Lancashire',
    tier: 6,
    colours: { primary: '#1a3a1a', secondary: '#c8842a' },
    budget: 8500,
    wageBill: 3100,
    debtLevel: 72,
    trainingGrade: 1,
    stadiumCapacity: 1250,
    youthAcademy: 1,
    boardConfidence: 45,
    boardObjective: 'Avoid relegation and keep the club afloat',
  },
  {
    id: 'brierfield',
    name: 'Brierfield FC',
    shortName: 'Brierfield',
    city: 'Brierfield, Lancashire',
    tier: 6,
    colours: { primary: '#2d3748', secondary: '#cbd5e0' },
    budget: 12000,
    wageBill: 3400,
    debtLevel: 45,
    trainingGrade: 1,
    stadiumCapacity: 1600,
    youthAcademy: 1,
    boardConfidence: 65,
    boardObjective: 'Mid-table finish',
  },
  {
    id: 'clitheroe_ath',
    name: 'Clitheroe Athletic',
    shortName: 'Clitheroe',
    city: 'Clitheroe, Lancashire',
    tier: 6,
    colours: { primary: '#1e3a8a', secondary: '#93c5fd' },
    budget: 22000,
    wageBill: 5200,
    debtLevel: 25,
    trainingGrade: 2,
    stadiumCapacity: 2400,
    youthAcademy: 2,
    boardConfidence: 80,
    boardObjective: 'Promotion candidates',
  },
  {
    id: 'colne_valley',
    name: 'Colne Valley United',
    shortName: 'Colne Valley',
    city: 'Colne, Lancashire',
    tier: 6,
    colours: { primary: '#7f1d1d', secondary: '#fca5a5' },
    budget: 14000,
    wageBill: 3800,
    debtLevel: 50,
    trainingGrade: 1,
    stadiumCapacity: 1800,
    youthAcademy: 1,
    boardConfidence: 60,
    boardObjective: 'Top 6 finish',
  },
  {
    id: 'bacup_utd',
    name: 'Bacup United',
    shortName: 'Bacup',
    city: 'Bacup, Lancashire',
    tier: 6,
    colours: { primary: '#14532d', secondary: '#86efac' },
    budget: 11000,
    wageBill: 3300,
    debtLevel: 60,
    trainingGrade: 1,
    stadiumCapacity: 1400,
    youthAcademy: 1,
    boardConfidence: 55,
    boardObjective: 'Avoid relegation battle',
  },
  {
    id: 'todmorden_rov',
    name: 'Todmorden Rovers',
    shortName: 'Todmorden',
    city: 'Todmorden, West Yorkshire',
    tier: 6,
    colours: { primary: '#312e81', secondary: '#a5b4fc' },
    budget: 16000,
    wageBill: 4100,
    debtLevel: 40,
    trainingGrade: 2,
    stadiumCapacity: 2000,
    youthAcademy: 1,
    boardConfidence: 70,
    boardObjective: 'Playoff spot',
  },
  {
    id: 'padiham_celtic',
    name: 'Padiham Celtic',
    shortName: 'Padiham',
    city: 'Padiham, Lancashire',
    tier: 6,
    colours: { primary: '#064e3b', secondary: '#fef08a' },
    budget: 10500,
    wageBill: 3200,
    debtLevel: 68,
    trainingGrade: 1,
    stadiumCapacity: 1100,
    youthAcademy: 1,
    boardConfidence: 50,
    boardObjective: 'Survival',
  },
  {
    id: 'darwen_rangers',
    name: 'Darwen Rangers',
    shortName: 'Darwen',
    city: 'Darwen, Lancashire',
    tier: 6,
    colours: { primary: '#831843', secondary: '#fbcfe8' },
    budget: 15000,
    wageBill: 4000,
    debtLevel: 35,
    trainingGrade: 1,
    stadiumCapacity: 1900,
    youthAcademy: 1,
    boardConfidence: 65,
    boardObjective: 'Mid-table',
  },
  {
    id: 'rossendale',
    name: 'Rossendale Valley',
    shortName: 'Rossendale',
    city: 'Haslingden, Lancashire',
    tier: 6,
    colours: { primary: '#78350f', secondary: '#fde68a' },
    budget: 9000,
    wageBill: 2900,
    debtLevel: 75,
    trainingGrade: 1,
    stadiumCapacity: 950,
    youthAcademy: 1,
    boardConfidence: 40,
    boardObjective: 'Survival',
  },
  {
    id: 'nelson_fc',
    name: 'Nelson Town',
    shortName: 'Nelson',
    city: 'Nelson, Lancashire',
    tier: 6,
    colours: { primary: '#1e293b', secondary: '#38bdf8' },
    budget: 18000,
    wageBill: 4500,
    debtLevel: 30,
    trainingGrade: 2,
    stadiumCapacity: 2100,
    youthAcademy: 2,
    boardConfidence: 75,
    boardObjective: 'Promotion battle',
  },
  {
    id: 'barnoldswick',
    name: 'Barnoldswick Park',
    shortName: 'Barnoldswick',
    city: 'Barnoldswick, Lancashire',
    tier: 6,
    colours: { primary: '#4c1d95', secondary: '#e9d5ff' },
    budget: 13500,
    wageBill: 3700,
    debtLevel: 48,
    trainingGrade: 1,
    stadiumCapacity: 1500,
    youthAcademy: 1,
    boardConfidence: 60,
    boardObjective: 'Top half',
  },
  {
    id: 'great_harwood',
    name: 'Great Harwood FC',
    shortName: 'Harwood',
    city: 'Great Harwood, Lancashire',
    tier: 6,
    colours: { primary: '#701a75', secondary: '#f5d0fe' },
    budget: 8000,
    wageBill: 2800,
    debtLevel: 80,
    trainingGrade: 1,
    stadiumCapacity: 1000,
    youthAcademy: 1,
    boardConfidence: 35,
    boardObjective: 'Keep club alive (20th)',
  },
]

export function createInitialGameState(manager: Manager, seed: number): GameState {
  rng.seed(seed)

  // Map of clubs
  const clubsRecord: Record<string, Club> = {}
  STARTING_CLUBS.forEach(c => { clubsRecord[c.id] = c })

  // Generate squad for Calder Vale (the player's team)
  const calderSquad = generateSquad(6, 20)
  const allPlayersRecord: Record<string, Player> = {}
  calderSquad.forEach(p => { allPlayersRecord[p.id] = p })

  // Generate squads for opponents (smaller squads for simulation)
  STARTING_CLUBS.filter(c => c.id !== 'calder_vale').forEach(c => {
    const oppSquad = generateSquad(6, 15)
    oppSquad.forEach(p => { allPlayersRecord[p.id] = p })
  })

  // Starting League Table: 18 matches played
  // Calder Vale in 19th place (simulated with 12 teams, let's rank 11th out of 12 or 20)
  const leagueTable: LeagueRow[] = [
    { clubId: 'clitheroe_ath', played: 18, won: 13, drawn: 3, lost: 2, gf: 38, ga: 14, points: 42 },
    { clubId: 'nelson_fc',     played: 18, won: 11, drawn: 4, lost: 3, gf: 32, ga: 18, points: 37 },
    { clubId: 'todmorden_rov', played: 18, won: 10, drawn: 5, lost: 3, gf: 29, ga: 19, points: 35 },
    { clubId: 'colne_valley',  played: 18, won: 9,  drawn: 4, lost: 5, gf: 28, ga: 22, points: 31 },
    { clubId: 'darwen_rangers',played: 18, won: 8,  drawn: 5, lost: 5, gf: 24, ga: 20, points: 29 },
    { clubId: 'barnoldswick',  played: 18, won: 7,  drawn: 4, lost: 7, gf: 22, ga: 24, points: 25 },
    { clubId: 'brierfield',    played: 18, won: 6,  drawn: 5, lost: 7, gf: 20, ga: 23, points: 23 },
    { clubId: 'bacup_utd',     played: 18, won: 5,  drawn: 6, lost: 7, gf: 18, ga: 24, points: 21 },
    { clubId: 'padiham_celtic',played: 18, won: 4,  drawn: 5, lost: 9, gf: 17, ga: 28, points: 17 },
    { clubId: 'rossendale',    played: 18, won: 3,  drawn: 6, lost: 9, gf: 15, ga: 29, points: 15 },
    { clubId: 'calder_vale',   played: 18, won: 2,  drawn: 5, lost: 11, gf: 13, ga: 31, points: 11 }, // 11th - Relegation spot!
    { clubId: 'great_harwood', played: 18, won: 1,  drawn: 4, lost: 13, gf: 10, ga: 37, points: 7 },  // 12th
  ]

  // Upcoming fixtures (weeks 19 through 26)
  const opponents = STARTING_CLUBS.filter(c => c.id !== 'calder_vale').map(c => c.id)
  rng.shuffle(opponents)

  const fixtures: Fixture[] = []
  for (let w = 19; w <= 26; w++) {
    const oppId = opponents[(w - 19) % opponents.length]
    const isHome = w % 2 === 1
    fixtures.push({
      id: `fix_w${w}`,
      season: 2026,
      week: w,
      homeClubId: isHome ? 'calder_vale' : oppId,
      awayClubId: isHome ? oppId : 'calder_vale',
      competition: 'Northern Counties East League',
      played: false,
    })
  }

  return {
    id: crypto.randomUUID(),
    created: Date.now(),
    updated: Date.now(),
    rngSeed: seed,
    rngState: rng.getState(),
    gamePhase: 'prologue',
    currentSeason: 2026,
    currentWeek: 19, // Manager arrives mid-season in crisis!
    currentClubId: 'calder_vale',
    manager,
    clubs: clubsRecord,
    players: allPlayersRecord,
    squad: calderSquad.map(p => p.id),
    fixtures,
    flags: {
      origin: manager.origin,
      nameSet: true,
      eddieTrust: 50,
      boardTrust: 45,
      fanSentiment: 25,
      firstMatchPlayed: false,
    },
    storyProgress: 'act1_arrival',
    results: [],
    leagueTable,
  }
}
