import React, { Component } from 'react';

export class Square extends Component {
  render() {
    const { className, index } = this.props;
    return <div className={className === 'first' ? 'square first' : 'square'}>{index}</div>;
  }
}

export default Square;
