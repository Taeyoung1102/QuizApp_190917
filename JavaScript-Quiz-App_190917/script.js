const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')



let shuffledQuestions, currentQuestionIndex



//select
const counter = document.getElementById('counter')
const timeGauge = document.getElementById('timeGauge')
const progress = document.getElementById('progress')
const scoreDiv = document.getElementById('scoreContainer')
//create variables
const lastQuestion = 3
let count = 0
const questionTime = 10
const gaugeWidth = 150
const gaugeUnit = gaugeWidth/questionTime
let TIMER
let score = 0 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  count = 0;
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
 
}
// render progress
function renderProgress(){
  for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
      progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
  }
}
// counter render

function renderCounter(){
  if(count <= questionTime){
      counter.innerHTML = count;
      timeGauge.style.width = count * gaugeUnit + "px";
      count++
  } else{
      count = 0;
      // change progress color to red
      answerIsWrong();
      if(currentQuestionIndex < lastQuestion){
        currentQuestionIndex++
        setNextQuestion()
      }else{
          // end the quiz and show the score
          clearInterval(TIMER);
          scoreRender();
      }
  }
}
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  setStatusClass(document.getElementById(currentQuestionIndex), correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (lastQuestion > currentQuestionIndex) {
    nextButton.classList.remove('hide')
  } else {
    questionContainerElement.classList.add('hide')
    clearInterval(TIMER);
        scoreRender();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    score ++
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
//prog
function answerIsCorrect() {
  document.getElementById(currentQuestionIndex).classList.add('correct')
}
function answerIsWrong() {
  document.getElementById(currentQuestionIndex).classList.add('wrong')
}
// score render
function scoreRender(){
  scoreDiv.style.display = "block";
  
  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round(100 * score/12);
  // score/ lastQ *3 


  // choose the image based on the scorePerCent
  let img = (scorePerCent >= 80) ? "img/5.png" :
            (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
            (scorePerCent >= 20) ? "img/2.png" :
            "img/1.png";
  
  scoreDiv.innerHTML = "<img src="+ img +">";
  scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

const questions = [
  {
    question: '질문예시입니다. 1',
    answers: [
      { text: '정답', correct: true },
      { text: '오답', correct: false }
    ]
  },
  {
    question: '질문예시입니다. 2',
    answers: [
      { text: '정답', correct: true },
      { text: '오답', correct: false },
      { text: '오답', correct: false },
      { text: '오답', correct: false }
    ]
  },
  {
    question: '질문예시입니다. 3',
    answers: [
      { text: '오답', correct: false },
      { text: '정답', correct: true },
      { text: '오답', correct: false },
      { text: '오답', correct: false }
    ]
  },
  {
    question: '질문예시입니다. 4',
    answers: [
      { text: '오답', correct: false },
      { text: '정답', correct: true }
    ]
  }
]
