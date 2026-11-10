-- Jalankan satu kali di Cloudflare D1 Console.
-- Tidak menghapus atau mengubah data RSVP yang sudah ada.
CREATE TABLE IF NOT EXISTS guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL CHECK (length(message) <= 500),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at);
