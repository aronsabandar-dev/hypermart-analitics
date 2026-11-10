# Hypermart Analytics v6 — Vercel Deployment

## Cara Deploy ke Vercel

### Opsi A: Deploy via GitHub (Recommended)

1. **Upload folder ini ke GitHub**
   - Buat repo baru di https://github.com/new
   - Upload semua file di folder ini

2. **Connect ke Vercel**
   - Login ke https://vercel.com
   - Klik **"Add New Project"**
   - Pilih repo GitHub yang baru dibuat
   - Klik **"Deploy"** — tidak perlu konfigurasi tambahan

3. **Selesai!** Vercel otomatis detect sebagai static site.

---

### Opsi B: Deploy via Vercel CLI (Drag & Drop)

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Masuk ke folder ini di terminal, lalu:
   ```
   vercel --prod
   ```

3. Ikuti instruksinya — akan dapat URL seperti:
   `https://hypermart-analytics.vercel.app`

---

### Opsi C: Deploy via Dashboard (Paling Mudah)

1. Zip seluruh isi folder ini
2. Buka https://vercel.com/new
3. Drag & drop file ZIP ke halaman tersebut
4. Deploy otomatis

---

## Setelah Deploy

### Koneksi Supabase
- Buka app → Settings → tab **"☁ Supabase Cloud"**
- Masukkan Supabase URL dan API Key
- Klik Connect

> Konfigurasi Supabase disimpan di localStorage browser.
> Setiap user/browser perlu connect ulang pertama kali.

### Struktur File
```
hypermart-vercel/
├── vercel.json          ← Konfigurasi Vercel
├── README.md            ← Panduan ini
└── public/
    └── index.html       ← Aplikasi utama
```
