const questionsDom = document.querySelector(".questions__box");
const nextBtn = document.getElementById("next__btn");
const quizePage = document.querySelector(".quize-page");
const questionNumberDom = document.querySelector(".questions__number");
const showScoreDom = document.querySelector(".show__score");
const finishBtn = document.getElementById("finish__btn");
const loader = document.querySelector(".loader");

let allQuize = [],
  questionNumber = 0,
  score = 0;

let level = JSON.parse(localStorage.getItem("level")) || "easy";
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

nextBtn.addEventListener("click", () => showQuize(allQuize[questionNumber]));

finishBtn.addEventListener("click", changePages);

async function fetchData() {
  try {
    const response = await fetch(URL);
    const { results } = await response.json();
    generateData(results);
    startGame();
  } catch (error) {
    window.location.replace("../pages/ErrorPage.html");
  }
}

async function startGame() {
  loader.style.display = "none";
  quizePage.style.display = "flex";
  showQuize(allQuize[questionNumber]);
}

function generateData(dataQuize) {
  dataQuize.forEach((res) => {
    const { correct_answer, incorrect_answers, question } = res;
    const [correctIndex, allAnswers] = randomAnswers(
      correct_answer,
      incorrect_answers
    );
    const quize = {
      question,
      correctAnswer: correct_answer,
      allAnswers,
      correctIndex,
    };
    allQuize = [...allQuize, quize];
  });
}

function showQuize(quize) {
  if (questionNumber > 9) {
    changePages();
    return;
  }

  questionNumber++;
  questionsDom.innerHTML = "";
  const { allAnswers, question, correctIndex } = quize;

  questionsDom.innerHTML = `<p id="question">${question}</p> 
                            <div id="answers">
                              <button data-id="0">${allAnswers[0]}</button>
                              <button data-id="1">${allAnswers[1]}</button>
                              <button data-id="2">${allAnswers[2]}</button>
                              <button data-id="3">${allAnswers[3]}</button>
                           </div>`;

  questionNumberDom.textContent = `${questionNumber} / 10`;

  const allAnswersButton = document.querySelectorAll("#answers button");
  allAnswersButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      checkeUserAnswer(e, correctIndex);
    });
  });
}

function randomAnswers(correct, inCorrects) {
  const randomIndex = Math.floor(Math.random() * 4);
  inCorrects.splice(randomIndex, 0, correct);
  return [randomIndex, inCorrects];
}

function changePages() {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.replace("../pages/lastPage.html");
}

function checkeUserAnswer(e, correctIndex) {
  const parentBtnsChildren = [...e.target.parentElement.children];
  const btnId = +e.target.dataset.id;

  parentBtnsChildren.forEach((btn) => (btn.disabled = true));

  if (btnId === correctIndex) {
    score += 10;
    showScoreDom.textContent = score;
    e.target.classList.add("corretAnswer");
  } else {
    const correctButton = parentBtnsChildren.find(
      (btn) => +btn.dataset.id === correctIndex
    );
    correctButton.classList.add("corretAnswer");
    e.target.classList.add("inCorrectAnswer");
  }
}

window.addEventListener("load", fetchData);
