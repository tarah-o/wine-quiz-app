
//zeroes out score to ensure quiz starts at the beginning.
let currentScore = 0;
let currentQuestion = 0;

function displayQuestion() {
  if (currentQuestion < STORE.length) {
    $('#questionNumber').text(currentQuestion+1);
    $('.quizBox').empty();
    $('.quizBox').html(`
      <div class='question'>${STORE[currentQuestion].question}</div>
        <form>
          <fieldset>
            ${displayPossibleAnswers(STORE[currentQuestion].answers)} 
            <br>
            <button type="submit" class="submitAnswerButton">Submit</button>
          </fieldset>
        </form>
      </div>
    `);   
  } else {
    displayFinalResults();
  }
}

function displayPossibleAnswers(answers) {
  let answerHtml = '';
  for (i=0; i<answers.length; i++) {
    let currentAnswer = 
    `<label class="possibleAnswer">
      <input type="radio" value="${answers[i]}" name="answer" required>
      ${answers[i]}
    </label>`
    answerHtml += currentAnswer;
  }
  return answerHtml;
}

function optionClicked() {
  $('.quizBox').on('click', '.possibleAnswer', function() {
    $('.quizBox').find('.selected').each(function() {
      $(this).removeClass('selected');
    });
    $(this).addClass('selected');
  })
}

function correctOrIncorrect() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let userAnswer = $('input:checked').val();
    let actualAnswer = STORE[currentQuestion].correctAnswer;
    if (userAnswer === actualAnswer) {
      isCorrectFeedback();
      addPoint();
    } else {
      isIncorrectFeedback();
    }
  })
}

// provides the feedback to user on if they got the question right or wrong
function isCorrectFeedback() {
  $('.quizBox').empty();
  $('.quizBox').html(`
    <h3>Correct!</h3>
    <h3>${STORE[currentQuestion].correctAnswer}</h3>
    <button type="submit" id="nextQuestionButton">Next Question</button>
  `);
  
}

function isIncorrectFeedback() {
  $('.quizBox').empty();
  $('.quizBox').html(`
    <h3>That's Incorrect!</h3>
    <h4>The correct answer is</h4>
    <h3>${STORE[currentQuestion].correctAnswer}</h3>
    <button type="submit" id="nextQuestionButton">Next Question</button>
  `);
}

function nextQuestion() {
  $('.quizBox').on('click', '#nextQuestionButton', function (event) {
    currentQuestion++;
    displayQuestion();
    correctOrIncorrect();
  });
}

function addPoint() {
  currentScore++;
  $('#currentScore').text(currentScore);
}

// generates final results based on how the user did on the quiz
function displayFinalResults() {
  let percentageScore = currentScore * 10;
  $('.quizBox').empty();
  if (currentScore <= 3) {
    $('.quizBox').html(`
      <span class='percentage'>${percentageScore}%</span>
      <p>Nope, you aren't a wine-o with ${currentScore} points.  You should brush up on your wine trivia.</p>
      <button type="submit" id="restartQuizButton">Try Again</button>`
    );
  } else if (currentScore <=7) {
    $('.quizBox').html(`
      <span class='percentage'>${percentageScore}%</span>
      </p>Good attempt, but with a score of ${currentScore}, you're not sommelier material just yet.</p>
      <button type="submit" id="restartQuizButton">Try Again</button>`
    );
  } else {
    $('.quizBox').html(`
      <span class='percentage'>${percentageScore}%</span>
      <p>Congratulations! You are officially a wine-o with ${currentScore} points!</p>
      <button type="submit" id="restartQuizButton">Try Again</button>`
    );
  }
  $('.quizBox').on('click', '#restartQuizButton', function(event) {
    location.reload();
  });
}

function startQuiz() {
  $('.quizBox').on('click', '.startButton', function(event) {
    displayQuestion();
    correctOrIncorrect();
    nextQuestion();
    optionClicked();
  });
}

$(function() {
  startQuiz();
})

