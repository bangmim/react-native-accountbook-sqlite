# 설정 가이드

## 1. Supabase 설정

### 1.3 인증 설정

1. Supabase 대시보드 > Authentication > Providers로 이동
2. Email provider가 활성화되어 있는지 확인
3. 필요시 Email templates를 커스터마이징

## 2. AdMob 설정

### 2.1 AdMob 계정 생성

1. [Google AdMob](https://admob.google.com)에 가입합니다.
2. 새 앱을 등록합니다 (iOS와 Android 각각).

### 2.2 광고 단위 생성

1. AdMob 콘솔 > 광고 단위로 이동
2. 배너 광고 단위를 생성합니다.
3. 광고 단위 ID를 복사합니다.

### 2.3 설정 파일 업데이트

`src/config/admob.ts` 파일을 열고 다음 값을 입력하세요:

```typescript
export const ADMOB_APP_ID = 'YOUR_ADMOB_APP_ID'; // AdMob 앱 ID
export const BANNER_AD_UNIT_ID = 'YOUR_BANNER_AD_UNIT_ID'; // 배너 광고 단위 ID
```

### 2.4 Android 설정

#### android/app/build.gradle

다음 코드를 추가하세요:

```gradle
dependencies {
    // ... 기존 dependencies
    implementation 'com.google.android.gms:play-services-ads:22.6.0'
}
```

#### android/app/src/main/AndroidManifest.xml

`<application>` 태그 안에 다음을 추가하세요:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="YOUR_ADMOB_APP_ID"/>
```

### 2.5 iOS 설정

#### ios/Podfile

다음 코드가 있는지 확인하세요 (없으면 추가):

```ruby
pod 'Google-Mobile-Ads-SDK'
```

터미널에서 실행:

```bash
cd ios && pod install
```

#### ios/YourApp/Info.plist

다음 키를 추가하세요:

```xml
<key>GADApplicationIdentifier</key>
<string>YOUR_ADMOB_APP_ID</string>
```

## 3. 네이티브 모듈 링크

### Android

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS

```bash
cd ios
pod install
cd ..
npm run ios
```

## 4. 테스트

### Supabase 테스트

- 앱을 실행하고 회원가입/로그인을 테스트합니다.
- Supabase 대시보드 > Authentication > Users에서 사용자가 생성되었는지 확인합니다.

### AdMob 테스트

- 개발 모드에서는 자동으로 테스트 광고가 표시됩니다.
- 실제 광고를 테스트하려면 AdMob 콘솔에서 테스트 기기를 등록하세요.

## 5. 주의사항

1. **Supabase URL과 Key는 절대 공개 저장소에 커밋하지 마세요!**

   - `.env` 파일을 사용하거나 환경 변수로 관리하는 것을 권장합니다.

2. **AdMob 정책 준수**

   - 광고를 클릭하도록 유도하는 UI를 만들지 마세요.
   - 광고와 콘텐츠를 명확히 구분하세요.

3. **프로덕션 배포 전**
   - 테스트 광고 ID를 실제 광고 단위 ID로 변경하세요.
   - AdMob 앱 ID를 실제 앱 ID로 변경하세요.
