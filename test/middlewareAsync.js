const { middlewareAsync } = require("../build")


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
  console.log(result)
  console.log("finish")
}

testing()