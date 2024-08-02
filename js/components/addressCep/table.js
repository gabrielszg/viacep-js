export class Table {
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
    this.#setAttribute();
  }

  #setAttribute() {
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

  createRowsAndCells(data, htmlTbodyElement) {
    data.forEach((item) => {
      const cell = new Table();
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
