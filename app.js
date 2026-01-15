function authenticateUser(username, password) {
  if (!username || !password) {
    return false;
  }
  return username === "admin" && password === "admin123";
}

function calculateOrderTotal(items) {
  let total = 0;
  items.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}

function applyDiscount(total, discount) {
  return total - (total * discount) / 100;
}

function validatePayment(amount, balance) {
  if (balance >= amount) {
    return "SUCCESS";
  }
  return "FAILED";
}

function processOrder(user, items, discount, balance) {
  if (!authenticateUser(user.username, user.password)) {
    return "Authentication failed";
  }

  const total = calculateOrderTotal(items);
  const finalAmount = applyDiscount(total, discount);

  if (validatePayment(finalAmount, balance) !== "SUCCESS") {
    return "Payment failed";
  }

  return "Order placed successfully";
}

function logTransaction(message) {
  console.log(`[LOG]: ${message}`);
}

const user = { username: "admin", password: "admin123" };
const items = [
  { price: 1000, quantity: 2 },
  { price: 500, quantity: 1 }
];

const result = processOrder(user, items, 10, 3000);
logTransaction(result);

console.log("Repo1 change");
