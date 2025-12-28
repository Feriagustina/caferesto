# Kuliner Semarang Asik ⚡

Platform kurasi kuliner terbaik di Semarang. Temukan referensi cafe, restoran, dan street food pilihan influencer terpercaya.

## Fitur Utama

- **Pencarian & Filter Canggih**: Cari berdasarkan nama, kategori, harga, dan tag (Instagramable, Keluarga, dll).
- **Rekomendasi Terkurasi**: Data kuliner pilihan dengan rating dan review.
- **Promo Terbaru**: Informasi promo dan diskon terkini.
- **Peta Kuliner**: Integrasi dengan Google Maps untuk navigasi mudah.
- **Responsive Design**: Tampilan optimal di Desktop dan Mobile.

## Teknologi yang Digunakan

- React.js + Vite
- Tailwind CSS
- Lucide React (Icons)
- Framer Motion (Animasi)

## Cara Menjalankan Project Secara Lokal

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/landingpage_cafe_resto.git
   cd landingpage_cafe_resto
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

## Panduan Deploy ke Vercel

### Langkah 1: Upload ke GitHub
1. Buat repository baru di [GitHub](https://github.com/new).
2. Jalankan perintah berikut di terminal project Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username-anda/nama-repo-anda.git
   git push -u origin main
   ```

### Langkah 2: Deploy di Vercel
1. Buka [Vercel](https://vercel.com) dan login (bisa pakai akun GitHub).
2. Klik tombol **"Add New..."** > **"Project"**.
3. Di bagian **"Import Git Repository"**, cari repository yang baru saja Anda buat dan klik **"Import"**.
4. Di halaman konfigurasi:
   - **Framework Preset**: Vite (biasanya otomatis terdeteksi).
   - **Root Directory**: `./` (biarkan default).
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `dist` (default).
5. Klik **"Deploy"**.
6. Tunggu proses build selesai. Selamat! Website Anda sudah online.

---
© 2024 Kuliner Semarang Asik.
