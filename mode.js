/* ===== 지금 보고 있는 게 '시범운영(실제)'인지 '축제 시뮬레이션'인지 모든 화면 맨 위에 표시 =====
 * 페이지마다 config.js 다음에 불러옴. window.QR_MODE 로 현재 모드 정보를 씀. */
(function(){
  var S = window.QR_SERVERS || {};
  var p = new URLSearchParams(location.search);
  var k = (p.get('s') || '').replace(/[^a-z]/g, '');
  if(!S[k]) k = p.get('qr') ? 'pilot' : '';           /* 예전에 인쇄한 QR(서버 표시 없음)은 시범운영 */
  window.QR_MODE = k ? Object.assign({ key: k }, S[k]) : null;
  if(!k) return;
  var m = window.QR_MODE, other = k === 'pilot' ? 'fest' : 'pilot', o = S[other] || {};
  var css = '.modebar{display:flex;align-items:center;gap:8px;padding:7px 16px;font-size:12.5px;font-weight:700;line-height:1.35;font-family:Pretendard,"Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif}' +
    '.modebar b{font-weight:800}.modebar span{opacity:.8;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}' +
    '.modebar a{margin-left:auto;flex:none;text-decoration:none;border-radius:999px;padding:3px 10px;font-size:12px;font-weight:700;background:rgba(255,255,255,.75)}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function put(){
    var bar = document.createElement('div');
    bar.className = 'modebar';
    bar.style.background = m.soft; bar.style.color = m.ink;
    bar.innerHTML = '<b>' + m.icon + ' ' + m.name + '</b><span>· ' + m.kind + '</span><a href="home.html" style="color:' + m.ink + '">처음 화면 ↺</a>';
    document.body.insertBefore(bar, document.body.firstChild);
  }
  if(document.body) put(); else document.addEventListener('DOMContentLoaded', put);
})();
