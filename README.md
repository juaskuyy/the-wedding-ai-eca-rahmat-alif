# Undangan Pernikahan — آي إيكا & نعمة الألف

Website responsif untuk GitHub + Cloudflare Pages, termasuk Cloudflare Pages Functions dan D1 untuk RSVP.

## Deploy
1. Upload seluruh isi folder ini ke repository GitHub.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git, lalu pilih repo. Framework preset **None**, build command kosong, output directory `.`.
3. Buat database D1 bernama `undangan-aieca-rsvp`; jalankan SQL dari `schema.sql` di D1 Console.
4. Di Pages → Settings → Functions, tambahkan D1 binding dengan variable name `DB` dan pilih database tersebut. Atur variable/secret `ADMIN_TOKEN` dengan token acak panjang.
5. Deploy ulang dan uji RSVP. Rekap admin: `/api/admin?token=TOKEN_ANDA` (jangan bagikan URL ini karena memuat token).

## Catatan
- RSVP tersimpan hanya setelah D1 dibuat dan binding `DB` aktif.
- Jadwal mengikuti data yang diberikan: akad 10.00–11.00, resepsi 09.00–selesai. Pastikan jam ini benar.
- Musik belum disediakan. Jika sudah ada file musik yang berhak digunakan, letakkan sebagai `assets/music.mp3`.
- QR lokasi dimuat dari layanan QR eksternal dengan tautan Google Maps yang diberikan.
- `assets/*reference.jpg` adalah screenshot referensi; aset background dan cover utama menggunakan gambar yang diberikan.

## Halaman Admin dan Link Undangan Personal
- Buka `https://DOMAIN-UNDANGAN/admin.html`, masukkan secret `ADMIN_TOKEN` untuk melihat daftar RSVP.
- Admin menampilkan total RSVP, jumlah hadir/tidak hadir, nama, dan waktu konfirmasi.
- Di bagian pembuat link, masukkan nama tamu lalu pilih Salin Link atau Bagikan ke WhatsApp.
- Link personal memakai parameter `?to=Nama`; halaman undangan akan menampilkan sapaan untuk nama tersebut dan mengisi nama pada formulir RSVP.
- Jangan bagikan `ADMIN_TOKEN` atau URL API admin kepada tamu.

## RSVP + Buku Ucapan
- Form RSVP dan ucapan berada pada satu halaman.
- Pengunjung mengisi nama, status hadir/tidak hadir, lalu ucapan dan doa.
- Data RSVP disimpan di tabel `rsvps`; ucapan disimpan di tabel `guestbook`.
- Untuk database yang sudah aktif, jalankan `migration-guestbook.sql` satu kali di D1 Console sebelum deploy source code terbaru.
- Daftar ucapan tampil di bawah form dan juga di dashboard `/admin`.
