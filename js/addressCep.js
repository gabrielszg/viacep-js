const urlViacep = "https://viacep.com.br/ws";
const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const selectUf = document.getElementById("select-uf");
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

const uf = ["AC", "AL", "AP", "AM", "BA", "CE", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB",
    "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO", "DF"];

uf.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;

    selectUf.appendChild(option);
});

var optionSelected;
selectUf.addEventListener("change", () => {
    optionSelected = selectUf.value;
});

form.addEventListener("submit", event => {
    event.preventDefault();

    const inputCity = form.elements.city.value;
    const inputPublicPlace = form.elements.publicPlace.value;

    if (inputCity.length < 3 || inputPublicPlace.length < 3)
       return displayAlert('Mínimo de 3 caracteres!', 'danger');

    getCepByAddress(optionSelected, inputCity, inputPublicPlace);

    form.reset();
});

const getCepByAddress = async (uf, city, publicPlace) => {
    clearTable();

    const url = `${urlViacep}/${optionSelected}/${city}/${publicPlace}/json`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

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

    const keys = Object.keys(data[0]);

    data.forEach((item, i) => {
        let tr = document.createElement("tr");
        let tdCep = document.createElement("td");
        let tdLogradouro = document.createElement("td");
        let tdComplemento = document.createElement("td");
        let tdBairro = document.createElement("td");
        let tdLocalidade = document.createElement("td");
        let tdUF = document.createElement("td");
        let tdIBGE = document.createElement("td");
        let tdGIA = document.createElement("td");
        let tdDDD = document.createElement("td");
        let tdSIAFI = document.createElement("td");

        tdCep.setAttribute('data-title', keys[0]);
        tdCep.textContent = item.cep;
        
        tdLogradouro.setAttribute('data-title', keys[1]);
        tdLogradouro.textContent = item.logradouro;

        tdComplemento.setAttribute('data-title', keys[2]);
        tdComplemento.textContent = item.complemento;

        tdBairro.setAttribute('data-title', keys[3]);
        tdBairro.textContent = item.bairro;

        tdLocalidade.setAttribute('data-title', keys[4]);
        tdLocalidade.textContent = item.localidade;

        tdUF.setAttribute('data-title', keys[5]);
        tdUF.textContent = item.uf;

        tdIBGE.setAttribute('data-title', keys[6]);
        tdIBGE.textContent = item.ibge;

        tdGIA.setAttribute('data-title', keys[7]);
        tdGIA.textContent = item.gia;

        tdDDD.setAttribute('data-title', keys[8]);
        tdDDD.textContent = item.ddd;

        tdSIAFI.setAttribute('data-title', keys[9]);
        tdSIAFI.textContent = item.siafi;

        tr.appendChild(tdCep);
        tr.appendChild(tdLogradouro);
        tr.appendChild(tdComplemento);
        tr.appendChild(tdBairro);
        tr.appendChild(tdLocalidade);
        tr.appendChild(tdUF);
        tr.appendChild(tdIBGE);
        tr.appendChild(tdGIA);
        tr.appendChild(tdDDD);
        tr.appendChild(tdSIAFI);

        tbody.appendChild(tr);
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
