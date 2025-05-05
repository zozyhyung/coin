// === header.html 가져오기 ===
fetch('./layout/header.html')
  .then(response => response.text())
  .then(data => {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = data;
      setHeaderContent();
    }
  });

  function setHeaderContent() {
    const headerContent = document.getElementById('header-content');
    if (!headerContent) return;
  
    const currentPath = window.location.pathname;
  
    headerContent.innerHTML = `
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="bg-light rounded-pill p-1 d-flex align-items-center" style="gap: 8px;">
          <button id="btn-community" class="btn btn-sm fw-bold rounded-pill px-3 py-1 ${
            currentPath.includes('community.html') ? 'text-dark bg-white' : 'text-muted bg-transparent'
          }">커뮤니티</button>
          <button id="btn-news" class="btn btn-sm fw-bold rounded-pill px-3 py-1 ${
            currentPath.includes('community_news.html') ? 'text-dark bg-white' : 'text-muted bg-transparent'
          }">뉴스</button>
        </div>
        <div class="d-flex gap-2 align-items-center">
          <i class="bi bi-search" style="font-size: 20px;"></i>
          <i class="bi bi-list" style="font-size: 24px;"></i>
        </div>
      </div>
    `;
  
    const btnCommunity = document.getElementById('btn-community');
    const btnNews = document.getElementById('btn-news');
  
    btnCommunity.addEventListener('click', () => {
      // 기존 스타일 토글 유지
      btnCommunity.classList.remove('text-muted');
      btnCommunity.classList.add('text-dark');
      btnNews.classList.remove('text-dark');
      btnNews.classList.add('text-muted');
  
      // 페이지 이동
      if (!currentPath.includes('community.html')) {
        window.location.href = 'community.html';
      }
    });
  
    btnNews.addEventListener('click', () => {
      // 기존 스타일 토글 유지
      btnCommunity.classList.remove('text-dark');
      btnCommunity.classList.add('text-muted');
      btnNews.classList.remove('text-muted');
      btnNews.classList.add('text-dark');
  
      // 페이지 이동
      if (!currentPath.includes('community_news.html')) {
        window.location.href = 'community_news.html';
      }
    });

    const hamburger = document.querySelector('.bi-list');
    hamburger.addEventListener('click', () => {
      openLoginPanel();
    });
  }

// === footer.html 가져오기 ===
fetch('./layout/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = data;

      const currentPath = window.location.pathname.split('/').pop();
      const footerItems = footerContainer.querySelectorAll('.footer-item');

      let matched = false;

      footerItems.forEach(item => {
        const href = item.getAttribute('href');

        // 커뮤니티 뉴스도 커뮤니티로 본다
        if (
          href === 'community.html' &&
          (currentPath === 'community.html' || currentPath === 'community_news.html')
        ) {
          footerItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          matched = true;
        }
      });

      // 나머지 경우는 원래 방식 유지
      if (!matched) {
        footerItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === currentPath) {
            footerItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
          }
        });
      }
    }
  });

  // 스크롤 최상단 이동 버튼 기능
const scrollTopBtn = document.getElementById('scrollTopBtn');

// 스크롤 내릴 때 버튼 보이기
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// 버튼 클릭하면 맨 위로 부드럽게 이동
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== 공지 캐러셀 데이터 =====
const noticeItems = [
  { title: "암호화폐 월렛 엑소더스, 8/10 XMR 지원 중단", description: "셀프 커스터디 암호화폐 월렛 엑소더스가 오는 8월 10일 모네로 지원 중단했습니다.", link: "notice1.html" },
  { title: "한국 여당, 연말까지 암호화폐 ETF 승인 약속", description: "한국의 여당 국민의힘이 현물 암호화폐 상장시수펀드 승인과 디지털 자산 체계 개편을 포함한 광범위 어쩌고", link: "notice2.html" },
  { title: "검찰, 사무라이 지갑 사건 기소 기각 검토중...", description: "연방 검찰과 사무라이 월렛 공동 창립자들의 변호인단은 미국 법무부의 암호화폐 관련 정책 변화에 따라 압축됨.", link: "notice3.html" },
  { title: "비트겟 MILK 무기한 선물 상장", description: "비트켓이 밀크 무기한 선물 상장 했다고 공지했다. 최대 20배 레버리지 거래 지원한다.", link: "notice4.html" },
  { title: "비트코인, 단기 투자자 활동 시작됐다", description: "단기 투자자의 비트코인 거래 활동이 시작됐다는 분석이 나왔다.", link: "notice5.html" },
];

// ===== 공지 캐러셀 그리기 =====
function renderNoticeCarousel() {
  const noticeCarouselInner = document.getElementById('notice-carousel-inner');
  const noticeCarouselIndicators = document.getElementById('notice-carousel-indicators');
  
  if (!noticeCarouselInner || !noticeCarouselIndicators) return;

  noticeCarouselInner.innerHTML = '';
  noticeCarouselIndicators.innerHTML = '';

  noticeItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    div.innerHTML = `
      <a href="${item.link}" class="text-decoration-none text-dark">
        <div>
          <div class="fw-bold mb-1" style="font-size: 14px;">
            <i class="bi bi-lightning-fill text-primary me-1"></i> ${item.title}
          </div>
          <div class="text-muted notice-description">${item.description}</div>
        </div>
      </a>
    `;
    noticeCarouselInner.appendChild(div);

    const button = document.createElement('button');
    button.type = "button";
    button.setAttribute('data-bs-target', '#noticeCarousel');
    button.setAttribute('data-bs-slide-to', index);
    button.className = index === 0 ? 'active' : '';
    button.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    button.setAttribute('aria-label', `Slide ${index + 1}`);
    noticeCarouselIndicators.appendChild(button);
  });
}

// ===== 페이지 로드 시 캐러셀도 렌더링 =====
document.addEventListener('DOMContentLoaded', () => {
  renderNoticeCarousel();
});

// 탭 전환 스크립트
document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
  
      const tab = btn.dataset.tab;
  
      document.querySelectorAll('.tab-content-item').forEach(content => {
        content.style.display = content.id === 'tab-' + tab ? 'block' : 'none';
      });
  
      if (tab === 'home') {
        renderCommunityList('community-list-home', homeCommunityData, 'home');
      } else if (tab === 'realtime') {
        renderCommunityList('community-list-realtime', communityData, 'realtime');
      } else if (tab === 'popular') {
        document.getElementById('popular-filter').style.display = 'flex'; // 🔥 필터 표시
        filterPopularList('1'); // 오늘 기준 필터링된 인기 리스트 렌더링
      } else if (tab === 'exchange') {
        renderCommunityList('community-list-exchange', exchangeCommunityData, 'exchange');
      }
    });
  });
  
/* 하단 리스트 로직 시작 */

// 홈 더미 데이터 시작
const homeCommunityData = [
    {
      symbol1: "DIA",
      rate1: "+1.99%",
      symbol2: null,
      rate2: null,
      title: "펀디AI, 엔비디아 인셉션 합류",
      source: "코인니스",
      time: "1시간 전",
      link: "news1.html",
      sourceLink: "profile_coinness.html",
      coinLink: "coin-dia.html"
    },
    {
      symbol1: "LIT",
      rate1: "+1.60%",
      symbol2: "POL",
      rate2: "+0.15%",
      title: "검찰, 사무라이 지갑 사건 기소 기각 검토 중...보류",
      source: "99Bitcoins_ENG",
      time: "1시간 전",
      link: "news2.html",
      sourceLink: "profile_99bit.html",
      coinLink: "coin-lit.html"
    },
    {
      symbol1: "FUN",
      rate1: "-0.37%",
      symbol2: "XCH",
      rate2: "+0.16%",
      title: "한국 여당, 연말까지 암호화폐 ETF 승인 약속",
      source: "99Bitcoins_ENG",
      time: "1시간 전",
      link: "news3.html",
      sourceLink: "profile_99bit.html",
      coinLink: "coin-fun.html"
    },
    {
      symbol1: "BTC",
      rate1: "+0.25%",
      symbol2: null,
      rate2: null,
      title: "비트코인 ETF, 7연속 순유입 기록…숏포지션은 소폭 증가",
      source: "비인크립토",
      time: "3시간 전",
      link: "news4.html",
      sourceLink: "profile_bein.html",
      coinLink: "coin-btc.html"
    },
    {
      symbol1: "BTC",
      rate1: "+0.25%",
      symbol2: "JOE",
      rate2: "+0.30%",
      title: "크립토차트.제미니 설립자, 트럼프 장남 프라이빗 클럽 방문",
      source: "코인니스",
      time: "3시간 전",
      link: "news5.html",
      sourceLink: "profile_coinness.html",
      coinLink: "coin-btc.html"
    }
  ];
  // 홈 더미 데이터 끝 

  //인기 탭 더미데이터 시작
  const popularCommunityData = [
    {
      symbol1: "BTC",
      rate1: "-0.22%",
      symbol2: "JOE",
      rate2: "-0.31%",
      title: "[암호화폐 동향] 비트코인 엔드게임 예측, 도지코인 5월 강세 전망, 838만 XRP 이동",
      source: "코인리더스",
      time: "14시간 전",
      postedAt: new Date().getTime() - 14 * 60 * 60 * 1000,  // 날짜 비교용
      link: "news_detail_1.html",
      sourceLink: "profile_coinreaders.html",
      coinLink: "coin-btc.html",
      thumbnailImg: "https://source.unsplash.com/random/300x200?bitcoin"
    },
    {
      symbol1: "ETH",
      rate1: "-0.25%",
      symbol2: "CKB",
      rate2: "-0.90%",
      title: "이더리움 ‘준립 위기’ 경고! 부테린마저 떠날까",
      source: "코인리더스",
      time: "15시간 전",
      postedAt: new Date().getTime() - 80 * 60 * 60 * 1000,
      link: "news_detail_2.html",
      sourceLink: "profile_coinreaders.html",
      coinLink: "coin-eth.html",
      thumbnailImg: "https://source.unsplash.com/random/300x200?ethereum"
    },
    {
      symbol1: "TON",
      rate1: "+0.30%",
      symbol2: "JOE",
      rate2: "-0.31%",
      title: "XRP ETF 루머였나…프로세어스 공식 해명",
      source: "코인리더스",
      time: "14시간 전",
      postedAt: new Date().getTime() - 14 * 60 * 60 * 1000,
      link: "news_detail_3.html",
      sourceLink: "profile_coinreaders.html",
      coinLink: "coin-ton.html",
      thumbnailImg: "https://source.unsplash.com/random/300x200?xrp"
    }
  ];
  //인기 탭 더미데이터 끝

  // 거래소 증시 탭 더미데이터 시작
  const exchangeCommunityData = [
    {
      symbol1: "TOKEN", rate1: "-7.61%",
      symbol2: "SERV", rate2: "-0.02%",
      title: "바이낸스, 소닉 네트워크에서 USDC(USDC) 통합 완료 및 입금 개시 - 2025-04-29",
      source: "Binance",
      time: "59분 전",
      link: "exchange_1.html",
      sourceLink: "profile_binance.html"
    },
    {
      symbol1: "FUN", rate1: "-1.22%",
      symbol2: "PERP", rate2: "-0.96%",
      title: "USDⓈ-M ALPACAUSDT 영구 계약 펀딩 금리 상한선 업데이트 (2025-04-29)",
      source: "Binance",
      time: "3시간 전",
      link: "exchange_2.html",
      sourceLink: "profile_binance.html"
    },
    {
      symbol1: "FOR", rate1: "-0.45%",
      symbol2: "LAT", rate2: "-0.48%",
      title: "1231231 계약의 펀딩 비율 결제 빈도 업데이트 (2025-04-29)",
      source: "OKX",
      time: "4시간 전",
      link: "exchange_3.html",
      sourceLink: "profile_binance.html"
    },
    {
      symbol1: "FOR", rate1: "-0.35%",
      symbol2: "LAT", rate2: "-0.81%",
      title: "USDⓈ-M SIGNUSDT 무기한 계약의 펀딩 비율 결제 빈도 업데이트 (2025-04-29)",
      source: "Bybit",
      time: "4시간 전",
      link: "exchange_3.html",
      sourceLink: "profile_binance.html"
    },
    {
      symbol1: "FOR", rate1: "-0.15%",
      symbol2: "LAT", rate2: "-0.78%",
      title: "한 계약의 펀딩 비율 결제 빈도 업데이트 (2025-04-29)",
      source: "업비트",
      time: "4시간 전",
      link: "exchange_3.html",
      sourceLink: "profile_binance.html"
    }
  ];
  // 거래소 증시 탭 더미데이터 끝

// 커뮤니티 리스트 더미 데이터
const communityData = [
  {
    id: 1,
    profileImg: 'https://randomuser.me/api/portraits/women/44.jpg',
    username: '코박누나',
    role: '운영자',
    tag: '공지/이벤트',
    postedAt: '1주 전',
    daysAgo: 7,
    important: 8, // 중요도 추가
    title: '[EVENT] CBK 에어드랍 이벤트! 코비가 되어 꿀 캐러 ~ 🍯',
    content: '라이브 안내에 이어 또 하나의 꿀소식! 이번 주에도 달콤~한 에어드랍32222222222222222222222222222222222 꿀을 찾아...',
    coinImg: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
    coinName: 'CBK',
    coinRate: '-0.38%',
    likeCount: 88,
    commentCount: 27,
    thumbnailImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'
  },
  {
    id: 2,
    profileImg: 'https://randomuser.me/api/portraits/women/43.jpg',
    username: '데일리코박',
    role: '기자단단',
    tag: '크립토 기자단 ',
    postedAt: '1주 전',
    daysAgo: 7,
    important: 7, // 중요도 추가
    title: '[EVENT] CBK 에어드랍 이벤트! 코비가 되어 꿀 캐러 ~ 🍯',
    content: '라이브 안내에 이어 또 하나의 꿀소식! 이번 주에도 달콤~한  꿀을 찾아...',
    coinImg: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
    coinName: 'CBK',
    coinRate: '-0.38%',
    likeCount: 82,
    commentCount: 10,
    thumbnailImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'
  },
  {
    id: 3,
    profileImg: 'https://randomuser.me/api/portraits/women/42.jpg',
    username: '코박누나2',
    role: '운영자1',
    tag: '공지/이벤트',
    postedAt: '5일 전',
    daysAgo: 5, // 추가 
    important: 6, // 중요도 추가
    title: '[EVENT] CBK 에어드랍 이벤트! 코비가 되어 꿀 캐러 ~ 🍯',
    content: '라이브 안내에 이어 또 하나의 꿀소식! 이번 주에도 달콤~한  꿀을 찾아...',
    coinImg: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
    coinName: 'CBK',
    coinRate: '-0.38%',
    likeCount: 105,
    commentCount: 9,
    thumbnailImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'
  },
  {
    id: 4,
    profileImg: 'https://randomuser.me/api/portraits/women/41.jpg',
    username: '코박누나3',
    role: '운영자2',
    tag: '공지/이벤트',
    postedAt: '3일 전',
    daysAgo: 3, // 추가 
    important: 5, // 중요도 추가
    title: '[EVENT] CBK 에어드랍 이벤트! 코비가 되어 꿀 캐러 ~ 🍯',
    content: '라이브 안내에 이어 또 하나의 꿀소식! 이번 주에도 달콤~한  꿀을 찾아...',
    coinImg: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
    coinName: 'CBK',
    coinRate: '-0.38%',
    likeCount: 885,
    commentCount: 250,
    thumbnailImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'
  },
  {
    id: 5,
    profileImg: 'https://randomuser.me/api/portraits/women/39.jpg',
    username: '코박누나4',
    role: '운영자3',
    tag: '공지/이벤트',
    postedAt: '10일 전',
    daysAgo: 10, // 추가 
    important: 9, // 중요도 추가
    title: '[EVENT] CBK 에어드랍 이벤트! 코비가 되어 꿀 캐러 ~ 🍯',
    content: '라이브 안내에 이어 또 하나의 꿀소식! 이번 주에도 달콤~한  꿀을 찾아...',
    coinImg: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
    coinName: 'CBK',
    coinRate: '-0.38%',
    likeCount: 54,
    commentCount: 8,
    thumbnailImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400'
  }
];

/* 인기 탭 기간별 리스트 처리 사적 */
function filterPopularPeriod(days) {
    document.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    filterPopularList(days);
  }

function filterPopularList(days) {
    updateFilterButtons(days); // 🔥 버튼 활성화 상태 업데이트
    const now = new Date().getTime();
    const range = parseInt(days) * 24 * 60 * 60 * 1000;
    const filtered = popularCommunityData.filter(item => now - item.postedAt <= range);
    renderCommunityList('community-list-popular', filtered, 'popular');
  }

  function updateFilterButtons(selectedDays) {
    document.querySelectorAll('#popular-filter button').forEach(btn => {
      const value = btn.textContent.trim();
      if ((value === '오늘' && selectedDays === '1') ||
          (value === '일주일' && selectedDays === '7') ||
          (value === '한달' && selectedDays === '30')) {
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-dark');
      } else {
        btn.classList.remove('btn-dark');
        btn.classList.add('btn-outline-secondary');
      }
    });
  }
/* 인기 탭 기간별 리스트 처리 끝 */

/* 거래소 증시 거래소별 리스트 처리 시작 */
function filterExchangeList(exchangeName) {
    document.querySelectorAll('.exchange-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.trim().includes(exchangeName)) {
        btn.classList.add('active');
      }
    });
  
    if (exchangeName === '전체') {
      renderCommunityList('community-list-exchange', exchangeCommunityData, 'exchange');
    } else {
      const filtered = exchangeCommunityData.filter(item => item.source === exchangeName);
      renderCommunityList('community-list-exchange', filtered, 'exchange');
    }
  }
  /* 거래소 증시 거래소별 리스트 처리 끝 */

// 인기 리스트 출력
function renderCommunityList(containerId, data, tabType = '') {
    const listContainer = document.getElementById(containerId);
    if (!listContainer) return;
    listContainer.innerHTML = '';
  
    data.forEach(item => {
      let html = '';
  
      if (tabType === 'home') {
        // 홈 탭용 카드
        html = `
        <div class="community-item p-3 border-bottom">
          <div class="mb-1" style="font-size: 13px; font-weight: 600; color: ${item.rate1.startsWith('-') ? '#dc3545' : '#28a745'};">
            <a href="${item.coinLink}" class="text-decoration-none" style="color: inherit;">${item.symbol1} ${item.rate1}</a>
            ${item.symbol2 ? `&nbsp;&nbsp;<a href="${item.coinLink}" class="text-decoration-none" style="color: inherit;">${item.symbol2} ${item.rate2}</a>` : ''}
          </div>
          <div class="fw-bold text-truncate" style="font-size: 15px;">
            <a href="${item.link}" class="text-dark text-decoration-none">${item.title}</a>
          </div>
          <div class="text-muted mt-1" style="font-size: 13px;">
            <a href="${item.sourceLink}" class="text-muted text-decoration-none">${item.source} · ${item.time}</a>
          </div>
        </div>
      `;
      } else if (tabType === 'popular') {
        html = `
          <div class="community-item d-flex p-3 border-bottom">
            <div class="flex-grow-1">
              <div class="mb-1" style="font-size: 13px; font-weight: 600; color: ${item.rate1.startsWith('-') ? '#dc3545' : '#28a745'};">
                <a href="${item.coinLink}" class="text-decoration-none" style="color: inherit;">${item.symbol1} ${item.rate1}</a>
                ${item.symbol2 ? `&nbsp;&nbsp;<a href="${item.coinLink}" class="text-decoration-none" style="color: inherit;">${item.symbol2} ${item.rate2}</a>` : ''}
              </div>
              <div class="fw-bold text-truncate popular-title" style="font-size: 15px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                <a href="${item.link}" class="text-dark text-decoration-none">${item.title}</a>
              </div>
              <div class="text-muted mt-1" style="font-size: 13px;">
                <a href="${item.sourceLink}" class="text-muted text-decoration-none">${item.source} · ${item.time}</a>
              </div>
            </div>
            <div class="ms-3 flex-shrink-0">
              <a href="${item.link}">
                <img src="${item.thumbnailImg}" alt="썸네일" class="rounded-3" style="width:90px;height:90px;object-fit:cover;">
              </a>
            </div>
          </div>
        `;
      } else if (tabType === 'exchange') {
        html = `
          <div class="community-item p-3 border-bottom">
            <div class="mb-1" style="font-size: 13px; font-weight: 600; color: ${item.rate1.startsWith('-') ? '#dc3545' : '#28a745'};">
              <a href="${item.coinLink || '#'}" class="text-decoration-none" style="color: inherit;">${item.symbol1} ${item.rate1}</a>
              ${item.symbol2 ? `&nbsp;&nbsp;<a href="${item.coinLink || '#'}" class="text-decoration-none" style="color: inherit;">${item.symbol2} ${item.rate2}</a>` : ''}
            </div>
            <div class="fw-bold text-truncate" style="font-size: 15px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              <a href="${item.link}" class="text-dark text-decoration-none">${item.title}</a>
            </div>
            <div class="text-muted mt-1" style="font-size: 13px;">
              <a href="${item.sourceLink}" class="text-muted text-decoration-none">${item.source} · ${item.time}</a>
            </div>
          </div>
        `;
      } else {
        // 다른 탭 공통 카드 (기존 스타일)
        html = `
          <div class="community-item d-flex p-3 border-bottom">
            <div class="flex-grow-1 d-flex flex-column">
              <div class="d-flex align-items-center mb-2">
                <img src="${item.profileImg}" alt="프로필" class="rounded-circle me-2" style="width:32px;height:32px;">
                <div>
                  <div class="small fw-bold">${item.username} <span class="badge bg-primary ms-1">${item.role}</span></div>
                  <div class="text-muted small">${item.tag} · ${item.postedAt}</div>
                </div>
              </div>
              <div class="mb-2 d-flex">
                <div class="community-text-area">
                  <a href="#" class="title text-decoration-none d-block">${item.title}</a>
                  <div class="content">${item.content}</div>
                </div>
                <div class="ms-3 flex-shrink-0">
                  <img src="${item.thumbnailImg}" alt="썸네일" class="rounded-3" style="width:90px;height:90px;object-fit:cover;">
                </div>
              </div>
              <div class="d-flex align-items-center gap-4 mt-2">
                <a href="#" class="d-flex align-items-center text-muted text-decoration-none">
                  <i class="bi bi-emoji-smile"></i> <span class="ms-1">${item.likeCount}</span>
                </a>
                <a href="#" class="d-flex align-items-center text-muted text-decoration-none">
                  <i class="bi bi-chat"></i> <span class="ms-1">${item.commentCount}</span>
                </a>
              </div>
            </div>
          </div>
        `;
      }
  
      listContainer.insertAdjacentHTML('beforeend', html);
    });
  }

// 공유 팝업 열기
function openSharePopup() {
  document.getElementById('share-popup').style.display = 'block';
}

// 공유 팝업 닫기
function closeSharePopup() {
  document.getElementById('share-popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderNoticeCarousel();
    renderCommunityList('community-list-home', homeCommunityData, 'home');
  });

/* header 햄버거 버튼 시작 */
// 로그인 패널 열기
function openLoginPanel() {
  const panel = document.getElementById('login-panel');
  if (panel) {
    setupLoginPanelContent();
    panel.classList.add('show');
  }

  // body 스크롤 막기
  document.body.classList.add('no-scroll');

  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 10);
}

// 로그인 패널 닫기
function closeLoginPanel() {
  const panel = document.getElementById('login-panel');
  if (panel) panel.classList.remove('show');

  // body 스크롤 해제
  document.body.classList.remove('no-scroll');

  document.removeEventListener('click', handleOutsideClick);
}

// 바깥 클릭 시 닫기
function handleOutsideClick(e) {
  const panel = document.getElementById('login-panel');
  const hamburger = document.querySelector('.bi-list');

  if (
    panel &&
    !panel.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    
    // 클릭 무효화해서 캐러셀, 링크 등 안 작동하게 막음
    e.preventDefault();
    e.stopPropagation();
    closeLoginPanel();
  }
}

const recentPosts = [
  {
    title: "[암호화폐 동향] 비트코인 엔드게임 시나리오",
    tag: "코인뉴스",
    link: "post-detail-1.html"
  },
  {
    title: "펀디AI, 엔비디아 인셉션 합류",
    tag: "코인뉴스",
    link: "post-detail-2.html"
  },
  {
    title: "애리조나 호재로 비트코인 소폭 상승",
    tag: "코인뉴스",
    link: "post-detail-3.html"
  },
  {
    title: "[EVENT] CBK 트위터 팔로우 이벤트",
    tag: "공지/이벤트",
    link: "post-detail-4.html"
  }
];

// 로그인 페이지로 이동 
function moveToLogin() {
  sessionStorage.setItem('prevPage', window.location.pathname);
  window.location.href = 'login.html'; // 실제 로그인 페이지 주소로 바꾸세요
}

function setupLoginPanelContent() {
  const inner = document.getElementById('login-panel-inner');
  if (!inner) return;

  const user = sessionStorage.getItem('user');

  if (user) {
    const recentPostHtml = recentPosts.map(post => `
      <li class="d-flex justify-content-between align-items-center recent-view-item" onclick="location.href='${post.link}'">
        <span class="text-truncate title" style="max-width: 80%;">${post.title}</span>
        <span class="badge bg-light text-dark">${post.tag}</span>
      </li>
    `).join('');

    inner.innerHTML = `
      <div class="login-menu-wrapper">
        <div class="login-menu-body">
          <div class="login-menu-grid">
            <div class="menu-item" onclick="location.href='alert.html'">
              <i class="bi bi-bell"></i>
              <span>알림</span>
            </div>
            <div class="menu-item profile-icon" onclick="location.href='profile.html'">
              <i class="bi bi-person-circle" style="color: #9376e0;"></i>
              <span>프로필</span>
            </div>
            <div class="menu-item" onclick="location.href='settings.html'">
              <i class="bi bi-gear"></i>
              <span>설정</span>
            </div>
          </div>

          <div class="mt-4">
            <div class="fw-bold mb-2">최근 본 게시글</div>
            <ul class="list-unstyled small recent-view-list">
              ${recentPostHtml}
            </ul>

            <div class="fw-bold mt-4 mb-2">참여 스페이스</div>
            <div class="text-muted small">관심 스페이스가 없습니다.</div>
            <div class="text-primary mt-2" style="cursor:pointer;">더 보기</div>
          </div>
        </div>

        <div class="login-menu-footer">
          <button class="btn btn-outline-secondary" onclick="logout()">로그아웃</button>
        </div>
      </div>
    `;
  } else {
    inner.innerHTML = `
      <div class="text-center mt-5">
        <img src="./images/rocket.png" alt="로켓" style="width: 60px;" />
        <p class="mt-3 fw-bold">더 많은 기능을 위해<br />로그인하세요.</p>
        <button class="btn btn-primary mt-3 px-4" onclick="moveToLogin()">로그인</button>
      </div>
    `;
  }
}

function logout() {
  sessionStorage.removeItem('user');
  closeLoginPanel();
  location.reload(); // 또는 필요 시 메인 페이지 이동
}
/* header 햄버거 버튼 끝 */