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
  updateDisplay();
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

// Enables keyboard compatability
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    allClearBtn.classList.add("pressed");
    clear();
  }
  if (e.key === "Delete") {
    deleteBtn.classList.add("pressed");
    currentScreen = "";
    updateDisplay();
  }
  if (e.key === "Enter") {
    equalsBtn.classList.add("pressed");
    operate();
  }
  if (
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "0" ||
    e.key === "."
  ) {
    appendNumber(e.key);
    updateDisplay();
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    selectOperator(e.key);
  }
  if (e.key === "Backspace") {
    currentScreen = currentScreen.slice(0, -1);
    updateDisplay();
  }
});
