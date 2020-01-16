import React, { Component } from "react";

export class Square extends Component {
  render() {
    const { square, firstItem, squareIndex, onAddHistory } = this.props;
    return (
      <div
        className={firstItem ? "square first" : "square"}
        onClick={() => onAddHistory(squareIndex)}
      >
        {square}
      </div>
    );
  }
}

export default Square;
