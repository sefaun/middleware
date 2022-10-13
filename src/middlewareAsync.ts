export function middlewareAsync(...[]: Iterable<Function>): any {
  const slice = Array.prototype.slice
  const stacks = slice.call(arguments)
  const that = this

  if (!stacks.length) {
    throw new Error("There is no any arguments.")
  }

  for (let i = 0; i < stacks.length; i++) {
    if (typeof stacks[i] !== "function") {
      throw new Error(`Arguments ${i + 1} is not a Function. All arguments have to be a Function.`)
    }
  }

  return async function () {
    var arg = 0
    var return_values = []
    const params = slice.call(arguments)

    function returns() {
      return_values = slice.call(arguments)
      return return_values
    }

    async function next() {
      arg++
      const new_args = slice.call(arguments)
      await stacks[arg].apply(that, [...new_args, params[arg], next, returns])
    }

    await stacks[arg].apply(that, [params[arg], next, returns])

    return return_values.length ? return_values : undefined
  }

}