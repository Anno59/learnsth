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
class foo{} // not defined.

// 类相当于原型的实例
class a{
  static b(){
    console.log('1')
  }
}

a.b();

var c = new a();
c.b(); // Uncaught TypeError: c.b is not a function


// 类的静态方法与普通方法可以重名；静态方法中的 this 指向类本身
class a{
  static b(){
    this.d();
  }
  static d(){
    console.log(this) // class a
  }
  b(){
    console.log('2')
  }
}
a.b(); // 1
var c = new a();
c.b(); // 2

// 类的实例属性的另一种定义方式
let a = new class foo{
  a = 1; // 与类中其它方法处于同一层级，不需要加 this 关键字
  get value(){
    return this.a;
  }
}();

a.value // 1

class foo{
  static a = 1; // 静态属性
}

foo.a // 1

// 私有属性，只能在类的内部使用
class foo{
  #baz = 1;

  get value(){
    console.log(this.#baz);
  }
}

var boo = new foo();
boo.#baz;  // error
boo.value; // 1

// 用 extend 实现的继承，子类可以取到父类的私有属性

// new.target 返回被 new 出的构造函数
class Foo{
  constructor() {
    console.log(new.target === Foo)
  }
}

class Baz extends Foo{
  constructor() {
    super()
  }
}

new Baz() // false 返回的为子类

// 继承先将父类属性与方法赋予 this，再将属性及方法赋予 this
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y), 必须在 this 前执行
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}

// 静态属性不能被实例继承，但能被子类继承

// Object.getPrototypeOf方法可以用来从子类上获取父类
Object.getPrototypeOf(Foo) === Baz // true baz 为 foo 的父类

// super
class A extends B{
  constructor(){
    super() // super() === B.prototype.constructor.call(this);
    super.foo() // super === B.prototype
  }
}
