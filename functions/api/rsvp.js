export async function onRequestPost({ request, env }) {
  if (!env.DB) return Response.json({ error: 'Database D1 belum terhubung.' }, { status: 503 });
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: 'Data tidak valid.' }, { status: 400 }); }
  const name = String(body.name || '').trim().slice(0, 100);
  const attendance = String(body.attendance || '');
  const message = String(body.message || '').trim().slice(0, 500);
  if (!name) return Response.json({ error: 'Nama wajib diisi.' }, { status: 400 });
  if (!['Hadir', 'Tidak hadir'].includes(attendance)) return Response.json({ error: 'Pilih konfirmasi kehadiran.' }, { status: 400 });
  if (!message) return Response.json({ error: 'Ucapan dan doa wajib diisi.' }, { status: 400 });
  const createdAt = new Date().toISOString();
  try {
    await env.DB.batch([
      env.DB.prepare('INSERT INTO rsvps (name, attendance, created_at) VALUES (?, ?, ?)').bind(name, attendance, createdAt),
      env.DB.prepare('INSERT INTO guestbook (name, message, created_at) VALUES (?, ?, ?)').bind(name, message, createdAt)
    ]);
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: 'Gagal menyimpan RSVP/ucapan. Pastikan migrasi guestbook sudah dijalankan di D1.' }, { status: 500 });
  }
}
