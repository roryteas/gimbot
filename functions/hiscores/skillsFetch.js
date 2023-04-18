const igns = [
  "Jeremy Wells",
  "Jason Faafoi",
  "HilaryBarry",
  "Suzy Cato",
  "SuzannePaul",
];
const hiscores = require("osrs-json-hiscores");
const getSkills = async (ign) => {
  const player = await hiscores.getStats(ign);
  const stats = player.main.skills;
  return stats;
};

const getSkill = async (ign, skill) => {
  const skills = await getSkills(ign);
  return skills[skill].level;
};

const getTeamSkill = async (skill) => {
  const teamskill = {
    "Jeremy Wells": 0,
    "Jason Faafoi": 0,
    HilaryBarry: 0,
    "Suzy Cato": 0,
    SuzannePaul: 0,
    Total: 0,
  };

  for (const ign of igns) {
    console.log(skill);
    const level = await getSkill(ign, skill);
    if (skill !== -1) {
      teamskill[ign] = level;
      teamskill.Total += level;
    }
  }

  return teamskill;
};

module.exports = {
  getTeamSkill,
};
