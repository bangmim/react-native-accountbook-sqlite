-- 보안 강화: View를 사용하여 email만 노출

-- 1. username_lookup 뷰 생성 (email만 노출)
CREATE OR REPLACE VIEW username_lookup AS
SELECT username, email
FROM users;

-- 2. 뷰에 대한 RLS는 필요 없음 (뷰 자체가 email만 노출)

-- 3. users 테이블의 RLS 정책 (기존 유지)
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Anyone can lookup email by username" ON users;

-- users 테이블은 인증된 사용자만 자신의 데이터 조회 가능
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- 참고: username_lookup 뷰는 모든 사용자가 조회 가능하지만,
-- email과 username만 노출되므로 보안상 안전합니다.

