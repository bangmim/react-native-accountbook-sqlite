-- 보안 강화된 RLS 정책
-- username으로 email만 조회 가능하도록 제한

-- 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Anyone can lookup email by username" ON users;

-- 방법 1: View를 사용하여 email만 노출 (가장 안전)
-- username_lookup 뷰 생성 (email만 노출)
CREATE OR REPLACE VIEW username_lookup AS
SELECT username, email
FROM users;

-- 뷰에 대한 RLS 정책 (모든 사용자가 조회 가능)
ALTER VIEW username_lookup SET (security_invoker = true);

-- 방법 2: RLS 정책을 더 구체적으로 설정
-- username으로 조회할 때만 허용 (하지만 여전히 모든 컬럼 조회 가능)
-- 이 방법은 완벽하지 않지만, 코드에서 .select('email')만 사용하므로 실질적으로는 안전

-- 방법 3: Edge Function 사용 (가장 안전하지만 복잡)
-- 이 방법은 별도로 구현해야 함

-- 현재 가장 실용적인 방법: View 사용
-- 코드에서 users 대신 username_lookup 뷰를 사용하도록 변경 필요

