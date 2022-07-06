# codeit 코드

## 기본 용어 설명
### jsx
javascript + html 문법을 섞음 (javascript의 확장판)
- 모든 html 문법을 다 사용하진 못함

### Fragement
jsx에서는 같은 tag를 연속으로 쓰지 못하는데 그럴떄 <div>로 묶어준다

```html
<div>
    <p>asd</p>
    <p>qwe</p>
</div>
```

하지만 Fragement를 활용하여 불필요한 div를 줄일수 있다.

```html
<>
    <p>asd</p>
    <p>qwe</p>
</>
```

### Component

아래와 같이 Hello() 함수는 Component라 하며, 이는 html tag처럼 사용할수 있다.
- 함수 이름은 꼭 대문자로 시작해야함
- return 값은 항상 jsx 문법으로 만 react element를 반환해야함

```html
function Hello() {
    return <h1>안녕 리액트</h1>
}

const element = (
    <>
        <Hello />
        <Hello />
        <Hello />
    </>
)
```

### Props
상위 Component가 하위 Component에게 데이터를 전달해주기 위함

```html
...
<Dice color="red" num={2} />
...
```

```html
...
function Dice({ color = 'blue', num = 1 }) {
    const src = DICE_IMAGES[color][num - 1];
    const alt = `${color} ${num}`;
    return <img src={src} alt={alt} />;
}
...
```

### Children Props

Props의 다른 버젼으로 위 Props처럼 파라미터로 넘겨줄수 있지만, 아래처럼 좀더 직관적으로 코드를 만들수 있다

```html
...
<Button>던지기</Button>
...
``` 

```html
...
function Button({ children }) {
    return <button>{children}</button>;
}

export default Button;
...
```
