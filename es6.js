function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return "(" + this.x + ", " + this.y + ")";
};

var p = new Point(1, 2);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
}

var p = new Point(1, 2);

Object.assign(Point.prototype); // [constructor, string]

Object.keys(Point.prototype); // []

class Foo {
  constructor() {
    return Object.create(null);
  }
}

var foo = new Foo();

foo instanceof Foo; // false

Object.getPrototypeOf(foo);

/**
 * 0520
 */
const object1 = {
  property1: 42,
};

const descriptor1 = Object.getOwnPropertyDescriptor(object1, "property1");

console.log(descriptor1.configurable);
// expected output: true

console.log(descriptor1.value);
// expected output: 42

// ===========================
class Foo {
  constructor(elem) {
    this.elem = elem;
  }
  get h() {
    return this.elem;
  }
  set h(hh) {
    this.elem = hh + this.elem + "test";
  }
}

var foo1 = new Foo(10);
foo1.h = "1";
console.log(foo1.h); // 110test


// ===========================
let methodName = 'get';

class Square {
  [methodName](){
  }
}

Square.prototype // {constructor: ƒ, get: ƒ}

let methodName = class Square {

  test(){
    return Square.name;
  }
}

let a = new methodName;
console.log(a.test())
console.log(Square.name);
Square.prototype // {constructor: ƒ, get: ƒ}


const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
let inst = new MyClass();
inst.getClassName() // Me
Me.name // error

// 立即执行类
let person = new class{
  constructor(name) {
    this.name = name;
  }
  say(){
    console.log(this.name);
  }
}('test')

person.say() // 'person'

new foo();
class foo{} // not defined






