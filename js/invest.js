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
  
    headerContent.innerHTML = `
      <div class="d-flex align-items-center justify-content-between w-100 px-2 py-2">
        <div class="d-flex align-items-center gap-2">
          <button id="btn-back" class="btn p-0 border-0 bg-transparent">
            <i class="bi bi-arrow-left" style="font-size: 22px;"></i>
          </button>
          <span class="fw-bold" style="font-size: 18px;">투자정보</span>
        </div>
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-search" style="font-size: 20px;"></i>
          <i class="bi bi-bell" style="font-size: 20px;"></i>
          <i class="bi bi-person-circle" style="font-size: 20px;"></i>
          <div class="dropdown">
            <button class="btn lang-btn dropdown-toggle p-0 border-0 bg-transparent" type="button" id="langMenu" data-bs-toggle="dropdown" aria-expanded="false">KR</button>
            <ul class="dropdown-menu dropdown-lang dropdown-menu-end" aria-labelledby="langMenu">
              <li><a class="dropdown-item" href="#">KR</a></li>
              <li><a class="dropdown-item" href="#">EN</a></li>
            </ul>
          </div>
        </div>
      </div>
    `;
  
    document.getElementById('btn-back')?.addEventListener('click', () => {
      const ref = document.referrer;
      if (ref.includes('community')) {
        window.location.href = 'community.html';
      } else {
        window.location.href = 'index.html';
      }
    });
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
  
  // 초기 렌더링
  renderCoins();