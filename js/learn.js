const foo = {a : 1};
const bar = foo;
foo.a++;
console.log('foo.a =', foo.a);
console.log('bar.a =', bar.a);



const numbers = [11, 12, 13, 15, 100];

const isEveryNumberOverTen = numbers.every((value) => {
  return value > 10;
});
console.log (isEveryNumberOverTen);



const films = [
  {
    id: 0,
    title: 'Die hard'
  },
  {
    id: 1,
    title: 'Terminator'
  }
];

const terminatorFilm = films.find((film) => {
  return film.title === 'Terminator';
});

console.log(terminatorFilm);



const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (sum, currentValue) => sum + currentValue,
  initialValue);

console.log(sumWithInitial);
