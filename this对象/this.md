# this 对象全面解析

## 调用位置

在理解 this 的绑定过程之前，首先需要了解*调用位置*：
调用位置就是函数在代码中被调用的位置（而不是声明的位置）。只有仔细分析调用位置才能回答这个问题：这个`this`到底引用了什么？
通常来说，寻找调用位置就是寻找“函数被调用时的位置”，但是做起来并没有这么简单，因为有些**编程模式**会隐藏函数真正调用的位置。
最重要的是要分析调用栈（就是为了到达当前执行位置所调用的所有函数）。我们关心的调用位置就是当前正在执行的函数的前一个调用中。
下面我们来看看到底什么是调用栈和调用位置：

```js
function baz() {
  console.log('baz');
  bar();
}

function bar() {
  console.log('bar');
  foo();
}

function foo() {
  console.log('foo');
}

baz();
```

注意我们是如何（从调用栈中）分析真正的调用位置的，因为它决定了`this`的绑定。

## 绑定规则

我们来看看在函数的执行过程中调用位置如何决定`this`的绑定对象。
你必须找到调用位置，然后判断需要应用下面这四条规则中的哪一条。我们首先会分别解释这四条规则，然后解释多条规则都可用是它们的优先级如何排序。

### 默认绑定

首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。
思考一下下面的代码：

```js
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); // 2
```

你应该注意到的第一件事，声明在全局作用域中的变量（比如 var a = 2）就是全局对象的一个属性。它们本质就是同一个东西，并不是通过复制得到的，就像一个硬币的两面一样。
接下来，我们看到当调用 foo()时，this.a 被解析成了全局变量 a。为什么？因为在本例中，函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。
那么我们怎么知道这里应用了默认绑定呢？可以通过分析调用位置来看看 foo()是如何调用的。在代码中，foo()是直接使用了不带任何修饰的函数的引用进行调用的，因此只能使用默认绑定，无法应用其他规则。
如果使用严格模式（strict mode),则不能将全局对象用于默认绑定，因此 this 会绑定到 undefined：

```js
function foo() {
  'use strict';
  console.log(this.a);
}
var a = 2;
foo(); // TypeError: Cannot read property 'a' of undefined
```

> 通常来说你不应该在代码中混合使用 strict 模式和非 strict 模式。整改程序要么严格要么非严格。然而，有时候你可能会用到第三方库，其严格程度和你的代码有所不同，因此一定要注意这类兼容性的细节。

### 隐形绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或则说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。
思考下面这些代码：

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo,
};

obj.foo(); // 2
```

首先需要注意的是 foo()的声明方式，及其之后是如何被当作引用属性添加到 obj 中的，但是无论是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 obj 对象。
然而，调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象“拥有”或者“包含”它。
无论你如何称呼这个模式，当 foo()被调用时，它前面确实加上了对 obj 的引用。**当函数引用有上下文对象时**，*隐式绑定*规则会把函数调用中的 this 绑定到这个上下文对象。因为调用 foo()时 this 被绑定到 obj，因此`this.a`和`obj.a`时一样的。
对象属性引用链中只有上一层或者说是最后一层再调用位置中起作用。举例来说：

```js
function foo() {
  console.log(this.a);
}

var a = 0;

var obj1 = {
  a: 1,
  foo: foo,
};

var obj2 = {
  a: 2,
  obj1: obj1,
};
obj1.foo(); // 1
obj2.obj1.foo(); // 1
```

#### 隐式丢失

一个最常见的问题就是被隐式绑定的函数会丢失绑定对象，也就是说会应用**默认绑定**，从而把 this 绑定到全局对象或则 undefined 上，取决于是否是严格模式。
思考下面的代码：

```js
function foo() {
  console.log(this.a);
}

var a = 0;
var obj = {
  a: 1,
  foo: foo,
};
var bar = obj.foo;
bar(); // 0
```

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定。
一种更微妙，更常见并且出乎意料的情况发生再传入回调函数时：

```js
function foo() {
  console.log(this.a);
}
function doFoo(fn) {
  fn();
}

var obj = {
  a: 1,
  foo: foo,
};

var a = 0;

doFoo(obj.foo); // 0
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样。
如果把函数传入 JavaScript 内置的函数会怎么样呢？答案是一样的，没有任何区别：

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 1,
  foo: foo,
};

var a = 'oops, global';

setTimeout(obj.foo, 1000); // "oops, global"
```

## 显示绑定

就像我们刚才看到的那样，再分析隐式绑定的时，我们必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把 this 间接（隐式）绑定到这个对象上。
那么如果我们不想再对象内部包含函数引用，而想在某个对象上强制调用函数，该怎么做呢？
JavaScritpt 中的“所有”函数都有一些有用的特性（这和它们的[[prototype]]有关————之后我们会详细介绍原型），可以用来解决这个问题。具体点说，可以使用函数的 call(...)和 apply(...)方法。但是这样的函数非常罕见，JavaScript 提供的绝大多数函数以及你自己创建的所有函数都可以使用 call(...)和 apply(...)方法。
这两个方法是如何工作的呢？它们的第一个参数是一个对象，是给 this 准备的，接着在调用函数时将其绑定到 this。因为你可以直接指定 this 的绑定对象，因此我们称之为显示绑定。
思考下面的代码：

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

foo.call(obj); // 2
```

通过 foo.call(...),我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。
如果你传入了一个原始值（字符串类型，布尔类型或者数字类型）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(...), new Boolean(...)或者是 new Number(...)）。这通常被称为“装箱”。

### 硬绑定

但是显示绑定的一个变种可以解决这个问题。
思考下面的代码：

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
};

var bar = function() {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2
bar.call(window); // 2
```

我们创建了函数 bar()，并在它的内部手动调用了 foo.call(obj)，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它总会手动在 obj 上调用 foo。这种绑定是一种显示的强制绑定，因此我们称之为**硬绑定**。
硬绑定的典型应用场景就是创建一个包裹函数，负责接收参数并返回值：

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
};

var bar = function() {
  return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5
```

由于**硬绑定**是一种非常常用的模式，所以 ES5 提供了内置的方法 Function.prototype.bind,它的用法如下：

```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}

var obj = {
  a: 2,
};

var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5
```

bind(...)会返回一个硬编码的新函数，它会把你指定的参数设置为 this 的上下文并调用原始函数。

### API 调用的“上下文”

第三方库的许多函数，以及 JavaScript 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为“上下文（context）”,其作用和 bind(...)一样，确保你的回调函数使用指定的 this。
举例来说：

```js
function foo(el) {
  console.log(el, this.id);
}

var obj = {
  id: 'awesome',
}[(1, 2, 3)].forEach(foo, obj);
```

这些函数实际上就是通过 call(...)或者 apply(...)实现了显示绑定，这样你可以少写一些代码。

forEach 实现方式

```js
Array.prototype.forEach = function(fn, context) {
  if (!Array.isArray(this))
    throw new Error('TypeError, this is not a array type');
  var self = this,
    i = 0,
    len = self.length;
  while (i < len) {
    fn.call(context, self[i], i, self);
    i++;
  }
};
```

## new 绑定

在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new 初始化类时会调用类中的构造函数。通常形式是这样的：
`something = new SomeClass(...)`
JavaScript 也有一个 new 操作符，使用方法看起来也和其他的那些面向类的语言一样，绝大多数开发者都认为 JavaScript 中的 new 的机制也和那些语言一样。然而，JavaScritp 中的 new 的机制实际上和面向类的语言完全不同。
首先我们重新定义一下 JavaScript 中的**构造函数**。在 JavaScript 中，构造函数只是一些使用 new 操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。
举例来说，思考一下 Number(...)作为构造函数时的行为，ES5.1 中这样描述它：

> 15.7.2 Number 构造函数
> 当 Number 在 new 表达式中被调用时，它是一个构造函数：它会初始化新创建的对象。
> 所以，包括内置对象函数（比如 Number(...),详情请查看第三章）在内的所有函数都可以用 new 来调用，这种函数调用称为构造函数调用。这里有一个重要但是非常细微的区别：实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。
> 使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

- 1.创建（或者说构造）一个全新的对象。
- 2.这个新对象会被执行[[Prototype]]连接。
- 3.这个新对象会绑定到函数调用的 this。
- 4.如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

我们现在关心的第 1 步，第 3 步和第 4 步，所以暂时跳过第 2 步，第 5 章会详细介绍它。
思考下面代码：

```js
function foo(a) {
  this.a = a;
}

var bar = new foo(2);
console.log(bar.a); // 2
```

使用 new 来调用 foo(...)时，我们会构造一个新对象并把它绑定到 foo(...)调用中的 this 上。new 是最后一种可以影响调用时 this 绑定行为的方法，我们称之为 new 绑定。
