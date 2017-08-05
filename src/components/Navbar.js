import React from 'react';
import { Link } from 'react-router';

export default function Navbar(props) {
  return (
    <nav>
      <div className="nav-wrapper container">
        <div className="col s12">
        {
          props.links.map(link =>
            <Link key={link.id} to={link.link} className="breadcrumb">{link.text}</Link>
          )
        }
        </div>
      </div>
    </nav>
  )
}
