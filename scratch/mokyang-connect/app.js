// Mokyang Connect - Core Application JavaScript

// 1. Initial Mock Database Definition (Paju Mokyang Church - ~50 members)
const INITIAL_DB = {
  users: [
    { id: "u1", name: "이목사", role: "admin", age: 48, gender: "male", district: "파주 야당동", phone: "010-1234-5678", email: "pastor@mokyang.org", avatar: "이" },
    { id: "u2", name: "박리더", role: "leader", age: 39, gender: "male", district: "파주 목동동", phone: "010-2345-6789", email: "park@mokyang.org", avatar: "박", groups: ["g1", "g3"] },
    { id: "u3", name: "김성도", role: "member", age: 52, gender: "female", district: "파주 다율동", phone: "010-3456-7890", email: "kim@gmail.com", avatar: "김", groups: ["g1"] },
    { id: "u4", name: "최은혜", role: "member", age: 26, gender: "female", district: "파주 야당동", phone: "010-4567-8901", email: "choi@naver.com", avatar: "최", groups: ["g2"] },
    { id: "u5", name: "정소망", role: "leader", age: 45, gender: "female", district: "파주 금촌동", phone: "010-5678-9012", email: "hope@daum.net", avatar: "정", groups: ["g4"] },
    { id: "u6", name: "강신성", role: "member", age: 61, gender: "male", district: "파주 와동동", phone: "010-6789-0123", email: "kang@naver.com", avatar: "강", groups: ["g1", "g4"] },
    { id: "u7", name: "윤청년", role: "leader", age: 28, gender: "male", district: "파주 동패동", phone: "010-7890-1234", email: "yoon@gmail.com", avatar: "윤", groups: ["g2"] },
    { id: "u8", name: "홍축구", role: "leader", age: 35, gender: "male", district: "파주 와동동", phone: "010-8901-2345", email: "hong@gmail.com", avatar: "홍", groups: ["g5"] },
    { id: "u9", name: "한사랑", role: "member", age: 55, gender: "female", district: "파주 야당동", phone: "010-9012-3456", email: "han@naver.com", avatar: "한", groups: ["g4"] }
  ],
  groups: [
    { id: "g1", name: "소망 목장", category: "목장", leaderId: "u2", leaderName: "박리더", intro: "따뜻한 사랑과 풍성한 나눔이 있는 소망 목장입니다. 매주 금요일 저녁에 모여 삶을 나눕니다.", location: "교회 소그룹실 2층", day: "금요일", time: "20:00", ageGroup: "장년", district: "목동동/야당동", capacity: 12, members: ["u2", "u3", "u6"], theme: "나눔/친교", img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=60" },
    { id: "g2", name: "시온 청년 모임", category: "청년", leaderId: "u7", leaderName: "윤청년", intro: "청년들의 열정과 비전, 깊은 말씀 묵상이 있는 청년 모임입니다. 매주 주일 예배 후 모입니다.", location: "청년부실", day: "주일", time: "14:00", ageGroup: "청년", district: "파주 전역", capacity: 20, members: ["u7", "u4"], theme: "교제/말씀", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60" },
    { id: "g3", name: "목요 마태 성경공부", category: "성경공부", leaderId: "u2", leaderName: "박리더", intro: "마태복음을 한 장씩 깊이 있게 고찰하며 삶에 적용하는 성경공부 반입니다.", location: "교회 세미나실", day: "목요일", time: "10:30", ageGroup: "기타", district: "파주 전역", capacity: 10, members: ["u2"], theme: "성경공부", img: "https://images.unsplash.com/photo-1504052434569-70ad58c6544f?w=500&auto=format&fit=crop&q=60" },
    { id: "g4", name: "어머니 기도회", category: "기도모임", leaderId: "u5", leaderName: "정소망", intro: "가정과 자녀, 교회를 위해 눈물로 씨를 뿌리는 어머니들의 기도 연대입니다.", location: "본당 지하 예배실", day: "화요일", time: "10:00", ageGroup: "여성", district: "금촌동/와동동", capacity: 15, members: ["u5", "u6", "u9"], theme: "기도", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60" },
    { id: "g5", name: "FC문발이음 축구회", category: "운동", leaderId: "u8", leaderName: "홍축구", intro: "문발운동장에서 매주 토요일 아침 땀 흘리며 친목을 다지고 복음을 전하는 축구 모임입니다.", location: "문발 체육공원", day: "토요일", time: "07:00", ageGroup: "남성", district: "문발동/교하", capacity: 25, members: ["u8"], theme: "축구/친목", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=60" }
  ],
  meetings: [
    { id: "m1", groupId: "g1", groupName: "소망 목장", date: "2026-06-26", time: "20:00", location: "교회 소그룹실 2층", attendees: ["u2", "u3", "u6"] },
    { id: "m2", groupId: "g2", groupName: "시온 청년 모임", date: "2026-06-28", time: "14:00", location: "청년부실", attendees: ["u7", "u4"] },
    { id: "m3", groupId: "g4", groupName: "어머니 기도회", date: "2026-06-23", time: "10:00", location: "본당 지하 예배실", attendees: ["u5", "u6", "u9"] },
    { id: "m4", groupId: "g5", groupName: "FC문발이음 축구회", date: "2026-06-27", time: "07:00", location: "문발 체육공원", attendees: ["u8"] }
  ],
  attendance: [
    // Past attendance records to build statistics
    { meetingId: "mp1", groupId: "g1", date: "2026-06-12", memberId: "u2", status: "present" },
    { meetingId: "mp1", groupId: "g1", date: "2026-06-12", memberId: "u3", status: "present" },
    { meetingId: "mp1", groupId: "g1", date: "2026-06-12", memberId: "u6", status: "late" },
    
    { meetingId: "mp2", groupId: "g1", date: "2026-06-19", memberId: "u2", status: "present" },
    { meetingId: "mp2", groupId: "g1", date: "2026-06-19", memberId: "u3", status: "absent" },
    { meetingId: "mp2", groupId: "g1", date: "2026-06-19", memberId: "u6", status: "present" },
    
    { meetingId: "mp3", groupId: "g4", date: "2026-06-09", memberId: "u5", status: "present" },
    { meetingId: "mp3", groupId: "g4", date: "2026-06-09", memberId: "u6", status: "present" },
    { meetingId: "mp3", groupId: "g4", date: "2026-06-09", memberId: "u9", status: "present" },
    
    { meetingId: "mp4", groupId: "g4", date: "2026-06-16", memberId: "u5", status: "present" },
    { meetingId: "mp4", groupId: "g4", date: "2026-06-16", memberId: "u6", status: "absent" },
    { meetingId: "mp4", groupId: "g4", date: "2026-06-16", memberId: "u9", status: "late" }
  ],
  prayers: [
    { id: "p1", groupId: "g1", groupName: "소망 목장", authorId: "u3", authorName: "김성도", title: "가정의 건강을 위해", content: "남편의 갑작스러운 디스크 수술 일정이 잡혔습니다. 통증 없이 무사히 끝나고 속히 회복되도록 함께 기도해 주세요.", visibility: "group", date: "2026-06-20", answers: ["주님 역사하여 주소서. 힘내세요 김 자매님! (박리더)"] },
    { id: "p2", groupId: "g2", groupName: "시온 청년 모임", authorId: "u4", authorName: "최은혜", title: "취업 준비와 비전을 위해", content: "이달 말에 있을 면접에 주님의 평강이 임하게 하시고 저에게 꼭 맞는 길을 예비해 주시길 기도합니다.", visibility: "public", date: "2026-06-22", answers: [] },
    { id: "p3", groupId: "g4", groupName: "어머니 기도회", authorId: "u9", authorName: "한사랑", title: "자녀의 믿음 회복을 위해", content: "둘째 아이가 대학 진학 이후 교회를 멀리하고 있습니다. 다시 주님을 인격적으로 만나 예배의 기쁨을 회복하도록 기도 부탁드립니다.", visibility: "leader", date: "2026-06-18", answers: ["늘 기도하고 있습니다. 힘내십시오! (이목사)"] }
  ],
  notices: [
    { id: "n1", groupId: "g1", authorName: "박리더", title: "이번 주 모임 장소 변경 공지", content: "이번 금요일(6/26) 소망 목장 모임은 장로님 댁이 아니라 교회 2층 소그룹실에서 진행합니다. 저녁 식사를 함께할 예정이니 10분 전까지 도착 바랍니다.", date: "2026-06-22" },
    { id: "n2", groupId: "g2", authorName: "윤청년", title: "하반기 연합 수련회 수요 조사", content: "8월 중순 예정된 연합 수련회 일정 및 장소 조사를 하니 청년 단톡방이나 여기에 댓글로 피드백 부탁해요!", date: "2026-06-21" }
  ],
  reviews: [
    { id: "r1", groupId: "g1", authorName: "박리더", content: "어제 목장 모임은 4가정이 함께 모여 큰 은혜와 눈물이 있었습니다. 서로의 짐을 나눠 지는 공동체이길 소망합니다.", date: "2026-06-20" },
    { id: "r2", groupId: "g4", authorName: "정소망", content: "어머니 기도회 모임을 통해 상처받은 마음들이 위로받고 회복되는 시간을 가졌습니다. 기도의 자리는 늘 기쁨이 넘칩니다.", date: "2026-06-16" }
  ],
  photos: [
    { id: "ph1", groupId: "g1", img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&auto=format&fit=crop&q=60", caption: "소망 목장 다과 시간", date: "2026-06-19" },
    { id: "ph2", groupId: "g4", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=60", caption: "기도회 후 차 한 잔", date: "2026-06-16" }
  ],
  applications: [
    { id: "a1", groupId: "g1", userId: "u4", userName: "최은혜", userDistrict: "야당동", userAge: 26, status: "pending", date: "2026-06-23" }
  ],
  notifications: [
    { id: "nt1", userId: "u2", title: "새로운 가입 신청", message: "최은혜 성도님이 '소망 목장' 가입을 신청하셨습니다.", date: "2026-06-23", read: false },
    { id: "nt2", userId: "u3", title: "공지사항 등록", message: "소망 목장에 새로운 공지사항이 등록되었습니다.", date: "2026-06-22", read: false },
    { id: "nt3", userId: "u9", title: "기도 응답 완료", message: "작성하신 기도제목에 이목사님이 댓글을 남기셨습니다.", date: "2026-06-18", read: true }
  ]
};

// State Manager
class MokyangState {
  constructor() {
    this.db = this.loadDB();
    this.currentUser = this.loadCurrentUser() || this.db.users[2]; // Default: 김성도 (member)
    this.activePage = "home";
    this.history = ["home"];
    this.params = {};
  }

  loadDB() {
    const data = localStorage.getItem("mokyang_db");
    if (!data) {
      // Create additional mock members to reach ~50 members
      const db = JSON.parse(JSON.stringify(INITIAL_DB));
      const firstNames = ["민준", "서준", "도윤", "예준", "시우", "하준", "주원", "지호", "지후", "준우", "서윤", "서연", "지우", "하윤", "민서", "하은", "지아", "윤서", "수아", "지원", "영희", "철수", "갑수", "춘자", "영수", "순옥", "명숙", "광식", "정자", "순이", "정웅", "태현", "상훈", "민정", "지혜", "경아", "소희", "성호", "준상", "기범", "찬우"];
      const lastNames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "전", "홍"];
      const districts = ["파주 와동동", "파주 금촌동", "파주 아동동", "파주 문발동", "파주 야당동", "파주 동패동", "파주 목동동", "파주 다율동"];
      
      for (let i = 10; i <= 50; i++) {
        const name = lastNames[i % lastNames.length] + firstNames[i % firstNames.length];
        const age = 20 + (i * 7) % 60; // 20 ~ 79
        const gender = i % 2 === 0 ? "male" : "female";
        const district = districts[i % districts.length];
        const groupIndex = (i % 5) + 1; // Randomly allocate groups
        const groupId = `g${groupIndex}`;
        
        const user = {
          id: `u${i}`,
          name: name,
          role: "member",
          age: age,
          gender: gender,
          district: district,
          phone: `010-${(1000 + i * 17) % 10000}-${(5000 + i * 29) % 10000}`,
          email: `${name.toLowerCase()}@gmail.com`,
          avatar: name[0],
          groups: [groupId]
        };
        db.users.push(user);
        
        // Add member to group
        const group = db.groups.find(g => g.id === groupId);
        if (group && !group.members.includes(user.id)) {
          group.members.push(user.id);
        }

        // Generate attendance history
        if (i % 4 !== 0) { // Some attendees
          db.attendance.push({
            meetingId: "mp1",
            groupId: "g1",
            date: "2026-06-12",
            memberId: user.id,
            status: i % 10 === 0 ? "late" : (i % 12 === 0 ? "absent" : "present")
          });
          db.attendance.push({
            meetingId: "mp2",
            groupId: "g1",
            date: "2026-06-19",
            memberId: user.id,
            status: i % 8 === 0 ? "late" : (i % 11 === 0 ? "absent" : "present")
          });
        }
      }
      
      localStorage.setItem("mokyang_db", JSON.stringify(db));
      return db;
    }
    return JSON.parse(data);
  }

  saveDB() {
    localStorage.setItem("mokyang_db", JSON.stringify(this.db));
  }

  loadCurrentUser() {
    const data = localStorage.getItem("mokyang_current_user");
    if (!data) return null;
    const parsed = JSON.parse(data);
    // Bind current user object reference from db
    return this.db.users.find(u => u.id === parsed.id) || parsed;
  }

  setCurrentUser(userId) {
    const user = this.db.users.find(u => u.id === userId);
    if (user) {
      this.currentUser = user;
      localStorage.setItem("mokyang_current_user", JSON.stringify(user));
      // Re-trigger notifications check
      this.refreshNotifications();
    }
  }

  refreshNotifications() {
    // Generate new mock notification occasionally
  }
}

// Global App State Instance
const appState = new MokyangState();

// 2. Controller & Router
function initApp() {
  setupEventListeners();
  renderRoleSwitcher();
  
  // Set initial navigation route based on hash or default
  const hash = window.location.hash || "#home";
  handleRouting(hash);
  
  // Check Large Text status
  const isLarge = localStorage.getItem("mokyang_large_text") === "true";
  if (isLarge) {
    document.body.classList.add("large-text");
    document.querySelector(".text-scale-btn").innerHTML = `<span>가-</span> 일반 글씨`;
  }
}

function handleRouting(hash) {
  const parts = hash.split("?");
  const page = parts[0].substring(1) || "home";
  appState.activePage = page;
  
  const params = {};
  if (parts[1]) {
    parts[1].split("&").forEach(p => {
      const kv = p.split("=");
      params[kv[0]] = decodeURIComponent(kv[1]);
    });
  }
  appState.params = params;
  
  // Update Nav Active State
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.getAttribute("data-page") === page) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Render Target Page
  renderPage(page, params);
}

function navigateTo(page, params = {}) {
  let url = `#${page}`;
  const queryStr = Object.keys(params).map(k => `${k}=${encodeURIComponent(params[k])}`).join("&");
  if (queryStr) url += `?${queryStr}`;
  window.location.hash = url;
}

function setupEventListeners() {
  // Hash change routing
  window.addEventListener("hashchange", () => {
    handleRouting(window.location.hash);
  });

  // Nav Items click handler
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const page = item.getAttribute("data-page");
      navigateTo(page);
    });
  });

  // Large Text mode toggle button
  document.querySelector(".text-scale-btn").addEventListener("click", () => {
    const isLarge = document.body.classList.toggle("large-text");
    localStorage.setItem("mokyang_large_text", isLarge ? "true" : "false");
    const btn = document.querySelector(".text-scale-btn");
    if (isLarge) {
      btn.innerHTML = `<span>가-</span> 일반 글씨`;
    } else {
      btn.innerHTML = `<span>가+</span> 큰 글씨`;
    }
    // Rerender active page to apply scale
    renderPage(appState.activePage, appState.params);
  });
}

function renderRoleSwitcher() {
  const switcher = document.getElementById("role-selector-container");
  if (!switcher) return;

  const currentRole = appState.currentUser.role;
  let html = `
    <div class="role-switch-container">
      <button class="role-switch-btn ${appState.currentUser.id === 'u3' ? 'active' : ''}" onclick="switchRole('u3')">성도</button>
      <button class="role-switch-btn ${appState.currentUser.id === 'u2' ? 'active' : ''}" onclick="switchRole('u2')">리더</button>
      <button class="role-switch-btn ${appState.currentUser.id === 'u1' ? 'active' : ''}" onclick="switchRole('u1')">교역자</button>
    </div>
  `;
  switcher.innerHTML = html;
  
  // Update header role badge text
  const badge = document.getElementById("header-role-badge");
  if (badge) {
    let name = "성도";
    if (appState.currentUser.role === "leader") name = "리더";
    if (appState.currentUser.role === "admin") name = "교역자";
    badge.innerText = `${appState.currentUser.name} (${name})`;
  }
}

window.switchRole = function(userId) {
  appState.setCurrentUser(userId);
  renderRoleSwitcher();
  renderPage(appState.activePage, appState.params);
};

// 3. Dynamic Page Rendering Engine
function renderPage(page, params) {
  const contentDiv = document.getElementById("dynamic-content");
  if (!contentDiv) return;
  
  // Clear any existing page views
  contentDiv.innerHTML = "";
  
  const pageWrapper = document.createElement("div");
  pageWrapper.className = `page-view active page-${page}`;
  contentDiv.appendChild(pageWrapper);

  switch (page) {
    case "home":
      renderHomePage(pageWrapper);
      break;
    case "groups":
      renderGroupsPage(pageWrapper);
      break;
    case "group-detail":
      renderGroupDetailPage(pageWrapper, params.id);
      break;
    case "calendar":
      renderCalendarPage(pageWrapper);
      break;
    case "notifications":
      renderNotificationsPage(pageWrapper);
      break;
    case "profile":
      renderProfilePage(pageWrapper);
      break;
    case "attendance-check":
      renderAttendanceCheckPage(pageWrapper, params.groupId);
      break;
    case "admin-dashboard":
      renderAdminDashboardPage(pageWrapper);
      break;
    case "future-feature":
      renderFutureFeaturePage(pageWrapper, params.featureId);
      break;
    default:
      navigateTo("home");
      break;
  }
}

// 4. Page View Implementations

// --- HOME PAGE ---
function renderHomePage(wrapper) {
  const today = new Date().toISOString().split("T")[0];
  const thisWeekMeetings = appState.db.meetings.slice(0, 3); // Showing top mock meetings
  
  let html = `
    <div class="welcome-banner">
      <h2>안녕하세요, ${appState.currentUser.name}님!</h2>
      <p>"교회 공동체를 연결하는 따뜻한 디지털 목양 플랫폼"</p>
      <div style="margin-top: 10px; font-size: 11px; opacity: 0.85; display: flex; align-items: center; gap: 4px;">
        <svg style="width:12px; height:12px; fill:var(--accent-light);" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        파주목양교회 (성도 약 50명)
      </div>
    </div>

    <!-- Quick Shortcuts Grid -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px;">
      <button class="btn btn-outline" style="flex-direction: column; height: 72px; padding: 8px; font-size: 11px; border-radius: var(--radius-md); border-color: var(--border); background: white;" onclick="navigateTo('future-feature', {featureId: 'new-family'})">
        <span style="font-size: 20px; margin-bottom: 2px;">🌱</span>새가족
      </button>
      <button class="btn btn-outline" style="flex-direction: column; height: 72px; padding: 8px; font-size: 11px; border-radius: var(--radius-md); border-color: var(--border); background: white;" onclick="navigateTo('future-feature', {featureId: 'qt'})">
        <span style="font-size: 20px; margin-bottom: 2px;">📖</span>큐티/성경
      </button>
      <button class="btn btn-outline" style="flex-direction: column; height: 72px; padding: 8px; font-size: 11px; border-radius: var(--radius-md); border-color: var(--border); background: white;" onclick="navigateTo('future-feature', {featureId: 'ministry'})">
        <span style="font-size: 20px; margin-bottom: 2px;">🤝</span>봉사/사역
      </button>
      <button class="btn btn-outline" style="flex-direction: column; height: 72px; padding: 8px; font-size: 11px; border-radius: var(--radius-md); border-color: var(--border); background: white;" onclick="navigateTo('future-feature', {featureId: 'fc-soccer'})">
        <span style="font-size: 20px; margin-bottom: 2px;">⚽</span>축구회
      </button>
    </div>
  `;

  if (appState.currentUser.role === "admin") {
    html += `
      <div style="margin-bottom: 16px;">
        <button class="btn btn-accent btn-block" style="border-radius: var(--radius-md); font-weight: 700; height: 44px;" onclick="navigateTo('admin-dashboard')">
          🛡️ 교역자 대시보드 바로가기
        </button>
      </div>
    `;
  }

  html += `
    <div class="section-header">
      <div class="section-title"><h3>이번 주 추천 소모임</h3></div>
      <button class="btn btn-outline btn-sm" onclick="navigateTo('groups')" style="border: none; padding: 0; color: var(--accent-dark);">전체보기 &gt;</button>
    </div>
    
    <div class="card-list">
  `;

  thisWeekMeetings.forEach(meeting => {
    const group = appState.db.groups.find(g => g.id === meeting.groupId);
    if (!group) return;
    
    const isMember = group.members.includes(appState.currentUser.id);
    const memberCount = group.members.length;
    
    html += `
      <div class="meeting-card">
        <div class="card-category-badge">${group.category}</div>
        <h4 class="card-title" onclick="navigateTo('group-detail', {id: '${group.id}'})" style="cursor: pointer; color: var(--primary); font-weight: 700;">${group.name}</h4>
        <div class="card-meta">
          <div class="meta-item">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            인도: ${group.leaderName}
          </div>
          <div class="meta-item">
            <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            ${group.day} ${group.time}
          </div>
          <div class="meta-item" style="grid-column: span 2;">
            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            장소: ${group.location}
          </div>
        </div>
        <div class="card-footer">
          <div class="members-counter">정원: <span>${memberCount}</span>/${group.capacity}명</div>
          ${isMember ? 
            `<button class="btn btn-outline btn-sm" onclick="navigateTo('group-detail', {id: '${group.id}'})">참여 중</button>` :
            `<button class="btn btn-accent btn-sm" onclick="applyForGroup('${group.id}')">가입 신청</button>`
          }
        </div>
      </div>
    `;
  });

  html += `
    </div>
    
    <div class="section-header" style="margin-top: 24px;">
      <div class="section-title"><h3>목양 공지사항</h3></div>
    </div>
    <div style="background: white; border-radius: var(--radius-md); padding: 12px; border: 1px solid var(--border);">
      <div style="padding: 10px 4px; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #1E293B;">⛪ 2026 하반기 제직 연합 수련회 신청 안내</span>
        <span style="font-size: 10px; color: var(--text-muted);">06-22</span>
      </div>
      <div style="padding: 10px 4px; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #1E293B;">⚽ FC문발이음 남부지구 친선 축구 대회</span>
        <span style="font-size: 10px; color: var(--text-muted);">06-20</span>
      </div>
      <div style="padding: 10px 4px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: #1E293B;">🌱 새가족 환영 4주 과정 개강</span>
        <span style="font-size: 10px; color: var(--text-muted);">06-18</span>
      </div>
    </div>
    
    <div class="footer-branding">
      <p>파주목양교회 <b>목양커넥트</b> v1.0</p>
      <p>교회 공동체를 연결하는 따뜻한 디지털 목양 플랫폼</p>
    </div>
  `;

  wrapper.innerHTML = html;
}

window.applyForGroup = function(groupId) {
  const group = appState.db.groups.find(g => g.id === groupId);
  if (!group) return;
  
  // Check if already applied
  const exist = appState.db.applications.find(a => a.groupId === groupId && a.userId === appState.currentUser.id);
  if (exist) {
    alert("이미 신청한 소모임입니다. 리더의 승인을 기다려주세요.");
    return;
  }

  // Create new application
  const newApp = {
    id: `app_${Date.now()}`,
    groupId: groupId,
    userId: appState.currentUser.id,
    userName: appState.currentUser.name,
    userDistrict: appState.currentUser.district || "야당동",
    userAge: appState.currentUser.age || 40,
    status: "pending",
    date: new Date().toISOString().split("T")[0]
  };
  
  appState.db.applications.push(newApp);
  
  // Add notification for the leader
  appState.db.notifications.push({
    id: `nt_${Date.now()}`,
    userId: group.leaderId,
    title: "새로운 가입 신청",
    message: `${appState.currentUser.name} 성도님이 '${group.name}' 가입을 신청하셨습니다.`,
    date: new Date().toISOString().split("T")[0],
    read: false
  });
  
  appState.saveDB();
  alert(`'${group.name}' 가입을 신청했습니다. 소그룹 리더의 승인이 완료되면 알림으로 안내해 드립니다.`);
  navigateTo("home");
};

// --- GROUPS LIST PAGE ---
function renderGroupsPage(wrapper) {
  const categories = ["전체", "목장", "청년", "장년", "여성", "남성", "성경공부", "기도모임", "봉사", "운동", "기타"];
  const activeCategory = appState.params.category || "전체";
  const searchQuery = appState.params.search || "";
  const filterDay = appState.params.day || "all";
  const filterAge = appState.params.age || "all";

  let html = `
    <h2 style="margin-bottom: 12px; color: var(--primary);">소모임 둘러보기</h2>
    
    <!-- Search & Filter Box -->
    <div class="search-filter-box">
      <div class="search-input-wrapper">
        <svg class="search-icon-svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <input type="text" class="search-input" id="group-search-bar" placeholder="소모임명 또는 리더명 검색" value="${searchQuery}">
      </div>
      <div class="filter-grid">
        <select class="filter-select" id="filter-day-select">
          <option value="all" ${filterDay === 'all' ? 'selected' : ''}>요일: 전체</option>
          <option value="화요일" ${filterDay === '화요일' ? 'selected' : ''}>화요일</option>
          <option value="목요일" ${filterDay === '목요일' ? 'selected' : ''}>목요일</option>
          <option value="금요일" ${filterDay === '금요일' ? 'selected' : ''}>금요일</option>
          <option value="토요일" ${filterDay === '토요일' ? 'selected' : ''}>토요일</option>
          <option value="주일" ${filterDay === '주일' ? 'selected' : ''}>주일</option>
        </select>
        <select class="filter-select" id="filter-age-select">
          <option value="all" ${filterAge === 'all' ? 'selected' : ''}>연령: 전체</option>
          <option value="청년" ${filterAge === '청년' ? 'selected' : ''}>청년</option>
          <option value="장년" ${filterAge === '장년' ? 'selected' : ''}>장년</option>
          <option value="여성" ${filterAge === '여성' ? 'selected' : ''}>여성</option>
          <option value="남성" ${filterAge === '남성' ? 'selected' : ''}>남성</option>
        </select>
      </div>
    </div>

    <!-- Category slider -->
    <div class="category-container">
  `;

  categories.forEach(cat => {
    html += `
      <div class="category-tab ${activeCategory === cat ? 'active' : ''}" onclick="filterByCategory('${cat}')">
        ${cat}
      </div>
    `;
  });

  html += `
    </div>
    
    <!-- Leader specific action -->
    ${appState.currentUser.role === 'leader' || appState.currentUser.role === 'admin' ? `
      <div style="margin-bottom: 16px;">
        <button class="btn btn-accent btn-block" style="border-radius: var(--radius-sm);" onclick="openCreateGroupModal()">
          ➕ 새 소모임 개설하기
        </button>
      </div>
    ` : ''}

    <div class="card-list" id="groups-page-list">
  `;

  // Apply filters
  let filtered = appState.db.groups;
  if (activeCategory !== "전체") {
    filtered = filtered.filter(g => g.category === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(g => g.name.toLowerCase().includes(q) || g.leaderName.toLowerCase().includes(q));
  }
  if (filterDay !== "all") {
    filtered = filtered.filter(g => g.day === filterDay);
  }
  if (filterAge !== "all") {
    filtered = filtered.filter(g => g.ageGroup === filterAge || g.category === filterAge);
  }

  if (filtered.length === 0) {
    html += `
      <div style="text-align: center; padding: 40px 20px; background: white; border-radius: var(--radius-md); border: 1px solid var(--border);">
        <span style="font-size: 40px; display: block; margin-bottom: 12px;">🔍</span>
        <p style="color: var(--text-muted); font-weight: 500;">조건에 맞는 소모임이 없습니다.</p>
        <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">다른 키워드로 검색해 보세요.</p>
      </div>
    `;
  } else {
    filtered.forEach(group => {
      const isMember = group.members.includes(appState.currentUser.id);
      const isLeader = group.leaderId === appState.currentUser.id;
      
      html += `
        <div class="meeting-card">
          <div class="card-category-badge">${group.category}</div>
          <h4 class="card-title" onclick="navigateTo('group-detail', {id: '${group.id}'})" style="cursor: pointer; color: var(--primary); font-weight: 700;">${group.name}</h4>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px; text-overflow: ellipsis; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${group.intro}</p>
          <div class="card-meta">
            <div class="meta-item">인도: ${group.leaderName}</div>
            <div class="meta-item">일정: ${group.day} ${group.time}</div>
            <div class="meta-item" style="grid-column: span 2;">장소: ${group.location}</div>
          </div>
          <div class="card-footer">
            <div class="members-counter">정원: <span>${group.members.length}</span>/${group.capacity}명</div>
            <div>
              ${isLeader ? 
                `<button class="btn btn-outline btn-sm" onclick="navigateTo('group-detail', {id: '${group.id}'})">관리하기</button>` :
                (isMember ? 
                  `<button class="btn btn-outline btn-sm" onclick="navigateTo('group-detail', {id: '${group.id}'})">보기</button>` :
                  `<button class="btn btn-accent btn-sm" onclick="applyForGroup('${group.id}')">가입 신청</button>`
                )
              }
            </div>
          </div>
        </div>
      `;
    });
  }

  html += `
    </div>
  `;

  wrapper.innerHTML = html;

  // Bind filter triggers
  document.getElementById("group-search-bar").addEventListener("change", (e) => {
    navigateTo("groups", { category: activeCategory, search: e.target.value, day: filterDay, age: filterAge });
  });
  document.getElementById("filter-day-select").addEventListener("change", (e) => {
    navigateTo("groups", { category: activeCategory, search: searchQuery, day: e.target.value, age: filterAge });
  });
  document.getElementById("filter-age-select").addEventListener("change", (e) => {
    navigateTo("groups", { category: activeCategory, search: searchQuery, day: filterDay, age: e.target.value });
  });
}

window.filterByCategory = function(category) {
  navigateTo("groups", { category: category, search: appState.params.search || "", day: appState.params.day || "all", age: appState.params.age || "all" });
};

// Open Create Group Modal (For leader)
window.openCreateGroupModal = function() {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "새 소모임 개설 신청";
  
  let bodyHtml = `
    <div class="form-group">
      <label class="form-label">모임 이름</label>
      <input type="text" class="form-control" id="m-name" placeholder="예: 평화 성경공부">
    </div>
    <div class="form-group">
      <label class="form-label">카테고리</label>
      <select class="form-control" id="m-category">
        <option>목장</option>
        <option>청년</option>
        <option>성경공부</option>
        <option>기도모임</option>
        <option>운동</option>
        <option>기타</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">모임 요일 및 시간</label>
      <div style="display: flex; gap: 8px;">
        <select class="form-control" id="m-day" style="width: 40%;">
          <option>주일</option><option>월요일</option><option>화요일</option><option>수요일</option><option>목요일</option><option>금요일</option><option>토요일</option>
        </select>
        <input type="time" class="form-control" id="m-time" value="19:30" style="width: 60%;">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">모임 장소</label>
      <input type="text" class="form-control" id="m-location" placeholder="예: 교회 203호, 리더 자택 등">
    </div>
    <div class="form-group">
      <label class="form-label">소모임 소개</label>
      <textarea class="form-control" id="m-intro" rows="3" placeholder="소모임의 성격과 나눔 주제를 설명해 주세요."></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">정원 (명)</label>
      <input type="number" class="form-control" id="m-capacity" value="12">
    </div>
  `;
  
  document.getElementById("modal-body").innerHTML = bodyHtml;
  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent" onclick="submitCreateGroup()">신청하기</button>
  `;
};

window.submitCreateGroup = function() {
  const name = document.getElementById("m-name").value;
  const category = document.getElementById("m-category").value;
  const day = document.getElementById("m-day").value;
  const time = document.getElementById("m-time").value;
  const location = document.getElementById("m-location").value;
  const intro = document.getElementById("m-intro").value;
  const capacity = parseInt(document.getElementById("m-capacity").value) || 10;
  
  if (!name || !location || !intro) {
    alert("모든 필수 정보를 정확히 입력해 주세요.");
    return;
  }

  const newGroup = {
    id: `g_${Date.now()}`,
    name: name,
    category: category,
    leaderId: appState.currentUser.id,
    leaderName: appState.currentUser.name,
    intro: intro,
    location: location,
    day: day,
    time: time,
    ageGroup: "장년",
    district: appState.currentUser.district || "파주 전역",
    capacity: capacity,
    members: [appState.currentUser.id],
    theme: category,
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=60"
  };

  appState.db.groups.push(newGroup);
  
  // Also auto-add a default meeting for this new group
  const meetingDate = getNextDayDate(day);
  appState.db.meetings.push({
    id: `m_${Date.now()}`,
    groupId: newGroup.id,
    groupName: newGroup.name,
    date: meetingDate,
    time: time,
    location: location,
    attendees: [appState.currentUser.id]
  });

  appState.saveDB();
  closeModal();
  alert(`'${name}' 소모임이 성공적으로 개설되었습니다.`);
  navigateTo("groups");
};

function getNextDayDate(dayName) {
  const days = { '주일': 0, '월요일': 1, '화요일': 2, '수요일': 3, '목요일': 4, '금요일': 5, '토요일': 6 };
  const targetDay = days[dayName];
  const today = new Date();
  const todayDay = today.getDay();
  let diff = targetDay - todayDay;
  if (diff <= 0) diff += 7;
  const nextDate = new Date(today.getTime() + diff * 24 * 60 * 60 * 1000);
  return nextDate.toISOString().split("T")[0];
}

// --- GROUP DETAIL PAGE ---
function renderGroupDetailPage(wrapper, groupId) {
  const group = appState.db.groups.find(g => g.id === groupId);
  if (!group) {
    wrapper.innerHTML = `<p>소모임을 찾을 수 없습니다.</p>`;
    return;
  }

  const isMember = group.members.includes(appState.currentUser.id);
  const isLeader = group.leaderId === appState.currentUser.id;
  const isAdmin = appState.currentUser.role === "admin";
  const activeTab = appState.params.tab || "notice";

  const groupNotices = appState.db.notices.filter(n => n.groupId === groupId);
  const groupPrayers = appState.db.prayers.filter(p => {
    if (p.groupId !== groupId) return false;
    if (p.visibility === "leader" && !isLeader && !isAdmin && p.authorId !== appState.currentUser.id) return false;
    // Group visibility check: only members, leaders, admins can view
    if (p.visibility === "group" && !isMember && !isLeader && !isAdmin) return false;
    return true;
  });
  const groupPhotos = appState.db.photos.filter(ph => ph.groupId === groupId);
  const groupReviews = appState.db.reviews.filter(r => r.groupId === groupId);
  const pendingApps = appState.db.applications.filter(a => a.groupId === groupId && a.status === "pending");

  let html = `
    <div class="detail-header">
      <img src="${group.img}" class="detail-img" alt="${group.name}">
      <button class="back-btn" onclick="navigateTo('groups')">
        <svg style="width: 20px; height: 20px; fill: var(--primary);" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </button>
    </div>

    <div class="detail-info-card">
      <h2 class="detail-title">${group.name}</h2>
      <p class="detail-desc">${group.intro}</p>
      
      <div class="leader-profile">
        <div class="avatar">${group.leaderName[0]}</div>
        <div class="leader-info">
          <h4>소그룹 인도자: ${group.leaderName}</h4>
          <p>지역: ${group.district} | 연령대: ${group.ageGroup}</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; font-size: 12px; background: #F8FAFC; padding: 12px; border-radius: var(--radius-sm);">
        <div>📅 <b>모임일:</b> ${group.day} ${group.time}</div>
        <div>📍 <b>모임장소:</b> ${group.location}</div>
        <div>👥 <b>참여현황:</b> ${group.members.length} / ${group.capacity} 명</div>
        <div>🏷️ <b>주제:</b> ${group.theme}</div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 8px;">
  `;

  if (isLeader || isAdmin) {
    html += `
      <button class="btn btn-accent style="flex: 1;" onclick="navigateTo('attendance-check', {groupId: '${group.id}'})">📋 출석 관리</button>
      <button class="btn btn-outline" style="flex: 1;" onclick="openManageMembersModal('${group.id}')">👥 멤버 승인 (${pendingApps.length})</button>
    `;
  } else if (isMember) {
    html += `
      <button class="btn btn-outline btn-block" disabled>이미 가입된 소모임입니다</button>
      <button class="btn btn-accent" onclick="openInquireModal('${group.id}')">문의하기</button>
    `;
  } else {
    html += `
      <button class="btn btn-accent" style="flex: 2;" onclick="applyForGroup('${group.id}')">신청하기</button>
      <button class="btn btn-outline" style="flex: 1;" onclick="openInquireModal('${group.id}')">문의하기</button>
    `;
  }

  html += `
      </div>
    </div>

    <!-- Details Tab Section -->
    <div class="tabs-header">
      <div class="tab-link ${activeTab === 'notice' ? 'active' : ''}" onclick="switchDetailTab('${group.id}', 'notice')">공지사항</div>
      <div class="tab-link ${activeTab === 'prayer' ? 'active' : ''}" onclick="switchDetailTab('${group.id}', 'prayer')">기도제목</div>
      <div class="tab-link ${activeTab === 'photo' ? 'active' : ''}" onclick="switchDetailTab('${group.id}', 'photo')">사진첩</div>
      <div class="tab-link ${activeTab === 'review' ? 'active' : ''}" onclick="switchDetailTab('${group.id}', 'review')">후기</div>
    </div>

    <div class="tabs-contents-area" style="min-height: 200px; margin-bottom: 24px;">
  `;

  // Tab Content: Notice
  if (activeTab === "notice") {
    html += `
      <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px;">
        <h4>공지사항 (${groupNotices.length})</h4>
        ${isLeader || isAdmin ? `<button class="btn btn-accent btn-sm" onclick="openAddNoticeModal('${group.id}')">+ 작성</button>` : ''}
      </div>
    `;
    if (groupNotices.length === 0) {
      html += `<p style="text-align:center; padding: 20px; color:var(--text-muted); font-size:12px;">등록된 공지사항이 없습니다.</p>`;
    } else {
      groupNotices.forEach(n => {
        html += `
          <div class="notice-item">
            <div class="post-meta"><span>작성자: ${n.authorName}</span><span>${n.date}</span></div>
            <div class="post-title">${n.title}</div>
            <p style="font-size:12px; color:var(--text-main); white-space:pre-line;">${n.content}</p>
          </div>
        `;
      });
    }
  }

  // Tab Content: Prayer Board
  if (activeTab === "prayer") {
    html += `
      <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px;">
        <h4>기도제목 (${groupPrayers.length})</h4>
        ${isMember || isLeader || isAdmin ? `<button class="btn btn-accent btn-sm" onclick="openAddPrayerModal('${group.id}')">+ 작성</button>` : ''}
      </div>
    `;
    if (groupPrayers.length === 0) {
      html += `<p style="text-align:center; padding: 20px; color:var(--text-muted); font-size:12px;">작성된 기도제목이 없습니다.</p>`;
    } else {
      groupPrayers.forEach(p => {
        let badgeClass = "public";
        let badgeText = "전체공개";
        if (p.visibility === "group") { badgeClass = "group"; badgeText = "모임공개"; }
        if (p.visibility === "leader") { badgeClass = "leader"; badgeText = "인도자만"; }
        
        html += `
          <div class="prayer-item">
            <span class="prayer-badge ${badgeClass}">${badgeText}</span>
            <div class="post-meta" style="padding-right: 60px;"><span>요청자: ${p.authorName}</span><span>${p.date}</span></div>
            <div class="post-title">${p.title}</div>
            <p style="font-size:12px; color:var(--text-main); white-space:pre-line; margin-bottom: 8px;">${p.content}</p>
            
            <div class="comments-list">
              ${p.answers.map(ans => `<div class="comment-item">🙏 ${ans}</div>`).join('')}
              <div style="display: flex; gap: 4px; margin-top: 6px;">
                <input type="text" class="form-control" style="font-size:11px; padding:4px 8px; height:26px;" placeholder="격려와 기도 댓글 쓰기" id="comment-input-${p.id}">
                <button class="btn btn-accent btn-sm" style="min-height:26px; height:26px; padding:0 8px;" onclick="addCommentToPrayer('${group.id}', '${p.id}')">등록</button>
              </div>
            </div>
          </div>
        `;
      });
    }
  }

  // Tab Content: Photos
  if (activeTab === "photo") {
    html += `
      <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px;">
        <h4>사진첩 (${groupPhotos.length})</h4>
        ${isMember || isLeader || isAdmin ? `<button class="btn btn-accent btn-sm" onclick="openAddPhotoModal('${group.id}')">+ 올리기</button>` : ''}
      </div>
    `;
    if (groupPhotos.length === 0) {
      html += `<p style="text-align:center; padding: 20px; color:var(--text-muted); font-size:12px;">등록된 사진이 없습니다.</p>`;
    } else {
      html += `<div class="photo-grid">`;
      groupPhotos.forEach(ph => {
        html += `
          <div style="display:flex; flex-direction:column; gap:4px;">
            <img src="${ph.img}" alt="${ph.caption}" onclick="viewLargeImage('${ph.img}')" style="cursor:pointer;">
            <span style="font-size:10px; color:var(--text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap; text-align:center;">${ph.caption}</span>
          </div>
        `;
      });
      html += `</div>`;
    }
  }

  // Tab Content: Reviews
  if (activeTab === "review") {
    html += `
      <div style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 12px;">
        <h4>모임 후기 (${groupReviews.length})</h4>
        ${isMember || isLeader || isAdmin ? `<button class="btn btn-accent btn-sm" onclick="openAddReviewModal('${group.id}')">+ 작성</button>` : ''}
      </div>
    `;
    if (groupReviews.length === 0) {
      html += `<p style="text-align:center; padding: 20px; color:var(--text-muted); font-size:12px;">등록된 모임 후기가 없습니다.</p>`;
    } else {
      groupReviews.forEach(r => {
        html += `
          <div class="review-item">
            <div class="post-meta"><span>작성자: ${r.authorName}</span><span>${r.date}</span></div>
            <p style="font-size:12px; color:var(--text-main); white-space:pre-line;">${r.content}</p>
          </div>
        `;
      });
    }
  }

  html += `
    </div>
  `;

  wrapper.innerHTML = html;
}

window.switchDetailTab = function(groupId, tabName) {
  navigateTo("group-detail", { id: groupId, tab: tabName });
};

// Modal functions for Group Detail
window.openInquireModal = function(groupId) {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "인도자에게 문의하기";
  document.getElementById("modal-body").innerHTML = `
    <div class="form-group">
      <label class="form-label">문의 내용</label>
      <textarea class="form-control" id="inquiry-text" rows="4" placeholder="모임 장소, 회비, 연령대 등 궁금하신 점을 작성해 주세요."></textarea>
    </div>
  `;
  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent" onclick="submitInquiry('${groupId}')">보내기</button>
  `;
};

window.submitInquiry = function(groupId) {
  const txt = document.getElementById("inquiry-text").value;
  if (!txt) return;
  
  const group = appState.db.groups.find(g => g.id === groupId);
  if (!group) return;

  // Add notification to leader
  appState.db.notifications.push({
    id: `nt_${Date.now()}`,
    userId: group.leaderId,
    title: "새로운 가입 문의",
    message: `${appState.currentUser.name} 성도님의 문의: "${txt}"`,
    date: new Date().toISOString().split("T")[0],
    read: false
  });
  
  appState.saveDB();
  closeModal();
  alert("소그룹 인도자에게 문의가 전송되었습니다. 확인 후 연락드리겠습니다.");
};

window.openManageMembersModal = function(groupId) {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  
  const apps = appState.db.applications.filter(a => a.groupId === groupId && a.status === "pending");
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "가입 승인 대기 목록";
  
  let html = "";
  if (apps.length === 0) {
    html = `<p style="text-align:center; padding: 20px; color:var(--text-muted);">대기 중인 신청자가 없습니다.</p>`;
  } else {
    apps.forEach(a => {
      html += `
        <div style="padding:12px; background:#F8FAFC; border-radius:var(--radius-sm); border:1px solid var(--border); margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:600;">${a.userName} 성도 (${a.userAge}세)</div>
            <div style="font-size:11px; color:var(--text-muted);">${a.userDistrict} | 신청일: ${a.date}</div>
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn btn-danger btn-sm" onclick="rejectApplication('${a.id}', '${groupId}')">거절</button>
            <button class="btn btn-accent btn-sm" onclick="approveApplication('${a.id}', '${groupId}')">승인</button>
          </div>
        </div>
      `;
    });
  }
  
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("modal-footer").innerHTML = `<button class="btn btn-outline btn-block" onclick="closeModal()">닫기</button>`;
};

window.approveApplication = function(appId, groupId) {
  const app = appState.db.applications.find(a => a.id === appId);
  if (!app) return;
  
  app.status = "approved";
  
  const group = appState.db.groups.find(g => g.id === groupId);
  if (group && !group.members.includes(app.userId)) {
    group.members.push(app.userId);
  }
  
  // Notification to applicant
  appState.db.notifications.push({
    id: `nt_${Date.now()}`,
    userId: app.userId,
    title: "소모임 가입 완료",
    message: `'${group.name}' 소모임 신청이 승인되었습니다. 환영합니다!`,
    date: new Date().toISOString().split("T")[0],
    read: false
  });

  appState.saveDB();
  alert(`${app.userName} 성도님의 가입을 승인했습니다.`);
  closeModal();
  navigateTo("group-detail", { id: groupId });
};

window.rejectApplication = function(appId, groupId) {
  const app = appState.db.applications.find(a => a.id === appId);
  if (!app) return;
  app.status = "rejected";
  appState.saveDB();
  alert(`${app.userName} 성도님의 신청을 거절 처리했습니다.`);
  closeModal();
  navigateTo("group-detail", { id: groupId });
};

// Add notice
window.openAddNoticeModal = function(groupId) {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "새 공지사항 등록";
  document.getElementById("modal-body").innerHTML = `
    <div class="form-group">
      <label class="form-label">제목</label>
      <input type="text" class="form-control" id="notice-title" placeholder="예: 이번주 간식 조 배정 안내">
    </div>
    <div class="form-group">
      <label class="form-label">내용</label>
      <textarea class="form-control" id="notice-content" rows="4" placeholder="공지할 상세 내용을 입력해 주세요."></textarea>
    </div>
  `;
  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent" onclick="submitNotice('${groupId}')">등록하기</button>
  `;
};

window.submitNotice = function(groupId) {
  const title = document.getElementById("notice-title").value;
  const content = document.getElementById("notice-content").value;
  if (!title || !content) return;
  
  const group = appState.db.groups.find(g => g.id === groupId);
  
  const newNotice = {
    id: `n_${Date.now()}`,
    groupId: groupId,
    authorName: appState.currentUser.name,
    title: title,
    content: content,
    date: new Date().toISOString().split("T")[0]
  };
  
  appState.db.notices.push(newNotice);
  
  // Notify group members
  group.members.forEach(memberId => {
    if (memberId !== appState.currentUser.id) {
      appState.db.notifications.push({
        id: `nt_${Date.now()}_${memberId}`,
        userId: memberId,
        title: "소모임 새 공지사항",
        message: `'${group.name}' 소모임에 새 공지사항이 등록되었습니다: ${title}`,
        date: new Date().toISOString().split("T")[0],
        read: false
      });
    }
  });

  appState.saveDB();
  closeModal();
  navigateTo("group-detail", { id: groupId, tab: "notice" });
};

// Add prayer
window.openAddPrayerModal = function(groupId) {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "새 기도제목 작성";
  document.getElementById("modal-body").innerHTML = `
    <div class="form-group">
      <label class="form-label">기도제목</label>
      <input type="text" class="form-control" id="prayer-title" placeholder="한 줄 기도 요약">
    </div>
    <div class="form-group">
      <label class="form-label">기도 내용</label>
      <textarea class="form-control" id="prayer-content" rows="4" placeholder="상세한 기도 내용을 작성해 주세요."></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">공개 범위 설정</label>
      <select class="form-control" id="prayer-visibility">
        <option value="public">전체 공개 (모든 성도)</option>
        <option value="group" selected>모임만 공개 (소그룹 멤버만)</option>
        <option value="leader">인도자만 공개 (리더 및 교역자만)</option>
      </select>
    </div>
  `;
  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent" onclick="submitPrayer('${groupId}')">작성완료</button>
  `;
};

window.submitPrayer = function(groupId) {
  const title = document.getElementById("prayer-title").value;
  const content = document.getElementById("prayer-content").value;
  const visibility = document.getElementById("prayer-visibility").value;
  if (!title || !content) return;
  
  const group = appState.db.groups.find(g => g.id === groupId);

  const newPrayer = {
    id: `pr_${Date.now()}`,
    groupId: groupId,
    groupName: group.name,
    authorId: appState.currentUser.id,
    authorName: appState.currentUser.name,
    title: title,
    content: content,
    visibility: visibility,
    date: new Date().toISOString().split("T")[0],
    answers: []
  };

  appState.db.prayers.push(newPrayer);
  
  // Notify leader if it's leader-only or group
  if (visibility !== "public" && appState.currentUser.id !== group.leaderId) {
    appState.db.notifications.push({
      id: `nt_${Date.now()}`,
      userId: group.leaderId,
      title: "새로운 소그룹 기도제목",
      message: `${appState.currentUser.name} 성도님이 기도제목을 올리셨습니다.`,
      date: new Date().toISOString().split("T")[0],
      read: false
    });
  }

  appState.saveDB();
  closeModal();
  navigateTo("group-detail", { id: groupId, tab: "prayer" });
};

// Add comment to prayer
window.addCommentToPrayer = function(groupId, prayerId) {
  const input = document.getElementById(`comment-input-${prayerId}`);
  const txt = input.value;
  if (!txt) return;

  const prayer = appState.db.prayers.find(p => p.id === prayerId);
  if (prayer) {
    prayer.answers.push(`${txt} (${appState.currentUser.name})`);
    
    // Notify author
    if (prayer.authorId !== appState.currentUser.id) {
      appState.db.notifications.push({
        id: `nt_${Date.now()}`,
        userId: prayer.authorId,
        title: "기도제목에 격려 댓글",
        message: `${appState.currentUser.name} 성도님이 회원님의 기도제목에 댓글을 남겼습니다.`,
        date: new Date().toISOString().split("T")[0],
        read: false
      });
    }
    
    appState.saveDB();
    navigateTo("group-detail", { id: groupId, tab: "prayer" });
  }
};

// Upload Photo Mock
window.openAddPhotoModal = function(groupId) {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "사진 올리기";
  
  // Pre-selected Unsplash images for easy demonstration
  const mockImages = [
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&auto=format&fit=crop&q=60"
  ];

  let selectHtml = `<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:12px;">`;
  mockImages.forEach((img, idx) => {
    selectHtml += `
      <img src="${img}" style="width:100%; height:60px; object-fit:cover; border-radius:4px; border:2px solid transparent; cursor:pointer;" id="img-select-${idx}" onclick="selectMockImg(${idx}, '${img}')">
    `;
  });
  selectHtml += `</div>`;

  document.getElementById("modal-body").innerHTML = `
    <label class="form-label">샘플 사진 선택</label>
    ${selectHtml}
    <input type="hidden" id="photo-selected-url" value="${mockImages[0]}">
    <div class="form-group">
      <label class="form-label">설명 (캡션)</label>
      <input type="text" class="form-control" id="photo-caption" placeholder="예: 은혜로웠던 다과 시간">
    </div>
  `;

  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent" onclick="submitPhoto('${groupId}')">올리기</button>
  `;
  // Initial select
  setTimeout(() => selectMockImg(0, mockImages[0]), 50);
};

window.selectMockImg = function(index, url) {
  document.querySelectorAll("[id^='img-select-']").forEach(img => {
    img.style.borderColor = "transparent";
  });
  document.getElementById(`img-select-${index}`).style.borderColor = "var(--accent)";
  document.getElementById("photo-selected-url").value = url;
};

window.submitPhoto = function(groupId) {
  const url = document.getElementById("photo-selected-url").value;
  const caption = document.getElementById("photo-caption").value;
  if (!caption) return;

  appState.db.photos.push({
    id: `ph_${Date.now()}`,
    groupId: groupId,
    img: url,
    caption: caption,
    date: new Date().toISOString().split("T")[0]
  });

  appState.saveDB();
  closeModal();
  navigateTo("group-detail", { id: groupId, tab: "photo" });
};

// Add Review
window.openAddReviewModal = function(groupId) {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "모임 후기 남기기";
  document.getElementById("modal-body").innerHTML = `
    <div class="form-group">
      <label class="form-label">후기 내용</label>
      <textarea class="form-control" id="review-content" rows="4" placeholder="오늘 소모임의 은혜로운 순간이나 소감을 나눠주세요."></textarea>
    </div>
  `;
  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent" onclick="submitReview('${groupId}')">후기등록</button>
  `;
};

window.submitReview = function(groupId) {
  const content = document.getElementById("review-content").value;
  if (!content) return;

  appState.db.reviews.push({
    id: `rev_${Date.now()}`,
    groupId: groupId,
    authorName: appState.currentUser.name,
    content: content,
    date: new Date().toISOString().split("T")[0]
  });

  appState.saveDB();
  closeModal();
  navigateTo("group-detail", { id: groupId, tab: "review" });
};

window.viewLargeImage = function(url) {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "사진 확대 보기";
  document.getElementById("modal-body").innerHTML = `<img src="${url}" style="width:100%; max-height:400px; object-fit:contain; border-radius:var(--radius-sm);">`;
  document.getElementById("modal-footer").innerHTML = `<button class="btn btn-outline btn-block" onclick="closeModal()">닫기</button>`;
};

// --- CALENDAR PAGE ---
function renderCalendarPage(wrapper) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed
  
  // Selected date from state or default today
  const selectedDateStr = appState.params.date || today.toISOString().split("T")[0];
  const selectedDate = new Date(selectedDateStr);
  
  // Calculate calendar elements
  const firstDay = new Date(currentYear, currentMonth, 1);
  const startingDay = firstDay.getDay(); // 0 is Sunday, 1 is Monday...
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Fetch meetings in this month
  const meetingsThisMonth = appState.db.meetings.filter(m => {
    const mDate = new Date(m.date);
    return mDate.getFullYear() === currentYear && mDate.getMonth() === currentMonth;
  });

  let html = `
    <h2 style="margin-bottom: 12px; color: var(--primary);">일정 관리</h2>
    
    <div class="calendar-view">
      <div class="calendar-header">
        <h3 style="color: var(--primary); font-weight:700;">${currentYear}년 ${currentMonth + 1}월</h3>
        <div style="font-size: 11px; background: rgba(26,54,93,0.08); padding: 4px 8px; border-radius:12px; color:var(--primary);">
          오늘: ${today.getDate()}일
        </div>
      </div>
      
      <div class="calendar-weekdays">
        <div style="color: var(--danger);">일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div style="color: var(--primary-light);">토</div>
      </div>
      
      <div class="calendar-grid">
  `;

  // Empty cells before starting day
  for (let i = 0; i < startingDay; i++) {
    html += `<div class="calendar-day empty"></div>`;
  }

  // Days cells
  for (let d = 1; d <= totalDays; d++) {
    const dStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isToday = d === today.getDate();
    const isSelected = dStr === selectedDateStr;
    
    // Check if there are meetings on this day
    const dayMeetings = meetingsThisMonth.filter(m => m.date === dStr);
    const hasMeeting = dayMeetings.length > 0;
    
    html += `
      <div class="calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasMeeting ? 'has-meeting' : ''}" onclick="selectCalendarDay('${dStr}')">
        ${d}
      </div>
    `;
  }

  html += `
      </div>
    </div>
    
    <div class="meeting-list-today">
      <div class="section-title"><h3>선택일 (${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일) 모임</h3></div>
  `;

  const selectedDayMeetings = appState.db.meetings.filter(m => m.date === selectedDateStr);

  if (selectedDayMeetings.length === 0) {
    html += `
      <div style="background: white; border-radius: var(--radius-md); padding: 20px; border: 1px solid var(--border); text-align: center; color: var(--text-muted); font-size:12px;">
        이날은 예정된 모임 일정이 없습니다.
      </div>
    `;
  } else {
    selectedDayMeetings.forEach(meeting => {
      const group = appState.db.groups.find(g => g.id === meeting.groupId);
      const isMember = group ? group.members.includes(appState.currentUser.id) : false;
      
      html += `
        <div style="background: white; border-radius: var(--radius-md); padding: 12px; border: 1px solid var(--border); margin-bottom: 8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h4 style="font-weight:700; color:var(--primary); margin-bottom:2px;">${meeting.groupName}</h4>
            <div style="font-size:11px; color:var(--text-muted);">🕒 ${meeting.time} | 📍 ${meeting.location}</div>
          </div>
          <div>
            ${isMember ? 
              `<span style="background-color: var(--success); color:white; font-size:10px; font-weight:700; padding:4px 8px; border-radius:12px;">참석 예정</span>` :
              `<button class="btn btn-accent btn-sm" onclick="applyForGroup('${meeting.groupId}')">모임 신청</button>`
            }
          </div>
        </div>
      `;
    });
  }

  html += `
    </div>
  `;

  wrapper.innerHTML = html;
}

window.selectCalendarDay = function(dateStr) {
  navigateTo("calendar", { date: dateStr });
};

// --- NOTIFICATIONS PAGE ---
function renderNotificationsPage(wrapper) {
  // Filters notifications belonging to current user
  const userNotis = appState.db.notifications.filter(n => n.userId === appState.currentUser.id);

  let html = `
    <h2 style="margin-bottom: 12px; color: var(--primary);">알림 센터</h2>
    <div class="noti-list">
  `;

  if (userNotis.length === 0) {
    html += `
      <div style="text-align: center; padding: 40px 20px; background: white; border-radius: var(--radius-md); border: 1px solid var(--border);">
        <span style="font-size: 32px; display: block; margin-bottom: 12px;">🔔</span>
        <p style="color: var(--text-muted); font-weight: 500;">최근 수신된 알림이 없습니다.</p>
      </div>
    `;
  } else {
    userNotis.forEach(noti => {
      html += `
        <div class="noti-item" style="${noti.read ? 'opacity: 0.7; border-left-color: var(--border);' : ''}" onclick="markNotiAsRead('${noti.id}')">
          <div class="noti-icon">🔔</div>
          <div class="noti-content">
            <h4 style="font-weight: 700; color: var(--primary);">${noti.title}</h4>
            <p style="font-size:12px; color:var(--text-main); margin-bottom:2px;">${noti.message}</p>
            <p style="font-size:10px; color:var(--text-muted);">${noti.date}</p>
          </div>
        </div>
      `;
    });
  }

  html += `
    </div>
  `;

  wrapper.innerHTML = html;
}

window.markNotiAsRead = function(notiId) {
  const noti = appState.db.notifications.find(n => n.id === notiId);
  if (noti) {
    noti.read = true;
    appState.saveDB();
    renderPage("notifications");
  }
};

// --- PROFILE PAGE ---
function renderProfilePage(wrapper) {
  const user = appState.currentUser;
  
  // Find groups the user belongs to
  const userGroups = appState.db.groups.filter(g => g.members.includes(user.id) || g.leaderId === user.id);
  
  // Calculate attendance records for user
  const userAttendance = appState.db.attendance.filter(a => a.memberId === user.id);
  const presentCount = userAttendance.filter(a => a.status === "present").length;
  const lateCount = userAttendance.filter(a => a.status === "late").length;
  const absentCount = userAttendance.filter(a => a.status === "absent").length;
  const attRate = userAttendance.length > 0 ? Math.round((presentCount + lateCount * 0.7) / userAttendance.length * 100) : 100;

  let html = `
    <h2 style="margin-bottom: 12px; color: var(--primary);">내 정보</h2>
    
    <div class="profile-card">
      <div class="profile-avatar">${user.avatar || user.name[0]}</div>
      <h3 style="font-weight: 800; color: var(--primary); margin-bottom: 2px;">${user.name}</h3>
      <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">권한: ${user.role === 'admin' ? '교역자/관리자' : (user.role === 'leader' ? '소그룹 인도자' : '일반 성도')}</p>
      
      <div style="display:flex; justify-content:space-around; background:#F8FAFC; padding:12px; border-radius:var(--radius-sm); border:1px solid var(--border); text-align:center;">
        <div>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:2px;">가입 모임</div>
          <div style="font-weight:700; color:var(--primary);">${userGroups.length}개</div>
        </div>
        <div style="border-left:1px solid var(--border); padding-left:16px;">
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:2px;">출석률</div>
          <div style="font-weight:700; color:var(--success);">${attRate}%</div>
        </div>
      </div>
      
      <button class="btn btn-outline btn-block btn-sm" style="margin-top:12px;" onclick="openEditProfileModal()">📝 내 정보 수정</button>
    </div>

    <!-- Attendance Stats for User -->
    <div class="section-header">
      <div class="section-title"><h3>나의 출석 현황</h3></div>
    </div>
    <div style="background:white; padding:16px; border-radius:var(--radius-md); border:1px solid var(--border); margin-bottom:16px; display:grid; grid-template-columns: repeat(3, 1fr); text-align:center; gap:8px;">
      <div style="background:#E6F4EA; border-radius:var(--radius-sm); padding:10px 0;">
        <span style="display:block; font-size:11px; color:var(--success); font-weight:600;">출석</span>
        <span style="font-size:18px; font-weight:800; color:var(--success);">${presentCount}회</span>
      </div>
      <div style="background:#FFF3E0; border-radius:var(--radius-sm); padding:10px 0;">
        <span style="display:block; font-size:11px; color:var(--warning); font-weight:600;">지각</span>
        <span style="font-size:18px; font-weight:800; color:var(--warning);">${lateCount}회</span>
      </div>
      <div style="background:#FCE8E6; border-radius:var(--radius-sm); padding:10px 0;">
        <span style="display:block; font-size:11px; color:var(--danger); font-weight:600;">결석</span>
        <span style="font-size:18px; font-weight:800; color:var(--danger);">${absentCount}회</span>
      </div>
    </div>

    <div class="section-header">
      <div class="section-title"><h3>내가 참여 중인 모임</h3></div>
    </div>
    <div class="card-list">
  `;

  userGroups.forEach(g => {
    html += `
      <div style="background:white; padding:12px; border-radius:var(--radius-md); border:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="font-weight:700; color:var(--primary); margin-bottom:2px;">${g.name}</h4>
          <span style="font-size:11px; color:var(--text-muted);">인도자: ${g.leaderName} | 모임일: ${g.day}</span>
        </div>
        <button class="btn btn-outline btn-sm" onclick="navigateTo('group-detail', {id: '${g.id}'})">상세</button>
      </div>
    `;
  });

  html += `
    </div>
  `;

  wrapper.innerHTML = html;
}

window.openEditProfileModal = function() {
  const modal = document.getElementById("general-modal");
  if (!modal) return;
  modal.classList.add("active");
  document.getElementById("modal-title").innerText = "내 정보 수정";
  
  const user = appState.currentUser;
  
  document.getElementById("modal-body").innerHTML = `
    <div class="form-group">
      <label class="form-label">이름</label>
      <input type="text" class="form-control" id="prof-name" value="${user.name}">
    </div>
    <div class="form-group">
      <label class="form-label">연락처</label>
      <input type="text" class="form-control" id="prof-phone" value="${user.phone}">
    </div>
    <div class="form-group">
      <label class="form-label">거주 지역 (구역)</label>
      <input type="text" class="form-control" id="prof-district" value="${user.district || ''}">
    </div>
    <div class="form-group">
      <label class="form-label">이메일</label>
      <input type="email" class="form-control" id="prof-email" value="${user.email || ''}">
    </div>
  `;

  document.getElementById("modal-footer").innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">취소</button>
    <button class="btn btn-accent" onclick="submitEditProfile()">저장하기</button>
  `;
};

window.submitEditProfile = function() {
  const name = document.getElementById("prof-name").value;
  const phone = document.getElementById("prof-phone").value;
  const district = document.getElementById("prof-district").value;
  const email = document.getElementById("prof-email").value;

  if (!name || !phone) {
    alert("이름과 연락처는 필수 입력 사항입니다.");
    return;
  }

  appState.currentUser.name = name;
  appState.currentUser.phone = phone;
  appState.currentUser.district = district;
  appState.currentUser.email = email;
  appState.currentUser.avatar = name[0];

  appState.saveDB();
  closeModal();
  alert("프로필 정보가 정상 수정되었습니다.");
  renderPage("profile");
  
  // Refresh switcher header
  renderRoleSwitcher();
};

// --- ATTENDANCE CHECK PAGE (Leader Only) ---
function renderAttendanceCheckPage(wrapper, groupId) {
  const group = appState.db.groups.find(g => g.id === groupId);
  if (!group) return;

  // Selected date defaults to next meeting date or today
  const selectedDate = appState.params.checkDate || new Date().toISOString().split("T")[0];

  // Fetch group members from user DB
  const groupMembers = appState.db.users.filter(u => group.members.includes(u.id));

  // Find attendance logs for this group on this date
  const dateLogs = appState.db.attendance.filter(a => a.groupId === groupId && a.date === selectedDate);

  let html = `
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
      <button class="back-btn" style="position:static; margin:0;" onclick="navigateTo('group-detail', {id: '${groupId}'})">
        <svg style="width: 20px; height: 20px; fill: var(--primary);" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </button>
      <h2 style="color:var(--primary); font-size:18px;">${group.name} 출석 체크</h2>
    </div>

    <div style="background:white; padding:16px; border-radius:var(--radius-md); border:1px solid var(--border); margin-bottom:16px;">
      <div class="form-group">
        <label class="form-label">모임 날짜 선택</label>
        <input type="date" class="form-control" id="attendance-date-picker" value="${selectedDate}" onchange="changeAttendanceCheckDate('${groupId}', this.value)">
      </div>
      <p style="font-size:11px; color:var(--text-muted);">원하시는 날짜를 선택한 뒤 아래 성도들의 출석 상태를 클릭하여 변경해 주세요.</p>
    </div>

    <div class="attendance-checklist">
  `;

  groupMembers.forEach(member => {
    const log = dateLogs.find(a => a.memberId === member.id);
    const status = log ? log.status : ""; // default empty / unchecked
    
    html += `
      <div class="attendance-row">
        <div>
          <span class="member-name">${member.name} 성도</span>
          <span style="font-size:11px; color:var(--text-muted); display:block;">연령: ${member.age}세 | 지역: ${member.district}</span>
        </div>
        <div class="attendance-actions">
          <button class="att-btn present ${status === 'present' ? 'active' : ''}" onclick="setMemberAttendance('${groupId}', '${selectedDate}', '${member.id}', 'present')">출석</button>
          <button class="att-btn late ${status === 'late' ? 'active' : ''}" onclick="setMemberAttendance('${groupId}', '${selectedDate}', '${member.id}', 'late')">지각</button>
          <button class="att-btn absent ${status === 'absent' ? 'active' : ''}" onclick="setMemberAttendance('${groupId}', '${selectedDate}', '${member.id}', 'absent')">결석</button>
        </div>
      </div>
    `;
  });

  html += `
    </div>

    <div style="margin-top:20px; display:flex; gap:8px;">
      <button class="btn btn-outline" style="flex:1;" onclick="navigateTo('group-detail', {id: '${groupId}'})">이전으로</button>
      <button class="btn btn-accent" style="flex:2;" onclick="saveAttendance('${groupId}', '${selectedDate}')">💾 출석 저장</button>
    </div>
  `;

  wrapper.innerHTML = html;
}

window.changeAttendanceCheckDate = function(groupId, dateStr) {
  navigateTo("attendance-check", { groupId: groupId, checkDate: dateStr });
};

window.setMemberAttendance = function(groupId, dateStr, memberId, status) {
  // Update state memory locally before save button is clicked
  let log = appState.db.attendance.find(a => a.groupId === groupId && a.date === dateStr && a.memberId === memberId);
  if (!log) {
    log = { meetingId: `m_att_${Date.now()}`, groupId: groupId, date: dateStr, memberId: memberId, status: status };
    appState.db.attendance.push(log);
  } else {
    log.status = status;
  }
  
  // Re-render to show active classes on buttons
  const wrapper = document.querySelector(".page-attendance-check");
  if (wrapper) {
    renderAttendanceCheckPage(wrapper, groupId);
  }
};

window.saveAttendance = function(groupId, dateStr) {
  appState.saveDB();
  alert(`${dateStr} 출석 기록이 정상적으로 저장되었습니다.`);
  navigateTo("group-detail", { id: groupId });
};

// --- ADMIN DASHBOARD PAGE ---
function renderAdminDashboardPage(wrapper) {
  if (appState.currentUser.role !== "admin") {
    wrapper.innerHTML = `<p style="padding:20px; text-align:center;">권한이 없습니다. 교역자 권한으로 변경 후 사용해 주세요.</p>`;
    return;
  }

  const totalMembers = appState.db.users.length;
  const totalGroups = appState.db.groups.length;
  const thisWeekAttendCount = appState.db.attendance.filter(a => a.date === "2026-06-19" && (a.status === 'present' || a.status === 'late')).length;
  const attendanceRate = Math.round((thisWeekAttendCount / totalMembers) * 100);

  let html = `
    <h2 style="margin-bottom: 12px; color: var(--primary);">교역자 관리자 모드</h2>

    <!-- Stats Cards Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">${totalMembers}명</span>
        <span class="stat-label">교회 전체 성도 수</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${totalGroups}개</span>
        <span class="stat-label">등록 소모임 수</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${thisWeekAttendCount}명</span>
        <span class="stat-label">이번 주 참석 인원</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${attendanceRate}%</span>
        <span class="stat-label">주간 평균 참석률</span>
      </div>
    </div>

    <!-- Charts UI (SVG Premium Rendering) -->
    <div class="chart-container">
      <h3 style="font-size:13px; font-weight:700; color:var(--primary); margin-bottom:12px;">📈 월별 소그룹 평균 참석률 (2026)</h3>
      <div style="height: 150px; display: flex; align-items: flex-end; justify-content: space-around; padding-bottom: 8px; border-bottom: 1px solid var(--border);">
        <!-- 3월 -->
        <div style="display:flex; flex-direction:column; align-items:center; width:15%;">
          <span style="font-size:10px; font-weight:700; color:var(--primary);">65%</span>
          <div style="width:24px; height:65px; background:linear-gradient(to top, var(--primary), var(--primary-light)); border-radius:4px 4px 0 0;"></div>
          <span style="font-size:10px; color:var(--text-muted); margin-top:4px;">3월</span>
        </div>
        <!-- 4월 -->
        <div style="display:flex; flex-direction:column; align-items:center; width:15%;">
          <span style="font-size:10px; font-weight:700; color:var(--primary);">72%</span>
          <div style="width:24px; height:72px; background:linear-gradient(to top, var(--primary), var(--primary-light)); border-radius:4px 4px 0 0;"></div>
          <span style="font-size:10px; color:var(--text-muted); margin-top:4px;">4월</span>
        </div>
        <!-- 5월 -->
        <div style="display:flex; flex-direction:column; align-items:center; width:15%;">
          <span style="font-size:10px; font-weight:700; color:var(--primary);">78%</span>
          <div style="width:24px; height:78px; background:linear-gradient(to top, var(--primary), var(--primary-light)); border-radius:4px 4px 0 0;"></div>
          <span style="font-size:10px; color:var(--text-muted); margin-top:4px;">5월</span>
        </div>
        <!-- 6월 -->
        <div style="display:flex; flex-direction:column; align-items:center; width:15%;">
          <span style="font-size:10px; font-weight:700; color:var(--accent-dark);">84%</span>
          <div style="width:24px; height:84px; background:linear-gradient(to top, var(--accent), var(--accent-light)); border-radius:4px 4px 0 0;"></div>
          <span style="font-size:10px; color:var(--text-muted); margin-top:4px;">6월</span>
        </div>
      </div>
    </div>

    <!-- Age Groups stats -->
    <div class="chart-container">
      <h3 style="font-size:13px; font-weight:700; color:var(--primary); margin-bottom:12px;">📊 연령대별 성도 분포</h3>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
            <span>청년부 (20~30대)</span>
            <b>12명 (24%)</b>
          </div>
          <div style="height:8px; background:#E2E8F0; border-radius:4px; overflow:hidden;">
            <div style="height:100%; width:24%; background-color:var(--primary);"></div>
          </div>
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
            <span>중/장년부 (40~50대)</span>
            <b>23명 (46%)</b>
          </div>
          <div style="height:8px; background:#E2E8F0; border-radius:4px; overflow:hidden;">
            <div style="height:100%; width:46%; background-color:var(--accent);"></div>
          </div>
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:2px;">
            <span>실버/시니어 (60대 이상)</span>
            <b>15명 (30%)</b>
          </div>
          <div style="height:8px; background:#E2E8F0; border-radius:4px; overflow:hidden;">
            <div style="height:100%; width:30%; background-color:var(--primary-light);"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- User Management Table -->
    <div class="section-header">
      <div class="section-title"><h3>전체 성도 리스트</h3></div>
    </div>
    
    <div class="table-wrapper" style="margin-bottom:16px;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>성명</th>
            <th>구분</th>
            <th>구역/지역</th>
            <th>연락처</th>
            <th>권한 설정</th>
          </tr>
        </thead>
        <tbody>
  `;

  // List top 10 users for display
  appState.db.users.forEach(u => {
    let roleText = "성도";
    if (u.role === "leader") roleText = "리더";
    if (u.role === "admin") roleText = "교역자";

    html += `
      <tr>
        <td style="font-weight:700;">${u.name}</td>
        <td>${roleText}</td>
        <td>${u.district || '미정'}</td>
        <td>${u.phone}</td>
        <td>
          <select style="font-size:10px; padding:2px;" onchange="changeUserRole('${u.id}', this.value)">
            <option value="member" ${u.role === 'member' ? 'selected' : ''}>성도</option>
            <option value="leader" ${u.role === 'leader' ? 'selected' : ''}>리더</option>
            <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>교역자</option>
          </select>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>

    <div style="margin-bottom:24px;">
      <button class="btn btn-accent btn-block" onclick="downloadDatabase()">
        📥 목양 전체 데이터 백업 (.json)
      </button>
    </div>
  `;

  wrapper.innerHTML = html;
}

window.changeUserRole = function(userId, newRole) {
  const user = appState.db.users.find(u => u.id === userId);
  if (user) {
    user.role = newRole;
    appState.saveDB();
    alert(`${user.name} 성도의 권한이 [${newRole === 'leader' ? '리더' : (newRole === 'admin' ? '교역자' : '성도')}]로 변경되었습니다.`);
    renderPage("admin-dashboard");
  }
};

window.downloadDatabase = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState.db, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `mokyang_connect_backup_${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

// --- FUTURE EXTENSION TEASER PAGE ---
function renderFutureFeaturePage(wrapper, featureId) {
  let title = "확장 준비 중";
  let emoji = "🚀";
  let desc = "";
  let interactiveHtml = "";

  switch (featureId) {
    case "new-family":
      title = "새가족 동반 관리";
      emoji = "🌱";
      desc = "새가족 등록, 4주 정착 교육 현황, 심방 카드 등록, 바나바 연결을 한눈에 관리할 수 있는 사역자 전용 지원 툴킷입니다.";
      interactiveHtml = `
        <div style="background:#F0FDF4; border:1px solid #C6F6D5; padding:16px; border-radius:var(--radius-md); margin-top:16px;">
          <h4 style="color:#22543D; font-weight:700; margin-bottom:8px;">💡 프로토타입 미리보기</h4>
          <ul style="font-size:12px; line-height:1.8; color:#2F855A; padding-left:16px;">
            <li>신규 등록 성도: 김희망 (2026-06-20 등록)</li>
            <li>정착 코스: [1주차 교육 완료] [2주차 대기]</li>
            <li>바나바 도우미: 박리더 집사</li>
          </ul>
          <button class="btn btn-accent btn-sm btn-block" style="margin-top:12px;" onclick="alert('바나바에게 새가족 매칭 알림이 발송되었습니다.')">바나바 매칭 매뉴얼 알림 발송</button>
        </div>
      `;
      break;
    case "qt":
      title = "큐티 체크 & 성경 읽기표";
      emoji = "📖";
      desc = "매일 아침 오늘의 큐티(생명의 삶 등) 본문을 제공하고, 성도들이 완료 체크를 하여 말씀으로 소통하고 나눔을 가지는 공간입니다.";
      interactiveHtml = `
        <div style="background:white; border:1px solid var(--border); padding:16px; border-radius:var(--radius-md); margin-top:16px;">
          <h4 style="color:var(--primary); font-weight:700; margin-bottom:8px;">오늘의 QT 구절 (6월 23일)</h4>
          <p style="font-style:italic; font-size:12px; color:var(--text-muted); margin-bottom:12px;">"주의 말씀은 내 발에 등이요 내 길에 빛이니이다" (시편 119:105)</p>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; font-weight:600;">성경 읽기 진도율: 24%</span>
            <button class="btn btn-accent btn-sm" onclick="alert('오늘의 큐티 완료를 체크했습니다! 성경 읽기 진도가 업데이트되었습니다.')">오늘 QT 완료 체크</button>
          </div>
        </div>
      `;
      break;
    case "ministry":
      title = "교회 사역 및 봉사 신청";
      emoji = "🤝";
      desc = "주차 안내, 안내 위원, 찬양팀, 주일 교사, 주방 봉사 등 교회의 다양한 일손이 필요한 영역에 스스로 자원하고 배치 결과를 확인하는 플랫폼입니다.";
      interactiveHtml = `
        <div style="background:white; border:1px solid var(--border); padding:16px; border-radius:var(--radius-md); margin-top:16px;">
          <h4 style="color:var(--primary); font-weight:700; margin-bottom:8px;">🛠️ 모집 중인 봉사 영역</h4>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:6px;">
              <span>🚗 주차 봉사팀 (오전 9시)</span>
              <button class="btn btn-outline btn-sm" style="height:24px; min-height:24px;" onclick="alert('주차 봉사팀에 자원 신청되었습니다.')">신청</button>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:6px;">
              <span>🍽️ 주일 식당 봉사 (오후 12시)</span>
              <button class="btn btn-outline btn-sm" style="height:24px; min-height:24px;" onclick="alert('식당 봉사팀에 자원 신청되었습니다.')">신청</button>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span>🎤 할렐루야 찬양대 싱어</span>
              <button class="btn btn-outline btn-sm" style="height:24px; min-height:24px;" onclick="alert('찬양대 오디션 신청이 접수되었습니다.')">신청</button>
            </div>
          </div>
        </div>
      `;
      break;
    case "fc-soccer":
      title = "FC문발이음 축구 모임 관리";
      emoji = "⚽";
      desc = "파주목양교회의 자랑! 이웃 주민 선교와 친목을 이끄는 축구 모임의 경기 일정, 회비 납부 현황, 골 득점자 기록 등을 총괄 관리합니다.";
      interactiveHtml = `
        <div style="background:#FFFDF5; border:1px solid #FEFCBF; padding:16px; border-radius:var(--radius-md); margin-top:16px;">
          <h4 style="color:#B7791F; font-weight:700; margin-bottom:6px;">📅 다음 경기 안내</h4>
          <p style="font-size:12px; margin-bottom:4px;"><b>일시:</b> 2026년 6월 27일 (토) 오전 07:00</p>
          <p style="font-size:12px; margin-bottom:12px;"><b>상대팀:</b> 문발 조기축구회 1진</p>
          
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; color:var(--text-muted);">현재 참석 예정 인원: 14명</span>
            <button class="btn btn-accent btn-sm" onclick="alert('참석 신청이 접수되었습니다. 토요일에 문발운동장에서 만나요!')">출전 신청</button>
          </div>
        </div>
      `;
      break;
  }

  let html = `
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:16px;">
      <button class="back-btn" style="position:static; margin:0;" onclick="navigateTo('home')">
        <svg style="width: 20px; height: 20px; fill: var(--primary);" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
      </button>
      <h2 style="color:var(--primary); font-size:16px;">향후 연계 확장 기능</h2>
    </div>

    <div style="background:white; border-radius:var(--radius-md); padding:20px; text-align:center; border:1px solid var(--border); box-shadow:var(--shadow-sm);">
      <span style="font-size:52px; display:block; margin-bottom:12px;">${emoji}</span>
      <h3 style="font-size:18px; font-weight:800; color:var(--primary); margin-bottom:8px;">${title}</h3>
      <p style="font-size:12px; color:var(--text-muted); line-height:1.6; max-width:300px; margin:0 auto 16px auto;">${desc}</p>
      
      <div style="border-top:1px dashed var(--border); padding-top:16px; margin-top:16px; text-align:left;">
        ${interactiveHtml}
      </div>
    </div>
  `;

  wrapper.innerHTML = html;
}

// 5. Global Helpers & Modal Controls
window.closeModal = function() {
  const modal = document.getElementById("general-modal");
  if (modal) modal.classList.remove("active");
};

// Initialize app when window loads
window.addEventListener("DOMContentLoaded", () => {
  initApp();
});
