import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  ButtonGroup,
  Badge,
  UncontrolledAlert,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import '../index.css';
import Board from './board';

const boardSize = 20;

function isCleared(arr, val) {
  return arr.every(item => {
    return item === val;
  });
}

function countElement(arr1, arr2, val) {
  let count = 1;
  arr1.forEach(element => {
    if (element === val) {
      count += 1;
    }
  });
  arr2.forEach(element => {
    if (element === val) {
      count += 1;
    }
  });
  return count;
}

function checkVertically(square, squares) {
  const rowId = Math.floor(square / boardSize);
  const colId = square - rowId * boardSize;
  const track1 = [];
  const track2 = [];
  const curSqr = squares[square];
  const temp = curSqr === 'X' ? 'O' : 'X';

  if (rowId === 0) track1.push(temp);
  let i = 0;
  for (i = rowId - 1; i >= 0; i -= 1) {
    if (squares[i * boardSize + colId] === null) {
      break;
    } else if (squares[i * boardSize + colId] === curSqr) {
      track1.push(squares[i * boardSize + colId]);
      if (track1.length === 5) {
        return curSqr;
      }
      if (i === 0) {
        track1.push(temp);
      }
    } else {
      track1.push(squares[i * boardSize + colId]);
      break;
    }
  }
  if (rowId === boardSize - 1) track2.push(temp);
  for (i = rowId + 1; i < boardSize; i += 1) {
    if (squares[i * boardSize + colId] === null) {
      break;
    } else if (squares[i * boardSize + colId] === curSqr) {
      track2.push(squares[i * boardSize + colId]);
      if (track2.length === 5) {
        return curSqr;
      }
      if (i === boardSize - 1) {
        track2.push(temp);
      }
    } else {
      track2.push(squares[i * boardSize + colId]);
      break;
    }
  }
  if (countElement(track1, track2, curSqr) >= 5) {
    if (!isCleared(track1, curSqr) && !isCleared(track2, curSqr)) {
      return null;
    }
    return curSqr;
  }
  return null;
}

function checkHorizontally(square, squares) {
  const rowId = Math.floor(square / boardSize);
  const colId = square - rowId * boardSize;
  const track1 = [];
  const track2 = [];
  const curSqr = squares[square];
  const temp = curSqr === 'X' ? 'O' : 'X';

  if (colId === 0) track1.push(temp);
  let i = 0;
  for (i = colId - 1; i >= 0; i -= 1) {
    if (squares[rowId * boardSize + i] === null) {
      break;
    } else if (squares[rowId * boardSize + i] === curSqr) {
      track1.push(squares[rowId * boardSize + i]);
      if (track1.length === 5) {
        return curSqr;
      }
      if (i === 0) {
        track1.push(temp);
      }
    } else {
      track1.push(squares[rowId * boardSize + i]);
      break;
    }
  }
  if (colId === boardSize - 1) track2.push(temp);
  for (i = colId + 1; i < boardSize; i += 1) {
    if (squares[rowId * boardSize + i] === null) {
      break;
    } else if (squares[rowId * boardSize + i] === curSqr) {
      track2.push(squares[rowId * boardSize + i]);
      if (track2.length === 5) {
        return curSqr;
      }
      if (i === boardSize - 1) {
        track2.push(temp);
      }
    } else {
      track2.push(squares[rowId * boardSize + i]);
      break;
    }
  }
  if (countElement(track1, track2, curSqr) >= 5) {
    if (!isCleared(track1, curSqr) && !isCleared(track2, curSqr)) {
      return null;
    }
    return curSqr;
  }
  return null;
}

function checkDiagonallyTopLeftBottomRight(square, squares) {
  const rowId = Math.floor(square / boardSize);
  const colId = square - rowId * boardSize;
  const track1 = [];
  const track2 = [];
  const curSqr = squares[square];
  const temp = curSqr === 'X' ? 'O' : 'X';
  let i = 0;
  let j = 0;
  if (rowId === 0 || colId === 0) track1.push(temp);
  for (i = rowId - 1, j = colId - 1; i >= 0 || j >= 0; i -= 1, j -= 1) {
    if (squares[i * boardSize + j] === null) {
      break;
    } else if (squares[i * boardSize + j] === curSqr) {
      track1.push(squares[i * boardSize + j]);
      if (track1.length === 5) {
        return curSqr;
      }
      if (i === 0 || j === 0) {
        track1.push(temp);
      }
    } else {
      track1.push(squares[i * boardSize + j]);
      break;
    }
  }
  if (rowId === boardSize - 1 || colId === boardSize - 1) track2.push(temp);
  for (
    i = rowId + 1, j = colId + 1;
    i < boardSize || j < boardSize;
    i += 1, j += 1
  ) {
    if (squares[i * boardSize + j] === null) {
      break;
    } else if (squares[i * boardSize + j] === curSqr) {
      track2.push(squares[i * boardSize + j]);
      if (track2.length === 5) {
        return curSqr;
      }
      if (i === boardSize - 1 || j === boardSize - 1) {
        track2.push(temp);
      }
    } else {
      track2.push(squares[i * boardSize + j]);
      break;
    }
  }
  if (countElement(track1, track2, curSqr) >= 5) {
    if (!isCleared(track1, curSqr) && !isCleared(track2, curSqr)) {
      return null;
    }
    return curSqr;
  }
  return null;
}

function checkDiagonallyTopRightBottomLeft(square, squares) {
  const rowId = Math.floor(square / boardSize);
  const colId = square - rowId * boardSize;
  const track1 = [];
  const track2 = [];
  const curSqr = squares[square];
  const temp = curSqr === 'X' ? 'O' : 'X';

  if (rowId === 0 || colId === boardSize - 1) track1.push(temp);
  let i = 0;
  let j = 0;
  for (i = rowId - 1, j = colId + 1; i >= 0 || j < boardSize; i -= 1, j += 1) {
    if (squares[i * boardSize + j] === null) {
      break;
    } else if (squares[i * boardSize + j] === curSqr) {
      track1.push(squares[i * boardSize + j]);
      if (track1.length === 5) {
        return curSqr;
      }
      if (i === 0 || j === boardSize - 1) {
        track1.push(temp);
      }
    } else {
      track1.push(squares[i * boardSize + j]);
      break;
    }
  }
  if (rowId === boardSize - 1 || colId === 0) track2.push(temp);
  for (i = rowId + 1, j = colId - 1; i < boardSize || j >= 0; i += 1, j -= 1) {
    if (squares[i * boardSize + j] === null) {
      break;
    } else if (squares[i * boardSize + j] === curSqr) {
      track2.push(squares[i * boardSize + j]);
      if (track2.length === 5) {
        return curSqr;
      }
      if (i === boardSize - 1 || j === 0) {
        track2.push(temp);
      }
    } else {
      track2.push(squares[i * boardSize + j]);
      break;
    }
  }
  if (countElement(track1, track2, curSqr) >= 5) {
    if (!isCleared(track1, curSqr) && !isCleared(track2, curSqr)) {
      return null;
    }
    return curSqr;
  }
  return null;
}

export function gameWon(square, squares) {
  const vertically = checkVertically(square, squares);
  const horizontally = checkHorizontally(square, squares);
  const diagonallyTopLeftBottomRight = checkDiagonallyTopLeftBottomRight(
    square,
    squares
  );
  const diagonallyTopRightBottomLeft = checkDiagonallyTopRightBottomLeft(
    square,
    squares
  );

  if (vertically) {
    return vertically;
  }
  if (horizontally) {
    return horizontally;
  }
  if (diagonallyTopLeftBottomRight) {
    return diagonallyTopLeftBottomRight;
  }
  if (diagonallyTopRightBottomLeft) {
    return diagonallyTopRightBottomLeft;
  }
  return null;
}

class Game extends React.Component {
  componentWillUpdate(clicked) {
    console.log("                   ", clicked);
    var max = boardSize * boardSize - 1;
    var min = 0;
    const history = clicked.history;
    const current = history[clicked.stepNum];
    if (clicked.isXNext === false) {
      var random = Math.floor(Math.random() * (max - min + 1)) + min;
      while (current.squares[random] !== null) {
        random = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      this.props.onSqrClick(random);
    }
  }
  render() {
    // console.log(JSON.parse(localStorage.getItem('user')).user.email);
    if (localStorage.getItem('user') === null) {
      window.location.replace('/user/login');
    }
    const { history } = this.props;
    const current = history[this.props.stepNum];
    const winner = gameWon(current.latestMoveSqr, current.squares);
    const { isAsc } = this.props;
    const { isXNext } = this.props;
    const moves = history.map((step, move) => {
      const row = Math.floor(step.latestMoveSqr / boardSize);
      const col = step.latestMoveSqr - row;
      const desc = move
        ? `Go to move #${move} (${row}, ${col})`
        : 'Go to game start';
      return (
        <Button
          key={move}
          class="btn btn-primary btn-lg btn-block"
          className={
            move === this.props.stepNum ? 'move-list-item-selected' : ''
          }
          onClick={() => {
            this.props.goTo(move);
          }}
          outline
          color="primary"
        >
          {desc}
        </Button>
      );
    });

    const restartBtn = (
      <Button color="primary" onClick={() => this.props.restart()}>
        Restart game
      </Button>
    );

    if (!isAsc) {
      moves.reverse();
    }

    let status;
    let statusAlert;

    if (current.squares.includes(null)) {
      if (winner) {
        status = (
          <Badge className="status-badge" color="primary">
            Winner: {winner === 'X' ? JSON.parse(localStorage.getItem('user')).user.username : 'BOT'}
          </Badge>
        );
        statusAlert = (
          <UncontrolledAlert color="success">
            The winner is {winner === 'X' ? JSON.parse(localStorage.getItem('user')).user.username : 'BOT'}!
          </UncontrolledAlert>
        );
      } else {
        status = (
          <Badge className="status-badge" color="primary">
            {/* Next player: {this.props.isXNext ? 'X' : 'O'} */}
            Next player: {this.props.isXNext ? JSON.parse(localStorage.getItem('user')).user.username : 'BOT'}

          </Badge>
        );
      }
    } else {
      status = (
        <Badge className="status-badge" color="primary">
          Game draw!
        </Badge>
      );
      statusAlert = (
        <UncontrolledAlert color="danger">
          Out of moves, please restart!
        </UncontrolledAlert>
      );
    }

    return (
      <div class="container">
        <div class="nav-border">
          <Nav pills >
            <NavItem>
              <NavLink href="/game" active>Hello <b>{JSON.parse(localStorage.getItem('user')).user.username}</b>, welcome to Tic-tac-toe!</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user/me">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user/register">Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user/login">Logout</NavLink>
            </NavItem>
          </Nav>
        </div>
        <br />
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onSqrClick={i => this.props.onSqrClick(i)}
            />
          </div>
          <div className="game-info">
            <div>
              <div class="vertical-list">{status}</div>
              <div class="vertical-list">{statusAlert}</div>
              <div class="vertical-list"> {restartBtn}</div>
              <div class="vertical-list">
                <Button color="success" onClick={() => this.props.sort()}>
                  Sort {isAsc ? 'descending' : 'ascending'}
                </Button>
              </div>
            </div>
            <div class="scroll">
              <table class="table">
                <tr>
                  <td>{moves}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
