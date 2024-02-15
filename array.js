//map()
const num_map = [1, 2, 3, 4, 5];
const doubledNumbers = num_map.map((num) => num * 2);
console.log("map() with Doubled Number:", doubledNumbers); // Output: [2, 4, 6, 8, 10]

//filter()
const num_filter = [1, 2, 3, 4, 5];
const evenNumbers = num_filter.filter((num) => num % 2 === 0);
console.log("filter() with Even Number:", evenNumbers); // Output: [2, 4]

//reduce()
const num_reduce = [1, 2, 3, 4, 5];
const sum = num_reduce.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);
console.log("reduce() with Sum:", sum); // Output: 15

//forEach()
const num_foreach = [1, 2, 3, 4, 5];
num_foreach.forEach((num) => console.log("foreach() with Number:", num)); // Output: 1 2 3 4 5

//find()
const num_find = [1, 2, 3, 4, 5];
const foundNumber = num_find.find((num) => num === 3);
console.log("find() with found Number:", foundNumber); // Output: 3

//indexOf()

const num_indexof = [1, 2, 3, 4, 5];
const index = num_indexof.indexOf(5);
console.log("indexof() with Index:", index); // Output: 4

//includes()
const num_includes = [1, 2, 3, 4, 5];
const hasNumber = num_includes.includes(3);
console.log("includes() has Number:", hasNumber); // Output: true

//push()
const num_push = [1, 2, 3, 4, 5];
num_push.push(6);
console.log("push() with Push Number:", num_push); // Output: [1, 2, 3, 4, 5, 6]

//pop()
const num_pop = [1, 2, 3, 4, 5];
const poppedNumber = num_pop.pop();
console.log("pop() with Pop Number:", poppedNumber); // Output: 5

//shift()
const num_shift = [1, 2, 3, 4, 5];
const shiftedNumber = num_shift.shift();
console.log("Shifted Number:", shiftedNumber); // Output: 1
