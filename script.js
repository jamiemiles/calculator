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

const operate = (a, b, c) => {
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
};

// Allows user to type multiple digit numbers.
const appendNumber = (number) => {
  if (number === "." && currentScreen.includes(".")) return;
  currentScreen = currentScreen.toString() + number.toString();
};
const selectOperator = (operator) => {
  if (currentScreen === "") return;
  if (previousScreen !== "") {
    operate();
  }
  operation = operator;
  previousScreen = currentScreen + operation;
  currentScreen = "";
};
const updateDisplay = () => {
  currentScreenTextContent.textContent = currentScreen;
  previousScreenTextContent.textContent = previousScreen;
};

// Checks for number buttons being clicked.
numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    updateDisplay();
  });
});
operatorBtns.forEach((button) => {
  button.addEventListener("click", () => {
    selectOperator(button.textContent);
    updateDisplay();
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
  operate(previousScreen, currentScreen, operation);
  updateDisplay();
});
