const buttons = document.querySelectorAll(`button`);
const display = document.querySelector(`#display`);
let playerScore = 0;
let computerScore = 0;

buttons.forEach((button) => {
  button.addEventListener(`click`, () => {
    playRound(button.id, computerPlay());
  });
});

function playRound(playerSelection, computerSelection) {
  let result;
  if (playerSelection === computerSelection) {
    result = `The round ended in a tie.`;
  } else if (
    (playerSelection === `rock` && computerSelection === `scissors`) ||
    (playerSelection === `paper` && computerSelection === `rock`) ||
    (playerSelection === `scissors` && computerSelection === `paper`)
  ) {
    result = `You Win! ${playerSelection} beats ${computerSelection}.`
    playerScore++;
  } else {
    result = `You lose! ${computerSelection} beats ${playerSelection}.`
    computerScore++;
  }
  display.innerHTML =
    `Result: ${result} <br>Player Score: ${playerScore} <br>Computer Score: ${computerScore}`;

  if (playerScore === 5 || computerScore === 5) {
    display.innerHTML = `Final Score: ${playerScore} - ${computerScore} <br> ${winner()}`;
    playerScore = 0;
    computerScore = 0;
  }
}

function computerPlay() {
  const choices = [`rock`, `paper`, `scissors`];
  return choices[Math.floor(Math.random() * choices.length)];
}

function winner() {
  if (playerScore > computerScore) {
    return `Game over. Player was the winner! Congratulations!`;
  } else {
    return `Game over. Computer was the winner!`;
  }
}

