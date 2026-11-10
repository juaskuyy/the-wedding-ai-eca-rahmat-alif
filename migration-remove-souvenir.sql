-- Jalankan sekali di Cloudflare D1 Console untuk database yang sudah dipakai.
-- Data RSVP lama tetap dipertahankan; kolom souvenir dihapus.
CREATE TABLE rsvps_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('Hadir','Tidak hadir')),
  created_at TEXT NOT NULL
);
INSERT INTO rsvps_new (id, name, attendance, created_at)
SELECT id, name, attendance, created_at FROM rsvps;
DROP TABLE rsvps;
ALTER TABLE rsvps_new RENAME TO rsvps;
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at);
