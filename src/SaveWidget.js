import React, { Component } from 'react';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border';

export default class SaveWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { saved: false };
    this.toggle = this.toggle.bind(this);
    this.style = { width: props.size, height: props.size };
  }

  static defaultProps = { size: 24 };

  toggle() {
    this.setState({ saved: !this.state.saved });
  }

  render() {
    return (
      <div style={{ display: 'inline-block', verticalAlign: 'middle' }} onClick={this.toggle}>
        {this.state.saved ? <StarIcon style={this.style} /> : <StarBorderIcon style={this.style} />}
      </div>
    )
  }
}
