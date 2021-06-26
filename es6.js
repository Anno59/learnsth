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

// 继承先将父类属性与方法赋予 this，再将子类属性及方法赋予 this
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y), 必须在 this 前执行，执行 super 后才返回 this ；子类才能使用
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类 prototype 中的 toString()，而在静态方法中指向父类
  }
}

// 静态属性不能被实例继承，但能被子类继承

// Object.getPrototypeOf 方法可以用来从子类上获取父类
Object.getPrototypeOf(Foo) === Baz // true baz 为 foo 的父类

// super
class A extends B{
  constructor(){
    super() // super() === B.prototype.constructor.call(this);
            // 该方法也只能在 constructor 中调用
    super.foo() // super === B.prototype，且只能调用父类原型对象上的属性或者方法
  }
}

// 子类实例普通方法中通过 super 调用父类方法，方法内部的 this 指向子类实例
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print(); // super.print.call(this)
  }
}

let b = new B();
b.m() // 2

// 子类实例普通方法中通过 super 进行赋值，super 就等于子类的 this ：super === this
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();

// 在静态方法中 super 作为对象调用时，指向父类，而不是父类的原型对象
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2

// 子类的静态方法中调用 super，this 指向的是子类而不是子类实例
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super(); // super() == A.prototype.constructor.call(this)
    this.x = 2;
  }
  static m() {
    super.print();
  }
}


B.x = 3;
B.m() // 3

