export async function onRequestGet({ request, env }) {
 if (!env.DB) return Response.json({error:'Database belum terhubung.'},{status:503});
 const token = new URL(request.url).searchParams.get('token');
 if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) return Response.json({error:'Unauthorized.'},{status:401});
 const {results}=await env.DB.prepare('SELECT id,name,attendance,souvenir,created_at FROM rsvps ORDER BY id DESC LIMIT 500').all();
 return Response.json({count:results.length,results});
}
