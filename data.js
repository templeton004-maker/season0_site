// ─────────────────────────────────────────────────────────────
// Season 0 — data.js
// Single source of truth for all site pages.
// Update after each round by copying from Export_datajs sheet.
// ─────────────────────────────────────────────────────────────

const SEASON = {

  // ── Config ───────────────────────────────────────────────
  config: {
    season:           "Season 0",
    rounds:           6,
    dollarPerPoint:   10,
    startingBankroll: 10320,
    maxCarryover:     3,
    normalMult:       1,
    soloWolfMult:     2,
    loneWolfMult:     3,
    blindWolfMult:    4,
    blockedWolfMult:  2,
    course:           "Fields Ranch West",
    location:         "Frisco, TX",
    slope:            135,
    rating:           71.4,
    par:              72,
  },

  // ── Players ───────────────────────────────────────────────
  players: [
    { id: "KS", name: "Kyle Story",        short: "Kyle", hdcp: 0  },
    { id: "MJ", name: "Michael Jones",     short: "Mike", hdcp: 18 },
    { id: "WT", name: "William Templeton", short: "Will", hdcp: 4  },
    { id: "JT", name: "John Templeton",    short: "John", hdcp: 0  },
  ],

  // ── Rounds ────────────────────────────────────────────────
  // One object per round played. Add rounds as season progresses.
  // roundMoney is in dollars. pts is raw wolf points.
  rounds: [
    {
      round:  1,
      date:   "May 17, 2026",
      course: "Fields Ranch West",
      scores: {
        KS: { pts: 16,  roundMoney:  160, gross: 75, net: 75, holeWins: 8,  holeLosses: 6, holeHalves: 4, birdies: 3, eagles: 0, bogeys: 3,  doubles: 1, wolfHoles: 4, wolfWins: 4, wolfLosses: 0, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 0, blockerHoles: 0, blockerWins: 0, blockedWins: 0, hammerAcc: 3, hammerDec: 0 },
        MJ: { pts: 2,   roundMoney:   20, gross: 97, net: 79, holeWins: 10, holeLosses: 4, holeHalves: 4, birdies: 0, eagles: 0, bogeys: 8,  doubles: 5, wolfHoles: 4, wolfWins: 2, wolfLosses: 1, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 1, blockerHoles: 0, blockerWins: 0, blockedWins: 0, hammerAcc: 3, hammerDec: 0 },
        WT: { pts: 0,   roundMoney:    0, gross: 85, net: 81, holeWins: 5,  holeLosses: 9, holeHalves: 4, birdies: 0, eagles: 0, bogeys: 6,  doubles: 2, wolfHoles: 4, wolfWins: 3, wolfLosses: 2, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 0, blockerHoles: 0, blockerWins: 0, blockedWins: 0, hammerAcc: 3, hammerDec: 0 },
        JT: { pts: -18, roundMoney: -180, gross: 80, net: 80, holeWins: 5,  holeLosses: 9, holeHalves: 4, birdies: 1, eagles: 0, bogeys: 4,  doubles: 2, wolfHoles: 4, wolfWins: 0, wolfLosses: 3, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 0, blockerHoles: 1, blockerWins: 0, blockedWins: 0, hammerAcc: 3, hammerDec: 0 },
      }
    },
    // R2 — add after May 31 round
    // R3 — add after round 3
    // R4 — add after round 4
    // R5 — add after round 5
    // R6 — add after round 6
  ],

  // ── Pairings ──────────────────────────────────────────────
  // Season-long pairing stats. Update after each round.
  pairings: [
    { id: "JT.KS", p1: "JT", p2: "KS", seasonHoles: 0, seasonWins: 0, seasonLosses: 0, seasonHalves: 0, seasonPts: 0 },
    { id: "JT.MJ", p1: "JT", p2: "MJ", seasonHoles: 0, seasonWins: 0, seasonLosses: 0, seasonHalves: 0, seasonPts: 0 },
    { id: "JT.WT", p1: "JT", p2: "WT", seasonHoles: 0, seasonWins: 0, seasonLosses: 0, seasonHalves: 0, seasonPts: 0 },
    { id: "KS.MJ", p1: "KS", p2: "MJ", seasonHoles: 0, seasonWins: 0, seasonLosses: 0, seasonHalves: 0, seasonPts: 0 },
    { id: "KS.WT", p1: "KS", p2: "WT", seasonHoles: 0, seasonWins: 0, seasonLosses: 0, seasonHalves: 0, seasonPts: 0 },
    { id: "MJ.WT", p1: "MJ", p2: "WT", seasonHoles: 0, seasonWins: 0, seasonLosses: 0, seasonHalves: 0, seasonPts: 0 },
  ],

};

// ── Derived helpers (do not edit) ─────────────────────────────

// Current season rank by cumulative pts
SEASON.standings = SEASON.players.map(p => ({
  ...p,
  cumPts:    SEASON.rounds.reduce((s, r) => s + (r.scores[p.id]?.pts || 0), 0),
  cumMoney:  SEASON.rounds.reduce((s, r) => s + (r.scores[p.id]?.roundMoney || 0), 0),
  bankroll:  SEASON.config.startingBankroll + SEASON.rounds.reduce((s, r) => s + (r.scores[p.id]?.roundMoney || 0), 0),
  roundsPlayed: SEASON.rounds.length,
})).sort((a, b) => b.cumPts - a.cumPts)
   .map((p, i) => ({ ...p, rank: i + 1 }));

// Latest round
SEASON.latestRound = SEASON.rounds[SEASON.rounds.length - 1] || null;

// Rounds played count
SEASON.roundsPlayed = SEASON.rounds.length;
