const { middlewareAsync } = require("../build")


function one(first, next, returns) {
  console.log(1, first, next, returns)
  
  setTimeout(() => {
    return next(222222)
  }, 2000);
}

function two(other, second, next, returns) {
  console.log(2, other, second, next, returns)
  next()
}

function three(data, next, returns) {
  console.log(3, data, next, returns)

  return returns(100, 2, 4, 5, 6, 4)

}


async function testing() {

  let result = await middlewareAsync(one, two, three)(10, 20, 30)

  console.log(result)
  console.log("finish")
}

testing()