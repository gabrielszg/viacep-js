export const displayAlert = (text, action) => {
  const alert = document.querySelector(".alert");
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
};

export const validCep = (cep) => /^[0-9]{8}$/.test(cep);

export const clearTable = (htmlTableElement) => {
  htmlTableElement.className = "hide-table";
  const tbody = htmlTableElement.children.item(1);
  tbody.innerHTML = "";
};

export const showTable = (htmlTableElement) => {
  htmlTableElement.className = "show-table";
};
