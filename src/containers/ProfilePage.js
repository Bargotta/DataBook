import React from 'react';
import { Link } from 'react-router';
import { CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import HoverCard from '../components/HoverCard';
import SaveWidget from '../components/SaveWidget';
import PersonIcon from '../components/PersonIcon';
import ProjectCard from '../components/ProjectCard';
import Search from '../components/Search';

const ProfilePageHeader = (props) => <h2 style={{ fontSize: '2rem' }}>{props.children}</h2>;

function SavedCard(props) {
  return (
    <HoverCard
      href="/directory/123"
      cardStyle={{
        margin: '0.5rem 0 1rem',
        backgroundColor: 'white'
      }}
    >
      <CardTitle title={<span>Course Offerings API <SaveWidget /></span>} />
      <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem</CardText>
    </HoverCard>
  );
}

export default function ProfilePage(props) {
    {console.log(props);}
  return (
    <div>
      <nav>
        <div className="nav-wrapper container">
          <div className="col s12">
            <Link to="/community" className="breadcrumb">Community</Link>
            <Link to="/community/developers" className="breadcrumb">Developers</Link>
            <Link className="breadcrumb">Aaron Bargotta</Link>
          </div>
        </div>
      </nav>
      <div className="container">
        <h1 className="valign-wrapper"><div style={{marginRight: '20px'}}><PersonIcon size="100" /></div> Aaron Bargotta</h1>
        <div className="divider" />
        <div className="row">
          <div className="col m9">
            <div className="section">
              <ProfilePageHeader>Projects</ProfilePageHeader>
              <div className="row">
                <div className="col s12">
                  <Search />
                </div>
                <div className="col m6 s12">
                  <ProjectCard
                    name="recal"
                    desc="A course selection tool."
                    members={[1,2]}
                  />
                </div>
                <div className="col m6 s12">
                  <ProjectCard
                    name="proj5"
                    desc="Sample project #5"
                    members={[1,2,3]}
                  />
                </div>
                <div className="col m6 s12">
                  <ProjectCard
                    name="proj8"
                    desc="Sample project #8"
                    members={[1]}
                  />
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
