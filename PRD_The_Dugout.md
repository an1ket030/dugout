# Product Requirements Document: The Dugout (Working Title)

**Document version:** 1.0
**Date:** 14 November 2026
**Genre:** Story-driven football management visual novel
**Platform:** Web (desktop and mobile browsers)
**Status:** Pre-production

---

## Table of Contents

1. Executive Summary
2. Vision, Goals and Design Pillars
3. Target Audience
4. Scope and Non-Goals
5. World, Licensing and Setting
6. Story Overview
7. Protagonist and Origins
8. Cast of Characters
9. Narrative Structure and Acts
10. Branching Narrative Engine
11. Sacking and Exile System
12. Endings
13. Core Gameplay Loop
14. Management Systems
15. Tactics System
16. Match Engine
17. Mini Games
18. Relationship Web
19. Progression, Reputation and Replayability
20. Difficulty and Balance
21. Presentation: Art, Animation, Audio, UI
22. Technical Architecture
23. Data Model
24. Save System and Persistence
25. Performance, Compatibility and Accessibility
26. Content Pipeline and Tools
27. Monetization
28. Analytics and Success Metrics
29. Roadmap and Milestones
30. Team and Resources
31. Risks and Mitigations
32. Open Questions
33. Appendices

---

## 1. Executive Summary

*The Dugout* is a browser-based football management game told as a branching visual novel. The player takes the role of a manager who begins with nothing, running a financially failing non-league club at the very bottom of the English football pyramid, and works toward the top of European football. The story is a rags-to-riches climb that can be lost as easily as it is won.

Unlike conventional management games that are driven by spreadsheets, this game is driven by story consequences. Every system, from tactics to transfers to finances, exists to create dramatic moments. Players make dialogue, moral, tactical and financial decisions, and those decisions reshape relationships, reputation and the path of the career.

A defining feature is that failure continues the story. When the manager is sacked, the game does not end. The manager is recruited by another club, usually in Europe, and a new arc begins. The reason for the sacking changes which clubs make offers and what kind of story follows.

The game uses real leagues, real cities and real competition structures with invented clubs and invented players. This keeps the setting authentic while avoiding licensing risk.

---

## 2. Vision, Goals and Design Pillars

### 2.1 Vision

A management game where the player feels the weight of the job and the pride of surviving it. The player should finish a session thinking about the next chapter, not about a table of numbers.

### 2.2 Product Goals

| ID | Goal |
|---|---|
| G1 | Deliver a gripping, cinematic and emotionally intense rags-to-riches football story |
| G2 | Make management decisions meaningful, with a strong impact on results |
| G3 | Balance accessibility for casual players with real depth for hardcore players |
| G4 | Ensure failure produces new story rather than a reload |
| G5 | Reward replay through multiple origins, branches, philosophies and endings |
| G6 | Run smoothly in a browser with fast load times and automatic saving |
| G7 | Remain buildable by a small team through modular systems |

### 2.3 Design Pillars

1. **Story first, management second.** Every system exists to create dramatic moments.
2. **Every choice leaves a scar or a medal.** Decisions have visible, long-term consequences.
3. **Rags to riches, but earned.** Progress can be lost. The climb is fragile.
4. **Small screen, big emotion.** Each session of 10 to 20 minutes ends with a hook.
5. **Never random, always readable.** Results must feel explainable. A loss should teach, not frustrate.

### 2.4 Core Fantasy

The player is not a billionaire owner or a famous former player. The player is an outsider with no connections, and every door that opens is one they forced open.

---

## 3. Target Audience

**Primary:** Players aged 16 to 35 who enjoy football and narrative games, including fans of football management games who want more story, and fans of visual novels who want more systems.

**Secondary:** Casual browser gamers who enjoy sports drama and choice-driven stories.

**Player motivations:**
- Experiencing an underdog story
- Proving tactical skill
- Seeing choices matter
- Exploring different outcomes on replay

**Platform behavior:** Many players will arrive via a link, play on a phone or laptop, and leave quickly if loading is slow. The game must be quick to start and safe to close at any moment.

---

## 4. Scope and Non-Goals

### 4.1 In Scope (Version 1.0)

- A full prologue with three origin options
- Act I to Act III playable with complete story content
- The sacking and exile system with at least two European countries
- Squad, tactics, transfers, finances, training, staff and facilities systems
- Core mini games
- Autosave and local saves
- Web build for desktop and mobile browsers

### 4.2 Planned for Later Versions

- Acts IV and V in full, with additional European leagues
- Cloud saves and accounts
- Additional origins and story branches
- Hall of Fame sharing
- Localization

### 4.3 Non-Goals

- Full 3D match simulation
- Real club names, badges, kits and player likenesses (licensing)
- Online multiplayer
- A real-time match engine with player-controlled movement

---

## 5. World, Licensing and Setting

### 5.1 Setting

The game takes place in the real football world, primarily in England at the start and across Europe later. The story begins in Lancashire at a fictional mill-town club.

### 5.2 Licensing Approach

**Decision:** Real leagues, real cities and real competition formats, with invented clubs and invented players.

- Fictional club names, badges, kits and stadiums
- Fictional players, staff, owners and agents
- Real league structures, such as the English pyramid, and real competition formats, such as domestic cups and European tournaments
- Real cities and regions for flavor

This is a design decision and not legal advice. A legal review is recommended before public release, especially around the use of real league and competition names.

### 5.3 The English Pyramid Ladder

1. Regional non-league (step 6 and step 5)
2. National League North or South
3. National League
4. League Two
5. League One
6. Championship
7. Premier League
8. European competitions and top continental clubs

Each tier must feel like a different game in tone, stakes and available systems (see Section 13.3).

### 5.4 European Expansion

Initial focus after England is one or two leagues, such as Portugal, the Netherlands, Italy, Germany or Spain. Each country brings its own football culture, language flavor, media environment and tactical style.

---

## 6. Story Overview

**Central question:** What are you willing to pay to belong?

**Inciting situation:** Calder Vale Town, a mill-town club in Lancashire at step 6 of the pyramid, is weeks from folding. The volunteer committee has no money and no manager. The previous manager quit mid-season. Nobody else wants the job, so the protagonist is handed the role for one season, unpaid.

**The long secret:** Eddie Marlowe, the club's old kit man and the protagonist's first mentor, was once a promising manager whose career ended overnight in a match-fixing scandal 25 years ago. He claims he was framed. The truth is more complicated. The person who actually benefited from the fix is now a powerful figure in football, and depending on the player's choices becomes patron, owner, rival's mentor or final opponent.

**Story layers:**
- **Surface:** The climb from non-league to the top
- **Middle:** The rivalry and the corruption encountered along the way
- **Deep:** The truth about Eddie, and whether the player exposes it, buries it or uses it

**Tone:** Balanced between realistic and cinematic. Ordinary weeks stay grounded. Turning points get the cinematic treatment through animation, music and staging.

---

## 7. Protagonist and Origins

### 7.1 Customization

- Name
- Appearance (portrait options)
- Style of dress
- Signature touches, such as touchline behavior and press conference style

### 7.2 Manager Stats

| Stat | Affects |
|---|---|
| Tactics | Quality of tactical options and in-match effectiveness |
| Man-Management | Player morale, trust and dressing room dynamics |
| Discipline | Squad behavior, fines, authority |
| Charisma | Press, board and fan relationships |
| Scouting | Quality of scouting information and talent discovery |
| Business | Finances, negotiations and sponsorship |
| Resilience | Recovery from setbacks, handling pressure |

### 7.3 Manager Identity

The game quietly tracks which type of manager the player is becoming and responds accordingly:
- Idealist
- Pragmatist
- Ruthless Winner
- Players' Man
- Mastermind

Identity is not chosen at the start. It emerges from decisions, and it shapes how characters treat the player and which story branches open.

### 7.4 The Three Origins

The player chooses one origin in the prologue. Each is a playable opening of roughly 20 to 30 minutes that leads into the same inciting situation.

| Origin | Background | Strengths | Weaknesses | Story hook |
|---|---|---|---|---|
| The Groundsman's Kid | Grew up cutting the pitch at a small club | Resilience, Man-Management | Low Tactics, no credentials | Fans and volunteers trust the player instantly |
| The Broken Prospect | A youth player whose career ended at 19 | Tactics, player empathy | Ego, bitterness | Former teammates now hold powerful jobs |
| The Analyst Nobody Hired | A data and video specialist who never played | Scouting, Business | Weak Charisma, players doubt the player | Sees patterns others miss, but the dressing room mocks the player |

Origins change dialogue, early trust levels and a limited set of exclusive branches. They do not change the main plot.

---

## 8. Cast of Characters

All names are placeholders and can be changed.

| Character | Role | Function in the story |
|---|---|---|
| Eddie Marlowe | Mentor, club kit man | Believes in the player first. Holds the long secret. |
| Damian Voss | Rival manager | An outsider who started at the same level and took the "cheaper way" at every fork. Never a cartoon villain. |
| Priya Nair | Journalist | Starts at a local paper and rises with the player. Her coverage can build or destroy the career. |
| Maya Okafor | Assistant manager | The first coach and a witness to the player's worst moments. Either the most loyal ally or the most dangerous critic. |
| Harold Kettering | First owner | A local businessman keeping the club alive. His help comes with strings. |
| Jonah Reyes | Club captain | A veteran whose arc runs from the bottom league to retirement. Can become a legend, a rebel or a cautionary tale. |
| The Wonderkid | Young talent | Discovered in Act I. His career can parallel the player's, and his fate depends on how he is treated. |
| Lucian Ferrante | Agent and fixer | Appears in every transfer window with a "helpful" offer. |

**Character design rule:** Recurring characters appear at multiple stages of the career in changing roles. A player, journalist or rival from Act I can return as a board member, a club owner, an opposing manager or a pundit in later acts.

---

## 9. Narrative Structure and Acts

The game is structured as five acts. Each act is a chapter with a main arc, side arcs and a cliffhanger finale. Seasons within an act follow the weekly loop (Section 13).

### Act I: The Last Season (Non-league, steps 6 to 5)
- **Tone:** Survival drama
- **Conditions:** No money, volunteer staff, poor facilities
- **Goal:** Avoid folding the club
- **Key beats:** First team talk, first cup upset, first moral choice about cutting corners, discovery of the Wonderkid
- **Cliffhanger:** A rival bid for the club, or a sudden promotion chance

### Act II: The Climb (National League North or South to National League)
- **Tone:** Momentum and first media attention
- **Key beats:** The press notices the player, Voss appears as a rival manager, the board begins to expect results
- **Key event:** The first betrayal, where someone trusted sells the player out

### Act III: The Fight (League Two to League One)
- **Tone:** Gritty and political
- **Key beats:** A giant-killing cup run against a Premier League side, the first bribe or "favor" offered, the first serious chance of being sacked
- **Key event:** Eddie's past begins to surface

### Act IV: The Summit (Championship to Premier League)
- **Tone:** Cinematic and high-pressure
- **Key beats:** Promotion on the final day, huge transfers, global media
- **Key event:** The truth about the fixed match is revealed, and the player makes a defining choice

### Act V: The Continent (Europe)
- **Tone:** Legacy
- **Key beats:** European competitions, foreign cultures, the biggest clubs
- **Key event:** Resolution of the rivalry and the secret. Reputation decides whether the player is welcomed as a master or tolerated as a mercenary.

### Storyline Layers Running Across Acts

| Arc | Description |
|---|---|
| Main arc | Rags to riches |
| Rivalry arc | A long-running duel with Voss across seasons |
| Club survival arc | Fighting relegation, bankruptcy or hostile takeover |
| Redemption arc | Players and staff seeking second chances |
| Corruption and integrity arc | Match fixing, bribery, shady owners |
| Underdog cup run | A giant-killing story within the larger campaign |
| Legacy arc | What the manager leaves behind |
| Personal arc | The human cost of ambition, including family and personal life |

---

## 10. Branching Narrative Engine

### 10.1 Structure: Spine and Ribs

- **The spine:** Five acts and a small set of fixed major events (the inciting situation, the first betrayal, the cup upset, the revelation, the final confrontation). These always occur, though how they play out varies.
- **The ribs:** Branches that change who is present, what they know and how they feel. Most choices change relationships and reputation rather than creating entirely new plots.

### 10.2 Choice Types

- Dialogue choices
- Moral choices
- Tactical choices
- Financial choices
- Timed pressure choices

### 10.3 Hidden Variables

The player never sees exact numbers, only reactions.

| Variable | Meaning |
|---|---|
| Trust | Belief in the manager's honesty |
| Respect | Belief in the manager's competence |
| Fear | How intimidating the manager is |
| Loyalty | Commitment to the manager personally |
| Ego | A character's pride, which can clash with the manager |
| Reputation | Public standing of the manager |
| Integrity | The manager's moral track record |

Variables exist per character where relevant, plus global values for reputation and integrity.

### 10.4 Narrative Mechanics

- **Butterfly effect:** Small early decisions, such as promising a youth a debut or covering for a player, resurface seasons later.
- **Locked and unlocked paths:** Some branches only open with the right relationships or stats.
- **Delayed consequences:** At least several early choices are designed to pay off two or three acts later.
- **Soft fail states:** Losing, being sacked or going bankrupt redirects the story into a comeback arc.
- **Replay value:** Replaying with a different origin or philosophy reveals new routes.

### 10.5 Cheating and Corruption Options

The player can encounter bribes, fixing offers and shady deals. Accepting them can provide real short-term advantages, but each carries long-term risk to integrity, relationships and reputation, and can trigger exposure events. (See Open Questions for the decision on how far this goes.)

---

## 11. Sacking and Exile System

Being sacked is a core story mechanic, not a fail state.

### 11.1 Sacking Triggers

- Poor results
- Scandal
- Conflict with the board
- A rival's scheme
- Burnout

### 11.2 Resulting Paths

| Sacking reason | Typical follow-up |
|---|---|
| Results | A rebuild at a mid-table European club, proving oneself again |
| Scandal | A morally grey club with a shady owner who wants a manager with nothing to lose |
| Standing up to the board | A fan-owned or principled club, smaller but with a loyal base and a redemption feel |
| A rival's scheme | A revenge arc against Voss and his influence |
| Burnout | A quieter arc at a low-pressure job with personal storylines |

### 11.3 Requirements

- **Sacking scene:** Each sacking has a dedicated scene with a reason and consequences.
- **Reputation persistence:** Reputation follows the manager. Different sackings generate different job offers.
- **European job market:** Offers come from clubs in different countries, each with its own culture, language barrier and football style (for example, a tactical Italian culture versus a high-pressing German culture).
- **Persistent history:** Past players, rivals and journalists return in new roles.
- **No dead ends:** The player can always receive at least one job offer, even if poor.

---

## 12. Endings

Endings depend on legacy, integrity, relationships and trophies, and not on wins alone.

| Ending | Summary |
|---|---|
| The Legend | The player wins everything and exposes the truth |
| The Survivor | The player builds something lasting at a small club and walks away from the top |
| The Kingmaker | The player takes the power Voss wanted and becomes what they once fought |
| The Ghost | The player loses everything and is remembered only by the few who mattered |
| The Redemption | The player restores Eddie's name at a personal cost |

Additional endings may be added based on relationship outcomes and manager identity.

---

## 13. Core Gameplay Loop

### 13.1 Weekly Loop

1. **Story scene:** Dialogue and events that move the plot and relationships
2. **Management decisions:** Squad, tactics, finances, staff and transfers
3. **Match or mini game:** The competitive moment of the week
4. **Consequences:** Results, morale changes, board and media reactions
5. **Hook:** A final beat that pulls the player into the next week

### 13.2 Session Design

- Target session length: 10 to 20 minutes
- Each session ends on a hook or a natural pause
- Autosave after every decision so closing the tab never loses progress

### 13.3 Tier-Specific Gameplay

| Tier | Tone | Main pressures | Available systems |
|---|---|---|---|
| Non-league | Survival | Money, volunteers, pitch, survival | Basic tactics, minimal staff, limited data |
| National League | Momentum | Media, expectations, first rivalry | More staff, early scouting, small transfers |
| League Two and One | Political | Agents, contracts, board politics | Full transfers, finances, youth system |
| Championship and Premier League | Cinematic | Owners, global media, huge transfers | Analytics, full staff, opposition reports |
| Europe | Legacy | Foreign culture, continental competition | Cross-border scouting, language and culture mechanics |

---

## 14. Management Systems

### 14.1 Squad Management

- Selection and rotation
- Fitness, injuries and morale
- Contracts and personalities
- Squad roles (captain, star, rebel, veteran, rookie, fallen star)

### 14.2 Transfers and Scouting

- Scout youth talents and hidden gems
- Negotiate deals with agents and rival clubs
- Sell players under financial pressure
- Transfer windows, including a deadline day event
- Risk of scouting traps and bad signings

### 14.3 Finances

- Budget limits and wage structure
- Sponsors and revenue
- Debt, administration and bankruptcy risk
- Survival decisions at low-budget clubs
- Realistic wages and transfer fees

### 14.4 Training and Development

- Build players and fix weaknesses
- Develop signature styles of play
- Individual development plans for key players and the Wonderkid

### 14.5 Facilities and Club Growth

- Academy upgrades
- Stadium improvements
- Medical team and recovery facilities
- Analytics department

### 14.6 Staff Hiring

- Assistants, coaches, physios, scouts and analysts
- Each staff member has a personality, skills and sometimes an agenda
- Staff can be loyal allies or quiet threats

---

## 15. Tactics System

The tactics system uses layered depth so it works for both casual and hardcore players.

### 15.1 Layer 1: The Casual Surface

- Formation selection
- Mentality
- A small set of sliders
- A new player can pick a plan and play

### 15.2 Layer 2: The Hardcore Core

- Player roles and duties
- Pressing triggers
- Defensive line height
- Build-up style
- Set-piece routines

These options have real effects on outcomes.

### 15.3 Layer 3: The Situational Layer

Depth scales with the story and tier:
- **At the bottom:** Almost no data, basic tools, a thin squad. Tactics are about making the most of poor resources.
- **Higher up:** Analysts, opposition reports and video review unlock.
- **In story-critical matches:** The game presents specific tactical puzzles, such as defending a lead with ten men or chasing a result with a weak bench.

### 15.4 Making Results Matter

- A readable match engine where tactics visibly produce outcomes
- Opposition scouting reveals real weaknesses that can be exploited
- Fatigue, injuries and morale carry over week to week
- Luck exists but is bounded, so good preparation wins more often than not

### 15.5 Transparency Rule

After each match the game provides a short breakdown explaining what worked and what failed, so a loss teaches rather than frustrates.

---

## 16. Match Engine

### 16.1 Presentation

- Stylized, simplified 2D match view or highlights, not a 3D simulation
- Focus on decisions rather than moment-to-moment control

### 16.2 Simulation Requirements

| ID | Requirement |
|---|---|
| M1 | Deterministic simulation using a seeded random number generator, so any match can be replayed exactly |
| M2 | Outcomes driven by squad quality, tactics, opponent weaknesses, fatigue, morale and bounded randomness |
| M3 | Key moments are generated as discrete events (chances, fouls, injuries, set pieces) |
| M4 | The player can intervene at critical minutes (substitutions, shape changes, penalty takers) |
| M5 | Post-match breakdown explains the main factors behind the result |
| M6 | The engine runs headless so thousands of simulated seasons can be used for balance testing |

### 16.3 Story Integration

Some matches are scripted as story-critical. In these, the match engine still decides the result within bounds, but the situation, stakes and special conditions are set by the story layer.

---

## 17. Mini Games

Short, replayable moments that break up the story. Each ties into the story and has real consequences.

| Mini game | Description | Consequence |
|---|---|---|
| Tactical whiteboard | Solve a match situation in limited time | Match advantage or disadvantage |
| Team talk | Choose tone and words at halftime or before finals and read player reactions | Morale, trust and performance |
| Press conference | Handle tricky questions where one wrong answer causes fallout | Media, board and fan reactions |
| Transfer negotiation | A bluff and bargain duel against agents and rival clubs | Fee, wages and relationships |
| Scouting missions | Watch clips, spot hidden talents and avoid traps | Quality of signings |
| Set-piece designer | Draw free kick and corner routines | Set-piece effectiveness |
| Live match moments | Key decisions at critical minutes | Match outcome |
| Crisis management | Dressing room fights, leaked stories, injuries and scandals | Trust, discipline and reputation |
| Budget puzzle | Balance the books during financial emergencies | Club survival |
| Penalty shootout | Choose the order, then the takers, then the mind games | Match outcome |

**Requirement:** Every mini game must be completable in under three minutes, support mouse, keyboard and touch, and offer a way to skip or auto-resolve in Story difficulty.

---

## 18. Relationship Web

| Relationship | Role |
|---|---|
| Players | Captain, star, rebel, veteran, rookie and fallen star, each with a trust arc and personal storyline |
| Mentor | The person who believes in the player, and what that belief costs |
| Rival manager | A recurring opponent whose career mirrors or opposes the player's |
| Owner and board | Patient, impatient, manipulative or visionary, depending on the club |
| Assistant manager | Loyal confidant or quiet threat |
| Media | A journalist who can build the player up or destroy them |
| Agents and fixers | Useful, dangerous and rarely free |
| Family and personal life | Pressure, sacrifice and the cost of obsession |
| Fans and ultras | Their mood shifts atmosphere and sometimes the story |
| Romance (optional) | Meaningful but never the main focus |

---

## 19. Progression, Reputation and Replayability

- **Reputation system:** Unlocks clubs, jobs and story branches
- **Achievements:** Story milestones, not only trophies
- **New Game Plus:** Replay with a different origin or philosophy
- **Seasonal events:** Derbies, transfer deadline day, cup finals and title deciders
- **Hall of Fame:** Records the career for sharing and comparison
- **Manager identity:** Evolves with decisions and affects how the world responds

---

## 20. Difficulty and Balance

### 20.1 Difficulty Modes

| Mode | Description |
|---|---|
| Story | Forgiving, with auto-resolve options for mini games and softer consequences |
| Standard | Fair but punishing, the intended experience |
| Hardcore | No safety nets, tighter finances and bigger consequences |

### 20.2 Balance Principles

- Results must matter heavily and the game must not be easy
- Good preparation should win more often than not
- The game should never feel random
- Balance is validated with automated simulation of thousands of seasons

### 20.3 Balance Targets (to be tuned)

- A well-managed team should outperform a poorly managed one with the same squad in a clear majority of simulated seasons
- Starting clubs should have a meaningful but not guaranteed survival rate on Standard difficulty
- Sacking should be a realistic outcome for poor play, not a rare event

---

## 21. Presentation: Art, Animation, Audio, UI

### 21.1 Visual Style

- Stylized 2D art with expressive character portraits
- Portraits with swappable expressions
- Backgrounds with subtle motion (parallax, transitions, particles)
- Fuller animated scenes reserved for cinematic peaks
- Clean, minimal UI

### 21.2 Animation Approach

- **Early versions:** Illustrated portraits and light motion effects
- **Cinematic moments:** Animated scenes using Lottie or Spine
- **Match view:** Simplified 2D pitch visualization

### 21.3 Audio

- Dynamic soundtrack that shifts with tension
- Crowd ambience that reacts to match state
- A signature theme for the manager's journey
- Silence before big matches as a deliberate dramatic tool

### 21.4 UI and UX Requirements

- Responsive layout for desktop and mobile
- Touch-friendly controls
- Clear, scannable management screens
- Quick access to squad, tactics and finances
- Visible but non-intrusive autosave indicator
- A journal or recap screen so returning players remember the story so far

### 21.5 Tone Rule

Ordinary weeks stay grounded. Turning points get the "movie" treatment.

---

## 22. Technical Architecture

### 22.1 Technology Stack

| Layer | Tool | Purpose |
|---|---|---|
| Language | TypeScript | Type safety across many interacting systems |
| UI and management screens | React (or Svelte) | Squad, transfers, tactics, menus |
| Build tool | Vite | Fast development and small production bundles |
| Branching story | Ink (via inkjs) | Branching narrative with variables and conditions |
| Match view and mini games | Phaser 3 | 2D rendering and interactive mini games |
| State management | Zustand | Global state for story, squad, finances and relationships |
| Local saves | IndexedDB | Autosave and local persistence |
| Cloud saves (later) | Supabase | Accounts and cross-device saves |
| Audio | Howler.js | Music and sound with crossfades |
| Hosting | itch.io, then Cloudflare Pages or Netlify | Distribution |

### 22.2 Alternatives Considered

- **Ren'Py web export:** Suited to pure visual novels but weak for a system-heavy simulation. Usable for a quick story prototype only.
- **Godot 4:** Capable, but web exports are heavier and dense UI is more awkward than in React.
- **Unity WebGL:** Large downloads and long load times.
- **Pure Phaser:** Possible, but would require rebuilding menus and lists from scratch.

### 22.3 Three-Layer Architecture

1. **Simulation core (plain TypeScript, no UI).** Match engine, transfers, finances, morale and relationship variables. Uses a seeded random number generator. Can run headless for balance testing.
2. **Story layer (Ink files).** Dialogue, branches and consequences. Reads and writes hidden variables shared with the simulation.
3. **Presentation layer (React and Phaser).** Only displays what the other two layers decide.

This separation allows independent development and testing of each layer.

### 22.4 Integration Between Story and Simulation

- Ink reads simulation state (for example, relationship values and match results) through exposed variables and external functions
- Ink writes consequences back (for example, trust changes and unlocked branches)
- A defined event bus connects simulation events to story triggers

---

## 23. Data Model

### 23.1 Core Entities

| Entity | Key fields |
|---|---|
| Manager | Name, origin, stats, identity scores, reputation, integrity, history |
| Club | Name, city, tier, finances, facilities, staff, board profile, fan mood |
| Player | Name, age, position, attributes, personality, morale, fitness, contract, relationships |
| Staff | Name, role, skills, personality, loyalty, agenda |
| Character (story) | Name, role, trust, respect, fear, loyalty, ego, arc stage |
| Match | Teams, tactics, seed, events, result, breakdown |
| Season | League, fixtures, table, cup draws, events |
| Story state | Current act, flags, completed beats, pending delayed consequences |
| Career history | Clubs managed, results, sackings, trophies, key choices |

### 23.2 Content Data

- Fictional club and player databases, generated or authored
- League and competition structures stored as data, so new countries can be added without code changes
- Story files in Ink, localized separately from code

---

## 24. Save System and Persistence

| ID | Requirement |
|---|---|
| S1 | Autosave after every decision |
| S2 | Multiple save slots |
| S3 | Local saves in IndexedDB with export and import of save files |
| S4 | Versioned save format so updates do not break existing saves |
| S5 | Cloud save and accounts in a later version |
| S6 | Closing the tab at any point must not lose progress |
| S7 | Career history and Hall of Fame data persist across playthroughs |

---

## 25. Performance, Compatibility and Accessibility

### 25.1 Performance

- Fast first load, with compressed art and lazy-loaded scenes
- Target initial load under a few seconds on a typical mobile connection
- Smooth performance on mid-range phones
- Simulation of a full match in well under a second

### 25.2 Compatibility

- Current versions of Chrome, Firefox, Safari and Edge
- Desktop and mobile browsers
- Mouse, keyboard and touch input from day one

### 25.3 Accessibility

- Scalable text
- Colorblind-friendly palette and non-color indicators
- Full keyboard navigation
- Adjustable text speed and auto-advance
- Captions for audio cues
- Option to reduce motion and screen shake
- Skippable mini games in Story difficulty

---

## 26. Content Pipeline and Tools

- **Writing:** Writers work in Ink using the Inky editor, without touching code
- **Story testing:** Playable in Inky before integration
- **Data authoring:** Club, player and league data in JSON or similar formats
- **Balance tools:** Headless batch simulation to test thousands of seasons
- **Debug tools:** In-game panel to inspect and edit hidden variables, jump to story points and force events
- **Localization (later):** Separate text files, string keys and support for languages beyond English

---

## 27. Monetization

Not decided. Options for later consideration:
- Free demo (prologue and Act I) with a paid full campaign
- One-time purchase
- Cosmetic and story DLC packs

**Constraint:** No monetization that undermines fairness or pressures players with timers or loot-style mechanics.

---

## 28. Analytics and Success Metrics

### 28.1 Metrics

| Metric | Why it matters |
|---|---|
| First-load time and bounce rate | Browser players leave quickly |
| Prologue completion rate | Measures the strength of the opening |
| Origin selection distribution | Shows whether all origins are appealing |
| Act I completion rate | Measures the first major retention point |
| Session length and sessions per user | Validates the 10 to 20 minute design |
| Sacking frequency and recovery rate | Validates the exile system and difficulty |
| Choice distribution on key decisions | Shows whether choices feel meaningful |
| Replay rate | Measures replayability |
| Mini game skip and auto-resolve rate | Signals mini game quality |

### 28.2 Privacy

Analytics must be minimal and anonymous by default, with clear disclosure.

---

## 29. Roadmap and Milestones

| Phase | Deliverable | Exit criteria |
|---|---|---|
| 0. Story bible | Full story bible, character profiles, act outlines | Story approved |
| 1. Story prototype | Prologue and Act I scenes written in Ink and tested in Inky | The story is engaging in text form |
| 2. Simulation prototype | Match engine as a standalone TypeScript module with terminal tests | Better tactics win more often, and results feel fair |
| 3. Web vertical slice | Prologue plus one non-league season with a team talk, press conference and live match moment | A complete, polished playable slice |
| 4. Sacking and relocation | Sacking scene and a first European job offer arc | The career-continues idea is proven |
| 5. Core systems | Squad, transfers, finances, staff, training and facilities | All management systems work together |
| 6. Content expansion | Acts II and III, more branches and more endings | Full playable story through Act III |
| 7. Polish and testing | Balance, pacing, accessibility, performance | Release candidate |
| 8. Launch | Public web release | Live |
| 9. Post-launch | Acts IV and V, more countries, cloud saves | Ongoing |

**Guiding principle:** Start with story and simulation, not graphics. This tells you early whether the game is fun.

---

## 30. Team and Resources

Current assumption: a solo developer or a very small team (to be confirmed).

| Role | Notes |
|---|---|
| Developer (TypeScript) | Simulation core, UI, integration |
| Writer | Ink scripting and dialogue |
| Artist | Portraits, backgrounds, UI |
| Composer and sound | Music and effects |
| Tester | Balance and story testing |

If working solo, scope should be cut to the prologue and Act I first, and external help considered for art and audio.

---

## 31. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Scope too large | Project stalls | Strict vertical slice first, modular systems, content expansion in phases |
| Branching explodes | Writing becomes unmanageable | Spine-and-ribs structure, variable-driven branches rather than full branches |
| Match results feel random or unfair | Players lose trust | Deterministic engine, readable breakdowns, balance testing |
| Licensing problems | Legal exposure | Fictional clubs and players, legal review before launch |
| Slow web load | Players leave | Lazy loading, compressed assets, light first load |
| Art workload | Delays | Portrait-based approach, animation only for peaks |
| Difficulty too hard or too easy | Frustration or boredom | Three difficulty modes and simulation-based tuning |
| Story quality not matching the pitch | Weak hook | Prototype and test the story in Ink before building anything else |
| Save corruption | Lost progress | Versioned saves, export option, frequent autosave |

---

## 32. Open Questions

1. Should the match-fixing secret remain the deep spine, or should the story use a quieter secret?
2. How dark should corruption become: light (pressure and temptation) or heavy (threats and real danger)?
3. Should the player be able to cheat (bribes and fixing) or only witness it?
4. Should romance be included, kept minor or left out?
5. Is the project solo or team-based?
6. How much animation is feasible for the first release?
7. Which European leagues come first after England?
8. What is the monetization model?
9. Final title of the game.

---

## 33. Appendices

### Appendix A: Glossary

| Term | Meaning |
|---|---|
| Pyramid | The tiered structure of English football leagues |
| Step 5 and 6 | Non-league levels below the National League |
| Spine and ribs | The narrative structure of fixed major events plus variable branches |
| Hidden variables | Relationship and reputation values the player never sees directly |
| Soft fail state | A failure that redirects the story instead of ending the game |
| Vertical slice | A small, complete, polished portion of the game |
| Seeded RNG | A random number generator that produces repeatable results from a seed |
| Ink | A scripting language for branching narrative |
| Headless | Running the simulation without any graphical interface |

### Appendix B: Unique Selling Points

- A management game where story consequences matter more than stats
- A rags-to-riches journey with a real risk of losing everything
- Personality-driven dialogue and relationships instead of menu-only management
- Failure that creates new story through the sacking and exile system
- Multiple origins, philosophies and endings that reward replay
- Runs instantly in the browser

### Appendix C: Summary of Decisions Made

| Decision | Choice |
|---|---|
| Platform | Web game |
| World | Real leagues and cities, fictional clubs and players |
| Starting point | Bottom of the English football pyramid |
| Failure model | Sacked, then recruited by another club, mostly in Europe |
| Tactics depth | Balanced between casual and hardcore, with a major impact on results |
| Tone | Balanced between realistic and cinematic |
| Tech stack | TypeScript, React, Vite, Ink, Phaser, Zustand, IndexedDB |
| Story spine | Rags to riches with a hidden match-fixing secret |
| Origins | Three playable origins |
