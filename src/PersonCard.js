import React from 'react';
import { CardText } from 'material-ui/Card';

import PersonIcon from './PersonIcon';
import HoverCard from './HoverCard';

export default function PersonCard() {
  return (
    <HoverCard href="/profile/123" style={{color: 'black'}}>
      <CardText>
        <div style={{display: 'flex'}}>
          <div style={{marginRight: '15px'}}>
            <PersonIcon />
          </div>
          <div>
            <div style={{fontSize: '30px'}}>
              Person Name <span style={{color: '#777'}}>'18</span>
            </div>
            <div>
              10 projects &bull; 15 saved
            </div>
          </div>
        </div>
      </CardText>
    </HoverCard>
  );
}
