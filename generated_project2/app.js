let currentInput = '';
let previousInput = '';
let operation = null;

const display = document.getElementById('display');

function updateDisplay() {
    display.value = currentInput || previousInput || '0';
}

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '' && previousInput !== '') {
        operation = op;
    } else {
        calculate();
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (operation === '+') {
        result = add(prev, current);
    } else if (operation === '-') {
        result = subtract(prev, current);
    } else if (operation === '*') {
        result = multiply(prev, current);
    } else if (operation === '/') {
        result = divide(prev, current);
    } else {
        return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("Cannot divide by zero");
        return a;
    }
    return a / b;
}

function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function setup() {
    document.getElementById('clear').addEventListener('click', clear);
    document.getElementById('equals').addEventListener('click', calculate);

    document.getElementById('add').addEventListener('click', () => setOperation('+'));
    document.getElementById('subtract').addEventListener('click', () => setOperation('-'));
    document.getElementById('multiply').addEventListener('click', () => setOperation('*'));
    document.getElementById('divide').addEventListener('click', () => setOperation('/'));

    for (let i = 0; i <= 9; i++) {
        document.getElementById('num' + i).addEventListener('click', () => appendNumber(i.toString()));
    }
}

setup();
updateDisplay();