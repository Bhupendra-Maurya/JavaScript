### **What is a Closure?**
A **closure** is created when a function (the *inner* function) remembers and has access to the variables from its *outer* (enclosing) function's scope, even **after** the outer function has finished executing.

This happens because functions in JavaScript form a **lexical environment** when they're defined. This environment is preserved whenever the inner function is used or returned.

***
## **A Clear Closure Example**
Here's how to return an inner function, so you can see closure in action:

```javascript
function Outer() {
  let count = 0;
  function Inner() {
    count++;
    console.log("Inner " + count);
  }
  return Inner; // <-- returning the function itself, *not* calling it here!
}

const counter = Outer(); // Outer runs, returns Inner, closure keeps count alive
counter(); // Inner 1
counter(); // Inner 2
counter(); // Inner 3
```

**What's happening?**
- `Outer()` is called **once**. It creates the `count` variable and returns `Inner`.
- `counter` now holds a *reference* to the `Inner` function, which still has access to `count` **even though `Outer` has finished running**.
- Each time you call `counter()`, it bumps and prints `count`. The data stays private and preserved!

***
## **Why Closures Are Useful**
- **Data privacy:** Variables inside the closure are inaccessible from outside (safe encapsulation).
- **Factory functions:** You can create many closures, each with their own "private" data (e.g., counters, settings).
- **Callbacks & Event Handlers:** Closures let async code (like setTimeout or event listeners) remember the environment they were created in.
---

## 🧠 Real-world Example: **Data Privacy (Encapsulation)**

Closures are often used to **hide private variables** and expose only controlled access — just like *private properties in classes*.

---

### 🔧 Example: A Bank Account

Imagine you want to create a function that manages a user’s bank account —
you want to store the balance privately and expose only a few operations (`deposit`, `withdraw`, `getBalance`).

Here’s how closures help 👇

```js
function createAccount(initialBalance) {
  let balance = initialBalance; // private variable — not directly accessible outside

  function deposit(amount) {
    if (amount > 0) {
      balance += amount;
      console.log(`Deposited ₹${amount}.`);
    }
  }

  function withdraw(amount) {
    if (amount > 0 && amount <= balance) {
      balance -= amount;
      console.log(`Withdrew ₹${amount}.`);
    } else {
      console.log("Insufficient balance or invalid amount.");
    }
  }

  function getBalance() {
    console.log(`Current Balance: ₹${balance}`);
  }

  // expose only specific functions
  return { deposit, withdraw, getBalance };
}

const myAccount = createAccount(1000);
myAccount.deposit(500);      // Deposited ₹500.
myAccount.getBalance();      // Current Balance: ₹1500
myAccount.withdraw(200);     // Withdrew ₹200.
myAccount.getBalance();      // Current Balance: ₹1300

console.log(myAccount.balance); // ❌ undefined (cannot access directly)
```

---

### 🔍 What’s happening here?

* The variable `balance` is defined inside `createAccount()`.
* It’s **not accessible directly** from outside (like a private field).
* But all inner functions (`deposit`, `withdraw`, `getBalance`) **remember** it through **closures**.

So even after `createAccount()` finishes running, those inner functions still have access to `balance`.

That’s how you achieve **data privacy** and **stateful behavior** — without using classes.

---

### 🧩 Another Example: Counter (simpler but practical)

```js
function createCounter() {
  let count = 0;

  return {
    increment: () => console.log(++count),
    decrement: () => console.log(--count),
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
```

✅ `count` stays private
✅ Functions can access and modify it
✅ The outer function’s environment stays alive through closure

---

### 🧱 In Summary

| Concept           | Example                                      | Why It’s Useful                            |
| ----------------- | -------------------------------------------- | ------------------------------------------ |
| **Closure**       | Inner function remembers outer variables     | Keeps state alive                          |
| **Encapsulation** | `balance` or `count` hidden from outside     | Improves security                          |
| **Practical Use** | Banking apps, counters, modules, React hooks | Prevents data leaks or direct manipulation |

---

## 🧩 Code Recap

```js
function outer() {
  let getY;
  {
    const y = 6;
    getY = () => y;
  }
  console.log(typeof y); // undefined
  console.log(getY()); // 6
}

outer();
```

---

## 🧠 Step-by-Step Explanation

### 1. Function starts executing

When `outer()` is called, a new **function scope** is created.

Inside it, we declare:

```js
let getY;
```

At this point, `getY` is `undefined`.

---

### 2. Enter the block `{ ... }`

Inside this block, we declare:

```js
const y = 6;
```

Now, `y` exists **only within this block** because it’s declared with `const` (block-scoped variable).

Then we assign:

```js
getY = () => y;
```

✅ Here’s the key part:
`getY` is assigned a **function** that *closes over* the variable `y`.

That means `getY` now “remembers” the value of `y` (6), even after the block ends.

---

### 3. After the block ends

Once we leave the `{ }` block:

* The variable `y` is no longer **in scope** — it’s not accessible directly.
* But, it’s **still alive** in memory because the arrow function `getY` has a **closure** referencing it.

---

### 4. `console.log(typeof y)`

This line is **outside** the block where `y` was defined.

So, from this outer scope, `y` is **not defined at all**.

That’s why:

```js
typeof y  // "undefined"
```

✅ (Note: `typeof` doesn’t throw an error for undeclared variables — it just returns `"undefined"`.)

---

### 5. `console.log(getY())`

Now, when we call `getY()`:

* The function `getY` still has access to the `y` from the inner block via **closure**.
* It returns `6`.

So this logs:

```
6
```

---

## 🔍 Key Takeaway

| Concept                          | Explanation                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| **Block scope (`const`, `let`)** | Variables exist only inside their `{}` block.                                            |
| **Closure**                      | A function can “remember” variables from its defining scope, even after that scope ends. |
| **`typeof` behavior**            | Returns `"undefined"` for undeclared variables instead of throwing an error.             |

---

## 💡 Visualization

```
outer()
 ├── getY (declared)
 ├── Block {
 │     const y = 6
 │     getY = () => y   ← closure created here
 │ }
 ├── typeof y  → undefined (y not in this scope)
 └── getY() → 6 (closure still remembers y)
```

---

## 🧠 Analogy

Think of the block `{ ... }` as a **locked room** where `y` was created.
You can’t see `y` from outside — but you gave `getY` a *key* to that room before locking it.
So `getY()` can still go inside and retrieve `y` whenever it wants. 🔐

