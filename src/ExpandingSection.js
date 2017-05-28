import React, { Component } from 'react';
import $ from 'jquery';
import RaisedButton from 'material-ui/RaisedButton';

export default class ExpandingSection extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.expand = this.expand.bind(this);
  }

  expand() {
    const targetHeight = this.container.scrollHeight;
    $(this.container).animate({ height: targetHeight }, 500);
    this.setState({ expanded: true });
  }

  render() {
    return (
      <div>
        <div ref={e => this.container = e} style={{ height: 200, overflow: 'hidden' }}>
          {this.props.children}
        </div>
        {!this.state.expanded && <div style={{ textAlign: 'center', borderTop: '1px solid #ddd', marginTop: 10, paddingTop: 10 }}>
          <RaisedButton label="Show All" onClick={this.expand} />
        </div>}
      </div>
    );
  }
}
