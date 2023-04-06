const express = require("express");

const app = express();
const Discord = require("discord.js");
require("dotenv").config();

const token = process.env.TOKEN;

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

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

const getSkills = async (ign) => {
  const player = await hiscores.getStats(ign);
  const stats = player.main.skills;
  return stats;
};

const getAllSkills = async (ign) => {
  const skills = await getSkills(ign);
  const allSkills = Object.keys(skills).map((skill) => {
    return {
      skill: skill,
      level: skills[skill].level,
      xp: skills[skill].xp,
    };
  });
  return allSkills;
};

const getSkill = async (ign, skill) => {
  const skills = await getSkills(ign);
  return skills[skill].level;
};

const getTotal = async (ign) => {
  const player = await hiscores.getStats(ign);
  const total = player.main.overall;
  return [total.level];
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
    const kc = await getBoss(ign, boss);
    if (kc !== -1) {
      teamkc[ign] = kc;
      teamkc.Total += kc;
    }
  }

  return teamkc;
};

const prefix = "!"; // The prefix for your bot commands

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  try {
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (command === "bosses") {
        message.channel.send("Fetching boss kc... won't be a sec king 👑");
        const boss = args[0];
        const bosses = await getTeamBossKC(boss);
        message.channel.send(`Boss: ${boss}`);
        var messagevar = "";
        igns.forEach((ign) => {
          messagevar += `${ign}: ${bosses[ign]} \n`;
        });
        message.channel.send(messagevar);
        message.channel.send(`Total: ${bosses.Total}`);
      }

      if (command === "stats") {
        message.channel.send("Fetching stats... won't be a sec king 👑");
        const skill = args[0];
        const stats = await getTeamSkill(skill);
        message.channel.send(`Skill: ${skill}`);
        igns.forEach((ign) => {
          message.channel.send(`${ign}: ${stats[ign]}`);
        });
        message.channel.send(`Total: ${stats.Total}`);
      }

      if (command == "catan") {
        message.channel.send("Catan is a game for nerds?");
      }

      if (command === "26Julio") {
        message.channel.send(
          "El 26 de Julio se celebra el dia de la independencia de Chile"
        );
      }

      if (command === "king") {
        //get the user with the highest total level
        var highestTotal = 0;
        var highestTotalIGN = "";
        const stats = await getTeamSkill("overall");
        igns.forEach((ign) => {
          if (stats[ign] > highestTotal) {
            highestTotal = stats[ign];
            highestTotalIGN = ign;
          }
        });
        message.channel.send(
          `King is ${highestTotalIGN} with ${highestTotal} total level`
        );
      }

      if (command === "help") {
        message.channel.send(
          "Commands: \n !bosses <boss> \n !stats <skill> \n !stats overall"
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
});

client.login(token);
