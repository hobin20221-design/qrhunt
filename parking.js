/* ===== 주차장 시뮬레이션 (축제 시뮬레이션 전용) =====
 * 주차장 목록: 2025년 제16회 축제 보도 기준(유림공원·유성구청 지상주차장, 온천로 노상 임시주차장, KISTI 18시 이후, KAIST 400면).
 * 면수는 KAIST(400면)만 보도 수치, 나머지는 시연용 가정값(est: true). 대수는 실제 측정이 아니라 시간대 패턴으로 만든 가상 값.
 * 노상(노면) 임시주차는 구역 1~4로 나누고 구역마다 QR 기둥을 세운다고 가정:
 *   - 노외 주차장(유림공원·유성구청)이 85% 이상 차면 운영요원이 노상 구역을 '활성'으로 열고, 그 전에는 '비활성'
 *   - 운전자가 기둥 QR을 찍으면 그 구역이 지금 활성인지·남은 자리·더 나은 주차장과 걸어가는 길이 바로 뜸
 * 실제 운영에서는 주차 요원이 30분마다 관제에서 입력하는 값으로 바뀜. x·y는 축제장 지도(0~100) 위 위치, edge가 있으면 지도 밖(방향만 표시). */
window.YP_PARKING = {
  lots: [
    { id: 'P1', name: '유림공원 지상주차장', kind: '노외', cap: 120, est: true, x: 27.3, y: 50.5, qr: 'Y-05', walk: 2, pull: 1.12,
      route: ['유림공원 주차장', '코스모스정원', '국화 데이트 코스', '종합안내소'], tip: '데이트·사진 구역이 바로 앞이에요. 가장 먼저 차는 곳이라 주말 낮에는 다른 주차장을 추천해요.' },
    { id: 'P2', name: '유성구청 지상주차장', kind: '노외', cap: 180, est: true, x: 33.5, y: 10.9, qr: 'Y-02', walk: 6, pull: 1.0,
      route: ['유성구청 주차장', '어은교', '게임 구역(보물·퀴즈)', '종합안내소'], tip: '어은교를 건너면 게임 구역이 가장 가까워요.' },
    { id: 'P4', name: 'KAIST 주차장', kind: '노외', cap: 400, est: false, x: 60, y: 4.5, qr: 'Y-06', walk: 12, pull: 0.6, edge: '북쪽 갑천 건너',
      route: ['KAIST 주차장', '어은교 남단 입구', '게임 구역(보물·퀴즈)', '종합안내소'], tip: '면수가 가장 많아요. 조금 걷지만 주말에도 여유가 있는 편이에요.' },
    { id: 'P5', name: 'KISTI 주차장', kind: '노외', cap: 250, est: true, x: 93, y: 9, qr: 'Y-06', walk: 15, pull: 0.6, openFrom: 18, edge: '북동쪽 과학로 방향',
      route: ['KISTI 주차장', '어은교 남단 입구', '한빛탑 야간 조명', '서편무대'], tip: '18시 이후에만 열려요. 야간 관람에 맞는 주차장이에요.' },
    /* ---- 노상(노면) 임시주차 구역: 혼잡할 때만 활성 ---- */
    { id: 'R1', name: '온천로 노상 1구역', kind: '노상', temp: true, cap: 30, est: true, x: 5.2, y: 74, seg: [[1.5, 76.6], [9, 71.4]], qr: 'Y-03', walk: 6, pull: .9,
      posts: [{ id: 'P-01', x: 3, y: 75.6 }, { id: 'P-02', x: 7.6, y: 72.4 }],
      route: ['온천로 노상 1구역', '보행교 서측 입구', '미니한빛탑', '국화 데이트 코스'], tip: '보행교로 바로 들어갈 수 있어요.' },
    { id: 'R2', name: '온천로 노상 2구역', kind: '노상', temp: true, cap: 30, est: true, x: 13.3, y: 68, seg: [[9.6, 70.9], [17, 65.2]], qr: 'Y-03', walk: 5, pull: .86,
      posts: [{ id: 'P-03', x: 11.2, y: 69.7 }, { id: 'P-04', x: 15.4, y: 66.4 }],
      route: ['온천로 노상 2구역', '보행교 서측 입구', '미니한빛탑', '국화 데이트 코스'], tip: '데이트 코스 시작점(미니한빛탑)과 가까워요.' },
    { id: 'R3', name: '유성천 둑길 노상 3구역', kind: '노상', temp: true, cap: 35, est: true, x: 23.4, y: 46.4, seg: [[17.5, 51.1], [29.4, 41.7]], qr: 'Y-05', walk: 3, pull: .95,
      posts: [{ id: 'P-05', x: 19.6, y: 49.4 }, { id: 'P-06', x: 27.2, y: 43.4 }],
      route: ['유성천 둑길 노상 3구역', '유림공원 주차장', '코스모스정원', '종합안내소'], tip: '유림공원 주차장이 찼을 때 가장 가까운 대안이에요.' },
    { id: 'R4', name: '어은교 남단 노상 4구역', kind: '노상', temp: true, cap: 25, est: true, x: 63.5, y: 36, seg: [[60.4, 30.4], [66.6, 41.7]], qr: 'Y-06', walk: 3, pull: .8,
      posts: [{ id: 'P-07', x: 61.6, y: 32.6 }, { id: 'P-08', x: 65.4, y: 39.4 }],
      route: ['어은교 남단 노상 4구역', '어은교 남단 입구', '게임 구역(보물·퀴즈)', '종합안내소'], tip: '게임 구역과 종합안내소가 걸어서 3분이에요.' }
  ],
  /* 축제장 입구 (주차 후 걸어갈 곳) — 지도 위 위치 */
  gates: [
    { name: '종합안내소(한빛탑)', qr: 'Y-01', x: 60.9, y: 46.4 },
    { name: '보행교 서측 입구', qr: 'Y-03', x: 9.1, y: 66.5 },
    { name: '꽃탑 남측 입구', qr: 'Y-04', x: 51.2, y: 82.2 },
    { name: '어은교 남단 입구', qr: 'Y-06', x: 65.4, y: 39.2 },
    { name: '유림공원 주차장(서측)', qr: 'Y-05', x: 27.3, y: 55.8 },
    { name: '유성구청 주차장(북측)', qr: 'Y-02', x: 40.2, y: 13.1 }
  ],
  /* 시간대별 축제장 혼잡 정도(0~1): 낮 14~16시와 야간 19~20시에 높음 */
  curve: { 10: .28, 11: .42, 12: .55, 13: .68, 14: .82, 15: .88, 16: .8, 17: .66, 18: .7, 19: .84, 20: .78, 21: .5 },
  hotAt: .85,
  rnd: function(seed){ var x = Math.sin(seed * 12.9898) * 43758.5453; return x - Math.floor(x); },
  /* day: 0=일 … 6=토, minutes: 0시부터 분. 30분 단위로 값이 바뀜 */
  at: function(day, minutes){
    var P = this; minutes = minutes - minutes % 30;
    var slot = Math.floor(minutes / 30), h = Math.floor(minutes / 60), wk = day === 0 || day === 6;
    var a = P.curve[h] == null ? 0 : P.curve[h], b = P.curve[h + 1] == null ? a * .6 : P.curve[h + 1];
    var base = (a + (b - a) * ((minutes % 60) / 60)) * (wk ? 1.0 : .62);
    var open = h >= 10 && h < 22;
    var ratioOf = function(l, i){ return Math.max(0, Math.min(1, base * l.pull + (P.rnd(slot * 7 + i * 13 + day * 31) - .5) * .12)); };
    /* 노외 주차장(유림공원·유성구청)이 얼마나 찼는지 → 노상 구역을 열지 결정 */
    var core = P.lots.slice(0, 2), coreUsed = 0, coreCap = 0;
    core.forEach(function(l, i){ coreUsed += l.cap * ratioOf(l, i); coreCap += l.cap; });
    var hot = open && coreUsed / coreCap >= P.hotAt;
    return P.lots.map(function(l, i){
      var active = open && (!l.openFrom || h >= l.openFrom) && (!l.temp || hot);
      var r = ratioOf(l, i);
      var used = active ? Math.round(l.cap * r) : 0, ratio = active ? used / l.cap : 0;
      var st = !active ? 'off' : ratio >= .97 ? 'full' : ratio >= .7 ? 'mid' : 'free';
      var offLabel = !open ? '운영 전' : l.openFrom && h < l.openFrom ? l.openFrom + '시부터' : l.temp ? '비활성' : '운영 전';
      return Object.assign({}, l, { active: active, used: used, left: active ? l.cap - used : 0, ratio: ratio, st: st, hot: hot,
        label: { off: offLabel, full: '만차', mid: '보통', free: '여유' }[st] });
    });
  },
  col: { free: '#5E8C61', mid: '#EAB33F', full: '#B4533A', off: '#A69C8B' },
  /* 지금 가장 여유 있는(남은 자리 많은) 운영 중 주차장 */
  best: function(list, exceptId){ return list.filter(function(l){ return l.active && l.st !== 'full' && l.id !== exceptId; }).sort(function(a, b){ return b.left - a.left; })[0] || null; },
  /* 지금 자리(x,y)에서 가까우면서 자리 있는 곳 n개 */
  near: function(list, x, y, exceptId, n){
    return list.filter(function(l){ return l.active && l.st !== 'full' && l.id !== exceptId; })
      .map(function(l){ var dx = l.x - x, dy = (l.y - y) * .71; return { l: l, d: Math.sqrt(dx * dx + dy * dy) + (l.st === 'mid' ? 6 : 0) }; })
      .sort(function(a, b){ return a.d - b.d; }).slice(0, n || 2).map(function(o){ return o.l; });
  },
  gate: function(l){ var P = this; return P.gates.filter(function(g){ return g.qr === l.qr; })[0] || P.gates[0]; },
  byQr: function(qr){ return this.lots.filter(function(l){ return l.qr === qr; })[0] || null; },
  byPost: function(pid){ var hit = null; this.lots.forEach(function(l){ (l.posts || []).forEach(function(p){ if(p.id === pid) hit = { lot: l, post: p }; }); }); return hit; }
};
