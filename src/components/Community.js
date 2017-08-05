import React from 'react';

import { Link } from 'react-router';

export default function Community(props) {
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
        <div className="row section">

          <div className="col s12 m4">
            <div className="card">
              <div className="card-content">
                <span className="card-title"><i className="fa fa-book" aria-hidden="true"></i> Developers</span>
                <p>Browse student developers.</p>
              </div>
              <div className="card-action">
                <Link to="/community/developers">View Developers &rarr;</Link>
              </div>
            </div>

            <div className="community-landing-desc">
              <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed. </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="card">
              <div className="card-content">
                <span className="card-title"><i className="fa fa-users" aria-hidden="true"></i> Projects</span>
                <p>View current projects.</p>
              </div>
              <div className="card-action">
                <Link to="/community/projects">View Projects &rarr;</Link>
              </div>
            </div>

            <div className="community-landing-desc">
              <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed. </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="card">
              <div className="card-content">
                <span className="card-title"><i className="fa fa-user" aria-hidden="true"></i> Events</span>
                <p>See all events.</p>
              </div>
              <div className="card-action">
                <Link to="/community/events">View Events &rarr;</Link>
              </div>
            </div>

            <div className="community-landing-desc">
              <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed. </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
