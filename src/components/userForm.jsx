import React from "react";
import { getCountryData } from "./../services/countryData";

class UserForm extends React.Component {
  state = {
    country: "",
  };

  handleChange = (event) => {
    let countryName = event.target.value.toLowerCase();
    this.setState({ country: countryName });
  };

  render() {
    let country_list = getCountryData;
    const { country } = this.state;

    return (
      <div className="row">
        <div className="col-sm-8 offset-sm-2    d-grid gap-2 col-md-6 offset-md-3 mt-2">
          <select
            className="btn"
            style={{ borderColor: "#000000" }}
            value={country}
            onChange={this.handleChange}
          >
            {country_list.map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
          <h4 className="mx-2 fw-bold gradientHeader text-center ">
            {country.charAt(0).toUpperCase() + country.slice(1)}
          </h4>
        </div>
        <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2">
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary  "
              onClick={() => this.props.onHandleSubmit(country)}
            >
              Get Statistics
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
