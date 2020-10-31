/* Name : Nishit Amin, 1. Trivia Game */
/* This is the javascript file */
// Main function
(function() {
  var questions = [
  {question: "What is 18 % 5 ?", choices: [3, 5, 10, 15, 20], correctAnswer: 0},
  {question: "What is ++a + a * --b, if a = 8, b = 9?", choices: [72, 81, 128, 136, 144], correctAnswer: 1},
  {question: "What is int 50 / 7 + 5 * 2 ?", choices: [15, 17, 22, 24, 42], correctAnswer: 1},
  {question: "What is int 50 % 3 * 5 ?", choices: [10, 20, 30, 40, 80], correctAnswer: 0},
  {question: "What is a * b + c - d, if a = 2, b = 5, c = 9, d = 11 ?", choices: [4, 6, 8, 10, 12], correctAnswer: 2},
  {question: "What is x - 5, if x is 8 ?", choices: [2, 3, 5, 7, 9], correctAnswer: 1},
  {question: "What is 8 * 4 - 4 * 7 + 8 ?", choices: [42, 86, 15, 12, 19], correctAnswer: 3},
  {question: "What is 8 * 8 - 8 + 8 / 8 ?", choices: [32, 45, 51, 57, 64], correctAnswer: 3},
  {question: "What is 2 * 6 + 5 - 11 * 0 - 4 + 9 ?", choices: [15, 19, 22, 29, 32], correctAnswer: 2},
  {question: "What is 5 - 5 + 5 / 5 % 5 * 5?", choices: [0, 5, 10, 25, 125], correctAnswer: 1},];

  // Variables
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right !!!');
    return score;
  }
})();
