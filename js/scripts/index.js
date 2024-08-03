import { findAddressByCep } from "../apis/viacep.js";
import { displayAlert } from "../utils/utils.js";
import { Table } from "../components/table/table.js";

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
    const address = await findAddressByCep(cep); 

    if (address.hasOwnProperty("erro"))
      displayAlert("CEP não encontrado!", "danger");
    else addressTable(address);
  } else {
    displayAlert("CEP incorreto!", "danger");
  }
};

function addressTable(address) {
  clearTable();

  const tbl = new Table(address, null);
  tbl.createRowsAndColumns(tbody);

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