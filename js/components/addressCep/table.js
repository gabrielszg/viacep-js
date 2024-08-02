export class Cell {
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
