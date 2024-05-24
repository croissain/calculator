import { CalculatorOperations, Digits, OperactionKeys, OperationSymbols } from "@/types";

export const digitKeys: Digits[] = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

export const calculatorOperations: CalculatorOperations = {
  '/': {
    name: 'divide',
    symbol: '÷',
    show: true,
    func: (prevValue: number, nextValue: number) => prevValue / nextValue,
  },
  '*': {
    name: 'multiply',
    symbol: 'x',
    show: true,
    func: (prevValue: number, nextValue: number) => prevValue * nextValue,
  },
  '-': {
    name: 'subtract',
    symbol: '-',
    show: true,
    func: (prevValue: number, nextValue: number) => prevValue - nextValue,
  },
  '+': {
    name: 'add',
    symbol: '+',
    show: true,
    func: (prevValue: number, nextValue: number, prevOp?: OperationSymbols) => prevValue + nextValue,
  },
  '=': {
    name: 'equals',
    symbol: '=',
    show: true,
    func: (_prevValue: number, nextValue: number) => nextValue,
  },
  'Enter': {
    name: 'enter',
    symbol: '=',
    show: false,
    func: (_prevValue: number, nextValue: number) => nextValue,
  },
};

export const getFormattedValue = (value: string): string => {
  const language = navigator.language || 'en-US';

  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  });

  const match = /\.\d*?(0*)$/.exec(value);

  if (match) {
    formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
  }

  return formattedValue.length >= 14 ? parseFloat(value).toExponential().toString() : formattedValue;
};

export const evaluateExpression = (history: (number | string)[]) => {
  let stack: (number | string)[] = [];

  for (let i = 0; i < history.length; i++) {
    if (typeof history[i] === 'number') {
      stack.push(history[i]);
    } else {
      const operator = history[i] as OperactionKeys;
      if (operator === '*' || operator === '/') {
        const leftOperand = stack.pop() as number;
        const rightOperand = history[i + 1] as number;
        const result = calculatorOperations[operator].func(leftOperand, rightOperand);
        stack.push(result);
        i++;
      } else {
        stack.push(operator);
      }
    }
  }

  let result = stack.shift() as number;
  console.log(stack)
  // while (stack.length > 0) {
  //   const operator = stack.shift() as OperactionKeys;
  //   const nextOperand = stack.shift() as number;
  //   result = calculatorOperations[operator].func(result, nextOperand);
  // }

  return result;
};

export const evaluate = (str:string):number => {
  if (str.match(/[*/+-]/)) {
    let numbers = "";
    for (let i = 0; i < str.length; i++) {
      switch (str[i]) {
        case "+":
          return parseInt(numbers) + evaluate(str.slice(numbers.length + 1))
        case "*":
          return parseInt(numbers) * evaluate(str.slice(numbers.length + 1))
        case "/":
          return parseInt(numbers) / evaluate(str.slice(numbers.length + 1))
        case "-":
          return parseInt(numbers) - evaluate(str.slice(numbers.length + 1))
        default:
          numbers += str[i];
          break;
      }
    }
  } else {
    return parseInt(str[0]);
  }
  return 0
}