import React, { useState } from 'react';
import './style.css';

export default function Calculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [firstValue, setFirstValue] = useState(null);
  const [awaitingNextValue, setAwaitingNextValue] = useState(false);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [currentExpression, setCurrentExpression] = useState('');

  const inputDigit = (digit) => {
    if (awaitingNextValue) {
      setCurrentValue(digit);
      setAwaitingNextValue(false);
    } else {
      setCurrentValue(currentValue === '0' ? digit : currentValue + digit);
    }
    setCurrentExpression(currentExpression + digit);
  };

  const inputDecimal = () => {
    if (awaitingNextValue) return;

    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
      setCurrentExpression(currentExpression + '.');
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(currentValue);

    if (currentOperator && awaitingNextValue) {
      setCurrentOperator(nextOperator);
      setCurrentExpression(currentExpression.slice(0, -1) + nextOperator);
      return;
    }

    if (firstValue == null && !isNaN(inputValue)) {
      setFirstValue(inputValue);
    } else if (currentOperator) {
      const result = calculate(firstValue, inputValue, currentOperator);
      setCurrentValue(`${parseFloat(result.toFixed(7))}`);
      setFirstValue(result);
    }

    setAwaitingNextValue(true);
    setCurrentOperator(nextOperator);
    if (nextOperator !== '=') {
      setCurrentExpression(currentExpression + ' ' + nextOperator + ' ');
    } else {
      setCurrentExpression('');
    }
  };

  const calculate = (firstValue, secondValue, operator) => {
    switch (operator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const resetCalculator = () => {
    setCurrentValue('0');
    setFirstValue(null);
    setAwaitingNextValue(false);
    setCurrentOperator(null);
    setCurrentExpression('');
  };

  return (
    <div className="calculator">
        
      <input type="text" className="calculator-screen" value={currentExpression || currentValue} disabled />
      <div className="calculator-keys">
        <button onClick={() => handleOperator('+')} className="operator" value="+">+</button>
        <button onClick={() => handleOperator('-')} className="operator" value="-">-</button>
        <button onClick={() => handleOperator('*')} className="operator" value="*">&times;</button>
        <button onClick={() => handleOperator('/')} className="operator" value="/">&divide;</button>
        <button onClick={() => inputDigit('7')} value="7">7</button>
        <button onClick={() => inputDigit('8')} value="8">8</button>
        <button onClick={() => inputDigit('9')} value="9">9</button>
        <button onClick={() => inputDigit('4')} value="4">4</button>
        <button onClick={() => inputDigit('5')} value="5">5</button>
        <button onClick={() => inputDigit('6')} value="6">6</button>
        <button onClick={() => inputDigit('1')} value="1">1</button>
        <button onClick={() => inputDigit('2')} value="2">2</button>
        <button onClick={() => inputDigit('3')} value="3">3</button>
        <button onClick={() => inputDigit('0')} value="0">0</button>
        <button onClick={inputDecimal} className="decimal" value=".">.</button>
        <button onClick={resetCalculator} className="all-clear" value="all-clear">AC</button>
        <button onClick={() => handleOperator('=')} className="equal-sign" value="=">=</button>
      </div>
    </div>
  );
}