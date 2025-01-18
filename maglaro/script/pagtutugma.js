

let answeredQuestions = [];
let previousQuestionIndex = null;
let points = 0;
let currentQuestion;

const questionContainer = document.querySelector(".question-container");
const choicesContainer = document.querySelector(".choices-container");
const explanationContainer = document.querySelector(".explanations");
const tamaModal = document.querySelector(".tama");
const maliModal = document.querySelector(".mali");
const overlay = document.querySelector(".overlay");


function toggleModal(modal, show = true) {
    modal.style.display = show ? "flex" : "none";
    overlay.style.display = show ? "block" : "none";
}

function displayNextQuestion() {
    if (answeredQuestions.length === data.length) {
        questionContainer.innerHTML = `
            <div>Tapos na ang laro 🎉</div>
            <div>Ang iyong nakuha ay <strong>${points}</strong> mula sa <strong>${data.length} na tanonog</strong>.</div>
        `;
        choicesContainer.innerHTML = ""; // Clear other containers
        explanationContainer.innerHTML = "";
        nextButton.style.display = "none"; // Hide the next button if applicable
        return;
    }


    let chosenAnswer;

    questionContainer.innerHTML = "";
    choicesContainer.innerHTML = "";

    let questionIndex;
    do {
        questionIndex = Math.floor(Math.random() * data.length);
    } while (answeredQuestions.includes(questionIndex) || questionIndex === previousQuestionIndex);
    console.log(questionIndex)

    let currentQuestion = data[questionIndex];

    
    questionContainer.textContent = currentQuestion.question;

    currentQuestion.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.className = "choice"
        button.textContent = choice;
        choicesContainer.appendChild(button);

        button.addEventListener("click", () => {
            chosenAnswer = choice;
            handleAnswer(chosenAnswer, questionIndex, currentQuestion);
        })
    })

}

function handleAnswer(chosenAnswer, questionIndex, currentQuestion) {
    if (chosenAnswer === currentQuestion.correctChoice) {
        points++
        toggleModal(tamaModal);
    } else {
        explanationContainer.textContent = currentQuestion.explanation;
        toggleModal(maliModal);
    }
    answeredQuestions.push(questionIndex);
}

document.querySelectorAll(".magpatuloy").forEach(button => {
    button.addEventListener("click", () => {
        toggleModal(tamaModal, false);
        toggleModal(maliModal, false);
        displayNextQuestion();
    });
});

displayNextQuestion();
