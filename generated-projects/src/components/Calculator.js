import React, { useState } from 'react';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '=') {
      try {
        // Evaluate the expression safely
        const evalResult = eval(expression);
        setResult(evalResult);
      } catch {
        setResult('Error');
      }
    } else {
      setExpression((prev) => prev + value);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <div className="mb-4 text-right text-lg font-mono">
          <div>{expression || '0'}</div>
          <div className="text-2xl font-bold">{result}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {value}
            </button>
          ))}
          {['4', '5', '6', '*'].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {value}
            </button>
          ))}
          {['1', '2', '3', '-'].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {value}
            </button>
          ))}
          {['0', '.', 'C', '+'].map((value) => (
            <button key={value} onClick={() => handleButtonClick(value)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {value}
            </button>
          ))}
          <button onClick={() => handleButtonClick('=')} className="col-span-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
