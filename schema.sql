CREATE TABLE IF NOT EXISTS rsvps (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, attendance TEXT NOT NULL CHECK (attendance IN ('Hadir','Tidak hadir')), souvenir TEXT NOT NULL CHECK (souvenir IN ('Gelas','Cermin','Parfum')), created_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at);
