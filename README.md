# LookSoPrt
>
> React + Typescript + Firebase Cosmetic E-commerce
> <https://www.looksoprt.store>

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

<!-- ## 3. 데모 영상

<details>
<summary><b>펼치기</b></summary>
<div markdown="1">

### 3.1 옵션 및 검색에 따른 상품 출력

![architecture](https://user-images.githubusercontent.com/52212226/120294979-aecd3600-c301-11eb-9b25-28f1588298da.gif)

</div>
</details>

</br> -->
