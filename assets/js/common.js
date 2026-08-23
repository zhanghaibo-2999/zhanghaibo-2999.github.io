/* 枣畔·纪事 — 公共脚本：导航/页脚/音乐引擎/语音讲解员/工具函数（离线自包含） */
(function () {
  var S = window.ZP = window.ZP || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  S.$ = $;
  S.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  S.esc = function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------- 导航 + 页脚 ---------- */
  var PAGES = [
    ['index.html', '首页'],
    ['jishi.html', '帮扶纪事'],
    ['ditu.html', '互动地图'],
    ['dang-an.html', '数字档案'],
    ['danganguan.html', '档案馆']
  ];
  S.renderChrome = function () {
    var cur = document.body.getAttribute('data-page') || 'index';
    var nav = document.getElementById('zpNav');
    if (nav) {
      nav.innerHTML =
        '<a class="nav-logo" href="index.html"><span class="nav-seal">畔</span><span>枣畔·纪事</span></a>' +
        '<button class="nav-toggle" aria-label="菜单">☰</button>' +
        '<nav class="nav-links">' + PAGES.map(function (p) {
          return '<a href="' + p[0] + '" class="' + (p[0].indexOf(cur) === 0 ? 'on' : '') + '">' + p[1] + '</a>';
        }).join('') + '</nav>' +
        '<div class="nav-music"><button class="music-btn" id="zpMusicBtn" title="田园配乐" aria-label="音乐"><span class="note-on">♪</span><span class="note-off">♩</span></button><span class="music-wave" aria-hidden="true"><i></i><i></i><i></i></span></div>';
      var tog = $('.nav-toggle', nav);
      tog.addEventListener('click', function () { $('.nav-links', nav).classList.toggle('open'); });
      window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 40); });
    }
    var ft = document.getElementById('zpFooter');
    if (ft) {
      ft.innerHTML =
        '<div class="footer-inner">' +
        '<div><h4>枣畔·纪事</h4><p>驻村帮扶工作数字展馆<br>' + S.site.full + '</p></div>' +
        '<div><h4>站内导航</h4><p>' + PAGES.map(function (p) { return '<a href="' + p[0] + '">' + p[1] + '</a>'; }).join(' · ') + '</p></div>' +
        '<div><h4>联系</h4><p>' + S.site.address + '<br>驻村第一书记：' + S.site.firstSecretary + '</p></div>' +
        '</div>' +
        '<div class="wrap seed-note">' + S.site.seedNote + '</div>';
    }
  };

  /* ---------- 滚动浮现 ---------- */
  S.reveal = function () {
    var els = S.$$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  };

  /* ---------- 水墨折线图（canvas 内联，收入趋势用） ---------- */
  S.inkChart = function (canvas, data, opt) {
    opt = opt || {};
    var dpr = window.devicePixelRatio || 1;
    var W = canvas.clientWidth || 300, H = canvas.clientHeight || 90;
    canvas.width = W * dpr; canvas.height = H * dpr;
    var ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    var min = Math.min.apply(null, data), max = Math.max.apply(null, data);
    var pad = 8, i, n = data.length;
    var px = function (i) { return pad + i * (W - pad * 2) / (n - 1); };
    var py = function (v) { return H - pad - (v - min) / ((max - min) || 1) * (H - pad * 2); };
    /* 网格 */
    ctx.strokeStyle = 'rgba(42,36,29,.10)'; ctx.lineWidth = 1;
    for (i = 1; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(0, H * i / 4); ctx.lineTo(W, H * i / 4); ctx.stroke(); }
    /* 面积 */
    ctx.beginPath(); ctx.moveTo(px(0), py(data[0]));
    for (i = 1; i < n; i++) ctx.lineTo(px(i), py(data[i]));
    ctx.lineTo(px(n - 1), H - pad); ctx.lineTo(px(0), H - pad); ctx.closePath();
    ctx.fillStyle = 'rgba(176,124,31,.14)'; ctx.fill();
    /* 折线 */
    ctx.beginPath(); ctx.moveTo(px(0), py(data[0]));
    for (i = 1; i < n; i++) ctx.lineTo(px(i), py(data[i]));
    ctx.strokeStyle = opt.color || '#a63a2a'; ctx.lineWidth = 2; ctx.stroke();
    /* 点 + 标签 */
    var labels = opt.labels || ['2023', '2024', '2025', '2026'];
    for (i = 0; i < n; i++) {
      ctx.beginPath(); ctx.arc(px(i), py(data[i]), 2.6, 0, 7);
      ctx.fillStyle = opt.color || '#a63a2a'; ctx.fill();
      ctx.fillStyle = 'rgba(42,36,29,.62)';
      ctx.font = '10px serif'; ctx.textAlign = 'center';
      ctx.fillText(labels[i] || (2023 + i), px(i), H - 2);
      ctx.textAlign = 'left';
      ctx.fillText(String(data[i]), px(i) + 5, py(data[i]) - 5);
    }
  };

  /* ============================================================
     WebAudio 田园配乐引擎（埙笛 / 古琴 五声音阶，默认静音）
     ============================================================ */
  var Music = {
    ctx: null, master: null, playing: false, timer: null, step: 0,
    scale: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33], /* A 宫五声 */
    ensure: function () {
      if (this.ctx) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    },
    pluck: function (t, freq, dur) {
      var ctx = this.ctx, o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = 'triangle'; o.frequency.value = freq;
      f.type = 'lowpass'; f.frequency.value = freq * 3.2;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(f); f.connect(g); g.connect(this.master);
      o.start(t); o.stop(t + dur + 0.05);
      /* 泛音 */
      var o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = 'sine'; o2.frequency.value = freq * 2.01;
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(0.04, t + 0.01);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.7);
      o2.connect(g2); g2.connect(this.master); o2.start(t); o2.stop(t + dur + 0.05);
    },
    xun: function (t, freq, dur) {
      var ctx = this.ctx, buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
      var d = buf.getChannelData(0), i;
      for (i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      var src = ctx.createBufferSource(); src.buffer = buf;
      var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = freq; bp.Q.value = 1.4;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(bp); bp.connect(g); g.connect(this.master);
      src.start(t); src.stop(t + dur + 0.05);
    },
    schedule: function () {
      var self = this, ctx = this.ctx, t = ctx.currentTime + 0.08, i;
      for (i = 0; i < 4; i++) {
        var bar = this.step + i;
        var idx = (bar * 3 + ((bar * 5) % 4)) % this.scale.length;
        var freq = this.scale[idx];
        if (bar % 2 === 0) this.pluck(t + i * 0.92, freq, 1.5);
        else this.xun(t + i * 0.92, freq * 1.5, 0.9);
        if (bar % 4 === 0) this.pluck(t + i * 0.92, freq / 2, 2.6); /* 低八度长音 */
      }
      this.step += 4;
    },
    toggle: function (btn) {
      var self = this;
      this.ensure();
      var t0 = this.ctx.currentTime;
      if (this.playing) {
        this.master.gain.cancelScheduledValues(t0);
        this.master.gain.setValueAtTime(this.master.gain.value, t0);
        this.master.gain.linearRampToValueAtTime(0, t0 + 0.8);
        var st = this.timer; setTimeout(function () { clearInterval(st); }, 900);
        this.playing = false; btn.classList.remove('playing');
      } else {
        this.ctx.resume();
        this.master.gain.cancelScheduledValues(t0);
        this.master.gain.setValueAtTime(this.master.gain.value || 0.0001, t0);
        this.master.gain.linearRampToValueAtTime(0.5, t0 + 1.6);
        this.schedule();
        this.timer = setInterval(function () { self.schedule(); }, 3680);
        this.playing = true; btn.classList.add('playing');
      }
    }
  };
  S.Music = Music;

  /* ============================================================
     AI 驻村讲解员（流式打字 + 语音播报 + 本地历史缓存）
     ============================================================ */
  var fallbackAvatar = function () {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#2f6f80"/>' +
      '<circle cx="100" cy="78" r="34" fill="#f4eddc"/><path d="M52 172 C52 130 148 130 148 172 Z" fill="#f4eddc"/>' +
      '<rect x="52" y="150" width="96" height="30" fill="#1f3a45"/><path d="M0 176 C60 168 140 176 200 170 L200 200 L0 200 Z" fill="#24424e"/></svg>');
  };
  S.assistant = function () {
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<button class="assistant-open" id="zpAva" title="AI 驻村讲解员「小畔」" aria-label="打开讲解员">' +
      '<img alt="" id="zpAvaImg"/><span class="pulse"></span></button>' +
      '<div class="assistant-panel" id="zpPanel">' +
      '<div class="assistant-head">' +
      '<div class="ava"><img alt="" id="zpAvaImg2"/></div>' +
      '<div class="t"><b>驻村讲解员 · 小畔</b><span>乡村振兴政策 · 防返贫监测 · 一键报贫 · 代养牛</span></div>' +
      '<button id="zpClose" title="关闭">✕</button></div>' +
      '<div class="assistant-body" id="zpMsgs"></div>' +
      '<div class="assistant-toolbar">' +
      '<label>语音 <input type="checkbox" id="zpTTS" checked></label>' +
      '<label>语速 <input type="range" id="zpRate" min="0.5" max="1.8" step="0.1" value="1"></label>' +
      '<label>音色 <select id="zpGender"><option value="male">男声</option><option value="female">女声</option></select></label>' +
      '</div>' +
      '<div class="assistant-faq" id="zpFaq"></div>' +
      '<div class="assistant-input"><input id="zpIn" placeholder="问小畔任何关于枣畔村帮扶的问题…" maxlength="200"><button id="zpSend">发送</button></div>' +
      '</div>';
    document.body.appendChild(wrap);

    var img = document.getElementById('zpAvaImg');
    var ava = new Image();
    ava.onload = function () { img.src = ava.src; document.getElementById('zpAvaImg2').src = ava.src; };
    ava.onerror = function () { img.src = fallbackAvatar(); document.getElementById('zpAvaImg2').src = fallbackAvatar(); };
    ava.src = 'assets/img/avatar-zhujie.png';

    var panel = document.getElementById('zpPanel');
    var msgs = document.getElementById('zpMsgs');
    var input = document.getElementById('zpIn');
    var tts = document.getElementById('zpTTS');
    var rate = document.getElementById('zpRate');
    var gender = document.getElementById('zpGender');
    var KEY = 'zp_chat_history_v1';
    var hist = [];
    try { hist = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { hist = []; }

    function say(text, r, g) {
      if (!window.speechSynthesis) return;
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      var vs = speechSynthesis.getVoices().filter(function (v) { return v.lang && v.lang.indexOf('zh') === 0; });
      if (vs.length) u.voice = vs[0];
      u.rate = r || 1; u.pitch = g === 'female' ? 1.35 : 0.75;
      speechSynthesis.speak(u);
    }

    function addMsg(role, html) {
      var d = document.createElement('div');
      d.className = 'msg ' + role; d.innerHTML = html;
      msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
      return d;
    }

    function typeOut(el, full, done) {
      var i = 0;
      var caret = document.createElement('span'); caret.className = 'caret';
      el.appendChild(caret);
      var timer = setInterval(function () {
        i = Math.min(i + 2, full.length);
        el.textContent = full.slice(0, i);
        el.appendChild(caret);
        if (i >= full.length) { clearInterval(timer); caret.remove(); if (done) done(); }
      }, 14);
      return timer;
    }

    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(hist.slice(-60))); } catch (e) { }
    }

    function ask(text) {
      hist.push({ r: 'u', t: text }); save();
      addMsg('user', S.esc(text));
      var answer = matchFAQ(text);
      var el = addMsg('ai', '…');
      var speakText = answer.replace(/[\s]+/g, ' ');
      if (tts.checked) say(speakText, parseFloat(rate.value), gender.value);
      typeOut(el, answer, function () { hist.push({ r: 'a', t: answer }); save(); });
    }

    function matchFAQ(q) {
      q = q.toLowerCase();
      var hit = null, best = 0;
      ZP.faq.forEach(function (f) {
        var score = 0;
        var words = f.q.slice(0, 12);
        for (var i = 0; i < words.length; i++) {
          var w = words[i];
          if (q.indexOf(w) > -1) score++;
        }
        /* 主题词加权 */
        var keys = [[/监测|返贫|消除/, 3], [/报贫|申报/, 3], [/代养|养牛|分红/, 3], [/补贴|务工/, 3], [/垃圾|环境/, 3], [/党|先锋/, 2], [/消费帮扶|农产品/, 2], [/就业/, 2]];
        keys.forEach(function (k) { if (k[0].test(f.q) && k[0].test(q)) score += k[1]; });
        if (score > best) { best = score; hit = f; }
      });
      if (hit && best >= 3) return hit.a;
      if (/监测|返贫/.test(q)) return '关于防返贫监测，枣畔村将11户27人脱贫户/监测户全部纳入动态监测，实行"两表一图"月算账、季研判。您可以问我"监测认定标准""两表一图是什么"等具体问题。';
      if (/报贫|申报/.test(q)) return '一键报贫有四种方式：手机小程序申报、村委服务点代办、联系包联干部、委托亲属代报。村级5个工作日内入户核实，全程公开透明。想了解详情可以问我"一键报贫怎么操作"。';
      if (/代养|养牛|分红/.test(q)) return '代养牛项目采取"村集体经济组织+合作社+农户"模式，收益"保底+分红"，2026年列为驻村工作第一重点，收益兑现、分红到户、项目跟踪三件事正在推进。';
      if (/补贴|务工/.test(q)) return '务工补贴包括跨省交通补贴、稳岗就业补贴等，符合条件的可到村委会申报，工作队协助办理，做到应补尽补。具体条件可以问我"务工补贴怎么申请"。';
      if (/环境|垃圾/.test(q)) return '人居环境实行"门前三包+公益岗+积分制"长效管护，垃圾分类推行"户分类、村收集、镇转运"。发现脏乱差可以随时找包联干部或网格员。';
      if (/你好|您好|嗨|hi|hello|在吗/.test(q)) return '您好！我是枣畔村驻村讲解员小畔，可以为您解答乡村振兴政策、防返贫监测、一键报贫、代养牛项目、务工补贴、人居环境等各类问题，请随便问。';
      return '这个问题我来仔细解答：枣畔村驻村工作队自2024年7月15日进驻以来，围绕防返贫监测、代养牛产业、人居环境、党建引领等方面开展了大量工作。您可以更具体地问，比如"防返贫监测认定标准""一键报贫怎么操作""代养牛怎么分红""务工补贴怎么申请"，我会给您详细说明。';
    }

    function renderHistory() {
      hist.forEach(function (m) { addMsg(m.r === 'u' ? 'user' : 'ai', S.esc(m.t)); });
      if (!hist.length) {
        addMsg('ai', '您好，我是驻村讲解员「小畔」，熟悉枣畔村的每一项帮扶工作。点击下方问题卡片，或直接输入您想了解的问题。');
      }
    }

    var faqShown = 0;
    function faqChips() {
      var box = document.getElementById('zpFaq');
      var list = ZP.faq.slice(faqShown, faqShown + 6);
      box.innerHTML = list.map(function (f) { return '<button data-q="' + S.esc(f.q) + '">' + S.esc(f.q.slice(0, 10)) + '</button>'; }).join('');
      faqShown = (faqShown + 6) % ZP.faq.length;
      S.$$('button', box).forEach(function (b) {
        b.addEventListener('click', function () { ask(b.getAttribute('data-q')); });
      });
    }

    document.getElementById('zpAva').addEventListener('click', function () { panel.classList.toggle('open'); if (panel.classList.contains('open')) input.focus(); });
    document.getElementById('zpClose').addEventListener('click', function () { panel.classList.remove('open'); });
    document.getElementById('zpSend').addEventListener('click', send);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    function send() {
      var t = input.value.trim(); if (!t) return;
      input.value = ''; ask(t);
    }
    if (window.speechSynthesis) speechSynthesis.getVoices();
    renderHistory(); faqChips();
  };

  /* ---------- 启动 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    S.renderChrome(); S.reveal(); S.assistant();
    var btn = document.getElementById('zpMusicBtn');
    if (btn) btn.addEventListener('click', function () { Music.toggle(btn); });
  });
})();
