
let currentInput = '';
let currentOperation = '';
let previousInput = '';

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
    if (previousInput === '' || currentInput === '') return;
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

        default: {
            return;
        }
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    document.getElementById('display').value = currentInput;

}

function clearDisplay() {
    previousInput = '';
    currentInput = '';
    currentOperation = '';
    document.getElementById('display').value = '';

    screen = document.getElementById('display');
    screen.value = '';
    screen.style.fontSize = '32px';

    updateDisplay();
}


function backspace() {

    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
    }

    else if (currentOperation !== '') {
        currentOperation = '';
        currentInput = previousInput;
        previousInput = '';
    }

    else if (previousInput !== '' && currentInput !== '') {
        let displayvalue = document.getElementById('display').value.trim();
        currentInput = displayvalue.slice(0, -1);

    }

    updateDisplay();
}

function updateDisplay() {
    let screen = document.getElementById('display');
    const clearBtn = document.getElementById('clear-btn');


    if (previousInput !== '' && currentOperation !== '') {
        screen.value = `${previousInput} ${currentOperation} ${currentInput} `;
    }


    else {
        screen.value = currentInput;
    }


    const length = screen.value.trim().length;

    if (length > 15) {
        screen.style.fontSize = '12px'
    }
    else if (length > 10) {
        screen.style.fontSize = '20px'
    }
    else {
        screen.style.fontSize = '32px'
    }




    if (screen.value.trim().length > 0) {
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
    }

    updateDisplay();


}

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
        return;
    }

    if (key === '+' || key === '-' || key === '/' || key === '*') {
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

    if (btn) {
        btn.classList.add('!bg-neutral-500');

        setTimeout(() => {
            btn.classList.remove('!bg-neutral-500');
        }, 150);
    }


}

document.addEventListener('keydown', (e)=>{
  let pressedKey = e.key;
  flashButton(pressedKey);
});