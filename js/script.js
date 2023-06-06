const urlViacep = "https://viacep.com.br/ws/";
const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

form.addEventListener("submit", event => {
    event.preventDefault();

    let inputCep = form.elements.cep.value;
    getCep(inputCep);

    form.reset();
});

const validCep = (cep) => /^[0-9]{8}$/.test(cep);

const getCep = async (value) => {
    clearTable();

    const cep = value.replace(/\D/g, '');

    const url = `${urlViacep}${cep}/json`;

    if (validCep(cep)) {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hasOwnProperty('erro'))
            displayAlert('CEP não encontrado!', 'danger');
        else
            addressTable(data);
    } else {
        displayAlert('CEP incorreto!', 'danger');
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

function addressTable(data) {
    let array = Object.values(data);

    let tr = document.createElement("tr");
    let td = document.createElement("td");

    clearTable();

    array.map((item) => {
        td = document.createElement("td");
        tbody.appendChild(tr);
        tr.appendChild(td);
        td.appendChild(document.createTextNode(item));
    });

    table.className = 'show-table';
}

function clearTable() {
    table.className = 'hide-table';
    tbody.innerHTML = "";
}

function inputMask(event) {
    const cep = event.target;
    cep.value = cep.value.replace(/^(\d{5})(\d)/, "$1-$2");
}

form.elements.cep.addEventListener("input", inputMask);
