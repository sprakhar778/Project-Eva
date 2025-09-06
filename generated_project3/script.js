// script.js
// Calculator logic – vanilla JavaScript
// ------------------------------------------------------------
// Expected HTML structure (simplified):
// <div id="calc-display" aria-live="polite" role="textbox"></div>
// <div class="buttons">
//   <button data-action="number" data-value="7">7</button>
//   ...
//   <button data-action="operator" data-value="+">+</button>
//   <button data-action="equals">=</button>
//   <button data-action="clear">C</button>
//   <button data-action="backspace">←</button>
// </div>
// ------------------------------------------------------------

(() => {
  // ----- State -------------------------------------------------
  let expression = ""; // raw infix expression as a string
  let lastResult = null; // numeric result of the last successful calculation

  // ----- DOM references ------------------------------------------
  const display = document.getElementById('calc-display');
  const buttons = document.querySelectorAll('.buttons button');

  // ----- Helper: update display ---------------------------------
  /**
   * Updates the calculator display.
   * @param {string|number} value - Text to show on the display.
   */
  function updateDisplay(value) {
    const text = String(value);
    display.textContent = text;
    // Ensure the most recent characters are visible (useful for long expressions)
    // Using scrollLeft works for elements with overflow-x:auto.
    display.scrollLeft = display.scrollWidth;
  }

  // ----- Helper: tokenisation -----------------------------------
  /**
   * Splits an infix expression string into an array of tokens (numbers & operators).
   * Handles decimal numbers and negative numbers (unary minus) implicitly.
   * @param {string} expr
   * @returns {Array<string>}
   */
  function tokenize(expr) {
    const tokens = [];
    let numberBuffer = '';
    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
      if (/[0-9.]/.test(ch)) {
        numberBuffer += ch;
      } else if (/[+\-*/]/.test(ch)) {
        if (numberBuffer) {
          tokens.push(numberBuffer);
          numberBuffer = '';
        }
        // handle unary minus (e.g., "-5" or "( -5 )")
        if (ch === '-' && (i === 0 || /[+\-*/]/.test(expr[i - 1]))) {
          numberBuffer = '-'; // start a negative number
        } else {
          tokens.push(ch);
        }
      } else {
        // ignore any other characters (should not happen)
      }
    }
    if (numberBuffer) tokens.push(numberBuffer);
    return tokens;
  }

  // ----- Helper: Shunting‑Yard (infix → RPN) --------------------
  const PRECEDENCE = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const LEFT_ASSOC = { '+': true, '-': true, '*': true, '/': true };

  /**
   * Converts an array of tokens (infix) to Reverse Polish Notation (postfix).
   * @param {Array<string>} tokens
   * @returns {Array<string>} RPN token list
   */
  function toRPN(tokens) {
    const output = [];
    const stack = [];
    for (const token of tokens) {
      if (!isNaN(token)) { // number
        output.push(token);
      } else if (/[+\-*/]/.test(token)) { // operator
        while (
          stack.length &&
          /[+\-*/]/.test(stack[stack.length - 1]) &&
          ((LEFT_ASSOC[token] && PRECEDENCE[token] <= PRECEDENCE[stack[stack.length - 1]]) ||
            (!LEFT_ASSOC[token] && PRECEDENCE[token] < PRECEDENCE[stack[stack.length - 1]]))
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      }
    }
    while (stack.length) {
      const op = stack.pop();
      if (/[+\-*/]/.test(op)) output.push(op);
    }
    return output;
  }

  // ----- Helper: Evaluate RPN -----------------------------------
  /**
   * Evaluates a postfix expression.
   * @param {Array<string>} rpnTokens
   * @returns {number|string} result or 'Error'
   */
  function evalRPN(rpnTokens) {
    const stack = [];
    for (const token of rpnTokens) {
      if (!isNaN(token)) {
        stack.push(parseFloat(token));
      } else {
        const b = stack.pop();
        const a = stack.pop();
        if (a === undefined || b === undefined) return 'Error';
        let res;
        switch (token) {
          case '+':
            res = a + b;
            break;
          case '-':
            res = a - b;
            break;
          case '*':
            res = a * b;
            break;
          case '/':
            if (b === 0) return 'Error';
            res = a / b;
            break;
          default:
            return 'Error';
        }
        stack.push(res);
      }
    }
    if (stack.length !== 1) return 'Error';
    return stack[0];
  }

  // ----- Core calculation ---------------------------------------
  /**
   * Parses the current expression string, evaluates it and returns the result.
   * Errors are caught and returned as the string 'Error'.
   * @returns {string|number}
   */
  function calculate() {
    try {
      if (!expression) return '';
      const tokens = tokenize(expression);
      const rpn = toRPN(tokens);
      const result = evalRPN(rpn);
      if (result === 'Error' || isNaN(result)) {
        // Reset state on error
        expression = '';
        lastResult = null;
        return 'Error';
      }
      // Round to a reasonable precision to avoid floating‑point noise
      const rounded = Number.isInteger(result) ? result : parseFloat(result.toFixed(12));
      // Store result for chaining
      lastResult = rounded;
      expression = String(rounded);
      return rounded;
    } catch (e) {
      expression = '';
      lastResult = null;
      return 'Error';
    }
  }

  // ----- UI interaction helpers --------------------------------
  /**
   * Clears the calculator state and display.
   */
  function handleClear() {
    expression = '';
    lastResult = null;
    updateDisplay('');
  }

  /**
   * Removes the last character from the expression.
   */
  function handleBackspace() {
    if (!expression) return;
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  }

  /**
   * Appends a character (digit, decimal point, or operator) to the expression.
   * Handles basic validation: prevents multiple consecutive operators and
   * multiple decimals within the same number.
   * @param {string} char
   */
  function appendToExpression(char) {
    const operators = '+-*/';
    const lastChar = expression.slice(-1);

    // If the previous calculation produced a result and the user starts a new number,
    // reset the expression.
    if (lastResult !== null && expression === String(lastResult) && /[0-9.]/.test(char)) {
      expression = '';
    }

    if (/[0-9]/.test(char)) {
      // Digit – always allowed.
      expression += char;
    } else if (char === '.') {
      // Decimal point – ensure the current number does not already contain one.
      const parts = expression.split(/[^0-9.]/); // split on operators
      const currentNumber = parts[parts.length - 1];
      if (!currentNumber.includes('.')) {
        // If the number is empty (e.g., starting with '.'), prepend a leading zero.
        if (currentNumber === '') expression += '0';
        expression += '.';
      }
    } else if (operators.includes(char)) {
      // Operator – prevent two operators in a row (except minus for negative numbers).
      if (expression === '' && char !== '-') {
        // Disallow leading operator except minus.
        return;
      }
      if (operators.includes(lastChar)) {
        // Replace the previous operator with the new one (except when the previous is a minus for a negative number).
        // Allow patterns like "5*-" (multiply then negative) – treat the minus as part of a number.
        if (lastChar === '-' && (expression.length === 1 || operators.includes(expression.slice(-2, -1)))) {
          // keep the minus as unary, so we don't replace it.
          expression += char;
        } else {
          expression = expression.slice(0, -1) + char;
        }
      } else {
        expression += char;
      }
    }
    updateDisplay(expression);
  }

  /**
   * Handles keyboard input and maps it to calculator actions.
   * @param {KeyboardEvent} e
   */
  function handleKeyPress(e) {
    const key = e.key;
    if (/[0-9]/.test(key)) {
      appendToExpression(key);
    } else if (key === '.' || key === ',') {
      // Accept comma as decimal separator for convenience.
      appendToExpression('.');
    } else if (['+', '-', '*', '/'].includes(key)) {
      appendToExpression(key);
    } else if (key === 'Enter' || key === '=') {
      const result = calculate();
      updateDisplay(result);
    } else if (key === 'Backspace') {
      handleBackspace();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
      handleClear();
    }
    // Prevent default browser actions for keys we handle (e.g., Backspace navigation).
    if (['Enter', '=', 'Backspace', 'Escape', 'c', 'C'].includes(key) || /[0-9.+\-*/]/.test(key)) {
      e.preventDefault();
    }
  }

  // ----- Event listeners ----------------------------------------
  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      const action = btn.dataset.action;
      const value = btn.dataset.value; // may be undefined for actions like clear
      switch (action) {
        case 'number':
        case 'decimal':
        case 'operator':
          appendToExpression(value);
          break;
        case 'equals': {
          const result = calculate();
          updateDisplay(result);
          // expression already set to result inside calculate()
          break;
        }
        case 'clear':
          handleClear();
          break;
        case 'backspace':
          handleBackspace();
          break;
        default:
          // No‑op for unknown actions.
          break;
      }
    });
  });

  document.addEventListener('keydown', handleKeyPress);

  // Initialise display (use aria-live region for screen readers).
  updateDisplay('');
})();
