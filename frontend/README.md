# Capstone Frontend

Frontend untuk aplikasi Capstone menggunakan React, TypeScript, dan neo-brutalism UI.

## Struktur Kode dengan ESLint dan Prettier

Proyek ini menggunakan ESLint dan Prettier untuk memastikan kualitas kode dan konsistensi format. Berikut adalah fitur yang telah dikonfigurasi:

### ESLint

ESLint dikonfigurasi dengan aturan-aturan untuk React, TypeScript, dan praktik terbaik JavaScript untuk memastikan kode yang berkualitas. Konfigurasi ESLint mencakup:

- Plugin React dan React Hooks
- Plugin TypeScript
- Integrasi dengan Prettier

### Prettier

Prettier digunakan untuk memformat kode secara otomatis dan memastikan konsistensi gaya kode. Konfigurasi Prettier meliputi:

- Single quotes untuk string
- Tab width 2 spasi
- Semicolon di akhir statement
- Trailing comma untuk object dan array

## Cara Penggunaan

### Script yang Tersedia

- `npm start` - Menjalankan aplikasi dalam mode development
- `npm run build` - Build aplikasi untuk production
- `npm run lint` - Memeriksa kode dengan ESLint
- `npm run lint:fix` - Memperbaiki masalah ESLint yang dapat diperbaiki secara otomatis
- `npm run format` - Memformat kode dengan Prettier
- `npm run format:check` - Memeriksa format kode dengan Prettier
- `npm run type-check` - Memeriksa tipe TypeScript
- `npm run validate` - Menjalankan linting, type checking, dan format checking

### VS Code Settings

Kami telah menyertakan konfigurasi VS Code untuk meningkatkan pengalaman pengembangan:

- Format on Save diaktifkan
- Perbaikan otomatis dari ESLint pada saat menyimpan file
- Konfigurasi formatter untuk berbagai jenis file

## UI Design

Proyek ini menggunakan desain Neo-Brutalism dengan karakteristik:

- Border tebal dengan shadow yang jelas
- Warna-warna kontras dan berani
- Tipografi yang tegas
- Interaksi UI yang responsif

## Halaman

- Login - untuk autentikasi user
- Register - untuk pendaftaran user baru
- Dashboard - halaman utama setelah login

## API Integration

Proyek ini terintegrasi dengan backend Strapi untuk autentikasi dan manajemen data. 