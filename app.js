console.log('yo');

// Tic Tac Toe Universe
var human = {
  name: 'human',
  points: 0,
  wins: 0
};

var computer = {
  name: 'computer',
  points: 0,
  wins: 0
};

var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

var boardMapping = {
  'one': 'board[0][0]',
  'two': 'board[0][1]',
  'three': 'board[0][2]',
  'four': 'board[1][0]',
  'five': 'board[1][1]',
  'six': 'board[1][2]',
  'seven': 'board[2][0]',
  'eight': 'board[2][1]',
  'nine': 'board[2][2]'
};

// var gameOver = false;

// Functions
function startGame() {
  // Welcome message or something
  // Disable start button
  // Reset board
  $('#five').addClass('selected').text('X').unbind('click');
  board[1][1] = computer.name;
};

function makeHumanMove(x, y, element) {
  if (board[x][y] === null) {
    $(element).addClass('selected').text('O');
    board[x][y] = human.name;
    didHumanWin();
  }
};

function makeCompMove(x, y) {
  for (var key in boardMapping) {
    if (boardMapping[key] === 'board[' + x + '][' + y + ']') {
      var element = '#' + key;
      $(element).addClass('selected').text('X');
    }
  }
};

// function makeCornerMove() {
//   var corners = {
//     one: 'board[0][0]', 
//     three: 'board[0][2]', 
//     seven: 'board[2][0]', 
//     nine: 'board[2][2]' 
//   };
// };

// Before blocking & making a move, checks to see if player has won (checking 3 moves).
function didHumanWin() {
  if ((board[0][0] === 'human' && board[0][0] === board[0][1] && board[0][0] === board[0][2]) || 
   (board[1][0] === 'human' && board[1][0] === board[1][1] && board[1][0] === board[1][2]) ||
   (board[2][0] === 'human' && board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
   (board[0][0] === 'human' && board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
   (board[0][1] === 'human' && board[0][1] === board[1][1] && board[0][1] === board[2][1]) ||
   (board[0][2] === 'human' && board[0][2] === board[1][2] && board[0][2] === board[2][2]) ||
   (board[0][0] === 'human' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
   (board[2][0] === 'human' && board[2][0] === board[1][1] && board[2][0] === board[0][2])) {
    updateScore();
  } else {
    if ($('.selected').length === 2) {
      makeCornerMove();
    } else if ($('.selected').length === 6) {
      checkRemainingMoves();
    } else {
      blockMove();
    }
  }
};

// Before making a move, checks to see if player is about to win and BLOCK THE HUMAN (checking 2 moves).
function blockMove() {
  // Checking through horizontal & vertical possibilities
  for (var i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === 'human') {
      board[i][2] = computer.name;
      makeCompMove(i, 2);
    } else if (board[i][0] === board[i][2] && board[i][0] === 'human') {
      board[i][1] = computer.name;
      makeCompMove(i, 1);
    } else if (board[i][1] === board[i][2] && board[i][1] === 'human') {
      board[i][0] = computer.name;
      makeCompMove(i, 0);
    } else if (board[0][i] === board[1][i] && board[0][i] === 'human') {
      board[2][i] = computer.name;
      makeCompMove(2, i);
    } else if (board[0][i] === board[2][i] && board[0][i] === 'human') {
      board[1][i] = computer.name;
      makeCompMove(1, i);
    } else if (board[1][i] === board[2][i] && board[1][i] === 'human') {
      board[0][i] = computer.name;
      makeCompMove(0, i);
    } 
  };
  // Checking through diagonal possibilities
  if (board[0][0] === board[1][1] && board[0][0] === 'human') {
    board[2][2] = computer.name;
    makeCompMove(2, 2);
  } else if (board[0][0] === board[2][2] && board[0][0] === 'human') {
    board[1][1] = computer.name;
    makeCompMove(1, 1);
  } else if (board[1][1] === board[2][2] && board[1][1] === 'human') {
    board[0][0] = computer.name;
    makeCompMove(0, 0);
  } else if (board[0][2] === board[1][1] && board[0][2] === 'human') {
    board[2][0] = computer.name;
    makeCompMove(2, 0);
  } else if (board[0][2] === board[2][0] && board[0][2] === 'human') {
    board[1][1] = computer.name;
    makeCompMove(1, 1);
  } else if (board[1][1] === board[2][0] && board[1][1] === 'human') {
    board[0][2] = computer.name;
    makeCompMove(0, 2);
  }
};

function makeCornerMove() { 
  if (board[0][0] === null) {
    $('#one').addClass('selected').text('X');
    board[0][0] = computer.name;
  } else if (board[0][2] === null) {
    $('#three').addClass('selected').text('X');
    board[0][2] = computer.name;
  } else if (board[2][0] === null) {
    $('#seven').addClass('selected').text('X');
    board[2][0] = computer.name; 
  } else if (board[2][2] === null) {
    $('#nine').addClass('selected').text('X');
    board[2][2] = computer.name;
  }
};

function checkRemainingMoves() {
  var array = [];
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    for (var j = 0; j < row.length; j++) {
      if (board[i][j] === null) {
        console.log(i, j);
      }
    }
  }
}

// function updateScore()

// function determineRoundWinner()

// function determineOverallWinner()
// Calculate after each round and see if 5 wins by player or computer

// function resetBoard()

$(function() {
  $('#start-button').on('click', function() {
    startGame();
  });

  

  var $one = $('#one');
  $one.on('click', function() {
    makeHumanMove(0, 0, one);
  });

  var $two = $('#two');
  $two.on('click', function() {
    makeHumanMove(0, 1, two);
  });

  var $three = $('#three');
  $three.on('click', function() {
    makeHumanMove(0, 2, three);
  });

  var $four = $('#four');
  $four.on('click', function() {
    makeHumanMove(1, 0, four);
  });

  var $five = $('#five');
  $five.on('click', function() {
    makeHumanMove(1, 1, five);
  });

  var $six = $('#six');
  $six.on('click', function() {
    makeHumanMove(1, 2, six);
  });

  var $seven = $('#seven');
  $seven.on('click', function() {
    makeHumanMove(2, 0, seven);
  });

  var $eight = $('#eight');
  $eight.on('click', function() {
    makeHumanMove(2, 1, eight);
  });

  var $nine = $('#nine');
  $nine.on('click', function() {
    makeHumanMove(2, 2, nine);
  });

});