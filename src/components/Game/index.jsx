import React, { Component } from "react";
import Board from "../Board";
import Square from "../Square";

export class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      step: 0,
      histories: [
        {
          step: null,
          history: Array(9).fill(null)
        }
      ],
      isLastPlayer: true
    };

    Object.getOwnPropertyNames(Game.prototype).forEach(
      key => (this[key] = this[key].bind(this))
    );
  }

  addHistory(squareIndex) {
    const { squares, step, histories, isLastPlayer } = this.state;
    if (squares[squareIndex]) return;

    const newSquares = squares.slice();
    newSquares[squareIndex] = isLastPlayer ? "X" : "O";

    const prevStep = Math.max(...histories.map(history => history.step)) + 1;

    const newHistory =
      prevStep > step
        ? histories.filter((history, index) => index <= step)
        : histories.filter(history => history.step < step + 1);

    this.setState({
      squares: newSquares,
      step: step + 1,
      histories: [...newHistory, { step: step, history: newSquares }],
      isLastPlayer: !isLastPlayer
    });
  }

  jumpTo(index) {
    const { histories } = this.state;

    const { history: prevSquares } = histories.filter((history, idx) =>
      idx <= index ? history : false
    )[index];

    this.setState({
      squares: [...prevSquares],
      step: index,
      isLastPlayer: index % 2 === 0
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return `Winner is ${squares[a]}`;
      }
    }

    return `Next Player ${this.state.isLastPlayer ? "X" : "O"}`;
  }

  render() {
    const { squares, histories } = this.state;

    const historyRender = histories.map((history, index) => {
      const guide = index ? "Go to move #" + index : "Go to game start";
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{guide}</button>
        </li>
      );
    });

    const squaresRender = squares.map((square, index) => (
      <Square
        key={index}
        square={square}
        squareIndex={index}
        firstItem={index % 3 ? false : true}
        onAddHistory={this.addHistory}
      />
    ));

    return (
      <div className="game">
        <Board squares={squares}>{squaresRender}</Board>
        <div className="game-info">
          <div className="status">{this.calculateWinner(squares)}</div>
          <ol>{historyRender}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
