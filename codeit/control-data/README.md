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
