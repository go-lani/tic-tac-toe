import React, { Component } from "react";

export class Square extends Component {
  render() {
    const { square, className, index, isLastPlayer, addHistory } = this.props;
    return (
      <div
        className={className === "first" ? "square first" : "square"}
        onClick={() => addHistory(isLastPlayer, index)}
      >
        {square}
      </div>
    );
  }
}

export default Square;
