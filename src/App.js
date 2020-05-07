import React from 'react';
import UserForm from './components/userForm';
import InfoCard from './components/infoCard';
import { getCovidData } from './services/covidData';
import Loader from './components/loader';

class App extends React.Component {
  state = {
    loading: false,
    error: false,
    allCountryInfo: [],
  };

  handleCountry = async (country) => {
    this.setState({ loading: true, allCountryInfo: [], error: false });

    const data = await (await getCovidData(country)).json();
    console.log(data);
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
