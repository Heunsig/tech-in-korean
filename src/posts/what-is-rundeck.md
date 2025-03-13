---
layout: "base.njk"
title: "Rundeck란 무엇인가?"  
date: 2025-03-13
---

인프라 운영을 하다 보면 반복적인 작업이 자주 발생합니다. 예를 들어, 서버를 재시작하거나 특정 로그를 확인하고, 배포 작업을 수행하는 등의 일이 그렇습니다. 이러한 반복적인 작업을 보다 쉽게 수행할 수 있도록 도와주는 도구가 Rundeck입니다.

<figure style="text-align: center;">
<img src="/assets/images/what-is-rundeck/rundeck-logo.png" alt="Rundeck 로고" style="display: inline-block;"/>
</figure>

## Rundeck 이란?
Rundeck은 오픈소스로 제공되는 IT 인프라 운영 자동화 도구입니다. 인프라 운영을 위한 작업을 자동화하고, 일정에 맞춰 실행할 수 있도록 스케줄링하며, 스크립트 저장하여 언제든지 빠르게 재실행 할 수 있도록 도와줍니다. 이를 활용하면 DevOps 및 IT 운영팀이 서버 관리, 배포 자동화, 백업 등의 다양한 작업을 더욱 쉽게 처리할 수 있습니다.


## Rundeck의 주요 기능

### 1. 워크플로우 생성, 실행, 관리

여러 개의 CLI 명령어나 스크립트를 조합하여 하나의 워크플로우를 만들고 실행할 수 있습니다. 또한, 각 스텝별 실행 순서를 정하고 조건을 설정할 수도 있습니다. 저장된 워크플로우는 언제든지 다시 실행할 수 있어 반복 작업을 손쉽게 처리할 수 있습니다.

### 2. 역할 기반 접근 제어(RBAC, Role-Based Access Control)

사용자별 역할을 설정하여 특정 작업만 실행할 수 있도록 제한할 수 있습니다. 이를 통해 중요한 작업을 보다 안전하게 운영할 수 있습니다.

### 3. 스케줄링

특정 시간이나 주기에 맞춰 명령어나 스크립트를 자동으로 실행할 수 있습니다. 예를 들어, '매일 밤 12시에 로그를 자동으로 백업'하는 식으로 활용할 수 있습니다.

### 4. 웹훅(Webhooks)

웹훅을 활용하면 Slack, Microsoft Teams, Jenkins 등의 다른 시스템과 Rundeck을 쉽게 연동할 수 있습니다. 이를 통해 다양한 이벤트 기반 자동화를 구현할 수 있습니다.

### 5. 서버(노드) 중앙 관리

Rundeck은 특정 서버에서만 작업을 실행할 수도 있지만, 여러 개의 서버를 중앙에서 효율적으로 관리할 수 있도록 설계되었습니다. 이를 통해 다수의 서버를 보다 쉽게 운영할 수 있습니다. 또한, 실행된 작업의 로그를 한곳에서 확인할 수 있어 각 서버에서 어떤 작업이 실행되었는지 한눈에 파악할 수 있습니다.

<figure>
<img src="/assets/images/what-is-rundeck/rundeck-features.svg" alt="Rundeck의 주요 기능" />
</figure>

## Rundeck의 사용 사례

Rundeck은 다양한 환경에서 활용될 수 있습니다. 대표적인 예시는 다음과 같습니다.

- **배포 자동화**: 특정 서버에 애플리케이션을 배포하는 스크립트를 실행하여 배포 과정 자동화
- **서버 관리 작업**: 서버 재부팅, 로그 파일 정리, 디스크 용량 확인 등의 반복적인 작업 수행
- **CI/CD 파이프라인 연동**: Jenkins, GitHub Actions 등과 연계하여 배포 프로세스 최적화
- **운영팀 작업 자동화**: 장애 대응을 위한 특정 명령어 실행 자동화

<figure>
 <video src="/assets/videos/what-is-rundeck/rundeck-demo.mp4" autoplay muted loop></video>
 <figcaption>Rundeck으로 웹 배포 하기</figcaption>
</figure>


## 마무리

Rundeck을 사용하면 반복적인 인프라 작업을 자동화하고, 운영 효율성을 높일 수 있습니다. 특히 워크플로우 관리, 스케줄링, 접근 제어, 웹훅 연동, 여러 서버 관리 등의 기능을 활용하면 IT 인프라 운영을 더욱 체계적으로 관리할 수 있습니다.


## 참고 자료
- [Rundeck 공식 홈페이지](https://rundeck.com/)
- [What is runbook automation?](https://www.rundeck.com/what-is-runbook-automation)
- [Docker로 Rundeck 설치하기](https://snapdock.info/projects/rundeck)
