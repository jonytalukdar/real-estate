var axios = require('axios').default;

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const response = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': '2789b86488msh93cdd1b70cfd18dp1488e3jsn57778bff1b65',
    },
  });
  const data = await response.data;
  return data;
};
