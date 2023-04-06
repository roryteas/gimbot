const express = require("express");
const app = express();
const hiscores = require("osrs-json-hiscores");
const Discord = require("discord.js");
require("dotenv").config();

// port env or 3000
const port = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

client.login(token);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
