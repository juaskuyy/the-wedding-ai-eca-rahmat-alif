(() => {
  const c = window.WEDDING_CONFIG || {};
  document.title = c.pageTitle || 'Undangan Pernikahan';
  document.querySelectorAll('[data-text]').forEach(el => {
    const key = el.dataset.text;
    if (c[key] !== undefined && c[key] !== '') el.textContent = c[key];
  });
  const guest = new URLSearchParams(location.search).get('to');
  if (guest) document.getElementById('guestName').textContent = guest.replace(/[<>]/g, '').slice(0, 100);
  else if (c.guestName) document.getElementById('guestName').textContent = c.guestName;
  const mapBtn = document.getElementById('mapsButton');
  if (c.mapsUrl) mapBtn.href = c.mapsUrl;

  const cover = document.getElementById('cover');
  document.getElementById('openInvitation').addEventListener('click', () => {
    cover.classList.add('opened');
    document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
    const music = document.getElementById('bgMusic');
    if (c.musicFile) {
      music.src = c.musicFile;
      music.play().then(() => { document.getElementById('musicPill').hidden = false; document.getElementById('musicLabel').textContent = 'Jeda musik'; }).catch(() => { document.getElementById('musicPill').hidden = false; });
    }
  });
  const music = document.getElementById('bgMusic');
  document.getElementById('musicToggle').addEventListener('click', () => {
    if (!music.src) { alert('Musik belum dipilih. Isi musicFile di config.js dan tambahkan file audio ke folder assets.'); return; }
    if (music.paused) music.play().then(() => document.getElementById('musicLabel').textContent = 'Jeda musik');
    else { music.pause(); document.getElementById('musicLabel').textContent = 'Putar musik'; }
  });
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const target = new Date(c.countdownDate || '2027-01-01T08:00:00+07:00').getTime();
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    let diff = target - Date.now();
    if (!Number.isFinite(target)) return;
    if (diff <= 0) {
      ['days','hours','minutes','seconds'].forEach(id => document.getElementById(id).textContent = '00');
      document.getElementById('countdownMessage').textContent = 'Hari bahagia telah tiba.';
      return;
    }
    const d = Math.floor(diff / 86400000); diff %= 86400000;
    const h = Math.floor(diff / 3600000); diff %= 3600000;
    const m = Math.floor(diff / 60000); diff %= 60000;
    const s = Math.floor(diff / 1000);
    document.getElementById('days').textContent = pad(d);
    document.getElementById('hours').textContent = pad(h);
    document.getElementById('minutes').textContent = pad(m);
    document.getElementById('seconds').textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);

  document.getElementById('rsvpForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim();
    const attendance = document.getElementById('attendance').value;
    const count = document.getElementById('guestCount').value;
    if (!name) return;
    const message = `Assalamu'alaikum, saya ${name}. Konfirmasi kehadiran: ${attendance}. Jumlah tamu: ${count}. Terima kasih.`;
    const number = String(c.whatsappNumber || '').replace(/\D/g, '');
    if (!number || number === '6280000000000') {
      alert('Nomor WhatsApp belum diatur. Silakan isi whatsappNumber di config.js.\n\nPesan konfirmasi:\n' + message);
      return;
    }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
})();
