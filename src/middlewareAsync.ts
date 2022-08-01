const slice = Array.prototype.slice

export function middlewareAsync(): any {

  const stack = slice.call(arguments)
  var arg = 0
  var params = []
  var return_values = []

  if (!stack.length) {
    throw new Error("Not Found Any Function")
  }

  return function () {

    params = slice.call(arguments)

    function returns() {
      return_values = slice.call(arguments);
    }

    let new_params = []

    if (params[arg] !== undefined) {
      new_params.push(params[arg])
    }

    stack[arg].apply(this, [...new_params, next, returns])

    function next() {
      const new_args = slice.call(arguments)
      arg++

      let new_params = []

      new_params.push(...new_args)

      if (params[arg] !== undefined) {
        new_params.push(params[arg])
      }

      stack[arg].apply(this, [...new_params, next, returns])
    }

    return return_values.length ? return_values : undefined
  }

}