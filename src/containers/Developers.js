import React, { Component } from 'react'
import { connect } from 'react-redux'

import PersonCard from '../components/PersonCard';
import Search from '../components/Search';
import LoadMore from '../components/LoadMore';
import Navbar from '../components/Navbar';

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
          <div className="section row">

            <div className="col m12">
              <Search options={options}/>

              {
                users.map((user, index) => (
                  if (index % 4 === 0) {
                    <div className="section row">
                  }
                  <div key={user.id} className="col m3">
                    <PersonCard name={user.first + " " + user.last} year={user.year} projects={10} saved={3}/>
                  </div>
                  if (index % 4 === 0) {
                    </div>
                  }
                ))
              }

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
  return {
    users:  state.allUsers.users
  }
}

export default connect(mapStateToProps)(Developers)
