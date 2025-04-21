# Capstone Project

Proyek ini terdiri dari aplikasi frontend React.js (TypeScript) dan backend Strapi CMS (dengan dukungan TypeScript).

### Akses Aplikasi

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend Strapi: [http://localhost:1337/admin](http://localhost:1337/admin)

### Frontend

- React components ada di `frontend/src/components/`
- Page ada di `frontend/src/pages/`
- Aset ada di `frontend/src/assets/`
- Services untuk API Communicationnya ada di `frontend/src/services/`
- Utility function ada di `frontend/src/utils/` kalo ga salah

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

   ### Skrinsut

   1. When ketika lu ngerun `npm run develop`
   ![Strapi Admin](https://github.com/Ridzz05/asset-gambar/blob/main/Screenshot%20from%202025-04-22%2000-30-01.png?raw=true)

   2. Btw ini workspace nya. Simple kan? :p
   ![Workspace](https://github.com/Ridzz05/asset-gambar/blob/main/Screenshot%20from%202025-04-22%2000-30-16.png?raw=true)

4. Asset Gambar Lainnya bisa di cek di :
```
https://github.com/Ridzz05/asset-gambar
```
## Troubleshooting

- **Masalah Versi Node.js**: Strapinya gabakalan run kalo pake node latest version, so i decide to choose node versi 18 > `nvm use 18`.
- **Masalah SQLite**: Jika ada masalah dengan SQLite saat menjalankan Strapi, coba install development headers: `sudo apt-get install libsqlite3-dev` (Ubuntu/Debian). # Capstone-Web-2025-MRizki-Algipari

## Saya malas pake OS Jendela soo i choose Zorin OS(This OS only for coding btw) Cheers. hope you guys give me a plus Score kkk.

## Dev Note 

> "Why I Choose Zorin OS for Development? 💻

I prefer using Zorin OS for my development environment because:

- Optimized for coding and development
- Clean and distraction-free interface
- Better performance for development tools
- Native support for development packages
- Beautiful UI/UX that enhances productivity

This project was developed with ❤️ using Zorin OS(Ga ngaruh sih).

---
*Created by M Rizki Algipari - 2025*