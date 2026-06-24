/**
 * MokyangOn Administrator Web Dashboard Controller
 */

const Admin = {
  activeMenu: "dashboard", // dashboard, members, groups, courses, devotions, sermons, notices

  init() {
    this.bindEvents();
    this.render();
  },

  bindEvents() {
    document.querySelectorAll(".admin-menu-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const menu = e.currentTarget.dataset.menu;
        this.switchMenu(menu);
      });
    });
  },

  switchMenu(menu) {
    this.activeMenu = menu;
    document.querySelectorAll(".admin-menu-btn").forEach(btn => {
      if (btn.dataset.menu === menu) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    this.render();
  },

  render() {
    const contentArea = document.getElementById("admin-main-content");
    if (!contentArea) return;

    // Refresh page title
    const titleEl = document.getElementById("admin-page-title");
    if (titleEl) {
      const menuNames = {
        dashboard: "📊 목양 관리 대시보드",
        members: "👥 성도/회원 권한 관리",
        groups: "👥 소모임 개설 및 출석부",
        courses: "📖 온라인 양육 강좌 관리",
        devotions: "✏️ 말씀 묵상지 등록",
        sermons: "🎥 주일 설교영상 등록",
        notices: "📢 교회 공지사항 발송"
      };
      titleEl.innerText = menuNames[this.activeMenu] || "관리자 모드";
    }

    contentArea.innerHTML = "";

    switch (this.activeMenu) {
      case "dashboard":
        this.renderDashboard(contentArea);
        break;
      case "members":
        this.renderMembers(contentArea);
        break;
      case "groups":
        this.renderGroups(contentArea);
        break;
      case "courses":
        this.renderCourses(contentArea);
        break;
      case "devotions":
        this.renderDevotions(contentArea);
        break;
      case "sermons":
        this.renderSermons(contentArea);
        break;
      case "notices":
        this.renderNotices(contentArea);
        break;
      default:
        this.renderDashboard(contentArea);
    }
  },

  // 1. DASHBOARD MENU
  renderDashboard(container) {
    // 1. Calculate KPI Statistics
    const allUsers = window.DB.get("users");
    const activeUsers = allUsers.filter(u => u.approval_status === "approved");
    const pendingUsers = allUsers.filter(u => u.approval_status === "pending");
    const totalGroups = window.DB.query("small_groups", g => g.is_active).length;
    
    // Attendance rate
    const atts = window.DB.get("small_group_attendance");
    const presents = atts.filter(a => a.status === "present" || a.status === "late");
    const attRate = atts.length > 0 ? Math.round((presents.length / atts.length) * 100) : 100;

    // Courses & Progress
    const totalCourses = window.DB.query("courses", c => c.is_active).length;
    const enrollments = window.DB.get("course_enrollments");
    const avgProgress = enrollments.length > 0 ? Math.round(enrollments.reduce((sum, e) => sum + e.progress_rate, 0) / enrollments.length) : 0;

    // Devotion responses this week (let's count all since it's mock)
    const devotionResponses = window.DB.get("devotion_responses").length;

    // Active logged in users (has last_login_at)
    const activeLogins = allUsers.filter(u => u.last_login_at && u.last_login_at !== "").length;

    // Render stats section
    let html = `
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-info">
            <h3>전체 성도 수</h3>
            <div class="kpi-value">${activeUsers.length}명</div>
          </div>
          <div class="kpi-icon"><i class="fas fa-users"></i></div>
        </div>
        <div class="kpi-card" style="border-color:var(--color-gold);">
          <div class="kpi-info">
            <h3>승인 대기자 수</h3>
            <div class="kpi-value" style="color:var(--color-gold-dark);">${pendingUsers.length}명</div>
          </div>
          <div class="kpi-icon" style="background:var(--color-gold-light); color:var(--color-navy);"><i class="fas fa-user-clock"></i></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-info">
            <h3>개설 소모임 수</h3>
            <div class="kpi-value">${totalGroups}개</div>
          </div>
          <div class="kpi-icon"><i class="fas fa-sitemap"></i></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-info">
            <h3>소모임 출석률</h3>
            <div class="kpi-value">${attRate}%</div>
          </div>
          <div class="kpi-icon"><i class="fas fa-check-double"></i></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-info">
            <h3>개설 양육과정</h3>
            <div class="kpi-value">${totalCourses}과목</div>
          </div>
          <div class="kpi-icon"><i class="fas fa-book-open"></i></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-info">
            <h3>평균 수강 진도율</h3>
            <div class="kpi-value">${avgProgress}%</div>
          </div>
          <div class="kpi-icon"><i class="fas fa-tasks"></i></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-info">
            <h3>최근 묵상 참여자</h3>
            <div class="kpi-value">${devotionResponses}명</div>
          </div>
          <div class="kpi-icon"><i class="fas fa-bible"></i></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-info">
            <h3>앱 활성 사용자</h3>
            <div class="kpi-value">${activeLogins}명</div>
          </div>
          <div class="kpi-icon"><i class="fas fa-mobile-alt"></i></div>
        </div>
      </div>

      <!-- 승인 대기자 테이블 -->
      <div class="admin-table-container">
        <div class="admin-table-header">
          <div class="admin-table-title">🆕 가입 신청 및 승인 관리</div>
          <span style="font-size:12px; color:var(--color-gray-600);">새로 가입 신청한 성도를 승인하거나 반려할 수 있습니다.</span>
        </div>
        
        <table class="admin-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>가입 신청일</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody id="pending-users-list"></tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
    this.renderPendingUsers();
  },

  renderPendingUsers() {
    const tbody = document.getElementById("pending-users-list");
    if (!tbody) return;

    const pending = window.DB.query("users", u => u.approval_status === "pending");

    if (pending.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--color-gray-600); padding: 30px;">가입 대기 중인 신청자가 없습니다.</td></tr>`;
      return;
    }

    let html = "";
    pending.forEach(u => {
      html += `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td>${u.phone}</td>
          <td>${u.email}</td>
          <td>${u.created_at.slice(0, 16).replace('T', ' ')}</td>
          <td><span class="status-badge pending">승인대기</span></td>
          <td>
            <button class="table-btn table-btn-primary" onclick="Admin.handleApproval('${u.id}', 'approved')">승인</button>
            <button class="table-btn table-btn-danger" onclick="Admin.handleApproval('${u.id}', 'rejected')">거절</button>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  },

  handleApproval(userId, status) {
    const user = window.DB.query("users", u => u.id === userId)[0];
    if (!user) return;

    window.DB.update("users", userId, { approval_status: status });

    if (status === "approved") {
      // Create welcome notification
      window.DB.insert("notifications", {
        user_id: userId,
        title: "🎉 가입 승인 완료",
        message: "파주목양교회 목양온 앱 가입을 진심으로 축하하고 환영합니다! 이제 모든 소모임 신청 및 양육 과정 수강이 가능합니다.",
        is_read: false
      });
      alert(`[${user.name}] 성도의 가입을 승인하였습니다.`);
    } else {
      alert(`[${user.name}] 성도의 가입을 거절처리 하였습니다.`);
    }

    this.render();
  },

  // 2. MEMBERS MENU
  renderMembers(container) {
    const users = window.DB.get("users").filter(u => u.approval_status !== "rejected");

    let html = `
      <div class="admin-table-container">
        <div class="admin-table-header">
          <div class="admin-table-title">👥 등록 회원 및 직분(권한) 관리</div>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>현재 권한</th>
              <th>가입 상태</th>
              <th>권한 변경</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => {
              const roleLabels = {
                admin: "담임목사(관리자)",
                leader: "소모임 리더",
                teacher: "양육 교사",
                member: "일반 성도"
              };
              return `
                <tr>
                  <td><strong>${u.name}</strong></td>
                  <td>${u.phone}</td>
                  <td>${u.email}</td>
                  <td><span class="group-tag" style="background:#E0E7FF; color:#4338CA;">${roleLabels[u.role] || "일반 성도"}</span></td>
                  <td><span class="status-badge ${u.approval_status}">${u.approval_status === "approved" ? "승인 완료" : "대기 중"}</span></td>
                  <td>
                    <select class="admin-select" onchange="Admin.changeUserRole('${u.id}', this.value)">
                      <option value="member" ${u.role === "member" ? "selected" : ""}>일반 성도</option>
                      <option value="leader" ${u.role === "leader" ? "selected" : ""}>소모임 리더</option>
                      <option value="teacher" ${u.role === "teacher" ? "selected" : ""}>양육 교사</option>
                      <option value="admin" ${u.role === "admin" ? "selected" : ""}>관리자</option>
                    </select>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = html;
  },

  changeUserRole(userId, newRole) {
    window.DB.update("users", userId, { role: newRole });
    alert("회원의 직분(권한)이 업데이트되었습니다.");
    this.render();
  },

  // 3. GROUPS MENU
  renderGroups(container) {
    const groups = window.DB.get("small_groups");

    let html = `
      <div class="admin-table-container">
        <div class="admin-table-header">
          <div class="admin-table-title">👥 개설 소모임 목록</div>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>소모임명</th>
              <th>구분</th>
              <th>리더</th>
              <th>모임 일정</th>
              <th>장소</th>
              <th>정원</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            ${groups.map(g => {
              const leader = window.DB.query("users", u => u.id === g.leader_id)[0] || { name: "미정" };
              const members = window.DB.query("small_group_members", m => m.group_id === g.id && m.status === "approved");
              
              return `
                <tr>
                  <td><strong>${g.title}</strong> ${!g.is_active ? `<span style="color:red;">(비활성)</span>` : ""}</td>
                  <td><span class="group-tag">${g.category}</span></td>
                  <td>${leader.name}</td>
                  <td>${g.day_of_week} ${g.time}</td>
                  <td>${g.location}</td>
                  <td>${members.length} / ${g.capacity}명</td>
                  <td>
                    <button class="table-btn table-btn-gold" onclick="Admin.toggleGroupActive('${g.id}', ${g.is_active})">
                      ${g.is_active ? "폐쇄" : "개설"}
                    </button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = html;
  },

  toggleGroupActive(groupId, currentActive) {
    window.DB.update("small_groups", groupId, { is_active: !currentActive });
    alert(`소모임 상태가 변경되었습니다.`);
    this.render();
  },

  // 4. COURSES MENU
  renderCourses(container) {
    const courses = window.DB.get("courses");

    let html = `
      <div class="admin-table-container">
        <div class="admin-table-header">
          <div class="admin-table-title">📖 개설 양육 강좌 및 수강생 진도 현황</div>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>과정명</th>
              <th>담당교사</th>
              <th>총 강의수</th>
              <th>수강인원</th>
              <th>평균 진도율</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            ${courses.map(c => {
              const teacher = window.DB.query("users", u => u.id === c.teacher_id)[0] || { name: "미정" };
              const enrolls = window.DB.query("course_enrollments", e => e.course_id === c.id);
              const avgProg = enrolls.length > 0 ? Math.round(enrolls.reduce((sum, e) => sum + e.progress_rate, 0) / enrolls.length) : 0;
              
              return `
                <tr>
                  <td><strong>${c.title}</strong></td>
                  <td>${teacher.name}</td>
                  <td>${c.total_lessons}강</td>
                  <td>${enrolls.length}명</td>
                  <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span>${avgProg}%</span>
                      <div class="progress-bar-container" style="width:60px; height:6px;">
                        <div class="progress-bar-fill gold" style="width:${avgProg}%;"></div>
                      </div>
                    </div>
                  </td>
                  <td><span class="status-badge ${c.is_active ? "approved" : "rejected"}">${c.is_active ? "운영중" : "마감"}</span></td>
                  <td>
                    <button class="table-btn table-btn-primary" onclick="Admin.showEnrolledStudentsModal('${c.id}')">수강생 및 과제 확인</button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = html;
  },

  showEnrolledStudentsModal(courseId) {
    const course = window.DB.query("courses", c => c.id === courseId)[0];
    if (!course) return;

    const enrolls = window.DB.query("course_enrollments", e => e.course_id === courseId);
    const lessons = window.DB.query("lessons", l => l.course_id === courseId);

    let listHtml = "";
    if (enrolls.length === 0) {
      listHtml = `<p style="text-align:center; padding:20px; font-size:14px;">수강 중인 학생이 없습니다.</p>`;
    } else {
      enrolls.forEach(e => {
        const student = window.DB.query("users", u => u.id === e.user_id)[0];
        if (student) {
          // Find submissions for this student in this course
          const studentSubs = window.DB.query("submissions", s => s.user_id === student.id && lessons.some(l => l.id === s.lesson_id));
          
          listHtml += `
            <div style="border-bottom:1px solid var(--color-gray-200); padding: 12px 0;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <div>
                  <strong>${student.name} 성도</strong> (${student.email})
                </div>
                <div>
                  진도율: <strong>${e.progress_rate}%</strong>
                </div>
              </div>
              
              <!-- 과제 제출물 리스트 -->
              <div style="padding-left:12px; border-left:3px solid var(--color-gold);">
                <span style="font-size:12px; font-weight:700; color:var(--color-navy);">✏️ 제출한 과제 목록 (${studentSubs.length}건):</span>
                ${studentSubs.length === 0 ? `<div style="font-size:12px; color:var(--color-gray-600); margin-top:2px;">제출한 과제가 아직 없습니다.</div>` : ""}
                ${studentSubs.map(s => {
                  const lesson = lessons.find(l => l.id === s.lesson_id) || { title: "강의" };
                  return `
                    <div style="background:#f9f9f9; padding:8px; border-radius:4px; margin-top:6px; font-size:13px;">
                      <div style="font-weight:700;">[${lesson.title}]</div>
                      <p style="margin:4px 0; color:var(--color-gray-800);">${s.content}</p>
                      
                      <!-- 피드백 입력창 -->
                      <div style="margin-top:8px; display:flex; gap:6px;">
                        <input type="text" id="feedback-input-${s.id}" value="${s.feedback || ""}" placeholder="피드백 코멘트를 입력하세요" style="flex-grow:1; font-size:12px; padding:4px 8px; border:1px solid var(--color-gray-300); border-radius:4px;">
                        <button class="table-btn table-btn-gold" style="margin:0; padding:4px 8px;" onclick="Admin.submitFeedback('${s.id}', '${courseId}')">피드백 저장</button>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }
      });
    }

    const modal = document.getElementById("mobile-modal");
    const modalTitle = document.getElementById("mobile-modal-title");
    const modalBody = document.getElementById("mobile-modal-body");

    if (modal && modalTitle && modalBody) {
      modalTitle.innerText = `[${course.title}] 수강현황 및 피드백`;
      modalBody.innerHTML = `
        <div style="max-height:450px; overflow-y:auto;">
          ${listHtml}
        </div>
      `;
      modal.style.display = "flex";
    }
  },

  submitFeedback(submissionId, courseId) {
    const feedback = document.getElementById(`feedback-input-${submissionId}`).value;
    if (!feedback.trim()) {
      alert("피드백 내용을 입력해 주세요.");
      return;
    }

    window.DB.update("submissions", submissionId, { feedback: feedback });
    
    // Notify student
    const sub = window.DB.query("submissions", s => s.id === submissionId)[0];
    if (sub) {
      const lesson = window.DB.query("lessons", l => l.id === sub.lesson_id)[0];
      window.DB.insert("notifications", {
        user_id: sub.user_id,
        title: "과제 피드백 도착",
        message: `[${lesson.title}] 제출하신 과제에 교사의 코멘트가 등록되었습니다.`,
        is_read: false
      });
    }

    alert("피드백 코멘트가 저장되었습니다.");
    // Reopen modal to show update
    this.showEnrolledStudentsModal(courseId);
  },

  // 5. DEVOTIONS REGISTRATION
  renderDevotions(container) {
    const todayStr = new Date().toISOString().slice(0, 10);
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 style="font-size:var(--font-size-base); color:var(--color-navy); margin-bottom:20px; border-bottom:2px solid var(--color-gold); padding-bottom:8px;">✏️ 오늘의 말씀 묵상지 등록</h3>
        <div class="admin-form-grid">
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">게시 날짜</label>
            <input type="date" id="dev-date" value="${todayStr}" class="admin-form-input">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">묵상 제목</label>
            <input type="text" id="dev-title" placeholder="예: 선한 목자이신 예수님" class="admin-form-input">
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">성경 본문 위치</label>
            <input type="text" id="dev-bible-text" placeholder="예: 요한복음 10:11-15" class="admin-form-input">
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">성경 본문 구절 말씀</label>
            <textarea id="dev-scripture" placeholder="11 나는 선한 목자라 선한 목자는 양들을 위하여 목숨을 버리거니와..." class="admin-form-textarea" style="height:150px;"></textarea>
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">말씀 해설</label>
            <textarea id="dev-explanation" placeholder="성도들의 묵상을 도울 해설을 적어 주세요..." class="admin-form-textarea"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">묵상 질문</label>
            <input type="text" id="dev-med-q" placeholder="예: 예수님을 진정 신뢰하며 따르고 있나요?" class="admin-form-input">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">적용 질문</label>
            <input type="text" id="dev-app-q" placeholder="예: 오늘 하루 음성에 귀 기울이며 순종해야 할 것은?" class="admin-form-input">
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">기도문</label>
            <textarea id="dev-prayer" placeholder="묵상을 정리하는 기도를 작성해 주세요..." class="admin-form-textarea" style="height:80px;"></textarea>
          </div>
        </div>
        <div class="admin-form-actions">
          <button class="admin-form-btn btn-primary" onclick="Admin.saveDevotion()">묵상 등록 발송하기</button>
        </div>
      </div>
    `;
  },

  saveDevotion() {
    const date = document.getElementById("dev-date").value;
    const title = document.getElementById("dev-title").value;
    const bible_text = document.getElementById("dev-bible-text").value;
    const scripture = document.getElementById("dev-scripture").value;
    const explanation = document.getElementById("dev-explanation").value;
    const med_q = document.getElementById("dev-med-q").value;
    const app_q = document.getElementById("dev-app-q").value;
    const prayer = document.getElementById("dev-prayer").value;

    if (!title || !bible_text || !scripture || !explanation || !med_q || !app_q || !prayer) {
      alert("모든 항목을 충실히 기입해 주셔야 등록 가능합니다.");
      return;
    }

    const newDev = {
      date,
      title,
      bible_text,
      scripture,
      explanation,
      meditation_question: med_q,
      application_question: app_q,
      prayer
    };

    window.DB.insert("devotions", newDev);

    // Notify all approved users
    const approvedUsers = window.DB.query("users", u => u.approval_status === "approved");
    approvedUsers.forEach(u => {
      window.DB.insert("notifications", {
        user_id: u.id,
        title: "📝 새 말씀 묵상지 등록",
        message: `[${date}] '${title}' 매일 성경 말씀 묵상이 등록되었습니다.`,
        is_read: false
      });
    });

    alert(`[${title}] 말씀 묵상지를 성공적으로 등록하고 전 성도에게 알림을 발송하였습니다.`);
    this.switchMenu("dashboard");
  },

  // 6. SERMONS REGISTRATION
  renderSermons(container) {
    const todayStr = new Date().toISOString().slice(0, 10);
    const courses = window.DB.get("courses");

    container.innerHTML = `
      <div class="admin-form-card">
        <h3 style="font-size:var(--font-size-base); color:var(--color-navy); margin-bottom:20px; border-bottom:2px solid var(--color-gold); padding-bottom:8px;">🎥 주일 설교 영상 등록</h3>
        <div class="admin-form-grid">
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">설교 제목</label>
            <input type="text" id="ser-title" placeholder="예: 굳건한 반석 위에 세운 신앙" class="admin-form-input">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">설교 날짜</label>
            <input type="date" id="ser-date" value="${todayStr}" class="admin-form-input">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">설교자 (목사)</label>
            <input type="text" id="ser-preacher" placeholder="예: 김목사 (담임목사)" class="admin-form-input">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">본문 말씀 위치</label>
            <input type="text" id="ser-bible" placeholder="예: 마태복음 7:24-27" class="admin-form-input">
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">유튜브 공유/임베드 링크</label>
            <input type="text" id="ser-url" placeholder="예: https://www.youtube.com/embed/n4fCqC96dY0" class="admin-form-input">
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">설교 요약문</label>
            <textarea id="ser-summary" placeholder="설교 핵심 요약 및 은혜 노트를 적어주세요..." class="admin-form-textarea" style="height:120px;"></textarea>
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">적용 및 삶의 나눔 질문</label>
            <textarea id="ser-questions" placeholder="1. 말씀을 듣고 지키며 행동한 적이 있나요?\n2. ..." class="admin-form-textarea" style="height:80px;"></textarea>
          </div>
        </div>
        <div class="admin-form-actions">
          <button class="admin-form-btn btn-primary" onclick="Admin.saveSermon()">설교영상 등록 발송하기</button>
        </div>
      </div>
    `;
  },

  saveSermon() {
    const title = document.getElementById("ser-title").value;
    const date = document.getElementById("ser-date").value;
    const preacher = document.getElementById("ser-preacher").value;
    const bible = document.getElementById("ser-bible").value;
    let url = document.getElementById("ser-url").value;
    const summary = document.getElementById("ser-summary").value;
    const questions = document.getElementById("ser-questions").value;

    if (!title || !preacher || !bible || !url || !summary || !questions) {
      alert("설교 등록에 필요한 정보를 모두 입력해야 합니다.");
      return;
    }

    if (url.includes("watch?v=")) {
      const id = url.split("v=")[1].split("&")[0];
      url = `https://www.youtube.com/embed/${id}`;
    }

    const newSermon = {
      title,
      preacher,
      bible_text: bible,
      sermon_date: date,
      youtube_url: url,
      summary,
      application_questions: questions
    };

    window.DB.insert("sermon_videos", newSermon);

    // Notify all approved users
    const approvedUsers = window.DB.query("users", u => u.approval_status === "approved");
    approvedUsers.forEach(u => {
      window.DB.insert("notifications", {
        user_id: u.id,
        title: "🎥 새 주일 설교영상 등록",
        message: `[${title}] 주일 설교영상이 유튜브 링크로 등록되었습니다. 시청해 보세요!`,
        is_read: false
      });
    });

    alert(`[${title}] 설교영상을 등록하고 성도 전체에게 알림을 보냈습니다.`);
    this.switchMenu("dashboard");
  },

  // 7. NOTICES REGISTRATION
  renderNotices(container) {
    container.innerHTML = `
      <div class="admin-form-card">
        <h3 style="font-size:var(--font-size-base); color:var(--color-navy); margin-bottom:20px; border-bottom:2px solid var(--color-gold); padding-bottom:8px;">📢 교회 공지사항 발송</h3>
        <div class="admin-form-grid">
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">공지사항 제목</label>
            <input type="text" id="not-title" placeholder="예: [전체] 추수감사주일 연합 축제 안내" class="admin-form-input">
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-gray-800);">공지 대상 권한</label>
            <select id="not-target" class="admin-form-input" style="height:46px;">
              <option value="all">전 성도 공지</option>
              <option value="leader_teacher">리더/교사 전용 공지</option>
            </select>
          </div>
          <div class="form-group admin-form-full">
            <label class="form-label" style="color:var(--color-gray-800);">공지 세부 내용</label>
            <textarea id="not-content" placeholder="공지할 상세 날짜, 장소, 시간, 준비물 등을 자세하게 적어 주세요..." class="admin-form-textarea" style="height:200px;"></textarea>
          </div>
        </div>
        <div class="admin-form-actions">
          <button class="admin-form-btn btn-primary" onclick="Admin.saveNotice()">공지사항 등록 발송하기</button>
        </div>
      </div>
    `;
  },

  saveNotice() {
    const user = window.Auth.getCurrentUser();
    const title = document.getElementById("not-title").value;
    const target = document.getElementById("not-target").value;
    const content = document.getElementById("not-content").value;

    if (!title || !content) {
      alert("제목과 공지내용을 기재해 주셔야 발송 가능합니다.");
      return;
    }

    const newNotice = {
      title,
      content,
      target_role: target,
      created_by: user.id
    };

    window.DB.insert("notices", newNotice);

    // Notify users matches target
    const allUsers = window.DB.query("users", u => u.approval_status === "approved");
    allUsers.forEach(u => {
      let shouldNotify = false;
      if (target === "all") {
        shouldNotify = true;
      } else if (target === "leader_teacher") {
        shouldNotify = (u.role === "leader" || u.role === "teacher" || u.role === "admin");
      }

      if (shouldNotify) {
        window.DB.insert("notifications", {
          user_id: u.id,
          title: "📢 새 교회 공지사항 등록",
          message: `${title} 공지사항이 게재되었습니다. 확인하세요.`,
          is_read: false
        });
      }
    });

    alert(`[${title}] 공지사항을 게재하고 해당 대상 성도들에게 알림을 발송하였습니다.`);
    this.switchMenu("dashboard");
  }
};

window.Admin = Admin;
