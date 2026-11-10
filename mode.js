/* ===== 지금 보고 있는 게 '시범운영(실제)'인지 '축제 시뮬레이션'인지 모든 화면 맨 위에 표시 =====
 * 페이지마다 config.js 다음에 불러옴. window.QR_MODE 로 현재 모드 정보를 씀.
 * 축제 시뮬레이션 쪽은 「유성 국화 여권」 디자인(차콜·갈색·머스터드, Pretendard, 국화 QR 로고, 선 아이콘)으로 통일. */
(function(){
  var S = window.QR_SERVERS || {};
  var p = new URLSearchParams(location.search);
  var k = (p.get('s') || '').replace(/[^a-z]/g, '');
  if(!S[k]) k = p.get('qr') ? 'pilot' : '';           /* 예전에 인쇄한 QR(서버 표시 없음)은 시범운영 */
  window.QR_MODE = k ? Object.assign({ key: k }, S[k]) : null;

  /* ---------- 「유성 국화 여권」 공용 디자인 요소 ---------- */
  var YP = window.YP = {
    c: { char: '#2B2722', brown: '#8A5A12', mustard: '#EAB33F', cream: '#FBEFD2', bg: '#F8F4EA', sub: '#736A5C', line: '#E8E0CE' },
    /* A안 「국화 QR」 로고 (QR 위치 표시 3개 + 데이터 모듈 7개 + 국화 1송이) */
    logo: function(size, dark){
      var a = dark ? '#FBEFD2' : '#2B2722', b = dark ? '#EAB33F' : '#8A5A12', h = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">';
      [[8, 8], [78, 8], [8, 78]].forEach(function(q){ h += '<rect x="' + q[0] + '" y="' + q[1] + '" width="34" height="34" rx="8" fill="none" stroke="' + a + '" stroke-width="7"/><rect x="' + (q[0] + 10.5) + '" y="' + (q[1] + 10.5) + '" width="13" height="13" rx="3" fill="' + a + '"/>'; });
      [[52, 12], [52, 30], [62, 21], [12, 52], [30, 52], [21, 62], [52, 52]].forEach(function(d){ h += '<rect x="' + d[0] + '" y="' + d[1] + '" width="9" height="9" rx="2" fill="' + b + '"/>'; });
      for(var i = 0; i < 12; i++) h += '<rect x="91" y="72" width="8" height="19" rx="4" fill="#EAB33F" transform="rotate(' + (i * 30) + ' 95 95)"/>';
      return h + '<circle cx="95" cy="95" r="7" fill="' + (dark ? '#2B2722' : '#8A5A12') + '"/></svg>';
    },
    /* 선 아이콘 (이모지 대신) */
    icon: function(name, size){
      var P = {
        passport: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 16h6"/>',
        gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8c-1.5-3-5-3-5-1s3 1 5 1zM12 8c1.5-3 5-3 5-1s-3 1-5 1z"/>',
        camera: '<path d="M4 7h3l2-2h6l2 2h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>',
        parking: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M10 17V7h3a3 3 0 0 1 0 6h-3"/>',
        trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 20h6"/>',
        map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
        qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
        clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
        users: '<circle cx="9" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3.5 19c.5-3 3-5 5.5-5s5 2 5.5 5M14.5 14.5c2.5-.5 5 .8 5.8 4"/>',
        chev: '<path d="m9 6 6 6-6 6"/>',
        back: '<path d="m15 6-6 6 6 6"/>',
        info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
        route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
        car: '<path d="M5 16V11l2-5h10l2 5v5M4 16h16v3h-3v-2H7v2H4zM5 11h14"/><circle cx="8" cy="14" r=".6"/><circle cx="16" cy="14" r=".6"/>',
        stamp: '<path d="M9 4h6v5l-1 3h4v4H6v-4h4l-1-3zM5 20h14"/>',
        chart: '<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-3"/>',
        flower: '<circle cx="12" cy="12" r="2.5"/><path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.8 2.8M15.2 15.2 18 18M6 18l2.8-2.8M15.2 8.8 18 6"/>',
        admin: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
        home: '<path d="m4 11 8-7 8 7v9h-5v-6H9v6H4z"/>'
      };
      return '<svg viewBox="0 0 24 24" width="' + (size || 22) + '" height="' + (size || 22) + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
    }
  };

  if(!k) return;
  var m = window.QR_MODE, fest = k !== 'pilot';
  var css = '.modebar{display:flex;align-items:center;gap:8px;padding:7px 16px;font-size:12.5px;font-weight:700;line-height:1.35;font-family:Pretendard,"Pretendard Variable","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif}' +
    '.modebar b{font-weight:800;display:flex;align-items:center;gap:6px}.modebar span{opacity:.8;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}' +
    '.modebar a{margin-left:auto;flex:none;text-decoration:none;border-radius:999px;padding:3px 10px;font-size:12px;font-weight:700;background:rgba(255,255,255,.75)}';
  if(fest){
    /* 축제 시뮬레이션 화면 전체 색·글꼴을 국화 여권 톤으로 바꿈 (각 페이지의 색 변수를 덮어씀) */
    var lk = document.createElement('link'); lk.rel = 'stylesheet';
    lk.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
    document.head.appendChild(lk);
    css += ':root{--bg:#F8F4EA;--card:#FFFDF8;--ink:#2B2722;--sub:#736A5C;--muted:#A69C8B;--line:#E8E0CE;--blue:#8A5A12;--blue-soft:#FBEFD2;' +
      '--yellow:#EAB33F;--yellow-soft:#FBEFD2;--gold:#EAB33F;--slate:#736A5C;--slate-soft:#F1EBDD;--mint:#5E8C61;--mint-soft:#E7EFE2;' +
      '--purple:#8A6FB0;--purple-soft:#EFE9F5;--pink:#B4533A;--pink-soft:#F8E3DA;--silver:#B9AE9A;--bronze:#B98552}' +
      'body{font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif!important;background:#F8F4EA}' +
      '.bar,header.bar{background:#FFFDF8!important}' +
      '.brand i{background:transparent!important;width:28px!important;height:28px!important}' +
      '.btn:not(.ghost):not(.on),.go,.btn.primary{background:#2B2722;color:#FBEFD2}' +
      '.ypnav{position:fixed;left:0;right:0;bottom:0;z-index:30;display:flex;background:#FFFDF8;border-top:1px solid #E8E0CE;padding:6px 6px calc(6px + env(safe-area-inset-bottom))}' +
      '.ypnav a{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 0;text-decoration:none;color:#736A5C;font-size:11.5px;font-weight:700}' +
      '.ypnav a.on{color:#8A5A12}body.has-ypnav{padding-bottom:calc(68px + env(safe-area-inset-bottom))}';
  }
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function put(){
    var bar = document.createElement('div');
    bar.className = 'modebar';
    if(fest){
      bar.style.background = '#2B2722'; bar.style.color = '#FBEFD2';
      bar.innerHTML = '<b>' + YP.logo(18, true) + '유성 국화 여권</b><span>· 시뮬레이션 · 가상 데이터</span><a href="passport.html?s=' + k + '" style="color:#2B2722;background:#EAB33F">여권 메인</a>';
    } else {
      bar.style.background = m.soft; bar.style.color = m.ink;
      bar.innerHTML = '<b>' + m.icon + ' ' + m.name + '</b><span>· ' + m.kind + '</span><a href="home.html" style="color:' + m.ink + '">처음 화면 ↺</a>';
    }
    document.body.insertBefore(bar, document.body.firstChild);
    if(!fest) return;
    /* 브랜드 'Q' 자리에 국화 QR 로고 */
    [].forEach.call(document.querySelectorAll('.brand i'), function(i){ i.innerHTML = YP.logo(26); });
    /* 아래 탭: 여권 · 보상함 · 사진 · 주차 (디자인 시안과 같은 구성) */
    if(document.body.getAttribute('data-nonav') !== null) return;
    var here = location.pathname.split('/').pop() || 'index.html', tab = new URLSearchParams(location.search).get('tab') || '';
    var items = [['passport.html?s=' + k, 'passport', '여권', here === 'passport.html' && tab !== 'reward'],
      ['passport.html?s=' + k + '&tab=reward', 'gift', '보상함', here === 'passport.html' && tab === 'reward'],
      ['contest.html?s=' + k, 'camera', '사진', here === 'contest.html'],
      ['parking.html?s=' + k, 'parking', '주차', here === 'parking.html']];
    var nav = document.createElement('nav'); nav.className = 'ypnav';
    nav.innerHTML = items.map(function(t){ return '<a href="' + t[0] + '" class="' + (t[3] ? 'on' : '') + '">' + YP.icon(t[1], 22) + t[2] + '</a>'; }).join('');
    document.body.appendChild(nav); document.body.classList.add('has-ypnav');
  }
  if(document.body) put(); else document.addEventListener('DOMContentLoaded', put);
})();
