import { findAllStates, findAllCitiesByState } from "./apis/ibge.js";
import { findCepByAddress } from "./apis/viacep.js";
import { Cell } from "./components/table.js";
import { displayAlert } from "./utils/utils.js";

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
  clearTable();

  const data = await findCepByAddress(
    formValues.uf,
    formValues.bairro,
    formValues.logradouro
  );

  if (data.length === 0) displayAlert("Endereço não encontrado!", "danger");
  else addressTable(data);
};

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
};

function clearTable() {
  table.className = "hide-table";
  tbody.innerHTML = "";
}

function showTable() {
  table.className = "show-table";
}

resetButton.addEventListener("click", () => {
  const firstOption = selectCity.options[0];
  selectCity.innerHTML = "";
  selectCity.appendChild(firstOption);

  clearTable();
});
