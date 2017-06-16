import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import HoverCard from './HoverCard';
import PersonIcon from './PersonIcon';
import ProjectCard from './ProjectCard';
import SaveWidget from './SaveWidget';
import { selectUser } from '../actions/index'

const ProfilePageHeader = (props) => <h2 style={{ fontSize: '2rem' }}>{props.children}</h2>;

function SavedCard(props) {
  return (
    <HoverCard href="/directory/123">
      <CardTitle title={<span>Course Offerings API <SaveWidget /></span>} />
      <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem</CardText>
    </HoverCard>
  );
}

class ProfilePage extends Component {
  render() {
    // 1. Check if a profile has been selected
    if (!this.props.activeUser) {
      return (<h1 style={{textAlign: 'center'}}>No User Selected</h1>);
    }
    // 2. Show profile of selected user
    return (
      <div>
        <nav>
          <div className="nav-wrapper container">
            <div className="col s12">
              <Link to="/community" className="breadcrumb">Community</Link>
              <Link className="breadcrumb">View Profile</Link>
            </div>
          </div>
        </nav>
        <div className="container">
          <h1 className="valign-wrapper"><div style={{marginRight: '20px'}}><PersonIcon size="100" /></div>{this.props.activeUser.first}&nbsp;{this.props.activeUser.last}&nbsp;{this.props.activeUser.year}</h1>
          <div className="divider" />
          <div className="row">
            <div className="col m9">
              <div className="section">
                <ProfilePageHeader>Projects</ProfilePageHeader>
                <div className="row">
                  <div className="col m6 s12">
                    <ProjectCard />
                  </div>
                  <div className="col m6 s12">
                    <ProjectCard />
                  </div>
                  <div className="col m6 s12">
                    <ProjectCard />
                  </div>
                </div>
              </div>

              <div className="section">
                <ProfilePageHeader>Saved</ProfilePageHeader>
                <div className="row">
                  <div className="col m6 s12">
                    <SavedCard />
                  </div>
                  <div className="col m6 s12">
                    <SavedCard />
                  </div>
                  <div className="col m6 s12">
                    <SavedCard />
                  </div>
                </div>
              </div>
            </div>

            <div className="col m3">
              <div className="section">
                <ProfilePageHeader>About</ProfilePageHeader>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem.</p>
                <p>
                  <RaisedButton label="GitHub" icon={<FontIcon className="fa fa-github fa-fw" />} style={{ margin: '0.5rem' }} />
                  <RaisedButton label="Twitter" icon={<FontIcon className="fa fa-twitter fa-fw" />} style={{ margin: '0.5rem' }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    activeUser: state.activeUser
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectUser: selectUser
  }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(ProfilePage);
