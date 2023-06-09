const express = require("express");
const app = express();
const hiscores = require("osrs-json-hiscores");
const Discord = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const { getTeamBossKC } = require("./functions/hiscores/bossesFetch");
const { getTeamSkill } = require("./functions/hiscores/skillsFetch");

// port env or 3000
const port = process.env.PORT || 3000;
const token = process.env.TOKEN;

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const prefix = "!";

const igns = [
  "Jeremy Wells",
  "Jason Faafoi",
  "HilaryBarry",
  "Suzy Cato",
  "SuzannePaul",
];

const getTotal = async (ign) => {
  const player = await hiscores.getStats(ign);
  const total = player.main.overall;
  return [total.level];
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (message.content.startsWith(prefix)) {
    try {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (command === "bosses") {
        message.channel.send("Fetching boss kc... won't be a sec king 👑");
        const boss = args[0];
        console.log(boss);
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

      try {
        if (command === "help") {
          message.channel.send(
            "Commands: \n !bosses <boss> \n !stats <skill> \n !stats overall"
          );
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      message.channel.send(" Something went wrong, unluggy bol. 🍆💦😳");
    }
  }
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction);
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

client.login(token);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = {
  igns,
};
