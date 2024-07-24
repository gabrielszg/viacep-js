const webservice = "https://viacep.com.br/ws";

export const findCepByAddress = async (federalUnit, city, publicPlace) => {
  const url = `${webservice}/${federalUnit}/${city}/${publicPlace}/json`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
