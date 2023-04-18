const hiscores = require("osrs-json-hiscores");

const igns = [
  "Jeremy Wells",
  "Jason Faafoi",
  "HilaryBarry",
  "Suzy Cato",
  "SuzannePaul",
];

const getBosses = async (ign) => {
  const player = await hiscores.getStats(ign);
  const bosses = player.main.bosses;
  return bosses;
};

const getBoss = async (ign, boss) => {
  const bosses = await getBosses(ign);
  return bosses[boss].score;
};

const getTeamBossKC = async (boss) => {
  const teamkc = {
    "Jeremy Wells": 0,
    "Jason Faafoi": 0,
    HilaryBarry: 0,
    "Suzy Cato": 0,
    SuzannePaul: 0,
    Total: 0,
  };

  for (const ign of igns) {
    console.log(ign);
    const kc = await getBoss(ign, boss);
    if (kc !== -1) {
      teamkc[ign] = kc;
      teamkc.Total += kc;
    }
  }

  return teamkc;
};

module.exports = {
  getTeamBossKC,
};
