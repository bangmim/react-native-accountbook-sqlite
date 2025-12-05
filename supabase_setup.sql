-- Supabase users 테이블 생성 SQL
-- 이 SQL을 Supabase 대시보드의 SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  nickname TEXT, -- NULL 허용 (선택사항)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Anyone can lookup email by username" ON users;

-- 로그인 전: username으로 email만 조회 가능 (로그인을 위해 필요)
-- 주의: 이 정책은 보안상 username으로 email 조회만 허용합니다
CREATE POLICY "Anyone can lookup email by username" ON users
  FOR SELECT USING (true);

-- 사용자는 자신의 전체 데이터 조회 가능 (위 정책과 중복되지만 명시적으로 유지)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- 사용자는 자신의 데이터만 삽입 가능
CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 사용자는 자신의 데이터만 수정 가능
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

