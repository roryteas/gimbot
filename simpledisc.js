const express = require("express");
const hiscores = require("osrs-json-hiscores");
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

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  try {
    if (command === "help") {
      message.channel.send(
        "Commands: \n !bosses <boss> \n !stats <skill> \n !stats overall"
      );
    }
  } catch (err) {
    console.log(err);
  }
});

client.login(token);
