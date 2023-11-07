const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    nameValidate();
    emailValidate();
    telefoneValidate();
});

form.addEventListener('reset', () => {
    campos.forEach((campo, index) => {
        campo.style.border = ''; // Remove a borda vermelha
        spans[index].style.display = 'none'; // Oculta os spans de validação
    });
});


function setError(index) {
    campos[index].style.border = '2px solid #e63636';
    spans[index].style.display = 'block';
}

function removeError(index) {
    campos[index].style.border = '';
    spans[index].style.display = 'none';
}

function nameValidate() {
    if (campos[0].value.length < 3) {
        setError(0);
    } else {
        removeError(0);
    }
}

function emailValidate() {
    if (!emailRegex.test(campos[1].value)) {
        setError(1);
    } else {
        removeError(1);
    }
}

function telefoneValidate() {
    let telefoneInput = campos[2];
    let value = telefoneInput.value.replace(/\D/g, '');

    if (telefoneInput.value === 'Digite seu telefone') {
        telefoneInput.value = '';
    }

    if (value.length === 0) {
        setError(2);
        spans[2].style.display = 'block';
    } else if (value.length !== 11) {
        setError(2);
        spans[2].textContent = 'Telefone deve ter 11 dígitos';
        spans[2].style.display = 'block';
    } else {
        telefoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        removeError(2);
        spans[2].style.display = 'none';
    }
}

campos[2].addEventListener('focus', function() {
    if (campos[2].value === 'Digite seu telefone') {
        campos[2].value = '';
    }
});



