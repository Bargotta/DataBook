import React, { Component } from 'react';
import { Link } from 'react-router';
import Card from 'material-ui/Card';

export default class HoverCard extends Component {
  constructor(props) {
    super(props);
    this.state = { zDepth: 1 };
  }

  onMouseOver = () => this.setState({ zDepth: 2 });
  onMouseOut = () => this.setState({ zDepth: 1 });

  render() {
    return (
      <Link to={this.props.href}>
        <Card
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          zDepth={this.state.zDepth}
          style={this.props.cardStyle}
        >
          {this.props.children}
        </Card>
      </Link>
    );
  }
}
