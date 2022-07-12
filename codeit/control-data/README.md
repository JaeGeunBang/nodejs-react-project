# 공부 정리 내용

## setState에서 ... 의 의미는?
```typescript
setItems([...items, ...reviews]);
```
items에 현재 들어있는 items 값과 새로 받아온 reviews 값을 합쳐서 새로운 items를 만들겠다는 의미.
- 이를 스프레드 문법이라 한다.

### 비동기 State 변경시 주의사항
```typescript
setItems([...items, ...reviews]);
```
reviews = await getItems()후 위와 같이 setItems를 정의했을때, 만약 다른 곳에서 items를 지우는 작업을 한다면?
- items는 getItems() 시점의 items를 기억한다.
- 즉, 중간에 누가 items를 지우더라도 지운 item이 다시 생성된다.

```typescript
setItems((prevItems) => [...prevItems, ...reviews]);
```
위와 같이 바꿔주면, prevItesm는 콜백 함수이기 때문에 함수 호출 완료 후 시점의 items를 기억한다.
- 즉, 중간에 누가 items를 지우더라도 prevItems 콜백 함수가 시작되는 시점의 items를 가져오기 때문에 정상적으로 삭제처리된다.

## useEffect
react에서 use~로 시작하는 (useEffect, useState 등)은 모두 React Hook 이다.

### 처음만 실행
```
useEffect(() => {
  // 실행할 코드
}, []);
```
컴포넌트가 처음 렌더링 되고 나면 리액트가 콜백 함수를 기억해뒀다가 실행합니다.

그 이후로는 콜백 함수를 실행하지 않습니다.
- 새로고침 하면 계속 실행될것

### 값이 바뀔때마다 실행
```
useEffect(() => {
  // 실행할 코드
}, [dep1, dep2, dep3, ...]);
```
컴포넌트가 처음 렌더링 되고 나면 리액트가 콜백 함수를 기억해뒀다가 실행합니다.

그 이후로 렌더링 할 때는 디펜던시 리스트에 있는 값들을 확인해서

하나라도 바뀌면  콜백 함수를 기억해뒀다가 실행합니다.

## Ref
원하는 시점에 DOM 노드에 접근하고 싶을때 사용한다.

### Ref 객체 생성
```typescript
import { useRef } from 'react';

// ...

const ref = useRef();
```

### Ref Props 사용
```typescript
const ref = useRef();

// ...

<div ref={ref}> ... </div>
```

### Ref 객체에서 DOM 노드 참조
```typescript
const node = ref.current;
if (node) {
  // node 를 사용하는 코드
}
```

### 예제
```typescript
const inputRef = useRef();

const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
};

const handleClearClick = () => {
    const inputNode = inputRef.current ;
    if (!inputNode) return ; // DOM 노드가 랜더링 되지 않을수 있으니 if문은 필수!! 

    inputNode.value = '';
    onChange(name, null) ;
}

useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
}, [value]);

return (
    <div>
        <img src={preview} alt="이미지 미리보기"/>
<input type="file" onChange={handleChange} ref={inputRef}/>;
{value && <button onClick={handleClearClick}>X</button>}
    </div>
)
```

`<input>` type을 ref (inputRef)로 정의한다.
- 그럼 다른데서 inputRef.current를 하면 해당 DOM 노드에 접근할수 있다.
- Clear 버튼을 누르면, inputRef.current를 통해 해당 DOM 노드 (input type)을 가져와서 values를 초기화해준다.

### useCallback
함수를 매번 새로 생성하는것이 아닌 디펜던시 리스트가 변경될때마다 함수를 생성

```typescript
const handleLoad = useCallback((option) => {
  // ...
}, [dep1, dep2, dep3, ...]);
```

결론적으로, useEffect 내에 사용하는 함수는 useCallback 형태로 구현되어 있어야 한다.
```typescript
// useEffect내 에서 handleLoad를 호출함
useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
}, [order, handleLoad]);

// handledLoad는 useCallback을 통해 구현해야한다.
const handleLoad = useCallback(
    async (options) => {
        const result = await getReviewsAsync(options);
        if (!result) return;

        const { paging, reviews } = result;
        if (options.offset === 0) {
            setItems(reviews);
        } else {
            setItems((prevItems) => [...prevItems, ...reviews]);
        }
        setOffset(options.offset + options.limit);
        setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
);
```

여기에서도 마찬가지로, useCallback 내에 호출하는 함수가 있으면, 그 함수를 dependency에 추가해야되며 이 함수또한 useCallback으로 구현해야된다.
- 참고로 setItems, setOffect, setHasNext는 React 에서 제공하는 setter 함수이므로, dependency에 추가 안해도됨
- 여기선 getReviewsAsync만 추가하면 된다. (그럼 getReviewsAsync 내에서도 호출하는 외부 함수는 dependency를 추가해줘야함)

## Context
전역 데이터 적용할때 사용함 (props, state로 한계가 있을때)


