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
            correctAnswers+= 1
        } else if (userSelection !== questionsObject[0].correct) {
            console.log("Heck No!")
            incorrectAnswers+= 1
        } else {
            console.log("Unanswered")
        }
    })

    //display next question after time runs out or user pick is selected
    function nextQuestion() {

    }
  

})
