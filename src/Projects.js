import React from 'react';
import { Link } from 'react-router';
import ProjectCard from './ProjectCard';

export default function Projects(props) {
  return (
    <div>
      <nav>
        <div className="nav-wrapper container">
          <div className="col s12">
            <Link to="/community" className="breadcrumb">Community</Link>
            <Link to="/community/projects" className="breadcrumb">Projects</Link>
          </div>
        </div>
      </nav>

      <div className="container">
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
