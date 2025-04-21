#!/bin/bash

# Pastikan NVM sudah terinstal dan aktif di shell saat ini
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Ini akan memuat NVM

if ! command -v nvm &> /dev/null; then
    echo "NVM tidak ditemukan. Silakan instal NVM terlebih dahulu:"
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    exit 1
fi

# Pindah ke direktori backend
cd backend

# Gunakan versi Node.js 18 untuk backend (kompatibel dengan Strapi)
nvm use 18
echo "Menggunakan Node.js $(node -v) untuk backend Strapi"

# Cek apakah backend sudah diinisialisasi
if [ ! -d "node_modules" ]; then
    echo "Backend belum diinisialisasi. Silakan jalankan setup-project.sh terlebih dahulu."
    exit 1
fi

# Jalankan Strapi dalam mode pengembangan
echo "Menjalankan Strapi CMS..."
npm run develop 