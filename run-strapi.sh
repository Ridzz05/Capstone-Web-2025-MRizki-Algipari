#!/bin/bash

# Export NVM directory
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# Beralih ke Node.js v18
nvm use 18

# Masuk ke direktori tmp-strapi
cd tmp-strapi

# Jalankan Strapi dalam mode pengembangan
npm run develop 