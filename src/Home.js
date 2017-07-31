import React from 'react';

import { Link } from 'react-router';

export default function Home(props) {
  return (
    <div className="container">
      <div className="row section">

        <div className="col s12 m6">
          <h1>Databook</h1>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed. Mauris ut libero vitae magna luctus tempor. Praesent at felis facilisis, interdum tortor et, ultrices ipsum. Sed vel lectus id lectus posuere ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed. Mauris ut libero vitae magna luctus tempor. Praesent at felis facilisis, interdum tortor et, ultrices ipsum. Sed vel lectus id lectus posuere ultricies. lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium vel porta felis. Suspendisse molestie orci urna, dignissim efficitur velit facilisis sed. Mauris ut libero vitae magna luctus tempor. Praesent at felis facilisis, interdum tortor et, ultrices ipsum. Sed vel lectus id lectus posuere ultricies. </p>
        </div>

        <div className="col s12 m6">

          <div className="card">
            <div className="card-content">
              <span className="card-title"><i className="fa fa-book" aria-hidden="true"></i> API Directory</span>
              <p>Browse data APIs, view documentation, and see related projects.</p>
            </div>
            <div className="card-action">
              <Link to="/directory">Go to Directory &rarr;</Link>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <span className="card-title"><i className="fa fa-users" aria-hidden="true"></i> Community</span>
              <p>Find students and projects using the Princeton APIs.</p>
            </div>
            <div className="card-action">
              <Link to="/community">View Community &rarr;</Link>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <span className="card-title"><i className="fa fa-user" aria-hidden="true"></i> Your Profile</span>
              <p>View your profile.</p>
            </div>
            <div className="card-action">
              <Link to="/community">View Your Profile &rarr;</Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
