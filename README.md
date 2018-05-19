# ChatBot

ChatBot

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

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
During ```npm install``` you may get some warnings just ignore them.

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
Close settings.
Next to the chat there is a list of names, right click yours and click 'Copy ID'
Paste this in the owner id section of settings.json
Fill

Now run ```pm2 start app.js --name ChatBot```
To automaticly run on start up do ```pm2 startup``` follow the on screen instuctions then run ```pm2 save```


## Built With

* Node.js
* NPM
* Discord.js

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgment

* Thanks to [An Idiots Guide] (https://www.youtube.com/channel/UCLun-hgcYUgNvCCj4sIa-jA) for tutorials on discord.js
