# 목양양육앱 (교회 양육용 온라인 교육 앱) 구현 계획서

파주목양교회 50명 규모에서 실제로 사용할 수 있는 회원 승인, 말씀 묵상, 온라인 성경공부, 설교영상 시청, 진도 관리 기능이 통합된 모바일 중심 웹 애플리케이션을 제작합니다.

---

## 1. 개요 및 설계 방향
* **웹 앱 이름**: 목양양육앱 (Mokyang Nurture App)
* **주요 타겟**: 파주목양교회 성도 (50대 이상 장년층 다수 포함)
* **디자인 테마**: 
  - 모바일 중심 (가로폭이 제한된 중앙 정렬 레이아웃)
  - 따뜻하고 정돈된 분위기 (Warm White 백그라운드)
  - 네이비(Navy: `#0C2340`)와 골드(Gold: `#C5A059`) 포인트 컬러
  - 50대 이상 사용자용 **큰 글씨 토글** 기능 제공 (가독성이 뛰어난 폰트 및 여백)
  - 큼직한 터치 영역과 직관적인 버튼 라벨링
* **동작 방식**:
  - `localStorage` 기반 Mock DB 연동을 통한 완전 작동형 단일 페이지 웹 애플리케이션 (SPA).
  - 4가지 사용자 역할(가입대기자, 일반성도, 리더/교사, 관리자)을 실시간으로 전환하며 테스트할 수 있는 **역할 퀵 스위처(Role Switcher)** 제공.
  - 가입 대기 상태에서는 모든 콘텐츠 접근을 차단하고 "관리자 승인 대기 중" 전용 안내 화면 노출.
  - SQL 데이터베이스 구조 명세를 위한 `schema.sql` 파일 작성.

---

## 2. 데이터베이스 테이블 설계 (schema.sql)
실제 50명 규모의 배포를 고려하여 아래와 같이 관계형 데이터베이스(PostgreSQL/SQLite 호환) 스키마를 설계합니다.

* **`users`**: 사용자 정보 및 권한 (id, name, email, phone, role, district, age, gender, registerDate, approvalDate)
* **`approvals`**: 가입 승인 요청 및 처리 이력 (id, userId, userName, status, requestDate, decisionDate, comment)
* **`devotions`**: 일일 말씀 묵상 본문 (id, date, scripture, title, content, question1, question2, prayer)
* **`devotion_responses`**: 성도가 제출한 말씀 묵상 응답 (id, devotionId, userId, userName, response1, response2, prayerRequest, date)
* **`courses`**: 성경공부 과정 (id, title, intro, duration, thumbnail)
* **`lessons`**: 과정별 강의 목록 (id, courseId, title, videoUrl, handouts, summary, sharingQuestion, assignment, order)
* **`videos`**: 설교 영상 (id, title, speaker, scripture, date, youtubeUrl, summary, devotionQuestion)
* **`assignments`**: 강의별 제출 과제 (id, lessonId, title, description, dueDate)
* **`submissions`**: 성도가 제출한 과제 및 피드백 (id, assignmentId, lessonId, userId, userName, content, date, feedback, feedbackAuthor)
* **`progress`**: 성도별 성경공부 진행 상황 (id, userId, courseId, completedLessons, submittedAssignments, lastAccessDate)
* **`notices`**: 교회 공지사항 (id, title, content, date, authorName)

---

## 3. 화면 구성 및 사용자 역할별 기능

### 가. 5대 핵심 메뉴 (하단 내비게이션)
1. **홈 (Home)**: 
   - 오늘의 말씀 카드 (터치 시 말씀 묵상 탭으로 이동)
   - 이어서 학습하기 (마지막 학습한 강의 바로가기)
   - 이번 주 설교영상 카드
   - 내 학습 진도 요약 (도넛 차트 형태의 시각적 요약)
   - 공지사항 목록
2. **말씀묵상 (Devotion)**:
   - 오늘의 묵상 보기 (날짜, 성경본문, 말씀 설명, 묵상 질문, 적용 질문, 기도문)
   - 성도 피드백 입력 폼 (오늘 받은 은혜, 삶의 적용, 기도제목 작성 및 제출)
   - 이전 묵상 달력/리스트 조회
3. **성경공부 (Bible Study)**:
   - 교육 과정 목록 (새가족반, 기초성경공부, 제자훈련, 복음이란 무엇인가 등)
   - 과정 상세 페이지 (강의 목록 및 내 진도율)
   - 강의 시청실 (강의 동영상 플레이어, 강의안 텍스트, 핵심 요약, 나눔 질문, 과제 내용)
   - **과제 제출 폼** 및 **강의 완료 체크 버튼**
4. **설교영상 (Sermon)**:
   - 주일 설교 영상 리스트 (유튜브 링크 연동, 제목, 설교자, 본문, 요약 텍스트 제공)
   - 상세 보기 및 묵상 질문 수록
5. **내 정보 (My Info)**:
   - 프로필 요약 (이름, 권한, 교구)
   - **학습 대시보드** (전체 과정 진도율, 완료 강의 수, 제출 과제 수)
   - **리더/교사 대시보드** (교사 권한 전환 시 표시: 담당 반 성도 목록, 제출 과제 확인, 피드백/댓글 작성)
   - **관리자 웹 대시보드** (관리자 권한 전환 시 표시)

### 나. 관리자 웹 대시보드 기능
* **회원 승인 관리**: 가입 대기자 목록 조회, 승인(Approve) 및 반려(Reject) 처리, 승인일 자동 기록
* **회원 권한 관리**: 회원 이름 검색 및 권한(대기자, 일반성도, 교사, 관리자) 강제 변경
* **콘텐츠 관리 (입력 폼)**:
  - 말씀묵상 등록 (날짜, 본문, 내용, 질문 등)
  - 성경공부 과정/강의 개설 (과정 선택, 강의명, 영상 링크, 요약, 과제 내용 등)
  - 설교영상 등록 (유튜브 링크, 설교자, 본문, 날짜 등)
  - 공지사항 작성
* **학습 현황 통계**: 전체 성도 50명의 교육 과정별 진도 현황 및 과제 제출률 통계 시각화

---

## 4. 제안하는 개발 파일 구조

새로운 디렉토리 [mokyang-nurture](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-nurture) 내에 다음 파일들을 생성합니다.

* **[index.html](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-nurture/index.html)**: 
  - 모바일 프레임 컨테이너 및 5대 메뉴 탭 구조 정의.
  - 모달 대화상자(과제 제출, 피드백 작성 등) 레이아웃 정의.
  - 50대 장년층을 배려한 시각적 계층 구조 설계.
* **[style.css](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-nurture/style.css)**: 
  - 네이비 & 골드 테마 기반의 CSS 디자인 변수 및 애니메이션 설정.
  - 모바일 우선 미디어 쿼리 정의.
  - `.large-text` 클래스 추가 시 전체 폰트 크기 및 줄간격을 확대하여 가독성 극대화.
* **[app.js](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-nurture/app.js)**: 
  - 약 50명의 모의 회원 데이터(다양한 연령대, 교구, 진도율 설정)와 교육 콘텐츠 자동 초기화.
  - 가입 대기자 상태일 경우 로그인 시 "승인 대기" 화면으로 라우팅 강제 적용.
  - 관리자용 콘텐츠 등록 폼 데이터가 Mock DB(localStorage)에 즉시 저장되어 일반 성도 화면에 실시간 반영되는 기능 구현.
* **[schema.sql](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-nurture/schema.sql)**: 
  - 설계된 11개 테이블의 DDL(Data Definition Language) 정의서.

---

## 5. 검증 계획

1. **역할별 접근 제어 테스트**:
   - 가입 대기 상태인 가상 계정으로 전환하여 홈, 묵상 등 메인 메뉴 접근 시 "승인 대기" 화면으로 자동 리다이렉트되는지 검증.
   - 일반 성도 계정에서 관리자 대시보드나 교사 기능에 접근할 수 없도록 차단되는지 검증.
2. **콘텐츠 추가 및 실시간 연동 테스트**:
   - 관리자 권한으로 로그인 후 새로운 '말씀 묵상'이나 '강의'를 추가하고, 일반 성도 계정으로 전환하여 새로 등록된 콘텐츠가 홈 및 각 메뉴에 정상적으로 표시되는지 확인.
3. **진도율 및 과제 제출 상태 업데이트 검증**:
   - 일반 성도 권한으로 성경공부 강의 완료 버튼을 누르거나 과제를 제출한 후, '내 정보'의 진도율 그래프가 실시간으로 갱신되는지 확인.
   - 관리자 또는 교사 대시보드에 해당 성도의 과제 제출 현황과 진도율이 즉각 집계되는지 확인.
4. **큰 글씨 모드 검증**:
   - 우측 상단 '큰 글씨' 토글 클릭 시 가독성 높은 폰트와 대비, 버튼 크기가 조절되는지 모바일 브라우저 뷰포트에서 확인.
