
let currentInput = '';
let currentOperation = '';
let previousInput = '';

let lastInputModifier = '';
let lastOperationModifier = '';

const displayElem = document.getElementById("display");

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }

    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();


}

function calculate() {
    if (currentOperation) {
        lastInputModifier = currentInput;
        lastOperationModifier = currentOperation;
    }

    else if (lastOperationModifier && lastInputModifier) {
        previousInput = currentInput;
        currentInput = lastInputModifier;
        currentOperation = lastOperationModifier;
    }
    else {
        return;
    }




    if (!previousInput || !currentInput) return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+': {
            result = prev + current;
            break;
        }

        case '-': {
            result = prev - current;
            break;
        }

        case '*': {
            result = prev * current;
            break;
        }

        case '/': {
            if (current === 0) {
                alert('Cannot divide by 0');
                return;
            }

            result = prev / current;
            break;
        }

        case '%': {
            if (current === 0) {
                alert('Cannot calculate % of 0');
                return;
            }

            result = (prev / 100 ) * current;
            break;
        }

        default: {
            return;
        }
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    displayElem.value = currentInput;
    updateDisplay();

}

function clearDisplay() {
    previousInput = '';
    currentInput = '';
    currentOperation = '';
    lastInputModifier = '';
    lastOperationModifier = ''

    displayElem.value = '';
    displayElem.style.fontSize = '32px';

    updateDisplay();
}


function backspace() {

    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
    }

    else if (!currentOperation) {
        currentOperation = '';
        currentInput = previousInput;
        previousInput = '';
    }

    else if (!previousInput && !currentInput) {
        let displayvalue = displayElem.value.trim();
        currentInput = displayvalue.slice(0, -1);

    }

    updateDisplay();
}

function updateDisplay() {
    const clearBtn = document.getElementById('clear-btn');


    if (previousInput !== '' && currentOperation !== '') {
        displayElem.value = `${previousInput} ${currentOperation} ${currentInput} `;
    }


    else {
        displayElem.value = currentInput;
    }


    const length = displayElem.value.trim().length;

    if (length > 15) {
        displayElem.style.fontSize = '12px'
    }
    else if (length > 10) {
        displayElem.style.fontSize = '20px'
    }
    else {
        displayElem.style.fontSize = '32px'
    }




    if (displayElem.value.trim().length > 0) {
        if (clearBtn) {
            clearBtn.innerText = 'C';
        }
    }
    else {
        if (clearBtn) {
            clearBtn.innerText = 'AC';
        }
    }

}

function handleClearClick() {
    const clearBtn = document.getElementById('clear-btn');

    if (clearBtn.innerText === 'C') {
        currentInput = '';
    }
    else {
        currentInput = '';
        previousInput = '';
        currentOperation = '';
        lastInputModifier = '';
        lastOperationModifier = ''
    }

    updateDisplay();


}

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
        return;
    }

    if (key === '+' || key === '-' || key === '/' || key === '*' || key === '%') {
        appendOperator(key);
        return;
    }


    if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
        return;
    }

    if (key === 'Backspace') {
        backspace();
        return;
    }

    if (key === 'Escape') {
        clearDisplay();
        return;
    }
});

function flashButton(key) {
    const btn = document.querySelector(`[data-key="${key}"]`);
    const flashColor = btn.getAttribute('data-FlashColor');
    if(!btn) return;

    if (btn) {
        btn.classList.add(flashColor);

        setTimeout(() => {
            btn.classList.remove(flashColor);
        }, 150);
    }


}

document.addEventListener('keydown', (e) => {
    flashButton(e.key);
});