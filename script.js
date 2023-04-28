const BUTTONS = document.querySelectorAll(`button`);
const PREVIOUS_OPERATION = document.querySelector(`.previous-operation`);
const CURRENT_OPERATION = document.querySelector(`.current-operation`);
let operandOne=null;
let operator=null;
let operandTwo=null;

function add (one, two) {return (Number(one) + Number(two));}
function subtract (one, two) {return (Number(one) - Number(two));}
function multiply (one, two) {return (Number(one) * Number(two));}
function divide (one, two) {return (Number(one) / Number(two));}

function userInput(number){
    if(!operandOne) {operandOne = number}
    else {operandOne += number}
}

function updateOperands(valueOne, sign, valueTwo){
    operandTwo = valueOne;
    operator = sign;
    operandOne = valueTwo;
}

function displayOperation(){
    if(!operandOne) { CURRENT_OPERATION.textContent = "0"; }
    else { CURRENT_OPERATION.textContent = operandOne; }

    if(operandTwo) {PREVIOUS_OPERATION.textContent = operandTwo+operator; }
    else { PREVIOUS_OPERATION.textContent = "0"; }
}

function choiceOfOperation(operandOne, operandTwo){
    if(operator === "+") {return add(operandTwo, operandOne)}
    else if(operator === "-") {return subtract(operandTwo, operandOne)}
    else if(operator === "÷") {return divide(operandTwo, operandOne)}
    else if(operator === "x") {return multiply(operandTwo, operandOne)}
}

function operate(valueOne, sign, valueTwo){
    if(!operator || operator === "=") {updateOperands(valueOne, sign, valueTwo)}
    else if(operator && operandOne){
        let sign = "=";
        let result = choiceOfOperation(operandOne, operandTwo).toFixed(10).replace(/\.?0+$/, "");
        if(result === "Infinity" || result === "NaN") {
            alert(` Do you have 🧠\n If "Yes" better use it.`);
            updateOperands(null, null, null);
        }
        else { 
            let operation = operandTwo+operator+operandOne;
            updateOperands(operation, sign, result);
        } 
    }
    else if(operator && !operandOne){ alert("You have already selected an operator")}    
}

BUTTONS.forEach(button => button.addEventListener(`click`, (e) => {
    
    const BUTTON_PRESSED = e.target.classList.value;
    
    switch(BUTTON_PRESSED){
        case "btn-clear": {
            updateOperands(null, null, null);
            break;
        }
        case "btn-delete": {
            let currentValue = Array.from(operandOne);
            currentValue.pop()
            let newValue = currentValue.toString().replaceAll(`,`, "");
            operandOne = newValue;
            break;
        }
        case "btn-dot": {
            let decimalPoint = e.target.textContent
            if(operandOne && operandOne.includes(`.`)) {alert("Only one decimal point is allowed")}
            else {userInput(decimalPoint);}
            break;
        }
        case "btn-plus": {
            let sign = e.target.textContent;
            operate(operandOne, sign, null);
            break;
        }
        case "btn-minus": {
            let sign = e.target.textContent;
            operate(operandOne, sign, null);
            break;
        }
        case "btn-divide": {
            let sign = e.target.textContent;
            operate(operandOne, sign, null);
            break;
        }
        case "btn-multiply": {
            let sign = e.target.textContent;
            operate(operandOne, sign, null);
            break;
        }
        case "btn-equal": {
            operate();
            break;
        }
        default: {
            let number = e.target.textContent
            userInput(number);
            break;
        }
    }
    displayOperation();
}))