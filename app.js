const botonNumeros = document.getElementsByName('data-number');
const botonOpera = document.getElementsByName('data-opera');
const botonDecimal = document.getElementsByName('data-decimal');
const botonIgual = document.getElementsByName('data-igual')[0];
const botonDelete = document.getElementsByName('data-delete')[0];

let result = document.getElementById('result');
let opeActual = '';
let opeAnterior = '';
let operacion = undefined;

botonNumeros.forEach(function(boton){
    boton.addEventListener('click', function(){
        agregarNumero(boton.innerText);
    });
});

botonOpera.forEach(function(boton){
    boton.addEventListener('click', function(){
        selectOperacion(boton.innerText);
    });
});

botonDecimal.forEach(function(boton){
    boton.addEventListener('click', function(){
        selectDecimal();
    });
});

botonIgual.addEventListener('click', function(){
    calcular();
    actualizarDisplay();
});

botonDelete.addEventListener('click', function(){
    clear();
    actualizarDisplay();
});

function agregarNumero(num) {
    opeActual = opeActual.toString() + num.toString();
    actualizarDisplay();
};

function actualizarDisplay() {
    result.value = opeActual;
};

function selectOperacion(op) {
    if (opeActual === '')return 
    if(opeAnterior !== ''){
        calcular();
    }    
    operacion = op.toString();
    opeAnterior = opeActual;
    opeActual = '';
}

function selectDecimal() {
    if (opeActual.includes('.')) return;
    if (opeActual === '') {
        opeActual = '0.';
    } else {
        opeActual = opeActual.toString() + '.';
    }
    actualizarDisplay();
};

function calcular() {
    let calculo;
    const anterior = parseFloat(opeAnterior);
    const actual =parseFloat(opeActual);
    if(isNaN(anterior) || isNaN(actual))return;
    switch (operacion) {
        case '+':
            calculo = anterior + actual;
            break;
        case '-':
            calculo = anterior - actual
            break;    
        case 'x':
            calculo = anterior * actual;
            break;
        case '÷':
            if (actual === 0) {
                alert('Cualquiera, pues si la división es lo opuesto a la multiplicación, cualquier número multiplicado por 0 da 0');
                clear();
                actualizarDisplay();
                return;                 
            }
            calculo = anterior / actual;
            break;   
        case '^':
            calculo = anterior ** actual;
            break;    
        case 'mod':
            if (actual === 0) {
                alert('Error: operación indefinida');
                clear();
                actualizarDisplay();
                return;
            }
            calculo = anterior % actual;
            break; 
        case '%':
            calculo = anterior / 100;
            break; 
        default:
            return;
    }
if (!isFinite(calculo)) {
    alert('Al infinito y más allá...');
    clear();
    actualizarDisplay();
    return;
    }
    opeActual = calculo;
    operacion = undefined;
    opeAnterior = '';
}

function clear(){
    opeActual = '';
    opeAnterior = '';
    operacion = undefined;
}
clear();







