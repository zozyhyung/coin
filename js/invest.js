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

    const user = sessionStorage.getItem('user');
  
    if (user) {
      // 로그인된 경우
      headerContent.innerHTML = `
      <div class="d-flex align-items-center justify-content-between w-100 px-2 py-2">
        <div class="d-flex align-items-center gap-2">
          <button id="btn-back" class="btn p-0 border-0 bg-transparent">
            <i class="bi bi-arrow-left" style="font-size: 22px;"></i>
          </button>
          <span class="fw-bold" style="font-size: 18px;">투자정보</span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-search" style="font-size: 24px; font-weight: bold; color: #1b1e26;"></i>
          <i class="bi bi-bell" id="alertIcon" style="font-size: 24px; cursor: pointer;"></i>
          <i class="bi bi-person-circle" id="profileIcon" style="font-size: 24px; cursor: pointer; color: #9376e0;"></i>
          <i class="bi bi-list" style="font-size: 24px;"></i>
        </div>
        </<div>
      `;
  
      // 팝업 토글 (간단한 토글만 구현 - 내용은 비워둠)
      setTimeout(() => {
        const bell = document.getElementById('alertIcon');
        const profile = document.getElementById('profileIcon');
  
        if (bell) {
          bell.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePopup('alert-popup');
          });
        }
  
        if (profile) {
          profile.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePopup('profile-popup');
          });
        }
  
        // 바깥 클릭 시 닫기
        document.addEventListener('click', () => {
          closePopup('alert-popup');
          closePopup('profile-popup');
        });
      }, 10);
  
      // 팝업 추가 삽입
      const userData = JSON.parse(sessionStorage.getItem('user'));
      const nickname = userData?.nickname || '닉네임';
      
      const popupHtml = `
      <div id="alert-popup" class="popup-box d-none">
        <div class="p-3">알림이 없습니다.</div>
      </div>
      <div id="profile-popup" class="popup-box d-none" style="
        position: absolute;
        top: 60px;
        right: 20px;
        width: 200px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        font-size: 14px;
      ">
        <div class="px-3 py-2 d-flex align-items-center">
          <i class="bi bi-person-circle me-2" style="font-size: 20px; color: #9376e0;"></i>
          <span class="fw-normal text-dark" style="font-weight: 500;">${nickname}</span>
        </div>
        <ul class="list-unstyled m-0">
          <li class="px-3 py-2 hover-bg text-muted" onclick="location.href='profile.html'">마이페이지 이동</li>
          <li class="px-3 py-2 hover-bg text-muted" onclick="location.href='space.html'">스페이스 이동</li>
          <li class="px-3 py-2 hover-bg text-danger" onclick="logout()">로그아웃</li>
        </ul>
      </div>
    `;
      document.body.insertAdjacentHTML('beforeend', popupHtml);
  
    } else {
    headerContent.innerHTML = `
      <div class="d-flex align-items-center justify-content-between w-100 px-2 py-2">
        <div class="d-flex align-items-center gap-2">
          <button id="btn-back" class="btn p-0 border-0 bg-transparent">
            <i class="bi bi-arrow-left" style="font-size: 22px;"></i>
          </button>
          <span class="fw-bold" style="font-size: 18px;">투자정보</span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-search" style="font-size: 24px; font-weight: bold; color: #1b1e26;"></i>
          <button type="button" class="btn-login btn p-0 m-0" style="background: none; border: none; font-size: 16px; font-weight: 700; color: #1b1e26;">로그인</button>
          <i class="bi bi-list" style="font-size: 24px;"></i>
        </div>
      </div>
    `;

    setTimeout(() => {
      const loginBtn = document.querySelector('.btn-login');
      if (loginBtn) {
        loginBtn.addEventListener('click', () => {
          sessionStorage.setItem('prevPage', window.location.pathname);
          window.location.href = 'login.html';
        });
      } else {
        console.warn('로그인 버튼 못 찾음');
      }
    }, 10);
    }
  
    document.getElementById('btn-back')?.addEventListener('click', () => {
      const ref = document.referrer;
      if (ref.includes('community')) {
        window.location.href = 'community.html';
      } else {
        window.location.href = 'index.html';
      }
    });

    const hamburger = document.querySelector('.bi-list');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        openLoginPanel();
      });
    }
  }

  function togglePopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
      popup.classList.toggle('d-none');
    }
  }
  function closePopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
      popup.classList.add('d-none');
    }
  }

// === footer.html 가져오기 ===
fetch('./layout/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = data;

      // 현재 경로 기반으로 footer active 설정
      const currentPath = window.location.pathname.split('/').pop(); // ex: community.html
      const footerItems = footerContainer.querySelectorAll('.footer-item');

      footerItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
          footerItems.forEach(i => i.classList.remove('active')); // 전부 초기화
          item.classList.add('active'); // 현재만 active
        }
      });
    }
  });

  /* 탭 로직 시작 */
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      
      // 탭 상태 업데이트
    currentTabType = type;
  
      // 버튼 UI 토글
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
  
      // 설명 텍스트 토글
      document.querySelectorAll('.invest-filter-description .desc').forEach(desc => {
        if (desc.getAttribute('data-type') === type) {
          desc.classList.add('active');
        } else {
          desc.classList.remove('active');
        }
      });
  
      // 🔥 나중에 코인 필터링 여기에 연결하면 됨
      renderCoins()
    });
  });
    /* 탭 로직 끝 */

  const dummyCoins = [
    { id: 1, name: "비트코인", code: "BTC", priceKRW: 137327539, priceUSD: 96223, rate: "+1.44%", starred: false },
    { id: 2, name: "이더리움", code: "ETH", priceKRW: 2637543, priceUSD: 1848.1, rate: "+2.89%", starred: false },
    { id: 3, name: "테더", code: "USDT", priceKRW: 1427, priceUSD: 1, rate: "-0%", starred: false },
    { id: 4, name: "리플", code: "XRP", priceKRW: 3197, priceUSD: 2.24, rate: "+0.74%", starred: false },
    { id: 5, name: "바이낸스 코인", code: "BNB", priceKRW: 861132, priceUSD: 555.1, rate: "+0.36%", starred: false },
    { id: 6, name: "솔라나", code: "SOL", priceKRW: 216303, priceUSD: 130.1, rate: "+3.4%", starred: false },
    { id: 7, name: "유에스디 코인", code: "USDC", priceKRW: 1427, priceUSD: 1, rate: "+0.02%", starred: false },
    { id: 8, name: "도지코인", code: "DOGE", priceKRW: 255.7, priceUSD: 0.19, rate: "+3.01%", starred: false },
    { id: 9, name: "에이다", code: "ADA", priceKRW: 1008, priceUSD: 0.67, rate: "+1.71%", starred: false },
    { id: 10, name: "트론", code: "TRX", priceKRW: 355.2, priceUSD: 0.12, rate: "+1.4%", starred: false },
    { id: 11, name: "리도 스테이크 이더", code: "STETH", priceKRW: 2635716, priceUSD: 1848.5, rate: "+3.16%", starred: false }
  ];
  
  let currentCurrency = "KRW";
  let showFavoritesOnly = false;
  let currentTabType = 'all'; // 초기 탭 상태

  function renderCoins() {
    const list = document.getElementById('coin-list');
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    list.innerHTML = '';
  
    let filtered = [...dummyCoins];
  
    if (currentTabType === 'up') {
        filtered.sort((a, b) => parseRate(b.rate) - parseRate(a.rate));
      } else if (currentTabType === 'down') {
        filtered.sort((a, b) => parseRate(a.rate) - parseRate(b.rate));
      } else if (currentTabType === 'hot') {
        filtered.sort((a, b) => b.name.length - a.name.length);
      }
  
    filtered.forEach((coin, idx) => {
      if (showFavoritesOnly && !coin.starred) return;
      if (keyword && !coin.name.toLowerCase().includes(keyword) && !coin.code.toLowerCase().includes(keyword)) return;
  
      const price = currentCurrency === 'KRW'
        ? `${coin.priceKRW.toLocaleString()}원`
        : `$${coin.priceUSD.toLocaleString()}`;
      const rateColor = coin.rate.startsWith('+') ? 'text-success' : 'text-danger';
      const starClass = coin.starred ? 'star active' : 'star';
  
      list.innerHTML += `
        <div class="d-flex justify-content-between align-items-center coin-item" onclick="goToCoinDetail('${coin.code}')">
          <div class="d-flex align-items-center gap-2">
            <div class="rank">${idx + 1}</div>
            <img src="./img/icon_${coin.code}.png" alt="${coin.code}" />
            <div>
              <div class="coin-name">${coin.name} <span class="coin-code">${coin.code}</span></div>
              <div class="price">
                ${price}
                <span class="rate ${rateColor}">${coin.rate}</span>
              </div>
            </div>
          </div>
          <i class="bi bi-star-fill ${starClass}" onclick="event.stopPropagation(); toggleStar(${coin.id})"></i>
        </div>
      `;
    });
  }

  function parseRate(rateStr) {
    return parseFloat(rateStr.replace('%', ''));
  }

  function goToCoinDetail(code) {
    window.location.href = `coin_detail.html?code=${code}`;
  }
  
  function toggleStar(id) {
    const coin = dummyCoins.find(c => c.id === id);
    if (coin) {
      coin.starred = !coin.starred;
      renderCoins();
    }
  }
  
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
  
      const title = btn.dataset.type;
      document.querySelector('.filter-title').innerText = title;
      document.querySelector('.filter-sub').innerText = {
        '전체': '시가총액이 가장 높은 코인으로 모았어요.',
        '상승률': '지난 24시간 동안 가장 수익률이 좋은 코인을 모았어요.',
        '하락률': '지난 24시간 동안 가장 하락률이 높은 코인을 모았어요.',
        '지금 인기 있는': '지난 3시간 동안 가장 많이 검색된 코인을 모았어요.'
      }[title];
      currentTabType = type;
      renderCoins();
    });
  });
  
  document.getElementById('btn-all').addEventListener('click', () => {
    showFavoritesOnly = false;
    document.getElementById('btn-all').classList.add('active');
    document.getElementById('btn-favorite').classList.remove('active');
    renderCoins();
  });
  
  document.getElementById('btn-favorite').addEventListener('click', () => {
    showFavoritesOnly = true;
    document.getElementById('btn-all').classList.remove('active');
    document.getElementById('btn-favorite').classList.add('active');
    renderCoins();
  });
  
  document.getElementById('currency-select').addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    renderCoins();
  });
  
  document.getElementById('search-input').addEventListener('input', () => {
    renderCoins();
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
  
  // 초기 렌더링
  renderCoins();