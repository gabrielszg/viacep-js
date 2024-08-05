import { findAllStates, findAllCitiesByState } from "../apis/ibge.js";
import { findCepByAddress } from "../apis/viacep.js";
import { Table } from "../components/table/table.js";
import { displayAlert, clearTable, showTable } from "../utils/utils.js";

const form = document.querySelector("form");
const selectUf = document.getElementById("select-uf");
const selectCity = document.getElementById("select-city");
const resetButton = document.getElementById("reset-button");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

const insertStatesSelectionMenu = async () => {
  const states = await findAllStates();

  createStateSelectionMenu(states);
};

const createStateSelectionMenu = (states) => {
  states.sort((a, b) => a.nome.localeCompare(b.nome));
  states.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.sigla;
    option.textContent = item.nome;

    selectUf.appendChild(option);
  });
};

insertStatesSelectionMenu();

const insertCitiesSelectionMenu = async (state) => {
  const cities = await findAllCitiesByState(state);

  createCitySelectionMenu(cities);
};

const createCitySelectionMenu = (cities) => {
  const defaultOption = selectCity.querySelector('option[value=""]');

  if (!defaultOption) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecione a Cidade";

    selectCity.appendChild(option);
  }

  cities.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.nome;
    option.textContent = item.nome;

    selectCity.appendChild(option);
  });
};

var selectedState;
selectUf.addEventListener("change", async () => {
  selectedState = selectUf.value;
  selectCity.innerHTML = "";

  insertCitiesSelectionMenu(selectedState);
});

const formValues = {
  uf: "",
  bairro: "",
  logradouro: "",
  isMinimumInputCharacters() {
    return this.logradouro.length < 3 ? true : false;
  },
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  formValues.uf = selectedState;
  formValues.bairro = selectCity.value;
  formValues.logradouro = form.elements.publicPlace.value;

  if (formValues.isMinimumInputCharacters())
    return displayAlert("Mínimo de 3 caracteres!", "danger");

  getCepByAddress(formValues);
});

const getCepByAddress = async (formValues) => {
  clearTable(table);

  const adresses = await findCepByAddress(
    formValues.uf,
    formValues.bairro,
    formValues.logradouro
  );

  if (adresses.length === 0) displayAlert("Endereço não encontrado!", "danger");
  else addressTable(adresses);
};

function addressTable(adresses) {
  clearTable(table);

  const tbl = new Table(null, adresses);
  tbl.createRowsAndColumns(tbody);

  showTable(table);
}

resetButton.addEventListener("click", () => {
  const firstOption = selectCity.options[0];
  selectCity.innerHTML = "";
  selectCity.appendChild(firstOption);

  clearTable(table);
});
