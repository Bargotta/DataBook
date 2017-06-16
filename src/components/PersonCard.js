import React from 'react';

import { bindActionCreators } from 'redux';
import { CardText } from 'material-ui/Card';
import { connect } from 'react-redux';


import HoverCard from './HoverCard';
import PersonIcon from './PersonIcon';
import { selectUser } from '../actions/index'

function PersonCard(props) {
  return (
    <HoverCard href="/profile/123" style={{color: 'black'}}>
      <CardText onClick={() => props.selectUser(props.user)}>
        <div style={{display: 'flex'}}>
          <div style={{marginRight: '15px'}}>
            <PersonIcon />
          </div>
          <div>
            <div style={{fontSize: '30px'}}>
              {props.user.first} <span style={{color: '#777'}}>{props.user.year}</span>
            </div>
            <div>
              {props.user.projects} projects &bull; {props.user.saved} saved
            </div>
          </div>
        </div>
      </CardText>
    </HoverCard>
  );
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    selectUser: selectUser
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(PersonCard);