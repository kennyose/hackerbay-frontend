import React, {Component} from 'react';
import './App.css';

let items = [];
const UP = 38;
const DOWN = 40;
const LEFT = 37;
const RIGHT = 39;

/**
 * This class function assigns id to cell and controls a state to determine if cell is selected or not
 * @prop  {} id
 */
class Cell extends Component {
  constructor() {
    super();
    this.state = {
      selected: false
    };
  }
  render() {
    return <div
      className={this.state.selected
      ? 'cell active'
      : 'cell'}
      id={this.props.id}/>;
  }
}

/**
 * This Function checks cells with active className,
 */
function checkFinish(noOfMoves) {
  let check = document.getElementsByClassName('active');
  if (check.length === 0) {
    let gameComplete = window.confirm('You saved princess in moves: ' + noOfMoves);
    if (gameComplete === true) {
      window
        .location
        .reload();
    }
  }
}

/**
 * This class function assigns id to cell and controls a state to determine if cell is selected or not
 * @prop {Number} id
 */
class Square extends Component {
  constructor(props) {
    super(props);
    let c = [];
    for (let i = 1; i <= this.props.matrix; i++) {
      c.push(<Cell key={i} id={i}/>);
      items.push(i);
    }

    this.state = {
      cells: c
    };
  }

  componentWillMount = () => {
    this
      .props
      .handlePush(items)
  }

  render() {
    return <div>{this.state.cells}</div>;
  }
}

function shuffleArray(array = []) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function movement(event, noOfMoves, marioJump) {
  let mario = document.getElementsByClassName('mario');
  let marioId = mario[0].id;
  let move;

  if (event.keyCode === LEFT) {
    move = document.getElementById(marioId - 1);
    if (move != null) {
      if (move.classList.contains('active')) {
        move
          .classList
          .toggle('active');
      }
      move.innerHTML = document
        .getElementById(marioId)
        .innerHTML;
      document
        .getElementById(marioId)
        .innerHTML = '';
      document
        .getElementById(marioId)
        .classList
        .toggle('mario');
      move
        .classList
        .toggle('mario');
      marioId = marioId - 1;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }

  if (event.keyCode === RIGHT) {
    let moveRight = parseInt(marioId, 10) + 1;
    move = document.getElementById(moveRight);
    if (move != null) {
      if (move.classList.contains('active')) {
        move
          .classList
          .toggle('active');
      }
      move.innerHTML = document
        .getElementById(marioId)
        .innerHTML;

      document
        .getElementById(marioId)
        .innerHTML = '';
      document
        .getElementById(marioId)
        .classList
        .toggle('mario');
      move
        .classList
        .toggle('mario');
      marioId = marioId + 1;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }

  if (event.keyCode === UP) {
    let moveUp = parseInt(marioId, 10) - parseInt(marioJump, 10);
    move = document.getElementById(moveUp);
    if (move != null) {
      if (move.classList.contains('active')) {
        move
          .classList
          .toggle('active');
      }
      move.innerHTML = document
        .getElementById(marioId)
        .innerHTML;
      document
        .getElementById(marioId)
        .innerHTML = '';
      document
        .getElementById(marioId)
        .classList
        .toggle('mario');
      move
        .classList
        .toggle('mario');
      marioId = marioId - marioJump;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }

  if (event.keyCode === DOWN) {
    let moveUp = parseInt(marioId, 10) + parseInt(marioJump, 10);
    move = document.getElementById(moveUp);
    if (move != null) {
      if (move.classList.contains('active')) {
        move
          .classList
          .toggle('active');
      }
      move.innerHTML = document
        .getElementById(marioId)
        .innerHTML;
      document
        .getElementById(marioId)
        .innerHTML = '';
      document
        .getElementById(marioId)
        .classList
        .toggle('mario');
      move
        .classList
        .toggle('mario');
      marioId = marioId + marioJump;
    } else {
      noOfMoves = noOfMoves - 1;
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixSize: 100,
      width: 10,
      height: 10,
      noOfMoves: 0,
      marioJump: 0,
      items: []
    };
  }

  componentWillMount() {
    let width = prompt('Enter width of game: ', 'e.g. 10,20,30');
    let height = prompt('Enter height of  game: ', 'e.g. 10,20,30');
    let matrixSize;

    if (height == null || width == null || isNaN(width) === true || isNaN(height) === true) {
      console.log('nothing supplied to prompt')
      this.setState({width: 10, height: 10, matrixSize: 100, marioJump: 10});
    } else {
      matrixSize = height * width;
      this.setState({width, height, matrixSize, marioJump: width});
    }

    document.addEventListener('keydown', this.onKeyPress);
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad(this.state.width, this.state.height));
  }

  handlePush = i => {
    console.log('me')
    this.setState({
      items: [
        ...this.state.items,
        ...i
      ]
    })
  }

  handleLoad = (width, height) => {
    let matrix = document.getElementById('root');
    matrix.style.height = 40 * height + 'px';
    matrix.style.width = 40 * width + 'px';
    let shuffledData = shuffleArray(items); // CHANGE
    let truncatedData = shuffledData.slice(0, parseInt(this.state.matrixSize / 3, 10));

    for (let i = 0; i < truncatedData.length; i++) {
      let elemPosition = document.getElementById(truncatedData[i]);
      elemPosition.innerHTML = "<img src='mushroom.png' alt='mario' class='maze-image'/>";
      elemPosition
        .classList
        .toggle('active');
    }

    // Pass an array item is it is not a member of truncatedData array
    let uniqueData = shuffledData.filter(function (obj) {
      return truncatedData.indexOf(obj) === -1;
    });

    // randomly select a member from uniqueData array
    let item = uniqueData[Math.floor(Math.random() * uniqueData.length)];
    let marioPosition = document.getElementById(item);
    console.log(items)
    marioPosition
      .classList
      .toggle('mario');
    marioPosition.innerHTML = "<img src='mario.png' alt='mario' class='maze-image'/>";
  }

  onKeyPress = (event) => {
    if (event.keyCode === LEFT || event.keyCode === UP || event.keyCode === RIGHT || event.keyCode === DOWN) {
      if (this.state.noOfMoves === undefined) {
        this.setState({noOfMoves: 0})
      }
      this.setState({
        noOfMoves: this.state.noOfMoves + 1
      })
    }

    movement(event, this.state.noOfMoves, this.state.marioJump);
    checkFinish(this.state.noOfMoves);
  }

  render() {
    return (
      <div className="App">
        <Square matrix={this.state.matrixSize} handlePush={(i) => this.handlePush(i)}/>
      </div>
    );
  }
}

export default App;
