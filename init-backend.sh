#!/bin/bash

# Masuk ke direktori backend
cd "$(dirname "$0")/backend"

# Menggunakan npx untuk membuat proyek Strapi baru
echo "Membuat proyek Strapi baru..."
npx create-strapi-app@latest . --quickstart --no-run --typescript

# Menambahkan informasi tambahan untuk mendukung TypeScript
echo "Memperbarui package.json untuk mendukung TypeScript..."
sed -i 's/"dependencies": {/"dependencies": {\n    "typescript": "^4.9.5",/g' package.json

echo "Menambahkan devDependencies untuk TypeScript..."
sed -i '/"license":/i \  "devDependencies": {\n    "@types/node": "^20.10.5",\n    "ts-node": "^10.9.2"\n  },' package.json

echo "Backend Strapi telah diinisialisasi dengan TypeScript!" 