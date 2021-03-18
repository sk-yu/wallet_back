# wallet backend

Ethereum and erc20 wallet backend service.

## 설치 : npm install, mongoDB

## 설정 : {projects}\configs\property.js
      mongodb 설정 필수
## demo page(오라클 클라우드)
  - swagger : http://132.145.91.65:3000/docs
  - with front : http://132.145.91.65:3000/

## API
#### 1.회원가입
  - http post
  - /api/v1/account/signup
  - body parameter
    -  "email":"",
    -  "password":"",
    -  "passphase":"" //privatkey를 암호화key

#### 2.로그인
  - http post
  - /api/v1/account/signin
  - body parameter
    -  "email":"",
    -  "password":"",

#### 3.이더리움 잔고
  - http get
  - /api/v1/eth/balance
  - header parameter
    - access-token: token

#### 4.이더리움 전송
  - http post
  - /api/v1/eth/transfer
  - header parameter
    - access-token: token
  - body parameter
    - "passphase":"",
    - "to":"",
    - "amount":""

#### 5.토큰 잔고
  - http get
  - /api/v1/token/balance
  - header parameter
    - access-token: token
  - query parameter
    - token:tokenaddress

#### 6.토큰 전송
  - http post
  - /api/v1/token/transfer
  - header parameter
    - access-token: token
  - body parameter
    - "passphase":"",
    - "to":"",
    - "amount":""
    - "tokenaddress":""

#### 7.히스토리 검색
  - http post
  - /api/v1/history
  - header parameter
    - access-token: token
