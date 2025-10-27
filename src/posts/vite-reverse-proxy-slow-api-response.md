---
layout: "base.njk"
title: "Vite Reverse Proxy 환경에서 API 응답이 느려지는 원인과 해결"
date: 2025-10-27
---

로컬 개발 중에 API 연동을 좀 더 편하게 하기 위해, 개발환경 서버에 직접 붙는 경우가 많습니다.

예를 들어, 아래처럼 실제 개발 서버의 API를 바로 호출합니다.

```js
fetch('https://nexon.com/api/...')
```

하지만 이런 식으로 직접 호출하면 CORS(Cross-Origin Resource Sharing) 문제가 발생하는 경우가 많습니다. 서버에서 CORS 허용하지 않았다면 브라우저에서 요청 자체가 차단되어버립니다.

이럴 때 우회 할 수 있는 방법이 Vite dev server의 Reverse Proxy입니다. 일반적으로 vite.config.js에 아래처럼 설정합니다.
```js
server: {
  proxy: {
    '^/api': {
      target: 'https://nexon.com',
      changeOrigin: true,
    },
  },
}
```

이렇게 하면 브라우저에서 API를 직접 호출하는게 아니라 Proxy 서버를 통해 응답을 받게되어 CORS 문제가 사라집니다.

## 문제 상황

그런데 어느 날, API 응답이 유독 느려지는 현상이 발생했습니다. 처음엔 "개발 서버의 API가 느린가 보다"라고 생각했지만, Postman으로 직접 `https://nexon.com/api/...` 를 호출해보니 응답이 100ms 이내로 매우 빠르게 돌아왔습니다.

반면, 동일한 요청을 Vite Proxy 서버를 통해 호출 할 때 5배 이상 느려졌습니다.

## 원인 분석

Vite의 Proxy 기능은 내부적으로 Node의 `http(s).Agent`와 [`http-proxy-3`](https://github.com/sagemathinc/http-proxy-3) 라이브러리를 기반으로 구성되어 있습니다.  이때 Node의 `http(s).Agent`는 기본적으로 연결 재사용(keep-alive) 이 비활성화되어 있습니다. 즉, API 요청을 보낼 때마다 새로운 TLS 연결을 맺고, 매번 TLS 핸드셰이크를 반복하게 됩니다.

한두 번의 요청이라면 큰 차이를 느끼기 어렵지만, 동시에 수십 개의 API 요청이 발생하면 이 부분이 병목의 주요 원인이 됩니다.

### 부가적인 원인

1. TLS + HTTP/2 → TLS(HTTP/1.1)로 다운그레이드
    - Vite 공식 문서의 server.https 섹션에 따르면, server.proxy 설정이 활성화되면 Vite dev 서버는 TLS 기반의 HTTP/1.1 통신만 사용하게 됩니다. 즉, 원래 HTTP/2를 지원하던 서버라도 프록시를 거치면 HTTP/1.1로 다운그레이드되어 요청 지연이 발생할 수 있습니다.

2. 다중 오리진 연결
    - 여러 target(예: `api.nexon.com`, `auth.nexon.com`)을 프록시할 경우, Node는 각 오리진별로 별도의 TLS 세션을 생성합니다. 이로 인해 불필요한 연결이 반복되며 추가적인 지연이 발생할 수 있습니다.

## 해결 방법: Keep-Alive 활성화

해결책은 간단합니다. Node의 `https.Agent`에서 `keepAlive` 옵션을 활성화하면 됩니다.

이렇게 하면 한 번 맺은 연결을 재사용하게 되어 TLS 핸드셰이크 비용이 크게 줄어들게 됩니다.

```js
import { defineConfig } from 'vite'
import https from 'node:https'

const httpsAgent = new https.Agent({ keepAlive: true })

export default defineConfig({
  server: {
    proxy: {
      '^/api': {
        target: 'https://nexon.com',
        changeOrigin: true,
        agent: httpsAgent,
      },
    },
  },
})

```

이 설정 한 줄로도 체감 속도가 확실히 개선됩니다. 

제가 직접 테스트한 기준으로는 응답 시간이 **약 600ms~1초에서 100ms 이하로** 줄었습니다. 다만 프로젝트 구조나 네트워크 환경, 시스템 사양 등에 따라 결과는 달라질 수 있습니다.