---
layout: "base.njk"
title: Polyfill 공급망 공격
date: 2024-07-17
---

2024년 6월, 보안 회사인 [Sansec](https://sansec.io/)은 [Polyfill 공급망에 심각한 보안 문제](https://sansec.io/research/polyfill-supply-chain-attack)가 있다고 발표했습니다.
이에 따라 110,000개가 넘는 웹사이트가 이 공격의 영향을 받고 있다고 경고했습니다.

## 어떤 공격이였나요?

이 공격은 `cdn.polyfill.com`이라는 CDN(Content Delivery Network)에서 제공하던 Polyfill 자바스크립트 라이브러리에 악성 코드가 삽입된 것이 원인이었습니다.
많은 웹사이트가 하위 호환성 문제를 해결하기 위해 이 Polyfill 라이브러리를 임베딩하여 사용하고 있었는데, 이 라이브러리에 삽입된 악성 코드로 인해 웹사이트 방문자들이 불법 도박 사이트나 성인 사이트 같은 악성 사이트로 리다이렉트되는 문제가 발생했습니다. 특히, 이 Polyfill 라이브러리는 Warner Bros, Hulu, Mercedes-Benz와 같은 대형 기업의 웹사이트에서도 사용할 만큼 널리 알려진 라이브러리여서 문제의 심각성이 더욱 컸습니다.

## 어떻게 공격이 이루어졌나요?

Polyfill 공급망 공격은 2024년 2월 중국의 한 회사인 Funnull에 의해 시작되었습니다. 이 회사는 Polyfill CDN 서비스를 제공하는 도메인을 구매하고, 이 라이브러리의 Github 저장소도 인수했습니다.
그 후, Polyfill 라이브러리에 악성 코드를 심어 CDN을 통해 배포했습니다. 이로 인해 수십만 개의 웹사이트가 악성 코드가 심긴 라이브러리를 자동으로 실행하게 되었습니다.

Funnull은 모바일 환경에서만 악성 사이트로 리다이렉트하거나, 특정 시간에만 리다이렉트되도록 설정하는 등 매우 치밀하게 공격을 설계했습니다. 또한, 웹 분석 도구가 적용된 웹사이트나 관리자 로그인 상태에서는 악성 코드가 작동하지 않도록 하여, 웹사이트 관리자들이 문제를 발견하기 어렵게 만들었습니다.

`cdn.polyfill.io` 외 에도 `bootcdn.net`, `bootcss.com`, `staticfile.net`, `staticfile.org`,  `unionadjs.com`, `xhsbpza.com`, `union.macoms.la`, `newcrbpc.com` 등의 CDN 도메인들이 이 공격을 한 회사와 연관이 있는 것으로 밝혀졌습니다.

## 현재는 어떻게 되었나요?

2024년 6월, Polyfill 공급망 공격에 대한 내용이 밝혀지자 Polyfill.io 도메인을 관리하는 [Namecheap](https://www.namecheap.com/)은 악성 Polyfill 라이브러리가 웹사이트에 주입되지 않도록 즉시 도메인을 차단했습니다.
또한, Cloudflare와 같은 CDN 제공업체들은 문제가 있는 Polyfill 라이브러리 링크들을 다른 안전한 스크립트로 미러링 되도록 조치를 취했고, Google은 해당 도메인을 포함한 사이트들의 광고를 차단했습니다.

그럼에도 불구하고 [Censys](https://censys.com/)는 2024년 7월 2일 기준으로 [여전히 380,000개가 넘는 호스트가 이 악성 Polyfill 스크립트를 사용하고 있다고 발표](https://censys.com/july-2-polyfill-io-supply-chain-attack-digging-into-the-web-of-compromised-domains/)했습니다.
이는 앞으로 더 큰 피해가 발생할 가능성을 시사하며, 이러한 공격이 더욱 빈번해질 수 있음을 보여줍니다.

## 이 사건을 통해 배워야할 점

### 아무것도 믿어서는 안된다

아무리 인기 있는 라이브러리라도 무조건 신뢰해서는 안 됩니다. 오픈 소스 라이브러리는 누구나 코드에 접근하고 수정할 수 있기 때문에, 외부 라이브러리를 사용할 때 항상 신중해야 합니다. Polyfill 라이브러리는 많은 사람들이 사용했지만, 이번 사건을 통해 이러한 라이브러리가 악성 스크립트를 심는 도구가 될 수 있다는 것을 알게 되었습니다. 특히, 인기 있는 라이브러리는 공격 대상이 될 가능성이 높기 때문에 더욱 주의가 필요합니다.

### CDN 보다는 NPM을 사용하자

CDN을 통해 스크립트를 임베딩하는 방식은 빠르고 편리하지만, 보안에 취약할 수 있습니다. CDN에서 제공되는 스크립트는 버전 관리가 되지 않으며, 처음에는 문제가 없었더라도 언제든지 내용이 변경될 수 있습니다.

반면에, NPM을 사용하면 특정 버전을 로컬에 다운로드하여 사용하기 때문에 내가 버전을 변경하지 않는 한 라이브러리의 스크립트 내용이 바뀔 염려가 없습니다. 또한, NPM은 자체적으로 보안 심사를 하고 주기적으로 보안 체크를 진행하기 때문에 CDN보다 안전합니다. 다만, NPM을 사용할 때도 항상 정확한 버전 정보를 지정하여 사용하는 것이 중요합니다. 무조건 최신 버전을 사용하는 것은 원하지 않는 스크립트가 삽입될 위험이 있기 때문입니다.

### 참고사이트

- [What We Learned From the Polyfill Attack](https://www.youtube.com/watch?v=F4h_N1Cz5dE&list=WL&index=2)
- [Over 110,000 Websites Affected by Hijacked Polyfill Supply Chain Attack](https://thehackernews.com/2024/06/over-110000-websites-affected-by.html)
- [https://fossa.com/blog/polyfill-supply-chain-attack-details-fixes/](https://fossa.com/blog/polyfill-supply-chain-attack-details-fixes/)