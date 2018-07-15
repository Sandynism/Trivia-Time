//SETTINGS
let correctAnswers = 0
let incorrectAnswers = 0
let unresponsive = 0
let countdown = 16
let userSelection
let questionCount = 0
let gameTimer

let questionsObject = [{
    question: "What does Sandy have every single morning?",
    answers: ["Bad Breath", "Green Juice", "Chicken and Waffles", "A Stretch Session"],
    correct: "Green Juice"
}, {
    question: "What is Sandy's favorite visited country?",
    answers: ["Greece", "Japan", "Thailand", "Australia"],
    correct: "Greece"
}, {
    question: "What is the oldest condiment in Sandy's fridge?",
    answers: ["Dijon Mustard", "Sriracha", "Peter Lugers Steak Sauce", "Ranch Dressing"],
    correct: "Ranch Dressing"
}, {
    question: "What does Sandy never leave the house without?",
    answers: ["SPF", "Scrunchie", "Lip Balm", "Cash"],
    correct: "Lip Balm"
}, {
    question: "What was Sandy's favorite subject in school?",
    answers: ["Physics", "Biology", "Dance", "Asian Studies"],
    correct: "Biology"
}, {
    question: "What is Sandy's favorite color?",
    answers: ["White", "Turquoise", "Pink", "Green"],
    correct: "Turquoise"
}, {
    question: "How many concerts has Sandy been to?",
    answers: ["22", "1", "134", "368"],
    correct: "134"
}, {
    question: "Who is Sandy's favorite musical act?",
    answers: ["Illenium", "The Weeknd", "Ed Sheeran", "Above and Beyond"],
    correct: "Above and Beyond"
}, {
    question: "What are the names of Sandy's two dogs?",
    answers: ["Mike \u2665 Ike", "Choco \u2665 Aimee", "Prince \u2665 Princess", "Marshy \u2665 Mallo"],
    correct: "Choco \u2665 Aimee"
}, {
    question: "Where will Sandy be working at?",
    answers: ["Your Company!", "Her Own Company", "Google", "Facebook"],
    correct: "Your Company!"
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