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

  // === 로그인 처리 ===   임시 처리임  나중에 서버쪽에서 로그인 시 서버에서 JWT 토큰을 발급해줘야 개발 가능
    document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();
  
    // 아주 간단한 유효성 검사
    if (!email || !password) {
      alert('아이디(이메일)와 비밀번호를 입력하세요.');
      return;
    }
  
    // 가짜 로그인 정보
    const mockUser = {
      email,
      nickname: '코박유저'  // 원하는 닉네임 하드코딩 가능
    };
  
    // 세션에 저장
    sessionStorage.setItem('user', JSON.stringify(mockUser));
  
    // 이전 페이지로 리디렉션
    const prevPage = sessionStorage.getItem('prevPage');
    window.location.href = prevPage ? prevPage : 'index.html';
  });