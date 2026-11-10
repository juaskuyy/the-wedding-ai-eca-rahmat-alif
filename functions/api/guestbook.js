export async function onRequestGet({ env }) {
  if (!env.DB) return Response.json({ error: 'Database D1 belum terhubung.' }, { status: 503 });
  try {
    const { results } = await env.DB.prepare('SELECT id, name, message, created_at FROM guestbook ORDER BY id DESC LIMIT 100').all();
    return Response.json({ results });
  } catch {
    return Response.json({ error: 'Tabel guestbook belum dibuat. Jalankan migration-guestbook.sql di D1.' }, { status: 503 });
  }
}
