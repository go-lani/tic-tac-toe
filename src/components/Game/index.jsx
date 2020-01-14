import React, { Component } from 'react';
import Board from '../Board';
import Square from '../Square';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isLastPlayer: false,
    };
  }
  render() {
    const { squares, isLastPlayer } = this.state;
    return (
      <div className="game">
        <Board squares={squares}>
          {squares.map((square, index) => (
            <Square key={index} index={index} className={index % 3 ? null : 'first'} />
          ))}
        </Board>
        <div class="game-info">
          <div className="status">Next Player {isLastPlayer ? 'X' : 'O'}</div>
        </div>
      </div>
    );
  }
}

export default Game;
