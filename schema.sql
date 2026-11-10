CREATE TABLE IF NOT EXISTS rsvps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('Hadir','Tidak hadir')),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at);

CREATE TABLE IF NOT EXISTS guestbook (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  message TEXT NOT NULL CHECK (length(message) <= 500),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at);
