# LookSoPrt
>
> React + Typescript + Firebase Cosmetic E-commerce

`npm`

```Shell
git clone git@github.com:hwb0218/look-so-p.git
cd look-so-p
npm install
npm run dev
```  

`yarn`

```Shell
git clone git@github.com:hwb0218/look-so-p.git
cd look-so-p
yarn install
yarn run dev
```  

</br>

## 1. 제작 기간 & 참여 인원

- <https://www.looksoprt.store>
- 1차 배포: 2024/01/25 ~ 2024/02/29
- 2차 배포: 2024/02/29 ~
- 개인 프로젝트

</br>

## 2. 사용 기슬

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React--Query-f04f3d?style=flat-square&logo=ReactQuery&logoColor=white"/>
  <img src="https://img.shields.io/badge/Context--API-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
</div>

<div>
  <img src="https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=amazons3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_CloudFront-FF9900?style=flat-square&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon_Route53-8C4FFF?style=flat-square&logo=amazonroute53&logoColor=white"/>
</div>

### 2.1 아키텍쳐

<img src="https://github.com/hwb0218/look-so-p/assets/52212226/71d1580f-27e9-43d2-96df-bb90dc3af0b8" alt="Image 1" width="100%">

### 2.2 기술적 의사결정

| 사용 기술 | 설명 |
| --- | --- |
| TypeScript | 코드 작성 단계에서 타입 체크로 오류 방지, 컴파일 과정 중 에러 검출 및 강력한 autocomplete 기능을 제공 |
| TailwindCSS | CSS 클래스명을 고민하지 않아도 되며 유틸리티 클래스 사용으로 일관적인 디자인 시스템을 제공, 파일 전환의 필요없이 JSX 내부에서 스타일링 가능  |
| React-Query | 데이터 요청 관련 보일러 플레이트 코드 최소화, 응답 데이터 캐싱으로 네트워크 사용량 절감 및 앱 성능 향상, 에러 및 로딩 상태 처리, 백그라운드에서 데이터 자동 업데이트 가능 |
| Firebase | 손쉬운 사용자 인증, 파이어스토어 데이터베이스, 파일 스토리지 등 다양한 기능의 제공으로 서버구축 시 발생하는 시간적 비용 절감  |
| Vite | 기타 번들러 대비 개발 서버 구동시간 개선, 의존성 설치 시 pre-bundling을 통한 빌드 속도 개선, Native ESM을 활용한 빠른 소스 코드 갱신 속도 |
| Shadcn/ui | 재사용 가능한 컴포넌트의 모음으로 Compound component 패턴으로 구성되어 있어 유연하게 사용 가능, 손쉬운 스타일 커스텀, 일관된 디자인 시스템 제공, 별도의 패키지를 요구하지 않아 번들사이즈 개선|
| react-hook-form | 비제어 컴포넌트를 이용한 입력 form을 다루기 때문에 리렌더링 최소화로 인한 앱 성능 향상, 작은 사이즈로 번들 사이즈 축소  |
| zod | react-hook-form과 결합하여 사용시 form 유효성 검사 코드를 줄일 수 있고 직관적인 API 제공으로 유효성 검사 규칙을 간결하게 표현 가능 |

</br>

## 3. 트러블슈팅

<details>
<summary><b>1. throw Error의 에러 전파</b></summary>
<div markdown="1">

#### 문제

- 등록 상품 수정 시 이미지를 제외한 입력 필드만 변경했을 경우 invalidateQueries가 호출되지 않음
  
#### 원인

- throw된 에러는 catch block에서 처리하지 않으면 호출자 방향으로 점진적 전파된다.
- storageService.deleteFiles 메소드 내부에서 fileURLs 인자가 배열이 아니거나 undefined일 경우 throw Error를 던지므로
다음 코드가 실행되지 않고 호출자의 catch block으로 코드 흐름이 넘어갔음

<img width="750" alt="스크린샷 2024-02-06 오후 8 49 43" src="https://github.com/hwb0218/look-so-p/assets/52212226/81e32c2e-0ed4-41fb-9c80-d3ff1df373d2">

#### 해결

- 에러를 던지지 않도록 throw Error 코드를 제거

<img width="750" alt="스크린샷 2024-02-06 오후 8 49 59" src="https://github.com/hwb0218/look-so-p/assets/52212226/4293e49d-8760-4dbd-a654-2cda8fa032db">

</div>
</details>

<details>
<summary><b>2. 장바구니에 새로 추가된 상품의 수량 변경</b></summary>
<div markdown="1">

#### 문제

- 장바구니에 새롭게 추가된 상품의 수량 변경 시 고정적으로 표시됨
- 낙관적 업데이트를 수행하는 코드에서 문제가 발생

#### 원인

- 상품 수량 변경은 파이어스토어와 통신하여 DB의 goodsCount 필드값을 변경하고 있음
- useMutation의 onMuation에서 새롭게 추가된 장바구니 상품은 파이어스토어의 document id값이 아직 생성되지 않은 상태이므로 수량 변경이 불가능

<img width="750" alt="스크린샷 2024-02-17 오전 5 34 52" src="https://github.com/hwb0218/look-so-p/assets/52212226/e4c3ed00-728d-450c-8697-3e2da3842f0e">

#### 해결

- onSuccess를 이용해 응답 데이터를 받아오도록 수정

<img width="750" alt="스크린샷 2024-02-17 오전 5 34 52" src="https://github.com/hwb0218/look-so-p/assets/52212226/931e3816-1c7a-4f9a-aab5-4b94a44aff1a">

</div>
</details>

<details>
<summary><b>3. 장바구니 체크박스 동작 오류</b></summary>
<div markdown="1">

#### 문제

- 장바구니 상품 수량 변경 시 개별 체크박스가 동작하지 않음
- checkedGoods 배열 요소가 객체인데 참조를 비교하고 있어 버그가 발생한 것으로 판단

#### 원인

- checkedGoods.includes(cartGoods) 코드는 checkedGoods 배열 내의 객체가 cartGoods와 정확히 동일한 참조를 가지고 있는지 확인
- 수량을 변경하면 checkedGoods 배열 요소의 goodsCount를 업데이트하고 새로운 배열을 반환하므로 객체 참조가 변경됨

<img width="750" alt="스크린샷 2024-02-16 오후 7 07 13" src="https://github.com/hwb0218/look-so-p/assets/52212226/2bf8b92b-ffb0-46dd-821d-81c0ac2dc243">

<img width="750" alt="스크린샷 2024-02-16 오후 7 15 05" src="https://github.com/hwb0218/look-so-p/assets/52212226/88e7f743-e638-48d6-97f6-0f6983f8f747">

#### 해결

- checkedGoods.some((goods) => goods.id === cartGoods.id) 코드는 checkedGoods 배열 내의 각 객체의 id 프로퍼티와 cartGoods.id를 직접 비교

<img width="750" alt="스크린샷 2024-02-16 오후 7 05 51" src="https://github.com/hwb0218/look-so-p/assets/52212226/ebf5a00e-a36c-426d-874d-6c875fbf91ee">

<img width="750" alt="스크린샷 2024-02-16 오후 7 14 44" src="https://github.com/hwb0218/look-so-p/assets/52212226/7a106240-aa79-460d-929d-c7690ebd36fa">

</div>
</details>

<details>
<summary><b>4. Protected Route 미동작</b></summary>
<div markdown="1">

#### 문제

- seller가 아니거나 비로그인 유저임에도 특정 페이지에 방문할 수 있음
- 어드민 권한이 필요한 라우트에 접속할 수 있는 현상이 발생  

#### 원인

- 권한에 따른 분기처리가 미적용됨
- 분기처리 코드 내부에서 Naviagete 컴포넌트를 반환하지 않아 children이 렌더링됨

#### 해결

- 어드민 권한에 따른 분기처리를 추가
- if 블럭에서 Navigate 컴포넌트를 반환하지 않을 경우 children이 렌더링 되는 현상을 수정

<img width="750" alt="스크린샷 2024-02-28 오전 6 07 31" src="https://github.com/hwb0218/look-so-p/assets/52212226/85796e69-ee3a-4bba-b885-9c3c86f5ae95">

<img width="750" alt="스크린샷 2024-02-28 오전 6 07 25" src="https://github.com/hwb0218/look-so-p/assets/52212226/5615c22b-b4e2-4cdb-a418-64039071c597">

</div>
</details>

<details>
<summary><b>5. 상품 상세 페이지의 스크롤 위치</b></summary>
<div markdown="1">

#### 문제

- 상세 페이지로 진입했을 경우 이전 페이지의 스크롤 위치에 따라 고정되는 문제

#### 원인

- 데이터 pre-fetch를 통해 페이지 전환을 수행할 경우 이전 페이지의 스크롤 위치가 고정되었음

<img width="500" alt="스크린샷 2024-03-16 오전 1 03 15" src="https://github.com/hwb0218/look-so-p/assets/52212226/36a32733-7a5a-4884-b6de-65bdab0544e4">

#### 해결

- 의존성 배열요소 pathname의 변화가 발생할 경우 스크롤을 최상단으로 이동시킴

<img width="500" alt="스크린샷 2024-03-16 오전 1 04 10" src="https://github.com/hwb0218/look-so-p/assets/52212226/b0ca662c-9207-4a6e-89b0-d61c69cea6b0">

</div>
</details>

<!-- ## 3. 데모 영상

<details>
<summary><b>펼치기</b></summary>
<div markdown="1">

### 3.1 옵션 및 검색에 따른 상품 출력

![architecture](https://user-images.githubusercontent.com/52212226/120294979-aecd3600-c301-11eb-9b25-28f1588298da.gif)

</div>
</details>

</br> -->
