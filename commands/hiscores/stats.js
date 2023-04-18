const { SlashCommandBuilder } = require("discord.js");

const { getTeamSkill } = require("../../functions/hiscores/skillsFetch.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get stats for all team members for a skill")
    .addStringOption((option) =>
      option
        .setName("skill")
        .setDescription("The skill to get stats for")
        .setRequired(true)
        .addChoices(
          { name: "Total", value: "overall" },
          { name: "Attack", value: "attack" },
          { name: "Defence", value: "defence" },
          { name: "Strength", value: "strength" },
          { name: "Hitpoints", value: "hitpoints" },
          { name: "Ranged", value: "ranged" },
          { name: "Prayer", value: "prayer" },
          { name: "Magic", value: "magic" },
          { name: "Cooking", value: "cooking" },
          { name: "Woodcutting", value: "woodcutting" },
          { name: "Fletching", value: "fletching" },
          { name: "Fishing", value: "fishing" },
          { name: "Firemaking", value: "firemaking" },
          { name: "Crafting", value: "crafting" },
          { name: "Smithing", value: "smithing" },
          { name: "Mining", value: "mining" },
          { name: "Herblore", value: "herblore" },
          { name: "Agility", value: "agility" },
          { name: "Thieving", value: "thieving" },
          { name: "Slayer", value: "slayer" },
          { name: "Farming", value: "farming" },
          { name: "Runecrafting", value: "runecrafting" },
          { name: "Hunter", value: "hunter" },
          { name: "Construction", value: "construction" }
        )
    ),
  async execute(interaction) {
    await interaction.reply("Fetching stats...");
    try {
      const igns = [
        "Jeremy Wells",
        "Jason Faafoi",
        "HilaryBarry",
        "Suzy Cato",
        "SuzannePaul",
      ];
      const skill = interaction.options.getString("skill");
      const stats = await getTeamSkill(skill);
      var message = `Skill: ${skill}\n`;
      igns.forEach((ign) => {
        message += `${ign}: ${stats[ign]}\n`;
      });
      message += `Total: ${stats.Total}`;
      await interaction.editReply(message);
    } catch (error) {
      console.log(error);
      await interaction.editReply(message);
    }
  },
};
