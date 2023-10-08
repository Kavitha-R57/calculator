
import React, { Component } from 'react';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      firstOperand: null,
      waitingForSecondOperand: false,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = this.state;

    if (waitingForSecondOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForSecondOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForSecondOperand } = this.state;

    if (waitingForSecondOperand) {
      this.setState({
        displayValue: '.',
        waitingForSecondOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
      });
    }
  };

  clearInput = () => {
    this.setState({
      displayValue: '0',
    });
  };

  setOperator = (operator) => {
    const { displayValue } = this.state;
    this.setState({
      operator,
      firstOperand: displayValue,
      waitingForSecondOperand: true,
    });
  };

  calculate = () => {
    const { displayValue, operator, firstOperand } = this.state;
    const secondOperand = displayValue;

    switch (operator) {
      case '+':
        this.setState({
          displayValue: String(parseFloat(firstOperand) + parseFloat(secondOperand)),
          operator: null,
          firstOperand: null,
        });
        break;
      case '-':
        this.setState({
          displayValue: String(parseFloat(firstOperand) - parseFloat(secondOperand)),
          operator: null,
          firstOperand: null,
        });
        break;
      case '*':
        this.setState({
          displayValue: String(parseFloat(firstOperand) * parseFloat(secondOperand)),
          operator: null,
          firstOperand: null,
        });
        break;
      case '/':
        if (parseFloat(secondOperand) === 0) {
          this.setState({
            displayValue: 'Error',
            operator: null,
            firstOperand: null,
          });
        } else {
          this.setState({
            displayValue: String(parseFloat(firstOperand) / parseFloat(secondOperand)),
            operator: null,
            firstOperand: null,
          });
        }
        break;
      default:
        break;
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="keypad">
          <div className="buttons">
            <button onClick={() => this.inputDigit(7)}>7</button>
            <button onClick={() => this.inputDigit(8)}>8</button>
            <button onClick={() => this.inputDigit(9)}>9</button>
            <button onClick={() => this.inputDigit(4)}>4</button>
            <button onClick={() => this.inputDigit(5)}>5</button>
            <button onClick={() => this.inputDigit(6)}>6</button>
            <button onClick={() => this.inputDigit(1)}>1</button>
            <button onClick={() => this.inputDigit(2)}>2</button>
            <button onClick={() => this.inputDigit(3)}>3</button>
            <button onClick={this.clearInput}>C</button>
            <button onClick={() => this.inputDigit(0)}>0</button>
            <button onClick={this.inputDecimal}>.</button>
          </div>
          <div className="operators">
            <button onClick={() => this.setOperator('+')}>+</button>
            <button onClick={() => this.setOperator('-')}>-</button>
            <button onClick={() => this.setOperator('*')}>*</button>
            <button onClick={() => this.setOperator('/')}>/</button>
            <button onClick={this.calculate}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
