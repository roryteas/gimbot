const express = require("express");
const app = express();
const hiscores = require("osrs-json-hiscores");
const Discord = require("discord.js");
require("dotenv").config();

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

const prefix = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    try {
      if (command === "help") {
        message.channel.send(
          "Commands: \n !bosses <boss> \n !stats <skill> \n !stats overall"
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

client.login(token);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
