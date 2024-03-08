const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submitBtn");
const resetButton = document.getElementById("resetBtn");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const questionsCount = document.getElementById("questionsCount");
const resultContainer = document.getElementById("result");
const cancelButton = document.getElementById("cancelButton");
const modal = document.getElementById("modal");
const acceptButton = document.getElementById("acceptButton");
const closeButton = document.getElementById("close");
let currentQuestion = 0;
let score = 0;
let userAnswers = {};

function displayQuestionsLength() {
    questionsCount.innerHTML = `${currentQuestion + 1}/${questions.length}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleQuestionOptions() {
    shuffleArray(questions);
    questions.forEach(q => shuffleArray(q.options));
}

function displayQuestion() {
    const currentQ = questions[currentQuestion];
    let questionHTML = `
        <div class="question">
            <h3>${currentQuestion + 1})${currentQ.question}</h3>
            <div class="optionsContent">
    `;
    currentQ.options.forEach(option => {
        questionHTML += `
            <label>
                <input type="radio" name="answer" value="${option}" ${userAnswers[currentQuestion] === option ? 'checked' : ''}>
                <span id='optionValue'>${option}</span>
            </label>
        `;
    });
    questionHTML += `</div> </div>`;

    quizContainer.innerHTML = questionHTML;

    submitButton.style.display = currentQuestion === questions.length - 1 ? "flex" : "none";
}

function closeModal() {
    return modal.style.display = "none";
}

function openModal() {
    window.onclick = (event) => {
        if (event.target == modal) {
            closeModal();
        }
    }
    return modal.style.display = "flex";
}

acceptButton.addEventListener('click', resetQuiz);
cancelButton.addEventListener('click', closeModal);
closeButton.addEventListener('click', closeModal)


function displayResult() {
    tryAgainBtn.style.display = 'flex';
    resetButton.style.display = 'none';
    tryAgainBtn.addEventListener('click', tryAgainQuiz);


    if (score === 0) {
        resultContainer.style.border = '2px solid red';
        resultContainer.style.color = 'red';
        resultContainer.innerHTML = `You've not answered any questions, please try again!`;
    } else if (score > 0 && score <= 5) {
        resultContainer.innerHTML = `You got ${score} out of ${questions.length} questions correct. Go back to school`;
        resultContainer.style.border = '2px solid darkblue';
        resultContainer.style.color = 'darkblue';
    } else if (score > 5 && score <= 10) {
        resultContainer.innerHTML = `You got ${score} out of ${questions.length} questions correct. Not bad`;
        resultContainer.style.border = '2px solid blue';
        resultContainer.style.color = 'blue';
    } else if (score > 10 && score <= 13) {
        resultContainer.innerHTML = `You got ${score} out of ${questions.length} questions correct. Amazing! Keep going!`;
        resultContainer.style.border = '2px solid green';
        resultContainer.style.color = 'green';
    } else if (score >= 14) {
        resultContainer.innerHTML = `You got ${score} out of ${questions.length} questions correct. Perfect! Way to go!`;
        resultContainer.style.border = '2px solid lawngreen';
        resultContainer.style.color = 'lawngreen';
    }
    resultContainer.classList.add('result');
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestion] = selectedOption.value;
        const userAnswer = selectedOption.value;
        if (userAnswer === questions[currentQuestion].answer) {
            score += 1;
        }
    } else {
        resultContainer.style.textDecorationLine = 'underline';
        resultContainer.innerHTML = `Please answer (this/previous) question(s)!`;
    }
}

function goToNextQuestion() {
    setTimeout(() => {
        checkAnswer();
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
            displayQuestionsLength();
            prevButton.disabled = false;
        } else {
            currentQuestion = questions.length - 1;
            displayQuestionsLength();
        }
    }, 100);
}

function goToPreviousQuestion() {
    setTimeout(() => {
        currentQuestion--;
        if (currentQuestion >= 0) {
            displayQuestion();
            displayQuestionsLength();
            nextButton.disabled = false;
        } else {
            currentQuestion = 0;
            displayQuestionsLength();
            prevButton.disabled = true;
        }
    }, 100);
}

function tryAgainQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = {};
    shuffleQuestionOptions();
    displayQuestion();
    nextButton.disabled = false;
    prevButton.disabled = true;
    resultContainer.classList.add('hideResult');
    resultContainer.classList.remove('result');
    displayQuestionsLength();
    tryAgainBtn.style.display = 'none';
    resetButton.style.display = 'flex';
}

function resetQuiz() {
    score = 0;
    currentQuestion = 0;
    userAnswers = {};
    shuffleQuestionOptions();
    displayQuestion();
    nextButton.disabled = false;
    prevButton.disabled = true;
    resultContainer.classList.add('hideResult');
    resultContainer.classList.remove('result');
    displayQuestionsLength();
    modal.style.display = 'none';
}

function startQuiz() {
    shuffleQuestionOptions();
    displayQuestion();
    submitButton.addEventListener("click", () => {
        checkAnswer();
        displayResult();
    });
    resetButton.addEventListener("click", openModal);
    nextButton.addEventListener("click", goToNextQuestion);
    prevButton.addEventListener("click", goToPreviousQuestion);
    tryAgainBtn.style.display = 'none';
    prevButton.disabled = true;
    displayQuestionsLength();
}

document.addEventListener("DOMContentLoaded", startQuiz);
