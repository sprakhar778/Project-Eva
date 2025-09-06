// app.js - Calculator logic and UI interaction

/**
 * Calculator class encapsulates all calculator state and behavior.
 * It interacts directly with the DOM element used as the display.
 */
class Calculator {
  /**
   * @param {HTMLElement} displayElement - The element where numbers are shown.
   */
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.currentInput = ""; // string being typed
    this.previousValue = null; // stored operand
    this.operation = null; // '+', '-', '*', '/'
    this.shouldResetDisplay = false; // flag to clear on next digit
    this.updateDisplay();
  }

  /** Update the calculator's visual display. */
  updateDisplay() {
    this.displayElement.textContent = this.currentInput || "0";
  }

  /** Append a digit or decimal point to the current input. */
  appendNumber(num) {
    // If we need to start a fresh number, clear the current input first.
    if (this.shouldResetDisplay) {
      this.currentInput = "";
      this.shouldResetDisplay = false;
    }
    // Prevent multiple decimal points.
    if (num === "." && this.currentInput.includes(".")) return;
    this.currentInput += num;
    this.updateDisplay();
  }

  /** Choose an arithmetic operation (+, -, *, /). */
  chooseOperation(op) {
    // If there is no current number but we already have a previous value,
    // simply change the pending operation.
    if (this.currentInput === "" && this.previousValue !== null) {
      this.operation = op;
      return;
    }
    // Store the current number as the previous value (if any).
    if (this.currentInput !== "") {
      this.previousValue = parseFloat(this.currentInput);
    }
    this.operation = op;
    this.shouldResetDisplay = true; // next digit starts a new number
  }

  /** Compute the result of the pending operation. */
  compute() {
    if (this.operation === null || this.currentInput === "" || this.previousValue === null) {
      // Nothing to compute.
      return;
    }
    const current = parseFloat(this.currentInput);
    let result;
    switch (this.operation) {
      case "+":
        result = this.previousValue + current;
        break;
      case "-":
        result = this.previousValue - current;
        break;
      case "*":
        result = this.previousValue * current;
        break;
      case "/":
        if (current === 0) {
          this.currentInput = "Error";
          this.updateDisplay();
          // Reset state after an error.
          this.previousValue = null;
          this.operation = null;
          this.shouldResetDisplay = true;
          return;
        }
        result = this.previousValue / current;
        break;
      default:
        return;
    }
    // Prepare for next input.
    this.currentInput = result.toString();
    this.previousValue = null;
    this.operation = null;
    this.shouldResetDisplay = true;
    this.updateDisplay();
  }

  /** Clear only the current entry. */
  clear() {
    this.currentInput = "";
    this.updateDisplay();
  }

  /** Reset the entire calculator state. */
  allClear() {
    this.currentInput = "";
    this.previousValue = null;
    this.operation = null;
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }

  /** Handle keyboard input and map it to calculator actions. */
  handleKeyboard(event) {
    const { key } = event;
    if (/^[0-9]$/.test(key) || key === ".") {
      this.appendNumber(key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      this.compute();
    } else if (key === "Backspace") {
      event.preventDefault();
      this.clear();
    } else if (key === "Escape") {
      event.preventDefault();
      this.allClear();
    } else if (["+", "-", "*", "/"].includes(key)) {
      event.preventDefault();
      this.chooseOperation(key);
    }
  }
}

// Instantiate the calculator with the display element.
const calc = new Calculator(document.getElementById('display'));

// Digit buttons – use data-value attribute.
document.querySelectorAll('.btn.digit').forEach(btn => {
  btn.addEventListener('click', () => {
    calc.appendNumber(btn.dataset.value);
  });
});

// Operator buttons – use data-op attribute.
document.querySelectorAll('.btn.operator').forEach(btn => {
  btn.addEventListener('click', () => {
    calc.chooseOperation(btn.dataset.op);
  });
});

// Equals button.
const equalsBtn = document.getElementById('equals');
if (equalsBtn) {
  equalsBtn.addEventListener('click', () => calc.compute());
}

// Clear (C) button – clears current entry.
const clearBtn = document.getElementById('clear');
if (clearBtn) {
  clearBtn.addEventListener('click', () => calc.clear());
}

// All‑clear (AC) button – resets everything.
const allClearBtn = document.getElementById('all-clear');
if (allClearBtn) {
  allClearBtn.addEventListener('click', () => calc.allClear());
}

// Keyboard support.
window.addEventListener('keydown', (e) => calc.handleKeyboard(e));
