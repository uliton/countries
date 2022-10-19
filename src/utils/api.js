const URL = 'https://restcountries.com';

export const getCountries = async () => {
  const response = await fetch(`${URL}/v3.1/all`);

  return response.json();
}
