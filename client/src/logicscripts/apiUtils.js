const BASE_URL = "http://localhost:4000"; 

const getApiUrl = (apiName) => {
  return `${BASE_URL}/${apiName}`;
};

export default getApiUrl;
