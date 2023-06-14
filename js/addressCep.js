class Cell {
    constructor() {
        this.tdCep = document.createElement("td");
        this.tdLogradouro = document.createElement("td");
        this.tdComplemento = document.createElement("td");
        this.tdBairro = document.createElement("td");
        this.tdLocalidade = document.createElement("td");
        this.tdUf = document.createElement("td");
        this.tdIbge = document.createElement("td");
        this.tdGia = document.createElement("td");
        this.tdDdd = document.createElement("td");
        this.tdSiafi = document.createElement("td");
        this.setAttribute();
    }

    setAttribute() {
        this.tdCep.setAttribute("data-title", "Cep");
        this.tdLogradouro.setAttribute("data-title", "Logradouro");
        this.tdComplemento.setAttribute("data-title", "Complemento");
        this.tdBairro.setAttribute("data-title", "Bairro");
        this.tdLocalidade.setAttribute("data-title", "Localidade");
        this.tdUf.setAttribute("data-title", "UF");
        this.tdIbge.setAttribute("data-title", "IBGE");
        this.tdGia.setAttribute("data-title", "GIA");
        this.tdDdd.setAttribute("data-title", "DDD");
        this.tdSiafi.setAttribute("data-title", "SIAFI");
    }
}

const urlViacep = "https://viacep.com.br/ws";
const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const selectUf = document.getElementById("select-uf");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
    "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO", "DF"];

ufs.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;

    selectUf.appendChild(option);
});

var optionSelected;
selectUf.addEventListener("change", () => {
    optionSelected = selectUf.value;
});

const formValues = {
    uf: "",
    bairro: "",
    logradouro: "",
    isMinimumInputCharacters() {
        return this.bairro.length < 3 || this.logradouro.length < 3 ? true : false;
    }
}

form.addEventListener("submit", event => {
    event.preventDefault();

    formValues.uf = optionSelected;
    formValues.bairro = form.elements.city.value;
    formValues.logradouro = form.elements.publicPlace.value;

    if (formValues.isMinimumInputCharacters())
        return displayAlert('Mínimo de 3 caracteres!', 'danger');

    getCepByAddress(formValues);

    form.reset();
});

const getCepByAddress = async (formValues) => {
    clearTable();

    const url = `${urlViacep}/${formValues.uf}/${formValues.bairro}/${formValues.logradouro}/json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0)
        displayAlert('Endereço não encontrado!', 'danger');
    else
        addressTable(data);
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
    clearTable();

    createRowsAndCells(data);

    showTable();
}

function createRowsAndCells(data) {
    data.forEach((item) => {
        const cell = new Cell();
        cell.tdCep.textContent = item.cep;
        cell.tdLogradouro.textContent = item.logradouro;
        cell.tdComplemento.textContent = item.complemento;
        cell.tdBairro.textContent = item.bairro;
        cell.tdLocalidade.textContent = item.localidade;
        cell.tdUf.textContent = item.uf;
        cell.tdIbge.textContent = item.ibge;
        cell.tdGia.textContent = item.gia;
        cell.tdDdd.textContent = item.ddd;
        cell.tdSiafi.textContent = item.siafi;

        createRows(cell);
    });
}

const createRows = (cell) => {
    const tr = document.createElement("tr");

    tr.appendChild(cell.tdCep);
    tr.appendChild(cell.tdLogradouro);
    tr.appendChild(cell.tdComplemento);
    tr.appendChild(cell.tdBairro);
    tr.appendChild(cell.tdLocalidade);
    tr.appendChild(cell.tdUf);
    tr.appendChild(cell.tdIbge);
    tr.appendChild(cell.tdGia);
    tr.appendChild(cell.tdDdd);
    tr.appendChild(cell.tdSiafi);

    tbody.appendChild(tr);
}

function clearTable() {
    table.className = 'hide-table';
    tbody.innerHTML = "";
}

function showTable() {
    table.className = 'show-table';
}
