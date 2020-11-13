// ---------------------------- GLOBAL VARIABLES ----------------------------
var mainContentEl = document.querySelector("#question-content");
var timerEl = document.querySelector("#countdown");             // timer element to countdown
var titleQuestion = document.querySelector("#title-question");
var textInfo = document.querySelector("#text-info");
var selectedAnswer = "";
var questionCounter = 0;
// timer variables
var x = 75;
var t = 0;

// ---------------------------- QUIZ QUESTIONS ----------------------------
var questions = [
    {
        title: "Which of the following are JavaScript data types?",
        choices: [
            "1. Number",
            "2. String",
            "3. Boolean",
            "4. All of the above"
        ],
        answer: 3 //"4. All of the above"
    },
    {
        title: "Which symbol is used for comments in JavaScript?",
        choices: [
            "1. <!--comment-->",
            "2. /* comment */",
            "3. // comment",
            "4. *( comment )*"
        ],
        answer: 2 //"3. // comment"
    },
    {
        title: "What are the looping structures in JavaScript?",
        choices: [
            "1. For",
            "2. If",
            "3. While",
            "4. Option 1. and 3."
        ],
        answer: 3 //"4. Option 1. and 3."
    },
    {
        title: "What symbol is used to call an id?",
        choices: [
            "1. %",
            "2. $",
            "3. #",
            "4. ."
        ],
        answer: 2 //3. #",
    },
    {
        title: "What symbol is used to call a class?",
        choices: [
            "1. .",
            "2. $",
            "3. #",
            "4. &"
        ],
        answer: 0 //"1. .",
    },
    {
        title: "DOM stands for:_____________",
        choices: [
            "1. Document Object Manipulation",
            "2. Document Object Model",
            "3. Dock Object Make",
            "4. DOM"
        ],
        answer: 1 //"2. Document Object Model",
    },
    {
        title: "A data attribute is used for what?",
        choices: [
            "1. Identifying backgroud color",
            "2. FlexBox style",
            "3. Custom data storage",
            "4. Call to parent element"
        ],
        answer: 2 //"3. Custom data storage",
    }
];

// ---------------------------- MAIN FUNCTIONS ----------------------------

// --------------- BUTTON CLICK HANDLER ---------------
// This will be run any time a button is clicked.
var clickButtonHandler = function(event) {
    // get target elemnt from event
    var targetEl = event.target;

    // Start Quiz button was clicked.  call timer function and question object
    if (targetEl.matches('.start-btn')) { // matches compares class
        countDownTimer();
        questionObject(questionCounter);
    }
    // if a choice/answer button was selected by the user.  Set choice id and check answer
    if (targetEl.matches('.choice-btn')) { // matches compares class
        var selectedAnswer = targetEl.getAttribute("choice-id");
        answerCheck(selectedAnswer);
    }
    //submit button
    if (targetEl.matches('.submit-btn')) {
        saveHighScore();
    }
}

// --------------- COUNTER ---------------
// counts down and removes time when we update x
function countDownTimer() {
    if (t==0) t = setInterval(countDownTimer, 1000);

    timerEl.textContent = x;
    x--;

    if (x < 0) {
        endGameLogic();
        timerEl.textContent = 0;
        clearTimeout(t);
        ticker = 0;
        //window.alert("end");
        //endGameLogic();
    }
}

function stopCounter() {
    clearTimeout(t);
    t = 0;
    x++;
}

// --------------- CLEARS ORIGINAL DISPLAY ---------------
// clear the contents of titleQuestion
var clearMain = function() {
    titleQuestion.textContent = "";
    textInfo.textContent = "";
    document.getElementById("start-btn").hidden = true;

}

//--------------- QUESTION OBJECT ---------------
// convert the current question into a manageable object based on question counter
// based on question counter, directs to create HTML fields or update them
var questionObject = function(questionCounter) {
    var questionDataObj = {
        title: questions[questionCounter].title,
        c: [
            questions[questionCounter].choices[0],
            questions[questionCounter].choices[1],
            questions[questionCounter].choices[2],
            questions[questionCounter].choices[3]
        ],
        a: questions[questionCounter].answer
    };
    // initial setup call (we do not need to recreate buttons everytime)
    if (questionCounter === 0) {
        // call game start
        initialStart(questionDataObj);
    }
    // call function to update buttons, not create them
    else {
        gameOngoing(questionDataObj);
    }
}

// --------------- INITIAL START ---------------
// initial Start, run if this is the first question. creates the dynamic HTML elements
var initialStart = function(questionDataObj) {   
    clearMain(); // clear intiial screen
    
    // create container for question and answers
    var questionAnswerContainer = document.createElement("li");
    questionAnswerContainer.className = "qa-container";

    // create div to hold the question
    var questionInfoEl = document.createElement("div");
    questionInfoEl.className = "question-info";
    questionInfoEl.innerHTML = "<h3 class='question-text'>" + questionDataObj.title;

    // append the new div to the container
    questionAnswerContainer.appendChild(questionInfoEl);

    // ------ Dynamically create buttons ----------   
    for (i = 0; i < questionDataObj.c.length; i++) {
        var choice = document.createElement("button");
        choice.className = "choice-btn";
        choice.textContent = questionDataObj.c[i];
        choice.setAttribute("choice-id", i);
        questionAnswerContainer.appendChild(choice);
    };
    
    // append all new information into main element
    mainContentEl.appendChild(questionAnswerContainer);
}    

// --------------- ONGOING GAME LOGIC ---------------
// this function updates already created HTML elements
var gameOngoing = function(questionDataObj) {
    // get question information so we can update the correct fields
    var questionInfoEl = document.querySelector(".question-info");
    questionInfoEl.innerHTML = "<h3 class='question-text'>" + questionDataObj.title;

    // get button information so we can update the correct fields
    for (i = 0; i < questionDataObj.c.length; i++) {
        var choice = document.querySelector(".choice-btn[choice-id='" + i + "']");
        choice.textContent = questionDataObj.c[i];
    };    
}

// --------------- CHECK USER ANSWER ---------------
// check the answer that the user provided.  This is triggered by the click response
var answerCheck = function(selectedAnswer, timeRemain) {
    // object to hold text to display to the user
    var result = "";

    // Check the user's selected answer against the actual asswer
    if (parseInt(selectedAnswer) === questions[questionCounter].answer) {
        console.log("question answered correctly!");
        result = "Correct!";
    }
    else {
        console.log("question answered incorrectly!");
        result = "Wrong!";
        // time penalty, global variable update
        x = x - 10;
    }
    
    // intitial check, this is used to create the dynamic element to hold results.
    if (questionCounter === 0) {
        // ------- Create location for correct or wrong to go -------
        var questionAnswerContainer = document.querySelector(".qa-container");
        
        var correctWrongContainer = document.createElement("div");
        correctWrongContainer.className = ".answer-content";
        correctWrongContainer.innerHTML = "<h3 class='answer-text'>" + result;
        questionAnswerContainer.appendChild(correctWrongContainer);
        mainContentEl.appendChild(correctWrongContainer);
    }
    // call function to update element text and not recreate
    else {
        var correctWrongContainer = document.querySelector(".answer-text");     
        correctWrongContainer.textContent = result;
    }
    // Loop logic
    var max = questions.length - 1;
    
    console.log("max: " + max);
    console.log("x value: " + x);
    if (questionCounter < max) {
        
        console.log("x value: " + x + "questiion counter: " + questionCounter + "quesitons.length: " + questions.length);
        questionCounter++;
        questionObject(questionCounter);
    }
    else {
        endGameLogic();
        // stopCounter();
        // window.alert("end");
    }
}

var endGameLogic = function() {
    stopCounter();
    console.log("Timeout triggered!");
    var endGameMsg = "All Done!";
    var finalScore = ("Your final score is " + x);
    //change text on screen
    var msgInfoEl = document.querySelector(".question-info");
    msgInfoEl.innerHTML = "<h3 class='question-text'>" + endGameMsg + "</br>" + "<h4 class='question-text'>" + finalScore;
    //hide buttons
    for (i = 0; i < 4; i++) {
        document.querySelector(".choice-btn[choice-id='" + i + "']").hidden = true;
    };
    document.getElementById("initials-form").hidden = false; 
}

var saveHighScore = function() {
    var saveInitials = document.querySelector("input[name='initials']").value;
    var finalScore = x;
    var highScore = {
        initials: saveInitials,
        score: finalScore
    }
    localStorage.setItem("highScore", JSON.stringify(highScore));
}



// ---------------------------- EVENT LISTENERS and load ----------------------------
mainContentEl.addEventListener("click", clickButtonHandler);

document.getElementById("initials-form").hidden = true;