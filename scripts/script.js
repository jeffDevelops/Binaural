//Declare pitches as objects with semitones (their numeric value within an octave). The '4' in the variable names indicates that these pitches are in octave 4 of the keyboard. A full implementation of this app would involve mapping all 88 keys from A0 - C9 rather than the 13 that represent the complete octave.

var c4 = {
  semitone: 1,
};
var dFlat4 = {
  semitone: 2
};
var d4 = {
  semitone: 3
};
var eFlat4 = {
  semitone: 4
};
var e4 = {
  semitone: 5
};
var f4 = {
  semitone: 6
};
var gFlat4 = {
  semitone: 7
};
var g4 = {
  semitone: 8
};
var aFlat4 = {
  semitone: 9
};
var a4 = {
  semitone: 10
};
var bFlat4 = {
  semitone: 11
};
var b4 = {
  semitone: 12
};
var c5 = {
  semitone: 13
};

var pitchArray = [c4, dFlat4, d4, eFlat4, e4, f4, gFlat4, g4, aFlat4, g4, aFlat4, a4, bFlat4, b4, c5];

//Grab audio elements from the DOM and assign them as properties to each corresponding pitch object.
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

//Values that are undefined until randomly generated.
var randomPitch = {};
var pitch1;
var pitch2;
var acceptableAnswers = [];

//Values that are undefined until user input accepted.
var userAnswer = {};
var answerForQuality;
var answerForNumber;

//Show a game instructions dialog, trigger beginning of game when button is clicked.
function instructUser() {
  var instructionsModal = document.querySelector('.blur');
  instructionsModal.style.display = 'block';
  var instrModalButton = document.querySelector('.instructions button');
  instrModalButton.addEventListener('click', function() {
    instructionsModal.style.display = 'none';
    startTimer();
    assignPitches();
    playPitches();
    getCorrectAnswer(pitch1, pitch2);
    getUserAnswer();
  });
}

function getUserAnswer() {
  //Get user's answer for interval QUALITY
  var qualityButtons = document.querySelectorAll('.quality');
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
  var numberButtons = document.querySelectorAll('.interval');
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
    userAnswer.quality = answerForQuality; //global object userAnswer's quality property gets set to whatever button the user clicked
    userAnswer.number = answerForNumber; //samesies
    console.log(userAnswer);
    return userAnswer;
  });
}

//Get the difference in semitones of the two pitches, expressed as an absolute value, so as not to get a negative number if the lower pitch comes first
function getCorrectAnswer(pitch1, pitch2) {
  var diff = Math.abs(pitch1.semitone - pitch2.semitone);
  switch(diff) {
    case 0: 
      acceptableAnswers = [
        {quality: "perfect", number: "unison"},
        {quality: "augmented", number: "seventh"},
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
        {quality: "diminished", number: "fourth"},
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
  if(acceptableAnswers[2]) {
    console.log('Acceptable answers: ' + acceptableAnswers[2].quality + ' ' + acceptableAnswers[2].number); //will throw error if no third array index 
  } else { 
    console.log("No third acceptable answer for this interval");
  }
  return acceptableAnswers;
}

//Play the pitches to the user as the prompt for each question.
function playPitches() {
  //An element must be reloaded in Chrome or it will only play once
  //An element must not be reloaded in Firefox or there will be a delay
  pitch1.audio.play(); //Play first pitch
  console.log('1: ' + pitch1.semitone);
  if (pitch1.audio == pitch2.audio && window.chrome) { //Load it again if Chrome, if anything else, don't
    pitch2.audio.load();
  }
  setTimeout(function() {
    pitch2.audio.play();
    console.log('2: ' + pitch2.semitone);
  }, 1000);
}

//Store two random pitches as objects
function assignPitches() {
  pitch1 = objectifyRandomPitch(randomNum0Thru12());
  pitch2 = objectifyRandomPitch(randomNum0Thru12());
  console.log('pitch1: ' + pitch1.semitone + ', pitch2: ' + pitch2.semitone);
}

//Start the game countdown
function startTimer() {
  timerElement = document.getElementById('timer');
  timerElement.textContent = 60;
  var countdown = setInterval(function() {
    if (timerElement.textContent > 0) {
      timerElement.textContent--;
    } else {
      var player1DoneModal = document.querySelectorAll('.blur')[1];
      player1DoneModal.style.display = 'block';
      return;
    }
  }, 1000);
}

//Pick a random pitch to play by passing the return value of a random number generator function (below) to this function, which selects the callback's return value as the index of our array of pitch objects.
function objectifyRandomPitch(randomNumber) { //please pass in randomNum0Thru12() as callback, for desired results
  randomPitch = pitchArray[randomNumber];
    return randomPitch;
}

//Generate a random number between 1-12
function randomNum0Thru12() {
  var random = Math.floor(Math.random() * 12);
  return random;
}

document.addEventListener("DOMContentLoaded", function() {

  
  instructUser();






});