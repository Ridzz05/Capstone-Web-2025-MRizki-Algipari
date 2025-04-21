#!/bin/bash

echo "===== Instalasi Node.js untuk Capstone Project ====="

# Cek apakah NVM sudah terinstal
if ! command -v nvm &> /dev/null; then
    echo "NVM belum terinstal. Menginstal NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Reload shell untuk mengaktifkan NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
else
    echo "NVM sudah terinstal"
fi

# Memastikan NVM aktif
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Menginstal Node.js v18 (untuk backend Strapi)
echo "Menginstal Node.js v18.18.2 (LTS) untuk backend Strapi..."
nvm install 18.18.2

# Cek instalasi
echo "Node.js v18.18.2 berhasil diinstal:"
nvm use 18.18.2
node -v

echo ""
echo "Sekarang Anda dapat menggunakan Node.js v18.18.2 untuk menjalankan backend Strapi."
echo ""
echo "Cara menggunakan:"
echo "1. Untuk beralih ke Node.js v18: nvm use 18"
echo "2. Untuk menjalankan backend: cd backend && npm install && npm run develop"
echo "3. Untuk menjalankan frontend: cd frontend && npm install && npm start"
echo ""
echo "CATATAN: Anda juga dapat menggunakan scripts yang telah dibuat:"
echo "- ./setup-project.sh (untuk setup awal)"
echo "- ./run-frontend.sh (untuk menjalankan frontend)"
echo "- ./run-backend.sh (untuk menjalankan backend)" 