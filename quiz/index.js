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

const totalQuestionsSpan = document.getElementById('total-questions'); 
const currentQuestionNumber = document.getElementById('current-question-num');


function loadQuestion(index) {
    if (index >= quizData.length || index < 0) {
        questionText.textContent = "Brak pytania o tym indeksie.";
        return;
    }

    const currentQuestion = quizData[index];
    
    questionText.textContent = currentQuestion.question;

    answerFields.A.textContent = currentQuestion.answers.A;
    answerFields.B.textContent = currentQuestion.answers.B;
    answerFields.C.textContent = currentQuestion.answers.C;
    answerFields.D.textContent = currentQuestion.answers.D;
    
    if (totalQuestionsSpan) totalQuestionsSpan.textContent = quizData.length;
    if (currentQuestionNumber) currentQuestionNumber.textContent = index + 1;
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(0);
});
