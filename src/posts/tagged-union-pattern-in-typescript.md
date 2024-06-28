---
eleventyNavigation:
  title: Typescript 태그드 유니온 타입(Tagged Union Types)
  order: 4
---

Typescript에서 Type을 지정하다 보면 간혹 큰 분류는 같지만 세부적인 내용이 다른 경우가 있습니다. 예를들어 결제 서비스를 만든다고 가정해봅시다. 결제 서비스는 크게 카드 결제와 계좌 이체를 하는 방법이 있습니다. 이때 카드 결제의 경우 카드번호(`creditCardNumber`)와 카드 만료일(`expirationDate`)이 필요하고 계좌 이체의 경우 은행명(`bankName`)과 계좌번호(`accountNumber`)가 필요합니다. 이때 결제 서비스를 만들기 위해 다음과 같이 타입을 지정할 수 있습니다:
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

그리고 결제 함수를 만들어 봅시다:
```ts
function pay(payment: CreditCardPayment | BankTransferPayment) {
  if ('creditCardNumber' in payment) {
    console.log('카드 결제');
  } else {
    console.log('계좌 이체');
  }
}
```

`payment`가 어떤 타입으로 들어왔는지 확인하기 위해 `in` 연산자를 사용해, `payment`가 `CreditCardPayment`인지 `BankTransferPayment`인지 확인합니다. 하지만 이 방식은 뭔가 깔끔하게 해결한 느낌이 들지 않습니다. 왜냐하면 `CreditCardPayment` 타입의 프로퍼티가 바뀔 수도 있으며, 바뀌었을 때 `in` 연산자를 사용하여 타입 구분을 하던 코드도 수정을 해야됩니다. 그리고 `CreditCardPayment`와 `BankTransferPayment`의 프로퍼티가 겹치지 않는다는 것을 보장할 수 없습니다.
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
  if ('number' in payment) { // 타입 구분이 불가능
    console.log('카드 결제');
  } else {
    console.log('계좌 이체');
  }
}
```

이런 문제를 해결하기 위해 Typescript에서는 태그드 유니온 타입(Tagged Unions Type) 또는 판별 유니온(Discriminated Unions Type)을 사용할 수 있습니다. 

태그드 유니온 타입은 공통 프로퍼티를 가진 여러 타입을 하나의 타입으로 묶어주는 방법입니다. 위의 예제를 태그드 유니온 타입으로 바꾸면 다음과 같습니다:
```ts
type CreditCardPayment = {
  type: 'creditCard';
  creditCardNumber: string;
  expirationDate: string;
};

type BankTransferPayment = {
  type: 'bankTransfer';
  bankName: string;
  accountNumber: string;
};
```

`CreditCardPayment`와 `BankTransferPayment` 타입에 `type` 프로퍼티를 추가하여 각 타입을 구분할 수 있도록 했습니다. 그리고 결제 함수를 다음과 같이 수정합니다:
```ts
type Payment = CreditCardPayment | BankTransferPayment;

function pay(payment: Payment) {
  if (payment.type === 'creditCard') {
    payment.creditCardNumber; // 타입 추론
  } else {
    payment.bankName; // 타입 추론
  }
}
```

이제 `payment`의 타입을 구분하기 위해 `in` 연산자를 사용할 필요가 없어졌습니다. 또한 `CreditCardPayment`와 `BankTransferPayment`의 프로퍼티가 겹치더라도 `type` 프로퍼티로 타입을 구분할 수 있습니다. 태그드 유니온 타입을 사용하면 코드를 더 깔끔하게 작성할 수 있으며, 타입을 구분하기 위해 `in` 연산자를 사용할 필요가 없어집니다.


### Zod 활용하기
태그드 유니온 타입을 사용할 때 Zod를 활용하면 더욱 강력한 타입 검증을 할 수 있습니다. Zod는 타입스크립트의 런타임 타입 검증 라이브러리로, 타입스크립트의 타입을 런타임에서도 사용할 수 있도록 도와줍니다. Zod를 사용하여 결제 서비스의 타입을 검증하는 코드는 다음과 같습니다:
```ts
import { z } from 'zod';

const CreditCardPayment = z.object({
  type: z.literal('creditCard'),
  creditCardNumber: z.string(),
  expirationDate: z.string(),
});

const BankTransferPayment = z.object({
  type: z.literal('bankTransfer'),
  bankName: z.string(),
  accountNumber: z.string(),
});

type Payment = z.infer<typeof CreditCardPayment> | z.infer<typeof BankTransferPayment>;

function pay(payment: Payment) {
  if (payment.type === 'creditCard') {
    payment.creditCardNumber; // 타입 추론
  } else {
    payment.bankName; // 타입 추론
  }
}
```

Zod를 사용하면 `CreditCardPayment`와 `BankTransferPayment`의 타입을 런타임에서 검증할 수 있습니다. 또한 `z.infer` 함수를 사용하여 Zod 스키마의 타입을 추론할 수 있습니다. Zod를 사용하면 타입을 더욱 강력하게 검증할 수 있으며, 런타임에서도 타입을 사용할 수 있습니다.
```