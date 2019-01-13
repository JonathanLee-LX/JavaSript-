const _ = require('lodash')

const nums = (new Array(10)).forEach(item => item = Math.random() * 10);
const small = _.find(nums, item => item < 5)

console.log(small)