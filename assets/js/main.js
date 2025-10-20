

// === Header Show Time (non-destructive) ===
(function(){
  if (document.getElementById('show-time-top')) return;
  const nav = document.querySelector('#top-banner .nav');
  const wrap = document.querySelector('#top-banner .nav-wrap') || nav?.parentElement;
  if (!nav) return;
  const btn = document.createElement('button');
  btn.id = 'show-time-top';
  btn.className = 'button small';
  btn.textContent = 'Show Time';
  nav.appendChild(btn);
  const area = document.createElement('span');
  area.id = 'time-area-top';
  area.style.marginLeft = '0.5rem';
  (wrap || nav).appendChild(area);
  btn.addEventListener('click', () => {
    area.textContent = new Date().toLocaleTimeString();
  });
})();


// === Assignment 6: Full Features (non-destructive) ===
document.addEventListener('DOMContentLoaded', () => {
  // HEADER CONTROLS ---------------------------------------------------
  const nav = document.querySelector('#top-banner .nav');
  const wrap = document.querySelector('#top-banner .nav-wrap') || nav?.parentElement;

  // 1) Header Show Time button (already may exist)
  if (nav && !document.getElementById('show-time-top')) {
    const btn = document.createElement('button');
    btn.id = 'show-time-top';
    btn.className = 'button small';
    btn.textContent = 'Show Time';
    nav.appendChild(btn);
    const area = document.createElement('span');
    area.id = 'time-area-top';
    area.style.marginLeft = '0.5rem';
    (wrap || nav).appendChild(area);
    btn.addEventListener('click', () => {
      area.textContent = new Date().toLocaleTimeString();
    });
  }

  // 2) Header Subscribe button (next to Show Time)
  if (nav && !document.getElementById('open-modal-top')) {
    const btnS = document.createElement('button');
    btnS.id = 'open-modal-top';
    btnS.className = 'button small';
    btnS.textContent = 'Subscribe';
    nav.appendChild(btnS);
  }

  // 3) Theme toggle
  if (nav && !document.getElementById('theme-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'button small';
    btn.textContent = 'Theme';
    btn.style.marginLeft = '0.5rem';
    nav.appendChild(btn);
    btn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      chime();
    });
  }

  // 4) Language select (EN/RU/KZ) in header wrap
  if (wrap && !document.getElementById('lang-select')) {
    const sel = document.createElement('select');
    sel.id = 'lang-select';
    sel.innerHTML = `<option value="en">EN</option><option value="ru">RU</option><option value="kk">KZ</option>`;
    wrap.appendChild(sel);
    sel.addEventListener('change', (e) => {
      const v = e.target.value;
      switch (v) {
        case 'ru': setBannerText('Добро пожаловать в Tam Tam Food!'); break;
        case 'kk': setBannerText('Tam Tam Food-қа қош келдіңіз!'); break;
        default: setBannerText('Welcome to Tam Tam Food!');
      }
    });
  }

  // MODAL (Subscribe) -------------------------------------------------
  // Ensure modal in DOM
  if (!document.getElementById('modal')) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 id="modal-title">Subscribe</h3>
          <button id="close-modal" class="close" aria-label="Close" type="button">×</button>
        </div>
        <form id="subscribe-form" action="#" method="post">
          <div class="field">
            <label for="sub-email">Email</label>
            <input type="email" id="sub-email" name="email" placeholder="you@example.com" required>
          </div>
          <div style="margin-top:0.75rem; display:flex; gap:0.5rem; justify-content:flex-end;">
            <button type="button" id="close-modal-2" class="button">Cancel</button>
            <button type="submit" class="button">Subscribe</button>
          </div>
        </form>
      </div>`;
    document.body.appendChild(modal);
  }

  // Bind openers (both header and any existing in-page trigger)
  const modal = document.getElementById('modal');
  const openers = Array.from(document.querySelectorAll('#open-modal, #open-modal-top'));
  if (modal && openers.length) {
    const open = () => { modal.classList.add('show'); };
    const hide = () => { modal.classList.remove('show'); };
    openers.forEach(b => b.addEventListener('click', open));
    const btnX = document.getElementById('close-modal');
    const btnC = document.getElementById('close-modal-2');
    if (btnX) btnX.addEventListener('click', hide);
    if (btnC) btnC.addEventListener('click', hide);
    modal.addEventListener('click', (e) => { if (e.target === modal) hide(); });
  }

  // DOM MANIPULATION EXAMPLES ----------------------------------------
  // Stars rating on .menu-item
  document.querySelectorAll('.menu-item').forEach((item) => {
    if (item.querySelector('.stars')) return;
    const stars = document.createElement('div');
    stars.className = 'stars';
    for (let i=1;i<=5;i++) {
      const s = document.createElement('span');
      s.className = 'star';
      s.dataset.value = i;
      s.textContent = '★';
      stars.appendChild(s);
    }
    item.appendChild(stars);
  });
  document.querySelectorAll('.stars').forEach(wrapStars => {
    if (wrapStars.dataset.bound) return;
    wrapStars.dataset.bound = '1';
    wrapStars.addEventListener('click', (e) => {
      const t = e.target.closest('.star'); if (!t) return;
      const val = Number(t.dataset.value || 0);
      wrapStars.querySelectorAll('.star').forEach(st => st.classList.toggle('active', Number(st.dataset.value) <= val));
      pop(wrapStars); chime();
    });
  });

  // Read More on About
  if (!document.getElementById('readmore-btn')) {
    const box = document.querySelector('main .container') || document.querySelector('.section .container');
    if (box) {
      const extra = document.createElement('div');
      extra.className = 'readmore'; extra.id = 'readmore';
      extra.innerHTML = `<p>We source fresh ingredients and constantly iterate on our menu to keep it simple and high-quality.</p>`;
      const btn = document.createElement('button');
      btn.className = 'button small'; btn.id = 'readmore-btn'; btn.textContent = 'Read more';
      btn.addEventListener('click', () => {
        extra.classList.toggle('show');
        btn.textContent = extra.classList.contains('show') ? 'Read less' : 'Read more';
      });
      box.appendChild(btn); box.appendChild(extra);
    }
  }

  // Gallery main preview from thumbnails
  if (!document.getElementById('gallery-main')) {
    const g = document.querySelector('main .container') || document.querySelector('.section .container');
    if (g) {
      const box = document.createElement('div');
      box.id = 'gallery-main'; box.innerHTML = `<img alt="Preview" />`;
      g.prepend(box);
      const big = box.querySelector('img');
      const starter = document.querySelector('.gallery img, .grid-gallery img, img');
      if (starter && big && starter.getAttribute('src')) big.src = starter.getAttribute('src');
      document.querySelectorAll('.gallery img, .grid-gallery img, .section img').forEach(img => {
        img.addEventListener('click', () => { if (big && img.src){ big.src = img.src; pop(big); chime(); } });
      });
    }
  }

  // EVENTS ------------------------------------------------------------
  // Content Show Time (leave existing; do not remove)
  if (!document.getElementById('show-time')) {
    const c = document.querySelector('main .container') || document.querySelector('.section .container');
    if (c) {
      const btn = document.createElement('button');
      btn.id = 'show-time'; btn.className = 'button small'; btn.textContent = 'Show Time';
      const area = document.createElement('span'); area.id = 'time-area'; area.style.marginLeft = '0.5rem';
      c.appendChild(btn); c.appendChild(area);
      btn.addEventListener('click', () => { area.textContent = new Date().toLocaleTimeString(); chime(); });
    }
  }

  // Keyboard navigation for header links
  const navLinks = Array.from(document.querySelectorAll('#top-banner .nav a'));
  navLinks.forEach((a, idx) => {
    a.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); navLinks[(idx+1)%navLinks.length]?.focus(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); navLinks[(idx-1+navLinks.length)%navLinks.length]?.focus(); }
    });
  });

  // Async contact submit via fetch (offline-safe)
  const contact = document.getElementById('contact-form');
  if (contact && !contact.dataset.enhanced) {
    contact.dataset.enhanced = '1';
    contact.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contact);
      fetch('data:application/json,{"ok":true}', { method:'POST', body:fd })
        .then(()=> new Promise(res=> setTimeout(res, 400)))
        .then(()=> { showToast('Message sent successfully!'); chime(); contact.reset(); })
        .catch(()=> { showToast('Message sent (offline simulation).'); });
    });
  }

  // SWITCH demo: greeting by time
  const hours = new Date().getHours();
  let greeting = '';
  switch (true) {
    case hours < 12: greeting = 'Good morning'; break;
    case hours < 18: greeting = 'Good afternoon'; break;
    default: greeting = 'Good evening';
  }
  setBannerText(greeting + ' — enjoy our specials!');

  // ADVANCED: Objects/Arrays/HOF (Specials + Cart) -------------------
  if (!document.getElementById('specials')) {
    const target = document.querySelector('main .container') || document.querySelector('.section .container');
    if (target) {
      const sec = document.createElement('section');
      sec.id = 'specials';
      sec.innerHTML = `<h2 class="section-title">Specials of the Day <span class="badge">A6</span></h2><div class="row"></div><div id="cart-total" class="muted"></div>`;
      target.appendChild(sec);

      const specials = [
        { id: 1, name: 'Classic Burger', price: 2500, tag: 'burger' },
        { id: 2, name: 'Veggie Delight', price: 2300, tag: 'veggie' },
        { id: 3, name: 'Fries Box', price: 1200, tag: 'sides' },
        { id: 4, name: 'Iced Tea', price: 900, tag: 'drinks' },
      ];
      const cart = {
        items: [],
        add(i){ this.items.push(i); showToast(`${i.name} added`); chime(); },
        total(){ return this.items.map(x=>x.price).reduce((a,b)=>a+b,0); }
      };

      // Filter buttons
      const filters = document.createElement('div');
      filters.style.display='flex'; filters.style.gap='8px'; filters.style.margin='0.5rem 0';
      ['all','burger','veggie','sides','drinks'].forEach(cat => {
        const b=document.createElement('button');
        b.className='button small'; b.textContent=cat;
        b.addEventListener('click', ()=> render(cat==='all'? specials : specials.filter(x=>x.tag===cat)));
        filters.appendChild(b);
      });
      sec.prepend(filters);

      function render(list){
        const row = sec.querySelector('.row');
        if (!row) return;
        row.innerHTML = list.map(i => `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong>${i.name}</strong>
              <span>${i.price} KZT</span>
            </div>
            <div style="margin-top:.4rem; display:flex; gap:.5rem;">
              <button class="button small" data-add="${i.id}">Add</button>
            </div>
          </div>`).join('');
        row.querySelectorAll('[data-add]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = Number(btn.getAttribute('data-add'));
            const found = specials.find(x=>x.id===id);
            if (found){ cart.add(found); btn.classList.add('pop'); setTimeout(()=>btn.classList.remove('pop'),250); }
            const total = document.getElementById('cart-total'); if (total) total.textContent = `Total: ${cart.total()} KZT`;
          });
        });
      }
      render(specials);
    }
  }

  // UTILS: Toast, Sound, Small anim ----------------------------------
  function showToast(msg){
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div'); t.id='toast';
      Object.assign(t.style, {
        position:'fixed', bottom:'16px', right:'16px', background:'rgba(0,0,0,.8)',
        color:'#fff', padding:'10px 14px', borderRadius:'10px', zIndex:'1000', transition:'opacity .2s ease'
      });
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.opacity = '1';
    setTimeout(()=> t.style.opacity = '0', 1200);
  }
  function pop(el){ el.classList.add('pop'); setTimeout(()=>el.classList.remove('pop'),250); }
  function chime(){ try{ const ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(); const g=ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type='sine'; o.frequency.value=880; g.gain.setValueAtTime(0.07, ctx.currentTime); o.start(); o.stop(ctx.currentTime+0.08); }catch(e){} }

  // Helper: banner text
  window.setBannerText = window.setBannerText || function(txt){
    let banner = document.getElementById('welcome-banner');
    if (!banner) {
      const container = document.querySelector('main .container') || document.querySelector('.section .container');
      if (container) { banner = document.createElement('div'); banner.id='welcome-banner'; banner.className='card'; banner.style.margin='0.75rem 0'; container.prepend(banner); }
    }
    if (banner) banner.textContent = txt;
  };
});
