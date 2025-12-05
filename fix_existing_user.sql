-- 기존 사용자를 users 테이블에 추가하는 SQL
-- auth.users에는 있지만 users 테이블에 없는 경우 사용

-- 방법 1: 특정 사용자만 추가 (위에서 본 사용자 정보 기준)
INSERT INTO users (id, username, email, nickname)
VALUES (
  '91e9440e-6f51-4531-9153-447455752948',
  'hiooo01',
  'hiooo01@jxjtech.co.kr',
  'hihihahahoho'
)
ON CONFLICT (id) DO NOTHING;  -- 이미 있으면 무시

-- 방법 2: auth.users에 있는 모든 사용자를 users 테이블에 추가
-- (user_metadata에서 username과 nickname을 가져옴)
INSERT INTO users (id, username, email, nickname)
SELECT 
  au.id,
  COALESCE(au.raw_user_meta_data->>'username', split_part(au.email, '@', 1)) as username,
  au.email,
  COALESCE(au.raw_user_meta_data->>'nickname', '') as nickname
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM users u WHERE u.id = au.id
)
ON CONFLICT (id) DO NOTHING;

