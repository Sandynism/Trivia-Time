//SETTINGS
let correctAnswers = 0
let incorrectAnswers = 0
let unresponsive = 0
let countdown = 16
let userSelection
let questionCount = 0
let gameTimer

let questionsObject = [{
    question: "What does concat() do?",
    answers: ["Returns char at index", "Merges 2+ strings", "Meows", "Cons People"],
    correct: "Merges 2+ strings"
}, {
    question: "Which of the following JS variable naming convention rules is false?",
    answers: ["You cannot use reserved keywords", "It cannot start with a numeral", "Names are case sensitive", "Everything begins with name"],
    correct: "Everything begins with name"
}, {
    question: "What does push() do?",
    answers: ["Shove someone", "Removes last element of an array", "Adds an element to end of array", "Returns specificed char"],
    correct: "Adds an element to end of array"
}, {
    question: "Which one of these is a JS primitive data type?",
    answers: ["Star", "Semicolon", "Undefined", "Function"],
    correct: "Undefined"
}, {
    question: "What does the 2nd statement of a for loop do?",
    answers: ["Sets variable before loop starts", "Executed every time", "Dance", "Defines condition for loop to run"],
    correct: "Defines condition for loop to run"
}, {
    question: "What does IFFE stand for in JavaScript?",
    answers: ["Maybe", "If fruit flies yell", "Immediately invoked fuction expression", "Iffy"],
    correct: "Immediately invoked fuction expression"
}, {
    question: "What does JSX stand for?",
    answers: ["JavaScript XML", "JavaScript X", "JavaScript XL", "JavaScript Xtra"],
    correct: "JavaScript XML"
}, {
    question: "What are props in React?",
    answers: ["Tools at the circus", "Read only components", "Objects", "Behavior"],
    correct: "Read only components"
}, {
    question: "How do you update the state of a component?",
    answers: ["updateState()", "this.setState()", "setState()", "this.state()"],
    correct: "this.setState()"
}, {
    question: "When is componentDidMount() called?",
    answers: ["After all elements are rendered", "Right away", "After setTimeout()", "Before all elements are rendered"],
    correct: "After all elements are rendered"
}]

let hover = new Audio("assets/audio/hover.wav")
let select = new Audio("assets/audio/select.wav")

$(document).ready(function () {

    $("#startGame").click(function () {
        $(".btn-secondary").addClass("disappear")
        $("#footer").addClass("disappear")
        $("#animation").addClass("disappear")
        $(".btn-outline-secondary").removeClass("disappear")
        $(".questionsBox").removeClass("disappear")
        $("#timer").removeClass("disappear")
        startGame()
        gameTimer = setInterval(timer, 1000)
    })

    $("#resetGame").click(function () {
        // showQuestion()
        // startGame()
        location.reload(true)
    })

    //check if user selection is correct or incorrect & track it
    $("#choices button").on("click", function () {
        select.play()
        userSelection = $(this).html()

        if (userSelection === questionsObject[questionCount].correct) {
            showPick('correct')
        } else {
            showPick('wrong')
        }
    })

    $("#choices button").mouseenter(function () {
        hover.play()
    })

    function startGame() {
        questionCount = 0
        correctAnswers = 0
        incorrectAnswers = 0
        unresponsive = 0
        getQuestion()
        resetTimer()
    }

    //display question in container
    function getQuestion() {
        let questionText = questionsObject[questionCount].question
        $("#question").html(questionText)

        let options = questionsObject[questionCount].answers
        for (let i = 0; i < options.length; i++) {
            $(`#btn${i}`).html(options[i])
        }
        //use to display pace of trivia
        $("#progress").html(function () {
            let count = (questionCount + 1) + " of " + $(questionsObject).length;
            return "<p>Question " + count + "</p>";
        })
    }

    //display next question after time runs out or user pick is selected
    function nextQuestion() {
        if (questionCount < questionsObject.length - 1) {
            showQuestion()
            questionCount++
            getQuestion()
        } else {
            endGame()
        }
    }

    function showQuestion() {
        $('.questionsBox').show()
        $('.showAnswer').hide()
    }

    function hideQuestion() {
        $('.showAnswer').show()
        $('.questionsBox').hide()
    }

    //displays the results after every question
    function showPick(result) {

        resetTimer()
        let correct = questionsObject[questionCount].correct
        let display

        if (result === 'noPick') {
            unresponsive++
            display = `<p>Time ran out! The correct answer is <b>${correct}</b>.`
        } else if (result === 'correct') {
            correctAnswers++
            display = `<p>Yay! <b>${correct}</b> is the correct answer!`
        } else if (result === 'wrong') {
            incorrectAnswers++
            display = `<p>Wrong, you chose <b>${userSelection}</b>! The correct answer is <b>${correct}</b>.`
        }

        $('.showAnswer').html(display)
        $('.showAnswer p').addClass("display")
        hideQuestion()
        setTimeout(nextQuestion, 2000)
    }

    function resetTimer() {
        countdown = 16
    }

    //shows the remaining seconds left
    function timer() {
        if (countdown === 0) {
            showPick('noPick')
        } else if (countdown > 0) {
            countdown--
        }

        $("#timer").html(countdown + " Seconds Remaining")
    }

    //displays the final game results. the unresponsive count is added to the incorrect total
    function endGame() {
        clearInterval(gameTimer)
        let wrongAnswers = `${incorrectAnswers + unresponsive}`
        let endDisplay
        // endDisplay = `<p>Correct: ${correctAnswers}! <br> Wrong: ${incorrectAnswers} <br> Unaswered: ${unresponsive}</p>`
        endDisplay = `<p>Correct: ${correctAnswers} <br> Incorrect: ${wrongAnswers}</p>`

        $('.showAnswer').html(endDisplay)
        $(".showAnswer p").append($("<p>").html($("<a>").attr("href","https://www.github.com/Sandynism").text("Check out my Github")))
        $('.showAnswer p').addClass("endDisplay")
        // $("#resetGame").hide()
    }
})

    // function rightPick() {
    //     correctAnswers++
    //     let correct = questionsObject[questionCount].correct
    //     let winDisplay = `<p class='winDisplay'>Yay! ${correct} is the right answer!`
    //     $('.showAnswer').html(winDisplay)
    //     $('.showAnswer').show()
    //     $('.questionsBox').hide()
    //     setTimeout(nextQuestion, 1000)
    // }

    // function wrongPick() {
    //     incorrectAnswers++
    //     let correct = questionsObject[questionCount].correct
    //     let lossDisplay = `<p class='lossDisplay'>Wrong! The correct answer is ${correct}.`
    //     $('.showAnswer').html(lossDisplay)
    //     $('.showAnswer').show()
    //     $('.questionsBox').hide()
    //     setTimeout(nextQuestion, 1000)
    // }

    // function noPick() {
    //     resetTimer()
    //     unresponsive++
    //     let correct = questionsObject[questionCount].correct
    //     let unresDisplay = `<p class='unresDiplay'>You have not chosen a selection! But the correct answer is ${correct}.`
    //     $('.showAnswer').html(unresDisplay)
    //     $('.showAnswer').show()
    //     $('.questionsBox').hide()
    //     setTimeout(nextQuestion, 1000)
    // }