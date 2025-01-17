let answeredQuestions = [];
let previousQuestionIndex = null;
let points = 0;
let currentQuestion = null;
let correctAnswer = null;

const questionContainer = document.querySelector("#phrase");
const tamaModal = document.querySelector(".tama");
const maliModal = document.querySelector(".mali");
const description = document.querySelector("#description-mali");
const correctTranslations = document.querySelector(".explanations");
const inputField = document.querySelector("#translation");
const overlay = document.querySelector(".overlay");
const timerElement = document.getElementById("timer");
const doneButton = document.querySelector(".done-button");
const nextButton = document.querySelector(".magpatuloy");



let timeLeft = 20;
let timer = null;

// Toggle modal visibility
function toggleModal(modal, show = true) {
  modal.style.display = show ? "flex" : "none";
  overlay.style.display = show ? "block" : "none";
}

// Start and reset the timer
function startTimer() {
  clearInterval(timer); // Clear any previous timer
  timeLeft = 20; // Reset timeLeft
  timerElement.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer); // Stop the timer
      inputField.disabled = true;
      description.innerHTML = "TIME'S UP!!";
      doneButton.style.display = "none";
      nextButton.style.display = "flex"; // Show next button
      toggleModal(maliModal);
      answeredQuestions.push(currentQuestion); // Mark the question as answered
    }
  }, 1000);
}

// Display the next question
function displayNextQuestion() {
  clearInterval(timer); // Stop any previous timer
  startTimer(); // Restart the timer for the new question

  if (answeredQuestions.length === questions.length) {
    // End of game logic
    questionContainer.innerHTML = `Tapos na ang laro! 🎉 Ang iyong nakuha ay: ${points}/${questions.length}`;
    timerElement.style.display = "none";
    inputField.style.display = "none";
    doneButton.style.display = "none";
    nextButton.style.display = "none";

    const homeButton = document.createElement("a");
    homeButton.style.display = "inline-block";
    questionContainer.appendChild(homeButton);
    return;
  }

  questionContainer.innerHTML = "";
  correctTranslations.innerHTML = "";
  doneButton.style.display = "block";

  let questionIndex;
  do {
    questionIndex = Math.floor(Math.random() * questions.length);
  } while (answeredQuestions.includes(questions[questionIndex]));

  currentQuestion = questions[questionIndex];
  correctAnswer = answers[questionIndex];

  questionContainer.textContent = currentQuestion;

  inputField.value = "";
  inputField.disabled = false;
}

// Handle answer submission
function handleAnswer(userInput, correctAnswer, currentQuestion) {
  answeredQuestions.push(currentQuestion); // Mark the question as answered

  const correctAnswersLowerCase = correctAnswer.map((answer) =>
    answer.trim().toLowerCase()
  );

  console.log(userInput);
  console.log(correctAnswersLowerCase);

  let answerCorrect = false; // Flag to track if any answer matches

  // Iterate through each correct answer
  correctAnswersLowerCase.forEach(correctAnswer => {
    if (userInput === correctAnswer) {
      answerCorrect = true; // Set flag if match is found
    }
  });

  if (answerCorrect) {
    points++; // Increment points
    toggleModal(tamaModal);
    doneButton.style.display = "none";
  } else {
    toggleModal(maliModal);
    description.innerHTML = "MALI";
    correctTranslations.innerHTML = correctAnswer
      .map((answer) => `<p>${answer}</p>`)
      .join("");
    doneButton.style.display = "none";
  }
}


// Event listener for the "Done" button
doneButton.addEventListener("click", () => {
  const userInput = inputField.value.trim().toLowerCase();

  handleAnswer(userInput, correctAnswer, currentQuestion);
  doneButton.style.display = "none";
  nextButton.style.display = "flex";
});

// Event listeners for "Next" buttons in modals
document.querySelectorAll(".magpatuloy").forEach((button) => {
  button.addEventListener("click", () => {
    toggleModal(tamaModal, false);
    toggleModal(maliModal, false);
    displayNextQuestion();
  });
});

// Initialize the first question
displayNextQuestion();
