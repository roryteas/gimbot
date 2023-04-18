export const getBosses = async (ign) => {
  const player = await hiscores.getStats(ign);
  const bosses = player.main.bosses;
  return bosses;
};

export const getBoss = async (ign, boss) => {
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

export default getTeamBossKC;
