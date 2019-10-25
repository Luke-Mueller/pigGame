/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a die as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If a player rolls two 6's in a row, their GLOBAL score becomes 0.
- When rolling 2 dice, if a player rolls double 6's, their GLOBAL score becomes 0.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

// INITIALIZE VARIABLES
let score, roundScore, activePlayer, gamePlaying;


// CALL NEW GAME FUNCTION
init();


// SAVES PREVIOUS ROLL FOR 1 DIE
// let lastDice;


// ROLL DICE
document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {

        // GET RANDOM NUMBER FOR DICE
        let dice1 = Math.ceil(Math.random() * 6);
        let dice2 = Math.ceil(Math.random() * 6);

        // DISPLAY DICE
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // UPDATE ROUNDSCORE IF ROLL IS NOT 1

        // SINGLE DIE ROLL
        // if (dice === 6 && lastDice === 6) {
        //     score[activePlayer] = 0;
        //     document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        //     nextPlayer();
        // } else if (dice !== 1) {
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     // change player
        //     nextPlayer();
        // }
        // lastDice = dice;

        // DOUBLE DIE ROLL
        if (dice1 === 6 && dice2 ===6) {
            score[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

    }
});


// HOLD
document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {

        // ADD CURRENT SCORE TO GLOBAL SCORE
        score[activePlayer] += roundScore;

        // UPDATE UI
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

        // CHECK FOR WIN CONDITIONS
        let input = document.querySelector('.final-score').value;
        console.log(input);
        let winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        if (score[activePlayer] >= winningScore) {
            // GAME WON
            hideDice();
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // CHANGE PLAYER
            nextPlayer();
        }
    }
});


// FUNCTIONS
function nextPlayer() {

    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    setTimeout(function() {
        hideDice();
    }, 750);
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');

    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    score = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice () {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}