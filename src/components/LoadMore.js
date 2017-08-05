import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default function LoadMore(props) {
  return (
    <div className="load-more-button-div">
      <RaisedButton
        label={props.text}
        primary={true}
        fullWidth={true}
      />
    </div>
  )
}
