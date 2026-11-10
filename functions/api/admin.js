export async function onRequestGet({ request, env }) {
  if (!env.DB) return Response.json({error:'Database belum terhubung.'},{status:503});
  const token = new URL(request.url).searchParams.get('token');
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) return Response.json({error:'Unauthorized.'},{status:401});
  try {
    const [rsvpData, guestbookData] = await Promise.all([
      env.DB.prepare('SELECT id,name,attendance,created_at FROM rsvps ORDER BY id DESC LIMIT 500').all(),
      env.DB.prepare('SELECT id,name,message,created_at FROM guestbook ORDER BY id DESC LIMIT 500').all()
    ]);
    return Response.json({count:rsvpData.results.length,results:rsvpData.results,guestbook:guestbookData.results});
  } catch {
    return Response.json({error:'Tabel guestbook belum tersedia. Jalankan migration-guestbook.sql di D1.'},{status:503});
  }
}
