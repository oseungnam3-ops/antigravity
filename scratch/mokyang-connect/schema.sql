-- Mokyang Connect - Supabase Schema & Seed Data

-- 1. DROP existing tables if they exist
DROP TABLE IF EXISTS "notifications";
DROP TABLE IF EXISTS "applications";
DROP TABLE IF EXISTS "photos";
DROP TABLE IF EXISTS "reviews";
DROP TABLE IF EXISTS "notices";
DROP TABLE IF EXISTS "prayers";
DROP TABLE IF EXISTS "attendance";
DROP TABLE IF EXISTS "meetings";
DROP TABLE IF EXISTS "groups";
DROP TABLE IF EXISTS "users";

-- 2. Create Tables with CamelCase columns matching INITIAL_DB

-- Users Table
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "district" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "avatar" TEXT,
    "groups" TEXT[] DEFAULT '{}'
);

-- Groups Table
CREATE TABLE "groups" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "leaderId" TEXT REFERENCES "users"("id") ON DELETE SET NULL,
    "leaderName" TEXT,
    "intro" TEXT,
    "location" TEXT,
    "day" TEXT,
    "time" TEXT,
    "ageGroup" TEXT,
    "district" TEXT,
    "capacity" INTEGER,
    "members" TEXT[] DEFAULT '{}',
    "theme" TEXT,
    "img" TEXT
);

-- Meetings Table
CREATE TABLE "meetings" (
    "id" TEXT PRIMARY KEY,
    "groupId" TEXT REFERENCES "groups"("id") ON DELETE CASCADE,
    "groupName" TEXT,
    "date" TEXT,
    "time" TEXT,
    "location" TEXT,
    "attendees" TEXT[] DEFAULT '{}'
);

-- Attendance Table
CREATE TABLE "attendance" (
    "id" SERIAL PRIMARY KEY,
    "meetingId" TEXT,
    "groupId" TEXT REFERENCES "groups"("id") ON DELETE CASCADE,
    "date" TEXT,
    "memberId" TEXT REFERENCES "users"("id") ON DELETE CASCADE,
    "status" TEXT
);

-- Prayers Table
CREATE TABLE "prayers" (
    "id" TEXT PRIMARY KEY,
    "groupId" TEXT REFERENCES "groups"("id") ON DELETE CASCADE,
    "groupName" TEXT,
    "authorId" TEXT REFERENCES "users"("id") ON DELETE SET NULL,
    "authorName" TEXT,
    "title" TEXT,
    "content" TEXT,
    "visibility" TEXT,
    "date" TEXT,
    "answers" TEXT[] DEFAULT '{}'
);

-- Notices Table
CREATE TABLE "notices" (
    "id" TEXT PRIMARY KEY,
    "groupId" TEXT REFERENCES "groups"("id") ON DELETE CASCADE,
    "authorName" TEXT,
    "title" TEXT,
    "content" TEXT,
    "date" TEXT
);

-- Reviews Table
CREATE TABLE "reviews" (
    "id" TEXT PRIMARY KEY,
    "groupId" TEXT REFERENCES "groups"("id") ON DELETE CASCADE,
    "authorName" TEXT,
    "content" TEXT,
    "date" TEXT
);

-- Photos Table
CREATE TABLE "photos" (
    "id" TEXT PRIMARY KEY,
    "groupId" TEXT REFERENCES "groups"("id") ON DELETE CASCADE,
    "img" TEXT,
    "caption" TEXT,
    "date" TEXT
);

-- Applications Table
CREATE TABLE "applications" (
    "id" TEXT PRIMARY KEY,
    "groupId" TEXT REFERENCES "groups"("id") ON DELETE CASCADE,
    "userId" TEXT REFERENCES "users"("id") ON DELETE CASCADE,
    "userName" TEXT,
    "userDistrict" TEXT,
    "userAge" INTEGER,
    "status" TEXT,
    "date" TEXT
);

-- Notifications Table
CREATE TABLE "notifications" (
    "id" TEXT PRIMARY KEY,
    "userId" TEXT REFERENCES "users"("id") ON DELETE CASCADE,
    "title" TEXT,
    "message" TEXT,
    "date" TEXT,
    "read" BOOLEAN DEFAULT FALSE
);

-- 3. Enable RLS or Set public access for prototype simplicity
-- For development simplicity, let's create a policy that allows all operations.
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "meetings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "attendance" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "prayers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notices" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "photos" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "applications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notifications" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for users" ON "users" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for groups" ON "groups" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for meetings" ON "meetings" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for attendance" ON "attendance" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for prayers" ON "prayers" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for notices" ON "notices" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for reviews" ON "reviews" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for photos" ON "photos" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for applications" ON "applications" FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for notifications" ON "notifications" FOR ALL USING (true) WITH CHECK (true);


-- 4. INSERT Seed Data (Mock Database)

-- Seed Users
INSERT INTO "users" ("id", "name", "role", "age", "gender", "district", "phone", "email", "avatar", "groups") VALUES
('u1', '이목사', 'admin', 48, 'male', '파주 야당동', '010-1234-5678', 'pastor@mokyang.org', '이', '{}'),
('u2', '박리더', 'leader', 39, 'male', '파주 목동동', '010-2345-6789', 'park@mokyang.org', '박', '{"g1", "g3"}'),
('u3', '김성도', 'member', 52, 'female', '파주 다율동', '010-3456-7890', 'kim@gmail.com', '김', '{"g1"}'),
('u4', '최은혜', 'member', 26, 'female', '파주 야당동', '010-4567-8901', 'choi@naver.com', '최', '{"g2"}'),
('u5', '정소망', 'leader', 45, 'female', '파주 금촌동', '010-5678-9012', 'hope@daum.net', '정', '{"g4"}'),
('u6', '강신성', 'member', 61, 'male', '파주 와동동', '010-6789-0123', 'kang@naver.com', '강', '{"g1", "g4"}'),
('u7', '윤청년', 'leader', 28, 'male', '파주 동패동', '010-7890-1234', 'yoon@gmail.com', '윤', '{"g2"}'),
('u8', '홍축구', 'leader', 35, 'male', '파주 와동동', '010-8901-2345', 'hong@gmail.com', '홍', '{"g5"}'),
('u9', '한사랑', 'member', 55, 'female', '파주 야당동', '010-9012-3456', 'han@naver.com', '한', '{"g4"}');

-- Seed Groups
INSERT INTO "groups" ("id", "name", "category", "leaderId", "leaderName", "intro", "location", "day", "time", "ageGroup", "district", "capacity", "members", "theme", "img") VALUES
('g1', '소망 목장', '목장', 'u2', '박리더', '따뜻한 사랑과 풍성한 나눔이 있는 소망 목장입니다. 매주 금요일 저녁에 모여 삶을 나눕니다.', '교회 소그룹실 2층', '금요일', '20:00', '장년', '목동동/야당동', 12, '{"u2", "u3", "u6"}', '나눔/친교', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=60'),
('g2', '시온 청년 모임', '청년', 'u7', '윤청년', '청년들의 열정과 비전, 깊은 말씀 묵상이 있는 청년 모임입니다. 매주 주일 예배 후 모입니다.', '청년부실', '주일', '14:00', '청년', '파주 전역', 20, '{"u7", "u4"}', '교제/말씀', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=60'),
('g3', '목요 마태 성경공부', '성경공부', 'u2', '박리더', '마태복음을 한 장씩 깊이 있게 고찰하며 삶에 적용하는 성경공부 반입니다.', '교회 세미나실', '목요일', '10:30', '기타', '파주 전역', 10, '{"u2"}', '성경공부', 'https://images.unsplash.com/photo-1504052434569-70ad58c6544f?w=500&auto=format&fit=crop&q=60'),
('g4', '어머니 기도회', '기도모임', 'u5', '정소망', '가정과 자녀, 교회를 위해 눈물로 씨를 뿌리는 어머니들의 기도 연대입니다.', '본당 지하 예배실', '화요일', '10:00', '여성', '금촌동/와동동', 15, '{"u5", "u6", "u9"}', '기도', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60'),
('g5', 'FC문발이음 축구회', '운동', 'u8', '홍축구', '문발운동장에서 매주 토요일 아침 땀 흘리며 친목을 다지고 복음을 전하는 축구 모임입니다.', '문발 체육공원', '토요일', '07:00', '남성', '문발동/교하', 25, '{"u8"}', '축구/친목', 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&auto=format&fit=crop&q=60');

-- Seed Meetings
INSERT INTO "meetings" ("id", "groupId", "groupName", "date", "time", "location", "attendees") VALUES
('m1', 'g1', '소망 목장', '2026-06-26', '20:00', '교회 소그룹실 2층', '{"u2", "u3", "u6"}'),
('m2', 'g2', '시온 청년 모임', '2026-06-28', '14:00', '청년부실', '{"u7", "u4"}'),
('m3', 'g4', '어머니 기도회', '2026-06-23', '10:00', '본당 지하 예배실', '{"u5", "u6", "u9"}'),
('m4', 'g5', 'FC문발이음 축구회', '2026-06-27', '07:00', '문발 체육공원', '{"u8"}');

-- Seed Attendance
INSERT INTO "attendance" ("meetingId", "groupId", "date", "memberId", "status") VALUES
('mp1', 'g1', '2026-06-12', 'u2', 'present'),
('mp1', 'g1', '2026-06-12', 'u3', 'present'),
('mp1', 'g1', '2026-06-12', 'u6', 'late'),
('mp2', 'g1', '2026-06-19', 'u2', 'present'),
('mp2', 'g1', '2026-06-19', 'u3', 'absent'),
('mp2', 'g1', '2026-06-19', 'u6', 'present'),
('mp3', 'g4', '2026-06-09', 'u5', 'present'),
('mp3', 'g4', '2026-06-09', 'u6', 'present'),
('mp3', 'g4', '2026-06-09', 'u9', 'present'),
('mp4', 'g4', '2026-06-16', 'u5', 'present'),
('mp4', 'g4', '2026-06-16', 'u6', 'absent'),
('mp4', 'g4', '2026-06-16', 'u9', 'late');

-- Seed Prayers
INSERT INTO "prayers" ("id", "groupId", "groupName", "authorId", "authorName", "title", "content", "visibility", "date", "answers") VALUES
('p1', 'g1', '소망 목장', 'u3', '김성도', '가정의 건강을 위해', '남편의 갑작스러운 디스크 수술 일정이 잡혔습니다. 통증 없이 무사히 끝나고 속히 회복되도록 함께 기도해 주세요.', 'group', '2026-06-20', '{"주님 역사하여 주소서. 힘내세요 김 자매님! (박리더)"}'),
('p2', 'g2', '시온 청년 모임', 'u4', '최은혜', '취업 준비와 비전을 위해', '이달 말에 있을 면접에 주님의 평강이 임하게 하시고 저에게 꼭 맞는 길을 예비해 주시길 기도합니다.', 'public', '2026-06-22', '{}'),
('p3', 'g4', '어머니 기도회', 'u9', '한사랑', '자녀의 믿음 회복을 위해', '둘째 아이가 대학 진학 이후 교회를 멀리하고 있습니다. 다시 주님을 인격적으로 만나 예배의 기쁨을 회복하도록 기도 부탁드립니다.', 'leader', '2026-06-18', '{"늘 기도하고 있습니다. 힘내십시오! (이목사)"}');

-- Seed Notices
INSERT INTO "notices" ("id", "groupId", "authorName", "title", "content", "date") VALUES
('n1', 'g1', '박리더', '이번 주 모임 장소 변경 공지', '이번 금요일(6/26) 소망 목장 모임은 장로님 댁이 아니라 교회 2층 소그룹실에서 진행합니다. 저녁 식사를 함께할 예정이니 10분 전까지 도착 바랍니다.', '2026-06-22'),
('n2', 'g2', '윤청년', '하반기 연합 수련회 수요 조사', '8월 중순 예정된 연합 수련회 일정 및 장소 조사를 하니 청년 단톡방이나 여기에 댓글로 피드백 부탁해요!', '2026-06-21');

-- Seed Reviews
INSERT INTO "reviews" ("id", "groupId", "authorName", "content", "date") VALUES
('r1', 'g1', '박리더', '어제 목장 모임은 4가정이 함께 모여 큰 은혜와 눈물이 있었습니다. 서로의 짐을 나눠 지는 공동체이길 소망합니다.', '2026-06-20'),
('r2', 'g4', '정소망', '어머니 기도회 모임을 통해 상처받은 마음들이 위로받고 회복되는 시간을 가졌습니다. 기도의 자리는 늘 기쁨이 넘칩니다.', '2026-06-16');

-- Seed Photos
INSERT INTO "photos" ("id", "groupId", "img", "caption", "date") VALUES
('ph1', 'g1', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&auto=format&fit=crop&q=60', '소망 목장 다과 시간', '2026-06-19'),
('ph2', 'g4', 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=60', '기도회 후 차 한 잔', '2026-06-16');

-- Seed Applications
INSERT INTO "applications" ("id", "groupId", "userId", "userName", "userDistrict", "userAge", "status", "date") VALUES
('a1', 'g1', 'u4', '최은혜', '야당동', 26, 'pending', '2026-06-23');

-- Seed Notifications
INSERT INTO "notifications" ("id", "userId", "title", "message", "date", "read") VALUES
('nt1', 'u2', '새로운 가입 신청', '최은혜 성도님이 ''소망 목장'' 가입을 신청하셨습니다.', '2026-06-23', false),
('nt2', 'u3', '공지사항 등록', '소망 목장에 새로운 공지사항이 등록되었습니다.', '2026-06-22', false),
('nt3', 'u9', '기도 응답 완료', '작성하신 기도제목에 이목사님이 댓글을 남기셨습니다.', '2026-06-18', true);
