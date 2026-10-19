export async function onRequestPost({ request, env }) {
  if (!env.DB) return Response.json({ error: 'Database belum terhubung. Hubungkan binding D1 dengan nama DB.' }, { status: 503 });
  let body; try { body = await request.json(); } catch { return Response.json({ error: 'Data tidak valid.' }, { status: 400 }); }
  const name = String(body.name || '').trim().slice(0, 100), attendance = String(body.attendance || ''), souvenir = String(body.souvenir || '');
  if (!name) return Response.json({ error: 'Nama wajib diisi.' }, { status: 400 });
  if (!['Hadir', 'Tidak hadir'].includes(attendance)) return Response.json({ error: 'Pilih konfirmasi kehadiran.' }, { status: 400 });
  if (!['Gelas', 'Cermin', 'Parfum'].includes(souvenir)) return Response.json({ error: 'Pilih suvenir.' }, { status: 400 });
  try { await env.DB.prepare('INSERT INTO rsvps (name, attendance, souvenir, created_at) VALUES (?, ?, ?, ?)').bind(name, attendance, souvenir, new Date().toISOString()).run(); return Response.json({ ok: true }, { status: 201 }); }
  catch { return Response.json({ error: 'Gagal menyimpan konfirmasi. Periksa tabel database D1.' }, { status: 500 }); }
}
