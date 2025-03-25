let op1 = null;  // First operand
let op2 = null;  // Second operand
let currNum = '';  // Current number being typed
let currOp = null;  // Current operator (+, -, X, /)
let isNewCalc = false;  // Flag to check if it's a new calculation
const MAX_LEN = 20;

// Update the display
function updateDisplay(val) {
    if (val.length > MAX_LEN) {
        val = val.slice(0, MAX_LEN);
    }

    const display = document.querySelector('#display');
    display.textContent = val;
}

// Dynamically add nodes to the DOM
function buildButtons() {
    const buttonMap = {
        row1: ['7', '8', '9', 'DEL'],
        row2: ['4', '5', '6', '+'],
        row3: ['1', '2', '3', '-'],
        row4: ['.', '0', '/', 'X'],
    };

    const numbers = new Set(['1','2','3','4','5','6','7','8','9']);
    const operations = new Set(['/','X','-','+']);
    
    const calculator = document.querySelector("#mid-section");
    for (let key in buttonMap) {
        const row = document.createElement("div");
        row.classList.add("row");

        buttonMap[key].forEach((buttonText) => {
            const button = document.createElement("button");
            button.textContent = buttonText;

            // Add specific classes for buttons
            if (numbers.has(buttonText)) {
                button.classList.add("num");
            }
            else if (operations.has(buttonText)) {
                button.classList.add("op");
            }
            else if (buttonText === "DEL") {
                button.classList.add("del");
            }
            else {
                button.classList.add("dot");
            }

            // Attach click event listener
            button.addEventListener('click', () => handleButtonClick(buttonText));

            row.appendChild(button);
        });

        calculator.appendChild(row);
    }

    // Attach event listeners for AC and Solve buttons
    const acButton = document.querySelector("#ac");
    const solveButton = document.querySelector("#solve");
    
    acButton.addEventListener('click', () => handleButtonClick('AC'));
    solveButton.addEventListener('click', () => handleButtonClick('='));
}

// Handle button clicks
function handleButtonClick(buttonText) {
    if ("0123456789.".includes(buttonText)) {
        if (isNewCalc) {
            currNum = "";
            isNewCalc = false;
        }

        if (buttonText === "." && currNum.includes(".")) {
            return;  // Prevent adding multiple dots
        }

        currNum += buttonText;
        updateDisplay(currNum);
    }
    else if (['+', '-', 'X', '/'].includes(buttonText)) {
        if (currNum !== "") {
            op1 = parseFloat(currNum);  // Save first operand
            currOp = buttonText;  // Save operator
            currNum = "";  // Clear current number
            updateDisplay(currOp);
        }
    }
    else if (buttonText === "DEL") {
        currNum = currNum.slice(0, -1); // Remove the last digit
        updateDisplay(currNum);
    }
    else if (buttonText === "AC") {
        // Reset everything to start a new calculation
        op1 = null;
        op2 = null;
        currNum = "";
        currOp = null;
        updateDisplay("0");  // Reset display to 0
    }
    else if (buttonText === "=") {
        op2 = parseFloat(currNum);  // Save second operand

        let result = 0;
        switch (currOp) {
            case "+":
                result = op1 + op2;
                break;
            case "-":
                result = op1 - op2;
                break;
            case "X":
                result = op1 * op2;
                break;
            case "/":
                result = op1 / op2;
                break;
            default:
                break;
        }

        updateDisplay(result);  // Show the result on the display
        op1 = result;  // Store the result for further operations
        currNum = result.toString();  // Prepare for the next number input
        currOp = null;  // Reset operator
        isNewCalc = true;  // Flag for starting a new calculation
    }
}

// Initialize the calculator by creating buttons
buildButtons();