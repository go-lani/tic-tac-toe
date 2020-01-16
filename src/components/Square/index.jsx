import React, { Component } from "react";

export class Square extends Component {
  render() {
    const {
      square,
      className,
      squareIndex,
      isLastPlayer,
      addHistory
    } = this.props;
    return (
      <div
        className={className === "first" ? "square first" : "square"}
        onClick={() => addHistory(isLastPlayer, squareIndex)}
      >
        {square}
      </div>
    );
  }
}

export default Square;
