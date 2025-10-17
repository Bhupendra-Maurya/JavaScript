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

***
### **Quick Check**
Could you try editing your code to:
1. Change `Outer` to return `Inner`.
2. Then call the returned function multiple times and observe what happens with `count`.

**Bonus:** Try creating two counters:
```javascript
const counterA = Outer();
const counterB = Outer();
counterA(); // ?
counterB(); // ?
counterA(); // ?
counterB(); // ?
```
What do you predict will happen, and why?

Let me know when you're ready, or if you'd like a summary or a memory trick for closures!