These instructions will help you get ChatBot up and running on your system.

### Installing Prerequisites

To run ChatBot you need: Node.js, NPM Package Manager and PM2.

#### Raspberry Pi

**WARNING: BACKUP YOUR SD CARD BEFORE INSTALLING, THERE IS A LOW CHANCE THAT THIS WILL CORUPT YOUR SD CARD**
You will need:  
Raspberry Pi 2/3/3B+ with the latest Raspbian [(get here)](https://www.raspberrypi.org/downloads/) installed  
A Windows/Mac with Putty or somesort of other ssh client installed.  

Once connected via ssh run the following commands:
```bash
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
Now continue to the installing step.

#### Windows

Download and install the LTS version of Node.JS from https://nodejs.org/en/  
Now Download and install git from https://git-scm.com/downloads  
Open a command prompt and navigate to a folder to install the bot using ```cd foldername```  
Now run ```git clone https://github.com/TolleyB-J/ChatBot```  

Now you are ready to continue to the installing step.

