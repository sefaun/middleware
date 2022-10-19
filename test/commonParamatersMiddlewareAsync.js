const { commonParamatersMiddlewareAsync } = require("../build")


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