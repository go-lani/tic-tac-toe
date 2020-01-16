import React, { Component } from 'react';
import Board from '../Board';
import Square from '../Square';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      histories: [
        {
          count: null,
          index: null,
          history: Array(9).fill(null),
        },
      ],
      isLastPlayer: true,
    };
    Object.getOwnPropertyNames(Game.prototype).forEach(key => (this[key] = this[key].bind(this)));
  }

  addHistory(player, index) {
    const { squares, count, histories, isLastPlayer } = this.state;
    if (squares[index]) return;

    const newSquares = squares.slice();
    newSquares[index] = isLastPlayer ? 'X' : 'O';

    const newCount = squares.slice(0, count + 1).length;
    const prevCount = Math.max(...histories.map((history, index) => history.count)) + 1;
    const newHistory =
      prevCount > count
        ? histories.filter((history, index) => index <= count)
        : histories.filter((history, index) => history.count < count + 1);

    this.setState({
      squares: newSquares,
      count: newCount,
      histories: [...newHistory, { count: count, index, history: newSquares }],
      isLastPlayer: !isLastPlayer,
    });
  }

  jumpTo(index) {
    const { histories, count } = this.state;

    const { history: refreshSquares } = histories.filter((history, idx) =>
      idx <= index ? history : false,
    )[index];

    this.setState({
      squares: [...refreshSquares],
      count: index,
      isLastPlayer: index % 2 === 0,
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
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return `Winner is ${squares[a]}`;
      }
    }
    return `Next Player ${this.state.isLastPlayer ? 'X' : 'O'}`;
  }

  render() {
    const { squares, isLastPlayer, histories } = this.state;

    const historyList = histories.map((history, index) => {
      const guide = index ? 'Go to move #' + index : 'Go to game start';
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{guide}</button>
        </li>
      );
    });

    const squaresList = squares.map((square, index) => (
      <Square
        square={square}
        key={index}
        index={index}
        className={index % 3 ? null : 'first'}
        isLastPlayer={isLastPlayer}
        addHistory={this.addHistory}
      />
    ));

    return (
      <div className="game">
        <Board squares={squares}>{squaresList}</Board>
        <div className="game-info">
          <div className="status">{this.calculateWinner(squares)}</div>
          <ol>{historyList}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
