# Website Undangan Pernikahan — Garden Elegance

Website statis responsif untuk GitHub Pages atau Cloudflare Pages. Tidak memerlukan framework, build step, database, maupun Cloudflare Workers.

## Isi folder
- `index.html` — struktur seluruh halaman undangan.
- `style.css` — desain, animasi, responsivitas HP/desktop.
- `script.js` — buka undangan, animasi scroll, hitung mundur, musik, dan konfirmasi WhatsApp.
- `config.js` — tempat mengubah seluruh data pasangan/acara.
- `assets/` — tempat menaruh musik dan foto sendiri.

## Sebelum dipublikasikan
1. Buka `config.js` dan ganti nama, nama orang tua, tanggal, jam, alamat, URL Google Maps, nomor WhatsApp, serta tanggal countdown.
2. Untuk tautan undangan personal, gunakan query parameter, misalnya `https://domain-kamu.pages.dev/?to=Keluarga%20Bapak%20Andi`.
3. Tambahkan foto milik sendiri ke `assets/` bila ingin mengganti placeholder galeri. Versi awal menggunakan desain ilustratif CSS sehingga tetap tampil meski belum ada foto.
4. Musik bersifat opsional. Tambahkan file audio legal ke `assets/`, lalu isi `musicFile: "assets/musik.mp3"` di `config.js`. Musik baru dicoba setelah pengunjung menekan Buka Undangan, karena browser membatasi autoplay.
5. Uji semua tautan dan ejaan di ponsel sebelum membagikan link.

## Deploy ke GitHub + Cloudflare Pages

### A. Upload ke GitHub
1. Buat repository baru, misalnya `undangan-pernikahan`.
2. Upload `index.html`, `style.css`, `script.js`, `config.js`, `README.md`, dan folder `assets` ke root repository.
3. Commit perubahan.

### B. Deploy di Cloudflare Pages
1. Masuk ke Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pilih repository `undangan-pernikahan`.
3. Framework preset: **None**.
4. Build command: kosongkan.
5. Build output directory: `/` atau `.` (folder root repository, mengikuti opsi yang ditampilkan dashboard).
6. Klik **Save and Deploy**. Cloudflare akan memberi alamat `*.pages.dev`.
7. Untuk domain sendiri, buka project Pages → **Custom domains** → **Set up a custom domain**, lalu ikuti instruksi DNS Cloudflare.

## Catatan fitur
- Form RSVP saat ini membuka WhatsApp dengan teks yang telah disiapkan; data belum disimpan ke database.
- Musik tidak disertakan karena lagu belum dipilih.
- Data pada `config.js` masih placeholder dan harus diperbarui sebelum digunakan sebagai undangan sungguhan.


## Aset visual lokal
Folder `assets/` kini berisi ilustrasi SVG buatan khusus untuk tema garden wedding: `garden-cover.svg`, `floral-corner.svg`, `couple-illustration.svg`, dan tiga ilustrasi galeri. Semua aset visual ini disimpan lokal sehingga ikut ter-deploy di GitHub/Cloudflare Pages tanpa perlu hosting gambar eksternal. Folder `assets/music/` disediakan untuk lagu yang dipilih nanti; belum ada audio karena musik belum ditentukan.
