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


create-react-app

### 개념
Babel?
- 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해, 최신 자바스크립트 문법을 구형 브라우저에서도 돌수있도록 변환시켜줌

Webpack?
- 복잡한 웹페이지 구조를 static assets 형태로 bundle 해준다. 
