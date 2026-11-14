# Product Requirements Document: The Dugout
**Document version:** 2.0 (Detailed)
**Date:** 14 November 2026
**Genre:** Story-driven football management visual novel
**Platform:** Web (desktop and mobile browsers)
**Status:** Pre-production ready for phased implementation

---

## 1. Executive Summary

**The Dugout** is a browser-based football management game told as a branching visual novel. The player takes the role of a first-time manager, an outsider with no connections, handed an impossible job at a dying non-league club in Lancashire. From there, the player works their way up through the English football pyramid and, eventually, into European football.

This is not a spreadsheet game. Every management system exists to produce dramatic moments. A bad transfer window should feel like a betrayal. A title win should feel like a miracle you engineered.

**What sets it apart:**
- Failure continues the story. Being sacked opens a new chapter, not a game-over screen.
- Relationships matter more than stats. Trust and loyalty are earned through dialogue and decisions.
- The rags-to-riches climb is fragile. Progress can be lost. Momentum is real.
- Runs instantly in a browser, no install, no wait.

**The long secret threading through every act:** Eddie Marlowe, the club kit man and the player first mentor, was framed for a match-fixing scandal 25 years ago. The person who actually fixed the match is now a powerful figure in football. Depending on the player choices, he becomes patron, rival, enemy or mirror.

---

## 2. Vision, Goals and Design Pillars

### 2.1 Vision Statement

A management game where the player feels the weight of the job and the pride of surviving it. Every session should end with the player thinking about the next chapter, not a table of numbers.

### 2.2 Product Goals

| ID | Goal | Success Indicator |
|---|---|---|
| G1 | Deliver a cinematic, emotionally intense rags-to-riches story | Prologue completion rate > 80% |
| G2 | Make management decisions have real, visible consequences | Player-reported choices matter score |
| G3 | Balance accessibility for casual and depth for hardcore players | Both difficulty tiers retain users through Act I |
| G4 | Failure produces new story, not a reload | Sacking-to-continuation rate > 70% |
| G5 | Reward replay through multiple origins, branches and endings | Average playthroughs per user > 1.5 |
| G6 | Run smoothly in a browser with fast load times | First load under 3s on 4G |
| G7 | Buildable by a small team through modular systems | Each system independently testable |

### 2.3 Design Pillars

1. Story first, management second. Every system exists to generate dramatic moments.
2. Every choice leaves a scar or a medal. Decisions have visible, long-term consequences.
3. Rags to riches, but earned. Progress is fragile and can be lost.
4. Small screen, big emotion. Each session of 10 to 20 minutes ends on a hook.
5. Never random, always readable. Results must feel explainable. A loss teaches, it does not punish.

### 2.4 Core Fantasy

The player is not a billionaire owner or a famous former player. The player is an outsider with no connections, and every door that opens is one they forced open.

---

## 3. Target Audience

### 3.1 Primary Audience
Players aged 16 to 35 who enjoy football and narrative games, want more emotional depth from management games, or want more systems from visual novels.

### 3.2 Player Motivations
| Motivation | How the game serves it |
|---|---|
| Underdog fantasy | The whole arc is rags-to-riches |
| Proving tactical skill | Tactics have real, legible outcomes |
| Seeing choices matter | Hidden variables surface visibly in character reactions |
| Exploration and replay | Multiple origins, branches, endings |
| Emotional story investment | Character arcs, betrayals, redemptions |

---

## 4. World and Setting

### 4.1 Licensing Approach
Real leagues, real cities, real competition formats. All clubs, players, staff and journalists are fictional.

### 4.2 English Football Pyramid

| Level | Tone |
|---|---|
| Step 6 | Survival. Volunteers. Mud and cold. |
| Step 5 | First signs of ambition. |
| National League N/S | Media notices. Rivalry starts. |
| National League | Full-time football. First big decision. |
| League Two | Contracts, agents, board politics. |
| League One | Cup giant-killings. Corruption surfaces. |
| Championship | National pressure. High stakes. |
| Premier League | Cinematic. Global. Everything on the line. |
| Europe | Legacy. Continent. Resolution. |

### 4.3 Starting Club: Calder Vale Town
Location: Lancashire (fictional mill-town)
Tier: Step 6
Status: Weeks from folding. No money. Volunteer staff. Previous manager quit mid-season.

### 4.4 European Expansion
Phase 4 of development: Portugal and the Netherlands.
Post-launch: Germany, Italy or Spain based on player demand.

---

## 5. Story Architecture

### 5.1 Five-Act Structure

#### Act I: The Last Season (Steps 6 to 5, non-league)
Tone: Survival drama. Gritty, human, cold.
Goal: Keep the club alive through the season.

Key beats:
1. First team talk - tutorial moment, establishes man-management
2. First financial crisis - establishes budget system
3. The cup upset against a full-time side - first miracle moment
4. Discovery of The Wonderkid, a 16-year-old local lad with hidden potential
5. First moral choice: cut corners, accept a dodgy payment, or refuse and suffer
6. Eddie first secret hint, a throwaway line that plants the long secret

Cliffhanger: A rival bid for the club ground, or a shock promotion to Step 5.

#### Act II: The Climb (National League N/S to National League)
Tone: Momentum. Media attention. First taste of ambition.
Goal: Establish the club in semi-pro football.

Key beats:
1. First press conference, Priya Nair appears
2. Damian Voss introduced as a rival manager
3. First real transfer window with agents, fees, negotiations
4. The Wonderkid first senior start
5. The board begins expecting results, not just survival
6. The First Betrayal: someone trusted sells the player out

Cliffhanger: A defining cup draw or a shock sacking threat.

#### Act III: The Fight (League Two to League One)
Tone: Political. Corrupt. High pressure. First real danger.
Goal: Establish the manager as a force in professional football.

Key beats:
1. Giant-killing cup run vs. a Premier League side
2. First bribe or favor offered
3. First serious sacking threat
4. Eddie past begins to surface
5. Lucian Ferrante becomes genuinely dangerous
6. The Wonderkid faces a contract crisis or a transfer approach

Cliffhanger: A defining choice between club loyalty and personal ambition.

#### Act IV: The Summit (Championship to Premier League)
Tone: Cinematic. Enormous. Everything on the line.
Goal: Win promotion to the Premier League and survive at the top.

Key beats:
1. Promotion on the final day
2. Huge transfers
3. Global media attention
4. The truth about the fixed match is fully revealed
5. Voss true role in the conspiracy becomes clear
6. The Defining Choice: expose, bury or use the secret

#### Act V: The Continent (Europe)
Tone: Legacy. Exhaustion. Resolution.
Goal: Win something that lasts. Finish the story.

Key beats:
1. European competition with foreign cultures and language barriers
2. Final confrontation with the figure behind Eddie scandal
3. Voss rivalry resolved
4. The Wonderkid story concludes
5. Ending scene determined by legacy score, integrity track, relationships and trophies

### 5.2 Five Endings

| Ending | Requirements | Summary |
|---|---|---|
| The Legend | High integrity + trophy + Eddie vindicated | Win everything, expose the truth, leave a legacy |
| The Survivor | Low trophy count + high loyalty + walked away | Built something lasting at a small club |
| The Kingmaker | Used the secret for power | Became what you once fought |
| The Ghost | Low integrity + lost everything | Remembered only by the few who mattered |
| The Redemption | Eddie vindicated + personal sacrifice | Restored his name at a personal cost |

---

## 6. Characters

### The Manager (Player Character)
Fully named and customised in prologue. Three origins shape early stats and dialogue options. Identity evolves through play across five axes: Idealist, Pragmatist, Ruthless Winner, Players Man, Mastermind. Identity is hidden and emerges from decisions.

### Eddie Marlowe - Mentor
Role: Club kit man, first ally, keeper of the long secret.
Personality: Warm, funny, quietly haunted.
Arc: Trusted mentor to revealed victim to vindication or tragedy.

### Damian Voss - Rival
Role: A rival manager who started at the same level.
Personality: Ambitious, charming, morally flexible.
Arc: Keeps appearing at every tier, making the choices the player refused. Never a cartoon villain.

### Priya Nair - Journalist
Role: Press contact, rising with the player.
Arc: Local paper to national outlet to potential expose or loyal ally.

### Maya Okafor - Assistant Manager
Role: First coaching hire, witness to everything.
Arc: Most loyal ally to potential critic to possible successor.
Key moment: If the player makes a decision Maya finds unforgivable, she leaves. This is one of the most impactful events in the game.

### Harold Kettering - First Owner
Role: Local businessman keeping the club alive.
Arc: Generous backer to demanding board member to potential obstacle or champion.

### Jonah Reyes - Club Captain
Arc: Runs the entire game from bottom league through to retirement.
Outcomes: Legend, Rebel, or Cautionary Tale.

### The Wonderkid
Role: 16-year-old discovered in Act I.
Arc: Mirrors the player climb. His fate depends on how he is treated.

### Lucian Ferrante - Agent and Fixer
Role: Appears every transfer window with a helpful offer.
Arc: Annoying middleman to genuinely dangerous to potentially the key to the corruption arc.

### Character Design Rules
1. Recurring characters evolve. A player from Act I can return as a pundit or board member in Act III.
2. Hidden variables, visible reactions. The player never sees Trust numbers but sees how characters speak.
3. No character is purely supportive. Every ally has their own agenda.
4. Return appearances must feel earned and reference what happened between them.

---

## 7. Narrative Engine

### 7.1 Spine-and-Ribs Structure

The Spine: Five major events that always occur regardless of path:
1. The inciting situation: Calder Vale, broke, desperate
2. The first betrayal: always happens, who and how varies
3. The cup giant-killing: always attempted, outcome varies
4. The revelation of Eddie secret: always revealed, player response varies
5. The final confrontation: always occurs, who it is with varies by path

The Ribs: Branching content that changes who is present, what they know, what relationships exist.

### 7.2 Hidden Variables

| Variable | Scope | Meaning |
|---|---|---|
| Trust | Per character + global | Belief that the manager is honest |
| Respect | Per character + global | Belief in the manager competence |
| Fear | Per character | How intimidating the manager is perceived |
| Loyalty | Per character | Commitment to the manager personally |
| Ego | Per character | A character pride that can clash with the manager |
| Reputation | Global | Public standing of the manager |
| Integrity | Global | The manager moral track record |

### 7.3 Manager Identity System

| Identity | Description | Unlocks |
|---|---|---|
| Idealist | Principled, believes in the right way | Loyalty bonuses, Eddie trust, fan support |
| Pragmatist | Does what works, morally flexible | Voss dialogue options, board trust |
| Ruthless Winner | Win at any cost | Transfer intimidation options, Ferrante deals |
| Players Man | Lives for the dressing room | Morale bonuses, Jonah arc |
| Mastermind | Tactical and analytical obsessive | Tactical depth options, Analyst origin bonuses |

### 7.4 Choice Types

| Type | Description |
|---|---|
| Dialogue | Select words in a conversation |
| Moral | A values decision with long-term consequence |
| Tactical | A decision about how to play |
| Financial | Resource allocation decision |
| Timed pressure | Decision under a countdown |
| Silence | Choosing not to act |

### 7.5 Butterfly Effect Mechanics

Selected early choices pay off two to three acts later.

| Early choice | Later consequence |
|---|---|
| Promised a youth player a debut | Player remembers in Act III: trust or resentment |
| Covered for a player behaviour | He either repays loyalty or betrays it |
| Refused Ferrante first deal | He respects you enough to offer a real deal later |
| Trusted Priya with a story | She protects you when you need it most |

### 7.6 Soft Fail States

| Failure | Redirect |
|---|---|
| Club folds | A new club is offered immediately |
| Sacked for results | A European club with a rebuild challenge |
| Sacked for scandal | A morally grey club with a shady owner |
| Stood up to the board | Fan-owned or principled club |
| Burnout | Quiet arc with personal storylines |

---

## 8. Management Systems

### 8.1 Squad Management

Squad Roles:
| Role | Description |
|---|---|
| Captain | Leader, voice of the dressing room |
| Star | Best player, ego to manage |
| Rebel | Talented, difficult |
| Veteran | Nearing end of career, big influence |
| Rookie | Young, impressionable |
| Fallen star | Was great, now fading |

Fitness: Tracked weekly, affected by training load, match minutes and age.
Injuries: Event-driven with realistic recovery arcs.
Morale: Squad-wide value modified by results, relationships and training.

### 8.2 Transfers and Scouting

Transfer Windows: Summer and January (and an emergency loan window). Deadline Day is a mini-event.
Scouting: Reports arrive over time with accuracy dependent on scout quality. Reports can contain mistakes.
Youth scouting: Separate track for local talent and hidden gems.

### 8.3 Finances

| Tier | Revenue source | Pressure |
|---|---|---|
| Non-league | Gate receipts + donations | Near-zero margin |
| National League | Gate + small sponsorship | Tight |
| League Two | Broadcast + gate + transfers | Manageable |
| League One/Championship | Broadcast deal grows | Investment pressure |
| Premier League | Broadcast windfall | Owner power and politics |

### 8.4 Training and Development
Weekly training allocation with individual or group sessions. Training affects fitness, attributes (slow growth), morale and injury risk. The Wonderkid has a dedicated development track with milestone events.

### 8.5 Facilities

| Facility | Effect | Unlocked at |
|---|---|---|
| Academy | Youth scouting and development | League Two |
| Medical | Reduces injury duration and risk | National League |
| Analytics | Opposition reports and tactical data | League One |
| Stadium expansion | Increases gate income | Championship |
| Training ground | Improves squad fitness and morale | League One |

### 8.6 Staff Hiring

| Role | Function |
|---|---|
| Assistant Manager | Main confidant, tactical and man-management support |
| First Team Coach | Training quality |
| Physio | Injury management |
| Scout | Scouting report quality |
| Analyst | Opposition reports, unlocks tactical layer 3 |

---

## 9. Match Engine

### 9.1 Simulation Requirements

| ID | Requirement |
|---|---|
| M1 | Deterministic: seeded RNG so any match can be replayed exactly |
| M2 | Outcomes driven by squad quality, tactics, opponent weaknesses, fatigue, morale and bounded randomness |
| M3 | Key moments are discrete events: chances, fouls, injuries, set pieces, red cards |
| M4 | Player can intervene at half-time, 60th minute, any substitution point, penalty decisions |
| M5 | Post-match breakdown explains the main factors behind the result |
| M6 | Engine runs headless for balance testing |
| M7 | Story-critical matches have forced situations but outcome still driven by player decisions |

### 9.2 Presentation
- Non-critical matches: Scrolling text ticker, simple pitch diagram, score/stats panel
- Important matches: Animated pitch events for goals and key moments
- Story-critical matches: Cinematic cutscenes for goals in certain moments

### 9.3 Tactical Input

Layer 1 (Casual): Formation selector, Mentality, 4 key sliders.
Layer 2 (Intermediate): Player roles and duties, pressing triggers, set-piece instructions.
Layer 3 (Advanced, unlocks with Analyst staff): Opposition-specific instructions, in-game tactical presets.

### 9.4 Transparency Rule
After every match: why we scored, why they scored, fatigue and fitness impact, one coaching insight.

---

## 10. Mini Games

Each mini game is completable in under 3 minutes, supports mouse/keyboard/touch, and can be auto-resolved on Story difficulty.

| Mini Game | When | Core Mechanic | Consequence |
|---|---|---|---|
| Team Talk | Pre-match, half-time | Tone and message selection with player reactions shown | Morale, trust, match performance |
| Press Conference | After big results | Question with 3-4 response options with risk indicators | Reputation, board, fan mood |
| Transfer Negotiation | Every significant transfer | Multi-round negotiation with time pressure | Fee, wages, agent relationship |
| Tactical Whiteboard | Pre-match for important games | Set shape against specific threat with engine preview | Direct match modifier |
| Scouting Report | Weekly during windows | Video clip review: identify strengths and weaknesses | Quality of signing |
| Crisis Management | Story-triggered scandals | Rapid decision tree under time pressure | Trust, discipline, reputation |
| Budget Emergency | Financial danger threshold | Visual budget puzzle | Club survival, morale |
| Penalty Shootout | Cup matches going to pens | Order selection, taker choice, mind games | Match outcome |
| Live Match Moments | Critical match minutes | Timed choice over match view with no pause | Match outcome, morale |

---

## 11. Presentation

### 11.1 Visual Style
- Style: Stylized 2D illustration. Atmospheric. Painterly but clean.
- Portraits: Expressive character portraits with 3 to 5 expression states per character.
- Backgrounds: Each location has 2 to 3 background variants with subtle parallax motion.
- UI: Clean, minimal. Dark theme with accent colors per club.
- Cinematic peaks: Fully animated scenes for key story moments.

### 11.2 Color and Typography
- Typography: Inter for UI, Lora or Playfair Display for story text.
- Base palette: Dark backgrounds, warm amber accents for English lower leagues, blues/greens for European arcs.
- Club palettes: Each club has a generated two-tone palette applied to UI elements.

### 11.3 Audio
| Element | Description |
|---|---|
| Manager theme | Recurring motif, sparse at first, full orchestration by Act IV |
| Match ambience | Crowd that reacts to events |
| Cinematic music | Swells reserved for peak moments only |
| Silence | Used deliberately before big matches and after the worst moments |

### 11.4 UI and UX Requirements
| Requirement | Detail |
|---|---|
| Responsive layout | Works on 320px wide up to 4K |
| Touch controls | All interactions work with tap and swipe |
| Quick access | Squad, Tactics, Finances accessible within 2 taps from anywhere |
| Autosave indicator | Subtle, non-intrusive, fades after 2 seconds |
| Session recap | Previously in your career summary on return |

---

## 12. Technical Architecture

### 12.1 Technology Stack

| Layer | Technology | Reason |
|---|---|---|
| Language | TypeScript | Type safety across many interacting systems |
| Framework | React + Vite | UI components, fast dev builds |
| Branching story | Ink via inkjs | Industry-standard choice scripting |
| Match view + mini games | Phaser 3 | 2D canvas rendering |
| State management | Zustand | Lightweight, React-compatible global state |
| Local saves | IndexedDB | Persistent across browser sessions |
| Audio | Howler.js | Music and sound with crossfades |
| Animation | Lottie + CSS | Lottie for character animations, CSS for UI |
| Hosting (staging) | Netlify | Preview deployments |
| Hosting (launch) | itch.io + Cloudflare Pages | Public release |

### 12.2 Three-Layer Architecture

`
PRESENTATION LAYER
  React (UI) + Phaser (matches/minigames)
  Only displays what other layers decide

STORY LAYER
  Ink scripts (inkjs)
  Branches, dialogue, choices, consequences
  Reads/writes simulation state via event bus

SIMULATION CORE
  Plain TypeScript (no UI)
  Match engine, transfers, finances, morale, relationships
  Seeded RNG. Runs headless.
`

### 12.3 Folder Structure

`
dugout/
  src/
    core/
      match/
      squad/
      transfers/
      finances/
      training/
      relationships/
      rng/
    story/
      ink/
      bridge/
    ui/
      screens/
      components/
      hud/
    game/
      scenes/
      minigames/
    state/
    data/
    assets/
  stories/
  tests/
  tools/
`

### 12.4 Event Bus

The story and simulation layers communicate via a typed event bus.
Story fires: match results, relationship changes.
Simulation fires: story triggers, story flags.

### 12.5 Seeded RNG
All simulation randomness uses a seeded xoshiro128** RNG. The seed is stored in the save file, allowing any match to be replayed exactly and enabling headless batch testing.

---

## 13. Data Model

### 13.1 Core Entities

Manager: id, name, origin, stats (tactics, manManagement, discipline, charisma, scouting, business, resilience), identity (5 axes), reputation, integrity, history.

Club: id, name, city, tier, colors, finances, facilities, staff, board profile, fanMood.

Player: id, name, age, position, attributes, personality, morale, fitness, contract, squadRole, relationships.

StoryState: currentAct, flags, pendingConsequences, characterRelationships, managerIdentity.

CharacterRelationship: characterId, trust, respect, fear, loyalty, ego (all 0 to 100).

### 13.2 Content Data (JSON)
- clubs.json: All clubs per tier
- players.json: Generated player pool per tier
- leagues.json: League structures, promotion/relegation rules, cup formats
- staff.json: Staff pool with skills and personality types
- story_flags.json: All named flags used in Ink scripts

---

## 14. Save System

| ID | Requirement |
|---|---|
| S1 | Autosave after every decision |
| S2 | Multiple save slots (minimum 3) |
| S3 | Local saves in IndexedDB |
| S4 | Export and import of save files |
| S5 | Versioned save format |
| S6 | No progress lost on tab close |
| S7 | Career history persists across playthroughs |
| S8 | Cloud saves via Supabase in a later version |

---

## 15. Build Phases

### Phase 0: Foundation (Weeks 1 to 3)
Goal: Working project skeleton, tech stack proven, visual style established.

Deliverables:
- Vite + React + TypeScript project initialized
- Phaser 3 integrated within React as a canvas component
- Zustand state management connected
- IndexedDB save/load working
- Howler.js audio player working
- Ink (inkjs) story runner with a simple test story
- Basic responsive layout shell with dark theme and typography
- CI pipeline with Netlify auto-deploy on push
- Seeded RNG module (xoshiro128**)
- Headless simulation runner scaffold

Exit criteria: All technologies talk to each other. A minimal Ink story runs in-browser and updates a shared Zustand store.

---

### Phase 1: Story Prototype (Weeks 4 to 8)
Goal: Prove the story is engaging before building systems.

Deliverables:
- All three origins written and playable in Ink
- Act I main beats written (10 to 12 key scenes)
- Character portrait system with static images and expression swap
- Dialogue UI: speaker name, portrait, text box, choices
- Background scene system
- Hidden variable system connected to Ink
- Simple club overview screen
- Team talk mini game (Phase 1 version)
- Press conference mini game (Phase 1 version)
- One fully written and playable origin-to-Act I-cliffhanger run
- First version of the music/ambience system (2 tracks + transitions)

Assets needed from creator before this phase:
- Character portrait style reference or approval of a generated style
- Approval of Act I story outline before writing begins
- Club name, colors and location for Calder Vale Town

Exit criteria: A person who does not know the game can play through the prologue and Act I in 45 to 60 minutes and want to continue.

---

### Phase 2: Simulation Core (Weeks 9 to 14)
Goal: Build the match engine and management systems as fully testable TypeScript modules.

Deliverables:
- Match engine: event generation, seeded RNG, outcome calculation
- Tactics input system: formation, mentality, 4 sliders
- Squad management screen: view, select, bench
- Player data model: attributes, morale, fitness, contracts
- Finances system: weekly budget, wages, income, bankruptcy check
- Training system: weekly allocation, slow attribute growth
- Transfer system: scouting reports, negotiation data model
- Headless simulation: simulate 100 seasons, output stats
- Match presentation: text ticker with key events
- Post-match breakdown screen
- Integration: match result flows into Ink story flags
- One full non-league season simulated end-to-end

Exit criteria: A well-managed team outperforms a poorly managed one in more than 70% of simulated seasons.

---

### Phase 3: Vertical Slice (Weeks 15 to 20)
Goal: A complete, polished, shareable version of Act I.

Deliverables:
- All three origins fully written and illustrated
- Complete Act I story with all major branches
- Team talk mini game (polished version with animations)
- Press conference mini game (polished version)
- Transfer negotiation mini game
- Tactical whiteboard mini game
- Penalty shootout mini game
- Match presentation with animated pitch events for goals
- All Calder Vale Town season matches simulated
- Financial crisis event in Act I
- The Wonderkid discovery scene
- Eddie first story layer with hints at the secret
- The sacking system: one sacking path playable with two European job offers
- Hall of Fame recording Act I result
- Mobile-responsive polish
- Load time optimization (target: under 3s on 4G)

Assets needed from creator before this phase:
- Final approval on character portraits or outsource directive
- Music style reference (3 adjectives or reference tracks)
- Any specific story beats to add or remove

Exit criteria: A complete stranger can play the prologue plus Act I in one session, understand the systems, feel the emotional beats, and want to continue. This build is shareable as a demo.

---

### Phase 4: Acts II and III (Weeks 21 to 32)
Goal: The full playable game through Act III.

Deliverables:
- Act II story written and integrated (8 to 10 major scenes)
- Act III story written and integrated (8 to 10 major scenes)
- National League tier systems
- League Two and League One tier systems
- Voss introduced as recurring rival from Act II onwards
- Priya Nair relationship arc from Act II onwards
- The First Betrayal scene in Act II
- The Giant-Killing Cup Run as Act III centerpiece
- The first bribe/corruption choice in Act III
- Eddie secret begins to surface in Act III
- Deadline Day mini event
- Crisis Management mini game (polished)
- Budget Emergency mini game
- Advanced tactics (Layer 2: player roles, pressing triggers)
- Scouting Report Review mini game
- Multiple European destinations (2 countries, 4 clubs)
- All 5 endings defined in story layer
- New Game Plus scaffold
- Save migration system

Exit criteria: Acts I through III are fully playable with complete story, all mini games functional, all management systems working together.

---

### Phase 5: Acts IV, V and Launch (Weeks 33 to 45)
Goal: Complete game, polished, released.

Deliverables:
- Act IV story written and integrated
- Act V story written and integrated
- The Defining Choice scene in Act IV
- All five endings implemented fully
- The Wonderkid final arc
- Championship and Premier League tier systems
- European competition system
- Advanced tactics (Layer 3: opposition instructions)
- Full music score (dynamic soundtrack)
- Cinematic animated scenes for key peaks
- Accessibility pass (colorblind, motion reduction, keyboard nav)
- Balance testing (automated simulation: 1000 season runs)
- Performance optimization pass
- Analytics integration (minimal, anonymous)
- Beta test with 10 or more external players
- itch.io page and Cloudflare Pages deployment

Exit criteria: Game is fully playable from prologue to any of the five endings.

---

## 16. Open Questions Resolved

| Question | Decision |
|---|---|
| Match-fixing as the deep spine vs. quieter secret | Keep the match-fixing secret. It is the strongest hook and justifies the five-act structure. |
| How dark should corruption go | Medium depth: corruption has real mechanical consequences, light threat, real temptation. |
| Can the player cheat/accept bribes | Yes, with real mechanical effects. Accepting increments a hidden exposure risk counter that can trigger a scandal. |
| Romance | Optional and minor. One romance arc available, flagged as optional content. |
| Project is solo or team | Assumed solo developer for Phase 0 to 1. External art and writing help recommended from Phase 2. |
| Animation feasibility for v1.0 | Phase 3 delivers portrait-based scenes with Lottie micro-animations. Full animated scenes only for 3 to 4 cinematic peaks in Phase 5. |
| Which European leagues first | Portugal and the Netherlands in Phase 4. Germany or Spain post-launch. |
| Monetization | Free prologue plus Act I demo. One-time purchase for full campaign. No timers, no loot mechanics. |
| Final title | Working title remains The Dugout. Decision deferred to Phase 3. |

---

## 17. Appendices

### Appendix A: Glossary

| Term | Meaning |
|---|---|
| Pyramid | The tiered structure of English football leagues |
| Step 5/6 | Non-league levels below the National League |
| Spine and ribs | Fixed major events plus variable branches |
| Hidden variables | Relationship and reputation values the player never sees directly |
| Soft fail state | A failure that redirects the story instead of ending the game |
| Vertical slice | A small, complete, polished portion of the game |
| Seeded RNG | A random number generator that produces repeatable results from a seed |
| Ink / inkjs | A scripting language for branching narrative |
| Headless | Running the simulation without any graphical interface |
| Butterfly effect | An early choice that produces consequences several acts later |
| Manager identity | The personality type that emerges from accumulated decisions |

### Appendix B: Unique Selling Points

1. A management game where story consequences matter more than numbers
2. A rags-to-riches journey with a real risk of losing everything
3. Failure that creates new story: sacking is a beginning, not an ending
4. Personality-driven dialogue and relationships
5. Multiple origins, philosophies, and endings that reward replay
6. Runs instantly in the browser with no install

### Appendix C: Phase Summary

| Phase | Focus | Duration | Shareable? |
|---|---|---|---|
| Phase 0 | Foundation | Weeks 1 to 3 | No |
| Phase 1 | Story prototype | Weeks 4 to 8 | Story review only |
| Phase 2 | Simulation core | Weeks 9 to 14 | Dev/test only |
| Phase 3 | Vertical slice | Weeks 15 to 20 | Yes, demo |
| Phase 4 | Acts II and III | Weeks 21 to 32 | Yes, extended demo |
| Phase 5 | Acts IV, V, launch | Weeks 33 to 45 | Yes, full release |

### Appendix D: Assets Required from Creator

Before Phase 1 can begin, please answer or provide:

1. Character portrait style: Realistic illustration, stylised/anime, or photo-bashed? OR: Approve a generated style.
2. Starting club details: Confirm or modify Calder Vale Town (name, colors, crest style).
3. Music direction: 3 adjectives or reference tracks (e.g. quiet, melancholic, working-class).
4. Story review: Read and approve the Act I beat sheet before writing begins.
5. Origin preferences: Any details to change in the three origins?
6. Corruption depth: Confirm the medium depth corruption decision.

---

End of document, Version 2.0
