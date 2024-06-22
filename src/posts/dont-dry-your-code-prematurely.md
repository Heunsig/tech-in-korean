---
layout: "iframe.njk"
eleventyNavigation:
  title: 코드를 너무 성급하게 DRY 하지 마세요
  order: 1
originUrl: "https://testing.googleblog.com/2024/05/dont-dry-your-code-prematurely.html"
originTitle: "Don't DRY Your Code Prematurely"
css: "/assets/styles/code-container.css"
---

이 글은 [Code Health](https://testing.googleblog.com/2017/04/code-health-googles-internal-code.html) 시리즈의 한 게시물입니다. 원래 전 세계 구글 화장실에 Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) 에피소드로 게시되었습니다. 사무실에 게시할 수 있도록 [프린터 친화적인 버전](https://docs.google.com/document/d/1zdQswED3Ru7eTqeDZpx3SEaUmUZC1wegmL3_fHwgrQk/edit)을 다운로드할 수 있습니다.

작성자 Dan Maksimovich

많은 사람들이 "Don't Repeat Yourself" 또는 DRY의 중요성에 대해
들어왔습니다. 잠시 멈추고 생각해 봅시다: 중복이 정말로 불필요한
것일까요? 아니면 시간이 지나면서 기능이 독립적으로 발전해야 할
필요가 있나요? **DRY 원칙을 너무 엄격하게 적용하면 미래의 변경을
불필요하게 복잡하게 만드는 성급한 추상화로 이어질 수 있습니다.**

**코드가 정말로 중복되었는지 아니면 겉보기만 비슷한지 신중하게
생각해야합니다.** 함수나 클래스가 비슷하게 보일 수 있지만, 시간이
지나면서 다른 맥락과 비즈니스 요구 사항에 따라 다르게 발전할 수
있습니다. 단순히 코드를 짧게 만드는 것만 생각하지 말고, 함수의
목적이 시간이 지나도 어떻게 유지될지 생각해봐야 합니다. **추상화를
설계할 때는 장기적으로 별도로 발전할 수 있는 기능을 조기에
결합하지 않도록 주의해야 합니다.**

추상화를 도입할 때 코드에 해가 되는 경우는 언제일까요? 다음 코드를 살펴봅시다:

<div class="code-container">
  <div>
    <pre>
# 성급한 DRY 추상화로 인해
# 규칙이 동일하다고 가정하여,
# 엔티티별 변경을 제한합니다.
class DeadlineSetter:
  def __init__(self, entity_type):
    self.entity_type = entity_type

  def set_deadline(self, deadline):
    if deadline <= datetime.now():
      raise ValueError(“Date must be in the future”)

task = DeadlineSetter(“task”)
task.set_deadline(datetime(2024, 3, 12))
payment = DeadlineSetter(“payment”)
payment.set_deadline(datetime(2024, 3, 18))
</pre>
  </div>
  <div>
  <pre>
  # 반복되지만 명확하여 엔티티별
  # 특수한 로직과 미래의 변경을 허용합니다.

  def set_task_deadline(task_deadline):
    if task_deadline <= datetime.now():
      raise ValueError(“Date must be in the future”)

  def set_payment_deadline(payment_deadline):
    if payment_deadline <= datetime.now():
      raise ValueError(“Date must be in the future”)

  set_task_deadline(datetime(2024, 3, 12))
  set_payment_deadline(datetime(2024, 3, 18))
  </pre>
  </div>
</div>

오른쪽(초록 박스) 접근 방식은 `ValueError` 검사가 우연히 동일하기
때문에 DRY 원칙을 위반하는 것처럼 보일 수 있습니다. 그러나
작업(Task)과 결제(Payment)는 잠재적으로 다른 논리를 가진 개별적인
개념을 나타냅니다. 나중에 결제 날짜에 새로운 검증(Validation)이 필요해진다면,
오른쪽(초록 박스) 코드에는 쉽게 추가 할 수 있습니다. 반면 왼쪽(빨강 박스) 코드에 추가하는 것은 훨씬 더 어려울 것입니다.

**의심스러울 때는 공통 패턴이 시간이 지나면서 충분히 나타나 결합이
정당화될 때까지 동작을 분리하는 것이 좋습니다.** 작은 규모에서는 중복 코드를
관리하는 것이 성급한 추상화로 인한 복잡성을 해결하는 것보다 더 간단할
수 있습니다. **개발 초기 단계에서는 약간의 중복을 허용하고 추상화는
나중에 고려하는 것이 더 좋습니다.**

미래의 요구 사항은 종종 예측할 수 없습니다. "[You Aren't Gonna Need
It](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)" 또는 YAGNI 원칙을 생각해 보면, 중복이 문제가 되지 않거나,
시간이 지나면 신중하게 고려된 추상화가 필요하다는 것이 명확해질 것입니다.