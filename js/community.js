// === header.html 가져오기 ===
fetch('./layout/header.html')
  .then(response => response.text())
  .then(data => {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = data;
      setHeaderContent(); // 이 함수도 커뮤니티.js 안에 있어야 돼
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

  } else {
    headerContent.innerHTML = `
      <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="로고" style="width:32px;height:32px; border-radius:50%;">
      <div class="d-flex align-items-center gap-3">
        <i class="bi bi-search" style="font-size: 24px; font-weight: bold; color: #1b1e26;"></i>
        <button type="button" class="btn p-0 m-0" style="background: none; border: none; font-size: 16px; font-weight: 700; color: #1b1e26;">로그인</button>
        <div class="dropdown">
          <button class="btn lang-btn dropdown-toggle" type="button" id="langMenu" data-bs-toggle="dropdown" aria-expanded="false">KR</button>
          <ul class="dropdown-menu dropdown-lang dropdown-menu-end" aria-labelledby="langMenu">
            <li><a class="dropdown-item" href="#">KR</a></li>
            <li><a class="dropdown-item" href="#">EN</a></li>
          </ul>
        </div>
      </div>
    `;
  }
}

// === footer.html 가져오기 ===
fetch('./layout/footer.html')
  .then(response => response.text())
  .then(data => {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = data;

      const footerItems = footerContainer.querySelectorAll('.footer-item');
      const currentPath = window.location.pathname.split('/').pop(); // ex) community.html

      footerItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
          footerItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        }
      });

      footerItems.forEach(item => {
        item.addEventListener('click', (e) => {
          footerItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        });
      });
    }
  })

// 업데이트 데이터
const updateData = {
    label: "업데이트",
    message: "코박 시세조회 리뉴얼!",
    link: "community-detail.html"  // 클릭시 이동할 파일
  };
  
  // 업데이트 박스 그리기
  function renderUpdateBox() {
    const container = document.getElementById('update-container');
    if (!container) return;
  
    const html = `
    <div class="d-flex align-items-center justify-content-between bg-light text-decoration-none px-3" 
         style="border-radius: 30px; height: 36px;">
      <a href="${updateData.link}" class="d-flex align-items-center gap-2 flex-grow-1 text-decoration-none">
        <span class="badge rounded-pill bg-success bg-opacity-10 text-success fw-bold px-2 py-1" style="font-size: 12px;">${updateData.label}</span>
        <span class="fw-semibold text-dark" style="font-size: 12px;">${updateData.message}</span>
      </a>
      <i class="bi bi-x-lg text-muted" role="button" style="font-size: 16px;" onclick="closeUpdateBox()"></i>
    </div>
  `;

  container.innerHTML = html;
}
  
  // X 버튼 누르면 업데이트 박스 닫기
  function closeUpdateBox() {
    const container = document.getElementById('update-container');
    if (container) container.style.display = 'none';
  }
  
  // 페이지 로드 시 실행
  document.addEventListener('DOMContentLoaded', () => {
    renderUpdateBox();
  });