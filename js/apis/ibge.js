const webservice =
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

export const findAllStates = async () => {
  const response = await fetch(webservice);
  const data = await response.json();
  return data;
};

export const findAllCitiesByState = async (state) => {
  const url = `${webservice}/${state}/municipios`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
