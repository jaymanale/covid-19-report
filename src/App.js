import React from 'react';
import UserForm from './components/userForm';
import InfoCard from './components/infoCard';
import Loader from './components/loader';

class App extends React.Component {
  state = {
    loading: false,
    allCountryInfo: [],
  };

  handleCountry = (country) => {
    this.setState({ loading: true, allCountryInfo: [] });

    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': '2548137a99msh3307ab54622080cp1504d8jsn53b20928f346',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ allCountryInfo: data.response, loading: false });
      })
      .catch((e) => console.log('error in fetch data', e));
  };

  render() {
    const { loading, allCountryInfo } = this.state;

    return (
      <div className="container">
        <h4 className="text-center m-2">Covid-19 Report</h4>
        <UserForm onHandleSubmit={this.handleCountry} />
        {console.log(allCountryInfo)}

        {allCountryInfo.length !== 0 && (
          <div className="container">
            <div className="row">
              <InfoCard
                value={allCountryInfo[0].cases.total}
                title="Total Cases"
                cardStyle="info"
              />

              <InfoCard
                value={allCountryInfo[0].cases.active}
                title="Active Cases"
                cardStyle="primary"
              />

              <InfoCard
                value={allCountryInfo[0].cases.recovered}
                title="Recorved"
                cardStyle="success"
              />

              <InfoCard
                value={allCountryInfo[0].deaths.total}
                title="Total Deaths"
                cardStyle="danger"
              />
            </div>
          </div>
        )}
        {loading === true && <Loader />}
      </div>
    );
  }
}

export default App;
