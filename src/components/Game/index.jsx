import React, { Component } from 'react';
import Board from '../Board';
import Square from '../Square';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isLastPlayer: false,
      xPlayer: [],
      oPlayer: [],
      histories: [],
      count: 0,
      flag: false,
    };
    Object.getOwnPropertyNames(Game.prototype).forEach(key => (this[key] = this[key].bind(this)));
  }

  addHistory(player, index) {
    const { squares, oPlayer, xPlayer, count, histories, isLastPlayer, flag } = this.state;

    if (squares[index]) return;

    // if (flag) {
    //   console.log(histories);
    //   const refreshHistory = histories.filter((history, idx) => (idx <= index ? history : false));

    //   const { history: refreshSquares } = histories.filter((history, idx) =>
    //     idx <= index ? history : false,
    //   )[index];

    //   this.setState({
    //     squares: refreshSquares.map((square, idx) =>
    //       idx === index ? 'X' : square === 'X' ? 'X' : square === 'O' ? 'O' : null,
    //     ),
    //     oPlayer: [...oPlayer, index],
    //     count: count + 1,
    //     histories: [...refreshHistory, { count: count, index, history: squares }],
    //     isLastPlayer: !isLastPlayer,
    //   });
    // }

    if (player) {
      this.setState(
        {
          squares: squares.map((square, idx) =>
            idx === index ? 'X' : square === 'X' ? 'X' : square === 'O' ? 'O' : null,
          ),
          oPlayer: [...oPlayer, index],
          count: count + 1,
          histories: [...histories, { count: count, index, history: squares }],
          isLastPlayer: !isLastPlayer,
        },
        () => {
          console.log(this.state);
        },
      );
    } else {
      this.setState(
        {
          squares: squares.map((square, idx) =>
            idx === index ? 'O' : square === 'O' ? 'O' : square === 'X' ? 'X' : null,
          ),
          xPlayer: [...xPlayer, index],
          count: count + 1,
          histories: [...histories, { count: count, index, history: squares }],
          isLastPlayer: !isLastPlayer,
        },
        () => {
          console.log(this.state);
        },
      );
    }
  }

  jumpTo(index) {
    const { squares, oPlayer, xPlayer, count, histories, isLastPlayer } = this.state;
    const refreshHistory = histories.filter((history, idx) => (idx <= index ? history : false));

    // const currentCount = Math.max(...histories.map(history => history.count)) + 1;

    // console.log(currentCount, count);
    const { history: refreshSquares } = histories.filter((history, idx) =>
      idx <= index ? history : false,
    )[index];

    this.setState(
      {
        squares: [...refreshSquares],
        count: index,
        flag: true,
      },
      () => {
        console.log(this.state);
      },
    );
  }

  render() {
    const { squares, isLastPlayer, histories } = this.state;
    return (
      <div className="game">
        <Board squares={squares}>
          {squares.map((square, index) => (
            <Square
              square={square}
              key={index}
              index={index}
              className={index % 3 ? null : 'first'}
              isLastPlayer={isLastPlayer}
              addHistory={this.addHistory}
            />
          ))}
        </Board>
        <div className="game-info">
          <div className="status">Next Player {isLastPlayer ? 'X' : 'O'}</div>
          <ol>
            {histories.map((history, index) => (
              <li key={index}>
                <button onClick={() => this.jumpTo(index)}>
                  Go to Game {history.count ? history.count : 'start'}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
