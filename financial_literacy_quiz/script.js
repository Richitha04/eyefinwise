const questions = [
    {
        question: "What is the 50/30/20 rule in budgeting?",
        answers: [
            { text: "50% on savings, 30% on needs, 20% on wants", correct: false },
            { text: "50% on needs, 30% on wants, 20% on savings", correct: true },
            { text: "50% on wants, 30% on needs, 20% on savings", correct: false },
            { text: "50% on needs, 20% on wants, 30% on savings", correct: false }
        ],
        improvement: "Learn more about budgeting strategies like the 50/30/20 rule."
    },
    {
        question: "How often should you review your budget?",
        answers: [
            { text: "Monthly", correct: true },
            { text: "Quarterly", correct: false },
            { text: "Annually", correct: false },
            { text: "Only when there's a financial problem", correct: false }
        ],
        improvement: "Make it a habit to review your budget monthly to stay on track."
    },
    {
        question: "Which of the following is NOT a fixed expense?",
        answers: [
            { text: "Rent", correct: false },
            { text: "Car Payment", correct: false },
            { text: "Utility bill", correct: true },
            { text: "Gym membership", correct: false }
        ],
        improvement: "Understand the difference between fixed and variable expenses."
    },
    {
        question: "What is a good debt-to-income (DTI) ratio?",
        answers: [
            { text: "Below 20%", correct: false },
            { text: "Below 50%", correct: false },
            { text: "Above 50%", correct: false },
            { text: "Below 36%", correct: true }
        ],
        improvement: "Aim to keep your DTI below 36% for better financial health."
    },
    {
        question: "What is the best strategy for paying off multiple debts?",
        answers: [
            { text: "Pay off the smallest debt first (Debt Snowball)", correct: false },
            { text: "Pay off the highest-interest debt first (Debt Avalanche)", correct: true },
            { text: "Pay off all debts equally at the same time", correct: false },
            { text: "Only pay the minimum balance on all debts", correct: false }
        ],
        improvement: "Consider using the Debt Avalanche method to save on interest."
    },
    {
        question: "What happens if you miss a credit card payment?",
        answers: [
            { text: "Nothing", correct: false },
            { text: "Your credit score may drop", correct: true },
            { text: "The debt disappears", correct: false },
            { text: "Your credit limit increases", correct: false }
        ],
        improvement: "Always try to make at least the minimum payment on time."
    },
    {
        question: "What is an emergency fund?",
        answers: [
            { text: "Money set aside for future investment", correct: false },
            { text: "Money used for everyday expenses", correct: false },
            { text: "A type of retirement account", correct: false },
            { text: "Money reserved for unexpected expenses", correct: true }
        ],
        improvement: "Aim to save 3-6 months' worth of expenses in your emergency fund."
    },
    {
        question: "How much of your income should ideally be saved for an emergency fund?",
        answers: [
            { text: "3-6 months’ worth of living expenses", correct: true },
            { text: "1 month’s worth of living expenses", correct: false },
            { text: "1 year’s worth of living expenses", correct: false },
            { text: "No savings required if you have insurance", correct: false }
        ],
        improvement: "Regularly contribute to your emergency fund to reach this goal."
    },
    {
        question: "Which investment option typically carries the lowest risk?",
        answers: [
            { text: "Stocks", correct: false },
            { text: "Bonds", correct: false },
            { text: "Mutual Funds", correct: false },
            { text: "Savings Accounts", correct: true }
        ],
        improvement: "Understand the risk associated with different types of investments."
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const feedbackElement = document.createElement("div");
document.querySelector(".quiz").appendChild(feedbackElement);

// Progress bar elements
const progressBar = document.getElementById("progress-bar");
const progressBarFill = document.getElementById("progress-bar-fill");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    feedbackElement.innerHTML = ""; // Clear previous feedback
    nextButton.style.display = "none";
    submitButton.style.display = "block";
    updateProgressBar();
    showQuestion();
}

function showQuestion() {
    answerButtons.innerHTML = '';
    selectedAnswer = null;

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer));
        answerButtons.appendChild(button);
    });

    submitButton.style.display = "block";
}

function selectAnswer(button, answer) {
    selectedAnswer = answer;
    const allButtons = answerButtons.querySelectorAll(".btn");
    allButtons.forEach(btn => {
        btn.classList.remove("selected"); // Remove highlight from all buttons
    });
    button.classList.add("selected"); // Highlight the chosen option
}

submitButton.addEventListener("click", () => {
    if (selectedAnswer) {
        evaluateAnswer(selectedAnswer);
        if (selectedAnswer.correct) {
            score++; // Increment score for correct answer
        }
        submitButton.style.display = "none"; // Hide the submit button
        nextButton.style.display = "block"; // Show the next button
    }
});

function evaluateAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];

    currentQuestion.answers.forEach(ans => {
        const button = Array.from(answerButtons.children).find(btn => btn.innerHTML === ans.text);
        if (ans.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
    });

    // Display feedback
    feedbackElement.innerHTML = answer.correct 
        ? "Correct!" 
        : `Incorrect! The correct answer is: ${currentQuestion.answers.find(ans => ans.correct).text}`;
}

nextButton.addEventListener("click", () => {
    feedbackElement.innerHTML = ''; // Clear feedback when moving to the next question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        nextButton.style.display = "none";
        showQuestion();
        updateProgressBar(); // Update progress bar on next only if not last question
    } else {
        showScore();
    }
});

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = `${progress}%`;
}

function showScore() {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    answerButtons.innerHTML = ''; // Clear the answer buttons
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    feedbackElement.innerHTML = ''; // Clear feedback

    const feedback = getFeedback();
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `<h3>Feedback:</h3><p>${feedback}</p>`;
    document.querySelector(".quiz").appendChild(resultElement);
}

function getFeedback() {
    let improvementAreas = [];
    questions.forEach((question, index) => {
        const answerGiven = document.querySelector(`.btn.selected`);
        if (!question.answers.find(ans => ans.correct && answerGiven && answerGiven.innerHTML === ans.text)) {
            improvementAreas.push(question.improvement);
        }
    });

    return improvementAreas.length > 0 
        ? "You may need to improve in the following areas:<br>" + improvementAreas.join("<br>") 
        : "Great job! You have a solid understanding of financial concepts.";
}

startQuiz();
