const { middlewareAsync } = require("./build")

function one(next) {
  console.log(1, next)

  setTimeout(() => {
    
    return next(11)
  }, 1000);

}

function two(other, next) {
  console.log(2, other, next)
}


async function testing() {

  await middlewareAsync(one, two)

  console.log("bitti")
}

testing()