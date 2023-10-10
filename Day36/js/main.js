// import animate from "./animate.js";
import { config } from "./config.js";
import { client } from "./client.js";
const loading = document.querySelector(".loading-container");
const audio = document.querySelector(".audio");

let numberQuestion = 1;
let isCorrect = false;
let numberIsChecked = 0;
let score = 0;
let answerArr = [];
let numberOfCorrectAnswer = 0;
let numberOfInCorrectAnswer = 0;
let timeOutId;
let isNext = false;
const getData = async (resource = "questions", query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    const { response, data } = await client.get(`/${resource}?${queryString}`);
    return data;
};

const addData = async (resource = "questions", data = {}) => {
    const { response, result } = await client.post(`/${resource}`, data);
    return result;
};
const questionData = getData();
function animate() {
    const startBtn = document.querySelector(".start-btn");
    const actionContainer = document.querySelector(".action-container");
    const quizContainer = document.querySelector(".quiz-container");
    const backBtn = document.querySelector(".back-btn");

    const submitNameBtn = document.querySelector(".submit-name-btn");
    startBtn.addEventListener("click", () => {
        actionContainer.classList.add("hide");
        quizContainer.classList.remove("hide");
        quizContainer.classList.add("animate__bounceInLeft");
        quizContainer.classList.remove("animate__backOutLeft");
    });

    backBtn.addEventListener("click", () => {
        actionContainer.classList.remove("hide");
        quizContainer.classList.add("animate__backOutLeft");
        quizContainer.classList.remove("animate__bounceInLeft");
    });
    //Submit name
    submitNameBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const nameInput = document.querySelector(".name-input");
        const name = nameInput.value;
        if (name) {
            loading.classList.remove("hide");
            addData("user_question", {
                nickname: name,
            });
            loading.classList.add("hide");
            document.querySelector(".question-list").classList.remove("hide");
            countdownTimer();
        }
    });
}

animate();

function renderQuestion() {
    const questionList = document.querySelector(".question-list");
    questionList.innerHTML = "";
    questionData.then((data) => {
        data.forEach((question, index) => {
            // question-item
            const questionItem = document.createElement("div");
            questionItem.classList.add("question-item");
            questionList.appendChild(questionItem);
            // question-container
            const questionContainer = document.createElement("div");
            questionContainer.classList.add("question-container");
            questionItem.appendChild(questionContainer);
            // question-header
            const questionHeader = document.createElement("div");
            questionHeader.classList.add("question-header");
            questionContainer.appendChild(questionHeader);
            // quantity-question
            const quantityQuestion = document.createElement("div");
            quantityQuestion.classList.add("quantity-question");
            quantityQuestion.innerHTML = `${++index}/${data.length}`;
            questionHeader.appendChild(quantityQuestion);
            // score-container
            const scoreContainer = document.createElement("div");
            scoreContainer.classList.add("score-container");
            scoreContainer.innerHTML = `Score: <span class="score">0</span>`;
            questionHeader.appendChild(scoreContainer);
            // line-countdown
            const countdown = document.createElement("div");
            countdown.classList.add("countdown");
            const countdownTimer = document.createElement("div");
            countdownTimer.classList.add("countdown-timer");
            countdown.appendChild(countdownTimer);
            const progressBar = document.createElement("div");
            progressBar.classList.add("progress-bar");
            countdown.appendChild(progressBar);
            const progress = document.createElement("div");
            progress.classList.add("progress");
            progress.id = "progress";
            progressBar.appendChild(progress);
            questionContainer.appendChild(countdown);

            questionContainer.appendChild(countdown);
            // question
            const questionText = document.createElement("p");
            questionText.classList.add("question");
            questionText.innerHTML = `${question.question}`;
            if (question.correct_answers.length >= 2) {
                const questionNote = document.createElement("p");
                questionNote.classList.add("question-note");
                questionNote.innerHTML = `Note: Bạn có thể chọn nhiều đáp án`;
                questionText.appendChild(questionNote);
            }
            questionContainer.appendChild(questionText);
            // answer-container
            const answerContainer = document.createElement("div");
            answerContainer.classList.add("answer-container");
            questionContainer.appendChild(answerContainer);
            question.options.forEach((option, index) => {
                // answer
                const answer = document.createElement("div");
                answer.classList.add("answer");
                answer.innerHTML = `${option}`;
                answer.setAttribute("data-index", index);
                answerContainer.appendChild(answer);
            });
            questionList.appendChild(questionItem);
        });
        const resultPage = document.createElement("div");
        resultPage.classList.add("result-page");
        resultPage.classList.add("question-item");
        // question-container
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");
        resultPage.appendChild(questionContainer);
        questionList.appendChild(resultPage);

        chooseAnswer();
    });
}

renderQuestion();

function chooseAnswer() {
    const answerBtns = document.querySelectorAll(".answer");
    answerBtns.forEach((answerBtn) => {
        answerBtn.addEventListener("click", (e) => {
            const el = e.target;
            answerArr.push(el.innerHTML);
            numberIsChecked++;

            questionData.then((data) => {
                let numberOfAnswers =
                    data[numberQuestion - 1].correct_answers.length;
                if (
                    data[numberQuestion - 1].correct_answers.includes(
                        el.innerHTML
                    )
                ) {
                    el.classList.add("correct");
                    isCorrect = true;
                } else {
                    isCorrect = false;
                    el.classList.add("incorrect");
                    if (audio.src !== "./sound/incorrect.mp3") {
                        audio.src = "./sound/incorrect.mp3";
                    }
                    audio.play();
                    numberOfInCorrectAnswer++;
                    if (!isNext) {
                        nextSlide();
                    }
                    isNext = true;
                    return;
                }
                if (numberIsChecked === numberOfAnswers) {
                    if (isCorrect) {
                        score += 100;
                        const scoreContainer =
                            document.querySelectorAll(".score-container");
                        scoreContainer.forEach((scoreContainer) => {
                            scoreContainer.innerHTML = `Score: <span class="score">${score}</span>`;
                        });
                        if (audio.src !== "./sound/correct.mp3") {
                            audio.src = "./sound/correct.mp3";
                        }
                        audio.play();
                        numberOfCorrectAnswer++;
                    } else {
                        if (audio.src !== "./sound/incorrect.mp3") {
                            audio.src = "./sound/incorrect.mp3";
                        }
                        audio.play();
                        numberOfInCorrectAnswer++;
                    }
                    if (!isNext) {
                        nextSlide();
                    }
                    isNext = true;
                }
            });
        });
    });
}

function nextSlide() {
    setTimeout(() => {
        document.querySelector(
            ".question-list"
        ).style.transform = `translateX(-${numberQuestion * 100}vw)`;
        numberQuestion++;
        answerArr = [];
        numberIsChecked = 0;
        isCorrect = false;
        countdownTimer();
        isNext = false;
    }, 500);
}
function countdownTimer() {
    if (timeOutId) {
        clearTimeout(timeOutId);
    }
    let secondsLeft = 10;

    const progressElement = document.querySelectorAll(".progress");

    function updateProgressBar() {
        const progressWidth = (secondsLeft / 10) * 100;
        progressElement.forEach((progress) => {
            progress.style.width = progressWidth + "%";
        });
    }

    function countdown() {
        updateProgressBar();
        questionData.then((data) => {
            if (numberQuestion > data.length) {
                renderResult();
                return;
            }
            if (secondsLeft > 0) {
                secondsLeft--;
                timeOutId = setTimeout(countdown, 1000);
            } else {
                nextSlide();
            }
        });
    }

    countdown();
}

function renderResult() {
    const resultPage = document.querySelector(".result-page");
    questionData.then((data) => {
        const html = `
            <div class="question-container">
                <h2>Result</h2>
                <div class="result-list">
                    <div class="result-item">
                    <p class="result-text">${score}</p>
                    <p class="result-title">Score</p>
                    </div>
                    <div class="result-item">
                    <p class="result-text">${data.length}</p>
                    <p class="result-title">Total Question</p>
                    </div>
                    <div class="result-item">
                    <p class="result-text">${numberOfInCorrectAnswer}</p>
                    <p class="result-title">Incorrect</p>
                    </div>
                    <div class="result-item">
                    <p class="result-text">${numberOfCorrectAnswer}</p>
                    <p class="result-title">Correct</p>
                    </div>
                </div>
            </div>
    `;
        resultPage.innerHTML = html;
    });
}
