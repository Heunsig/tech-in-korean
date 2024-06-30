---
eleventyNavigation:
  title: Typescript 태그드 유니온 타입(Tagged Union Types)
  order: 5
---

Typescript에서 타입을 지정하다 보면 같은 카테고리에 속하지만 세부 사항이 다른 경우가 있습니다. 예를 들어 결제 서비스를 만든다고 가정해봅시다. 결제 방식은 카드 결제와 계좌 이체가 있습니다. 카드 결제의 경우 카드 번호(`creditCardNumber`)와 만료일(`expirationDate`)이 필요하고, 계좌 이체의 경우 은행명(`bankName`)과 계좌 번호(`accountNumber`)가 필요합니다. 이를 타입으로 지정하면 다음과 같습니다:

```ts
type CreditCardPayment = {
  creditCardNumber: string;
  expirationDate: string;
};

type BankTransferPayment = {
  bankName: string;
  accountNumber: string;
};
```

그리고 결제 함수를 작성해봅시다:

```ts
function pay(payment: CreditCardPayment | BankTransferPayment) {
  if ('creditCardNumber' in payment) {
    console.log('카드 결제');
    payment.creditCardNumber; // 타입 추론을 통해 creditCardNumber 사용 가능
  } else {
    console.log('계좌 이체');
    payment.bankName; // 타입 추론을 통해 bankName 사용 가능
  }
}
```

[Typescript Playground 바로가기](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAwgThAJgS2DAhnRAFdIC2EAdsFALxQDeAUFFAMYIpqaIByArvgEYRwBcUAM7A4yIgHMA3LSgQAHmGRx0wZAHsiAEVURBIsZJkBfGdVCQoAIXREA1gBUVRIQDM+uAsVIUadbrZ2bOiE+qLi0rLo9PTqHCScPHxhhpGm1NSu8fRqmlBgeAAUBV4kgvBIqBhYnoQkUAA+1oFOtm4eeHXAAJRUssiuUIUA5IyVLFiJvHDDUOL5nd69fnQMmkLqADYQAHSb6hIjgC5zgDstUIANNYA4E8PdMqsLpcA7Y8zV7FzTUlAA9N9QgAMLgFDxqCAFNnAAYdgBFxqCAVsXAC6rDCYVVYUz4UEANQOASrGoIAAGsApU2yYxyTZCaArOixFxbXb7Q7DQAjNYAYiaggBdxwAtMzc7qsSl0dgF7MFCF9fgDgeCoXCoHygiFoJicfi6MZqMYgA)

여기서 `payment`가 어떤 타입인지 확인하기 위해 `in` 연산자를 사용했습니다. 하지만 이 방식은 각 타입의 정의가 변경될 때마다 코드 수정이 필요하고, 구분이 필요한 타입들에 겹치는 프로퍼티가 있을 때 문제가 발생할 수 있습니다.

예를 들어, `CreditCardPayment`와 `BankTransferPayment`에 공통된 프로퍼티인 `number`가 있다면 어떻게 될까요? 다음과 같이 코드를 작성하면 `number` 프로퍼티로 결제 방식을 구분할 수 없게 됩니다:

```ts
type CreditCardPayment = {
  number: string;
  expirationDate: string;
};
type BankTransferPayment = {
  number: string;
  bankName: string;
};

function pay(payment: CreditCardPayment | BankTransferPayment) {
  if ('number' in payment) { // number로 타입 구분 불가능
    console.log('카드 결제');
  } else {
    console.log('계좌 이체');
  }
}
```

[Typescript Playground 바로가기](https://www.typescriptlang.org/play/?#code/C4TwDgpgBAwgThAJgS2DAhnRAFdIC2EAdsFALxQDeAUFFEQK74BGEcAXFAM7BzJEBzANy0oEAB5hkcdMGQB7IgBFZETjz6CRAXxGhIUAELoiAawAqMolwBmbXAWKkKNOoxZt1vfsNHMTpgBy6IRemr661NQ2DEQAxnKKUGB4ABQpjiSc8EioGFgOhCRQAD5GAZYmtvZ4RcAAlFSiyDZQqQDk7qxw7VD8ybVOjZRQAPSj9EzdgDodUIADC4Ch41CANrWAIb1QgBG9gAA1gKVNonRxilzyADYQAHQn8gIdgC5zgDstUIANNYA4E+31InTaYidc0K50KCHaynC5XG7tQAjNYAYiaggBdxwAtM+9PlBtNRtEA)

이러한 문제를 해결하기 위해 Typescript에서는 태그드 유니온 타입(Tagged Unions Type) 또는 판별 유니온(Discriminated Unions Type)을 사용할 수 있습니다.
태그드 유니온 타입은 타입 구분을 위한 프로퍼트 하나를 지정하고 그 프로퍼티를 사용하여 타입을 구분하는 방식입니다. 위의 예제를 태그드 유니온 타입으로 바꾸면 다음과 같습니다:

```ts
type CreditCardPayment = {
  method: 'creditCard';
  creditCardNumber: string;
  expirationDate: string;
};

type BankTransferPayment = {
  method: 'bankTransfer';
  bankName: string;
  accountNumber: string;
};
```

각 타입에 `method`라는 타입 구분을 위한 프로퍼티를 추가하여 이 프로퍼티를 사용하여 타입을 구분합니다. 결제 함수도 다음과 같이 수정합니다:
```ts
function pay(payment: CreditCardPayment | BankTransferPayment) {
  if (payment.type === 'creditCard') {
    console.log('카드 결제');
    payment.creditCardNumber; // 타입 추론을 통해 creditCardNumber 사용 가능
  } else {
    console.log('계좌 이체');
    payment.bankName; // 타입 추론을 통해 bankName 사용 가능
  }
}
```

이제 각 타입의 정의가 변경되어도 `method` 프로퍼티만 유지되면 결제 함수에서는 타입 구분을 위한 코드를 수정할 필요가 없습니다. 또한 `number`와 같이 겹치는 프로퍼티가 있어도 `method` 프로퍼티를 사용하여 타입을 구분할 수 있습니다. `in` 연산자를 사용하는 것보다 태그드 유니온 타입을 사용하면 코드를 더 직관적으로 작성할 수 있습니다.
