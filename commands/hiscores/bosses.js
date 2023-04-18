const { SlashCommandBuilder } = require("discord.js");
const { getTeamBossKC } = require("../../functions/hiscores/bossesFetch");

const choices = [
  { name: "Barrows Chests", value: "barrows" },
  { name: "Cerberus", value: "cerberus" },
  { name: "Chambers Of Xeric", value: "chambersOfXeric" },
  { name: "Commander Zilyana", value: "commanderZilyana" },
  { name: "Dagannoth Prime", value: "dagannothPrime" },
  { name: "Dagannoth Rex", value: "dagannothRex" },
  { name: "Dagannoth Supreme", value: "dagannothSupreme" },
  { name: "General Graardor", value: "generalGraardor" },
  { name: "Giant Mole", value: "giantMole" },
  { name: "Kalphite Queen", value: "kalphiteQueen" },
  { name: "King Black Dragon", value: "kingBlackDragon" },
  { name: "Kraken", value: "kraken" },
  { name: "Kreearra", value: "kreeArra" },
  { name: "K'ril Tsutsaroth", value: "krilTsutsaroth" },
  { name: "Mimic", value: "mimic" },
  { name: "Phantom Muspah", value: "phantomMuspah" },
  { name: "Sarachnis", value: "sarachnis" },
  { name: "The Corrupted Gauntlet", value: "corruptedGauntlet" },
  { name: "Thermonuclear Smoke Devil", value: "thermonuclearSmokeDevil" },
  { name: "Tombs of Amascut", value: "tombsOfAmascut" },
  { name: "TzTok-Jad", value: "tzTokJad" },
  { name: "Venenatis", value: "venenatis" },
  { name: "Vetion", value: "vetion" },
  { name: "Vorkath", value: "vorkath" },
  { name: "Zulrah", value: "zulrah" },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bosses")
    .setDescription("Get boss kc for all team members for a specific boss")
    .addStringOption((option) =>
      option
        .setName("boss")
        .setDescription("The boss to get stats for")
        .setRequired(true)
        .addChoices(...choices)
    ),
  async execute(interaction) {
    await interaction.reply("Fetching kc...");
    try {
      const igns = [
        "Jeremy Wells",
        "Jason Faafoi",
        "HilaryBarry",
        "Suzy Cato",
        "SuzannePaul",
      ];
      const boss = interaction.options.getString("boss");
      const bossStats = await getTeamBossKC(boss);
      var message = `Boss: ${boss}\n`;
      igns.forEach((ign) => {
        message += `${ign}: ${bossStats[ign]}\n`;
      });
      message += `Total: ${bossStats.Total}`;
      await interaction.editReply(message);
    } catch (error) {
      console.log(error);
      await interaction.editReply(message);
    }
  },
};
