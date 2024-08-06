import { findAddressByCep } from "../apis/viacep.js";
import {
  displayAlert,
  validCep,
  clearTable,
  showTable,
} from "../utils/utils.js";
import { Table } from "../components/table/table.js";

const form = document.querySelector("form");
const resetButton = document.getElementById("reset-button");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

const inputMask = (event) => {
  const cep = event.target;
  cep.value = cep.value.replace(/^(\d{5})(\d)/, "$1-$2");
};

const submitForm = (event) => {
  event.preventDefault();

  const inputCep = form.elements.cep.value;
  getCep(inputCep);
};

const getCep = async (value) => {
  clearTable(table);

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

const addressTable = (address) => {
  clearTable(table);

  const tbl = new Table(address, null);
  tbl.createRowsAndColumns(tbody);

  showTable(table);
};

form.elements.cep.addEventListener("input", inputMask);
form.addEventListener("submit", submitForm);

resetButton.addEventListener("click", () => {
  clearTable(table);
});
