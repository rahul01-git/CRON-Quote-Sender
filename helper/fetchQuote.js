const axios = require("axios");

const fetchQuote = async () => {
  const options = {
    method: "GET",
    url: process.env.API,
    params: {
      category: "all",
      count: "1",
    },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data[0].text;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
};

module.exports = {
  fetchQuote,
};
