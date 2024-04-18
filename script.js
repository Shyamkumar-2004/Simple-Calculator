document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.textContent);
        });
    });

    document.addEventListener('keypress', (event) => {
        const key = event.key;
        if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
            handleInput(key);
        } else if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Escape') {
            handleInput('C');
        }
    });

    function handleInput(input) {
        if (input === '=') {
            try {
                const result = calculate(currentInput);
                display.value = result;
                currentInput = result.toString(); 
            } catch (error) {
                display.value = 'Error';
                currentInput = ''; 
            }
        } else if (input === 'C') {
            currentInput = '';
            display.value = '';
        } else {
            currentInput += input;
            display.value = currentInput;
        }
    }

    function calculate(input) {
        
        if (!/^[0-9+\-*/.()]*$/.test(input)) {
            throw new Error('Invalid input');
        }
        return Function(`'use strict'; return (${input})`)();
    }
});
