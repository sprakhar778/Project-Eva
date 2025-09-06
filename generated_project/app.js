// Calculator logic for OnScreenCalculator
// --------------------------------------------------
// This script defines a Calculator class that handles expression building,
// evaluation, and display updates. It also wires up the UI buttons and
// keyboard shortcuts to provide a seamless user experience.

/**
 * Core calculator class.
 * Handles expression manipulation and safe evaluation.
 */
class Calculator {
  /**
   * @param {HTMLElement} displayElement - Element where the current expression/result is shown.
   */
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.expression = '';
  }

  /** Append a character (digit, operator, or decimal point) to the expression. */
  append(char) {
    this.expression += char;
    this.update();
  }

  /** Remove the last character from the expression (acts like a backspace). */
  clear() {
    this.expression = this.expression.slice(0, -1);
    this.update();
  }

  /** Reset the entire expression. */
  allClear() {
    this.expression = '';
    this.update();
  }

  /** Evaluate the current expression safely. */
  evaluate() {
    try {
      // Only allow numbers, decimal points and basic math operators.
      if (/[^0-9+\-*/.]/.test(this.expression)) {
        throw new Error('Invalid characters');
      }
      // Replace any visual division symbol with JavaScript division operator.
      const sanitized = this.expression.replace(/÷/g, '/');
      // Use Function constructor for a safe eval (no access to outer scope).
      const result = Function(`'use strict'; return (${sanitized})`)();
      if (!isFinite(result)) {
        throw new Error('Division by zero');
      }
      this.expression = String(result);
    } catch (e) {
      this.expression = 'Error';
    }
    this.update();
  }

  /** Update the display element with the current expression or a fallback "0". */
  update() {
    this.displayElement.textContent = this.expression || '0';
  }
}

/**
 * Initialise the calculator UI – bind button clicks and keyboard events.
 */
function initCalculator() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.btn');
  const calc = new Calculator(display);

  // Button click handling
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const value = button.dataset.value;
      const operator = button.dataset.operator;

      if (action === 'clear') {
        calc.clear();
      } else if (action === 'all-clear') {
        calc.allClear();
      } else if (action === 'equals') {
        calc.evaluate();
      } else if (value !== undefined) {
        calc.append(value);
      } else if (operator !== undefined) {
        calc.append(operator);
      }
    });
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    // Allow numeric keys and decimal point
    if (/^[0-9.]$/.test(key)) {
      calc.append(key);
      e.preventDefault();
    } else if (/^[+\-*/]$/.test(key)) {
      // Map '/' to division operator (HTML already uses '/'), keep as is.
      calc.append(key);
      e.preventDefault();
    } else if (key === 'Enter' || key === '=') {
      calc.evaluate();
      e.preventDefault();
    } else if (key === 'Backspace') {
      calc.clear();
      e.preventDefault();
    } else if (key === 'Escape') {
      calc.allClear();
      e.preventDefault();
    }
  });

  // Initialise display
  calc.update();
}

// Initialise when the DOM is ready.
document.addEventListener('DOMContentLoaded', initCalculator);
