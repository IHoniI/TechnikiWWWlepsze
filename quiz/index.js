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

let quizData = [];

// wczytywanie danych z pliku
// funkcja asynchroniczna zwraca Promise
async function loadQuizData() {
  try {
    const response = await fetch('quiz_data.json');

    quizData = await response.json(); // zamiana JSON na obiekt JS
    console.log("Wczytano pytania:", quizData);
    loadQuestion(0);
  } catch (err) {
    console.error("Nie udało się wczytać quizu:", err);
  }
}


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
    loadQuizData().then(() => {
        Object.keys(answerButtons).forEach(letter => {
            answerButtons[letter].addEventListener('click', () => {
                checkAnswer(letter);
            });
        });
        nextBtn.addEventListener('click', nextQuestion);
    }).catch(err => { 
        console.log("pojawił się błąd: ", err);
    }).finally( () => {
        console.log("Koniec");
    });
});
