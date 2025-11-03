
document.addEventListener('submit', function(ev){
  var f = ev.target;
  if (!f) return;
  if (f.id === 'subscribe-form') {
    ev.preventDefault();
    try { showToast('Subscribed!'); } catch(e) {}
    try {
      var modal = document.getElementById('modal');
      if (modal) modal.classList.remove('show');
    } catch(e){}
    try { f.reset(); } catch(e){}
  }
}, true);



(function(){


  document.addEventListener('submit', function(ev){
    var f = ev.target;
    if (f && f.id === 'apply-form') {
      ev.preventDefault();
      try { showToast('We will apply your CV.'); } catch(e) {}
      try { if (typeof chime === 'function') chime(); } catch(e) {}
      try { f.reset(); } catch(e) {}
    }
  }, true);
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      if (document.body) { document.body.classList.add('theme-dark'); }
      else document.addEventListener('DOMContentLoaded', function(){ document.body.classList.add('theme-dark'); });
    }
  } catch(e) {}

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



document.addEventListener('DOMContentLoaded', () => {

  const nav = document.querySelector('#top-banner .nav');
  const wrap = document.querySelector('#top-banner .nav-wrap') || nav?.parentElement;

  //время
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

  // пыдпыска
  if (nav && !document.getElementById('open-modal-top')) {
    const btnS = document.createElement('button');
    btnS.id = 'open-modal-top';
    btnS.className = 'button small';
    btnS.textContent = 'Subscribe';
    nav.appendChild(btnS);
  }

  // тема
  if (nav && !document.getElementById('theme-toggle')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.className = 'button small';
    btn.textContent = 'Theme';
    btn.style.marginLeft = '0.5rem';
    nav.appendChild(btn);
    btn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      try {
        localStorage.setItem('theme', document.body.classList.contains('theme-dark') ? 'dark' : 'light');
      } catch(e) {}
      chime();
    });
  }

  //лангуаге
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

  // рид море
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


  const navLinks = Array.from(document.querySelectorAll('#top-banner .nav a'));
  navLinks.forEach((a, idx) => {
    a.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); navLinks[(idx+1)%navLinks.length]?.focus(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); navLinks[(idx-1+navLinks.length)%navLinks.length]?.focus(); }
    });
  });


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


  const hours = new Date().getHours();
  let greeting = '';
  switch (true) {
    case hours < 12: greeting = 'Good morning'; break;
    case hours < 18: greeting = 'Good afternoon'; break;
    default: greeting = 'Good evening';
  }
  setBannerText(greeting + ' — enjoy our specials!');


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


  function showToast(msg){
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div'); t.id='toast';
      Object.assign(t.style, {
        position:'fixed', bottom:'16px', right:'16px',
        background:'rgba(0,0,0,.88)', color:'#fff',
        padding:'12px 16px', borderRadius:'12px',
        zIndex:'2147483647', transition:'opacity .25s ease',
        boxShadow:'0 8px 24px rgba(0,0,0,.35)', pointerEvents:'none',
        display:'block', opacity:'0'
      });
      document.body.appendChild(t);
    }
    t.textContent = msg; t.style.opacity = '1';
    setTimeout(()=> t.style.opacity = '0', 2400);
  }
  function pop(el){ el.classList.add('pop'); setTimeout(()=>el.classList.remove('pop'),250); }
  function chime(){ try{ const ctx=new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(); const g=ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type='sine'; o.frequency.value=880; g.gain.setValueAtTime(0.07, ctx.currentTime); o.start(); o.stop(ctx.currentTime+0.08); }catch(e){} }


  window.setBannerText = window.setBannerText || function(txt){
    let banner = document.getElementById('welcome-banner');
    if (!banner) {
      const container = document.querySelector('main .container') || document.querySelector('.section .container');
      if (container) { banner = document.createElement('div'); banner.id='welcome-banner'; banner.className='card'; banner.style.margin='0.75rem 0'; container.prepend(banner); }
    }
    if (banner) banner.textContent = txt;
  };
});

$(function () {

  if (!document.getElementById('as7-copy-style')) {
    $('head').append(`
      <style id="as7-copy-style">
        .menu-item{ position: relative; }            /* чтобы кнопка позиционировалась */
        .as7-copy{
          position:absolute; top:8px; right:8px;
          padding:6px 10px; font-size:12px; line-height:1;
          border:1px solid #ddd; border-radius:8px; background:#fff; cursor:pointer;
          box-shadow:0 2px 6px rgba(0,0,0,.06);
        }
        .as7-copy:active{ transform: translateY(1px); }
      </style>
    `);
  }


  $('.menu-grid .menu-item').each(function(){
    const $card = $(this);
    if ($card.find('.as7-copy').length) return;

    const $btn = $('<button type="button" class="as7-copy" aria-label="Copy">Copy</button>');
    $card.append($btn);
  });


  $(document).on('click', '.as7-copy', async function(){
    const $card = $(this).closest('.menu-item');
    const name = $card.find('h3').first().text().trim() || 'Item';
    try {
      await navigator.clipboard.writeText(name);
      if ($.as7Toast) $.as7Toast('Copied: ' + name, 1500);
      else alert('Copied: ' + name);
    } catch(e){

      const $ta = $('<textarea style="position:absolute;left:-9999px"></textarea>').val(name).appendTo('body');
      $ta[0].select();
      document.execCommand('copy');
      $ta.remove();
      if ($.as7Toast) $.as7Toast('Copied: ' + name, 1500);
      else alert('Copied: ' + name);
    }
  });
});





(function(){
  var form = document.getElementById('contact-form');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  if (!btn) return;


  if (!document.getElementById('contact-spinner-style')) {
    var st = document.createElement('style');
    st.id = 'contact-spinner-style';
    st.textContent = '.spinner{display:inline-block;width:1em;height:1em;border:.15em solid currentColor;border-right-color:transparent;border-radius:50%;vertical-align:-.125em;animation:spin .7s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}';
    document.head.appendChild(st);
  }

  form.addEventListener('submit', function(ev){

    if (typeof form.checkValidity === 'function' && !form.checkValidity()) { return; }
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
    if (!btn.dataset.originalText) btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending...';
  }, { once: true });
})();



(function(){
  var form = document.getElementById('apply-form');
  if (!form) return;
  form.addEventListener('submit', function(ev){
    ev.preventDefault();

    if (typeof form.checkValidity === 'function' && !form.checkValidity()) return;
    showToast('We will apply your CV.');
    try { if (typeof chime === 'function') chime(); } catch(e){}
    form.reset();
  });
})();


  (function(){
    var f = document.getElementById('apply-form');
    if (f && f.getAttribute('action') !== 'javascript:void(0)') {
      try { f.setAttribute('action','javascript:void(0)'); } catch(e){}
      try { f.setAttribute('method','get'); } catch(e){}
    }
  })();



(function(){
  var f = document.getElementById('subscribe-form');
  if (!f) return;
  try { f.setAttribute('action','javascript:void(0)'); f.setAttribute('method','get'); } catch(e){}
  f.addEventListener('submit', function(ev){
    ev.preventDefault();
    try { showToast('Subscribed!'); } catch(e) {}
    try {
      var modal = document.getElementById('modal');
      if (modal) modal.classList.remove('show');
    } catch(e){}
    try { f.reset(); } catch(e){}
  });
})();



(function(){ 
  function ready(fn){ if (document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){ 
    try {
      var grid = document.querySelector('.menu-grid');
      if (!grid) return; 


      var sec = document.createElement('section');
      sec.id = 'dish-search';
      sec.className = 'section';
      sec.innerHTML = ''
        + '<div class="container ttf-card" style="margin-bottom:1rem">'
        + '  <label for="dish-search-input" style="display:block;font-weight:600;margin:0 0 8px">Search dishes</label>'
        + '  <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">'
        + '    <input id="dish-search-input" type="search" placeholder="Type a dish name..." '
        + '      style="flex:1;min-width:220px;padding:.5rem .75rem;border:1px solid #ddd;border-radius:10px" />'
        + '    <button id="dish-search-btn" class="button" type="button">Find</button>'
        + '    <span id="dish-search-info" class="text-muted" style="margin-left:.5rem"></span>'
        + '  </div>'
        + '</div>';


      var container = grid.closest('.container') || grid.parentElement;
      if (container) { container.parentElement.insertBefore(sec, container); }
      else { grid.parentElement.insertBefore(sec, grid); }


      var items = Array.prototype.slice.call(grid.querySelectorAll('.menu-item'));
      function norm(t){ return (t||'').toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}+/gu,''); }
      function textOf(item){
        var name = item.querySelector('h3')?.textContent || '';
        var desc = item.querySelector('p')?.textContent || '';
        return (name + ' ' + desc);
      }
      var store = items.map(function(it){
        return { el: it, text: norm(textOf(it)) };
      });

      var input = document.getElementById('dish-search-input');
      var btn   = document.getElementById('dish-search-btn');
      var info  = document.getElementById('dish-search-info');

      function apply(q){
        var qn = norm(q).trim();
        var shown = 0;
        if (!qn) {

          store.forEach(function(s){ s.el.style.display = ''; });
          info.textContent = '';
          return;
        }

        store.forEach(function(s){
          var ok = s.text.indexOf(qn) !== -1;
          s.el.style.display = ok ? '' : 'none';
          if (ok) shown++;
        });
        info.textContent = shown + ' found';
        try { if (window.showToast) showToast('Found ' + shown + ' for "' + q + '"'); } catch(e){}

        var emptyId = 'dish-search-empty';
        var empty = document.getElementById(emptyId);
        if (shown === 0) {
          if (!empty) {
            empty = document.createElement('div');
            empty.id = emptyId;
            empty.className = 'ttf-card';
            empty.style.marginTop = '.5rem';
            empty.innerHTML = '<p>No dishes match your query.</p>';
            grid.parentElement.insertBefore(empty, grid.nextSibling);
          }
        } else if (empty) {
          empty.remove();
        }
      }

      function run(){
        apply(input.value);
      }
      input.addEventListener('input', run);
      btn.addEventListener('click', run);


      var params = new URLSearchParams(location.search);
      var seed = params.get('search') || params.get('q') || '';
      if (seed) { input.value = seed; apply(seed); }
    } catch(err){ console.error(err); }
  });
})();
