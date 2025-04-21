#!/bin/bash

# Pastikan NVM sudah terinstal dan aktif di shell saat ini
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Ini akan memuat NVM

if ! command -v nvm &> /dev/null; then
    echo "NVM tidak ditemukan. Silakan instal NVM terlebih dahulu:"
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    exit 1
fi

# Pindah ke direktori frontend
cd frontend

# Gunakan versi Node.js terbaru untuk frontend
nvm use node
echo "Menggunakan Node.js $(node -v) untuk frontend"

# Jalankan aplikasi frontend
echo "Menjalankan aplikasi React.js + TypeScript..."
npm start 