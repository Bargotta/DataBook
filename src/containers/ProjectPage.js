import React from 'react';
import { Link } from 'react-router';
import PersonIcon from '../components/PersonIcon';
import SaveWidget from '../components/SaveWidget';

const ProjectPageHeader = (props) => <h3 style={{ fontSize: '2rem' }}>{props.children}</h3>;

function FakeScreenshot() {
  return (
    <div style={{paddingBottom: '50%', backgroundColor: '#ccc', position: 'relative'}}><div style={{textAlign: 'center', width: '100%', position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>Image</div></div>
  )
}

export default function ProjectPage(props) {
  const ProjectPageIcon = () => <Link to="/profile/123"><div style={{float: 'left', marginRight: '15px'}}><PersonIcon size="40" /></div></Link>;

  return (
    <div>
      <nav>
        <div className="nav-wrapper container">
          <div className="col s12">
            <Link to="/community" className="breadcrumb">Community</Link>
            <Link to="/community/projects" className="breadcrumb">Projects</Link>
            <Link className="breadcrumb">ReCal</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <h2>ReCal <SaveWidget size="40" /></h2>
        <p className="flow-text">A student-made course selection tool for Princeton students.</p>

        <div className="divider" />

        <div className="row">
          <div className="col m9">
            <ProjectPageHeader>Screenshots</ProjectPageHeader>
            <FakeScreenshot />
          </div>
          <div className="col m3">
            <ProjectPageHeader>Authors</ProjectPageHeader>
            <p style={{margin: '2em 0 1em'}}><ProjectPageIcon /><ProjectPageIcon /><ProjectPageIcon /><div style={{clear: 'both'}} /></p>

            <ProjectPageHeader>Links</ProjectPageHeader>
            <p><a className="btn" href="http://recal.io/">Go to Website</a></p>
            <p><a className="btn" href="https://itunes.apple.com/us/app/recal-course-selection/id946948041?ls=1&mt=8">Download for iOS</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
