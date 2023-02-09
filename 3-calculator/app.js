let currentNumber = '';
let previousNumber = '';
let operator = '';

window.addEventListener('keydown', handleKeyPress)

const currentDisplayNumber = document.querySelector('.display_current');
const previousDisplayNumber = document.querySelector('.display_previous');

const equal = document.querySelector('.equal');
equal.addEventListener('click', () => {
  if(currentNumber != '' && previousNumber != '') {
    calculate();
  }
})
const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
  addDecimal();
})
const clear = document.querySelector('.clear');
clear.addEventListener('click', clearCalculator)
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

numberButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  })
})

function handleNumber (number) {
  if(previousNumber !== '' && currentNumber !== '' && operator === '') {
    previousNumber = '';
    currentDisplayNumber.textContent = currentNumber;
  }
  if (currentNumber.length <= 11) {
    currentNumber += number;
    currentDisplayNumber.textContent = currentNumber;
  }
}

operators.forEach(btn => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent)
  })
})

function handleOperator(op) {
  if (previousNumber === '') {
    previousNumber = currentNumber;
    operatorCheck(op);
  } else if (currentNumber === '') {
    operatorCheck(op);
  } else {
    calculate();
    operator = op;
    currentDisplayNumber.textContent = '0';
    previousDisplayNumber.textContent = previousNumber + ' ' + operator;
  }
}

function operatorCheck (text) {
  operator = text;
  previousDisplayNumber.textContent = previousNumber + ' ' + operator;
  currentDisplayNumber.textContent = '0';
  currentNumber = '';

}

function calculate() {
  previousNumber = Number(previousNumber);
  currentNumber = Number(currentNumber);
  if (operator === '+') {
    previousNumber += currentNumber;
  } else if (operator === '-') {
    previousNumber -= currentNumber;
  } else if (operator === 'x') {
    previousNumber *= currentNumber
  } else {
    if(currentNumber <= 0) {
      previousNumber = "Error"
      displayResults();
      return;
    }
    previousNumber /= currentNumber;
  }
  previousNumber = roundNumber(previousNumber);
  previousNumber = previousNumber.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if(previousNumber.length <= 11) {
    currentDisplayNumber.textContent = previousNumber;
  } else {
    currentDisplayNumber.textContent = previousNumber.slice(0, 11) + '...';
  }
  previousDisplayNumber.textContent = '';
  operator = '';
  currentNumber = '';
}

function clearCalculator () {
  currentNumber = '';
  previousNumber = '';
  operator = '';
  currentDisplayNumber.textContent = '';
  previousDisplayNumber.textContent = '';
}

function addDecimal () {
  if(!currentNumber.includes('.')) {
    currentNumber += '.';
    currentDisplayNumber.textContent = currentNumber;
  }
}

function handleKeyPress(e) {
  e.preventDefault()
  if(e.key >= 0 && e.key <= 9){
    handleNumber(e.key)
  }
  if(e.key === 'Enter' || 
  e.key === "=" && currentNumber != '' && previousNumber != ''){
    calculate();
  }
  if(e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key)
  }
  if (e.key === '*') {
    handleOperator('x');
  }
  if(e.key === '.') {
    addDecimal();
  }
  if (e.key === 'Backspace') {
    handleDelete();
  }
  if (e.key === 'Delete') {
    clearCalculator();
  }
}

function handleDelete() {
  if (currentNumber != '') {
    currentNumber = currentNumber.slice(0, -1);
    currentDisplayNumber.textContent = currentNumber;
    if (currentNumber === '') {
      currentDisplayNumber.textContent = '0'
    }
  }
  if (currentNumber === '' && previousNumber !== '' && operator !== ''){
    previousNumber = previousNumber.slice(0, -1);
    currentDisplayNumber.textContent = previousNumber;
  }
}