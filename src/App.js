import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import ApiPage from './ApiPage';
import ProjectPage from './ProjectPage';
import Home from './Home';
import ProfilePage from './ProfilePage';
import Directory from './Directory';
import Community from './Community';
import Developers from './Developers';
import Projects from './Projects';
import CreatePage from './CreatePage';
import IdeaPage from './IdeaPage';
import EventPage from './EventPage';

import './App.css';
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin(); // Needed for onTouchTap http://stackoverflow.com/a/34015469/988941

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

function App(props) {
  return (
    <MuiThemeProvider>
      <div className="App">
        <header>
          <nav className="" role="navigation">
            <div className="nav-wrapper container">
              <a id="logo-container" href="#" className="brand-logo">Databook</a>
              <ul className="right hide-on-med-and-down">
                <li><Link to="/directory">API Directory</Link></li>
                <li><Link to="/community">Community</Link></li>
              </ul>

              <ul id="nav-mobile" className="side-nav">
                <li><a href="#">Navbar Link</a></li>
              </ul>
              <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
            </div>
          </nav>
        </header>

        <main>
          {props.children}
        </main>

        <footer style={{ backgroundColor: '#ee6e73' }}>
          <div className="container" style={{ padding: '20px 0', color: 'white' }}>
            Copyright 2017 Princeton OIT.
          </div>
        </footer>
      </div>
    </MuiThemeProvider>
  );
}

function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="directory" component={Directory} />
        <Route path="directory/:id" component={ApiPage} />
        <Route path="community" component={Community} />
        <Route path="community/developers" component={Developers} />
        <Route path="community/projects" component={Projects} />
        <Route path="community/projects/create" component={CreatePage} />
        <Route path="community/projects/ideas" component={IdeaPage} />
        <Route path="community/events" component={EventPage} />
        <Route path="project/:id" component={ProjectPage} />
        <Route path="profile/:id" component={ProfilePage} />
      </Route>
    </Router>
  );
}

export default Routes;
