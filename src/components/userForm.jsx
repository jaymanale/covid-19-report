import React from 'react';

class UserForm extends React.Component {
  state = {
    country: '',
  };

  handleChange = (event) => {
    this.setState({ country: event.target.value });
  };

  render() {
    const { country } = this.state;

    return (
      <div className="row">
        <div className="col-sm-8 offset-sm-2  col-md-6 offset-md-3 mt-2">
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Country Name"
              className="form-control"
              value={country}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-2">
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.onHandleSubmit(country)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default UserForm;
