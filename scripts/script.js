//Declare pitches as objects with semitones (their numeric value within an octave). The '4' in the variable names indicates that these pitches are in octave 4 of the keyboard. A full implementation of this app would involve mapping all 88 keys from A0 - C9 rather than the 13 that represent the complete octave.

var c4 =      {semitone: 1, canPlay: false};
var dFlat4 =  {semitone: 2, canPlay: false};
var d4 =      {semitone: 3, canPlay: false};
var eFlat4 =  {semitone: 4, canPlay: false};
var e4 =      {semitone: 5, canPlay: false};
var f4 =      {semitone: 6, canPlay: false};
var gFlat4 =  {semitone: 7, canPlay: false};
var g4 =      {semitone: 8, canPlay: false};
var aFlat4 =  {semitone: 9, canPlay: false};
var a4 =      {semitone: 10, canPlay: false};
var bFlat4 =  {semitone: 11, canPlay: false};
var b4 =      {semitone: 12, canPlay: false};
var c5 =      {semitone: 13, canPlay: false};

var pitchArray = [c4, dFlat4, d4, eFlat4, e4, f4, gFlat4, g4, aFlat4, a4, bFlat4, b4, c5];

// Grab audio elements from the DOM and assign them as properties to each corresponding pitch object.
c4.audio =      document.getElementById('c4');
dFlat4.audio =  document.getElementById('dFlat4');
d4.audio =      document.getElementById('d4');
eFlat4.audio =  document.getElementById('eFlat4');
e4.audio =      document.getElementById('e4');
f4.audio =      document.getElementById('f4');
gFlat4.audio =  document.getElementById('gFlat4');
g4.audio =      document.getElementById('g4');
aFlat4.audio =  document.getElementById('aFlat4');
a4.audio =      document.getElementById('a4');
bFlat4.audio =  document.getElementById('bFlat4');
b4.audio =      document.getElementById('b4');
c5.audio =      document.getElementById('c5');

// c4.audio =      new Audio('./assets/audio/c4.wav');
// dFlat4.audio =  new Audio('./assets/audio/dFlat4.wav');
// d4.audio =      new Audio('./assets/audio/d4.wav');
// eFlat4.audio =  new Audio('./assets/audio/eFlat4.wav');
// e4.audio =      new Audio('./assets/audio/e4.wav');
// f4.audio =      new Audio('./assets/audio/f4.wav');
// gFlat4.audio =  new Audio('./assets/audio/gFlat4.wav');
// g4.audio =      new Audio('./assets/audio/g4.wav');
// aFlat4.audio =  new Audio('./assets/audio/aFlat4.wav');
// a4.audio =      new Audio('./assets/audio/a4.wav');
// bFlat4.audio =  new Audio('./assets/audio/bFlat4.wav');
// b4.audio =      new Audio('./assets/audio/b4.wav');
// c5.audio =      new Audio('./assets/audio/c5.wav');

//Values that are undefined until randomly generated.
var randomPitch = {};
var pitch1;
var pitch2;
var acceptableAnswers = [];

//Values that are undefined until user input accepted.
var userAnswer = {};
var answerForQuality;
var answerForNumber;

//Game Variables
var timerElement;
var countdown; //setInterval ID

var score = document.getElementById('score'); //a variable that represents the current player score
score.innerText = 0;

var player1Score; //set equal to current player's score at end of timer; we only need to keep track of player one, since we only have two players and player two's score will be the same as the score variable.
var numberOfTimesPlayed = 0; //keeps track of how many times the game has been played; when 2, the game ends and scores are checked against each other.

//DOM stuff that needs to be accessible to multiple functions
var titleModal = document.querySelector('.blur');
var gameInterface = document.querySelector('.game_interface');
var qualityButtons = document.querySelectorAll('.quality');
var numberButtons = document.querySelectorAll('.interval');
var topSection = document.querySelector('.top');
var bottomSection = document.querySelector('.bottom');
var player1DoneModal = document.querySelectorAll('.blur')[2];
var player2Modal = document.querySelectorAll('.blur')[5];
var body = document.querySelector('.blurred_content'); //for blur effect

//Show a game instructions dialog, trigger beginning of game when button is clicked.
function titleSequence() {
  titleModal.style.display = 'block';
  titleModal.addEventListener('click', initSounds);

}

function initSounds() {
  titleModal.removeEventListener('click', initSounds);
  pitchArray.forEach( (pitch, index) => {
    pitch.audio.load();
    pitch.audio.oncanplaythrough = function() {
      pitch.canPlay = true;
      console.log(pitch);
    };
  });
  titleModal.style.display = 'none';
  startGame();
}






//     pitch.audio.load();
//     pitch.audio.addEventListener('canplaythrough', function() {
//       pitch.canPlay = true;
//       this.removeEventListener('canplaythrough', arguments.callee);
//     });
//     console.log(pitch.audio.readyState);
//   });
//
//   var waitForAudio = window.setInterval(canPlayAllElements, 1);
//
//



function startGame() {
  var instructionsModal = document.querySelectorAll('.blur')[1];
  instructionsModal.style.display = 'block';
  body.classList.add('blurred_content');
  var instrModalButton = document.querySelector('.instructions button');
  instrModalButton.addEventListener('click', function() {
    bottomSection.innerHTML = '<h1 class="inactive_player_status">Awaiting results from Player 1...</h1>';
    instructionsModal.style.display = 'none';
    startTimer();
    playGame();
    instrModalButton.removeEventListener('click', arguments.callee);
  });
  player2Modal.addEventListener('click', function() {
    topSection.innerHTML = '<h1 class="inactive_player_status">Awaiting results from Player 2...</h1>' +
    '<h1 class="inactive_player_status player_1_score" style="margin-top: 0px">Score: ' + player1Score + '</h1>';
    player2Modal.style.display = 'none';
      clearInterval(countdown);
      startTimer();
      playGame();
      player2Modal.removeEventListener('click', arguments.callee);
  });
}

function playGame() {
  numberOfTimesPlayed++;
  questionPrompt();
}

function questionPrompt() {
  assignPitches();
  getCorrectAnswer(pitch1, pitch2);
  getUserAnswer();
}

//Generate a random number between 1-12
function randomNum0Thru12() {
  var random = Math.floor(Math.random() * 12);
  return random;
}

//Pick a random pitch to play by passing the return value of a random number generator function (below) to this function, which selects the callback's return value as the index of our array of pitch objects.
function objectifyRandomPitch(randomNumber) { //please pass in randomNum0Thru12() as callback, for desired results
  randomPitch = pitchArray[randomNumber];
    return randomPitch;
}

//Store two random pitches as objects
function assignPitches() {
  pitch1 = objectifyRandomPitch(randomNum0Thru12());
  pitch2 = objectifyRandomPitch(randomNum0Thru12());
  console.log('pitch1: ' + pitch1.semitone + ', pitch2: ' + pitch2.semitone);
  playPitches();
}

//Play the pitches to the user as the prompt for each question.
function playPitches() {
  //An element must be reloaded in Chrome or it will only play once
  //An element must not be reloaded in Firefox or there will be a delay
  console.log(pitch1.audio);
  pitch1.audio.play(); //Play first pitch
  console.log(pitch2.audio);
  pitch1.audio.addEventListener('ended', function() {
    pitch2.audio.play();
    console.log('2: ' + pitch2.semitone);
    pitch1.audio.removeEventListener('ended', arguments.callee);
  });
}

//Get the difference in semitones of the two pitches, expressed as an absolute value, so as not to get a negative number if the lower pitch comes first
function getCorrectAnswer(pitch1, pitch2) {
  var diff = Math.abs(pitch1.semitone - pitch2.semitone);
  switch(diff) {
    case 0:
      acceptableAnswers = [
        {quality: "perfect", number: "unison"},
        {quality: "diminished", number: "second"},
      ];
      break;
    case 1:
      acceptableAnswers = [
        {quality: "minor", number: "second"},
        {quality: "augmented", number: "unison"},
      ];
      break;
    case 2:
      acceptableAnswers = [
        {quality: "major", number: "second"},
        {quality: "diminished", number: "third"},
      ];
      break;
    case 3:
      acceptableAnswers = [
        {quality: "minor", number: "third"},
        {quality: "augmented", number: "second"},
      ];
      break;
    case 4:
      acceptableAnswers = [
        {quality: "major", number: "third"},
        {quality: "diminished", number: "fourth"},
      ];
      break;
    case 5:
      acceptableAnswers = [
        {quality: "perfect", number: "fourth"},
        {quality: "augmented", number: "third"},
      ];
      break;
    case 6:
      acceptableAnswers = [
        {quality: "augmented", number: "fourth"},
        {quality: "diminished", number: "fifth"},
      ];
      break;
    case 7:
      acceptableAnswers = [
        {quality: "perfect", number: "fifth"},
        {quality: "diminished", number: "sixth"},
      ];
      break;
    case 8:
      acceptableAnswers = [
        {quality: "minor", number: "sixth"},
        {quality: "augmented", number: "fifth"},
      ];
      break;
    case 9:
      acceptableAnswers = [
        {quality: "major", number: "sixth"},
        {quality: "diminished", number: "seventh"},
      ];
      break;
    case 10:
      acceptableAnswers = [
        {quality: "minor", number: "seventh"},
        {quality: "augmented", number: "sixth"},
      ];
      break;
    case 11:
      acceptableAnswers = [
        {quality: "major", number: "seventh"},
        {quality: "diminished", number: "fifth"},
      ];
      break;
    case 12:
      acceptableAnswers = [
        {quality: "perfect", number: "octave"},
        {quality: "augmented", number: "seventh"},
        //Augmented 9th would be acceptable here, too, but I don't have a button for that, and musicians would hate you for calling the interval an aug 9th so... no.
      ];
      break;
  }

  console.log('diff: ' + diff);
  console.log('Acceptable answers: ' + acceptableAnswers[0].quality + ' ' + acceptableAnswers[0].number);
  console.log('Acceptable answers: ' + acceptableAnswers[1].quality + ' ' + acceptableAnswers[1].number);
  diff = null;
  return acceptableAnswers;
}

function getUserAnswer() {
  var replayButton = document.getElementById('replay');
  replayButton.addEventListener('click', playPitches);
  answerForQuality = '';
  answerForNumber = '';
  //Get user's answer for interval QUALITY
  qualityButtons.forEach(function(element) {
    element.addEventListener('click', function() {
      //Radio-button-esque buttons (remove active class from all buttons so only one is white at a time)
      qualityButtons.forEach(function(siblings) {
        siblings.classList.remove('active');
      });
      //Make it easy for user to see what they're guessing
      element.classList.add('active');
      //Record user's answer to userAnser object
      answerForQuality = element.getAttribute('id');
    });
  });
  //Get user's answer for interval NUMBER
  numberButtons.forEach(function(element) {
    element.addEventListener('click', function() {
      numberButtons.forEach(function(siblings) {
        siblings.classList.remove('active');
      });
      element.classList.add('active');
      answerForNumber = element.getAttribute('id');
    });
  });
  var submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', function() {
    replayButton.removeEventListener('click', playPitches);
    userAnswer.quality = answerForQuality; //global object userAnswer's quality property gets set to whatever button the user clicked
    userAnswer.number = answerForNumber; //samesies
    //Reset the buttons
    qualityButtons.forEach(function(element) {
      element.classList.remove('active');
    });
    numberButtons.forEach(function(element) {
      element.classList.remove('active');
    });
    console.log(userAnswer);
    console.log('User Answer: ' + userAnswer.quality + ' ' + userAnswer.number);
    checkUserAnswer();
    submitButton.removeEventListener('click', arguments.callee);
  });
}

function checkUserAnswer() {
  console.log(acceptableAnswers);
  var isCorrect = false;
  //FOR LOOP THIS INSTEAD
  for (var i = 0; i < acceptableAnswers.length; i++) {
    if (userAnswer.quality == acceptableAnswers[i].quality && userAnswer.number == acceptableAnswers[i].number) {
      console.log('CORRECT');
      var correctModal = document.querySelectorAll('.blur')[3];
      correctModal.style.display = 'block';
      isCorrect = true;
      break;
    }
  }
  if(isCorrect) {
    setTimeout(function() {
      correctModal.style.display = 'none';
    }, 700);
      score.innerText++;
  } else {
    console.log('INCORRECT');
    var incorrectModal = document.querySelectorAll('.blur')[4];
    incorrectModal.style.display = 'block';
    setTimeout(function() {
      incorrectModal.style.display = 'none';
    }, 700);
  }
  isCorrect = false;
  reset();
}

function reset() { //resets all game objects to empty to await new inputs from random pitch generator and user
  randomPitch = {};
  pitch1 = {};
  pitch2 = {};
  acceptableAnswers = [];
  userAnswer= {};
  answerForQuality = '';
  answerForNumber = '';
  checkTimer();
}

function checkTimer() {
  if(timerElement.textContent > 0) {
    questionPrompt();
  } else {
    player1DoneModal.style.display = 'block';
    if (numberOfTimesPlayed <= 1) { //don't update this value when player 2 is playing
      player1Score = score.innerText;
    }
    loadPlayerTwoUI();
    return;
  }
}

//Start the game countdown
function startTimer() {
  timerElement = document.getElementById('timer');
  timerElement.textContent = 60;
  countdown = setInterval(function() {
    if (timerElement.textContent > 0) {
      timerElement.textContent--;
    } else {
      return false;
    }
  }, 1000);
}

function loadPlayerTwoUI() {
  var timesUpModal = document.querySelector('.times_up');
  var replayButton = document.getElementById('replay');
  var playerStatus = document.querySelector('.inactive_player_status');
  var scoreLabelP1 = document.querySelector('.player_1_score');
  setTimeout(function() {
    player1DoneModal.style.display = 'none';
    if (numberOfTimesPlayed >= 2) {
      gameInterface.classList.add('fade-out');
      playerStatus.classList.add('fade-out');
      scoreLabelP1.classList.add('fade-out');
      setTimeout(function() {
        if (score.innerText > player1Score) { //Player 2 wins...
          topSection.style.borderBottom = '0px';
          bottomSection.style.height = '600px';
          topSection.style.height = '0px';
          setTimeout(function() {
            playerStatus.style.display = 'none';
            topSection.innerHTML = '';

            bottomSection.innerHTML = '<h1 class="inactive_player_status fade-in" style="margin-top: 150px;">Player 2 wins!</h1>' +
            '<h1 class="inactive_player_status fade-in" style="margin-top: 50px;">Player 1 Score: ' + player1Score + '</h1>' +
            '<h1 class="inactive_player_status fade-in" style="margin-top: 0px;">Player 2 Score: ' + score.innerText + '</h1>';
          }, 1001);
        } else if (score.innerText < player1Score) { // Player 1 wins
          topSection.style.borderBottom = '0px';
          bottomSection.style.height = '0px';
          topSection.style.height = '600px';
          topSection.innerHTML = '<h1 class="inactive_player_status" style="margin-top: 150px;">Player 1 wins!</h1>' +
          '<h1 class="inactive_player_status" style="margin-top: 50px;">Player 1 Score: ' + player1Score + '</h1>' +
          '<h1 class="inactive_player_status" style="margin-top: 0px;">Player 2 Score: ' + score.innerText + '</h1>';
        } else { //tie
          topSection.innerHTML = '<h1 class="inactive_player_status" style="margin-top: 150px;">It\'s a tie.</h1>' +
            '<h1 class="inactive_player_status" style="margin-top: 0px;">Player 1 Score: ' + player1Score + '</h1>';
          topSection.style.height = '300px';
          bottomSection.style.height = '300px';
          bottomSection.innerHTML = '<h1 class="inactive_player_status" style="margin-top: 150px;">It\'s a tie.</h1>' +
            '<h1 class="inactive_player_status" style="margin-top: 0px">Player 2 Score: ' + score.innerText + '</h1>';
        }
      }, 1001);
      var playAgainButton = document.getElementById('play_again');
      playAgainButton.style.display = 'block';
      playAgainButton.addEventListener('click', function() {
        location.reload();
      });
      return;
    } else {
      score.innerText = 0;
      gameInterface.classList.toggle('fade-out');
      playerStatus.classList.add('fade-out');
      replayButton.classList.add('replay_button_animation');
      setTimeout(function() {
        playerStatus.style.display = 'none';
        gameInterface.style.display = 'none';
        topSection.style.height = '200px';
        bottomSection.style.height = '400px';
        bottomSection.appendChild(gameInterface);
        setTimeout(function() {
          gameInterface.style.display = 'block';
          setTimeout(function() {
            gameInterface.classList.toggle('fade-out');
            setTimeout(function() {
              replayButton.classList.remove('replay_button_animation');
              setTimeout(function() {
                player2Modal.style.display = 'block';
              }, 1000);
            }, 200);
          }, 200);
        }, 201);
      }, 1001);
    }
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function() {
  titleSequence();
});
