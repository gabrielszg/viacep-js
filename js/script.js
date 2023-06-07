const urlViacep = "https://viacep.com.br/ws/";
const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

form.addEventListener("submit", event => {
    event.preventDefault();

    const inputCep = form.elements.cep.value;
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
    const arrayKeys = Object.keys(data);
    const arrayValues = Object.values(data);
    const tr = document.createElement("tr");
    let td = document.createElement("td");

    clearTable();

    arrayValues.forEach((item, i) => {
        td = document.createElement("td");
        tbody.appendChild(tr);
        tr.appendChild(td);
        td.setAttribute('data-title', arrayKeys[i].toUpperCase());
        td.appendChild(document.createTextNode(item));
    });

    showTable();
}

function clearTable() {
    table.className = 'hide-table';
    tbody.innerHTML = "";
}

function showTable() {
    table.className = 'show-table';
}

function inputMask(event) {
    const cep = event.target;
    cep.value = cep.value.replace(/^(\d{5})(\d)/, "$1-$2");
}

form.elements.cep.addEventListener("input", inputMask);
