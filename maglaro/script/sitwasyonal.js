const tamaModal = document.querySelector(".tama");
const maliModal = document.querySelector(".mali");

let answeredQuestions = [];
let points = 0;

const questionContainer = document.querySelector("#question-container");
const techniquesContainer = document.querySelector("#techniques-container");
const explanationContainer = document.querySelector("#explanation-container");
const chosenContainer = document.querySelector("#chosen-container");

const overlay = document.querySelector(".overlay");
const correctExplanation = document.querySelector(".explanations");
const maliType = document.querySelector(".type");
const nextButton = document.querySelector(".next-button");

let chosenTechnique = null;
let chosenExplanation = null;
let currentQuestion = null;

// Toggle modal visibility
function toggleModal(modal, show = true) {
  techniquesContainer.style.display = "none";
  modal.style.display = show ? "flex" : "none";
  overlay.style.display = show ? "block" : "none";
}

// Display the next question
function displayNextQuestion() {
  if (answeredQuestions.length === data.length) {
    questionContainer.style.marginLeft = "0vw";
    chosenContainer.style.marginLeft = "0vw";
    questionContainer.innerHTML = "<h2>Tapos na ang Laro! 🎉</h2>";
    chosenContainer.innerHTML = `Ang iyong puntos: ${points}`;
    techniquesContainer.innerHTML = "";
    explanationContainer.innerHTML = "";
    nextButton.style.display = "none";
    return;
  }

  // Reset containers for the new question
  questionContainer.innerHTML = "";
  chosenContainer.innerHTML = "";
  techniquesContainer.innerHTML = "";
  explanationContainer.innerHTML = "";
  explanationContainer.style.display = "none";
  chosenContainer.style.display = "none";
  techniquesContainer.style.display = "flex";

  // Get a random question
  let pointer;
  do {
    pointer = Math.floor(Math.random() * data.length);
  } while (answeredQuestions.includes(pointer));
  answeredQuestions.push(pointer);

  currentQuestion = data[pointer];
  questionContainer.textContent = currentQuestion.question;

  // Populate techniques buttons
  currentQuestion.techniques.forEach((technique, index) => {
    const button = document.createElement("button");
    button.className = "technique";
    button.textContent = technique;
    button.dataset.index = index;
    techniquesContainer.appendChild(button);
  });

  // Populate explanations buttons
  currentQuestion.explanations.forEach((explanation, index) => {
    const button = document.createElement("button");
    button.className = "explanation";
    button.textContent = explanation;
    button.dataset.index = index;
    explanationContainer.appendChild(button);
  });
}

// Handle answer submission
function handleAnswer() {
  const techniqueIsCorrect = chosenTechnique === currentQuestion.correctTechnique;
  const explanationIsCorrect = chosenExplanation === currentQuestion.correctExplanation;

  correctExplanation.textContent = currentQuestion.correctExplanation;

  if (techniqueIsCorrect && explanationIsCorrect) {
    toggleModal(tamaModal);
    points++;
  } else if (techniqueIsCorrect) {
    toggleModal(maliModal);
    maliType.textContent =
      "Partially Correct! The technique is right but the explanation is wrong.";
  } else if(explanationIsCorrect){
    toggleModal(maliModal);
    "Partially Correct! The explanation is right but the technique is wrong.";
  }
  else {
    toggleModal(maliModal);
    maliType.textContent =
      "Wrong! Both technique and explanation are incorrect.";
  }
}

// Attach event listeners for modal buttons
document.querySelectorAll(".magpatuloy").forEach((button) => {
  button.addEventListener("click", () => {
    toggleModal(tamaModal, false);
    toggleModal(maliModal, false);
    displayNextQuestion();
  });
});

// Attach event listener for technique choices
techniquesContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("technique")) {
    chosenTechnique = event.target.textContent;
    chosenContainer.innerHTML = chosenTechnique;
    techniquesContainer.style.display = "none";
    explanationContainer.style.display = "flex";
    chosenContainer.style.display = "flex";
  }
});

// Attach event listener for explanation choices
explanationContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("explanation")) {
    chosenExplanation = event.target.textContent;
    handleAnswer();
  }
});

// Initialize the quiz
displayNextQuestion();
