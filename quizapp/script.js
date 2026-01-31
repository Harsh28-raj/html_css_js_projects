const questions = [
  {
    question: "In which year was the Blockchain Research Lab Centre of Excellence (BRLCoE) established at AKGEC?",
    answers: [
      { text: "2017", correct: false },
      { text: "2018", correct: false },
      { text: "2019", correct: true },
      { text: "2020", correct: false }
    ]
  },
  {
    question: "BRLCoE was set up in collaboration with which organization?",
    answers: [
      { text: "Infosys", correct: false },
      { text: "TCS", correct: false },
      { text: "DLT Labs", correct: true },
      { text: "Wipro", correct: false }
    ]
  },
  {
    question: "Which of the following is an annual workshop by BRLCoE in collaboration with DLT Labs?",
    answers: [
      { text: "BLOCKVERSE", correct: false },
      { text: "HASHEZ", correct: true },
      { text: "RELOAD", correct: false },
      { text: "TECHNIVAL", correct: false }
    ]
  },
  {
    question: "The project “VisionI” developed by BRL helps primarily which group?",
    answers: [
      { text: "Farmers", correct: false },
      { text: "Visually impaired individuals", correct: true },
      { text: "Students preparing for exams", correct: false },
      { text: "Programmers learning blockchain", correct: false }
    ]
  },
  {
    question: "Who is the Head of BRLCoE at AKGEC?",
    answers: [
      { text: "Prof. (Col) S.L. Kapoor", correct: false },
      { text: "Dr. R.K. Agarwal", correct: false },
      { text: "Dr. Aditya Pratap Singh", correct: true },
      { text: "Mr. Vivek Srivastava", correct: false }
    ]
  }
]

let qEl = document.getElementById("question")
let ansBtns = document.getElementById("answer-buttons")
let nextBtn = document.getElementById("next-btn")
let timerEl = document.getElementById("timer")
let progressEl = document.getElementById("progress")
let chartEl = document.getElementById("chart")

let qIndex = 0
let score = 0
let timer
let timeLeft = 30

function startQuiz() {
  qIndex = 0
  score = 0
  nextBtn.innerText = "Next"
  showQ()
}

function showQ() {
  reset()
  let currQ = questions[qIndex]
  qEl.innerHTML = (qIndex + 1) + ". " + currQ.question
  currQ.answers.forEach(a => {
    let btn = document.createElement("button")
    btn.innerHTML = a.text
    btn.classList.add("btn")
    ansBtns.appendChild(btn)
    if (a.correct) {
      btn.dataset.correct = a.correct
    }
    btn.addEventListener("click", selectAns)
  })
  startTimer()
  updateProgress()
}

function reset() {
  clearInterval(timer)
  timeLeft = 30
  timerEl.innerText = "Time: " + timeLeft
  nextBtn.style.display = "none"
  while (ansBtns.firstChild) {
    ansBtns.removeChild(ansBtns.firstChild)
  }
}

function selectAns(e) {
  let clickedBtn = e.target
  let correct = clickedBtn.dataset.correct === "true"
  if (correct) {
    clickedBtn.classList.add("correct")
    score++
  } else {
    clickedBtn.classList.add("incorrect")
  }
  Array.from(ansBtns.children).forEach(b => {
    if (b.dataset.correct === "true") {
      b.classList.add("correct")
    }
    b.disabled = true
  })
  clearInterval(timer)
  nextBtn.style.display = "block"
}

function showScore() {
  reset()
  qEl.innerText = "You scored " + score + " out of " + questions.length + "!"
  nextBtn.innerText = "Play Again"
  nextBtn.style.display = "block"
  renderChart()
}

function nextQ() {
  qIndex++
  if (qIndex < questions.length) {
    showQ()
  } else {
    showScore()
  }
}

nextBtn.addEventListener("click", function() {
  if (qIndex < questions.length) {
    nextQ()
  } else {
    startQuiz()
  }
})

function startTimer() {
  timer = setInterval(() => {
    timeLeft--
    timerEl.innerText = "Time: " + timeLeft
    if (timeLeft <= 0) {
      clearInterval(timer)
      Array.from(ansBtns.children).forEach(b => b.disabled = true)
      nextBtn.style.display = "block"
    }
  }, 1000)
}

function updateProgress() {
  let percent = ((qIndex) / questions.length) * 100
  progressEl.style.width = percent + "%"
}

function renderChart() {
  chartEl.innerHTML = ""
  let bar = document.createElement("div")
  bar.style.width = (score / questions.length) * 100 + "%"
  bar.style.height = "30px"
  bar.style.background = "limegreen"
  chartEl.appendChild(bar)
}

startQuiz()
