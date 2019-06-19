//Pseudocoding
//===========================================
//You'll create a trivia form with multiple choice or true/false options (your choice).

//* The player will have a limited amount of time to finish the quiz. 

//* The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.

//* Don't let the player pick more than one answer per question.

//* Don't forget to include a countdown timer.

//Nest a for loop inside of a for loop
//Countdown timer for each question; timer--
//+1 for correct answer or +1 for wrong answer
//Automatic reset that empties the previous question and moves you to the next question
//=========================================================

//Still-To-Do list
//How do I separate answer sets so that each set of four choices corresponds only to one question? (array indexes?)
    //Problem- showing each answer subarray 3 times in the console; not resetting but continues appending questions
    //Problem- how to incorporate a for-loop to solve the above problem and tell the computer the answer sets are separate?

//How do I connect your answer responses to the rightCount and wrongCount counters?
    //counter at least shows up in the console after game is over
//How do I submit your answers and reset the game? 
//==================================
//Global Variables
//===========================
var trivTime = 0;
var rightCount = 0;
var wrongCount = 0;
var qACount = 1;
var timer = '';
var userAnswer;

var newDiv = $('<div>');
    $('.questions').append(newDiv);

var qA = [
  {
    question: 'I captained the Queen Anne\'s \ Revenge and placed lit matches under my hat to make my enemies believe I reeked of hellfire. I even blockaded the port of Charleston and made off with choice valuables before I met my end in a battle at Ocracoke. Who am I?',
    answers: ['Bartholomew Roberts', 'Blackbeard', 'Captain Henry Morgan'],
    correct: 'Blackbeard',
    right: 'Correct!',
    wrong: 'Wrong!',
    imageURL: 'assets/images/blackbeard.jpg'
  },
  {
    question: 'I plundered settlements and ships on the Spanish Main, and even the King of England treated me as a hero for stickin\'\ it to Spain. You may have heard of the rum with my name. Who am I?',
    answers: ['Captain Henry Morgan', 'Captain Kidd', 'Blackbeard'],
    correct: 'Captain Henry Morgan',
    right: 'Correct!',
    wrong: 'Wrong!',
    imageURL: 'assets/images/captain-morgan.jpg'
  },
  {
    question: '400 ships my crew and I snatched as we ventured from the Caribbean to West Africa; even my enemies swore I was invincible! A merry life and a short one was my motto. Who am I?',
    answers: ['Captain Kidd', 'Bartholomew Roberts', 'Captain Henry Morgan'],
    correct: 'Bartholomew Roberts',
    right: 'Correct!',
    wrong: 'Wrong!',
    imageURL: 'assets/images/black-bart-roberts.jpg'
  },
  {
    question: 'I buried my treasure here and there, and to this day people are still hunting for my riches. Who am I?',
    answers: ['Blackbeard', 'Captain Henry Morgan', 'Captain Kidd'],
    correct: 'Captain Kidd',
    right: 'Correct!',
    wrong: 'Wrong!',
    imageURL: 'assets/images/captain-kidd.jpeg'
  }
];
//Functions
//=====================================
  //Making start button clickable; when button is clicked clear the trivia section
  $('.startBtn').on('click', function () {
    //Empties trivia section
    $('.trivSection').empty();
    createQuestions();
  });

var createQuestions = function () {
  timerStart();
  
  for(i = 0; i < qA.length; i++) {
    
    newDiv.append('<h2>' + qA[i].question + '</h2>');
      for(j = 0; j < qA[i].answers.length; j++){
        newDiv.append('<input type="radio" name="pirate" value="question"' + i + '>' + qA[i].answers[j])
        console.log(qA[i].answers[j]);
      }
  }  
  //Get question
  
}

var createAnswers = function () {
  

  for (var j = 0; j < qACount[i].answers[j].length; j++) {
    //get answers
    var answers = qA[qACount]['answers'][j];
    //Create new div to hold answers
    var newBtn = $('<button>');
    //Add class to new Div
    newBtn.addClass('answers redBtn');
    //Give buttons attribute
  newBtn.attr('data-type', answers);
    //add text to new Div
    newBtn.text(answers);
    //add answers to DOM
    $('.trivSection').append(newBtn);

    
  }
  //Prevents click event from being saved
  $(document).off('click', '.answers', checkAnswer);
  $(document).on('click', '.answers', checkAnswer);
}
//===============================================================
//done button needs to be added; reset
// for loops
//var UserAnswer = $("input[name='gender']:checked"). val();
//==================================================================

var checkAnswer = function () {
  //Get users answer choice
 var userAnswer = $("input[type='radio'] [name='pirate']:checked").val();
  var correctAnswer = qA[qACount]['correct'];
  var correctImg = qA[qACount]['imageURL'];

 var right = qA[qACount]['right'];
  var wrong = qA[qACount]['wrong'];
  console.log(qACount);
  if (userAnswer === correctAnswer) {
    //Update rightCount
    rightCount++;

    //Clears out trivia section
    $('.trivSection').empty();
    var newImg = $('<img>');
    newImg.attr('src', correctImg);
    $('.trivSection').append(newImg);

    //Create Div
    var newDiv = $('<div>');
    newDiv.addClass('rightAnswer')
    newDiv.text(right);
    $('.trivSection').append(newDiv);
    //Stops Time
    clearInterval(timer);

    //Add 1 to question count to move to the next question
    qACount++;
    if (qACount <= 3) {
      //removes CORRECT! text and continues
      setTimeout(
        function () {
          $('.trivSection').empty();
          createQuestions();
        }, 1000);
    }
    else {
      $('.trivSection').empty();
      var newImg = $('<img>');
      newImg.attr('src', correctImg);
      $('.trivSection').append(newImg);
      //Create Div
      var newDiv = $('<div>');
      newDiv.addClass('rightAnswer');
      //adds CORRECT! text to div
      newDiv.text(right);
      $('.trivSection').append(newDiv);
      //Stops Time
      clearInterval(timer)
      //Reset
      setTimeout(gameOver, 1000);
    }
  }

  //WrongCount
  else {
    wrongCount++;
    $('.trivSection').empty();
    var newImg = $('<img>');
    newImg.attr('src', correctImg);
    $('.trivSection').append(newImg);
    //Create Div
    var newDiv = $('<div>');
    newDiv.addClass('wrongAnswer');
    //adds Wrong! text to div
    newDiv.text(wrong);
    $('.trivSection').append(newDiv);
    //Stops Time
    clearInterval(timer)
    qACount++
    $("#results".html(qACount));

    if (qACount <= 3) {
      setTimeout(function () {
        $('.trivSection').empty();
        createQuestions();
      }, 1000);
    }

    else {
      //Clears out triv Section
      $('.trivSection').empty();
      var newImg = $('<img>');
      newImg.attr('src', correctImg);
      $('.trivSection').append(newImg);
      var newDiv = $('<div>');
      //Give div class
      newDiv.addClass('wrongAnswer');
      //adds Wrong! text to div
      newDiv.text(wrong);
      //Add answer to DOM
      $('.trivSection').append(newDiv);
      //Stops Time
      clearInterval(timer);
      //Reset
      setTimeout(gameOver, 1000);
    }
  }
}

//Timer
//==========================================
var timerStart = function () {
  $('.timerSection').empty();
  //Sets time to 10
  trivTime = 300;
  //Progress Bar
  var timeTag = $('<div>');
  timeTag.addClass('time');
  timeTag.addClass('progress');
  timeTag.addClass('time-r');
  var progressBar = $('<div>');
  progressBar.addClass('progress-bar');
  progressBar.width(trivTime + '%');


  $('.timerSection').append(timeTag);
  $('.time').append(progressBar);
  //Decrements Time
  timer = setInterval(timeDecrement, 300);
}
var timeDecrement = function () {
  //Progress bar decrement
  $('.progress-bar').width(trivTime + '%');
  $('#results').text('00:00')
  trivTime--;
  //if time gets to 0
  if (trivTime === -10) {
    userAnswer = false;
    //Clears Time
    clearInterval(timer);
    checkAnswer();
  }

}

var gameOver = function () {
  $('.trivSection').empty();
  $('.timerSection').empty();
  var scoreDiv = $('<div>');
  scoreDiv.addClass('score');
  scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
  $('.trivSection').append(newDiv);
  ;

  //Create submit button and show results
  //const submitButton = document.getElementById("submit");
  //$(submitButton).on('click', function () {
  
  //Reset all value
  trivTime = 100;
  qACount = 1;
  rightCount = 0;
  wrongCount = 0;
  //When reset button is clicked
  
    $(".submit").append(submitButton);
    $('.trivSection').empty()
    //Starts game over
    createQuestions();
  //});
}
//=============================================
//Show results
//function showResults() {
//const resultsContainer = document.getElementById('results');

//}

//start();
