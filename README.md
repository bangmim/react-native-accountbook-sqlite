# AccountBook

- 초기화면

* 최초 진입시 이번달 총 금액 보임
* 월별 통계 보러가기 누르면 월에 사용한 총 금액을 월별로 비교해볼 수 있는 화면으로 이동
* 이번달에 사용한 내역 리스트를 해당 화면에서 볼 수 있음
* 하단의 '+' 버튼을 누르면 추가 화면으로 이동
* 내역을 누르면 상세화면으로 이동

- 등록화면

* 사용 및 수입에 대해 toogle형태로 지정
* 사용 내용 입력 가능
* 사용 일시를 누르면 DatePicker 이용하여 설정
* 이미지 영역 누르면 촬영할 수 있음
* 선택된 이미지가 없는 경우 +아이콘
* 금액 입력 가능
* 등록하기 누르면 등록

- 상세화면

* 사용 및 수입에 대해 보여줌
* 저장된 사용 내용, 일시, 금액 보여줌
* 이미지 있는 경우 보여줌
* 수정하기 누를 시 수정하기 위한 화면으로 이동
* 삭제버튼 누를시 한번 더 확인하고 삭제처리

- 수정화면

* 지정된 사용, 수입은 변경 불가
* 사용내용, 일시, 이미지 수정 가능 (이미지 없는 경우 +아이콘)
* 금액 입력 가능
* 수정하기 버튼 누르면 수정 완료

* 월별 통계화면

- 월별 사용 데이터를 막대그래프로 보여줌
- 최근 3개월간 해당하는 월별 사용 데이터를 보여줌
- 월별 데이터 안에는 사용과 수입에 대한 부분을 구분해서 보여줌

\*\* 설치
npm install --save @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install --save react-native-screens react-native-safe-area-context
npm i --save @fortawesome/react-native-fontawesome @fortawesome/fontawesome-svg-core react-native-svg
npm i --save @fortawesome/free-solid-svg-icons
npm install --save react-native-calendars
npm i react-native-vision-camera (권한 추가)
npm install @react-native-camera-roll/camera-roll --save (캐시된 저장경로를 변경할 수 있는 // permission 추가! 안그러면 강제종료됨)
npm install react-native-chart-kit --save
pm install react-native-svg --save

\* 데이터 저장 > react-native-sqlit-storage(sqLite : sql+lite 합성어/ 모바일에서 사용하기 적합) \*/
npm install --save react-native-sqlite-storage
@types/react-native-sqlite-storage
react-native.config.js 파일 만들기
새로운 데이터베이스 > 경로를 폴더로 설정
ios>프로젝트폴더 > www 폴더 만들기
만들어진 db 파일 복사해서 붙여넣기(account_history.db)
android > app> src>main> assets 폴더 만들기 > www 폴더 만들기
붙여넣기
xcode에서 add to file >> db파일 선택 >> 체크박스 : reference (기본체크 : group 아님!)
