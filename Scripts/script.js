const form = document.getElementById('form');
const campos = document.querySelectorAll('.required');
const spans = document.querySelectorAll('.span-required');
const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const modal = document.getElementById('Modal');
const backdrop = document.getElementById('backdrop');
const show_descricao = document.querySelectorAll("botao_descricao");


// Adicione um ouvinte de evento ao backdrop (elemento de fundo) para fechar o modal
backdrop.addEventListener("click", () => {
    closeModal();
});

// Função para verificar se há erros nos campos
function hasErrors() {
    return Array.from(campos).some((campo) => campo.style.border);
}

// Ouvinte de evento para redefinir campos
form.addEventListener('reset', () => {
    campos.forEach((campo, index) => {
        removeError(index);
    });
});

// Função para definir um erro em um campo
function setError(index) {
    campos[index].style.border = '2px solid #e63636';
    spans[index].style.display = 'block';
}

// Função para remover um erro de um campo
function removeError(index) {
    campos[index].style.border = '';
    spans[index].style.display = 'none';
}

// Função para validar o nome
function nameValidate() {
    const nome = campos[0].value;
    if (nome.length < 3) {
        setError(0);
    } else {
        removeError(0);
    }
}

// Função para validar o email
function emailValidate() {
    const email = campos[1].value;
    if (!emailRegex.test(email)) {
        setError(1);
    } else {
        removeError(1);
    }
}

// Função para validar o telefone
function telefoneValidate() {
    const telefoneInput = campos[2];
    let value = telefoneInput.value.replace(/\D/g, '');

    if (telefoneInput.value === 'Digite seu telefone') {
        telefoneInput.value = '';
    }

    if (value.length === 0 || value.length !== 11) {
        setError(2);
        spans[2].textContent = 'Telefone deve ter 11 dígitos';
        spans[2].style.display = 'block';
    } else {
        telefoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        removeError(2);
    }
}

// Ouvinte de evento para o campo de telefone ao receber foco
campos[2].addEventListener('focus', function () {
    if (campos[2].value === 'Digite seu telefone') {
        campos[2].value = '';
    }
});

// Função para abrir o modal
function openModal() {
    modal.style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
    console.log('Fechando o modal');
    modal.style.display = 'none';
}

// Adicione o ouvinte de evento ao formulário para prevenir a submissão padrão
form.addEventListener('submit', (event) => {
    event.preventDefault();
    nameValidate();
    emailValidate();
    telefoneValidate();

    if (!hasErrors()) {
        const formData = {
            nome: campos[0].value,
            email: campos[1].value,
            telefone: campos[2].value,
            descricao: document.getElementById('descricao').value,
        };

        // Preencha os dados no modal de sucesso
        document.getElementById('modal-nome').textContent = formData.nome;
        document.getElementById('modal-email').textContent = formData.email;
        document.getElementById('modal-telefone').textContent = formData.telefone;
        document.getElementById('modal-descricao').textContent = formData.descricao;

        openModal();
    }
});

function mostra_descricao(event) {
    const descricao = document.querySelectorAll(".descricao");

    if (descricao.style.display === "none" || descricao.style.display === "") {
        descricao.style.display = "block";
    } else {
        descricao.style.display = "none";
    }
}


botao_descricao.forEach(button => {
    button.addEventListener("click", mostra_descricao);
});
