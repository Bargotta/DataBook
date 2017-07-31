import React from 'react';
import Navbar from './Navbar';

export default function CreatePage(props) {
  const links = [
    {
      id: 1,
      text: "Community",
      link: "/community"
    },
    {
      id: 2,
      text: "Projects",
      link: "/community/projects"
    },
    {
      id: 3,
      text: "Create Project",
      link: "/community/projects/create"
    }
  ];
  return (
    <div>
      <Navbar links={links} />
      <div className="container">
        <h1>Create New Project</h1>
        <div className="row section">
          <div className="col s12">
            <div className="col s12 m6">
              Invite Developers:
              <input className="search-input" type="text" />
            </div>
            <div className="col s12 m6">
              Planned APIs:
              <input className="search-input" type="text" />
            </div>
          </div>
          <div className="col s12">
            <div className="col s12 m6">
              Plan:
              <textarea />
            </div>
            <div className="col s12 m6">
              Description:
              <textarea />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
