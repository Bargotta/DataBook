import React from 'react';
import { CardText } from 'material-ui/Card';
import HoverCard from './HoverCard';

export default function LeftColumn(props) {
    return (
      <div>
        {
          props.items.map(item => (
            <div key={item.id}>
              <HoverCard
                href={item.link}
                style={{color: 'black'}}
              >
                <CardText>
                  <h5>{item.text}</h5>
                </CardText>
              </HoverCard>
              <p>{item.desc}</p>
            </div>
          ))
        }
      </div>
    )
}
