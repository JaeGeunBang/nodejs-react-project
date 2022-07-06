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

```javascript
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

```javascript
...
<Dice color="red" num={2} />
...
```

```javascript
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

```javascript
...
<Button>던지기</Button>
...
``` 

```javascript
...
function Button({ children }) {
    return <button>{children}</button>;
}

export default Button;
...
```

### State
State는 React가 쓰는 데이터 같은건데, State가 바뀌면 알아서 렌더링 해준다
- 아래처럼 정의해서 사용할수 있다

```javascript
const [num, setNum] = useState(1);

function random(n) {
    return Math.ceil(Math.random() * n);
}

const handlerRollClick = () => {
    const nextNum = random(6)
    setNum(nextNum);
}

const handlerClearClick = () => {
    setNum(1);
}

return (
    <div>
        <div>
            <Button onClick={handlerRollClick}>던지기</Button>
            <Button onClick={handlerClearClick}>처음부터</Button>
        </div>
        <Dice color="red" num={num} />
    </div>
);
```

### 참조형 State
기본형이 아닌 배열, 객체 같은 얘들은 참조형 State

```javascript
const [num, setNum] = useState(1);
const [sum, setSum] = useState(0) ;
const [gameHistory, setGameHistory] = useState([]);

function random(n) {
    return Math.ceil(Math.random() * n);
}

const handlerRollClick = () => {
    const nextNum = random(6)
    setNum(nextNum);
    setSum(sum + nextNum)
    setGameHistory([...gameHistory, nextNum]); // 참조형 객체는 아래처럼 만들어야 함
}

const handlerClearClick = () => {
    setNum(1);
    setSum(0);
    setGameHistory([]);
}

return (
    <div>
        <div>
            <Button onClick={handlerRollClick}>던지기</Button>
            <Button onClick={handlerClearClick}>처음부터</Button>
        </div>
        <Dice color="red" num={num} />
        <div>
            <h2>나</h2>
            <Dice color='blue' num={num} />
            <h2>총점</h2>
            <p>{sum}</p>
            <h2>기록</h2>
            {gameHistory.join(', ')}
        </div>
    </div>

);
```
