// app.js - 목양양육앱 코어 비즈니스 로직 및 Mock DB 관리 시스템

// 1. 초기 데이터베이스 정의 (파주목양교회 실사용 모의 데이터 - 50인 규모)
const INITIAL_DB = {
  users: [
    { id: "u1", name: "이목사", email: "pastor@mokyang.org", phone: "010-1111-2222", role: "admin", district: "교역자", age: 48, gender: "남", avatar: "이", registerDate: "2026-06-01", approvalDate: "2026-06-01" },
    { id: "u2", name: "박교사", email: "park@mokyang.org", phone: "010-2222-3333", role: "leader", district: "야당 1교구", age: 42, gender: "남", avatar: "박", registerDate: "2026-06-02", approvalDate: "2026-06-02" },
    { id: "u3", name: "김리더", email: "kim@mokyang.org", phone: "010-3333-4444", role: "leader", district: "목동 2교구", age: 39, gender: "여", avatar: "김", registerDate: "2026-06-03", approvalDate: "2026-06-03" },
    { id: "u4", name: "최대기", email: "choi@naver.com", phone: "010-4444-5555", role: "pending", district: "다율 교구", age: 55, gender: "여", avatar: "최", registerDate: "2026-06-23", approvalDate: null },
    { id: "u5", name: "정대기", email: "jung@daum.net", phone: "010-5555-6666", role: "pending", district: "와동 교구", age: 62, gender: "남", avatar: "정", registerDate: "2026-06-23", approvalDate: null }
  ],
  approvals: [
    { id: "ap1", userId: "u4", userName: "최대기", status: "pending", requestDate: "2026-06-23", decisionDate: null, comment: "" },
    { id: "ap2", userId: "u5", userName: "정대기", status: "pending", requestDate: "2026-06-23", decisionDate: null, comment: "" }
  ],
  devotions: [
    {
      id: "d1",
      date: "2026-06-23",
      scripture: "마태복음 5:1-12",
      title: "참된 복이 있는 사람",
      content: "예수님께서는 산에 올라 제자들에게 하늘나라의 백성이 누려야 할 참된 복에 대해 가르치십니다. 세상이 말하는 물질적이고 외적인 복과 달리, 심령이 가난한 자, 애통하는 자, 온유한 자, 의에 주리고 목마른 자가 진정한 복이 있다고 선언하십니다. 이들은 주님 안에서 영원한 위로와 하늘의 상급을 얻게 될 것입니다.",
      question1: "예수님이 선언하신 8가지 복 중, 현재 나의 마음에 가장 깊이 묵상되는 복은 무엇이며 그 이유는 무엇입니까?",
      question2: "세상의 가치관(성공, 부, 명예) 대신 하늘의 가치관으로 오늘 하루를 살아가기 위해 내가 포기하거나 결단해야 할 부분은 무엇입니까?",
      prayer: "사랑의 주님, 세상이 주는 일시적인 복에 마음을 빼앗기지 않고, 주님이 말씀하신 심령이 가난한 자의 겸손함과 온유함을 품게 하소서. 오늘 하루 주님 한 분만으로 만족하는 복된 삶이 되도록 인도하여 주옵소서. 예수님의 이름으로 기도합니다. 아멘."
    },
    {
      id: "d2",
      date: "2026-06-22",
      scripture: "시편 23:1-6",
      title: "여호와는 나의 목자시니",
      content: "다윗은 여호와 하나님을 자신을 돌보시는 목자로 고백합니다. 푸른 풀밭과 쉴 만한 물가로 인도하시며, 사망의 음침한 골짜기를 다닐지라도 주의 지팡이와 막대기가 안위하시기에 두려움이 없다고 노래합니다. 내 평생에 선하심과 인자하심이 반드시 나를 따르리니 내가 여호와의 집에 영원히 살리로다.",
      question1: "사망의 음침한 골짜기와 같은 고난 속에서도 목자 되신 하나님을 온전히 신뢰했던 경험이 있습니까?",
      question2: "내 영혼을 소생시키시고 의의 길로 인도하시는 주님께 감사하며 오늘 내가 순종할 구체적인 행동은 무엇입니까?",
      prayer: "나의 좋은 목자 되신 하나님, 내 삶이 부족함이 없는 푸른 초장 같을 때나, 어두운 골짜기를 지날 때나 늘 함께 계셔 주심에 감사드립니다. 오늘도 목자이신 주님의 음성에만 귀 기울이며 한 걸음씩 동행하게 하소서. 예수님의 이름으로 기도합니다. 아멘."
    }
  ],
  devotion_responses: [
    { id: "dr1", devotionId: "d1", userId: "u2", userName: "박교사", response1: "온유한 자의 복을 묵상했습니다. 내 혈기와 고집을 내려놓고 주님의 온유함을 배우길 원합니다.", response2: "직장에서 억울한 일이 있어도 화내지 않고 차분히 기도로 대처하겠습니다.", prayerRequest: "가족들의 건강과 직장 내 평안을 위해", date: "2026-06-23 08:30" }
  ],
  courses: [
    { id: "c1", title: "새가족반", intro: "교회에 처음 오신 분들을 위해 파주목양교회의 비전과 기독교 신앙의 기초를 배우는 필수 코스입니다.", duration: "4주 과정", thumbnail: "🌱" },
    { id: "c2", title: "기초성경공부", intro: "성경의 역사, 구조, 그리고 하나님의 구원 역사 전반을 알기 쉽게 배우는 성경 입문 코스입니다.", duration: "6주 과정", thumbnail: "📖" },
    { id: "c3", title: "제자훈련", intro: "예수 그리스도의 성숙한 제자로 거듭나기 위해 인격과 삶의 훈련을 도모하는 심화 양육 코스입니다.", duration: "8주 과정", thumbnail: "👑" },
    { id: "c4", title: "복음이란 무엇인가", intro: "십자가의 도, 구원의 확신, 그리스도인의 거듭남에 대해 복음의 핵심 진리를 깊이 파헤칩니다.", duration: "4주 과정", thumbnail: "⛪" },
    { id: "c5", title: "하나님 나라 성경공부", intro: "구약과 신약을 통틀어 관통하는 '하나님 나라'의 비전과 그 백성들의 삶의 방식을 배웁니다.", duration: "5주 과정", thumbnail: "🌍" }
  ],
  lessons: [
    // 새가족반 강의들
    { id: "l1", courseId: "c1", title: "1강. 교회란 무엇인가?", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", handouts: "교회는 헬라어로 '에클레시아'이며, 부름을 받은 자들의 모임을 뜻합니다. 건물이나 조직이 아닌 예수 그리스도를 구주로 고백하는 사람들의 유기적 공동체입니다.", summary: "1. 교회는 건물이 아니라 성도의 모임입니다. 2. 머리 되신 분은 예수 그리스도입니다. 3. 성도는 지체로서 서로 연결되어 협력해야 합니다.", sharingQuestion: "당신이 생각하는 이상적인 교회 공동체의 모습은 어떠한가요?", assignment: "내가 파주목양교회 등록 후 느꼈던 솔직한 소감과 앞으로의 다짐을 적어 제출하세요.", order: 1 },
    { id: "l2", courseId: "c1", title: "2강. 예배의 참된 의미", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", handouts: "예배는 하나님의 은혜에 반응하는 피조물의 당연한 의무이자 특권입니다. 요한복음 4장에서는 영과 진리로 드리는 예배를 가르칩니다.", summary: "1. 예배는 구원의 은혜에 대한 감사입니다. 2. 예배의 주체는 오직 하나님이십니다. 3. 영과 진리로 드려야 합니다.", sharingQuestion: "최근 나의 예배 생활 속 방해 요소는 무엇이었나요?", assignment: "주일 예배에 집중하기 위한 나만의 준비 노력 3가지를 적어보세요.", order: 2 },
    { id: "l3", courseId: "c1", title: "3강. 기도와 성도의 교제", videoUrl: "", handouts: "기도는 영적인 호흡이며 하나님과의 대화입니다. 교제는 주님 안에서 사랑을 나누고 함께 성장하는 코이노니아를 의미합니다.", summary: "1. 기도는 호흡처럼 멈추지 않아야 합니다. 2. 기도의 모범은 주기도문입니다. 3. 성도의 교제는 사랑의 수고가 수반됩니다.", sharingQuestion: "기도에 응답받았던 가장 감사한 기억을 나누어 보세요.", assignment: "이번 주 함께 기도할 목장 식구 1명의 기도제목을 적어 제출해 주세요.", order: 3 },
    { id: "l4", courseId: "c1", title: "4강. 사명자의 삶과 파주목양교회의 비전", videoUrl: "", handouts: "성도는 세상의 소금과 빛이며 복음 전파의 사명자입니다. 파주목양교회는 파주 지역 사회를 품고 영혼을 구원하는 사명이 있습니다.", summary: "1. 우리는 세상으로 파송받은 선교사입니다. 2. 소금은 녹아져야 제맛을 냅니다. 3. 파주목양교회의 비전은 평신도 동역자를 양성하는 것입니다.", sharingQuestion: "나에게 주신 달란트(은사)는 무엇이며 교회를 위해 어떻게 사용할 수 있을까요?", assignment: "4주간의 과정을 마친 소감문(자유 서식)을 작성하여 등록해 주세요.", order: 4 },
    
    // 기초성경공부 강의들
    { id: "l5", courseId: "c2", title: "1강. 성경은 어떻게 기록되었는가", videoUrl: "", handouts: "성경은 하나님의 감동으로 쓰여진 책입니다. 구약 39권, 신약 27권으로 구성되어 예수 그리스도를 증언합니다.", summary: "성경의 권위와 성령의 영감을 배웁니다.", sharingQuestion: "성경을 읽을 때 겪는 어려움은 무엇입니까?", assignment: "내가 선호하는 성경 구절 3개와 그 이유를 적어주세요.", order: 1 }
  ],
  videos: [
    { id: "v1", title: "2026년 6월 21일 주일 설교: 참된 평강을 얻으라", speaker: "이목사", scripture: "요한복음 14:27", date: "2026-06-21", youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", summary: "세상이 주는 평안은 일시적이고 환경에 따라 흔들리지만, 주님이 주시는 평화는 십자가의 보혈로 성취된 영원한 화평입니다. 어떠한 풍파 속에서도 주님이 나와 동행하심을 신뢰할 때 진정한 안식을 누릴 수 있습니다.", devotionQuestion: "환경의 지배를 받는 일시적 평화와 주님이 주시는 흔들리지 않는 평화의 차이를 묵상하며, 최근 나의 마음에 불안이 찾아왔을 때 어떻게 극복했는지 나누어 봅시다." }
  ],
  assignments: [
    { id: "a1", lessonId: "l1", title: "교회 등록 소감문", description: "교회 등록 소감 및 다짐 작성", dueDate: "2026-07-10" },
    { id: "a2", lessonId: "l2", title: "예배 준비 노력 3가지", description: "주일 예배에 집중하기 위한 3가지 실천 행동 기록", dueDate: "2026-07-17" }
  ],
  submissions: [
    { id: "s1", assignmentId: "a1", lessonId: "l1", userId: "u6", userName: "강신성", content: "파주로 이사와서 파주목양교회에 등록하게 되었는데 분위기가 참 따뜻하고 성경 말씀이 은혜롭습니다. 열심히 배우고 봉사하고 싶습니다.", date: "2026-06-20 15:30", feedback: "귀한 신앙 고백에 감사드립니다. 함께 주님의 몸 된 교회를 든든히 세워가길 소망합니다! (박교사)", feedbackAuthor: "박교사" }
  ],
  progress: [
    { id: "prg1", userId: "u6", courseId: "c1", completedLessons: "l1,l2", submittedAssignments: "a1", lastAccessDate: "2026-06-23" }
  ],
  notices: [
    { id: "n1", title: "하반기 온라인 성경공부 개강 안내", content: "하반기 제자훈련 및 기초성경공부 온라인 과정이 순차적으로 개강합니다. 각 목장 리더를 통해 신청하여 주시고, 앱의 '성경공부' 탭을 통해 동영상을 시청해 주시기 바랍니다.", date: "2026-06-22", authorName: "이목사" }
  ]
};

// 2. 모의 회원 50명 생성기 (users 및 progress 데이터 확보)
function populateMockUsers(db) {
  const firstNames = ["민준", "서준", "도윤", "예준", "시우", "하준", "주원", "지호", "지후", "준우", "서윤", "서연", "지우", "하윤", "민서", "하은", "지아", "윤서", "수아", "지원", "은혜", "소망", "영희", "철수", "사랑", "성실", "온유", "평화", "영수", "순옥", "명숙", "광식", "정자", "순이", "정웅", "태현", "상훈", "민정", "지혜", "경아", "소희", "성호", "준상", "기범", "찬우", "선정"];
  const lastNames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오", "서", "신", "권", "황", "안", "송", "전", "홍"];
  const districts = ["야당 1교구", "야당 2교구", "목동 1교구", "목동 2교구", "다율 교구", "와동 교구", "금촌 교구", "운정 교구"];
  
  // u6부터 u50까지 총 45명의 성도 생성 (합계 50인 성립)
  for (let i = 6; i <= 50; i++) {
    const name = lastNames[i % lastNames.length] + firstNames[i % firstNames.length];
    const age = 35 + (i * 7) % 45; // 35 ~ 79세 장년 중심 분포 (50대 이상 다수 확보)
    const gender = i % 2 === 0 ? "남" : "여";
    const district = districts[i % districts.length];
    const email = `user${i}@mokyang.org`;
    const phone = `010-${(2000 + i * 17) % 10000}-${(6000 + i * 29) % 10000}`;
    
    db.users.push({
      id: `u${i}`,
      name: name,
      email: email,
      phone: phone,
      role: "member", // 기본적으로 승인된 일반 성도
      district: district,
      age: age,
      gender: gender,
      avatar: name[0],
      registerDate: `2026-06-${(i % 15) + 1}`,
      approvalDate: `2026-06-${(i % 15) + 2}`
    });

    // 임의의 진도 데이터 입력 (새가족반 c1 수강)
    if (i % 3 === 0) {
      db.progress.push({
        id: `prg_${i}`,
        userId: `u${i}`,
        courseId: "c1",
        completedLessons: "l1",
        submittedAssignments: "a1",
        lastAccessDate: "2026-06-23"
      });
      // 과제 제출 데이터 추가
      db.submissions.push({
        id: `sub_${i}`,
        assignmentId: "a1",
        lessonId: "l1",
        userId: `u${i}`,
        userName: name,
        content: "하나님을 사랑하고 성도를 귀히 여기는 파주목양교회의 비전에 동참하며, 주님 안에서 믿음직스러운 지체로 서 가길 기도합니다.",
        date: `2026-06-22 19:${10 + (i % 45)}`,
        feedback: i % 6 === 0 ? "아름다운 결단이 담긴 소감문입니다! 축복합니다." : null,
        feedbackAuthor: i % 6 === 0 ? "박교사" : null
      });
    } else if (i % 3 === 1) {
      // 100% 수료자
      db.progress.push({
        id: `prg_${i}`,
        userId: `u${i}`,
        courseId: "c1",
        completedLessons: "l1,l2,l3,l4",
        submittedAssignments: "a1,a2",
        lastAccessDate: "2026-06-20"
      });
    }
  }
}

// 3. 상태 관리자 클래스 (MokyangState)
class MokyangState {
  constructor() {
    this.db = this.loadDB();
    this.currentUser = this.loadCurrentUser() || this.db.users[0]; // 기본 관리자로 세팅해서 모든 메뉴 볼 수 있게 함
    this.activePage = "home";
    this.adminActiveTab = "approval"; // 관리자 대시보드 기본 서브탭
    this.biblestudySelectedCourseId = null; // 선택된 강좌
    this.biblestudySelectedLessonId = null; // 선택된 강의
  }

  loadDB() {
    const localData = localStorage.getItem("mokyang_edu_db");
    if (!localData) {
      const db = JSON.parse(JSON.stringify(INITIAL_DB));
      populateMockUsers(db);
      localStorage.setItem("mokyang_edu_db", JSON.stringify(db));
      return db;
    }
    return JSON.parse(localData);
  }

  saveDB() {
    localStorage.setItem("mokyang_edu_db", JSON.stringify(this.db));
  }

  loadCurrentUser() {
    const userJson = localStorage.getItem("mokyang_edu_current_user");
    if (!userJson) return null;
    const userObj = JSON.parse(userJson);
    return this.db.users.find(u => u.id === userObj.id) || userObj;
  }

  setCurrentUserByRole(role) {
    // 해당 역할을 가진 대표 사용자를 찾아 로그인 상태로 만듬
    const user = this.db.users.find(u => u.role === role);
    if (user) {
      this.currentUser = user;
      localStorage.setItem("mokyang_edu_current_user", JSON.stringify(user));
      
      // 상단 헤더 권한 뱃지 업데이트
      const roleText = { pending: "가입대기", member: "성도", leader: "교사", admin: "관리자" };
      document.getElementById("header-role-badge").textContent = roleText[role] || "성도";
      
      // 페이지 다시 렌더링
      this.renderCurrentPage();
    }
  }

  renderCurrentPage() {
    renderPage(this.activePage);
  }
}

const state = new MokyangState();

// 4. 앱 초기화 (initApp)
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setupRoleSwitcher();
  setupTextScaler();
  setupNavigation();
  setupModalEvents();
  
  // 디폴트 권한 'member' (일반성도)로 변경하여 테스트 준비
  state.setCurrentUserByRole("member");
  
  // 첫 화면 렌더링 (홈)
  state.activePage = "home";
  state.renderCurrentPage();
}

// 가. 개발용 권한 변경기 토글 및 버튼 바인딩
function setupRoleSwitcher() {
  const toggleBtn = document.getElementById("btn-toggle-switcher");
  const options = document.getElementById("switcher-options");
  
  toggleBtn.addEventListener("click", () => {
    options.classList.toggle("open");
    toggleBtn.querySelector(".toggle-icon").textContent = options.classList.contains("open") ? "▲" : "▼";
  });

  const roleBtns = document.querySelectorAll(".role-btn");
  roleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      roleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const role = btn.dataset.role;
      state.setCurrentUserByRole(role);
      showToast(`${btn.textContent.substring(3)} 권한으로 로그인했습니다.`);
    });
  });
}

// 나. 큰 글씨 모드 제어
function setupTextScaler() {
  const btn = document.getElementById("btn-text-scale");
  
  // 기존 설정 로드
  const isLarge = localStorage.getItem("mokyang_large_text") === "true";
  if (isLarge) {
    document.body.classList.add("large-text");
    btn.innerHTML = `<span>가<sup>-</sup></span> 일반글씨`;
  }

  btn.addEventListener("click", () => {
    const active = document.body.classList.toggle("large-text");
    localStorage.setItem("mokyang_large_text", active);
    
    if (active) {
      btn.innerHTML = `<span>가<sup>-</sup></span> 일반글씨`;
      showToast("큰 글씨 모드를 활성화했습니다.");
    } else {
      btn.innerHTML = `<span>가<sup>+</sup></span> 큰글씨`;
      showToast("일반 글씨 크기로 돌아갑니다.");
    }
    // 레이아웃 보정을 위해 재렌더링
    state.renderCurrentPage();
  });
}

// 다. 하단 네비게이션 및 페이지 이동 처리
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page;
      
      // 승인 대기자 권한일 경우 'profile' 탭을 제외하고는 콘텐츠 접근 전면 차단
      if (state.currentUser.role === "pending" && page !== "profile" && page !== "home") {
        showToast("관리자 승인 후 접근할 수 있습니다.", "danger");
        return;
      }
      
      navItems.forEach(nav => nav.classList.remove("active"));
      item.classList.add("active");
      
      state.activePage = page;
      // 강좌 상세/강의 조회 상태 초기화
      state.biblestudySelectedCourseId = null;
      state.biblestudySelectedLessonId = null;
      
      state.renderCurrentPage();
    });
  });
}

// 라. 전역 모달 제어
function setupModalEvents() {
  const modal = document.getElementById("general-modal");
  const closeBtn = document.getElementById("btn-close-modal");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  
  const closeModalFunc = () => {
    modal.classList.remove("open");
  };
  
  closeBtn.addEventListener("click", closeModalFunc);
  cancelBtn.addEventListener("click", closeModalFunc);
  
  // 외부 터치 시 닫기
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
}

function openModal(title, bodyHtml, onConfirm, confirmText = "확인") {
  const modal = document.getElementById("general-modal");
  const titleEl = document.getElementById("modal-title");
  const bodyEl = document.getElementById("modal-body");
  const confirmBtn = document.getElementById("modal-confirm-btn");
  
  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHtml;
  confirmBtn.textContent = confirmText;
  
  // 기존 이벤트 리스너 제거
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  
  newConfirmBtn.addEventListener("click", () => {
    if (onConfirm()) {
      modal.classList.remove("open");
    }
  });
  
  modal.classList.add("open");
}

// 마. 토스트 메시지 알림 발생기
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast`;
  if (type === "danger") {
    toast.style.borderLeftColor = "var(--danger-color)";
  } else if (type === "info") {
    toast.style.borderLeftColor = "var(--primary-light)";
  }
  
  toast.innerHTML = `
    <span>${type === "danger" ? "⚠️" : (type === "info" ? "ℹ️" : "✨")}</span>
    <div>${message}</div>
  `;
  
  container.appendChild(toast);
  
  // 브라우저 렌더 큐 반사 후 애니메이션 트리거
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);
  
  // 3초 후 제거
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// 5. 템플릿 렌더링 엔진 (Router & Views)
function renderPage(page) {
  const contentArea = document.getElementById("dynamic-content");
  
  // 회원 승인 대기자 권한이고 홈이나 프로필 탭이 아닌 다른 경로일 경우 차단
  if (state.currentUser.role === "pending" && page !== "profile") {
    contentArea.innerHTML = renderPendingScreen();
    return;
  }
  
  contentArea.innerHTML = "";
  
  // 페이지별 함수 호출
  let html = "";
  switch(page) {
    case "home":
      html = renderHome();
      break;
    case "devotion":
      html = renderDevotion();
      break;
    case "biblestudy":
      html = renderBibleStudy();
      break;
    case "sermon":
      html = renderSermon();
      break;
    case "profile":
      html = renderProfile();
      break;
    default:
      html = `<div class="card"><p>페이지를 찾을 수 없습니다.</p></div>`;
  }
  
  contentArea.innerHTML = `<div class="fade-in">${html}</div>`;
  
  // 렌더링 후 이벤트 리스너 바인딩
  bindPageEvents(page);
}

// 6. 가입 대기자 안내 화면 템플릿
function renderPendingScreen() {
  return `
    <div class="approval-waiting-screen fade-in">
      <div class="waiting-icon">⛪</div>
      <h2 class="waiting-title">관리자 승인 대기 중</h2>
      <p class="waiting-desc">
        파주목양교회 <strong>목양양육앱</strong>에 가입을 진심으로 환영합니다!<br>
        교회 성도 확인 절차가 진행 중입니다. 관리자의 승인이 완료되면 성경공부 및 말씀 묵상 등 모든 콘텐츠를 이용하실 수 있습니다.
      </p>
      <div class="card" style="width: 100%; border-top: 3px solid var(--accent-gold);">
        <p style="font-size: var(--font-sm); font-weight: 700; color: var(--primary-dark); margin-bottom: 8px;">내 가입 신청 정보</p>
        <p style="font-size: var(--font-md); margin-bottom: 4px;"><strong>이름:</strong> ${state.currentUser.name}</p>
        <p style="font-size: var(--font-md); margin-bottom: 4px;"><strong>연락처:</strong> ${state.currentUser.phone}</p>
        <p style="font-size: var(--font-md); margin-bottom: 4px;"><strong>소속 교구:</strong> ${state.currentUser.district}</p>
        <p style="font-size: var(--font-xs); color: var(--text-muted); margin-top: 10px;">신청일: ${state.currentUser.registerDate}</p>
      </div>
      <button class="btn btn-outline" onclick="state.setCurrentUserByRole('member'); showToast('테스트를 위해 일반 성도로 강제 로그인합니다.')" style="margin-top: 20px;">
        빠른 테스트용 승인 계정으로 전환하기
      </button>
    </div>
  `;
}

// 7. 홈 화면 렌더러
function renderHome() {
  // 오늘 공지사항 로드
  const notices = state.db.notices;
  const recentNotice = notices.length > 0 ? notices[notices.length - 1] : { title: "등록된 공지사항이 없습니다.", date: "" };

  // 말씀 묵상 로드
  const devotions = state.db.devotions;
  const todayDevotion = devotions[0] || { scripture: "시편 1:1-6", title: "말씀을 묵상하십시오.", content: "오늘의 말씀이 없습니다." };

  // 설교영상 로드
  const videos = state.db.videos;
  const latestSermon = videos[0] || { title: "주일 설교 영상 준비 중", speaker: "이목사", date: "" };

  // 성경공부 수강 내역
  let continueStudyHtml = "";
  const myProgress = state.db.progress.filter(p => p.userId === state.currentUser.id);
  
  if (myProgress.length > 0) {
    const prg = myProgress[0];
    const course = state.db.courses.find(c => c.id === prg.courseId);
    if (course) {
      const completedIds = prg.completedLessons ? prg.completedLessons.split(",") : [];
      const lessons = state.db.lessons.filter(l => l.courseId === course.id);
      const totalLessons = lessons.length;
      const progressPercent = totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0;
      
      continueStudyHtml = `
        <div class="card" id="home-continue-card" data-course-id="${course.id}" style="border-left: 4px solid var(--primary-light);">
          <div class="card-title-row">
            <span class="card-tag">이어서 학습하기</span>
            <span style="font-size: var(--font-xs); color: var(--accent-gold-dark); font-weight: 800;">마지막 접속: ${prg.lastAccessDate}</span>
          </div>
          <h3 style="font-size: var(--font-md); font-weight: 800; color: var(--primary-dark); margin-bottom: 6px;">${course.title}</h3>
          <div class="progress-container">
            <div class="progress-text-row">
              <span>학습 진행률</span>
              <span>${progressPercent}% (${completedIds.length}/${totalLessons}강 완료)</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        </div>
      `;
    }
  } else {
    // 수강 이력이 없는 경우
    continueStudyHtml = `
      <div class="card" id="home-start-card" style="border-left: 4px solid var(--accent-gold); background-color: #FFFDF9;">
        <h3 style="font-size: var(--font-md); font-weight: 800; color: var(--primary-dark); margin-bottom: 6px;">📝 참여 중인 온라인 교육 과정이 없습니다.</h3>
        <p style="font-size: var(--font-sm); color: var(--text-muted); margin-bottom: 12px;">새가족반 등 온라인으로 신앙성장을 돕는 교육 과정을 시작해 보세요!</p>
        <button class="btn btn-primary btn-sm" id="btn-home-go-biblestudy">교육 과정 등록하기</button>
      </div>
    `;
  }

  return `
    <!-- 파주목양교회 인트로 환영 -->
    <div style="margin-bottom: 20px; text-align: center;">
      <h2 style="font-size: var(--font-xl); font-weight: 900; color: var(--primary-dark); margin-bottom: 2px;">반갑습니다, ${state.currentUser.name} 성도님</h2>
      <p style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 700;">오늘도 말씀과 배움으로 승리하는 하루 되세요!</p>
    </div>

    <!-- 1. 오늘의 말씀 카드 -->
    <div class="card" id="home-devotion-card" style="background: linear-gradient(135deg, #1A365D 0%, #0C2340 100%); color: #FFFFFF; border: none;">
      <div class="card-title-row" style="margin-bottom: 16px;">
        <span class="card-tag" style="background-color: var(--accent-gold); color: var(--primary-dark); border: none;">오늘의 말씀묵상</span>
        <span style="font-size: var(--font-xs); color: var(--accent-gold-light); font-weight: 700;">${todayDevotion.date}</span>
      </div>
      <h3 style="font-size: var(--font-lg); font-weight: 800; margin-bottom: 8px; color: var(--accent-gold-light);">${todayDevotion.title}</h3>
      <div class="bible-box" style="background-color: rgba(255, 255, 255, 0.1); border-left-color: var(--accent-gold); color: #FFFBF0; margin-bottom: 12px; font-size: var(--font-sm);">
        <span class="scripture-verse" style="color: var(--accent-gold-light); font-size: var(--font-sm);">${todayDevotion.scripture}</span>
        ${todayDevotion.content.substring(0, 100)}...
      </div>
      <p style="font-size: var(--font-xs); text-align: right; color: rgba(255, 255, 255, 0.7); font-weight: bold;">터치 시 묵상 쓰기로 이동 ➔</p>
    </div>

    <!-- 2. 이어서 학습하기 -->
    ${continueStudyHtml}

    <!-- 3. 이번 주 설교영상 -->
    <div class="card" id="home-sermon-card">
      <div class="card-title-row">
        <span class="card-tag">최신 설교영상</span>
        <span style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 700;">${latestSermon.date}</span>
      </div>
      <h3 style="font-size: var(--font-md); font-weight: 800; color: var(--primary-dark); margin-bottom: 6px;">${latestSermon.title}</h3>
      <p style="font-size: var(--font-sm); color: var(--text-muted); margin-bottom: 10px;">설교자: ${latestSermon.speaker} 목사 | 본문: ${latestSermon.scripture || "본문 참조"}</p>
      <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: var(--radius-sm); overflow: hidden; background-color: #000;">
        <iframe src="${latestSermon.youtubeUrl}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:0;" allowfullscreen></iframe>
      </div>
    </div>

    <!-- 4. 공지사항 -->
    <div class="card" style="border-top: 3px solid var(--accent-gold);">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 10px;">📢 교회 공지사항</h3>
      <div style="background-color: #F7FAFC; padding: 12px; border-radius: var(--radius-sm);">
        <p style="font-size: var(--font-sm); font-weight: 800; color: var(--primary-dark); margin-bottom: 4px;">${recentNotice.title}</p>
        <p style="font-size: var(--font-xs); color: var(--text-muted);">${recentNotice.content || ""}</p>
        <p style="font-size: 10px; color: var(--text-muted); text-align: right; margin-top: 8px;">작성일: ${recentNotice.date}</p>
      </div>
    </div>
  `;
}

// 8. 말씀묵상 화면 렌더러
function renderDevotion() {
  const today = "2026-06-23";
  const devotions = state.db.devotions;
  
  // 날짜별 선택 기능 구현을 위한 묵상 로드
  const todayDevotion = devotions.find(d => d.date === today) || devotions[0];
  
  // 현재 로그인한 성도의 묵상 작성 내역 조회
  const myResponse = state.db.devotion_responses.find(r => r.devotionId === todayDevotion.id && r.userId === state.currentUser.id);

  let formOrResultHtml = "";
  
  if (myResponse) {
    // 오늘 묵상을 이미 제출한 경우
    formOrResultHtml = `
      <div class="card" style="background-color: #F0FDF4; border: 1.5px solid rgba(47, 133, 90, 0.3);">
        <div style="display: flex; align-items: center; gap: 8px; color: var(--success-color); font-weight: 800; font-size: var(--font-md); margin-bottom: 12px;">
          <span>✅</span> 오늘 말씀 묵상 제출 완료!
        </div>
        
        <div style="margin-bottom: 10px;">
          <p style="font-size: var(--font-sm); font-weight: 700; color: var(--primary-dark);">1. 오늘 받은 은혜</p>
          <p style="font-size: var(--font-md); color: #2D3748; padding: 6px 0;">${myResponse.response1}</p>
        </div>
        <div style="margin-bottom: 10px;">
          <p style="font-size: var(--font-sm); font-weight: 700; color: var(--primary-dark);">2. 삶의 적용</p>
          <p style="font-size: var(--font-md); color: #2D3748; padding: 6px 0;">${myResponse.response2}</p>
        </div>
        <div style="margin-bottom: 10px;">
          <p style="font-size: var(--font-sm); font-weight: 700; color: var(--primary-dark);">3. 나의 기도제목</p>
          <p style="font-size: var(--font-md); color: #2D3748; padding: 6px 0;">${myResponse.prayerRequest || "없음"}</p>
        </div>
        <p style="font-size: var(--font-xs); color: var(--text-muted); text-align: right; margin-top: 10px;">제출 시간: ${myResponse.date}</p>
      </div>
    `;
  } else {
    // 묵상을 아직 작성하지 않은 경우
    formOrResultHtml = `
      <div class="card" style="border-top: 3px solid var(--accent-gold);">
        <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 14px;">✍️ 묵상 내용 기록하기</h3>
        
        <div class="form-group">
          <label class="form-label" style="font-size: var(--font-sm);">${todayDevotion.question1}</label>
          <textarea class="textarea-nurture" id="devotion-res-1" placeholder="오늘 말씀에서 찾은 핵심 교훈이나 깊은 은혜를 적어주세요."></textarea>
        </div>

        <div class="form-group">
          <label class="form-label" style="font-size: var(--font-sm);">${todayDevotion.question2}</label>
          <textarea class="textarea-nurture" id="devotion-res-2" placeholder="이 말씀을 오늘 나의 삶, 가정, 일터에 어떻게 적용할 것인지 실천 사항을 작성해 보세요."></textarea>
        </div>

        <div class="form-group">
          <label class="form-label" style="font-size: var(--font-sm);">함께 나눌 기도제목 (선택)</label>
          <textarea class="textarea-nurture" id="devotion-res-3" style="height: 60px;" placeholder="오늘 말씀을 바탕으로 목장 식구 및 교회와 나누고 싶은 기도제목을 적어주세요."></textarea>
        </div>

        <button class="btn btn-accent" id="btn-submit-devotion">오늘 묵상 제출하기</button>
      </div>
    `;
  }

  // 다른 성도들의 묵상 글 목록 (일반성도/교사/관리자 피드백 확인용)
  const otherResponses = state.db.devotion_responses.filter(r => r.devotionId === todayDevotion.id && r.userId !== state.currentUser.id);
  let otherResponsesHtml = "";
  
  if (otherResponses.length > 0) {
    otherResponsesHtml = `
      <div style="margin-top: 24px;">
        <h3 class="section-title" style="font-size: var(--font-md);">📖 성도들의 나눔 목록</h3>
        ${otherResponses.map(res => `
          <div class="card" style="padding: 14px; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-weight: 800; color: var(--primary-dark); font-size: var(--font-md);">${res.userName} 성도</span>
              <span style="font-size: 10px; color: var(--text-muted);">${res.date.split(" ")[1]} 제출</span>
            </div>
            <p style="font-size: var(--font-sm); color: var(--text-main); line-height: 1.5; margin-bottom: 6px;">
              <strong>은혜:</strong> ${res.response1}
            </p>
            <p style="font-size: var(--font-sm); color: var(--text-main); line-height: 1.5;">
              <strong>적용:</strong> ${res.response2}
            </p>
            ${res.prayerRequest ? `
              <p style="font-size: var(--font-xs); color: var(--accent-gold-dark); background-color: #FAF5EB; padding: 6px; border-radius: 4px; margin-top: 6px;">
                🙏 <strong>기도제목:</strong> ${res.prayerRequest}
              </p>
            ` : ""}
          </div>
        `).join("")}
      </div>
    `;
  }

  return `
    <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
      <h2 style="font-size: var(--font-xl); font-weight: 900; color: var(--primary-dark);">말씀묵상 (QT)</h2>
      <span style="font-size: var(--font-sm); font-weight: 800; color: var(--accent-gold-dark);">${todayDevotion.date}</span>
    </div>

    <!-- 말씀 본문 카드 -->
    <div class="card" style="border-top: 4px solid var(--primary-dark); background-color: #FAF8F5;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3 style="font-size: var(--font-lg); font-weight: 900; color: var(--primary-dark);">${todayDevotion.title}</h3>
        <span class="card-tag" style="background-color: var(--primary-dark); color: #FFF; border: none; font-size: var(--font-xs);">${todayDevotion.scripture}</span>
      </div>
      
      <div class="bible-box" style="background-color: #FFF; border-left: 4px solid var(--accent-gold); font-size: var(--font-md); margin-bottom: 14px;">
        ${todayDevotion.content}
      </div>

      <div style="background-color: #FFFDF9; border: 1px solid rgba(197, 160, 89, 0.2); padding: 14px; border-radius: var(--radius-sm);">
        <p style="font-size: var(--font-sm); font-weight: 800; color: var(--accent-gold-dark); margin-bottom: 4px;">🕊️ 오늘의 기도</p>
        <p style="font-size: var(--font-md); line-height: 1.6; font-style: italic; color: #555;">"${todayDevotion.prayer}"</p>
      </div>
    </div>

    <!-- 성도 입력 폼 또는 결과 -->
    ${formOrResultHtml}

    <!-- 타인 묵상 나눔 리스트 -->
    ${otherResponsesHtml}
  `;
}

// 9. 성경공부 화면 렌더러 (강좌 선택 분기 포함)
function renderBibleStudy() {
  if (state.biblestudySelectedCourseId) {
    if (state.biblestudySelectedLessonId) {
      return renderLessonDetail();
    }
    return renderCourseDetail();
  }

  // 가. 강좌 목록 리스트 렌더링
  const courses = state.db.courses;
  
  return `
    <div style="margin-bottom: 16px;">
      <h2 style="font-size: var(--font-xl); font-weight: 900; color: var(--primary-dark); margin-bottom: 4px;">온라인 성경공부</h2>
      <p style="font-size: var(--font-sm); color: var(--text-muted); font-weight: 700;">말씀의 깊이를 더해가는 파주목양교회 배움터</p>
    </div>

    ${courses.map(course => {
      // 강좌별 학습 진도율 계산
      const lessons = state.db.lessons.filter(l => l.courseId === course.id);
      const totalLessons = lessons.length;
      const myPrg = state.db.progress.find(p => p.userId === state.currentUser.id && p.courseId === course.id);
      const completedIds = myPrg && myPrg.completedLessons ? myPrg.completedLessons.split(",") : [];
      const progressPercent = totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0;
      
      return `
        <div class="card" class="course-card-wrapper" data-id="${course.id}" style="cursor: pointer;">
          <div class="course-card">
            <div class="course-thumb">${course.thumbnail}</div>
            <div class="course-info">
              <h3 class="course-title">${course.title}</h3>
              <p class="course-desc">${course.intro}</p>
              <div class="course-meta">${course.duration} | 총 ${totalLessons}강</div>
            </div>
          </div>
          <div class="progress-container">
            <div class="progress-text-row">
              <span>나의 진도율</span>
              <span>${progressPercent}% (${completedIds.length}/${totalLessons}강 완료)</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        </div>
      `;
    }).join("")}
  `;
}

// 10. 성경공부 강좌 상세 렌더러
function renderCourseDetail() {
  const course = state.db.courses.find(c => c.id === state.biblestudySelectedCourseId);
  const lessons = state.db.lessons.filter(l => l.courseId === course.id);
  const myPrg = state.db.progress.find(p => p.userId === state.currentUser.id && p.courseId === course.id);
  const completedIds = myPrg && myPrg.completedLessons ? myPrg.completedLessons.split(",") : [];
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0;

  return `
    <div style="margin-bottom: 16px;">
      <button class="btn btn-outline btn-sm" id="btn-back-to-courses" style="width: auto; margin-bottom: 12px;">← 강좌 목록으로</button>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 32px;">${course.thumbnail}</span>
        <h2 style="font-size: var(--font-xl); font-weight: 900; color: var(--primary-dark);">${course.title}</h2>
      </div>
      <p style="font-size: var(--font-md); color: var(--text-muted); margin-top: 8px;">${course.intro}</p>
    </div>

    <!-- 과정 종합 진도 -->
    <div class="card" style="background-color: #FFFDF9; border-top: 3px solid var(--accent-gold);">
      <div class="progress-container" style="margin-top: 0;">
        <div class="progress-text-row">
          <span style="color: var(--primary-dark); font-weight: 800;">내 학습 진행률</span>
          <span style="color: var(--accent-gold-dark); font-weight: 800;">${progressPercent}% (${completedIds.length}/${totalLessons}강)</span>
        </div>
        <div class="progress-bar-bg" style="height: 10px;">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>
    </div>

    <!-- 강의 목록 -->
    <div>
      <h3 class="section-title" style="font-size: var(--font-md);">📖 강의 커리큘럼</h3>
      ${lessons.length === 0 ? `
        <div class="card" style="text-align: center; color: var(--text-muted);">
          현재 개설된 강의가 없습니다. 관리자에게 문의해 주세요.
        </div>
      ` : lessons.map(lesson => {
        const isCompleted = completedIds.includes(lesson.id);
        return `
          <div class="lesson-list-item ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}">
            <div class="lesson-item-title">
              <span class="completed-check-icon">${isCompleted ? '✓' : '•'}</span>
              <span>${lesson.title}</span>
            </div>
            <span style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 700;">
              ${isCompleted ? '<span style="color: var(--success-color); font-weight: bold;">학습완료</span>' : '학습하기 ➔'}
            </span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// 11. 성경공부 개별 강의 상세 렌더러
function renderLessonDetail() {
  const course = state.db.courses.find(c => c.id === state.biblestudySelectedCourseId);
  const lesson = state.db.lessons.find(l => l.id === state.biblestudySelectedLessonId);
  
  // 강의 완료 여부 확인
  const myPrg = state.db.progress.find(p => p.userId === state.currentUser.id && p.courseId === course.id);
  const completedIds = myPrg && myPrg.completedLessons ? myPrg.completedLessons.split(",") : [];
  const isCompleted = completedIds.includes(lesson.id);

  // 과제 제출 여부 확인
  const assignment = state.db.assignments.find(a => a.lessonId === lesson.id);
  const mySubmission = assignment ? state.db.submissions.find(s => s.assignmentId === assignment.id && s.userId === state.currentUser.id) : null;

  let videoHtml = "";
  if (lesson.videoUrl) {
    videoHtml = `
      <div class="video-wrapper">
        <iframe src="${lesson.videoUrl}" allowfullscreen></iframe>
      </div>
    `;
  } else {
    videoHtml = `
      <div class="video-wrapper">
        <div class="video-placeholder">
          <div class="play-btn-circle">🎬</div>
          <p style="font-weight: 800; font-size: var(--font-md);">온라인 강의 영상 준비 중</p>
          <p style="font-size: var(--font-xs); color: #CBD5E0;">오프라인 강의 또는 교재 중심 학습입니다.</p>
        </div>
      </div>
    `;
  }

  let assignmentHtml = "";
  if (assignment) {
    if (mySubmission) {
      assignmentHtml = `
        <div class="card" style="background-color: #F0FDF4; border: 1.5px solid rgba(47, 133, 90, 0.3);">
          <h4 style="font-size: var(--font-sm); color: var(--success-color); font-weight: 800; margin-bottom: 8px;">📝 제출 완료된 과제</h4>
          <p style="font-size: var(--font-md); background: #FFF; padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); color: var(--text-main);">${mySubmission.content}</p>
          <p style="font-size: 10px; color: var(--text-muted); text-align: right; margin-top: 6px;">제출일자: ${mySubmission.date}</p>
          
          ${mySubmission.feedback ? `
            <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed rgba(47, 133, 90, 0.4);">
              <p style="font-size: var(--font-xs); font-weight: 800; color: var(--accent-gold-dark);">💬 교사의 피드백 (${mySubmission.feedbackAuthor}):</p>
              <p style="font-size: var(--font-md); font-style: italic; color: #333; margin-top: 4px;">"${mySubmission.feedback}"</p>
            </div>
          ` : `
            <p style="font-size: var(--font-xs); color: var(--text-muted); margin-top: 8px;">교사의 확인 피드백 대기 중입니다.</p>
          `}
        </div>
      `;
    } else {
      assignmentHtml = `
        <div class="card" style="border-top: 3px solid var(--accent-gold);">
          <h4 style="font-size: var(--font-md); color: var(--primary-dark); font-weight: 800; margin-bottom: 4px;">✍️ 강의 과제 제출</h4>
          <p style="font-size: var(--font-sm); color: var(--accent-gold-dark); font-weight: 700; margin-bottom: 8px;">과제 내용: ${assignment.description}</p>
          
          <div class="form-group">
            <textarea class="textarea-nurture" id="lesson-assignment-textarea" style="height: 120px;" placeholder="강의의 과제 제출 답안을 성실히 적어주세요."></textarea>
          </div>
          <button class="btn btn-accent btn-sm" id="btn-submit-assignment">과제 제출하기</button>
        </div>
      `;
    }
  }

  return `
    <div style="margin-bottom: 14px;">
      <button class="btn btn-outline btn-sm" id="btn-back-to-course" style="width: auto; margin-bottom: 10px;">← 강좌 정보로</button>
      <span style="font-size: var(--font-xs); color: var(--accent-gold-dark); font-weight: 800; display: block; margin-bottom: 2px;">${course.title}</span>
      <h2 style="font-size: var(--font-xl); font-weight: 900; color: var(--primary-dark);">${lesson.title}</h2>
    </div>

    <!-- 1. 강의 비디오 -->
    ${videoHtml}

    <!-- 2. 강의 완료 체크 박스 -->
    <div class="card" style="background-color: ${isCompleted ? '#F0FDF4' : '#FFFDF9'}; border: 1.5px solid ${isCompleted ? 'rgba(47, 133, 90, 0.3)' : 'var(--accent-gold-light)'}; text-align: center; padding: 16px;">
      <p style="font-size: var(--font-md); font-weight: 800; margin-bottom: 10px;">
        ${isCompleted ? '🌟 본 강의 시청 및 학습을 완료했습니다!' : '이 강의를 끝까지 시청하셨나요?'}
      </p>
      <button class="btn ${isCompleted ? 'btn-success' : 'btn-accent'}" id="btn-toggle-lesson-complete" style="width: 80%; margin: 0 auto;">
        ${isCompleted ? '학습 완료 취소하기' : '학습 완료 체크하기 ✓'}
      </button>
    </div>

    <!-- 3. 핵심 요약 / 강의안 -->
    <div class="card">
      <h3 class="section-title" style="font-size: var(--font-md);">📖 강의안 및 핵심 요약</h3>
      <p style="font-size: var(--font-md); color: var(--text-main); margin-bottom: 12px; line-height: 1.7;">
        ${lesson.handouts}
      </p>
      <div style="background-color: #F7FAFC; padding: 12px; border-radius: var(--radius-sm);">
        <p style="font-size: var(--font-sm); font-weight: 800; color: var(--primary-dark); margin-bottom: 4px;">📌 핵심 요약 정리</p>
        <p style="font-size: var(--font-md); color: #4A5568;">${lesson.summary}</p>
      </div>
    </div>

    <!-- 4. 나눔 질문 -->
    <div class="card" style="border-left: 4px solid var(--primary-light);">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md);">💬 함께 나누어볼 질문</h3>
      <p style="font-size: var(--font-md); color: #2D3748; line-height: 1.6;">
        ${lesson.sharingQuestion}
      </p>
    </div>

    <!-- 5. 과제 양식 -->
    ${assignmentHtml}
  `;
}

// 12. 설교영상 화면 렌더러
function renderSermon() {
  const videos = state.db.videos;
  
  return `
    <div style="margin-bottom: 16px;">
      <h2 style="font-size: var(--font-xl); font-weight: 900; color: var(--primary-dark); margin-bottom: 4px;">설교영상 및 묵상</h2>
      <p style="font-size: var(--font-sm); color: var(--text-muted); font-weight: 700;">파주목양교회 주일 강단 선포 말씀 다시보기</p>
    </div>

    ${videos.map(video => `
      <div class="card" style="padding: 16px; margin-bottom: 16px;">
        <div class="card-title-row">
          <span class="card-tag">주일 설교</span>
          <span style="font-size: var(--font-xs); color: var(--text-muted); font-weight: 700;">${video.date}</span>
        </div>
        <h3 style="font-size: var(--font-md); font-weight: 900; color: var(--primary-dark); margin-bottom: 6px;">${video.title}</h3>
        <p style="font-size: var(--font-sm); color: var(--text-muted); margin-bottom: 10px;">설교자: ${video.speaker} 목사 | 본문: ${video.scripture || "본문 참조"}</p>
        
        <!-- 유튜브 동영상 플레이어 -->
        <div class="video-wrapper" style="margin-bottom: 14px;">
          <iframe src="${video.youtubeUrl}" allowfullscreen></iframe>
        </div>

        <!-- 요약 설명 -->
        <div style="background-color: #F7FAFC; padding: 12px; border-radius: var(--radius-sm); margin-bottom: 12px;">
          <p style="font-size: var(--font-xs); font-weight: 800; color: var(--primary-dark); margin-bottom: 2px;">📝 설교 요약</p>
          <p style="font-size: var(--font-md); line-height: 1.5; color: #4A5568;">${video.summary}</p>
        </div>

        <!-- 묵상 질문 -->
        <div class="question-box" style="margin-bottom: 0;">
          <div class="question-title">💭 말씀 묵상 및 삶에의 적용 질문</div>
          <div class="question-content" style="font-size: var(--font-md);">${video.devotionQuestion}</div>
        </div>
      </div>
    `).join("")}
  `;
}

// 13. 내 정보 (Profile & Dashboards) 렌더러
function renderProfile() {
  let roleTitle = "";
  if (state.currentUser.role === "admin") roleTitle = "관리자 (담임목사)";
  else if (state.currentUser.role === "leader") roleTitle = "리더 / 교사";
  else if (state.currentUser.role === "member") roleTitle = "일반 성도";
  else roleTitle = "승인 대기자";

  let dashboardHtml = "";

  if (state.currentUser.role === "admin") {
    dashboardHtml = renderAdminDashboard();
  } else if (state.currentUser.role === "leader") {
    dashboardHtml = renderLeaderDashboard();
  } else {
    dashboardHtml = renderStudentDashboard();
  }

  return `
    <div style="margin-bottom: 16px;">
      <h2 style="font-size: var(--font-xl); font-weight: 900; color: var(--primary-dark);">내 정보 및 관리자 패널</h2>
    </div>

    <!-- 프로필 간략 카드 -->
    <div class="card" style="background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-light) 100%); color: #FFF; border: none;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background-color: var(--accent-gold); color: var(--primary-dark); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 900;">
          ${state.currentUser.avatar}
        </div>
        <div>
          <h3 style="font-size: var(--font-lg); font-weight: 800; color: var(--accent-gold-light);">${state.currentUser.name} 성도</h3>
          <p style="font-size: var(--font-sm); opacity: 0.9; margin-top: 2px;">직분/권한: ${roleTitle}</p>
          <p style="font-size: var(--font-xs); opacity: 0.7;">소속: ${state.currentUser.district || "기타"} | 연령대: ${state.currentUser.age || "비공개"}세</p>
        </div>
      </div>
    </div>

    <!-- 동적 대시보드 출력 -->
    ${dashboardHtml}
  `;
}

// 14. 학생용 대시보드 렌더러
function renderStudentDashboard() {
  const myProgress = state.db.progress.filter(p => p.userId === state.currentUser.id);
  const mySubmissions = state.db.submissions.filter(s => s.userId === state.currentUser.id);

  let courseListHtml = "";
  if (myProgress.length > 0) {
    courseListHtml = myProgress.map(prg => {
      const course = state.db.courses.find(c => c.id === prg.courseId);
      if (!course) return "";
      const lessons = state.db.lessons.filter(l => l.courseId === course.id);
      const completedList = prg.completedLessons ? prg.completedLessons.split(",") : [];
      const pct = lessons.length > 0 ? Math.round((completedList.length / lessons.length) * 100) : 0;
      
      return `
        <div style="padding: 10px 0; border-bottom: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; font-size: var(--font-md); font-weight: 800; color: var(--primary-dark); margin-bottom: 4px;">
            <span>${course.title}</span>
            <span style="color: var(--accent-gold-dark);">${pct}% (${completedList.length}/${lessons.length}강)</span>
          </div>
          <div class="progress-bar-bg" style="margin-top: 2px;">
            <div class="progress-bar-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join("");
  } else {
    courseListHtml = `<p style="font-size: var(--font-sm); color: var(--text-muted); text-align: center; padding: 10px 0;">현재 수강 중인 성경공부 과정이 없습니다.</p>`;
  }

  return `
    <div class="card" style="border-top: 3px solid var(--primary-light);">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 12px;">📈 학습 진도 현황</h3>
      
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-val">${myProgress.length}</div>
          <div class="stat-lbl">참여 과정 수</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">${mySubmissions.length}</div>
          <div class="stat-lbl">과제 제출 수</div>
        </div>
      </div>

      <div style="margin-top: 14px;">
        <p style="font-size: var(--font-sm); font-weight: 700; color: var(--primary-dark); margin-bottom: 8px;">수강 과정별 진행 상황</p>
        ${courseListHtml}
      </div>
    </div>

    <!-- 최근 제출한 과제 리스트 -->
    <div class="card">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 10px;">📝 최근 제출한 과제 목록</h3>
      ${mySubmissions.length === 0 ? `
        <p style="font-size: var(--font-sm); color: var(--text-muted); text-align: center;">제출한 과제가 없습니다.</p>
      ` : mySubmissions.map(sub => {
        const lesson = state.db.lessons.find(l => l.id === sub.lessonId);
        return `
          <div style="padding: 10px 0; border-bottom: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-weight: 800; font-size: var(--font-sm); color: var(--primary-dark);">${lesson ? lesson.title : "과제"}</span>
              <span style="font-size: 10px; color: var(--text-muted);">${sub.date}</span>
            </div>
            <p style="font-size: var(--font-sm); color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${sub.content}</p>
            ${sub.feedback ? `
              <p style="font-size: var(--font-xs); color: var(--success-color); font-weight: bold; margin-top: 4px;">💬 피드백 완료</p>
            ` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// 15. 리더/교사 대시보드 렌더러
function renderLeaderDashboard() {
  // 교사가 관리하는 반 성도 목록 (임의로 일부 성도 추출해서 보여줌)
  // u2 박교사는 '야당 1교구', u3 김리더는 '목동 2교구' 소속 성도를 관리하는 구조
  const myDistrict = state.currentUser.district;
  const myStudents = state.db.users.filter(u => u.district === myDistrict && u.role === "member");

  // 피드백 대기 과제 목록 추출
  const feedbackSubmissions = state.db.submissions.filter(s => {
    const userObj = state.db.users.find(u => u.id === s.userId);
    return userObj && userObj.district === myDistrict && s.feedback === null;
  });

  return `
    <!-- 교사 통계 요약 -->
    <div class="card" style="border-top: 3px solid var(--accent-gold);">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 12px;">👨‍🏫 교사/인도자 대시보드 (${myDistrict})</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-val">${myStudents.length}</div>
          <div class="stat-lbl">담당 반 성도 수</div>
        </div>
        <div class="stat-item">
          <div class="stat-val" style="color: var(--danger-color);">${feedbackSubmissions.length}</div>
          <div class="stat-lbl">피드백 대기 과제</div>
        </div>
      </div>
    </div>

    <!-- 피드백 대기 과제 리스트 -->
    <div class="card">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 12px;">📥 채점 및 피드백 대상 과제</h3>
      ${feedbackSubmissions.length === 0 ? `
        <p style="font-size: var(--font-sm); color: var(--success-color); text-align: center; font-weight: bold;">모든 과제 피드백을 완료했습니다! 👍</p>
      ` : feedbackSubmissions.map(sub => {
        const lesson = state.db.lessons.find(l => l.id === sub.lessonId);
        return `
          <div class="submission-feedback-card" data-sub-id="${sub.id}" style="padding: 12px; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); margin-bottom: 10px; background-color: #FAF8F5; cursor: pointer;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-weight: 800; font-size: var(--font-sm); color: var(--primary-dark);">${sub.userName} 성도</span>
              <span style="font-size: 10px; color: var(--text-muted);">${sub.date.split(" ")[0]}</span>
            </div>
            <p style="font-size: var(--font-xs); color: var(--accent-gold-dark); font-weight: 800; margin-bottom: 4px;">강의: ${lesson ? lesson.title : ""}</p>
            <p style="font-size: var(--font-sm); color: #4A5568; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              <strong>제출 답안:</strong> ${sub.content}
            </p>
            <p style="font-size: var(--font-xs); color: var(--primary-light); font-weight: bold; text-align: right; margin-top: 6px;">터치하여 피드백 작성 ➔</p>
          </div>
        `;
      }).join("")}
    </div>

    <!-- 담당 반 성도 전체 진도 확인 -->
    <div class="card">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 10px;">📋 담당 반 성도 진도율</h3>
      <div style="max-height: 250px; overflow-y: auto;">
        ${myStudents.length === 0 ? `
          <p style="font-size: var(--font-sm); color: var(--text-muted); text-align: center;">담당 성도가 없습니다.</p>
        ` : myStudents.map(student => {
          // 성경공부 c1(새가족반) 기준으로 임의의 진도 표기
          const prg = state.db.progress.find(p => p.userId === student.id && p.courseId === "c1");
          const completedCount = prg && prg.completedLessons ? prg.completedLessons.split(",").length : 0;
          const totalCount = state.db.lessons.filter(l => l.courseId === "c1").length;
          const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          
          return `
            <div class="list-item-dense" style="padding: 8px 0;">
              <div>
                <span style="font-weight: 800; font-size: var(--font-sm); color: var(--primary-dark);">${student.name}</span>
                <span style="font-size: 10px; color: var(--text-muted); margin-left: 6px;">나이: ${student.age}세 | 연락처: ${student.phone}</span>
              </div>
              <span style="font-size: var(--font-xs); font-weight: 800; color: var(--accent-gold-dark);">${pct}% (${completedCount}/${totalCount}강)</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

// 16. 관리자 웹 대시보드 렌더러
function renderAdminDashboard() {
  const pendingApprovals = state.db.approvals.filter(a => a.status === "pending");
  const allUsers = state.db.users;
  
  // 통계 계산
  const totalStudents = allUsers.filter(u => u.role === "member").length;
  const totalSubmissions = state.db.submissions.length;
  const totalCourses = state.db.courses.length;

  let activeTabHtml = "";
  
  if (state.adminActiveTab === "approval") {
    // 가입 승인 관리 탭
    activeTabHtml = `
      <div>
        <p style="font-size: var(--font-sm); font-weight: 800; color: var(--primary-dark); margin-bottom: 10px;">신규 회원 승인 대기 목록 (${pendingApprovals.length}건)</p>
        ${pendingApprovals.length === 0 ? `
          <div style="background-color: #F0FDF4; padding: 20px; border-radius: var(--radius-sm); text-align: center; color: var(--success-color); font-weight: bold; border: 1.5px solid rgba(47, 133, 90, 0.2);">
            가입 신청한 승인 대기자가 없습니다. 🎉
          </div>
        ` : pendingApprovals.map(app => {
          const userObj = state.db.users.find(u => u.id === app.userId) || {};
          return `
            <div class="card" style="padding: 14px; border: 1.5px solid var(--accent-gold-light); background-color: #FFFDF9; margin-bottom: 10px;">
              <div style="margin-bottom: 8px;">
                <span style="font-size: var(--font-md); font-weight: 800; color: var(--primary-dark);">${app.userName}</span>
                <span style="font-size: var(--font-xs); color: var(--text-muted); margin-left: 8px;">신청일자: ${app.requestDate}</span>
              </div>
              <div style="font-size: var(--font-sm); color: var(--text-muted); margin-bottom: 12px; line-height: 1.5;">
                전화번호: ${userObj.phone || ""}<br>
                이메일: ${userObj.email || ""}<br>
                교구소속: ${userObj.district || ""}<br>
                성별/나이: ${userObj.gender || ""}, ${userObj.age || ""}세
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-danger btn-sm btn-action-reject" data-app-id="${app.id}" style="padding: 8px 12px; font-weight: bold;">가입거절</button>
                <button class="btn btn-success btn-sm btn-action-approve" data-app-id="${app.id}" style="padding: 8px 12px; font-weight: bold;">가입승인</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  } else if (state.adminActiveTab === "roles") {
    // 권한 강제 관리 및 검색 탭
    activeTabHtml = `
      <div>
        <div class="search-container">
          <input type="text" class="search-input" id="admin-user-search" placeholder="회원 이름 또는 교구 검색...">
          <span class="search-icon">🔍</span>
        </div>
        
        <div id="admin-user-list-target" style="max-height: 350px; overflow-y: auto;">
          <!-- 렌더링될 회원 목록 -->
          ${renderAdminUserSearchList("")}
        </div>
      </div>
    `;
  } else if (state.adminActiveTab === "register") {
    // 콘텐츠 간편 등록 탭
    activeTabHtml = `
      <div class="card" style="border-top: 3px solid var(--accent-gold);">
        <h4 style="font-size: var(--font-md); font-weight: 800; color: var(--primary-dark); margin-bottom: 12px;">✍️ 말씀묵상(QT) 등록</h4>
        
        <div class="form-group">
          <label class="form-label">묵상 일자</label>
          <input type="date" class="form-input" id="reg-qt-date" value="2026-06-24">
        </div>
        <div class="form-group">
          <label class="form-label">본문 범위</label>
          <input type="text" class="form-input" id="reg-qt-scripture" placeholder="예: 마태복음 5:13-16">
        </div>
        <div class="form-group">
          <label class="form-label">묵상 제목</label>
          <input type="text" class="form-input" id="reg-qt-title" placeholder="예: 세상의 소금과 빛">
        </div>
        <div class="form-group">
          <label class="form-label">말씀 설명 / 내용</label>
          <textarea class="textarea-nurture" id="reg-qt-content" style="height: 80px;" placeholder="말씀의 주해 및 내용을 간략히 기록하세요."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">질문 1 (본문 이해)</label>
          <input type="text" class="form-input" id="reg-qt-q1" placeholder="예: 예수님께서 우리를 무엇이라고 칭하셨나요?">
        </div>
        <div class="form-group">
          <label class="form-label">질문 2 (삶의 적용)</label>
          <input type="text" class="form-input" id="reg-qt-q2" placeholder="예: 오늘 나의 삶 속에서 빛을 드러내기 위한 실천은?">
        </div>
        <div class="form-group">
          <label class="form-label">오늘의 기도문</label>
          <textarea class="textarea-nurture" id="reg-qt-prayer" style="height: 60px;" placeholder="함께 올릴 기도문"></textarea>
        </div>
        
        <button class="btn btn-primary" id="btn-admin-register-qt">새 말씀묵상 개설</button>
      </div>

      <div class="card" style="border-top: 3px solid var(--primary-light); margin-top: 20px;">
        <h4 style="font-size: var(--font-md); font-weight: 800; color: var(--primary-dark); margin-bottom: 12px;">🎬 성경공부 강의 추가</h4>
        <div class="form-group">
          <label class="form-label">대상 과정 선택</label>
          <select class="form-select" id="reg-lesson-course">
            ${state.db.courses.map(c => `<option value="${c.id}">${c.title}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">강의 제목</label>
          <input type="text" class="form-input" id="reg-lesson-title" placeholder="예: 5강. 기도하는 그리스도인">
        </div>
        <div class="form-group">
          <label class="form-label">강의 유튜브 링크 (선택)</label>
          <input type="text" class="form-input" id="reg-lesson-url" placeholder="예: https://www.youtube.com/embed/XXXXXX">
        </div>
        <div class="form-group">
          <label class="form-label">강의 요약</label>
          <textarea class="textarea-nurture" id="reg-lesson-summary" style="height: 80px;" placeholder="핵심 요약 정리 내용"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">나눔 질문</label>
          <input type="text" class="form-input" id="reg-lesson-sharing" placeholder="함께 나눌 핵심 토의 질문">
        </div>
        <div class="form-group">
          <label class="form-label">강의 과제 안내 (선택)</label>
          <input type="text" class="form-input" id="reg-lesson-assignment" placeholder="제출할 과제 안내문">
        </div>
        
        <button class="btn btn-primary" id="btn-admin-register-lesson">새 강의 등록</button>
      </div>
    `;
  } else if (state.adminActiveTab === "stats") {
    // 전체 학습 통계 탭
    // 통계 시각화 데이터 작성
    const courseStats = state.db.courses.map(c => {
      const usersInCourse = state.db.progress.filter(p => p.courseId === c.id);
      const totalLessons = state.db.lessons.filter(l => l.courseId === c.id).length;
      
      let avgProgress = 0;
      if (usersInCourse.length > 0) {
        const sumPercent = usersInCourse.reduce((acc, curr) => {
          const completedCount = curr.completedLessons ? curr.completedLessons.split(",").length : 0;
          const percent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
          return acc + percent;
        }, 0);
        avgProgress = Math.round(sumPercent / usersInCourse.length);
      }

      return {
        title: c.title,
        studentsCount: usersInCourse.length,
        avgProgress: avgProgress
      };
    });

    activeTabHtml = `
      <div>
        <p style="font-size: var(--font-sm); font-weight: 800; color: var(--primary-dark); margin-bottom: 12px;">과정별 수강 통계</p>
        ${courseStats.map(stat => `
          <div class="card" style="padding: 14px; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-weight: 800; font-size: var(--font-md); color: var(--primary-dark);">${stat.title}</span>
              <span style="font-size: var(--font-sm); color: var(--text-muted); font-weight: bold;">${stat.studentsCount}명 수강 중</span>
            </div>
            <div class="progress-container">
              <div class="progress-text-row">
                <span>평균 학습 진도율</span>
                <span>${stat.avgProgress}%</span>
              </div>
              <div class="progress-bar-bg" style="height: 6px;">
                <div class="progress-bar-fill" style="width: ${stat.avgProgress}%;"></div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  return `
    <!-- 상단 웹 대시보드 통계판 -->
    <div class="card" style="background-color: #FFFFFF; border-top: 3px solid var(--accent-gold);">
      <h3 class="section-title" style="border-left: none; padding-left: 0; font-size: var(--font-md); margin-bottom: 10px;">🏛️ 파주목양교회 종합 통계</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-val">${totalStudents}</div>
          <div class="stat-lbl">승인된 성도 수</div>
        </div>
        <div class="stat-item">
          <div class="stat-val">${totalSubmissions}</div>
          <div class="stat-lbl">제출된 과제 수</div>
        </div>
      </div>
    </div>

    <!-- 대시보드 전용 서브 탭 내비게이션 -->
    <div class="admin-tab-nav">
      <button class="admin-tab-btn ${state.adminActiveTab === 'approval' ? 'active' : ''}" data-tab="approval">가입승인</button>
      <button class="admin-tab-btn ${state.adminActiveTab === 'roles' ? 'active' : ''}" data-tab="roles">권한관리</button>
      <button class="admin-tab-btn ${state.adminActiveTab === 'register' ? 'active' : ''}" data-tab="register">콘텐츠등록</button>
      <button class="admin-tab-btn ${state.adminActiveTab === 'stats' ? 'active' : ''}" data-tab="stats">학습통계</button>
    </div>

    <!-- 활성화된 탭 영역 -->
    <div style="margin-top: 14px;">
      ${activeTabHtml}
    </div>
  `;
}

// 회원 권한 관리 리스트 검색 렌더러
function renderAdminUserSearchList(query) {
  const filtered = state.db.users.filter(u => {
    if (!query) return true;
    return u.name.includes(query) || (u.district && u.district.includes(query));
  });

  if (filtered.length === 0) {
    return `<p style="font-size: var(--font-sm); color: var(--text-muted); text-align: center; padding: 20px 0;">검색 결과와 일치하는 회원이 없습니다.</p>`;
  }

  const roleLabels = { pending: "대기자", member: "일반성도", leader: "교사", admin: "관리자" };

  return filtered.map(user => `
    <div class="list-item-dense" style="padding: 12px 0;">
      <div>
        <p style="font-weight: 800; font-size: var(--font-md); color: var(--primary-dark);">${user.name} (${roleLabels[user.role] || user.role})</p>
        <p style="font-size: var(--font-xs); color: var(--text-muted); margin-top: 2px;">소속: ${user.district || "없음"} | 연락처: ${user.phone}</p>
      </div>
      <div>
        <select class="form-select user-role-change-select" data-user-id="${user.id}" style="padding: 6px; font-size: 12px; width: 100px;">
          <option value="pending" ${user.role === 'pending' ? 'selected' : ''}>가입대기</option>
          <option value="member" ${user.role === 'member' ? 'selected' : ''}>일반성도</option>
          <option value="leader" ${user.role === 'leader' ? 'selected' : ''}>교사/리더</option>
          <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>관리자</option>
        </select>
      </div>
    </div>
  `).join("");
}

// 17. 렌더링된 뷰별 이벤트 바인딩 (bindPageEvents)
function bindPageEvents(page) {
  if (page === "home") {
    // 묵상카드 클릭 시 말씀 묵상 탭으로 라우팅
    const qtCard = document.getElementById("home-devotion-card");
    if (qtCard) {
      qtCard.addEventListener("click", () => {
        document.getElementById("nav-devotion").click();
      });
    }

    // 학습 시작하기 버튼 클릭 시 성경공부 탭으로 라우팅
    const goStudyBtn = document.getElementById("btn-home-go-biblestudy");
    if (goStudyBtn) {
      goStudyBtn.addEventListener("click", () => {
        document.getElementById("nav-biblestudy").click();
      });
    }

    // 이어서 학습하기 카드 클릭 시 해당 과정으로 즉시 진입
    const continueCard = document.getElementById("home-continue-card");
    if (continueCard) {
      continueCard.addEventListener("click", () => {
        state.biblestudySelectedCourseId = continueCard.dataset.courseId;
        state.biblestudySelectedLessonId = null;
        document.getElementById("nav-biblestudy").click();
      });
    }
  }
  
  else if (page === "devotion") {
    // 오늘 말씀 묵상 제출 버튼
    const submitBtn = document.getElementById("btn-submit-devotion");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const response1 = document.getElementById("devotion-res-1").value.trim();
        const response2 = document.getElementById("devotion-res-2").value.trim();
        const prayerRequest = document.getElementById("devotion-res-3").value.trim();
        
        if (!response1 || !response2) {
          showToast("묵상 및 적용 질문에 대한 답안을 작성해 주세요.", "danger");
          return;
        }

        const todayDevotion = state.db.devotions[0]; // 오늘의 묵상
        
        // Response 객체 생성 및 DB 추가
        const newResponse = {
          id: `dr_${Date.now()}`,
          devotionId: todayDevotion.id,
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          response1: response1,
          response2: response2,
          prayerRequest: prayerRequest,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };

        state.db.devotion_responses.push(newResponse);
        state.saveDB();
        
        showToast("오늘의 묵상 나눔을 성실히 제출했습니다!");
        state.renderCurrentPage();
      });
    }
  }

  else if (page === "biblestudy") {
    // 강좌 목록 카드 클릭 이벤트
    if (!state.biblestudySelectedCourseId) {
      const courseCards = document.querySelectorAll(".card[data-id]");
      courseCards.forEach(card => {
        card.addEventListener("click", () => {
          state.biblestudySelectedCourseId = card.dataset.id;
          state.renderCurrentPage();
        });
      });
    } 
    
    // 강좌 상세 페이지 내 이벤트
    else if (state.biblestudySelectedCourseId && !state.biblestudySelectedLessonId) {
      // 목록 뒤로 가기
      const backBtn = document.getElementById("btn-back-to-courses");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          state.biblestudySelectedCourseId = null;
          state.renderCurrentPage();
        });
      }

      // 개별 강의 클릭 진입
      const lessonItems = document.querySelectorAll(".lesson-list-item");
      lessonItems.forEach(item => {
        item.addEventListener("click", () => {
          state.biblestudySelectedLessonId = item.dataset.lessonId;
          state.renderCurrentPage();
        });
      });
    }
    
    // 개별 강의 시청 페이지 내 이벤트
    else if (state.biblestudySelectedLessonId) {
      // 강좌 상세로 뒤로 가기
      const backBtn = document.getElementById("btn-back-to-course");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          state.biblestudySelectedLessonId = null;
          state.renderCurrentPage();
        });
      }

      // 학습 완료 토글 처리
      const toggleCompleteBtn = document.getElementById("btn-toggle-lesson-complete");
      if (toggleCompleteBtn) {
        toggleCompleteBtn.addEventListener("click", () => {
          const courseId = state.biblestudySelectedCourseId;
          const lessonId = state.biblestudySelectedLessonId;
          
          let myPrg = state.db.progress.find(p => p.userId === state.currentUser.id && p.courseId === courseId);
          
          if (!myPrg) {
            myPrg = {
              id: `prg_${Date.now()}`,
              userId: state.currentUser.id,
              courseId: courseId,
              completedLessons: "",
              submittedAssignments: "",
              lastAccessDate: new Date().toISOString().substring(0, 10)
            };
            state.db.progress.push(myPrg);
          }

          let completedList = myPrg.completedLessons ? myPrg.completedLessons.split(",") : [];
          const idx = completedList.indexOf(lessonId);
          
          if (idx > -1) {
            // 이미 존재하므로 해제
            completedList.splice(idx, 1);
            showToast("강의 학습 완료를 취소했습니다.", "info");
          } else {
            // 완료 리스트에 추가
            completedList.push(lessonId);
            showToast("본 강의 학습이 완료되었습니다! 짝짝짝 👏");
          }

          myPrg.completedLessons = completedList.filter(x => x).join(",");
          myPrg.lastAccessDate = new Date().toISOString().substring(0, 10);
          state.saveDB();
          state.renderCurrentPage();
        });
      }

      // 과제 제출 버튼 처리
      const submitAssignmentBtn = document.getElementById("btn-submit-assignment");
      if (submitAssignmentBtn) {
        submitAssignmentBtn.addEventListener("click", () => {
          const answerText = document.getElementById("lesson-assignment-textarea").value.trim();
          if (!answerText) {
            showToast("과제 내용을 작성해 주세요.", "danger");
            return;
          }

          const lessonId = state.biblestudySelectedLessonId;
          const assignment = state.db.assignments.find(a => a.lessonId === lessonId);
          
          if (!assignment) return;

          // 과제 제출 추가
          const submission = {
            id: `sub_${Date.now()}`,
            assignmentId: assignment.id,
            lessonId: lessonId,
            userId: state.currentUser.id,
            userName: state.currentUser.name,
            content: answerText,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            feedback: null,
            feedbackAuthor: null
          };

          state.db.submissions.push(submission);

          // 진도에도 기록
          let myPrg = state.db.progress.find(p => p.userId === state.currentUser.id && p.courseId === state.biblestudySelectedCourseId);
          if (myPrg) {
            let submittedList = myPrg.submittedAssignments ? myPrg.submittedAssignments.split(",") : [];
            if (!submittedList.includes(assignment.id)) {
              submittedList.push(assignment.id);
              myPrg.submittedAssignments = submittedList.filter(x => x).join(",");
            }
          }

          state.saveDB();
          showToast("작성하신 강의 과제를 제출하였습니다!");
          state.renderCurrentPage();
        });
      }
    }
  }

  else if (page === "profile") {
    // 교사의 과제 클릭 시 피드백 모달 호출
    const subCards = document.querySelectorAll(".submission-feedback-card");
    subCards.forEach(card => {
      card.addEventListener("click", () => {
        const subId = card.dataset.subId;
        const sub = state.db.submissions.find(s => s.id === subId);
        if (!sub) return;

        const bodyHtml = `
          <div style="font-size: var(--font-md);">
            <p style="margin-bottom: 10px;"><strong>성도 이름:</strong> ${sub.userName}</p>
            <p style="margin-bottom: 10px; background-color: #F7FAFC; padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <strong>작성 내용:</strong><br>${sub.content}
            </p>
            <div class="form-group" style="margin-top: 14px;">
              <label class="form-label" style="font-size: var(--font-sm);">격려와 피드백 댓글 작성</label>
              <textarea class="textarea-nurture" id="leader-feedback-text" style="height: 100px;" placeholder="과제를 확인하고 성도에게 전할 따뜻한 조언이나 격려의 말을 남겨주세요."></textarea>
            </div>
          </div>
        `;

        openModal("과제 검토 및 피드백 작성", bodyHtml, () => {
          const feedback = document.getElementById("leader-feedback-text").value.trim();
          if (!feedback) {
            showToast("피드백 텍스트를 입력해 주세요.", "danger");
            return false; // 모달 유지
          }

          sub.feedback = feedback;
          sub.feedbackAuthor = state.currentUser.name;
          state.saveDB();
          
          showToast(`${sub.userName} 성도에게 피드백을 전달했습니다.`);
          state.renderCurrentPage();
          return true; // 모달 닫기
        }, "피드백 등록");
      });
    });

    // 관리자 대시보드 탭 스위칭 바인딩
    const adminTabBtns = document.querySelectorAll(".admin-tab-btn");
    adminTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        state.adminActiveTab = btn.dataset.tab;
        state.renderCurrentPage();
      });
    });

    // 관리자 - 가입 신청 승인 처리
    const approveBtns = document.querySelectorAll(".btn-action-approve");
    approveBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const appId = btn.dataset.appId;
        const app = state.db.approvals.find(a => a.id === appId);
        if (!app) return;

        // 1. 신청한 유저의 역할 승인 완료 처리
        const userObj = state.db.users.find(u => u.id === app.userId);
        if (userObj) {
          userObj.role = "member"; // 일반 성도로 변경
          userObj.approvalDate = new Date().toISOString().substring(0, 10);
        }

        // 2. 신청서 상태 승인으로 변경
        app.status = "approved";
        app.decisionDate = new Date().toISOString().substring(0, 10);
        
        state.saveDB();
        showToast(`${app.userName} 성도의 가입 신청을 승인하였습니다.`);
        state.renderCurrentPage();
      });
    });

    // 관리자 - 가입 신청 반려(거절) 처리
    const rejectBtns = document.querySelectorAll(".btn-action-reject");
    rejectBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const appId = btn.dataset.appId;
        const app = state.db.approvals.find(a => a.id === appId);
        if (!app) return;

        const bodyHtml = `
          <div class="form-group">
            <label class="form-label">거절/반려 사유 (성도에게 안내되지 않는 관리용 메모)</label>
            <input type="text" class="form-input" id="admin-reject-memo" placeholder="예: 소속 교구 불일치, 본인 확인 불가 등">
          </div>
        `;

        openModal("가입 가입신청 반려", bodyHtml, () => {
          const comment = document.getElementById("admin-reject-memo").value.trim() || "사유 미작성";
          
          app.status = "rejected";
          app.decisionDate = new Date().toISOString().substring(0, 10);
          app.comment = comment;

          // 유저 목록에서 가입대기 상태 유지 또는 탈퇴 처리 가능
          state.saveDB();
          showToast(`${app.userName} 성도의 가입 신청을 반려하였습니다.`, "danger");
          state.renderCurrentPage();
          return true;
        }, "반려 확정");
      });
    });

    // 관리자 - 회원 역할 변경 선택 상자
    const roleSelects = document.querySelectorAll(".user-role-change-select");
    roleSelects.forEach(select => {
      select.addEventListener("change", () => {
        const userId = select.dataset.userId;
        const newRole = select.value;
        const targetUser = state.db.users.find(u => u.id === userId);
        
        if (targetUser) {
          // 자기 자신의 권한 변경 예방
          if (targetUser.id === state.currentUser.id) {
            showToast("나의 권한은 직접 변경할 수 없습니다.", "danger");
            select.value = targetUser.role; // 원복
            return;
          }

          targetUser.role = newRole;
          
          // 만약 가입대기로 돌아갔을 경우 신청 데이터 없으면 보완
          if (newRole === "pending") {
            const hasApp = state.db.approvals.some(a => a.userId === userId && a.status === "pending");
            if (!hasApp) {
              state.db.approvals.push({
                id: `ap_${Date.now()}`,
                userId: userId,
                userName: targetUser.name,
                status: "pending",
                requestDate: new Date().toISOString().substring(0, 10),
                decisionDate: null,
                comment: ""
              });
            }
          }
          
          state.saveDB();
          showToast(`${targetUser.name} 회원의 권한이 변경되었습니다.`);
          state.renderCurrentPage();
        }
      });
    });

    // 관리자 - 회원 실시간 검색어 입력 처리
    const searchInput = document.getElementById("admin-user-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const q = e.target.value.trim();
        const listTarget = document.getElementById("admin-user-list-target");
        listTarget.innerHTML = renderAdminUserSearchList(q);
        
        // 다시 바인딩 (동적 재생성되었으므로)
        const newSelects = listTarget.querySelectorAll(".user-role-change-select");
        newSelects.forEach(select => {
          select.addEventListener("change", () => {
            const userId = select.dataset.userId;
            const newRole = select.value;
            const targetUser = state.db.users.find(u => u.id === userId);
            if (targetUser) {
              if (targetUser.id === state.currentUser.id) {
                showToast("자신의 권한은 변경할 수 없습니다.", "danger");
                select.value = targetUser.role;
                return;
              }
              targetUser.role = newRole;
              state.saveDB();
              showToast(`${targetUser.name} 회원의 권한을 변경했습니다.`);
              state.renderCurrentPage();
            }
          });
        });
      });
    }

    // 관리자 - 말씀묵상 신규 등록 처리
    const regQtBtn = document.getElementById("btn-admin-register-qt");
    if (regQtBtn) {
      regQtBtn.addEventListener("click", () => {
        const qDate = document.getElementById("reg-qt-date").value;
        const qScripture = document.getElementById("reg-qt-scripture").value.trim();
        const qTitle = document.getElementById("reg-qt-title").value.trim();
        const qContent = document.getElementById("reg-qt-content").value.trim();
        const qQ1 = document.getElementById("reg-qt-q1").value.trim();
        const qQ2 = document.getElementById("reg-qt-q2").value.trim();
        const qPrayer = document.getElementById("reg-qt-prayer").value.trim();

        if (!qDate || !qScripture || !qTitle || !qContent || !qQ1 || !qQ2 || !qPrayer) {
          showToast("모든 묵상 입력 항목을 누락 없이 채워주세요.", "danger");
          return;
        }

        // 중복 날짜 검사
        const isDup = state.db.devotions.some(d => d.date === qDate);
        if (isDup) {
          showToast("해당 날짜에 이미 등록된 말씀묵상이 존재합니다.", "danger");
          return;
        }

        const newQt = {
          id: `d_${Date.now()}`,
          date: qDate,
          scripture: qScripture,
          title: qTitle,
          content: qContent,
          question1: qQ1,
          question2: qQ2,
          prayer: qPrayer
        };

        // 최신 글이 맨 위로 오도록 앞에 추가
        state.db.devotions.unshift(newQt);
        state.saveDB();

        showToast(`${qDate} 일자 말씀 묵상을 새로 등록했습니다.`);
        state.renderCurrentPage();
      });
    }

    // 관리자 - 성경공부 강의 신규 등록 처리
    const regLessonBtn = document.getElementById("btn-admin-register-lesson");
    if (regLessonBtn) {
      regLessonBtn.addEventListener("click", () => {
        const courseId = document.getElementById("reg-lesson-course").value;
        const title = document.getElementById("reg-lesson-title").value.trim();
        const videoUrl = document.getElementById("reg-lesson-url").value.trim();
        const summary = document.getElementById("reg-lesson-summary").value.trim();
        const sharing = document.getElementById("reg-lesson-sharing").value.trim();
        const assignmentText = document.getElementById("reg-lesson-assignment").value.trim();

        if (!title || !summary || !sharing) {
          showToast("강의 제목, 요약, 나눔 질문은 필수 입력 항목입니다.", "danger");
          return;
        }

        // 순서 번호 자동 산정
        const existingLessons = state.db.lessons.filter(l => l.courseId === courseId);
        const nextOrder = existingLessons.length + 1;
        const lessonId = `l_${Date.now()}`;

        const newLesson = {
          id: lessonId,
          courseId: courseId,
          title: `${nextOrder}강. ${title}`,
          videoUrl: videoUrl || "",
          handouts: "새로 추가된 온라인 강의 요약 및 학습 자료입니다. 본문 핵심 요약과 나눔 질문을 확인해 주세요.",
          summary: summary,
          sharingQuestion: sharing,
          assignment: assignmentText || null,
          order: nextOrder
        };

        state.db.lessons.push(newLesson);

        // 과제 내용 입력된 경우 과제 테이블에도 함께 추가
        if (assignmentText) {
          const assId = `a_${Date.now()}`;
          state.db.assignments.push({
            id: assId,
            lessonId: lessonId,
            title: `${nextOrder}강 과제`,
            description: assignmentText,
            dueDate: "2026-07-31"
          });
        }

        state.saveDB();
        showToast(`성경공부 강의에 '${nextOrder}강. ${title}'을 추가하였습니다.`);
        state.renderCurrentPage();
      });
    }
  }
}
