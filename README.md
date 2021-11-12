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