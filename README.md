# Capstone Project

Proyek ini terdiri dari aplikasi frontend React.js (TypeScript) dan backend Strapi CMS (dengan dukungan TypeScript).

## Struktur Proyek

```
capstone-project/
├── frontend/      # Aplikasi React.js dengan TypeScript
├── backend/       # Strapi CMS dengan dukungan TypeScript
└── README.md      # Dokumentasi proyek
```

## Persyaratan Sistem

- Node.js:
  - Frontend: Versi terbaru (rekomendasi)
  - Backend: Node.js v18.x (wajib untuk Strapi)
- npm 6.x atau lebih baru
- TypeScript 4.9.x atau lebih baru

## Cara Menjalankan Proyek

### Persiapan Awal

1. Pastikan NVM (Node Version Manager) terinstal di sistem Anda. Jika belum, jalankan script:
   ```
   ./install-nodejs.sh
   ```
   
   Script ini akan:
   - Menginstal NVM jika belum ada
   - Menginstal Node.js v18.18.2 untuk backend Strapi

2. Setup proyek dengan menjalankan:
   ```
   ./setup-project.sh
   ```
   
   Script ini akan:
   - Menyiapkan frontend dengan dependensi React+TypeScript
   - Menginisialisasi backend Strapi dengan dukungan TypeScript

### Menjalankan Aplikasi

#### Cara Mudah (dengan script)

1. Jalankan frontend:
   ```
   ./run-frontend.sh
   ```

2. Jalankan backend (dalam terminal terpisah):
   ```
   ./run-backend.sh
   ```

#### Cara Manual

1. Frontend:
   ```
   cd frontend
   nvm use node  # Gunakan versi Node.js terbaru
   npm start
   ```

2. Backend:
   ```
   cd backend
   nvm use 18    # Gunakan Node.js v18 untuk Strapi
   npm run develop
   ```

### Akses Aplikasi

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend Strapi: [http://localhost:1337/admin](http://localhost:1337/admin)

## Pengembangan

### Frontend

- React components berada di `frontend/src/components/`
- Halaman berada di `frontend/src/pages/`
- Aset berada di `frontend/src/assets/`
- Services untuk komunikasi API berada di `frontend/src/services/`
- Fungsi utility berada di `frontend/src/utils/`

### Backend

- API endpoints dapat dikonfigurasi melalui panel admin Strapi
- Database menggunakan SQLite secara default (dapat diubah di konfigurasi)

## Fitur TypeScript

Proyek ini memanfaatkan TypeScript untuk memberikan:

- Type safety dan autocomplete
- Interface untuk model data
- Type checking saat development
- Lebih mudah untuk maintenance dan refactoring

## Deployment

1. Frontend:
   ```
   cd frontend
   npm install
   npm run start
   ```

2. Backend:
   ```
   cd backend
   npm run build
   npm start
   (Sisanya nanti bakalan di run di tmp-strapi)
   ```
3. Run Strapi:
   ```
   cd tmp-strapi
   npm run develop
   ```

   ### Screenshots

   1. When ketika lu nyobain run npm run develop
   ![Strapi Admin](https://raw.githubusercontent.com/Ridzz05/asset-gambar/refs/heads/main/Screenshot%20from%202025-04-22%2000-30-01.png?token=GHSAT0AAAAAAC4TF54T6AAYWKCUNUMFBUPI2AGQUFQ)

   2. Btw ini workspace nya. Simple kan? :p
   ![](https://raw.githubusercontent.com/Ridzz05/asset-gambar/refs/heads/main/Screenshot%20from%202025-04-22%2000-30-16.png?token=GHSAT0AAAAAAC4TF54SBRKBP3JH6OQX5VSC2AGQU7A)

## Troubleshooting

- **Masalah Versi Node.js**: Strapi membutuhkan Node.js v18.x. Pastikan Anda beralih ke versi yang tepat menggunakan `nvm use 18` saat bekerja dengan backend.
- **Masalah SQLite**: Jika ada masalah dengan SQLite saat menjalankan Strapi, coba install development headers: `sudo apt-get install libsqlite3-dev` (Ubuntu/Debian). # Capstone-Web-2025-MRizki-Algipari
