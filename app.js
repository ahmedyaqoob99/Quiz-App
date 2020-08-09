const startButton = document.getElementById('start-btn')
startButton.addEventListener('click', start)

const nextButton = document.getElementById('next-btn')
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    next()
})

const questionContainer = document.getElementById('question-container')
let shuffledQuestion, currentQuestionIndex

const questionElement = document.getElementById('question')
const answerElement = document.getElementById('answer')

function start() {
    startButton.classList.add('hide')
    shuffledQuestion = questions.sort(() => Math.random - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    next()
}

function next() {
    reset()
    show(shuffledQuestion[currentQuestionIndex])
}

function selectAnswer(e) {
    const selected = e.target
    const correct = selected.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Finish"
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(e) {
    e.classList.remove('correct')
    e.classList.remove('wrong')
}

function reset() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild)
    }
}

const questions = [{
    question: 'What is 2+2',
    answers: [
        { text: '4', correct: true },
        { text: '8', correct: false },
        { text: '44', correct: false },
        { text: '22', correct: false }
    ]
}, {
    question: 'What is Javascript',
    answers: [
        { text: 'Front End', correct: false },
        { text: 'Client Side', correct: true },
        { text: 'Server Side', correct: false },
        { text: 'Back End', correct: false }
    ]
}, {
    question: 'What is ReactJs',
    answers: [
        { text: 'Framework', correct: true },
        { text: 'CMS', correct: false },
        { text: 'IDE', correct: false }, { text: 'Platform', correct: false }
    ]
}]


function show(ques) {
    questionElement.innerText = questions.question
    questions.question.answers.forEach(answer => {
        const button = document.createElement('Button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerElement.appendChild(button)
    });
}