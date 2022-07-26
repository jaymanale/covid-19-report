import React from "react";
import UserForm from "./components/userForm";
import InfoCard from "./components/infoCard";
import { getCovidData } from "./services/covidData";
import Loader from "./components/loader";

class App extends React.Component {
  state = {
    loading: false,
    error: false,
    allCountryInfo: [],
  };

  handleCountry = async (country) => {
    this.setState({
      loading: true,
    });

    const data = await (await getCovidData(country)).json();

    if (data && data.response && data.response.length === 0) {
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
        <h1 className="text-center m-2 gradientHeader headerText">
          Covid 19 Statistics
        </h1>
        <UserForm onHandleSubmit={this.handleCountry} />

        {allCountryInfo.length !== 0 && (
          <div className="container">
            <div className="row mb-3">
              <InfoCard
                value={allCountryInfo[0].cases.total}
                title="Total Cases"
                cardStyle="text-bg-info"
              />

              <InfoCard
                value={allCountryInfo[0].cases.active}
                title="Active Cases"
                cardStyle="text-bg-primary"
              />

              <InfoCard
                value={allCountryInfo[0].cases.recovered}
                title="Recorved"
                cardStyle="text-bg-success"
              />

              <InfoCard
                value={allCountryInfo[0].deaths.total}
                title="Total Deaths"
                cardStyle="text-bg-danger"
              />
            </div>
          </div>
        )}
        {loading && <Loader />}
        {error && (
          <p className="text-center m-2 text-danger fw-bold">
            Plese provide valid country name.
          </p>
        )}
      </div>
    );
  }
}

export default App;
