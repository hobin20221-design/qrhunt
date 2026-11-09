/* ===== 서버 주소: 여기만 고치면 모든 페이지에 반영돼요 =====
 * pilot: S8동 시범운영 시트(원본)의 배포 주소 — 이미 인쇄된 QR이 이 서버를 씀
 * fest : 유성국화축제 시뮬레이션 시트(사본)의 배포 주소 — '새 배포'로 받은 /exec 주소를 붙여넣기
 */
window.QR_SERVERS = {
  pilot: { name: 'QR 보물찾기 시범운영', kind: '실제 운영 기록', icon: '🌼', color: '#F5B83D', soft: '#FFF6E0', ink: '#8A5A00',
    period: '2026.10.26–27 · 한밭대 S8동 5층 복도',
    url: 'https://script.google.com/macros/s/AKfycbxg6erW2PqRI4ypkY9MXjvJ3IO1EdC_V4H1QQiyj-3ezjkTvNXHJxsigDJxlNmUuD6u/exec' },
  fest:  { name: '유성국화축제 QR 참여 플랫폼', kind: '시뮬레이션 · 가상 데이터', icon: '🧪', color: '#9B7BEA', soft: '#F2EDFD', ink: '#5B3FB0',
    period: '제17회 유성국화축제 · 유림공원 · QR 23곳 예시 배치',
    url: 'https://script.google.com/macros/s/AKfycbzhSpY7T8yz-EXSjXihWN0nqeTjhttKerSYSIJI9b_aE4nCJhTNaws7YPXXBg4CeIejQQ/exec',
    /* 참가자 화면 '축제장 한눈에 보기'의 구역 설명. mods = 이 구역에 속한 모듈 */
    zones: [
      { name: '게임 구역', where: '동편 · 어은교 건너 오른쪽', mods: ['보물', '퀴즈'], color: '#F5B83D',
        desc: '보물 QR은 2시간마다 몇 곳이 새로 보물이 돼요. 퀴즈 QR은 찍으면 문제가 열리고 한 번만 답할 수 있어요.' },
      { name: '데이트·사진 구역', where: '서편 · 유림공원 안', mods: ['코스'], color: '#9B7BEA',
        desc: '국화 데이트 코스와 포토존 코스 스탬프를 모아요. 코스를 다 돌면 완주 보너스, 여기서 찍은 사진으로 자랑대회에 나갈 수 있어요.' },
      { name: '안내 QR', where: '입구 · 주차장 · 무대 · 체험부스', mods: ['안내'], color: '#64748B',
        desc: '들어온 곳에 맞는 길 안내가 열려요. 체험부스 QR을 찍으면 밤티 자랑대회에 작품을 올릴 수 있어요.' }
    ] }
};
/* 포털·자랑대회·공개현황이 기본으로 쓰는 서버 */
window.QR_DEFAULT = 'fest';
