### Installing

Now we've finished with the prerequisites now we need to install and configure the bot.

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
Edit the config.toml file and place your token in the appropriate slot.  
> Windows Users: Don't use notepad as this will mess up the toml file. I recommend [Notepad++](https://notepad-plus-plus.org/)

Back on the website click 'Generate OAuth2 Url'  
From the list tick the administrator box  
Click copy then paste in the join link box of settings.json  
Also paste the link into your browser, this wil invite the bot to your server. Your bot will appear offline, don't worry this is normal.  
In the discord app, open your user settings then select appearance and turn on developer mode.  
Go back to a text channel.  
Next to the chat there is a list of names, right click yours and click 'Copy ID'  
Paste this in the owner id section of settings.json  
Complete the rest of config.toml, For more help with customization [Click Here](configuration.md)

Now run ```pm2 start app.js --name ChatBot```  
To automaticly run the bot on start up do ```pm2 startup``` follow the on screen instuctions then run ```pm2 save```
> If you get an error check your settings.json with [this](http://json.parser.online.fr/) if its not json related raise an issue on github