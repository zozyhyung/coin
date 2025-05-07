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
      // 로그인된 경우
      headerContent.innerHTML = `
      <div class="d-flex align-items-center justify-content-between w-100 px-2 py-2">
        <div class="d-flex align-items-center gap-2">
          <button id="btn-back" class="btn p-0 border-0 bg-transparent">
            <i class="bi bi-arrow-left" style="font-size: 22px;"></i>
          </button>
          <span class="fw-bold" style="font-size: 18px;">마이페이지</span>
        </div>
        </<div>
      `;
  
    document.getElementById('btn-back')?.addEventListener('click', () => {
      const ref = document.referrer;
      if (ref.includes('community')) {
        window.location.href = 'community.html';
      } else {   //뒤로가기 시 파일 더 추가할꺼임
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

