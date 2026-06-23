-- 목양양육앱 (Mokyang Nurture App) 데이터베이스 스키마 정의서
-- 50명 규모의 실사용 및 로컬 DB 이전을 고려하여 외래 키 제약 조건과 인덱스를 적절히 설계했습니다.

-- 1. 기존 테이블 정리 (존재하는 경우)
DROP TABLE IF EXISTS "progress";
DROP TABLE IF EXISTS "submissions";
DROP TABLE IF EXISTS "assignments";
DROP TABLE IF EXISTS "lessons";
DROP TABLE IF EXISTS "courses";
DROP TABLE IF EXISTS "videos";
DROP TABLE IF EXISTS "devotion_responses";
DROP TABLE IF EXISTS "devotions";
DROP TABLE IF EXISTS "approvals";
DROP TABLE IF EXISTS "notices";
DROP TABLE IF EXISTS "users";

-- 2. 테이블 생성

-- 가. users (사용자 테이블)
-- 역할(role): 'pending' (가입대기), 'member' (일반성도), 'leader' (리더/교사), 'admin' (관리자)
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'pending',
    "district" TEXT, -- 교구 / 구역 정보 (예: '야당 1교구')
    "age" INTEGER,
    "gender" TEXT,
    "avatar" TEXT, -- 프로필 아바타 텍스트 또는 이미지 URL
    "registerDate" TEXT NOT NULL, -- 가입 신청일 (YYYY-MM-DD)
    "approvalDate" TEXT -- 승인 완료일 (YYYY-MM-DD)
);

-- 나. approvals (회원 승인 요청 테이블)
CREATE TABLE "approvals" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "userName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    "requestDate" TEXT NOT NULL,
    "decisionDate" TEXT,
    "comment" TEXT -- 거절 사유 또는 비고
);

-- 다. devotions (말씀묵상 테이블)
CREATE TABLE "devotions" (
    "id" TEXT PRIMARY KEY,
    "date" TEXT NOT NULL UNIQUE, -- 말씀 묵상 날짜 (YYYY-MM-DD)
    "scripture" TEXT NOT NULL, -- 성경 본문 범위 (예: '마태복음 5:1-12')
    "title" TEXT NOT NULL, -- 제목
    "content" TEXT NOT NULL, -- 말씀 설명 / 본문 내용
    "question1" TEXT NOT NULL, -- 묵상 질문 (본문에 대한 이해)
    "question2" TEXT NOT NULL, -- 적용 질문 (내 삶에 적용)
    "prayer" TEXT NOT NULL -- 오늘의 기도문
);

-- 라. devotion_responses (말씀묵상 응답 테이블)
CREATE TABLE "devotion_responses" (
    "id" TEXT PRIMARY KEY,
    "devotionId" TEXT NOT NULL REFERENCES "devotions"("id") ON DELETE CASCADE,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "userName" TEXT NOT NULL,
    "response1" TEXT NOT NULL, -- 오늘 받은 은혜
    "response2" TEXT NOT NULL, -- 삶의 적용
    "prayerRequest" TEXT, -- 기도제목
    "date" TEXT NOT NULL -- 작성 시간 (YYYY-MM-DD HH:MM)
);

-- 마. courses (성경공부 과정 테이블)
CREATE TABLE "courses" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL, -- 과정명 (예: '새가족반', '제자훈련')
    "intro" TEXT, -- 과정 소개글
    "duration" TEXT, -- 과정 기간 (예: '8주 과정')
    "thumbnail" TEXT -- 섬네일 이미지 URL
);

-- 바. lessons (강의 테이블)
CREATE TABLE "lessons" (
    "id" TEXT PRIMARY KEY,
    "courseId" TEXT NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL, -- 강의 제목
    "videoUrl" TEXT, -- 강의 영상 주소 (유튜브 등)
    "handouts" TEXT, -- 강의안 내용 또는 텍스트 다운로드 링크
    "summary" TEXT, -- 핵심 요약 정리
    "sharingQuestion" TEXT, -- 나눔 질문
    "assignment" TEXT, -- 과제 안내 내용
    "order" INTEGER NOT NULL -- 강의 순서 (1강, 2강...)
);

-- 사. videos (설교영상 테이블)
CREATE TABLE "videos" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL, -- 설교 제목
    "speaker" TEXT NOT NULL, -- 설교자
    "scripture" TEXT, -- 설교 본문
    "date" TEXT NOT NULL, -- 설교 일자 (YYYY-MM-DD)
    "youtubeUrl" TEXT NOT NULL, -- 유튜브 영상 링크
    "summary" TEXT, -- 설교 요약
    "devotionQuestion" TEXT -- 묵상 질문
);

-- 아. assignments (과제 테이블 - 강의 종속 또는 개별 등록)
CREATE TABLE "assignments" (
    "id" TEXT PRIMARY KEY,
    "lessonId" TEXT NOT NULL REFERENCES "lessons"("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TEXT
);

-- 자. submissions (과제 제출 테이블)
CREATE TABLE "submissions" (
    "id" TEXT PRIMARY KEY,
    "assignmentId" TEXT NOT NULL REFERENCES "assignments"("id") ON DELETE CASCADE,
    "lessonId" TEXT NOT NULL REFERENCES "lessons"("id") ON DELETE CASCADE,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "userName" TEXT NOT NULL,
    "content" TEXT NOT NULL, -- 과제 제출 내용 (텍스트)
    "date" TEXT NOT NULL, -- 제출 일시
    "feedback" TEXT, -- 교사/관리자의 피드백/댓글
    "feedbackAuthor" TEXT -- 피드백 작성자 이름
);

-- 차. progress (성도 학습 진도 테이블)
CREATE TABLE "progress" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "courseId" TEXT NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
    "completedLessons" TEXT, -- 완료된 강의 ID 목록 (콤마 구분자 또는 JSON Array 문자열, 예: 'l1,l2,l3')
    "submittedAssignments" TEXT, -- 제출한 과제 ID 목록 (콤마 구분자 또는 JSON Array 문자열)
    "lastAccessDate" TEXT NOT NULL -- 마지막 학습/접속 일자
);

-- 카. notices (공지사항 테이블)
CREATE TABLE "notices" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "authorName" TEXT NOT NULL DEFAULT '관리자'
);

-- 3. 유용한 조회 및 성능 최적화를 위한 인덱스 생성
CREATE INDEX "idx_users_role" ON "users"("role");
CREATE INDEX "idx_devotion_responses_user" ON "devotion_responses"("userId");
CREATE INDEX "idx_devotion_responses_date" ON "devotion_responses"("devotionId", "userId");
CREATE INDEX "idx_lessons_course" ON "lessons"("courseId");
CREATE INDEX "idx_submissions_assignment" ON "submissions"("assignmentId");
CREATE INDEX "idx_progress_user" ON "progress"("userId");
CREATE INDEX "idx_progress_user_course" ON "progress"("userId", "courseId");
