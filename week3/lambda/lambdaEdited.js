const id = x => x;
const fst = x => y => x;
const snd = x => y => y;

const M = f => f(f); // mockingbird

const konst = fst;

// const T = first => second => first; // true, church encoding
// -> alpha translation:
const T = fst;
// const F = first => second => second; // false, church encoding
// -> alpha translation:
const F = snd;

// const and = first => second => first(second(T)(F))(second(F)(F)); // convention: first -> p, second -> q; the first T corresponds to "if first is true and second is true, then the result is T"
// simplification
// const and = first => second => first(second(T)(F))(F);
// simplification
// const and = first => second => first(second)(F);
// simplification
const and = first => second => first(second)(first);

// const or = first => second => first(second(T)(T))(second(T)(F));
// simplification
// const or = first => second => first(T)(second(T)(F));
// simplification
// const or = first => second => first(T)(second);
// -> eta reduction:
// const or = first => first(first);
// simplification
// const or = first => M(first);
// -> eta reduction:
const or = M;

const Pair = first => second => f => f(first)(second); // f is a discriminator function (or a getter). Example use in lambdaTest.js
// const firstname = first => second => first;
// simplification
const firstname = fst;
// const lastname = first => second => second;
// simplification
const lastname = snd;

const Left = msg => f => g => f(msg); // no eta reduction possible, because msg comes as first argument
const Right = res => f => g => g(res);
// const either = e => err => ok => e(err)(ok);
// -> eta reduction:
// const either = e => e;
// simplification
const either = id;

// example code from lambdaTest.js:
// const safeDiv = num => divisor => divisor === 0 ? Left("schlecht!") : Right(num / divisor);
// the result of safeDiv is either Left or Right
// either(safeDiv(1)(0))(err => console.error(err))(msg => console.log(msg));

// ----- special -----

const Tuple = n => [
  parmStore(n + 1)([])(parms =>
    parms.reduce((accu, it) => accu(it), parms.pop())
  ), // ctor
  ...Array.from({ length: n }, (it, idx) => iOfN(n)(idx)()) // selectors
];

const iOfN = n => i => (
  value // from n curried params, take argument at position i,
) => (n === 0 ? value : x => iOfN(n - 1)(i - 1)(i === 0 ? x : value));

const parmStore = n => args => (
  onDone // n args to come
) => (n === 0 ? onDone(args) : arg => parmStore(n - 1)([...args, arg])(onDone)); // store parms in array

const Choice = n => [
  ...Array.from({ length: n }, (it, idx) =>
    parmStore(n + 1)([])(parms => parms[idx + 1](parms[0]))
  ), // ctors
  id
];
