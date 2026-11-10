export async function onRequestGet({ request, env }) {
  if (!env.DB) {
    return Response.json({ error: 'Database binding DB belum terbaca.' }, { status: 503 });
  }

  const expected = String(env.ADMIN_TOKEN || '').trim();
  if (!expected) {
    return Response.json({
      error: 'ADMIN_TOKEN belum terbaca oleh Pages Functions. Pastikan Secret dibuat pada environment Production di Settings > Functions > Variables and Secrets, lalu deploy ulang.'
    }, { status: 500 });
  }

  const supplied = String(new URL(request.url).searchParams.get('token') || '').trim();
  if (!supplied || supplied !== expected) {
    return Response.json({ error: 'Token tidak cocok. Periksa kembali nilai ADMIN_TOKEN yang dimasukkan.' }, { status: 401 });
  }

  try {
    const [rsvpData, guestbookData] = await Promise.all([
      env.DB.prepare('SELECT id,name,attendance,created_at FROM rsvps ORDER BY id DESC LIMIT 500').all(),
      env.DB.prepare('SELECT id,name,message,created_at FROM guestbook ORDER BY id DESC LIMIT 500').all()
    ]);
    return Response.json({
      count: rsvpData.results.length,
      results: rsvpData.results,
      guestbook: guestbookData.results
    });
  } catch {
    return Response.json({ error: 'Tabel guestbook belum tersedia. Jalankan migration-guestbook.sql di D1.' }, { status: 503 });
  }
}
