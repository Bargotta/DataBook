import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';

import demoApi from './demoApi';
import PersonCard from './PersonCard';
import SaveWidget from './SaveWidget';
import ExpandingSection from './ExpandingSection';

const ApiPageHeader = (props) => <h2 style={{ fontSize: '2rem' }}>{props.children}</h2>;

class ApiPage extends Component {
  componentDidMount() {
    $('.collapsible').collapsible();
  }

  handleCategoryChip(category) {
    this.props.router.push('/directory');
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper container">
            <div className="col s12">
              <Link to="/directory" className="breadcrumb">API Directory</Link>
              <Link className="breadcrumb">View API</Link>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="section">
            <h1>{demoApi.title} <SaveWidget size="40" /></h1>
            <p className="flow-text">{demoApi.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {demoApi.categories.map(category => <Chip key={category} onTouchTap={() => this.handleCategoryChip(category)} style={{ margin: '4px' }}>{category}</Chip>)}
            </div>
          </div>

          <div className="row">
            <div className="col m9">
              <div className="section">
                <ApiPageHeader>Technical Info</ApiPageHeader>
                <ExpandingSection>
                  {demoApi.technical}
                </ExpandingSection>

                <ApiPageHeader>Versions</ApiPageHeader>
                <ul className="collapsible popout">
                {demoApi.versions.map((e, i) =>
                  <li key={e.version}>
                    <div className={'collapsible-header' + (i === 0 ? ' active' : '')}>
                      <strong>v{e.version}</strong> ({e.date})
                    </div>
                    <div className="collapsible-body">
                      Status: {e.status}<br/>
                      XSD: <a href={e.xsd}>{e.xsd}</a><br/>
                      <i>{e.description}</i>
                    </div>
                  </li>
                )}
                </ul>
              </div>

              <div className="divider"></div>

              <div className="section">
                <ApiPageHeader>Community</ApiPageHeader>

                <div className="row">
                  <div className="col m6">
                    <PersonCard name="Bob Frankfurt" year="'20" projects={9} saved={4}/>
                  </div>
                  <div className="col m6">
                    <PersonCard name="John Smith" year="'18" projects={4} saved={4}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col m3">
              <ApiPageHeader>Links</ApiPageHeader>
              <p>
                <RaisedButton
                  fullWidth
                  primary
                  style={{ margin: '0.5rem' }}
                  label="Try it Out"
                  icon={<FontIcon className="fa fa-cogs fa-fw" />}
                />
                <RaisedButton
                  fullWidth
                  style={{ margin: '0.5rem' }}
                  label="View Docs"
                  icon={<FontIcon className="fa fa-book fa-fw" />}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApiPage;
