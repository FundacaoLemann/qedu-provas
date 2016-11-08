#!/usr/bin/env bash

# Update system
sudo apt-get update -y
sudo apt-get upgrade -q -y

# Install dependencies
sudo apt-get install curl -y

# Install Git
sudo apt-get install git -y

# Set Current Timezone
sudo timedatectl set-timezone America/Sao_Paulo

# Install & setup NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Install Node dependencie 6.9.1 through NVM
nvm install 6.9.1

npm i -g typescript
npm i -g angular-cli
npm i -g yarn	


