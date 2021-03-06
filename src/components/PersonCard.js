import React from 'react';
import { CardText } from 'material-ui/Card';

import HoverCard from './HoverCard';

export default function PersonCard(props) {
  return (
    <HoverCard
      href={"/community/developers/" + props.id}
      style={{color: 'black'}}
      cardStyle={{
        margin: '0.5rem 0 1rem',
        backgroundColor: 'rgba(214, 214, 214, 0.30)'
      }}
    >
      <CardText>
        <div style={{display: 'flex'}}>
          <div>
            <div style={{fontSize: '20px'}}>
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
