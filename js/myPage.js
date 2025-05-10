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

  document.addEventListener('DOMContentLoaded', () => {
    const user = sessionStorage.getItem('user');
     const isLoggedIn = user && user !== 'null' && user !== 'undefined' && user.trim() !== '';
     if (isLoggedIn) {
       console.log('마이페이지')
     } else {
       sessionStorage.setItem('prevPage', 'mypage.html');
       window.location.href = 'login.html';
     }
    const dropdownBtn = document.getElementById('dropdownMenuBtn');
    const dropdownMenu = document.querySelector('#mypageDropdown .dropdown-menu');
    const currentLabel = document.getElementById('currentMenuLabel');
  
    const contentMap = {
      '마이페이지': 'content-mypage',
      '프로필': 'content-profile',
      '내 스페이스': 'content-space',
      '계정 및 보안': 'content-security'
    };
  
    // 드롭다운 열고 닫기
    dropdownBtn.addEventListener('click', () => {
      dropdownMenu.style.display = (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') 
        ? 'block' 
        : 'none';
    });
  
    // 항목 클릭 시 라벨 변경 + 콘텐츠 전환
    dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const label = item.getAttribute('data-label');
        currentLabel.textContent = label;
        dropdownMenu.style.display = 'none';
  
        // 콘텐츠 토글
        Object.values(contentMap).forEach(id => {
          const el = document.getElementById(id);
          if (el) el.style.display = 'none';
        });
        const selected = contentMap[label];
        if (selected) {
          const el = document.getElementById(selected);
          if (el) el.style.display = 'block';
        }
      });
    });
  
    // 바깥 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
      if (!document.getElementById('mypageDropdown').contains(e.target)) {
        dropdownMenu.style.display = 'none';
      }
    });
  
    // 닉네임 렌더링
    const userData = sessionStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const nickname = user.nickname || '사용자';
        document.getElementById('nickname').textContent = nickname;
      } catch (e) {
        console.warn('닉네임 파싱 실패:', e);
      }
    }

    // "프로필 보기" 버튼 클릭 시 → 프로필 콘텐츠 보여주고 라벨 변경
const profileViewBtn = document.querySelector('.profile-view-btn');
profileViewBtn?.addEventListener('click', () => {
  // 콘텐츠 전부 숨기기
  Object.values(contentMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // 프로필 콘텐츠 보이기
  const profileEl = document.getElementById(contentMap['프로필']);
  if (profileEl) profileEl.style.display = 'block';

  // 드롭다운 버튼 라벨도 "프로필"로 바꾸기
  currentLabel.textContent = '프로필';
});
  });