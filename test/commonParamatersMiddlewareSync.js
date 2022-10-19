const { commonParamatersMiddlewareSync } = require("../build")


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