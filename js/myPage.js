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
      '예측 종목': 'content-profile',
      '내가 쓴 글': 'content-space',
      '차단 계정': 'content-security'
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
        document.getElementById('profileNickname').textContent = user.nickname || '닉네임';
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
  const profileEl = document.getElementById(contentMap['예측 종목']);
  if (profileEl) profileEl.style.display = 'block';

  // 드롭다운 버튼 라벨도 "프로필"로 바꾸기
  currentLabel.textContent = '예측 종목';
});
renderPredictionItems('predictionItemsUl'); // 마이페이지에서 예측 항목 시세 호출
renderPredictionItems('predictionItemsProfileUl'); // 예측 종목 드롭다운에서 예측 항목 시세 호출
renderMyPosts('myPostsList'); // 마이페이지에서 내가 쓴 글
renderMyPosts('myPostsList2'); // 내가 쓴 글 드롭다운에서 내가 쓴 글
renderBlockedUsers('blockedUsersList'); // 마이페이지에서 차단 목록
renderBlockedUsers('blockedUsersList2'); // 차단 목록 드롭다운에서 차단 목록
});

// 예측 항목 시세
function renderPredictionItems(targetId) {
  const predictionItems = [
    { name: '삼성전자', price: '82,000원', change: '+1.20%', link: 'stock_detail.html?item=삼성전자' },
    { name: '비트코인', price: '125,000,000원', change: '+0.80%', link: 'crypto_detail.html?item=비트코인' }
  ];

  const listContainer = document.getElementById(targetId);
  listContainer.innerHTML = ''; // 초기화

  if (predictionItems.length === 0) {
    listContainer.innerHTML = `<li class="list-group-item text-muted">예측 항목이 없습니다.</li>`;
  } else {
    predictionItems.forEach(item => {
      const li = document.createElement('li');   
      li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2';
      li.style.border = '1px solid #e0e0e0';
      li.style.borderRadius = '10px';
      li.style.padding = '12px 16px';
      li.style.fontSize = '15px';
      li.style.backgroundColor = '#fff';
      li.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.03)';
      li.style.cursor = 'pointer';                                    // 이거 나중에 장고에 추가할때는 html파일에 바로 for문으로 때려넣던데 그럼 li 태그 안에 직접 이 style들 적용시켜야함

      li.textContent = `${item.name} ${item.price} (${item.change})`;

      // 👉 클릭 시 해당 링크로 이동
      li.addEventListener('click', () => {
        window.location.href = item.link;
      });

      listContainer.appendChild(li);
    });
  }
}

// 내가 쓴 글
function renderMyPosts(targetId) {
  const userPosts = [
    { title: '분기보고서 (2025.03)', time_ago: '6분 전', url: 'post_detail.html?id=1' },
    { title: '분기보고서 (2025.03)', time_ago: '6분 전', url: 'post_detail.html?id=2' },
    { title: '분기보고서 (2025.03)', time_ago: '6분 전', url: 'post_detail.html?id=3' },
  ];

  const listContainer = document.getElementById(targetId);
  listContainer.innerHTML = '';

  if (userPosts.length === 0) {
    listContainer.innerHTML = `<li class="list-group-item text-muted">작성한 게시물이 없습니다.</li>`;
    return;
  }

  userPosts.forEach(post => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.style.fontSize = '15px';
    li.style.padding = '10px 16px';
    li.style.cursor = 'pointer';

    // 👉 한 줄에 출력되도록 innerHTML로 처리
    li.innerHTML = `
      <a href="${post.url}" class="text-dark text-decoration-none flex-grow-1">
        ${post.title} ${post.time_ago}
      </a>
      <span class="text-muted" style="font-size: 13px; white-space: nowrap;">${post.time_ago}</span>
    `;

    listContainer.appendChild(li);
  });
}

//차단 목록
function renderBlockedUsers(targetId) {
  const blockedUsers = [
    { nickname: '김하이11', userId: 101 },
    { nickname: '김하이22', userId: 102 },
    { nickname: '김하이33', userId: 103 },
  ];

  const container = document.getElementById(targetId);
  container.innerHTML = '';

  if (blockedUsers.length === 0) {
    container.innerHTML = `<div class="user-item text-muted">차단한 유저가 없습니다.</div>`;
    return;
  }

  blockedUsers.forEach((user, index) => {
    const div = document.createElement('div');
    div.className = 'user-item d-flex justify-content-between align-items-center py-1 px-3 mb-2 border rounded';
    div.style.backgroundColor = '#fff';
    div.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
    div.style.border = '1px solid #e0e0e0';
    div.style.borderRadius = '10px';

    const nickname = user.nickname || '알 수 없는 사용자';

    div.innerHTML = `
      <div class="d-flex align-items-center">
        <div class="me-3" style="width: 39px; height: 50px;">
          <i class="bi bi-person-circle" style="font-size: 33px; color: #74b9ff;"></i>
        </div>
        <span class="user-name" style="font-size: 15px;">${nickname}</span>
      </div>
      <button class="btn btn-sm btn-outline-secondary unblock-btn" style="font-size: 13px;">차단 해제</button>
    `;

    // 👉 차단 해제 버튼 클릭 시 항목 삭제
    div.querySelector('.unblock-btn').addEventListener('click', () => {
      const confirmed = confirm('차단을 해제하시겠습니까?');
      if (confirmed) {
        // 리스트에서 삭제
        div.remove();

        // 남은 항목 없는 경우 처리
        if (container.children.length === 0) {
          container.innerHTML = `<div class="user-item text-muted">차단한 유저가 없습니다.</div>`;
        }
      }
    });

    container.appendChild(div);
  });
}