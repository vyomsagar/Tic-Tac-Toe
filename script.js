document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const resetButton = document.getElementById('resetButton');
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    const player1WinsElement = document.getElementById('player1Wins');
    const player2WinsElement = document.getElementById('player2Wins');
    
    let player1 = 'Player 1';
    let player2 = 'Player 2';
    let currentPlayer = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];
    let player1Wins = 0;
    let player2Wins = 0;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function handleBoxClick(e) {
      const index = e.target.getAttribute('data-index');
  
      if (board[index] !== '' || !gameActive) {
        return;
      }
  
      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;
      
      if (checkWinner()) {
        gameActive = false;
        updateWins(currentPlayer === 'X' ? player1 : player2);
        highlightWinner();
        return;
      }
  
      if (board.every(cell => cell !== '')) {
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function checkWinner() {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return board[index] === currentPlayer;
        });
      });
    }
  
    function highlightWinner() {
      winningCombinations.forEach(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
          combination.forEach(index => {
            boxes[index].classList.add('winner');
          });
        }
      });
    }
  
    function updateWins(winner) {
      if (winner === player1) {
        player1Wins++;
        player1WinsElement.textContent = player1Wins;
      } else {
        player2Wins++;
        player2WinsElement.textContent = player2Wins;
      }
    }
  
    function resetGame() {
      board = ['', '', '', '', '', '', '', '', ''];
      boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('winner');
      });
      gameActive = true;
      currentPlayer = 'X';
    }
  
    function updatePlayerNames() {
      player1 = player1NameInput.value || 'Player 1';
      player2 = player2NameInput.value || 'Player 2';
    }
  
    boxes.forEach(box => {
      box.addEventListener('click', handleBoxClick);
    });
  
    resetButton.addEventListener('click', resetGame);
    player1NameInput.addEventListener('change', updatePlayerNames);
    player2NameInput.addEventListener('change', updatePlayerNames);
  });
  