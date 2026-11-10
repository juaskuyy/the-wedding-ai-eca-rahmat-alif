
const $=s=>document.querySelector(s);
// Personalized invitation recipient from URL: ?to=Nama%20Tamu
const invitedName = new URLSearchParams(window.location.search).get('to');
if (invitedName) {
  const cleanName = invitedName.replace(/[<>]/g, '').trim().slice(0, 100);
  if (cleanName) {
    const greeting = $('#guestGreeting');
    greeting.textContent = `Kepada Yth. ${cleanName}`;
    greeting.hidden = false;
    const nameInput = $('#guestName');
    if (nameInput) nameInput.value = cleanName;
    document.title = `Undangan untuk ${cleanName} — Ai Eca & Rahmat Alif`;
  }
}
const MAP_URL='https://maps.app.goo.gl/6uacdMQvnE8VaueG8?g_st=ac';
$('#openInvite').addEventListener('click',()=>{document.querySelector('.floral-bg').scrollIntoView({behavior:'smooth'});const a=$('#bgMusic');a.play().then(()=>$('#musicToggle').innerHTML='♫ <span>Jeda</span>').catch(()=>{});});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const qr=$('#locationQr');qr.src='https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=4&data='+encodeURIComponent(MAP_URL);qr.onerror=()=>qr.style.display='none';
$('#copyAccount').addEventListener('click',async()=>{const v=$('#accountNumber').textContent.trim();try{await navigator.clipboard.writeText(v)}catch(e){const t=document.createElement('textarea');t.value=v;document.body.append(t);t.select();document.execCommand('copy');t.remove()}$('#copyStatus').textContent='Nomor rekening disalin.'});
$('#musicToggle').addEventListener('click',async()=>{const a=$('#bgMusic'),b=$('#musicToggle');if(a.paused){try{await a.play();b.innerHTML='♫ <span>Jeda</span>'}catch(e){alert('Belum ada file musik. Tambahkan file assets/music.mp3 terlebih dahulu.')}}else{a.pause();b.innerHTML='♫ <span>Musik</span>'}});

async function loadGuestbook(){
  const list=$('#guestbookList');
  if(!list)return;
  try{
    const r=await fetch('/api/guestbook',{cache:'no-store'});
    const data=await r.json();
    if(!r.ok)throw new Error(data.error||'Ucapan belum dapat dimuat.');
    const rows=data.results||[];
    list.innerHTML=rows.length?rows.map(x=>`<article class="guestbook-item"><strong>${escapeHtml(x.name)}</strong><p>${escapeHtml(x.message)}</p><small>${new Date(x.created_at).toLocaleString('id-ID')}</small></article>`).join(''):'<p class="guestbook-empty">Belum ada ucapan. Jadilah yang pertama memberikan doa!</p>';
  }catch(e){list.innerHTML='<p class="guestbook-empty">Ucapan belum dapat dimuat. Silakan refresh halaman.</p>';}
}
function escapeHtml(value){
  return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
loadGuestbook();

$('#rsvpForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const form=e.currentTarget,msg=$('#rsvpMessage'),btn=form.querySelector('button[type=submit]');
  const payload=Object.fromEntries(new FormData(form).entries());
  btn.disabled=true;btn.textContent='Mengirim…';msg.textContent='';
  try{
    const r=await fetch('/api/rsvp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await r.json();
    if(!r.ok)throw new Error(data.error||'Konfirmasi gagal disimpan.');
    msg.textContent='Terima kasih! RSVP dan ucapan berhasil dikirim.';
    form.reset();
    await loadGuestbook();
  }catch(err){
    msg.textContent=err.message.includes('Failed to fetch')?'Database belum aktif. Periksa pengaturan Cloudflare D1.':err.message;
  }finally{
    btn.disabled=false;btn.innerHTML='Kirim RSVP &amp; Ucapan <span>↗</span>';
  }
});
