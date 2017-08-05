import React from 'react';
import { CardText } from 'material-ui/Card';

import HoverCard from './HoverCard';

export default function EventCard(props) {
  return (
    <div className="col s12">
      <HoverCard
        href={props.href}
        cardStyle={{
          margin: '0.5rem 0 1rem',
          backgroundColor: 'rgba(214, 214, 214, 0.30)',
          textAlign: 'center'
        }}      >
        <CardText>
          <div>
            <h4>{props.children}</h4>
          </div>
        </CardText>
      </HoverCard>
      <div>
        <p>{props.desc}</p>
      </div>
    </div>
  );
}
