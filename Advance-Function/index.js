export const curry = (fn, ...outerArgs) => {
  return (...innerArgs) => fn.apply(...outerArgs, ...innerArgs)
}
