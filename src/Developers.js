import React from 'react';
import { Link } from 'react-router';
import PersonCard from './PersonCard';
import LeftColumn from './LeftColumn';

export default function Developers(props) {
  return (
    <div>

      <nav>
        <div className="nav-wrapper container">
          <div className="col s12">
            <Link to="/community" className="breadcrumb">Community</Link>
            <Link to="/community/developers" className="breadcrumb">Developers</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="section row">

          <div className="col m12">
            <div className="col s12 m6">
              left input
            </div>
            <div className="col s12 m6">
              right search
            </div>

            <div className="col m4">
              <PersonCard name="Aaron Bargotta" year="'19" projects={10} saved={3}/>
            </div>
            <div className="col m4">
              <PersonCard name="Bill Adams" year="'19" projects={5} saved={15}/>
            </div>
            <div className="col m4">
              <PersonCard name="Lucy Swartz" year="'19" projects={3} saved={1}/>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
