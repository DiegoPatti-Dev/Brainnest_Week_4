let currentNumber = '';
let previousNumber = '';
let operator = '';

const currentDisplayNumber = document.querySelector('.display_current');
const previousDisplayNumber = document.querySelector('.display_previous');
const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const bksp = document.querySelector('.bksp');

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

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

window.addEventListener('keydown', handleKeyPress)

function handleKeyPress(e) {
  e.preventDefault()
  if(e.key >= 0 && e.key <= 9){
    processNumber(e.key)
  }
  if(
    e.key === 'Enter' || 
    e.key === "=" && currentNumber != '' && previousNumber != ''){
    calculate();
  }
  if(
    e.key === "+" || 
    e.key === "-" || 
    e.key === "/") {
    executeOperator(e.key)
  }
  if (e.key === '*') {
    executeOperator('x');
  }
  if(e.key === '.') {
    addDecimal();
  }
  if (e.key === 'Backspace') {
    handleBackspace();
  }
  if (e.key === 'Delete') {
    clearCalculator();
  }
}

function processNumber (number) {
  if(previousNumber !== '' && currentNumber !== '' && operator === '') {
    previousNumber = '';
    currentDisplayNumber.textContent = currentNumber;
  }
  if (currentNumber.length <= 11) {
    currentNumber += number;
    currentDisplayNumber.textContent = currentNumber;
  }
}

function executeOperator(op) {
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

function addDecimal () {
  if(!currentNumber.includes('.')) {
    currentNumber += '.';
    currentDisplayNumber.textContent = currentNumber;
  }
}

function handleBackspace() {
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

function clearCalculator () {
  currentNumber = '';
  previousNumber = '';
  operator = '';
  currentDisplayNumber.textContent = '';
  previousDisplayNumber.textContent = '';
}

function operatorCheck (text) {
  operator = text;
  previousDisplayNumber.textContent = previousNumber + ' ' + operator;
  currentDisplayNumber.textContent = '0';
  currentNumber = '';
}

numberButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    processNumber(e.target.textContent);
  })
})

operators.forEach(btn => {
  btn.addEventListener('click', (e) => {
    executeOperator(e.target.textContent);
  })
})

clear.addEventListener('click', clearCalculator);

equal.addEventListener('click', () => {
  if(currentNumber != '' && previousNumber != '') {
    calculate();
  }
})

decimal.addEventListener('click', () => {
  addDecimal();
})

bksp.addEventListener('click', () => {
  handleBackspace();
})