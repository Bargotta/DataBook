import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProjectCard from '../components/ProjectCard'
import LeftColumn from '../components/LeftColumn'
import Search from '../components/Search'
import LoadMore from '../components/LoadMore'
import Navbar from '../components/Navbar'

import {
  fetchProjects
} from '../actions'

class Projects extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchProjects())
  }

  render() {
    const options = [
      { value: 'Likes', label: 'Likes' },
      { value: 'Members Needed', label: 'Members Needed' },
      { value: 'Complete', label: 'Complete' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'A-Z', label: 'A-Z' },
      { value: 'Creation Date', label: 'Creation Date' },
      { value: 'APIs Used', label: 'APIs Used' }
    ];
    const items = [
      {
        id: 1,
        text: "Create Project",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium.",
        link: "/community/projects/create"
      },
      {
        id: 2,
        text: "Project Ideas",
        desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu magna justo. Praesent in vestibulum lorem. Nullam vitae ligula ut lacus congue pretium.",
        link: "/community/projects/ideas"
      }
    ];
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
      }
    ];
    return (
      <div>
        <Navbar links={links} />

        <div className="section">
          <div className="row">

            <div className="col m2 left-column">
              <LeftColumn items={items}/>
            </div>

            <div className="col m10">
              <div className="row">
                  <Search options={options}/>
              </div>

              <div className="row">
                <div className="col m3">
                  <ProjectCard />
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <LoadMore text="Load More Projects..." />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state
  return {
    projects:  projects.projects
  }
}

export default connect(mapStateToProps)(Projects)
