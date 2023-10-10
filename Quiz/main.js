const questions = [
    {
        question: "What is 2 + 2?",
        options: ["A) 3", "B) 4", "C) 5"],
        correctIndex: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["A) Earth", "B) Mars", "C) Venus"],
        correctIndex: 1
    },
    {
        question: "What is the capital of France?",
        options: ["A) Berlin", "B) Madrid", "C) Paris"],
        correctIndex: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");

function displayQuestion() {
    const currentQuestionData = questions[currentQuestion];
    questionElement.textContent = "Question " + (currentQuestion + 1) + ": " +  currentQuestionData.question;
    
    optionsElement.innerHTML = "";
    currentQuestionData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.textContent = option;
        optionElement.className = "option";
        optionElement.dataset.index = index;
        optionElement.addEventListener("click", handleOptionClick);
        optionsElement.appendChild(optionElement);
    });
}

function handleOptionClick(event) {
    const selectedOptionIndex = parseInt(event.target.dataset.index);
    const currentQuestionData = questions[currentQuestion];

    if (selectedOptionIndex === currentQuestionData.correctIndex) {
        feedbackElement.textContent = "Correct!";
        score++;
    } else if (selectedOptionIndex !== currentQuestionData.correctIndex) {
        feedbackElement.textContent = "Incorrect. The correct answer was " + currentQuestionData.options[currentQuestionData.correctIndex];
    }

    optionsElement.querySelectorAll(".option").forEach(option => {
        option.removeEventListener("click", handleOptionClick);
        option.style.cursor = "not-allowed";
    });

}

submitButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        feedbackElement.textContent = "";
        submitButton.disabled = false;
    } else {
        questionElement.textContent = "Quiz Complete!";
        optionsElement.innerHTML = "";
        feedbackElement.textContent = "Your Score: " + score + " out of " + questions.length;
        submitButton.style.display = "none";
    }
});

displayQuestion();