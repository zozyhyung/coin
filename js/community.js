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

  if (window.location.pathname.includes('community.html')) {
    headerContent.innerHTML = `
      <div class="d-flex align-items-center justify-content-between w-100">
        <div class="bg-light rounded-pill p-1 d-flex align-items-center" style="gap: 8px;">
          <button id="btn-community" class="btn btn-sm fw-bold text-dark bg-white rounded-pill px-3 py-1">커뮤니티</button>
          <button id="btn-news" class="btn btn-sm fw-bold text-muted bg-transparent rounded-pill px-3 py-1">뉴스</button>
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
      btnCommunity.classList.remove('text-muted');
      btnCommunity.classList.add('text-dark');
      btnNews.classList.remove('text-dark');
      btnNews.classList.add('text-muted');
    });

    btnNews.addEventListener('click', () => {
      btnCommunity.classList.remove('text-dark');
      btnCommunity.classList.add('text-muted');
      btnNews.classList.remove('text-muted');
      btnNews.classList.add('text-dark');
    });

  }
}

// === footer.html 가져오기 ===
fetch('./layout/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = data;
    }
  });

// 업데이트 박스 표시
const updateData = {
  label: "업데이트",
  message: "코박 시세조회 리뉴얼!",
  link: "community-detail.html"
};

function renderUpdateBox() {
  const container = document.getElementById('update-container');
  if (!container) return;

  const html = `
    <div class="d-flex align-items-center justify-content-between bg-light text-decoration-none px-3" style="border-radius: 30px; height: 36px;">
      <a href="${updateData.link}" class="d-flex align-items-center gap-2 flex-grow-1 text-decoration-none">
        <span class="badge rounded-pill bg-success bg-opacity-10 text-success fw-bold px-2 py-1" style="font-size: 12px;">${updateData.label}</span>
        <span class="fw-semibold text-dark" style="font-size: 12px;">${updateData.message}</span>
      </a>
      <i class="bi bi-x-lg text-muted" role="button" style="font-size: 16px;" onclick="closeUpdateBox()"></i>
    </div>
  `;
  container.innerHTML = html;
}

function closeUpdateBox() {
  const container = document.getElementById('update-container');
  if (container) container.style.display = 'none';
}

// 페이지 로드 시 업데이트 박스 렌더링
renderUpdateBox();

// ===== 공지 캐러셀 데이터 =====
const noticeItems = [
  { title: "트럼프 취임 100일 소식", description: "이번 주 애플과 마이크로소프트 등 기업 실적 발표가 예정되어 있습니다.", link: "notice1.html" },
  { title: "트럼프와 바이낸스 회동", description: "트럼프 일가의 WLFI 공동 설립자와 자오창펑이 회동하여 암호화폐 채택을 논의했습니다.", link: "notice2.html" },
  { title: "리플 갈 이유", description: "리플이 가는 이유는 사장 이름 때문입니다.", link: "notice3.html" },
  { title: "암호화폐 어려워", description: "비트코인과 이더리움이 공급문제에 직면하며 높은 변동성을 보입니다.", link: "notice4.html" },
  { title: "빗썸 이벤트 혜택 안내", description: "빗썸과 KB국민카드의 이벤트로 4만원을 혜택으로 받았습니다.", link: "notice5.html" },
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
          <div class="text-muted" style="font-size: 13px;">${item.description}</div>
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

// 필터 팝업 로직
let selectedPeriod = '한달';
let selectedSort = '최신순';

function selectPeriod(period) {
  selectedPeriod = period;
  updateFilterUI();
}

function selectSort(sort) {
  selectedSort = sort;
  updateFilterUI();
}

function updateFilterUI() {
  document.querySelectorAll('#period-options .filter-option').forEach(opt => {
    opt.classList.toggle('active', opt.innerText === selectedPeriod);
  });
  document.querySelectorAll('#sort-options .filter-option').forEach(opt => {
    opt.classList.toggle('active', opt.innerText === selectedSort);
  });
}

function confirmFilter() {
  const filterButton = document.getElementById('filterButton');
  if (filterButton) {
    filterButton.innerHTML = `${selectedPeriod} ${selectedSort} ▼`;
  }
  sortCommunityData();  // ✅ 이거 추가!
  closeFilterPopup();
}

function sortCommunityData() {
  let filteredData = [...communityData];

  // 🔥 1. 기간 필터링 먼저
  if (selectedPeriod === '하루') {
    filteredData = filteredData.filter(item => item.daysAgo <= 1);
  } else if (selectedPeriod === '일주일') {
    filteredData = filteredData.filter(item => item.daysAgo <= 7);
  } else if (selectedPeriod === '한달') {
    filteredData = filteredData.filter(item => item.daysAgo <= 30);
  } else if (selectedPeriod === '반년') {
    filteredData = filteredData.filter(item => item.daysAgo <= 180);
  }

  // 🔥 2. 정렬
  if (selectedSort === '최신순') {
    filteredData.sort((a, b) => a.daysAgo - b.daysAgo); // 최신순 (daysAgo 작을수록 최신)
  } else if (selectedSort === '인기순') {
    filteredData.sort((a, b) => b.likeCount - a.likeCount); // 인기순 (likeCount 큰순)
  } else if (selectedSort === '중요순') {
    filteredData.sort((a, b) => b.important - a.important); // 중요순 (important 큰순)
  } else if (selectedSort === '걱정순') {
    filteredData.sort((a, b) => b.commentCount - a.commentCount); // 걱정순 (commentCount 큰순)
  }

  // 🔥 3. 렌더링
  renderCommunityList(filteredData);
}

function openFilterPopup() {
  const popup = document.getElementById('filter-popup');
  popup.style.display = 'block';
  setTimeout(() => popup.classList.add('show'), 10);
}

function closeFilterPopup() {
  const popup = document.getElementById('filter-popup');
  popup.classList.remove('show');
  setTimeout(() => popup.style.display = 'none', 300);
}

document.getElementById('filter-header').addEventListener('click', openFilterPopup);

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

// community 리스트 출력
function renderCommunityList(data = communityData) {
  const listContainer = document.getElementById('community-list');
  listContainer.innerHTML = '';

  data.forEach(item => {  // communityData 대신 data 사용!
    const html = `
      <div class="community-item d-flex p-3 border-bottom">
        <div class="flex-grow-1 d-flex flex-column">
          <div class="d-flex align-items-center mb-2">
            <img src="${item.profileImg}" alt="프로필" class="rounded-circle me-2" style="width:32px;height:32px;">
            <div>
              <div class="small">
                <a href="community-detail.html" class="fw-bold text-dark text-decoration-none">${item.username}</a>
                <span class="badge bg-primary ms-1">${item.role}</span>
              </div>
              <div class="text-muted small">
                <a href="tag-list.html" class="text-muted text-decoration-none">${item.tag}</a> · ${item.postedAt}
              </div>
            </div>
          </div>

          <div class="mb-2 d-flex">
  <div class="community-text-area">
    <a href="community-detail.html" class="title text-decoration-none d-block">
      ${item.title}
    </a>
    <div class="content">${item.content}</div>
  </div>
  <div class="ms-3 flex-shrink-0">
    <img src="${item.thumbnailImg}" alt="썸네일" class="rounded-3" style="width:90px;height:90px;object-fit:cover;">
  </div>
</div>

          <div class="mt-2">
            <div class="d-flex align-items-center gap-2">
              <a href="coin-chart.html" class="coin-price-badge text-decoration-none d-flex align-items-center gap-1 px-2 py-1 border rounded-pill small">
                <img src="${item.coinImg}" alt="코인" style="width:20px;height:20px;"> ${item.coinName}
                <span class="text-danger">${item.coinRate}</span>
              </a>
            </div>
            <div class="d-flex align-items-center gap-4 mt-2">
              <a href="comment-page.html" class="d-flex align-items-center text-muted text-decoration-none">
                <i class="bi bi-emoji-smile"></i> <span class="ms-1">${item.likeCount}</span>
              </a>
              <a href="comment-page.html" class="d-flex align-items-center text-muted text-decoration-none">
                <i class="bi bi-chat"></i> <span class="ms-1">${item.commentCount}</span>
              </a>
              <button onclick="openSharePopup()" class="ms-auto btn p-0 border-0 bg-transparent">
                <i class="bi bi-box-arrow-up-right"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;
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
  sortCommunityData(); // 🔥 정렬해서 출력하도록 변경
});