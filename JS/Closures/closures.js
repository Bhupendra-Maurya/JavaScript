/*
A closure is created when a function “remembers” the variables from its outer scope, even after that outer function has finished executing.
*/

function Outer() {
  let count = 0;
  function Inner() {
    count++;
    console.log("Inner: " + count);
  }
  return Inner;
}

const counter = Outer();
// counter()
// counter()
// counter()

function counter2() {
  var num = 0;
  return function () {
    num++;
    return num;
  };
}
// const c1 = counter2();
// console.log(c1());
// console.log(c1());
// const c2 = counter2();
// console.log(c2());

// if (Math.random() > 0.5) {
//   var x = 1;
// } else {
//   var x = 2;
// }
// console.log(x);

// if (Math.random() > 0.5) {
//   const x = 1;
// } else {
//   const x = 2;
// }
// console.log(x); // ReferenceError: x is not defined

// function makeFunc() {
//   const name = "Mozilla";
//   function displayName() {
//     console.log(name);
//   }
//   return displayName;
// }

// const myFunc = makeFunc();
// myFunc();

function Car() {
  const model = "Model 1";
  const name = "Toyota";
  const color = "Black";
  const manufacturedAt = "24/2025";

  function carModel() {
    console.log(model);
    console.log(manufacturedAt);
  }

  function carDetails() {
    console.log(name);
    console.log(color);
  }

  return { carModel, carDetails };
}

const carInstance = Car();
carInstance.carModel();   // Model 1, 24/2025
carInstance.carDetails(); // Toyota, Black


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
