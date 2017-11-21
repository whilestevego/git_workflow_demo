// Variadic Function
// A function that take a variable amount of arguments.

// Use `...` in front of an argument name where we want
// to be able to get the rest of the arguments. The rest
// the arguments will be elements of an array.
// This is very to Ruby's splat `*`.
function sum (...numbers) {
  let total = 0;

  for (let number of numbers) {
    total += number;
  }
  return total
}
// usage:
sum(8, 9) // returns 17
sum(10) // returns 10
sum(1,2,3,4,5) // returns 15

// You can also use `...` to spread elements of an array as arguments to a function
// which is essentially the reverse of using it to gather a variable amount
// of arguments in an array.

// usage:
sum(...[1,2,3]) // returns 6
const myArr = [1,2,3,4,5]
sum(0, ...myArr) // returns 15

// Objects & Prototypes

// Demo: ArrayExtras

function first (arr) {
  return arr[0];
}

const ArrayExtras = {
  last: function (arr) { // 👈 Traditional way to write a method
    return arr[arr.length - 1];
  },
  first: first,
  take (qty, arr) { // 👈 Using short-hand syntax (only works for methods)
    return arr.slice(0, qty);
  },
  drop (qty, arr) { // 👈 Using short-hand syntax (only works for methods)
    return arr.slice(qty);
  }
}

/* BAD! Only works for methods
take (qty, arr) {
  return arr.slice(0, qty);
}
*/

// usage:
const yourArr = [1,2,3]
ArrayExtras.last(yourArr) // returns 3
ArrayExtras.first(yourArr) // returns 1
ArrayExtras.take(2, yourArr) // returns [1,2]
ArrayExtras.drop(2, yourArr) // returns [3]

// Keyword `this`

console.log("In script scope:", this); // 👈 returns the global `window` object

const can = {
  taloupe: "Wat!?",
  touchThis() { return this }
}

console.log("From can.touchThis():", can.touchThis())
// 👆 `this` is the object that owns a method. In this context, `touchThis` is
// owned by `can`. When it is called as `can.touchThis()`, `this` inside of
// `touchThis` will be `can`.

// `this` is dynamic. It will be the object at a method is called. It is not
// determined by when and where it was created, but only by when and where it used.
const cant = {
  erbury: "Carrot!",
  touchThis: can.touchThis
}

console.log("From cant.touchThis():", cant.touchThis()) // returns cant

const outsideTouchThis = can.touchThis
// 👆 the function `can.touchThis` has been assigned to a variable therefore
// it is no longer owned by `can` meaning that `this` can not be `can`. In this
// case, `this` will be `window`. In most situations (with some exceptions),
// `this` inside a function by itself is usually the `window` or `global` object.

// Demo: Counter
// Exercise: Configurable Steps

const myCounter = {
  count: 0,
  step: 1,
  set (num) {
    this.count = num;
    return this;
  },
  setStep (num) {
    this.step = num;
    return this;
  },
  inc () {
    return this.count += this.step;
  },
  dec () {
    return this.count -= this.step;
  },
  now () {
    return this.count;
  },
  reset () {
    this.step = 1;
    this.count = 0;
    return this;
  }
}

// Constructors

// Use `instanceof` to check if a Object is an instance a constructor or
// descendent of such.

// usage:
// [] instanceof Array; // returns true
// [] instanceof Object; // returns true
// [] instanceof Doggo; // returns false
// 'a' instanceof Array; // returns false

// To the prototype of an object, use `Object.getPrototypeOf()`.
// usage:
Object.getPrototypeOf([]) // gets the Array prototype

/*
function Doggo (name, age) {
  // When function is called as a constructor, `this` will be initialized
  // to {} instead of `window` or whatever object it may belong to.
  this.name = name;
  this.age =  age;
  // When called as a constructor, the return statement will be ignored and
  // `this` will be returned instead.
  return 'Thing'
}

// If we want property that is shared for the cosntructor, we define as
// a property of constructor itself. This the closest pattern that we have
// to emulate a class variable.
Doggo.myClassProperty = "Not really a class property, but kind of..."

// JavaScript implements inheritance using prototypes. When an object is constructed,
// it is assigned a prototype. We can give properties to that prototype object
// with the `.prototype` property available on any constructor as shown below:

Doggo.prototype.bark = function () {
  return `${this.name} says ${['bork', 'bark', 'woof'][Math.floor(Math.random() * 3)]}`;
}


// When accessing a property on a object, JavaScript will first look at the
// object itself. If it can't find it, it will look in the object's prototype.
// If can't find it there, it will look in the object's prototype's prototype.
// It'll do this recursively until it reaches the root prototype, Object.prototype.

// usage:
// To call a function as a constructor, `prefix` it with `new `.
new Doggo("Drill Bit Darryl", 7);
*/

/*
function DoggoFighter (name, age, specialAbility) {
  // this.name = name;
  // this.age = age;
  // this.specialAbility = specialAbility;

  // 👇 Using Object.assign to mutate `this`

  // Object.assign(this, {
  //   name: name,
  //   age: age,
  //   specialAbility: specialAbility
  // })

  // 👇 Object property shorthand syntax
  // const myVar = 10, yourVar = 'Yo!';
  // {myVar, yourVar} -> returns {myVar: 10, yourVar: 'Yo!'}
  Object.assign(this, {name, age, specialAbility});
}

// Strange, but true! To achieve prototype inheritance, we have to
// initialize DoggoFighter's prototype as an instance of the constructor
// whose prototype we want inherit. In this case, that's instance of Doggo.
DoggoFighter.prototype = new Doggo()

DoggoFighter.prototype.fight = function (doggo) {
  return `${[doggo.name, this.name][Math.floor(Math.random() * 2)]} won!`;
}
*/

// Demo: Refactor DoggoFighter using class syntax
class Doggo {
  constructor (name,  age) {
    this.name = name;
    this.age = age;
  }

  bark () {
    return `${this.name} says ${['bork', 'bark', 'woof'][Math.floor(Math.random() * 3)]}`;
  }
}

class DoggoFighter extends Doggo {
  // Inside a JavaScript class, you can only write methods
  // inside the braces.
  constructor (name, age, specialAbility) {
    super(name, age);
    // 👆 super(...) is special function usable inside a constructor
    // that allows to call the `constructor` of a class' parent class.
    // In this case, this is the constructor of Doggo.
    this.specialAbility = specialAbility;
  }

  fight (doggo) {
    return `${[doggo.name, this.name][Math.floor(Math.random() * 2)]} won!`;
  }
}

bobTheSlob = new Doggo('Bob The Slob', 6)
moneyBagsMichael = new DoggoFighter('Money Bags Michael', 10, 'Make it rain!')
jivingJill =  new DoggoFighter('Jiving Jill', 11, 'Jive too long')








// bump
