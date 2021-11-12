# nodejs-react-project

## backend
Typescript + NodeJs

### 기본 패키지 설치
```typescript
npm i typescript express dotenv cors helmet sequelize sequelize-cli mysql2 bcrypt
npm i -D nodemon ts-node @types/node @types/express @types/dotenv @types/cors @types/helmet ts-node-dev @types/bcrypt

// 설치 후 package.json 아래 내용 추가
"scripts": {
    "dev": "ts-node-dev --respawn --pretty --transpile-only src/index.ts"
},
```

### typescript 초기화
```typescript
npx tsc --init
```

### 실행 테스트
```typescript
npx run dev
```

### db 초기화
```typescript
npx sequelize init // sequelize 초기화
npx sequelize db:create // db 생성
// db 생성 후 config.ts -> config.ts로 바꿔준다.
// 이후 index.ts, user.ts .. 등 model 생성후 테스트해본다.
```

## Front
Javascript + React

### 설치 및 실행
```typescript
npx create-react-app .
npm run start
```

### 개념
Babel?
- 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해, 최신 자바스크립트 문법을 구형 브라우저에서도 돌수있도록 변환시켜줌

Webpack?
- 복잡한 웹페이지 구조를 static assets 형태로 bundle 해준다. 

NPM? NPX?
- NPM은 Node Package Manager로 library를 다운받기 위해 사용 (npm install ..)
  - library를 global로 받고싶다면 -g 옵션을 추가해주면됨
- application을 키거나, 배포하거나 (npm run ..)
- NPX는 `npm install -g` 대신 사용할수 있음
  - 예전엔 npm install -g로 로컬 PC에 library를 다운받아 사용했음. 
  - NPX를 사용함으로써, 다운을 받지 않고 node registery에 있는 library를 사용할수 있음

### 구조
webpack은 src/ 폴더내 파일들을 관리해준다.
- 즉, src/에 넣어야 webpack이 bundle 할수 있다.

src/ 내 구조를 아래처럼 바꿀수 있다.
_actions, _reducer
- Redux를 위한 플도

components/views
- Page를 넣는다.

components/views/Sections
- 해당 페이지에 관련된 css, component들을 넣는다.

App.js
- Routing 관련 일을 처리한다.

Config.js
- 환경 변수같은 것들을 정하는 곳이다.

hoc
- Higher Order Comoponent 약자

utils
- 여러 군데에서 쓰일것들을 넣어준다.

### React Router Dom
React에서 페이지간 이동시 React Router Dom을 사용한다.

**설치**
```typescript
npm install react-router-dom --save
```

### CORS 이슈 처리?

Proxy 설정을 통해 CORS 이슈를 처리할수 있다.

**설치**
```typescript
npm install http-proxy-middleware --save
```

src/setupProxy.js 생성 후 아래 코드 복사
```typescript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        })
    )
}
```

### Concurrently
백앤드, 프론트 서버를 동시에 켤수 있음

**설치**
```typescript
npm install concurrently --save
```
**사용방법**
package.json에 아래와 같이 입력한다.
```typescript
"scripts": {
  "all": "concurrently \"npm run backend\" \"npm run start --prefix client\""
},
```

### CSS Framework
CSS Framework를 통해 기능 개발의 초점을 맞춘다.
1. Material UI
2. React Bootstrap
3. Semantic UI
4. Ant Design (https://ant.design/)
5. Materialize

여기 예제에선 Ang Degisn을 사용할 예정

**설치**
```typescript
npm install antd --save

# 아래 코드 사용
import 'antd/dist/antd.css'
```

### Redux 기초
Component의 state 관리해주는 javascript 라이브러리
- 크게 Props, State (= Redux가 관리)가 있다.
- Props는 Class Component, State Functional Component에서 사용하는것(?) 같음.

<img width="361" alt="스크린샷 2021-11-12 오후 4 37 06" src="https://user-images.githubusercontent.com/22383120/141428538-858c5b4e-c96e-486f-b83d-f7dfcc3e3aea.png">

- Redux를 사용하지 않는다면, 특정 Component의 변화가 있을시 해당 변경된 내용을 상위 Component로 타고(?) 올라가면서 변화를 반영한다.
- Redux를 사용한다면, Store에 변경된 내용을 반영하여 이를 다른 Component에도 반영해준다.

<img width="387" alt="스크린샷 2021-11-12 오후 5 29 32" src="https://user-images.githubusercontent.com/22383120/141435518-07e842e4-d482-4377-b938-38627e0589a2.png">

- Redux 데이터 Flow이며, 
  - Action: 무엇이 일어났는지 (변경? 삭제?) 설명해주는 Object (React Component가 Action에게 state를 알려준다.)
  - Reducer: state이 어떻게 변화했으때, (변경이면 user age가 21->22) 이를 설명해주는 Object
  - Store: state의 변화된 내용을 저장하는 Object

**설치**
```typescript
npm install redux --save
npm install react-redux --save
npm install redux-promise --save
npm install redux-thunk --save
```

Redux promise, thunk는 Redux를 잘사용하기 위한(?) middleware

Redux Dev tools도 다운받아야 함.
- https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko


### React Hooks
React Copponent는 두가지가 있다.

- Class Component
```typescript
export default class Hello extends Component {
    render() {
        return (
            <div>
                ...
            </div>
        )
    }
}
```

- Functional Component
```typescript
export default function Hello() {
    return (
        <div>
            ...
        </div>
    )
}
```

보통 Class Component가 Functional Component 보다 기능이 많았는데, React Hook 출시 이후로 Functional Component에서도 가능해졌음
- 최근 React Hook을 써서 Functional Component를 사용한다.

- Class Component
```typescript
export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {name:""}
    }
  
    componentDidMount() {
      axios.get('/api/v1/user')
            .then(response => {
              this.setState({name: response.data.name})
            })
    }

    render() {
      return (
              <div>
                      Test
              </div>
      );  
    }
}
```

- Functional Component
```typescript
export default function Hello() {
    const [Name, setName] = userState("")
  
    useEffect(() => {
        axios.get('/api/v1/user')
            .then(response => {
                setName(response.data.name)
            })
    }, [])
  
    return (
        <div>
            Test
        </div>
    );
}
```