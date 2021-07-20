// Variables created to select each button's data attribute.
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-clear");
const equalsBtn = document.querySelector("[data-equals]");
const previousScreenTextContent = document.querySelector("[data-previous]");
const currentScreenTextContent = document.querySelector("[data-current]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const numberBtns = document.querySelectorAll("[data-number]");

// Variables that store numbers to be operated on.
let currentScreen = "";
let previousScreen = "";
// Variable stores which operator has been selected.
let operation = undefined;

const operate = () => {
  const previous = parseFloat(previousScreen);
  const current = parseFloat(currentScreen);
  if (isNaN(current)) return;
  if (operation === "+") {
    currentScreen = previous + current;
  }
  if (operation === "-") {
    currentScreen = previous - current;
  }
  if (operation === "÷") {
    currentScreen = previous / current;
  }
  if (operation === "*") {
    currentScreen = previous * current;
  }

  operation = undefined;
  previousScreen = "";
  updateDisplay();
};

// Allows user to type multiple digit numbers.
const appendNumber = (number) => {
  if (number === "." && currentScreen.includes(".")) return;
  currentScreen = currentScreen.toString() + number.toString();
  updateDisplay();
};
// Selects operator to perform computation with.
const selectOperator = (operator) => {
  if (currentScreen === "") return;
  if (previousScreen !== "") {
    operate();
  }
  operation = operator;
  previousScreen = currentScreen + operation;
  currentScreen = "";
  updateDisplay();
};
const updateDisplay = () => {
  currentScreenTextContent.textContent = currentScreen;
  previousScreenTextContent.textContent = previousScreen;
};
const clear = () => {
  currentScreen = "";
  previousScreen = "";
  operation = undefined;
};

// Checks for number buttons being clicked.
numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});
operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    selectOperator(button.textContent);
  });
});
// Clears and resets calculator display.
allClearBtn.addEventListener("click", () => {
  currentScreen = "";
  previousScreen = "";
  updateDisplay();
});
// Clears current input but maintains previous input.
deleteBtn.addEventListener("click", () => {
  currentScreen = "";
  updateDisplay();
});
equalsBtn.addEventListener("click", () => {
  operate();
});

window.addEventListener("keydown", (e) => {
  const keypadNumber = document.querySelector(
    `[data-key-number="${e.keyCode}"`
  );
  appendNumber(keypadNumber.textContent);
});
window.addEventListener("keydown", (e) => {
  const keypadOperators = document.querySelector(
    `button[data-key-operator="${e.keyCode}"`
  );
  selectOperator(keypadOperators.textContent);
});

window.addEventListener("keydown", (e) => {
  const keypadEquals = document.querySelector(
    `button[data-key-equals="${e.keyCode}"]`
  );
  operate();
});

// const keypadClear = document.querySelector('button[data-key-clear="27"]');
// keypadClear.addEventListener("keydown", (e) => {
//   console.log(keypadClear.textContent);
//   currentScreen = "";
//   previousScreen = "";
// });

window.addEventListener("keydown", (e) => {
  const keypadDelete = document.querySelector(
    `button[data-key-delete="${e.keyCode}"]`
  );
  e.keycode === "Delete";
  console.log(keypadDelete.textContent);
  currentScreen = "";
});
