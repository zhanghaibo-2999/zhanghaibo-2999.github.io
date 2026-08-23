/* 枣畔·纪事 — 水墨 SVG 艺术库（档案缩略图 / 阶段照片占位 / 装饰），全部内联生成，离线可用 */
window.ZP = window.ZP || {};
ZP.art = (function () {

  var INK = '#2a241d', QS = '#2f6f80', ZH = '#b07c1f', ZS = '#a63a2a';

  /* 宣纸底 + 远山 + 印章 */
  function frame(inner, seed) {
    var tint = (seed || 7) % 3;
    var bg = tint === 0 ? '#f4eddc' : tint === 1 ? '#efe6d0' : '#f7f1e2';
    return [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">',
      '<rect width="400" height="300" fill="' + bg + '"/>',
      '<rect x="10" y="10" width="380" height="280" fill="none" stroke="' + INK + '" stroke-opacity=".14" stroke-width="1"/>',
      '<path d="M0 236 C70 214 130 240 190 222 C250 204 320 232 400 212 L400 300 L0 300 Z" fill="' + INK + '" opacity=".06"/>',
      '<path d="M0 258 C80 240 160 262 250 246 C310 236 360 250 400 240 L400 300 L0 300 Z" fill="' + INK + '" opacity=".10"/>',
      inner,
      '<rect x="352" y="266" width="30" height="24" fill="' + ZS + '" opacity=".88" rx="2" transform="rotate(3 367 278)"/>',
      '<text x="367" y="283" font-size="13" fill="#f8f1df" text-anchor="middle" font-family="serif">畔</text>',
      '</svg>'
    ].join('');
  }

  function stroke(path, opt) {
    opt = opt || {};
    var s = '<path d="' + path + '" fill="none" stroke="' + (opt.c || INK) + '" stroke-width="' + (opt.w || 2.4) + '" stroke-linecap="round" stroke-linejoin="round" opacity="' + (opt.o == null ? 0.75 : opt.o) + '"/>';
    return s;
  }
  function fillShape(path, opt) {
    opt = opt || {};
    return '<path d="' + path + '" fill="' + (opt.c || INK) + '" opacity="' + (opt.o == null ? 0.5 : opt.o) + '"/>';
  }

  var arts = {};

  /* 村口石桥 */
  arts.bridge = function () {
    return frame([
      stroke('M40 210 C80 190 120 208 150 198'),
      stroke('M150 198 L150 120 M150 120 C158 112 178 112 186 120 L186 198'),
      stroke('M40 198 C90 192 130 200 186 198'),
      stroke('M30 238 L370 238'),
      stroke('M40 238 L54 190 L66 238 M70 238 L84 192 L96 238', { o: .5 }),
      fillShape('M150 96 C150 88 162 84 168 90 C172 94 168 100 162 102 C156 104 150 102 150 96 Z', { c: ZS }),
      stroke('M150 102 L150 118'),
      stroke('M96 238 C120 214 150 214 176 236', { o: .6 }),
      stroke('M205 198 C245 182 300 196 340 186', { o: .45 })
    ]);
  };

  /* 民情地图 */
  arts.map = function () {
    return frame([
      stroke('M70 80 L330 80 L330 210 L70 210 Z', { w: 2 }),
      stroke('M70 80 L330 210 M70 210 L330 80', { o: .35 }),
      fillShape('M120 108 L138 108 L132 124 Z', { c: ZH, o: .8 }),
      fillShape('M262 172 L280 172 L274 188 Z', { c: ZH, o: .8 }),
      stroke('M70 150 C120 138 180 158 330 146', { o: .4 }),
      '<circle cx="200" cy="145" r="26" fill="none" stroke="' + ZH + '" stroke-width="1.4" stroke-dasharray="4 4" opacity=".7"/>',
      '<text x="200" y="150" font-size="12" fill="' + INK + '" text-anchor="middle" opacity=".8" font-family="serif">枣畔</text>',
      '<circle cx="120" cy="120" r="4" fill="' + ZS + '"/>',
      '<circle cx="274" cy="182" r="4" fill="' + ZS + '"/>'
    ]);
  };

  /* 梯田 */
  arts.field = function () {
    var t = '';
    for (var i = 0; i < 7; i++) {
      var y = 128 + i * 24;
      t += stroke('M40 ' + y + ' C120 ' + (y - 8) + ' 240 ' + (y + 6) + ' 360 ' + (y - 4), { o: .38, w: 2 });
    }
    return frame([
      t,
      stroke('M40 128 C120 120 240 134 360 124', { w: 2.6 }),
      stroke('M60 132 L66 116 M64 132 L74 118', { o: .55 }),
      stroke('M200 128 C210 118 230 118 240 128', { o: .5 }),
      fillShape('M300 96 C300 88 312 84 318 90 C322 94 318 100 312 102 C306 104 300 102 300 96 Z', { c: ZS }),
      stroke('M300 102 L300 116')
    ]);
  };

  /* 农家庭院 */
  arts.home = function () {
    return frame([
      stroke('M60 230 L60 150 L120 112 L180 150 L180 230', { w: 2.6 }),
      stroke('M180 150 L180 230', { o: .3 }),
      '<rect x="120" y="180" width="34" height="50" fill="' + INK + '" opacity=".08"/>',
      stroke('M96 196 L118 196 M96 212 L118 212', { o: .8 }),
      stroke('M150 132 L150 118 M143 125 L157 125', { o: .6 }),
      stroke('M60 230 L300 230', { w: 3 }),
      fillShape('M240 150 C240 128 268 124 276 132 C282 138 278 148 270 150 C264 152 240 152 240 150 Z', { c: ZH, o: .7 }),
      stroke('M258 150 L258 164 M250 158 L266 158', { o: .6 }),
      stroke('M150 172 L150 178', { o: .4 }),
      stroke('M180 190 L320 196 M180 210 L320 214', { o: .3 })
    ]);
  };

  /* 代养牛 */
  arts.cow = function () {
    return frame([
      stroke('M40 176 C120 164 220 178 360 166', { o: .4, w: 2.4 }),
      stroke('M70 176 L70 150 L150 150 L150 176', { w: 2.4 }),
      stroke('M100 150 L100 138 M120 150 L120 140', { o: .6 }),
      stroke('M70 150 C90 142 130 142 150 150', { o: .5 }),
      fillShape('M200 168 C200 128 224 112 244 124 C250 128 248 136 240 140 C232 144 226 152 226 168 Z', { c: ZH, o: .55 }),
      fillShape('M244 168 C244 122 268 106 288 118 C294 122 292 130 284 134 C276 138 270 146 270 168 Z', { c: ZH, o: .45 }),
      stroke('M222 170 L214 190 M250 170 L258 190', { o: .7, w: 2.6 }),
      stroke('M30 168 L50 158 L60 168', { o: .6 }),
      stroke('M300 172 L352 160 L360 172', { o: .45 })
    ]);
  };

  /* 公开栏 */
  arts.board = function () {
    return frame([
      stroke('M90 120 L90 210 M310 120 L310 210', { w: 2.6 }),
      stroke('M90 120 L310 120', { w: 3 }),
      stroke('M70 132 L330 132 M70 132 L70 110 L330 110 L330 132', { w: 1.8, o: .5 }),
      stroke('M100 140 L300 140', { o: .4 }),
      '<rect x="108" y="148" width="120" height="22" fill="' + INK + '" opacity=".06"/>',
      '<text x="116" y="164" font-size="12" fill="' + INK + '" opacity=".75" font-family="serif">一 键 报 贫</text>',
      '<rect x="240" y="148" width="52" height="22" fill="' + ZH + '" opacity=".14"/>',
      '<text x="247" y="164" font-size="11" fill="' + ZH + '" opacity=".9" font-family="serif">流程</text>',
      stroke('M108 182 L300 182 M108 198 L300 198', { o: .3 })
    ]);
  };

  /* 分类垃圾桶 */
  arts.bin = function () {
    return frame([
      '<rect x="120" y="128" width="52" height="84" rx="6" fill="' + QS + '" opacity=".16"/>',
      '<rect x="120" y="128" width="52" height="84" rx="6" fill="none" stroke="' + QS + '" stroke-width="2.4"/>',
      '<rect x="120" y="128" width="52" height="26" rx="6" fill="' + QS + '" opacity=".35"/>',
      '<text x="146" y="182" font-size="13" fill="' + QS + '" text-anchor="middle" opacity=".9" font-family="serif">分</text>',
      '<rect x="196" y="128" width="52" height="84" rx="6" fill="none" stroke="' + ZH + '" stroke-width="2.4"/>',
      '<rect x="196" y="128" width="52" height="26" rx="6" fill="' + ZH + '" opacity=".3"/>',
      '<text x="222" y="182" font-size="13" fill="' + ZH + '" text-anchor="middle" opacity=".9" font-family="serif">类</text>',
      '<rect x="272" y="128" width="52" height="84" rx="6" fill="none" stroke="' + ZS + '" stroke-width="2.4"/>',
      '<rect x="272" y="128" width="52" height="26" rx="6" fill="' + ZS + '" opacity=".28"/>',
      '<text x="298" y="182" font-size="13" fill="' + ZS + '" text-anchor="middle" opacity=".9" font-family="serif">丢</text>',
      stroke('M40 212 L360 212')
    ]);
  };

  /* 党旗 */
  arts.flag = function () {
    return frame([
      stroke('M70 70 L70 232', { w: 3 }),
      '<path d="M70 74 L230 74 L214 110 L230 146 L70 146 Z" fill="' + ZS + '" opacity=".78"/>',
      '<path d="M118 94 L148 94 L128 112 L138 140 L118 124 L98 140 L108 112 L88 94 L118 94 Z" fill="#f8f1df" opacity=".92"/>',
      stroke('M70 232 L330 232', { w: 2.6 }),
      stroke('M70 246 L330 246', { o: .35 })
    ]);
  };

  /* 文档 */
  arts.doc = function () {
    return frame([
      '<rect x="128" y="86" width="150" height="190" fill="#fffdf4" stroke="' + INK + '" stroke-width="1.8" opacity=".95"/>',
      '<rect x="238" y="86" width="40" height="190" fill="' + INK + '" opacity=".05"/>',
      stroke('M142 128 L268 128', { o: .5, w: 2 }),
      stroke('M142 152 L268 152', { o: .32, w: 2 }),
      stroke('M142 176 L268 176', { o: .32, w: 2 }),
      stroke('M142 200 L240 200', { o: .32, w: 2 }),
      stroke('M148 104 L176 104', { o: .6, w: 2.4 }),
      '<text x="152" y="238" font-size="12" fill="' + ZS + '" opacity=".85" font-family="serif">纪事</text>'
    ]);
  };

  /* 图表 */
  arts.chart = function () {
    var bars = [48, 66, 84, 104, 128];
    var b = '';
    for (var i = 0; i < bars.length; i++) {
      var h = bars[i], x = 90 + i * 52;
      b += '<rect x="' + x + '" y="' + (196 - h) + '" width="30" height="' + h + '" fill="' + (i === 4 ? ZS : QS) + '" opacity="' + (0.28 + i * 0.08) + '"/>';
      b += '<text x="' + (x + 15) + '" y="' + (196 - h - 6) + '" font-size="11" fill="' + INK + '" text-anchor="middle" opacity=".7" font-family="serif">' + (2022 + i) + '</text>';
    }
    return frame([stroke('M60 196 L340 196', { w: 2.2 }), stroke('M60 60 L60 196', { w: 2.2, o: .6 }), b]);
  };

  /* 会议 */
  arts.meet = function () {
    return frame([
      '<rect x="90" y="150" width="220" height="66" rx="8" fill="' + INK + '" opacity=".07"/>',
      '<rect x="90" y="150" width="220" height="66" rx="8" fill="none" stroke="' + INK + '" stroke-width="2" opacity=".6"/>',
      stroke('M196 150 L196 216', { o: .5 }),
      '<circle cx="120" cy="182" r="9" fill="none" stroke="' + INK + '" stroke-width="1.8" opacity=".8"/>',
      '<circle cx="164" cy="182" r="9" fill="none" stroke="' + INK + '" stroke-width="1.8" opacity=".8"/>',
      '<circle cx="228" cy="182" r="9" fill="none" stroke="' + INK + '" stroke-width="1.8" opacity=".8"/>',
      '<circle cx="272" cy="182" r="9" fill="none" stroke="' + ZS + '" stroke-width="2" opacity=".9"/>',
      '<circle cx="196" cy="120" r="12" fill="' + ZS + '" opacity=".12"/>',
      '<text x="196" y="125" font-size="11" fill="' + ZS + '" text-anchor="middle" opacity=".85" font-family="serif">议</text>'
    ]);
  };

  /* 帮销 */
  arts.cart = function () {
    return frame([
      stroke('M80 150 L120 150 L136 214 L292 214', { w: 2.6 }),
      '<circle cx="150" cy="236" r="12" fill="none" stroke="' + INK + '" stroke-width="2"/>',
      '<circle cx="270" cy="236" r="12" fill="none" stroke="' + INK + '" stroke-width="2"/>',
      fillShape('M180 100 C180 78 210 74 218 84 C224 90 220 100 210 102 C202 104 196 108 196 116', { c: ZH, o: .6 }),
      stroke('M196 116 L196 130'),
      stroke('M120 168 C160 158 200 164 240 156', { o: .5 }),
      '<text x="196" y="136" font-size="11" fill="' + ZH + '" text-anchor="middle" opacity=".9" font-family="serif">货</text>'
    ]);
  };

  /* 资金到户 */
  arts.money = function () {
    return frame([
      '<circle cx="196" cy="160" r="56" fill="none" stroke="' + ZH + '" stroke-width="2" opacity=".8"/>',
      '<circle cx="196" cy="160" r="40" fill="' + ZH + '" opacity=".10"/>',
      '<rect x="168" y="130" width="56" height="40" rx="6" fill="#fffdf4" stroke="' + ZH + '" stroke-width="2"/>',
      '<circle cx="196" cy="150" r="10" fill="none" stroke="' + ZH + '" stroke-width="1.8"/>',
      stroke('M196 108 L196 96 M188 100 L204 100', { o: .6 }),
      stroke('M166 172 L226 172', { o: .45 }),
      stroke('M150 186 L242 186', { o: .35 })
    ]);
  };

  /* 饮水 */
  arts.water = function () {
    return frame([
      stroke('M70 210 C130 186 200 200 260 182 C300 170 330 172 340 168', { w: 3.4, c: QS, o: .7 }),
      stroke('M70 222 C130 198 200 212 260 194 C300 182 330 184 340 180', { w: 2.4, c: QS, o: .45 }),
      stroke('M150 214 L150 168 M150 168 C156 160 176 160 182 168 L182 214', { w: 2.4 }),
      stroke('M132 168 L200 168', { o: .6 }),
      stroke('M120 150 L212 150 M120 150 L128 136 L134 150 M212 150 L204 136 L198 150', { o: .7 }),
      '<text x="166" y="142" font-size="12" fill="' + QS + '" text-anchor="middle" opacity=".9" font-family="serif">泉</text>'
    ]);
  };

  /* 道路 */
  arts.road = function () {
    return frame([
      stroke('M40 96 C160 120 240 84 360 108', { w: 6, o: .5 }),
      stroke('M40 96 C160 120 240 84 360 108', { w: 1.4, o: .9 }),
      stroke('M120 106 L126 118 M200 100 L206 112 M280 100 L286 112', { o: .5 }),
      stroke('M40 120 L360 132', { o: .3 }),
      fillShape('M60 96 C60 84 78 82 84 88 C88 92 86 98 80 100 C74 102 60 102 60 96 Z', { c: ZS }),
      stroke('M60 100 L60 112')
    ]);
  };

  /* 绿树庭院 */
  arts.tree = function () {
    return frame([
      stroke('M196 210 L196 140', { w: 2.8 }),
      '<path d="M196 150 C176 132 176 100 196 92 C216 100 216 132 196 150 Z" fill="' + QS + '" opacity=".35"/>',
      '<path d="M196 128 C162 116 162 74 196 62 C230 74 230 116 196 128 Z" fill="' + QS + '" opacity=".22"/>',
      '<path d="M196 108 C172 100 172 62 196 50 C220 62 220 100 196 108 Z" fill="' + QS + '" opacity=".18"/>',
      fillShape('M150 210 C150 194 168 190 176 196 C180 200 178 206 172 208 C166 210 150 210 150 210 Z', { c: ZH, o: .6 }),
      stroke('M120 210 L280 210', { w: 2.4 }),
      stroke('M96 226 L304 226', { o: .35 })
    ]);
  };

  /* 手机申报 */
  arts.phone = function () {
    return frame([
      '<rect x="148" y="70" width="104" height="190" rx="14" fill="#fffdf4" stroke="' + INK + '" stroke-width="2.2"/>',
      stroke('M188 72 L188 84 M184 78 L192 78', { o: .5 }),
      '<rect x="162" y="100" width="76" height="110" rx="6" fill="' + QS + '" opacity=".10"/>',
      stroke('M162 124 L238 124 M162 148 L238 148 M162 172 L238 172', { o: .5, w: 2 }),
      '<circle cx="200" cy="196" r="6" fill="none" stroke="' + QS + '" stroke-width="1.6"/>',
      stroke('M96 210 L148 210 L156 196 M304 210 L252 210 L244 196', { o: .6, w: 2.2 }),
      '<circle cx="118" cy="210" r="9" fill="none" stroke="' + INK + '" stroke-width="1.8"/>',
      '<circle cx="282" cy="210" r="9" fill="none" stroke="' + INK + '" stroke-width="1.8"/>'
    ]);
  };

  /* 荣誉 */
  arts.award = function () {
    return frame([
      '<circle cx="196" cy="140" r="52" fill="none" stroke="' + ZH + '" stroke-width="2.4"/>',
      '<circle cx="196" cy="140" r="42" fill="' + ZH + '" opacity=".12"/>',
      '<text x="196" y="138" font-size="26" fill="' + ZH + '" text-anchor="middle" opacity=".9" font-family="serif">优</text>',
      '<text x="196" y="162" font-size="14" fill="' + ZH + '" text-anchor="middle" opacity=".8" font-family="serif">秀</text>',
      stroke('M156 186 L140 232 L180 216 L196 236 L212 216 L252 232 L236 186', { o: .75, w: 2.2 }),
      stroke('M120 92 L140 84 M272 92 L252 84', { o: .5 })
    ]);
  };

  function render(kind, seed) {
    var fn = arts[kind] || arts.doc;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(fn(seed || undefined));
  }

  return { render: render, arts: arts };
})();
