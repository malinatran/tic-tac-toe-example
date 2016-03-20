// The Universe
var human = {
  name: 'human'
};

var computer = {
  name: 'computer'
};

var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// Functions
function startGame() {
  // Computer goes first and always selects center
  makeCompMove(1, 1);
  $('.square').on('click', function() {
    var coordinates = $(this).data('grid-id').split('-');
    var x = coordinates[0];
    var y = coordinates[1];
    makeHumanMove(x, y);
  });
}

function getSquare(x, y) {
  // Identifies selected square based on data attribute
  var filter = '[data-grid-id="' + x + '-' + y + '"]';
  return $('.square' + filter);
}

function makeHumanMove(x, y) {
  if (board[x][y] === null) {
    var $square = getSquare(x, y);
    $square.addClass('selected').text('O');
    board[x][y] = human.name;
    determineMove();
    checkForWinner();
  }
}

function makeCompMove(x, y) {
  var $square = getSquare(x, y);
  $square.addClass('selected').text('X');
  board[x][y] = computer.name;

  var selectedNum = $('.selected').length;
  if (selectedNum === 9) {
    announceWinner();
  } 
}

function checkForWinner() {
  if ((board[0][0] === 'human' && board[0][0] === board[0][1] && board[0][0] === board[0][2]) || 
      (board[1][0] === 'human' && board[1][0] === board[1][1] && board[1][0] === board[1][2]) ||
      (board[2][0] === 'human' && board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
      (board[0][0] === 'human' && board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
      (board[0][1] === 'human' && board[0][1] === board[1][1] && board[0][1] === board[2][1]) ||
      (board[0][2] === 'human' && board[0][2] === board[1][2] && board[0][2] === board[2][2]) ||
      (board[0][0] === 'human' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
      (board[2][0] === 'human' && board[2][0] === board[1][1] && board[2][0] === board[0][2])) {
    announceWinner('human');
  } else if
      ((board[0][0] === 'computer' && board[0][0] === board[0][1] && board[0][0] === board[0][2]) || 
      (board[1][0] === 'computer' && board[1][0] === board[1][1] && board[1][0] === board[1][2]) ||
      (board[2][0] === 'computer' && board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
      (board[0][0] === 'computer' && board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
      (board[0][1] === 'computer' && board[0][1] === board[1][1] && board[0][1] === board[2][1]) ||
      (board[0][2] === 'computer' && board[0][2] === board[1][2] && board[0][2] === board[2][2]) ||
      (board[0][0] === 'computer' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) ||
      (board[2][0] === 'computer' && board[2][0] === board[1][1] && board[2][0] === board[0][2])) {
    announceWinner('computer');
  }
}

function determineMove() {
  // Ensures a corner is selected for computer's 2nd turn
  var selectedNum = $('.selected').length;
  if (selectedNum === 2) {
    makeCornerMove();
  } else {
    makeWinningMove();
  }
}

function makeWinningMove() {
  // Checks horizontal & vertical possibilities for a chance to block human player
  for (var i = 0; i < board.length; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === 'computer') {
      if (board[i][2] === null) {
        makeCompMove(i, 2);
        return;
      } 
    } else if (board[i][0] === board[i][2] && board[i][0] === 'computer') {
      if (board[i][1] === null) {
        makeCompMove(i, 1);
        return;
      } 
    } else if (board[i][1] === board[i][2] && board[i][1] === 'computer') {
      if (board[i][0] === null) {
        makeCompMove(i, 0);
        return;
      } 
    } else if (board[0][i] === board[1][i] && board[0][i] === 'computer') {
      if (board[2][i] === null) {
        makeCompMove(2, i);
        return;
      } 
    } else if (board[0][i] === board[2][i] && board[0][i] === 'computer') {
      if (board[1][i] === null) {
        makeCompMove(1, i);
        return;
      } 
    } else if (board[1][i] === board[2][i] && board[1][i] === 'computer') {
      if (board[0][i] === null) {
        makeCompMove(0, i);
        return;
      } 
    }
  }
  // Checks diagonal possibilities for a chance to win
  if (board[0][0] === board[1][1] && board[0][0] === 'computer' && board[2][2] === null) {
    makeCompMove(2, 2);
  } else if (board[0][0] === board[2][2] && board[0][0] === 'computer' && board[1][1] === null) {
    makeCompMove(1, 1);
  } else if (board[1][1] === board[2][2] && board[1][1] === 'computer' && board[0][0] === null) {
    makeCompMove(0, 0);
  } else if (board[0][2] === board[1][1] && board[0][2] === 'computer' && board[2][0] === null) {
    makeCompMove(2, 0);
  } else if (board[0][2] === board[2][0] && board[0][2] === 'computer' && board[1][1] === null) {
    makeCompMove(1, 1);
  } else if (board[1][1] === board[2][0] && board[1][1] === 'computer' && board[0][2] === null) {
    makeCompMove(0, 2);
  } else {
    if ($('.selected').length >= 6) {
      checkRemainingMoves();
    } else {
      blockMove();
    }
  }
}

function blockMove() {
  // Checks horizontal & vertical possibilities for a chance to block human player
  for (var i = 0; i < board.length; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === 'human') {
      makeCompMove(i, 2);
      return;
    } else if (board[i][0] === board[i][2] && board[i][0] === 'human') {
      makeCompMove(i, 1);
      return;
    } else if (board[i][1] === board[i][2] && board[i][1] === 'human') {
      makeCompMove(i, 0);
      return;
    } else if (board[0][i] === board[1][i] && board[0][i] === 'human') {
      makeCompMove(2, i);
      return;
    } else if (board[0][i] === board[2][i] && board[0][i] === 'human') {
      makeCompMove(1, i);
      return;
    } else if (board[1][i] === board[2][i] && board[1][i] === 'human') {
      makeCompMove(0, i);
      return;
    }
  }
  // Checks diagonal possibilities for a chance to block human player
  if (board[0][0] === board[1][1] && board[0][0] === 'human') {
    makeCompMove(2, 2);
  } else if (board[0][0] === board[2][2] && board[0][0] === 'human') {
    makeCompMove(1, 1);
  } else if (board[1][1] === board[2][2] && board[1][1] === 'human') {
    makeCompMove(0, 0);
  } else if (board[0][2] === board[1][1] && board[0][2] === 'human') {
    makeCompMove(2, 0);
  } else if (board[0][2] === board[2][0] && board[0][2] === 'human') {
    makeCompMove(1, 1);
  } else if (board[1][1] === board[2][0] && board[1][1] === 'human') {
    makeCompMove(0, 2);
  } else {
    checkRemainingMoves();
  }
}

function makeCornerMove() {
  // Randomly selects one of the four corners
  var corners = $.grep([
    [0, 0],
    [0, 2],
    [2, 0],
    [2, 2]
  ], function(coordinates) {
    var x = coordinates[0];
    var y = coordinates[1];
    return board[x][y] === null;
  });
  var randomCoordinates = corners[Math.floor(Math.random()*corners.length)];
  var x = randomCoordinates[0];
  var y = randomCoordinates[1];
  makeCompMove(x, y);

}

function checkRemainingMoves() {
  // If no chance at winning or blocking, then randomly selects one of the remaining squares
  var arr = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        arr.push({
          x: i,
          y: j
        });
      }
    }
  }
  var randNum = Math.floor(Math.random() * arr.length - 1) + 1;
  var x = arr[randNum].x;
  var y = arr[randNum].y;
  makeCompMove(x, y);
}

function announceWinner(winner) {
  $('.square').off('click');
  if (winner === 'computer') {
    $('#message-board').text('Sorry, you lose!');
  } else if (winner === 'human') {
    $('#message-board').text('Congrats, you win – somehow!');
  } else {
    $('#message-board').text('It\'s a tie!');
  }
}

function clearBoard() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      board[i][j] = null;
    }
  }
  $('.square').off('click').removeClass('selected').text('');
  $('#message-board').text('');
}

$(function() {
  $('#start-button').on('click', function() {
    $('#reset-button').show();
    $('#start-button').hide();
    startGame();
  });

  $('#reset-button').on('click', function() {
    $('#reset-button').hide();
    $('#start-button').show();
    clearBoard();
  });

});