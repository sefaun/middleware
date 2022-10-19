# Middleware

## Common Parameter Middleware Async Example
```javascript
const { commonParamatersMiddlewareAsync } = require("nodejs-middleware") //CommonJS
import { commonParamatersMiddlewareAsync } from "nodejs-middleware" //Module


async function one(req, res, next, returns) {
  console.log(req, res, next, returns)
  await asyncFunc()
  console.log("one async")
  return next(2222)
}

async function two(next_data, req, res, next, returns) {
  console.log(2, next_data, req, res, next, returns)
  await asyncFunc()
  console.log("two async")
  return next()
}

async function three(next_data, req, res, next, returns) {
  console.log(3, next_data, req, res, next, returns)
  await asyncFunc()
  console.log("three async")
  return returns(100, 2, 4, 5, 6, 4)
}

function asyncFunc() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("waited")
      return resolve()
    }, 2000);
  })
}

async function testing() {
  const result = await commonParamatersMiddlewareAsync(one, two, three)("req", "res")
  console.log(result)
  console.log("finish")
}

testing()
//Output
/*
req res [Function: next] [Function: returns]
waited
one async
2 2222 req res [Function: next] [Function: returns]
waited
two async
3 2222 req res [Function: next] [Function: returns]
waited
three async
[ 100, 2, 4, 5, 6, 4 ]
finish
*/
```

## Common Parameter Middleware Sync Example
```javascript
const { commonParamatersMiddlewareSync } = require("nodejs-middleware") //CommonJS
import { commonParamatersMiddlewareSync } from "nodejs-middleware" //Module


function one(req, res, next, returns) {
  console.log(1, req, res, next, returns)
  return next(222222)
}

function two(next_data, req, res, next, returns) {
  console.log(2, next_data, req, res, next, returns)
  next()
}

function three(data, req, res, next, returns) {
  console.log(3, data, req, res, next, returns)
  return returns(100, 2, 4, 5, 6, 4)
}


function testing() {
  const result = commonParamatersMiddlewareSync(one, two, three)("req", "res")
  console.log(result)
  console.log("finish")
}

testing()

//Output
/**
1 req res [Function: next] [Function: returns]
2 222222 req res [Function: next] [Function: returns]
3 222222 req res [Function: next] [Function: returns]
[ 100, 2, 4, 5, 6, 4 ]
finish
 */
```

## Sync Example
```javascript
const { middlewareSync } = require("nodejs-middleware") //CommonJS
import { middlewareSync } from "nodejs-middleware" //Module

function one(first, next, returns) {
  console.log(1, first, next, returns)
  return next(222222)
}

function two(other, second, next, returns) {
  console.log(2, other, second, next, returns)
  return next()
}

function three(data, next, returns) {
  console.log(3, data, next, returns)
  return returns(100, 2, 4, 5, 6, 4)
}

function testing() {
  const result = middlewareSync(one, two, three)(10, 20, 30)
  console.log(result) //output -> [ 100, 2, 4, 5, 6, 4 ]
  console.log("finish")
}

testing()

//Output
/*
1 10 [Function: next] [Function: returns]
2 222222 20 [Function: next] [Function: returns]
3 30 [Function: next] [Function: returns]
[ 100, 2, 4, 5, 6, 4 ]
finish
*/
```

## Async Example
```javascript
const { middlewareAsync } = require("nodejs-middleware") //CommonJS
import { middlewareAsync } from "nodejs-middleware" //Module

async function one(first, next, returns) {
  console.log(1, first, next, returns)
  await asyncFunc()
  console.log("one async")
  return next(2222)
}

async function two(other, second, next, returns) {
  console.log(2, other, second, next, returns)
  await asyncFunc()
  console.log("two async")
  return next()
}

async function three(data, next, returns) {
  console.log(3, data, next, returns)
  await asyncFunc()
  console.log("three async")
  return returns(100, 2, 4, 5, 6, 4)
}

function asyncFunc() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("waited")
      return resolve()
    }, 2000);
  })
}

async function testing() {
  const result = await middlewareAsync(one, two, three)(10, 20, 30)
  console.log(result) //output -> [ 100, 2, 4, 5, 6, 4 ]
  console.log("finish")
}

testing()

//Output
/*
1 10 [Function: next] [Function: returns]
waited
one async
2 2222 20 [Function: next] [Function: returns]
waited
two async
3 30 [Function: next] [Function: returns]
waited
three async
[ 100, 2, 4, 5, 6, 4 ]
finish
*/
```