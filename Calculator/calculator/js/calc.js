let numbers = document.querySelectorAll ('.number');
let operations = document.querySelectorAll ('.operations');
let result = document.getElementById ('resultBtn');
let decimalBtn = document.getElementById ('decimal');
let clearElems = document.querySelectorAll ('.btn_clear');
let display = document.getElementById ('display');
let displayResult = document.getElementById ('display-result');
let additionalOperation = document.querySelectorAll ('.additional');

let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';



for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
        console.log(number)

    });
};

for (let i = 0; i < clearElems.length; i++) {
    let clearing = clearElems[i];
    clearing.addEventListener('click', function (e) {
        clear(e.srcElement.id);
        console.log(clearElems)   
    });
};

for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
    
};

for (let i = 0; i < additionalOperation.length; i++) {
    let addOper = additionalOperation[i];
    addOper.addEventListener('click', function (e) {
        addOperation(e.srcElement.id);
        console.log(additionalOperation);
    });
}


function addOperation(id){
    if (id === 'cangeAsign'){
        display.value *= -1;
        MemoryNewNumber = false;
        console.log('Клик по кнопке дополнительных операций +/-');
    }
    else if (id === 'percent') {
        display.value *= 0.01;
        MemoryNewNumber = false;
        console.log('Клик по кнопке дополнительных операций %');
    };

}


decimalBtn.addEventListener ('click', decimal);



function numberPress(num) {
    if (MemoryNewNumber){
        display.value = num;
        MemoryNewNumber = false;
    }
    else{
        if (display.value === '0'){
            display.value = num;
        } else {
            display.value += num
        };
    };
};


function clear(id) {
    if (id === 'ac'){
        display.value = '0';
        displayResult.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    }
    else if (id === 'clearOne'){
        display.value = display.value.slice(0, -1);
    }


    console.log('Клик по кнопке ' + id + '!')
};

function operation(op) {
    let localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '='){
        display.value = MemoryCurrentNumber;
    } else{
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+'){
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-'){
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '×'){
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '÷'){
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '%'){
            display.value /= 100;
        } else if (MemoryPendingOperation === '+/-'){
            MemoryCurrentNumber =  parseFloat(-1*localOperationMemory);                
        } else {
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };

        display.value = MemoryCurrentNumber;
        displayResult.value = MemoryCurrentNumber;
        MemoryPendingOperation = op
    };

    console.log('Клик по кнопке '+ op) 
};


function decimal(argument) {
    let localDecimalMemory = display.value;

    if  (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else { 
        if (localDecimalMemory.indexOf('.') === -1){
            localDecimalMemory += '.';
        };
    };
    display.value = localDecimalMemory;
    console.log('Клик по кнопке десятичной дроби')
};


