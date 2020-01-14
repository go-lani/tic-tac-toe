import React, { Component } from 'react';

export class Board extends Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <div className="board">{children}</div>
      </>
    );
  }
}

export default Board;
