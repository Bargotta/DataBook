import React from 'react';
import { CardText } from 'material-ui/Card';
import HoverCard from './HoverCard';

export default function LeftColumn(props) {
    return (
      <div>
        {
          props.links.map(link => (
            <HoverCard
              key={link}
              href="/community/developers"
              style={{color: 'black'}}
            >
              <CardText>
                <h5>{link}</h5>
              </CardText>
            </HoverCard>
          ))
        }
      </div>
    )
}
