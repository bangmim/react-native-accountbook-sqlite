import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../components/Header/Header';
import {SingleLineInput} from '../components/SingleLineInput';
import {Spacer} from '../components/Spacer';
import {useAuth} from '../hooks/useAuth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export const LoginScreen: React.FC = () => {
  const {signInWithUsername, signUp} = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState(''); // 로그인/회원가입 시 아이디
  const [email, setEmail] = useState(''); // 회원가입 시 이메일
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState(''); // 회원가입 시 닉네임
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (isSignUp) {
      // 회원가입 검증
      if (!email || !username || !password) {
        Alert.alert('오류', '이메일, 아이디, 비밀번호를 모두 입력해주세요.');
        return;
      }
      if (password.length < 6) {
        Alert.alert('오류', '비밀번호는 6자 이상이어야 합니다.');
        return;
      }
      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.');
        return;
      }
    } else {
      // 로그인 검증
      if (!username || !password) {
        Alert.alert('오류', '아이디와 비밀번호를 입력해주세요.');
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const {error} = await signUp(email, password, username, nickname);
        if (error) {
          Alert.alert('회원가입 실패', error.message);
        } else {
          Alert.alert('성공', '회원가입이 완료되었습니다!');
          setIsSignUp(false);
          setEmail('');
          setUsername('');
          setPassword('');
          setNickname('');
        }
      } else {
        const {error} = await signInWithUsername(username, password);
        if (error) {
          Alert.alert('로그인 실패', error.message);
        }
        // 성공 시 useAuth의 onAuthStateChange가 자동으로 처리
      }
    } catch (error: any) {
      Alert.alert('오류', error.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [
    email,
    username,
    password,
    nickname,
    isSignUp,
    signInWithUsername,
    signUp,
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 24,
          }}>
          <Header>
            <Header.Title title={isSignUp ? '회원가입' : '로그인'} />
          </Header>

          <Spacer space={48} />

          <View>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 8}}>
              {isSignUp ? '새 계정 만들기' : '가계부에 오신 것을 환영합니다'}
            </Text>
            <Text style={{fontSize: 16, color: 'gray', marginBottom: 32}}>
              {isSignUp
                ? '이메일, 아이디, 비밀번호를 입력해주세요 (닉네임은 선택사항)'
                : '아이디와 비밀번호를 입력해주세요'}
            </Text>

            <SingleLineInput
              value={username}
              onChangeText={setUsername}
              placeholder="아이디"
              fontSize={16}
            />
            <Spacer space={16} />
            {isSignUp && (
              <>
                <SingleLineInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="이메일"
                  keyboardType="email-address"
                  fontSize={16}
                />
                <Spacer space={16} />
                <SingleLineInput
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="닉네임 (선택)"
                  fontSize={16}
                />
                <Spacer space={16} />
              </>
            )}

            <View
              style={{
                alignSelf: 'stretch',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: passwordFocused ? 'black' : 'gray',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호 (6자 이상)"
                secureTextEntry={!showPassword}
                style={{
                  fontSize: 16,
                  paddingVertical: 0,
                  flex: 1,
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={{padding: 4}}>
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  size={20}
                  color="gray"
                />
              </Pressable>
            </View>

            <Spacer space={32} />

            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              style={{
                backgroundColor: loading ? 'gray' : 'black',
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                {loading ? '처리 중...' : isSignUp ? '회원가입' : '로그인'}
              </Text>
            </Pressable>

            <Spacer space={16} />

            <Pressable
              onPress={() => setIsSignUp(!isSignUp)}
              style={{alignItems: 'center'}}>
              <Text style={{color: 'gray', fontSize: 14}}>
                {isSignUp
                  ? '이미 계정이 있으신가요? 로그인'
                  : '계정이 없으신가요? 회원가입'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
