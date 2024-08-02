import { findAddressByCep } from "../apis/viacep.js";
import { displayAlert } from "../utils/utils.js";

const form = document.querySelector("form");
const resetButton = document.getElementById("reset-button");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputCep = form.elements.cep.value;
  getCep(inputCep);
});

const validCep = (cep) => /^[0-9]{8}$/.test(cep);

const getCep = async (value) => {
  clearTable();

  const cep = value.replace(/\D/g, "");

  if (validCep(cep)) {
    const adresses = await findAddressByCep(cep); 

    if (adresses.hasOwnProperty("erro"))
      displayAlert("CEP não encontrado!", "danger");
    else addressTable(adresses);
  } else {
    displayAlert("CEP incorreto!", "danger");
  }
};

function addressTable(adresses) {
  const arrayKeys = Object.keys(adresses);
  const arrayValues = Object.values(adresses);
  const tr = document.createElement("tr");
  let td = document.createElement("td");

  clearTable();

  arrayValues.forEach((item, i) => {
    td = document.createElement("td");
    tbody.appendChild(tr);
    tr.appendChild(td);
    td.setAttribute("data-title", arrayKeys[i].toUpperCase());
    td.appendChild(document.createTextNode(item));
  });

  showTable();
}

function clearTable() {
  table.className = "hide-table";
  tbody.innerHTML = "";
}

function showTable() {
  table.className = "show-table";
}

function inputMask(event) {
  const cep = event.target;
  cep.value = cep.value.replace(/^(\d{5})(\d)/, "$1-$2");
}

form.elements.cep.addEventListener("input", inputMask);

resetButton.addEventListener("click", () => {
    clearTable();
});