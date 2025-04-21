#!/bin/bash

# Pastikan NVM sudah terinstal dan aktif di shell saat ini
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Ini akan memuat NVM

if ! command -v nvm &> /dev/null; then
    echo "NVM tidak ditemukan. Silakan instal NVM terlebih dahulu:"
    echo "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
    exit 1
fi

# Memastikan versi node yang diperlukan tersedia
echo "Memastikan Node.js versi 18 tersedia untuk backend..."
nvm install 18

# Setup Frontend
echo "===== Setup Frontend ====="
cd frontend

# Gunakan node versi terbaru untuk frontend
nvm use node
echo "Menggunakan Node.js $(node -v) untuk frontend"

# Install dependencies
echo "Menginstall dependencies frontend..."
npm install

cd ..

# Setup Backend
echo "===== Setup Backend ====="

# Cek apakah folder backend/node_modules sudah ada
if [ ! -d "backend/node_modules" ]; then
    echo "Mempersiapkan backend Strapi dengan TypeScript..."
    
    # Menggunakan node v18 untuk backend
    nvm use 18
    echo "Menggunakan Node.js $(node -v) untuk backend"
    
    # Membuat struktur awal Strapi di backend
    cd backend
    echo "Menginisialisasi proyek Strapi baru..."
    npx create-strapi-app@latest . --quickstart --no-run --typescript
    
    # Tambahkan dukungan TypeScript tambahan
    echo "Memperbarui package.json untuk dukungan TypeScript tambahan..."
    npm install typescript@4.9.5 @types/node@20.10.5 ts-node@10.9.2 --save-dev
    
    cd ..
else
    echo "Backend sudah diinisialisasi sebelumnya."
fi

echo ""
echo "===== Proyek Berhasil Dipersiapkan ====="
echo ""
echo "Untuk menjalankan frontend:"
echo "cd frontend && nvm use node && npm start"
echo ""
echo "Untuk menjalankan backend:"
echo "cd backend && nvm use 18 && npm run develop"
echo ""
echo "CATATAN: Backend memerlukan Node.js versi 18 untuk kompatibilitas Strapi" 