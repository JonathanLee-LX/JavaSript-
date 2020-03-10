export const curry = (fn, ...outerArgs) => {
  return (...innerArgs) => fn.apply(null, [...outerArgs, ...innerArgs])
}
