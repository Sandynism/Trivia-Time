//SETTINGS
let correctAnswers = 0
let incorrectAnswers = 0
let unresponsive = 0
let countdown = 20
let counter = 0
let userSelection
let questionsObject = [{
    question: "What does Sandy have every single morning?",
    answers: ["Bad Breath", "Green Juice", "Chicken & Waffles", "A Stretch Session"],
    correct: "Green Juice"
}, {
    question: "What is Sandy's favorite visited country?",
    answers: ["Greece", "Japan", "Thailand", "Australia"],
    correct: "Greece"
}, {
    question: "What is the oldest condiment in Sandy's fridge right now?",
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
    answers: ["Illenium", "The Weeknd", "Ed Sheeran", "Above & Beyond"],
    correct: "Above & Beyond"
}, {
    question: "What are the names of Sandy's two dogs?",
    answers: ["Mike & Ike", "Choco & Aimee", "Prince & Princess", "Marshy & Mallo"],
    correct: "Choco & Aimee"
}]



$(document).ready(function () {

    $("#startGame").click(function () {
        $(".btn-secondary").addClass("disappear")
        $("#footer").addClass("disappear")
        $(".btn-outline-secondary").removeClass("disappear")
        $(".questionsBox").removeClass("disappear")
        $("#timer").removeClass("disappear")
        timer()
    })

    $("#resetGame").click(function () {
        // resettimer()
    })

    //display question in container
    $("#question").text(questionsObject[0].question)

    let options = questionsObject[0].answers
    for (let i = 0; i < options.length; i++) {
        $(`#btn${i}`).html(options[i])
        // $("span", this).text(options[i])
    }


    //shows the remaining seconds left
    function timer() {
        counter = setInterval(twentySeconds, 1000);
        function twentySeconds() {
            if (countdown === 0) {
                clearInterval(counter)
                //next question function
            } else if (countdown > 0) {
                countdown--
            }
            $("#timer").html(countdown + " Seconds Remaining")
        }
    }

    //check if user selection is correct or incorrect & track it
    $("#choices button").on("click", function () {
        userSelection = $(this).html()
        console.log(userSelection)

        if (userSelection === questionsObject[0].correct) {
            console.log("yaaaaaas")
            correctAnswers += 1
        } else if (userSelection !== questionsObject[0].correct) {
            console.log("Heck No!")
            incorrectAnswers += 1
        } else {
            console.log("Unanswered")
        }
    })

    //display next question after time runs out or user pick is selected
    function nextQuestion() {

    }


    //animated intro page welcome message
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

    console.clear()
    var messenger = new Messenger($('#animation'))


})
