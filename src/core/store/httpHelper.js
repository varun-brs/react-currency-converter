import axios from "axios";
const BaseURL = process.env.REACT_APP_API_ENDPOINT;

export const HttpGet = async (aParams) => {
  const oURL = BaseURL + aParams;
  const oResult = await axios.get(oURL);
  return oResult?.data;
};
