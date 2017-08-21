import React, { Component } from 'react'
import { connect } from 'react-redux'

import PersonCard from '../components/PersonCard'
import Search from '../components/Search'
import LoadMore from '../components/LoadMore'
import Navbar from '../components/Navbar'

import {
  fetchUsers
} from '../actions'

class Developers extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUsers())
  }

  render() {
    const options = [
      { value: 'A-Z', label: 'A-Z' },
      { value: 'Number of Projects', label: 'Number of Projects' },
      { value: 'Year', label: 'Year' }
    ];
    const links = [
      {
        id: 1,
        text: "Community",
        link: "/community"
      },
      {
        id: 2,
        text: "Developers",
        link: "/community/developers"
      }
    ];
    const { users } = this.props

    return (
      <div>

        <Navbar links={links} />

        <div className="container">
          <div className="section">
            <div className="row">
                <Search options={options}/>
            </div>

            <div className="row">
            {
              // Todo: add rows
              users.map(user => (
                <div key={user._id} className="col m3">
                  <PersonCard
                    id={user._id}
                    name={user.name.first + " " + user.name.last}
                    year={"'" + user.year}
                    projects={user.projects.length}
                    saved={3}
                  />
                </div>
              ))
            }
            </div>

            <div className="row">
              <div className="col s12">
                <LoadMore text="Load More Developers..." />
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state
  return {
    users:  users.users
  }
}

export default connect(mapStateToProps)(Developers)
