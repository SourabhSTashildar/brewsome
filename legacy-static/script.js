(function () {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Instagram feed (data in feed.js, images saved locally in images/) ----
  var grid = document.getElementById('feedGrid');
  var feed = window.BREWSOME_FEED || [];
  if (grid && feed.length) {
    grid.textContent = '';
    feed.slice(0, 9).forEach(function (p) {
      var a = document.createElement('a');
      a.className = 'tile' + (p.type === 'reel' ? ' reel' : '');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', (p.type === 'reel' ? 'Reel' : 'Post') + ' from ' + p.date + ' on Instagram');

      var img = document.createElement('img');
      img.src = p.img;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.setAttribute('data-speed', '0.08'); // parallax inside the tile
      img.setAttribute('data-bound', '');
      img.addEventListener('error', function () { img.remove(); a.classList.add('noimg'); });
      a.appendChild(img);

      var tag = document.createElement('span');
      tag.className = 'date';
      tag.textContent = p.date;
      a.appendChild(tag);

      if (p.type === 'reel') {
        var play = document.createElement('i');
        play.className = 'play';
        play.setAttribute('aria-hidden', 'true');
        a.appendChild(play);
      }
      grid.appendChild(a);
    });
  }

  // ---- Parallax ----
  // Elements with data-speed drift against the scroll by speed x distance.
  // data-from="top": measured from the page top (hero). Otherwise: from viewport centre.
  // data-bound: never move more than 10% of the parent's height (images inside tiles).
  (function () {
    var els = [].slice.call(document.querySelectorAll('[data-speed]'));
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!els.length || reduce) return;

    var items = [], vh = window.innerHeight, ticking = false;

    function measure() {
      vh = window.innerHeight;
      var sy = window.pageYOffset;
      items = els.map(function (el) {
        el.style.setProperty('--py', '0px');
        var r = el.getBoundingClientRect();
        var limit = el.hasAttribute('data-bound')
          ? el.parentElement.getBoundingClientRect().height * 0.1
          : Infinity;
        return {
          el: el,
          speed: parseFloat(el.getAttribute('data-speed')) || 0,
          top: el.getAttribute('data-from') === 'top',
          center: r.top + sy + r.height / 2,
          half: r.height / 2,
          limit: limit
        };
      });
      update();
    }

    function update() {
      ticking = false;
      var sy = window.pageYOffset;
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var d = it.top ? -sy : it.center - (sy + vh / 2);
        if (Math.abs(d) > vh + it.half + 200) continue; // far off-screen, skip
        var y = -d * it.speed;
        if (y > it.limit) y = it.limit; else if (y < -it.limit) y = -it.limit;
        it.el.style.setProperty('--py', y.toFixed(1) + 'px');
      }
    }

    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }

    var resizeTimer;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 150);
    });
    window.addEventListener('load', measure);
    measure();
  })();

  // ---- Ratio calculator ----
  var method = document.getElementById('method');
  var ml = document.getElementById('ml');
  var mlOut = document.getElementById('cupsOut');
  var coffeeG = document.getElementById('coffeeG');
  var waterG = document.getElementById('waterG');
  var hint = document.getElementById('ratioHint');

  var hints = {
    16: 'Clean and bright. Medium-fine grind, 94°C water.',
    14: 'Rich but smooth. Medium grind, 90°C, press gently.',
    15: 'Full-bodied. Coarse grind, 4 minute steep.',
    8: 'Concentrate. Dilute 1:1 before drinking.',
    2: 'Dense and syrupy. Fine grind, aim for 25-30s.'
  };

  function calc() {
    var ratio = parseFloat(method.value);
    var water = parseFloat(ml.value);
    mlOut.textContent = water;
    waterG.textContent = Math.round(water);
    coffeeG.textContent = (water / ratio).toFixed(water / ratio < 20 ? 1 : 0);
    hint.textContent = hints[method.value] || '';
  }
  method.addEventListener('change', calc);
  ml.addEventListener('input', calc);
  calc();

  // ---- Pour-over timer ----
  var clock = document.getElementById('clock');
  var step = document.getElementById('step');
  var bar = document.getElementById('bar');
  var startBtn = document.getElementById('start');
  var resetBtn = document.getElementById('reset');

  var TOTAL = 180;
  var steps = [
    [0, 'Bloom: pour 2× the coffee weight, wait.'],
    [30, 'First pour: slow circles up to 50% of the water.'],
    [75, 'Second pour: finish to full weight.'],
    [105, 'Let it drain. Give it a gentle swirl.'],
    [150, 'Almost there. Smell it.'],
    [180, 'Done. Sip slowly.']
  ];

  var t = 0, timer = null, running = false;

  function fmt(s) {
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  }
  function render() {
    clock.textContent = fmt(t);
    bar.style.width = Math.min(100, (t / TOTAL) * 100) + '%';
    for (var i = steps.length - 1; i >= 0; i--) {
      if (t >= steps[i][0]) { step.textContent = steps[i][1]; break; }
    }
  }
  function tick() {
    t += 1;
    render();
    if (t >= TOTAL) { stop(); startBtn.textContent = 'Start'; }
  }
  function stop() {
    clearInterval(timer); timer = null; running = false;
  }
  startBtn.addEventListener('click', function () {
    if (running) {
      stop(); startBtn.textContent = 'Resume';
    } else {
      if (t >= TOTAL) t = 0;
      running = true; startBtn.textContent = 'Pause';
      render();
      timer = setInterval(tick, 1000);
    }
  });
  resetBtn.addEventListener('click', function () {
    stop(); t = 0; startBtn.textContent = 'Start';
    clock.textContent = '0:00'; bar.style.width = '0';
    step.textContent = 'Ready when you are.';
  });
})();
