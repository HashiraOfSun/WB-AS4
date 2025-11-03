
function as7SafeInsert($sec){
  var $anchor = $('.menu-grid').first();
  if ($anchor.length) {
    $anchor.before($sec);
  } else {
    $('body').append($sec);
  }
}





(function(){
  function ready(fn){ 
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  ready(function(){

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/as7-jquery.css';
    document.head.appendChild(link);


    var barWrap = document.createElement('div');
    barWrap.id = 'as7-progress';
    barWrap.innerHTML = '<div class="bar"></div>';
    document.body.appendChild(barWrap);


    var toast = document.createElement('div');
    toast.id = 'as7-toast';
    document.body.appendChild(toast);


    function underProducts(section){
      var products = document.querySelector('.menu-grid');
      if (products && products.parentElement) {
        products.parentElement.insertBefore(section, products);
        return true;
      }

      (document.querySelector('main') || document.body).appendChild(section);
      return false;
    }


    function runWithJQ(){

      $(function(){ console.log("jQuery is ready! — AS7"); });


      var $bar = $('#as7-progress .bar');
      function onScroll(){
        var h = $(document).height() - $(window).height();
        var p = h > 0 ? ($(window).scrollTop() / h) * 100 : 0;
        $bar.css('width', p + '%');
      }
      $(window).on('scroll resize', onScroll);
      onScroll();


   
      $wrap.append($input).append($list);
      $sec.append($label).append($wrap);

      if ($products.length){
        $products.before($sec);
      } else {
        as7SafeInsert($sec);
      }


      function getNames(){
        return $('.menu-grid .menu-item h3').map(function(){ 
          return $(this).text().trim(); 
        }).get();
      }

      function highlight($el, term){
        var txt = $el.text();
        if (!term){ $el.html(txt); return; }
        var r = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ')', 'ig');
        $el.html(txt.replace(r, '<mark class="as7-hl">$1</mark>'));
      }

      function applyFilter(term){
        term = (term||'').trim().toLowerCase();
        $('.menu-grid .menu-item').each(function(){
          var $row = $(this);
          var $name = $row.find('strong');
          var name = $name.text().trim().toLowerCase();
          var show = !term || name.indexOf(term) !== -1;
          $row.toggle(show);
          highlight($name, term);
        });
      }


      function updateSuggest(term){
        var names = getNames();
        var t = (term||'').trim().toLowerCase();
        $list.empty();
        if (!t){ $list.hide(); return; }
        var hits = names.filter(n => n.toLowerCase().indexOf(t) !== -1).slice(0,6);
        if (!hits.length){ $list.hide(); return; }
        hits.forEach(function(n){
          var $it = $('<div class="as7-item"></div>').text(n);
          $it.on('click', function(){
            $input.val(n);
            $list.hide();
            applyFilter(n);
            $.as7Toast('Искали: ' + n);
          });
          $list.append($it);
        });
        $list.show();
      }

      $input.on('keyup input', function(){
        var v = $(this).val();
        applyFilter(v);
        updateSuggest(v);
      });
      $(document).on('click', function(e){
        if (!$(e.target).closest('#as7-suggest').length) $list.hide();
      });


      if (window.MutationObserver){
        var obs = new MutationObserver(function(){
          var v = $input.val();
          applyFilter(v);
          updateSuggest(v);
        });
        if ($products[0]) obs.observe($products[0], {childList:true, subtree:true});
      }


      var $stats = $(`
        <section id="as7-stats" class="ttf-section">
          <div class="as7-card"><div class="as7-number" data-target="1200">0</div><div class="as7-label">Orders served</div></div>
          <div class="as7-card"><div class="as7-number" data-target="350">0</div><div class="as7-label">Daily visitors</div></div>
          <div class="as7-card"><div class="as7-number" data-target="98">0</div><div class="as7-label">% Happy clients</div></div>
        </section>
      `);
      $('main').append($stats);

      function animateNumber($el){
        var target = parseInt($el.data('target'), 10) || 0;
        $({val:0}).animate({val:target}, {
          duration: 1200,
          easing: 'swing',
          step: function(now){ $el.text(Math.floor(now)); }
        });
      }

      function inView($el){
        var winTop = $(window).scrollTop(), winB = winTop + $(window).height();
        var top = $el.offset().top, bot = top + $el.outerHeight();
        return bot > winTop && top < winB;
      }
      function checkCounters(){
        $('.as7-number').each(function(){
          var $n = $(this);
          if (!$n.data('done') && inView($n)){
            $n.data('done', true);
            animateNumber($n);
          }
        });
      }
      $(window).on('scroll resize', checkCounters);
      checkCounters();


      var $form = $('.ttf-section form');
      $form.on('submit', function(){
        var $btn = $(this).find('button[type="submit"]');
        $btn.prop('disabled', true).data('orig', $btn.text()).text('Please wait…');
        var $sp = $('<span class="as7-spinner"></span>');
        $btn.append($sp);
        setTimeout(function(){
          $btn.prop('disabled', false).text($btn.data('orig'));
          $sp.remove();
        }, 1200);
      });


      $.as7Toast = function(msg){
        var $t = $('#as7-toast');
        $t.stop(true, true).text(msg).fadeIn(160).delay(1200).fadeOut(300);
      };


      var $copy = $(`
        <section id="as7-copy" class="ttf-section">
          <div class="as7-card">
            <div class="row">
              <div>Промокод:</div>
              <code id="as7-code">TAMTAM-FOOD-10</code>
              <button type="button" id="as7-btn-copy">Copy</button>
            </div>
          </div>
        </section>
      `);
      $('main').append($copy);
      $('#as7-btn-copy').on('click', async function(){
        try{
          await navigator.clipboard.writeText($('#as7-code').text());
          $(this).text('✓ Copied');
          $.as7Toast('Copied to clipboard!');
          setTimeout(()=> $(this).text('Copy'), 900);
        }catch(e){
          $.as7Toast('Copy failed');
        }
      });


      var $lazy = $(`
        <section class="ttf-section">
          <h3>Медиа (ленивая загрузка)</h3>
          <div id="as7-lazy"></div>
        </section>
      `);
      $('main').append($lazy);

      var imgs = [
        'assets/images/food1.png','assets/images/food2.png',
        'assets/images/food3.png','assets/images/food4.png',
        'assets/images/food2.png','assets/images/food1.png'
      ];
      imgs.forEach(function(src){
        var $i = $('<img class="as7-lazy-img" alt="TamTamFood">');

        $i.attr('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACw=');
        $i.attr('data-src', src);
        $('#as7-lazy').append($i);
      });

      function loadIfVisible($img){
        if ($img.attr('data-src')){
          var winTop = $(window).scrollTop(), winB = winTop + $(window).height() + 100;
          var top = $img.offset().top;
          if (top < winB){
            $img.attr('src', $img.attr('data-src')).removeAttr('data-src').addClass('loaded');
          }
        }
      }
      function lazyCheck(){
        $('.as7-lazy-img').each(function(){ loadIfVisible($(this)); });
      }
      $(window).on('scroll resize', lazyCheck);
      lazyCheck();


      $.as7Toast('AS7 (jQuery) готов!');
    } 


    if (!window.jQuery){
      var s = document.createElement('script');
      s.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
      s.onload = runWithJQ;
      document.head.appendChild(s);
    } else {
      runWithJQ();
    }
  });
})();


$(function(){
  if ($('form').length === 0){
    var $wrap = $('<section id="AS7_DEMO_FORM" class="as7-demo-form" style="max-width:720px;margin:24px auto;padding:16px;border:1px solid #eee;border-radius:12px"></section>');
    $wrap.append('<h3 style="margin:0 0 8px">Demo Contact Form (AS7)</h3>');
    var $f = $('<form><div style="display:flex;gap:8px;flex-wrap:wrap"><input required name="name" placeholder="Your name" style="flex:1;padding:8px"><input required type="email" name="email" placeholder="Email" style="flex:1;padding:8px"></div><div style="margin-top:8px"><button type="submit" class="as7-btn" style="padding:8px 12px">Send</button> <span class="as7-spinner" style="display:none;margin-left:8px">⏳ Sending...</span></div></form>');
    $wrap.append($f);
    as7SafeInsert($wrap);
    $f.on('submit', function(e){
      e.preventDefault();
      var $btn=$(this).find('button[type=submit]');
      var $sp=$(this).find('.as7-spinner');
      $btn.prop('disabled', true);
      $sp.show();
      setTimeout(()=>{$sp.hide();$btn.prop('disabled',false);$.as7Toast('Form sent (demo)!',2000);},1200);
    });
  }
});
