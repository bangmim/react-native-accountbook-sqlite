-- RLS 정책 수정: 로그인 전에도 username으로 email 조회 가능하도록

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Anyone can lookup email by username" ON users;

-- username으로 email 조회 허용 (로그인 전에도 접근 가능)
-- 이 정책은 SELECT만 허용하고, 모든 행에 대해 true를 반환
CREATE POLICY "Anyone can lookup email by username" ON users
  FOR SELECT 
  USING (true);

-- 사용자는 자신의 전체 데이터 조회 가능 (위 정책과 중복되지만 명시적으로 유지)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT 
  USING (auth.uid() = id);

