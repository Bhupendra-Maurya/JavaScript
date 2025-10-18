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

