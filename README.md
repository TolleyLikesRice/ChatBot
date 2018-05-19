# ChatBot

ChatBot is a W.I.P All-In-One bot. I am aiming to add everything from Memes to Admin commands. It is designed to be highly configurable and to be as configurable as possible.

Features (So far):
* Moderation (kick, ban, mute)
* Server Managment (purge, lockdown)

To-Do:
* Add more customization
* Add module system
* Add more fun commands
* Fix setgame command
* Youtube video post feed

## Contents
* [ChatBot](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#chatbot)
* [Getting Started](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#getting-started)
  * [Installing Prerequisites](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#installing-prerequisites)
    * [Raspberry Pi](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#raspberry-pi)
    * [Windows](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#windows)
    * [Mac](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#mac)
  * [Installing](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#installing)
* [Commands](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#commands)
* [Built With](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#built-with)
* [License](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#license)
* [Acknowledgment](https://github.com/TolleyB-J/ChatBot/blob/master/README.md#acknowledgment)

## Getting Started

These instructions will help you get ChatBot up and running on your system.

### Installing Prerequisites

To run ChatBot you need: Node.js, NPM Package Manager and PM2.

#### Raspberry Pi

**WARNING: BACKUP YOUR SD CARD BEFORE INSTALLING, THERE IS A LOW CHANCE THAT THIS WILL CORUPT YOUR SD CARD**
You will need:
Raspberry Pi 2/3/3B+ with the latest Raspbian [(get here)](https://www.raspberrypi.org/downloads/) installed
A Windows/Mac with [FileZilla] (https://filezilla-project.org/)and Putty or somesort of other ssh client installed.

Once connected via ssh run the following commands:
```
#Removing NodeRed
sudo apt purge node* npm*

#Installing Node
cd ~
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt install -y nodejs

#Check if node and npm are installed
node --version
npm --version

#Clone repo
cd ~
sudo apt install git
git clone https://github.com/TolleyB-J/ChatBot
cd ChatBot

```
Now contine to the installing step.

#### Windows

#### Mac

### Installing

Now we've finished with the prerequisites now for installing and configuring the bot.

Open a command line a navigate to the cloned folder and run the following commands
```
npm install -g pm2
npm install
```
> Note: During ```npm install``` you may get some warnings just ignore them.

Go to https://discordapp.com/developers/applications/me
Click on 'New App
Give your bot a name and press 'Create App'
Scroll down and click 'Create Bot User'
Tick Public Bot
Then next to token click 'Click to reveal' **WARNING: DO NOT SHOW YOUR TOKEN TO ANYONE, IF YOU ACCIDENTLY SHOW SOMEONE REGENERATE IT IMMEDIATELY**
Edit your settings.json file and place your token in the appropriate slot.
Back on the website click 'Generate OAuth2 Url'
From the list tick the administrator box
Click copy then paste in the join link box of settings.json
Also paste the link into your browser, this wil invite the bot to your server. Your bot will appear offline, don't worry this is normal.
In the discord app, open your user settings then select appearance and turn on developer mode.
Go back to a text channel.
Next to the chat there is a list of names, right click yours and click 'Copy ID'
Paste this in the owner id section of settings.json
Fill in the rest of the options, to obtain a role id type \@rolename then copy the **NUMBER ONLY** and paste in the id box.
Your done! Now your ready to start the bot.

Now run ```pm2 start app.js --name ChatBot```
To automaticly run the bot on start up do ```pm2 startup``` follow the on screen instuctions then run ```pm2 save```

## Commands

> <> - Required [] - Optional

* General
  * help \[Command\] - Shows you all the commands or the spesific details of a command
  * ping - Pings the bot.
* Fun
  * 8ball <Question\> - Gives you a magic 8ball responce
* Moderation
  * ban <@User\> <Reason\> - Bans the mentioned user.
  * kick <@User\> <Reason\> - Kicks the mentioned user.
  * mute <@User> <Reason\> - Mutes or unmutes the mentioned user.
  * unban <@User\> <Reason\> - Unbans the mentioned user.
  * warn <@User\> <Reason\> - Issues a warning to the mentioned user.
* Server Management
  * lockdown <duration\> - This will lock a channel down for the set duration, be it in hours, minutes or seconds.
  * purge <Number\> - Deletes X amount of messages from a given channel.
* Bot Management
  * reload <Command\> - Reloads the command file, if its been updated or modified.
  * setgame <Game\> - Sets the game that the bot is playing.
  
## Built With

* Node.js
* NPM
* Discord.js

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgment

* Thanks to [An Idiots Guide] (https://www.youtube.com/channel/UCLun-hgcYUgNvCCj4sIa-jA) for tutorials on discord.js
