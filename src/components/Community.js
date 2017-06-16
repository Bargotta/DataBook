import React from 'react';

import { Link } from 'react-router';
import { connect } from 'react-redux';

import PersonCard from './PersonCard';
import ProjectCard from './ProjectCard';

function DisplayUsers(props) {
  return (
    <div className="row">
      {
        props.users.map((user) => {
          return (
              <div className="col m4" key={user.id}>
                <PersonCard user={user} />
              </div>
          );
        })
      }
    </div>
  );
}

function Community(props) {
  return (
    <div>
      <nav>
        <div className="nav-wrapper container">
          <div className="col s12">
            <Link to="/community" className="breadcrumb">Community</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="section">
          <h1>People</h1>
          <DisplayUsers users={props.users} />
        </div>
        <div className="section">
          <h1>Projects</h1>
          <div className="row">
            <div className="col m4">
              <ProjectCard />
            </div>
            <div className="col m4">
              <ProjectCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(Community);
