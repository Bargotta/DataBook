import React from 'react';
import { CardText } from 'material-ui/Card';

import PersonIcon from './PersonIcon';
import HoverCard from './HoverCard';

export default function PersonCard(props) {
  return (
    <HoverCard href="/profile/123" style={{color: 'black'}}>
      <CardText>
        <div style={{display: 'flex'}}>
          <div style={{marginRight: '15px'}}>
            <PersonIcon />
          </div>
          <div>
            <div style={{fontSize: '30px'}}>
              {props.name} <span style={{color: '#777'}}>{props.year}</span>
            </div>
            <div>
              {props.projects} projects &bull; {props.saved} saved
            </div>
          </div>
        </div>
      </CardText>
    </HoverCard>
  );
}
