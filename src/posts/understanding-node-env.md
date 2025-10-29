---
layout: "base.njk"
title: "NODE_ENV 환경 변수 이해하기"
date: 2025-10-23
---

Node.js 환경에서 앱을 만들다 보면 `NODE_ENV`를 설정하거나 사용하는 순간이 옵니다. 보통 `development` 혹은 `production` 중 하나로 지정합니다. 
그런데 많은 분들이 “개발 서버니까 `NODE_ENV=development` 가 맞겠지?” 라고 착각하는 경우가 있습니다. 사실은 그렇지 않고, 이 때문에 실제 배포 환경에서 문제가 발생하기도 합니다.

## NODE_ENV란?

`NODE_ENV` 는 Node.js에서 현재 코드가 어떤 환경에서 실행 중 인지를 나타내는 환경 변수(Environment Variable)입니다. Node.js 자체에서 강제하는 것은 아니지만, 사실상 업계 표준으로 사용되고 있습니다. 보통 아래 세 가지 값을 가집니다.

- `development` - 개발자가 로컬에서 코드를 작성하고 디버깅할 때
- `production` - 실제 서비스가 사용자에게 제공되는 배포 환경
- `test` (가끔) - 자동 테스트 실행 시 사용되는 환경

## 개발 서버니까 development겠지?라는 오해

대부분의 서비스는 아래와 같이 환경을 나눕니다.

- Development (개발 서버)
- Stage (QA 서버)
- Live (운영서버)

여기서 흔히 발생하는 혼동은 개발 서버를 뜻하는 Development 환경과 `NODE_ENV=development`를 같은 의미로 착각하는 것입니다.

Development 환경은 실제 인프라 위에서 앱을 돌려보고 QA나 내부 테스트 용도인 테스트용 서버이고, `NODE_ENV=development` 는 개발자가 자신의 PC에서 코드를 수정하고 디버깅을 하는 단계인 로컬 개발 환경을 의미합니다.

즉 "개발 서버"는 서비스 버전 중 하나이고, 빌드된 최적화 코드가 실행되는 환경이기 때문에 `NODE_ENV=production` 이 맞습니다.

정리하자면

- 로컬 개발 중: `NODE_ENV=development`
- 개발 서버: `NODE_ENV=production`
- 운영 서버: `NODE_ENV=production`

## NODE_ENV에 다른 값을 넣으면 어떻게 될까?

Node.js 자체는 `NODE_ENV` 값에 전혀 관여하지 않습니다. 즉, 아래처럼 써도 에러가 나지 않습니다.

```
NODE_ENV=stage node main.js
```

이 경우는 단지 `process.env.NODE_ENV === "stage"` 이 될 뿐입니다.

문제는 많은 라이브러리나 프레임워크가 `production` `development` `test` 세 가지 값만 전제로 동작한다는 점입니다.

예를 들어 Vite에서는 `NODE_ENV=production` 일 때, 코드를 minify, chunk, 캐시 처리 등 최적화하여 빌드합니다. 따라서 `NODE_ENV` 에 다른 값을 넣으면 이런 최적화가 비활성화 될 수 있습니다.

이 때문에 dev, stage, live와 같이 우리 앱의 환경 구분 용 값을 넣고 싶다면 `APP_ENV` 같은 별도의 변수를 만들어 관리하는 것이 좋습니다.

```
APP_ENV=stage NODE_ENV=production node main.js
```

## 개발 서버에 배포 할 코드를 NODE_ENV=development로 빌드하면?

종종 "개발 서버니까 `development`로 빌드해야지" 하고 아래처럼 설정하는 경우가 있습니다.

```
NODE_ENV=development vite build
```

겉보기엔 빌드도 잘 되고, 앱도 잘 돌아가는 것처럼 보일 수 있습니다. 하지만 빌드 결과물을 보면 문제가 있습니다.

예를 들어 Vite는 `NODE_ENV=development`로 빌드할 경우 minify, chunking, 캐시 처리 등이 비활성화 된채로 빌드 합니다. 그래서 이렇게 빌드된 코드를 배포하면 성능 저하, 최신 코드가 반영 안되는 캐시 문제, 불필요하게 큰 파일 등과 같은 문제가 발생할 수 있습니다. 따라서 개발 서버라도 반드시 `NODE_ENV=production` 으로 빌드해야합니다.

Vite CLI는 `vite build` 시 자동으로 `NODE_ENV=production` 으로 설정하므로 굳이 수동으로 설정하지 않아도 되지만 잘못 `NODE_ENV=development` 로 지정하면 위와 같은 문제가 생깁니다. (`vite dev` 시 `NODE_ENV=development` 로 설정합니다.)