# Implementation Plan: 목양커넥트 (Mokyang Connect)

교회 성도(50명 규모), 소그룹 리더, 교역자가 함께 사용하는 모바일 중심의 따뜻하고 직관적인 디지털 목양 플랫폼인 **'목양커넥트'**를 구현하기 위한 계획입니다. 50대 이상 성도도 쉽게 사용할 수 있도록 크고 직관적인 UI와 네이비/골드 톤의 프리미엄 디자인을 적용합니다.

## User Review Required

> [!IMPORTANT]
> **모바일 중심의 Single Page Application (SPA) 구조**
> - 별도의 백엔드 서버 없이 프론트엔드 내에서 LocalStorage를 활용한 상태 관리와 모의 데이터베이스(Mock Database)로 완벽히 동작하게 구현합니다.
> - 일반 성도, 소그룹 리더, 관리자(교역자) 등 3가지 권한을 손쉽게 전환하며 테스트할 수 있도록 **역할 퀵스위치(Quick Switcher)** 기능을 UI에 제공합니다.
> - 50대 이상 성도의 편의성을 위해 **큰 글씨 모드(Large Text Mode)**를 기본 탑재하거나 원클릭으로 토글할 수 있게 제공합니다.

> [!NOTE]
> **데이터베이스 구조 및 관리 데이터**
> - 사용자(Users), 소모임(Groups), 소모임 가입 신청(Applications), 일정(Meetings), 출석 정보(Attendance), 기도제목(Prayers), 공지사항(Notices), 사진첩(Photos), 후기(Reviews) 등으로 구성된 통합 관계형 모의 DB를 `localStorage`에 저장 및 연동합니다.

---

## Proposed Changes

새 프로젝트는 `C:\Users\osn\.gemini\antigravity\scratch\mokyang-connect` 경로에 생성됩니다.

### 1. Web Application Core

#### [NEW] [index.html](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-connect/index.html)
- SPA 구조의 컨테이너를 가집니다.
- 하단 네비게이션(홈, 소모임, 일정, 알림, 내 정보) 및 상단 헤더(교회 로고, 환영 인사, 역할 전환 퀵 스위처)를 포함합니다.
- 각 역할별 대시보드 및 상세 페이지 템플릿(소모임 상세, 출석 관리, 기도제목, 관리자 대시보드, 확장 기능)을 렌더링하기 위한 구조를 정의합니다.
- 큰 글씨 모드 스위치 및 접근성 요소를 탑재합니다.

#### [NEW] [style.css](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-connect/style.css)
- 메인 Navy (`#1A365D`), 포인트 Gold (`#D69E2E`), 배경 Soft Gray/White (`#F7FAFC`) 중심의 따뜻한 디자인 시스템을 구축합니다.
- 모바일 우선(Mobile-First) 반응형 디자인 및 카드 레이아웃, 모던한 라운드 코너, 그림자 효과를 적용합니다.
- 리더/관리자 페이지의 테이블, 출석 체크 컴포넌트, 캘린더 UI, 통계 그래프/차트를 위한 스타일을 정의합니다.
- 부드러운 화면 전환 애니메이션과 터치 친화적 버튼 크기(최소 48px)를 확보합니다.

#### [NEW] [app.js](file:///C:/Users/osn/.gemini/antigravity/scratch/mokyang-connect/app.js)
- **State Management**: LocalStorage 기반 Mock Database 초기화 및 CRUD 로직 작성 (초기 50명 성도 규모에 걸맞는 소그룹, 일정, 출석 데이터 자동 생성).
- **Router**: URL hash 또는 custom state 기반의 부드러운 화면 전환 라우터 구현.
- **Role Control**: `User`, `Leader`, `Admin` 권한에 따른 UI 요소 제어 및 동적 노출.
- **Features Implementation**:
  - 소모임 탐색/카테고리/검색/필터 (요일, 연령, 지역, 주제).
  - 소모임 상세 화면 및 탭 관리 (공지, 기도제목, 사진, 후기) 및 작성 기능.
  - 일정(Calendar): 월별/주별 캘린더 및 참석 예정 표시.
  - 리더 전용 출석 체크: 날짜별 성도 출석(출석, 결석, 지각) 처리 및 월별 출석 통계.
  - 기도제목 게시판: 공개 범위 설정 기능 (전체/모임/리더만).
  - 알림 센터: 모임 시작 전, 가입 승인, 공지 등록 등 푸시/알림 내역 리스트.
  - 관리자 대시보드: 통계 데이터 집계 및 차트 렌더링 (SVG/CSS 기반 혹은 Chart.js). 사용자 관리, 소모임 관리, 권한 부여, 엑셀/JSON 다운로드 기능.
  - 향후 확장 기능: 새가족, 제자훈련, QT, 성경읽기, 봉사신청, 축구모임(FC문발이음) 등 대화형 데모 화면.

---

## Verification Plan

### Manual Verification
1. **역할 전환 테스트**:
   - `성도` 계정으로 소모임 가입을 신청하고, `리더` 계정으로 전환하여 신청을 승인하고 출석 체크를 진행합니다.
   - `관리자` 계정으로 전환하여 전체 가입 현황 통계를 확인하고, 성도를 리더로 승인하는 시나리오를 테스트합니다.
2. **반응형 디자인 및 접근성**:
   - 브라우저 개발자 도구를 통해 모바일 뷰포트(iPhone 12/Pro 등)에서 UI가 깨지지 않고 큰 글씨 모드가 50대 이상 시니어 성도에게 시인성을 제공하는지 확인합니다.
3. **영속성 테스트**:
   - 출석 체크를 하거나 기도제목을 작성한 뒤 새로고침을 했을 때 데이터가 LocalStorage에 그대로 유지되는지 검증합니다.
