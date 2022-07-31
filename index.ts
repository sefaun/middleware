export function middlewareSync() {

  var slice = Array.prototype.slice
  var stack = slice.call(arguments)
  var arg = 0

  if (!stack.length) {
    throw new Error("Not Found Any Function")
  }

  function next() {
    var new_args = slice.call(arguments)
    arg++

    if (stack.length <= arg) {
      throw new Error("No Function To Next")
    }

    stack[arg].apply(this, [...new_args, next]);
  }

  stack[arg].apply(this, [next]);

}


export async function middlewareAsync() {

  var slice = Array.prototype.slice
  var stack = slice.call(arguments)
  var arg = 0
  var that = this

  if (!stack.length) {
    throw new Error("Not Found Any Function")
  }

  await new Promise((_resolve, _reject) => {

    function next() {
      var new_args = slice.call(arguments)
      arg++

      if (stack.length <= arg) {
        throw new Error("No Function To Next")
      }

      stack[arg].apply(that, [...new_args, next]);
    }

    stack[arg].apply(that, [next]);

  })
}