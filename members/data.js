// ─────────────────────────────────────────────────────────────
// Season 0 — data.js
// Single source of truth for all site pages.
// Lives at: season0.pro/members/data.js (protected)
// Update after each round — paste new round block into rounds array.
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
  rounds: [
    {
      round:  1,
      date:   "May 17, 2026",
      course: "Fields Ranch West",
      scores: {
        KS: { pts: 16,  roundMoney:  160, gross: 75, net: 75, holeWins: 8,  holeLosses: 6, holeHalves: 4, birdies: 3, eagles: 0, bogeys: 6,  doubles: 0, wolfHoles: 4, wolfWins: 4, wolfLosses: 0, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 0, blockerHoles: 0, blockerWins: 0, blockedWins: 0, hammerAcc: 4, hammerDec: 0 },
        MJ: { pts: 2,   roundMoney:   20, gross: 97, net: 79, holeWins: 10, holeLosses: 4, holeHalves: 4, birdies: 0, eagles: 0, bogeys: 5,  doubles: 9, wolfHoles: 4, wolfWins: 2, wolfLosses: 1, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 1, blockerHoles: 0, blockerWins: 0, blockedWins: 0, hammerAcc: 4, hammerDec: 0 },
        WT: { pts: 0,   roundMoney:    0, gross: 85, net: 81, holeWins: 5,  holeLosses: 9, holeHalves: 4, birdies: 0, eagles: 0, bogeys: 9,  doubles: 2, wolfHoles: 5, wolfWins: 3, wolfLosses: 2, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 0, blockerHoles: 0, blockerWins: 0, blockedWins: 0, hammerAcc: 4, hammerDec: 0 },
        JT: { pts: -18, roundMoney: -180, gross: 80, net: 80, holeWins: 5,  holeLosses: 9, holeHalves: 4, birdies: 1, eagles: 0, bogeys: 7,  doubles: 1, wolfHoles: 5, wolfWins: 0, wolfLosses: 2, soloWins: 0, loneWins: 0, blindWins: 0, blockedHoles: 0, blockerHoles: 1, blockerWins: 0, blockedWins: 0, hammerAcc: 4, hammerDec: 0 },
      }
    },
    // ── Paste R2 block here after May 31 round ──
  ],

  // ── Pairings ──────────────────────────────────────────────
  // Updated from Pairings_Data sheet after R1
  pairings: [
    { id: "JT.KS", p1: "JT", p2: "KS", seasonHoles: 3,  seasonWins: 1, seasonLosses: 2, seasonHalves: 0, seasonPts: -2  },
    { id: "JT.MJ", p1: "JT", p2: "MJ", seasonHoles: 6,  seasonWins: 3, seasonLosses: 2, seasonHalves: 1, seasonPts: -16 },
    { id: "JT.WT", p1: "JT", p2: "WT", seasonHoles: 8,  seasonWins: 1, seasonLosses: 5, seasonHalves: 2, seasonPts: -18 },
    { id: "KS.MJ", p1: "KS", p2: "MJ", seasonHoles: 8,  seasonWins: 5, seasonLosses: 1, seasonHalves: 2, seasonPts: 18  },
    { id: "KS.WT", p1: "KS", p2: "WT", seasonHoles: 6,  seasonWins: 2, seasonLosses: 3, seasonHalves: 1, seasonPts: 16  },
    { id: "MJ.WT", p1: "MJ", p2: "WT", seasonHoles: 3,  seasonWins: 2, seasonLosses: 1, seasonHalves: 0, seasonPts: 2   },
  ],

};

// ── Derived helpers (auto-calculated — do not edit) ───────────

SEASON.standings = SEASON.players.map(p => ({
  ...p,
  cumPts:      SEASON.rounds.reduce((s, r) => s + (r.scores[p.id]?.pts || 0), 0),
  cumMoney:    SEASON.rounds.reduce((s, r) => s + (r.scores[p.id]?.roundMoney || 0), 0),
  bankroll:    SEASON.config.startingBankroll + SEASON.rounds.reduce((s, r) => s + (r.scores[p.id]?.roundMoney || 0), 0),
  roundsPlayed: SEASON.rounds.length,
})).sort((a, b) => b.cumPts - a.cumPts)
   .map((p, i) => ({ ...p, rank: i + 1 }));

SEASON.latestRound   = SEASON.rounds[SEASON.rounds.length - 1] || null;
SEASON.roundsPlayed  = SEASON.rounds.length;

SEASON.playerTotals = (id) => ({
  cumPts:       SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.pts || 0), 0),
  cumMoney:     SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.roundMoney || 0), 0),
  bankroll:     SEASON.config.startingBankroll + SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.roundMoney || 0), 0),
  avgGross:     SEASON.rounds.length ? (SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.gross || 0), 0) / SEASON.rounds.length).toFixed(1) : 0,
  avgNet:       SEASON.rounds.length ? (SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.net || 0), 0) / SEASON.rounds.length).toFixed(1) : 0,
  totalBirdies: SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.birdies || 0), 0),
  totalEagles:  SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.eagles || 0), 0),
  wolfWins:     SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.wolfWins || 0), 0),
  wolfLosses:   SEASON.rounds.reduce((s, r) => s + (r.scores[id]?.wolfLosses || 0), 0),
});
