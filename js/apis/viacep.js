const webservice = "https://viacep.com.br/ws";

export const findAddressByCep = async (zipCode) => {
  const url = `${webservice}/${zipCode}/json`;
  const response = await fetch(url);
  const data = await response.json();
  return data; 
};

export const findCepByAddress = async (federalUnit, city, publicPlace) => {
  const url = `${webservice}/${federalUnit}/${city}/${publicPlace}/json`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
