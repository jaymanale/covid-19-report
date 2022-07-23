export const getCovidData = (country) => {
  return fetch(
    `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "2548137a99msh3307ab54622080cp1504d8jsn53b20928f346",
      },
    }
  );
};
