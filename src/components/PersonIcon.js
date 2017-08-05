import React from 'react';

export default function PersonIcon({ size = 50 }) {
  return (
    <div style={{display: 'inline-block', borderRadius: '50%', width: `${size}px`, height: `${size}px`, backgroundColor: 'white', textAlign: 'center'}} className="z-depth-2">
      <i className="material-icons" style={{fontSize: `${size*0.8}px`, lineHeight: `${size}px`}}>perm_identity</i>
    </div>
  );
}
