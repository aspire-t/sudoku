const toolkit = require('./util')

const a = toolkit.makeMatrix()
a[0][1] = 2
console.log(a)

const b = Array.from({ length: 9 }, (v, i) => i)
console.log(b)
console.log(toolkit.shuffle(b))