import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logChange = this.logChange.bind(this);
  }

  handleSubmit(event) {
    console.log('Searching: ' + this.input.value);
    event.preventDefault();
  }

  logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
  }

  render() {
    return (
      <div className="col m12">
        <div className="col s12 m5">
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                className="search-input"
                type="text"
                ref={(input) => this.input = input}
                placeholder="search..."/>
            </label>
          </form>
        </div>

        <div className="col s12 m7">
          <div className="col s3 input-desc">Filter by:</div>
          <div className="col s9">
            <Select
              name="form-field-name"
              value="select"
              options={this.props.options}
              onChange={this.logChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
