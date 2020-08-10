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

function show(ques) {

    questionElement.innerText = ques.question
    for (let i = 0; i < ques.answers.length; i++) {
        const button = document.createElement('Button')
        button.setAttribute("value", ques.answers[i].correct)
        button.innerText = ques.answers[i].text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerElement.appendChild(button)
    }
}

function selectAnswer(e) {
    const selected = e.target
    console.log(selected.dataset)
    const correct = selected.getAttribute("value")
    setStatusClass(selected, correct)

    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Finish"
        startButton.classList.remove('hide')
        questionElement.innerText = "You Get '" + rightAns + "' Right Answers or '" + wrongAns + "' Wrong"
        reset()
        rightAns = 0
        wrongAns = 0
    }
}
var rightAns = 0
var wrongAns = 0

function setStatusClass(element, correct) {
    clearStatusClass()
    if (correct == "true") {
        rightAns++
        element.classList.add('correct')
        element.classList.remove('wrong')
    } else {
        wrongAns++
        element.classList.add('wrong')
        element.classList.remove('correct')
        getCorrect()
    }
}

function getCorrect(e) {
    Array.from(answerElement.children).forEach(button => {
        if (button.getAttribute("value") == "true") {
            button.classList.add('correct')
            button.classList.remove('wrong')
        }
    });
}

function clearStatusClass(e) {
    Array.from(answerElement.children).forEach(button => {
        button.classList.remove('correct')
        button.classList.add('wrong')
    });
}

function reset() {
    //clearStatusClass(document.body)
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
    },
    {
        question: 'What is Javascript',
        answers: [
            { text: 'Front End', correct: false },
            { text: 'Client Side', correct: true },
            { text: 'Server Side', correct: false },
            { text: 'Back End', correct: false }
        ]
    },
    {
        question: 'What is ReactJs',
        answers: [
            { text: 'Framework', correct: true },
            { text: 'CMS', correct: false },
            { text: 'IDE', correct: false },
            { text: 'Platform', correct: false }
        ]
    }
]