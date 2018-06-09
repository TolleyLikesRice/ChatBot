These are the commands that are currently implemented into ChatBot

> <Command\> - Required [Command] - Optional

Permlevels: 
* 1 = Everyone
* 2 = Moderator
* 3 = Admin
* 4 = Owner

| Command | Description | Default Permlevel | Module |
| --- | --- | --- | --- |
| help \[Command\] | Shows you all the commands or the specific details of a command | 1 | Main |
| ping | Pings the bot | 0 | Main |
| 8ball <Question\> | Gives you a magic 8ball response | 1 | Fun |
| random <number1> <number2> | Generates a random number between number1 and number2 | 1 | Fun |
| ban <@User\> <Reason\> | Bans the mentioned user. | 4 | Moderation |
| kick <@User\> <Reason\> | Kicks the mentioned user. | 3 | Moderation |
| mute <@User> <Reason\> | Mutes or unmutes the mentioned user | 2 | Moderation |
| unban <@User\> <Reason\> | Unbans the mentioned user. | 3 | Moderation |
| warn <@User\> <Reason\> | Issues a warning to the mentioned user. | 2 | Moderation |
| lockdown <duration\> | This will lock a channel down for the set duration, be it in hours, minutes or seconds. | 3 | Server Management |
| purge <Number\> | Deletes X amount of messages from a given channel. | 2 | Server Management |
| reload <Command\> | Reloads the command file, if its been updated or modified. | 4 | Bot Management |
| setgame <Game\> | Sets the game that the bot is playing. | 4 | Bot Management |
