export class Table {
  constructor(address = null, adresses = null) {
    this.address = address;
    this.adresses = adresses;
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
    this.#setAttribute();
  }

  #setAttribute() {
    let arrayKeys; 
    if (this.address !== null) {
      arrayKeys = Object.keys(this.address);
    }

    if (this.adresses !== null) {
      arrayKeys = Object.keys(this.adresses[0]);
    }
    
    this.tdCep.setAttribute("data-title", arrayKeys[0]);
    this.tdLogradouro.setAttribute("data-title", arrayKeys[1]);
    this.tdComplemento.setAttribute("data-title", arrayKeys[2]);
    this.tdBairro.setAttribute("data-title", arrayKeys[3]);
    this.tdLocalidade.setAttribute("data-title", arrayKeys[4]);
    this.tdUf.setAttribute("data-title", arrayKeys[5]);
    this.tdIbge.setAttribute("data-title", arrayKeys[6]);
    this.tdGia.setAttribute("data-title", arrayKeys[7]);
    this.tdDdd.setAttribute("data-title", arrayKeys[8]);
    this.tdSiafi.setAttribute("data-title", arrayKeys[9]);
  }

  createRowsAndColumns(htmlTbodyElement) {
    if (this.address !== null) {
      this.#createRowsAndColumnsByAddress(htmlTbodyElement);
    } else if (this.adresses !== null) {
      this.#createRowsAndColumnsByAddresses(htmlTbodyElement);
    } else {
      throw console.error("attributes are null");
    }
  }

  #createRowsAndColumnsByAddress(htmlTbodyElement) {
    this.tdCep.textContent = this.address.cep;
    this.tdLogradouro.textContent = this.address.logradouro;
    this.tdComplemento.textContent = this.address.complemento;
    this.tdBairro.textContent = this.address.bairro;
    this.tdLocalidade.textContent = this.address.localidade;
    this.tdUf.textContent = this.address.uf;
    this.tdIbge.textContent = this.address.ibge;
    this.tdGia.textContent = this.address.gia;
    this.tdDdd.textContent = this.address.ddd;
    this.tdSiafi.textContent = this.address.siafi;

    this.#createRows(htmlTbodyElement);
  }

  #createRowsAndColumnsByAddresses(htmlTbodyElement) {
    this.adresses.forEach((item) => {
      const cell = new Table(null, this.adresses);
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

      cell.#createRows(htmlTbodyElement);
    });
  }

  #createRows(htmlTbodyElement) {
    const tr = document.createElement("tr");

    tr.appendChild(this.tdCep);
    tr.appendChild(this.tdLogradouro);
    tr.appendChild(this.tdComplemento);
    tr.appendChild(this.tdBairro);
    tr.appendChild(this.tdLocalidade);
    tr.appendChild(this.tdUf);
    tr.appendChild(this.tdIbge);
    tr.appendChild(this.tdGia);
    tr.appendChild(this.tdDdd);
    tr.appendChild(this.tdSiafi);

    htmlTbodyElement.appendChild(tr);
  }
}
