const quizData = [
    {
        question: "1. Jaki jest największy ocean na Ziemi?",
        answers: {
            A: "Ocean Atlantycki",
            B: "Ocean Spokojny",
            C: "Ocean Indyjski",
            D: "Ocean Arktyczny"
        },
        correctAnswer: "B"
    },
    {
        question: "2. Ile planet znajduje się w naszym Układzie Słonecznym?",
        answers: {
            A: "7",
            B: "8",
            C: "9",
            D: "10"
        },
        correctAnswer: "B"
    },
    {
        question: "3. Jaka jest stolica Japonii?",
        answers: {
            A: "Seul",
            B: "Pekin",
            C: "Tokio",
            D: "Bangkok"
        },
        correctAnswer: "C"
    },
    {
        question: "4. Kto namalował 'Monę Lisę'?",
        answers: {
            A: "Pablo Picasso",
            B: "Vincent van Gogh",
            C: "Claude Monet",
            D: "Leonardo da Vinci"
        },
        correctAnswer: "D"
    },
    {
        question: "5. Jaki pierwiastek chemiczny ma symbol 'Fe'?",
        answers: {
            A: "Fosfor",
            B: "Fluor",
            C: "Żelazo",
            D: "Złoto"
        },
        correctAnswer: "C"
    },
    {
        question: "6. Najwyższy szczyt świata to Mount Everest. Gdzie się znajduje?",
        answers: {
            A: "Andy",
            B: "Alpy",
            C: "Himalaje",
            D: "Kordyliery"
        },
        correctAnswer: "C"
    },
    {
        question: "7. W którym roku człowiek po raz pierwszy wylądował na Księżycu?",
        answers: {
            A: "1965",
            B: "1969",
            C: "1971",
            D: "1975"
        },
        correctAnswer: "B"
    },
    {
        question: "8. Walutą jakiego kraju jest Rubel?",
        answers: {
            A: "Polska",
            B: "Rosja",
            C: "Ukraina",
            D: "Białoruś"
        },
        correctAnswer: "B"
    },
    {
        question: "9. Jak nazywa się największa pustynia na świecie?",
        answers: {
            A: "Pustynia Gobi",
            B: "Pustynia Kalahari",
            C: "Pustynia Arabska",
            D: "Sahara"
        },
        correctAnswer: "D"
    },
    {
        question: "10. Ile zębów ma dorosły człowiek (wliczając zęby mądrości)?",
        answers: {
            A: "28",
            B: "30",
            C: "32",
            D: "36"
        },
        correctAnswer: "C"
    }
];

const questionText = document.getElementById('question');
const answerFields = {
    A: document.getElementById('ansA'),
    B: document.getElementById('ansB'),
    C: document.getElementById('ansC'),
    D: document.getElementById('ansD')
};

const answerButtons = {
    A: document.getElementById('btnA'),
    B: document.getElementById('btnB'),
    C: document.getElementById('btnC'),
    D: document.getElementById('btnD')
}


const totalQuestionsSpan = document.getElementById('total-questions'); 
const currentQuestionNumber = document.getElementById('current-question-num');
const scoreID = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn")

let currentIndex = 0;
let score = 0;
let answerSelected = false;

function showResults() {
    document.querySelector('.quiz-container').innerHTML = `
        <h2>Quiz Zakończony!</h2>
        <p class="final-score">Twój wynik to ${score} na ${quizData.length} możliwych punktów.</p>
        <button onclick="location.reload()" class="restart-btn">Graj dalej</button>
    `;
}

function loadQuestion(index) {
    if (index >= quizData.length) {
            showResults();
            return;
        }

    Object.keys(answerButtons).forEach(letter => {
        answerButtons[letter].disabled = false;
        answerButtons[letter].style.backgroundColor = "";
    });

    answerSelected = false;
    nextBtn.disabled = true;

    const currentQuestion = quizData[index];
    
    questionText.textContent = currentQuestion.question;

    answerFields.A.textContent = currentQuestion.answers.A;
    answerFields.B.textContent = currentQuestion.answers.B;
    answerFields.C.textContent = currentQuestion.answers.C;
    answerFields.D.textContent = currentQuestion.answers.D;
    
    if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizData.length;
    if (currentQuestionNumber) currentQuestionNumber.textContent = index + 1;
}


function checkAnswer(selected){
    const currentQuestion = quizData[currentIndex];
    if(selected == currentQuestion.correctAnswer){
         answerButtons[selected].style.backgroundColor = "lightgreen";
        score +=1;
    }else{
         answerButtons[selected].style.backgroundColor = "salmon";
    }
    
    Object.keys(answerButtons).forEach(letter => {
        answerButtons[letter].disabled = true;
    });

    scoreID.textContent = score;

    answerSelected = true;
    nextBtn.disabled = false;
}

function nextQuestionIndex(index){
    return index+1;
}

function nextQuestion() {
    if (!answerSelected) return;
    currentIndex = nextQuestionIndex(currentIndex);
    loadQuestion(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(0);

    Object.keys(answerFields).forEach(letter => {
        answerButtons[letter].addEventListener('click', () => {
            checkAnswer(letter);
        });
    });

    nextBtn.addEventListener('click', nextQuestion);
});
