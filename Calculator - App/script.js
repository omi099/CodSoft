document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".button");
  let currentInput = "0";
  let previousInput = "";
  let operator = "";
  let awaitingNextInput = false;

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function calculate() {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result = 0;

    if (operator === "+") {
      result = num1 + num2;
    } else if (operator === "-") {
      result = num1 - num2;
    } else if (operator === "*") {
      result = num1 * num2;
    } else if (operator === "/") {
      if (num2 === 0) {
        return "Error: Div by 0"; //Error handeling
      }
      result = num1 / num2;
    } else if (operator === "%") {
      result = num1 % num2;
    }

    return result.toString();
  }

  function handleNumber(number) {
    if (awaitingNextInput) {
      currentInput = number;
      awaitingNextInput = false;
    } else {
      currentInput = currentInput === "0" ? number : currentInput + number;
    }
  }

  function handleOperator(op) {
    if (op === "pm") {
      currentInput = (parseFloat(currentInput) * -1).toString();
      updateDisplay();
      return;
    }

    if (operator && !awaitingNextInput) {
      const result = calculate();
      if (result === "Error: Div by 0") {
        currentInput = result;
      } else {
        previousInput = result;
        currentInput = result;
      }
    } else {
      previousInput = currentInput;
    }
    operator = op;
    awaitingNextInput = true;
  }

  function handleEquals() {
    if (operator) {
      const result = calculate();
      if (result === "Error: Div by 0") {
        currentInput = result;
      } else {
        currentInput = result;
        operator = "";
        awaitingNextInput = true; // Ready for new input after calculation
      }
    }
  }

  function clear() {
    currentInput = "0";
  }

  function allClear() {
    currentInput = "0";
    previousInput = "";
    operator = "";
    awaitingNextInput = false;
  }
  function handleDecimal() {
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const keyValue = button.dataset.key; //Using dataset for key values

      if (!isNaN(parseInt(keyValue))) {
        // If it is number
        handleNumber(keyValue);
      } else if (keyValue === ".") {
        handleDecimal();
      } else if (
        keyValue === "+" ||
        keyValue === "-" ||
        keyValue === "*" ||
        keyValue === "/" ||
        keyValue === "%"
      ) {
        handleOperator(keyValue);
      } else if (keyValue === "pm") {
        handleOperator(keyValue); //call function with value
      } else if (keyValue === "Enter") {
        handleEquals();
      } else if (keyValue === "Escape") {
        allClear();
      } else if (keyValue === "c") {
        clear();
      }

      updateDisplay();
    });
  });

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    const button = document.querySelector(`.button[data-key="${key}"]`);

    if (button) {
      button.click(); // Simulate a button click
    } else if (key === "Backspace") {
      clear();
      updateDisplay();
    } else if (key === "Enter" || key === "=") {
      // Check for Enter key
      handleEquals();
      updateDisplay();
    }
  });
});
