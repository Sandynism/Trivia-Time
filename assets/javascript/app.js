//SETTINGS
let correctAnswers = 0
let incorrectAnswers = 0
let unresponsive = 0
let countdown = 20
let counter = 0
let userSelection
let questionCount = 0
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
    answers: ["SPF", "A Scrunchie", "Lip Balm", "Cash"],
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
    })

    $("#resetGame").click(function () {
        startGame()
    })

    //check if user selection is correct or incorrect & track it
    $("#choices button").on("click", function () {
        select.play()
        userSelection = $(this).html()
        console.log(userSelection)

        if (userSelection === questionsObject[questionCount].correct) {
            rightPick()
            // nextQuestion()
        } else if (userSelection !== questionsObject[questionCount].correct) {
            wrongPick()
            // nextQuestion()
        } else {
            noPick()
        }
    })

    $("#choices button").mouseenter(function() {
        hover.play()
    })

    function startGame () {
        getQuestion()
        resetGame()
        timer()
    }

    function resetGame () {
        questionCount = 0
        correctAnswers = 0
        incorrectAnswers = 0
        unresponsive = 0
    }
    // let correctAnswers = correctAnswers.text("\u2665") could i display the # count as a heart instead?
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
            questionCount++
            getQuestion()
            countdown = 20
            timer()
        }
    }

    function rightPick() {
        correctAnswers++
        let winDisplay = "<p class='winDisplay'>That is the correct answer!"
        $(".questionsBox").html(winDisplay)
        setTimeout(nextQuestion, 2000)
    }

    function wrongPick() {
        incorrectAnswers++
        let lossDisplay = "<p class='lossDisplay'>That is the wrong answer! The correct answer is xxxxx"
        $(".questionsBox").html(lossDisplay)
        setTimeout(nextQuestion, 2000)
    }

    function noPick() {
        unresponsive++
        let unresDisplay = "p class='unresDiplay'>You have not chosen a selection!"
        $(".questionsBox").html(unresDisplay)
        setTimeout(nextQuestion, 2000)
    }

    //shows the remaining seconds left
    function timer() {
        clearInterval(counter)
        counter = setInterval(twentySeconds, 1000);
        function twentySeconds() {
            if (countdown === 0) {
                clearInterval(counter)
                nextQuestion()
            } else if (countdown > 0) {
                countdown--
            }
            $("#timer").html(countdown + " Seconds Remaining")
        }
    }




    // animated intro page welcome message
    var Messenger = function (el) {
        'use strict'
        var m = this

        m.init = function () {
            m.codeletters = "&#*+%?£@§$"
            m.message = 0
            m.current_length = 0
            m.fadeBuffer = false
            m.messages = [
                'HELLO FRIEND',
                'BONJOUR LES AMIS',
                '你好朋友',
                'HOLA AMIGO',
                '안녕 친구',
                'HALLO MEIN FREUND',
                'こんにちは友人',
                'مرحبا يا صديقي',
                'CIAO AMICO',
                'हैलो दोस्त'
            ]

            setTimeout(m.animateIn, 100)
        }

        m.generateRandomString = function (length) {
            var random_text = ''
            while (random_text.length < length) {
                random_text += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length))
            }

            return random_text
        }

        m.animateIn = function () {
            if (m.current_length < m.messages[m.message].length) {
                m.current_length = m.current_length + 2
                if (m.current_length > m.messages[m.message].length) {
                    m.current_length = m.messages[m.message].length
                }

                var message = m.generateRandomString(m.current_length)
                $(el).html(message)

                setTimeout(m.animateIn, 20)
            } else {
                setTimeout(m.animateFadeBuffer, 20)
            }
        }

        m.animateFadeBuffer = function () {
            if (m.fadeBuffer === false) {
                m.fadeBuffer = []
                for (var i = 0; i < m.messages[m.message].length; i++) {
                    m.fadeBuffer.push({ c: (Math.floor(Math.random() * 12)) + 1, l: m.messages[m.message].charAt(i) })
                }
            }

            var do_cycles = false
            var message = ''

            for (var i = 0; i < m.fadeBuffer.length; i++) {
                var fader = m.fadeBuffer[i]
                if (fader.c > 0) {
                    do_cycles = true
                    fader.c--;
                    message += m.codeletters.charAt(Math.floor(Math.random() * m.codeletters.length))
                } else {
                    message += fader.l
                }
            }

            $(el).html(message)

            if (do_cycles === true) {
                setTimeout(m.animateFadeBuffer, 50)
            } else {
                setTimeout(m.cycleText, 2000)
            }
        };

        m.cycleText = function () {
            m.message = m.message + 1
            if (m.message >= m.messages.length) {
                m.message = 0
            }

            m.current_length = 0
            m.fadeBuffer = false
            $(el).html('')

            setTimeout(m.animateIn, 200)
        }

        m.init()
    }

    // console.clear() //this is messing up the load fix it
    let messenger = new Messenger($('#animation'))


})
