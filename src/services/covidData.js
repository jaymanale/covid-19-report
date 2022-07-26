export const getCovidData = (country) => {
  return fetch(
    `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_COVID_APP_TOKEN,
      },
    }
  );
};
