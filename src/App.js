import React from 'react';
import UserForm from './components/userForm';
import InfoCard from './components/infoCard';
import Loader from './components/loader';

class App extends React.Component {
  state = {
    loading: false,
    error: false,
    allCountryInfo: [],
  };

  handleCountry = (country) => {
    this.setState({ loading: true, allCountryInfo: [], error: false });

    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-193.p.rapidapi.com',
        'x-rapidapi-key': '2548137a99msh3307ab54622080cp1504d8jsn53b20928f346',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.response.length === 0) {
          this.setState({
            allCountryInfo: data.response,
            loading: false,
            error: true,
          });
        } else {
          this.setState({
            allCountryInfo: data.response,
            loading: false,
            error: false,
          });
        }
      })
      .catch((e) => console.log('error in fetch data', e));
  };

  render() {
    const { loading, error, allCountryInfo } = this.state;

    return (
      <div className="container">
        <h4 className="text-center m-2">Covid-19 Report</h4>
        <UserForm onHandleSubmit={this.handleCountry} />

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
        {error === true && (
          <p className="text-center m-2 text-danger">
            Plese provide valid country name.
          </p>
        )}
      </div>
    );
  }
}

export default App;
