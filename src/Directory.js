import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import demoApi from './demoApi';
const apis = [demoApi, demoApi, demoApi, demoApi, demoApi, demoApi, demoApi];

export default class Directory extends Component {
  componentDidMount() {
    $('.collapsible').collapsible();
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper container">
            <div className="col s12">
              <Link to="/directory" className="breadcrumb">API Directory</Link>
            </div>
          </div>
        </nav>

        <div className="container">
          <h1>Browse APIs</h1>

          <ul className="collapsible z-depth-0" data-collapsible="accordion">
            <li>
              <div className="collapsible-header"><i className="fa fa-plus" aria-hidden="true"></i> Search Filters</div>
              <div className="collapsible-body"><span></span></div>
            </li>
          </ul>

          <div className="row">
            {apis.map(api =>
              <div className="col l4 m6 s12">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">{api.title}</span>
                    <p>{api.description}</p>
                  </div>
                  <div className="card-action">
                    <Link to="/directory/123">More Info</Link>
                    <Link to="/directory/123">View Docs</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
