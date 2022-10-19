export function commonParamatersMiddlewareSync(...[]: Iterable<Function>): any {
  const slice = Array.prototype.slice

  const stacks = slice.call(arguments)
  const that = this

  if (!stacks.length) {
    throw new Error("There is no any argument functions.")
  }

  for (let i = 0; i < stacks.length; i++) {
    if (typeof stacks[i] !== "function") {
      throw new Error(`Arguments ${i + 1} is not a Function. All arguments have to be a Function.`)
    }
  }

  return function (...[]: Iterable<any>) {
    var arg = 0
    var return_values = []
    var next_old_parameters = []
    const params = slice.call(arguments)

    if (!params.length) {
      throw new Error("There is no any arguments.")
    }

    function returns(...[]: Iterable<any>) {
      return_values = slice.call(arguments)
      return return_values
    }

    function next() {
      const next_args = slice.call(arguments)
      if (next_args.length) {
        next_old_parameters.push(...next_args, ...next_old_parameters)
      }
      arg++
      stacks[arg].apply(that, [...next_old_parameters, ...params, next, returns])
    }

    stacks[arg].apply(that, [...params, next, returns])

    return return_values as any
  }

}