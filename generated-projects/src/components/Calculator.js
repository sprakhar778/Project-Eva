import React, { useState, useEffect } from 'react';

// Simple safe evaluator for basic arithmetic expressions
const evaluate = (expr) => {
  // Disallow any characters other than numbers, operators, parentheses and decimal point
  if (/[^0-9+\-*/(). ]/.test(expr)) return 'Error';
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return (${expr})`);
    const result = fn();
    return Number.isFinite(result) ? result : 'Error';
  } catch {
    return 'Error';
  }
};

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [liveResult, setLiveResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
      setLiveResult('');
    } else if (value === '=') {
      const evalResult = evaluate(expression);
      setResult(evalResult);
    } else {
      // Prevent two operators in a row
      const lastChar = expression.slice(-1);
      const operators = '+-*/';
      if (operators.includes(value) && operators.includes(lastChar)) {
        setExpression((prev) => prev.slice(0, -1) + value);
      } else {
        setExpression((prev) => prev + value);
      }
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      const { key } = e;
      if (key >= '0' && key <= '9') {
        handleButtonClick(key);
      } else if (['+', '-', '*', '/', '.'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleButtonClick('=');
      } else if (key === 'Backspace') {
        setExpression((prev) => prev.slice(0, -1));
      } else if (key === 'Escape') {
        handleButtonClick('C');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Live evaluation as the expression changes
  useEffect(() => {
    if (expression === '') {
      setLiveResult('');
      return;
    }
    const evalResult = evaluate(expression);
    setLiveResult(evalResult);
  }, [expression]);

  const rows = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', 'C', '+'],
  ];

  return (
    <div className="w-full max-w-xs mx-auto p-4">
      <div className="bg-gray-900 rounded-2xl shadow-neon p-6">
        {/* Display */}
        <div className="mb-4 text-right font-mono text-neon">
          <div className="text-sm opacity-80">{expression || '0'}</div>
          <div className="text-xl opacity-70">
            {liveResult !== '' && liveResult !== 'Error' ? `≈ ${liveResult}` : ''}
          </div>
          <div className="text-3xl font-bold text-neon-pink mt-1">
            {result !== '' ? result : ''}
          </div>
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {rows.map((row, rowIdx) =>
            row.map((val) => (
              <button
                key={val + rowIdx}
                onClick={() => handleButtonClick(val)}
                className={
                  `flex items-center justify-center h-12 rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 ` +
                  (val === 'C'
                    ? 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-400'
                    : 'bg-gray-800 hover:bg-gray-700 text-neon focus:ring-neon') +
                  ` shadow-neon`
                }
              >
                {val}
              </button>
            ))
          )}
          {/* Equals button spanning full width */}
          <button
            onClick={() => handleButtonClick('=')}
            className="col-span-4 bg-neon-pink hover:bg-neon-blue text-gray-900 h-12 rounded-xl transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-pink shadow-neon"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
