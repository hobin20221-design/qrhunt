/* ===== 서버 주소: 여기만 고치면 모든 페이지에 반영돼요 =====
 * pilot: S8동 시범운영 시트(원본)의 배포 주소 — 이미 인쇄된 QR이 이 서버를 씀
 * fest : 유성국화축제 시뮬레이션 시트(사본)의 배포 주소 — '새 배포'로 받은 /exec 주소를 붙여넣기
 */
window.QR_SERVERS = {
  pilot: { name: 'S8동 시범운영', url: 'https://script.google.com/macros/s/AKfycbxg6erW2PqRI4ypkY9MXjvJ3IO1EdC_V4H1QQiyj-3ezjkTvNXHJxsigDJxlNmUuD6u/exec' },
  fest:  { name: '유성국화축제 (시뮬레이션)', url: https://script.google.com/macros/s/AKfycbzhSpY7T8yz-EXSjXihWN0nqeTjhttKerSYSIJI9b_aE4nCJhTNaws7YPXXBg4CeIejQQ/exec }
};
/* 포털·자랑대회·공개현황이 기본으로 쓰는 서버 */
window.QR_DEFAULT = 'fest';
