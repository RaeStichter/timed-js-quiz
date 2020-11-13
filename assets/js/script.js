// ---------------------------- GLOBAL VARIABLES ----------------------------
var mainContentEl = document.querySelector("#question-content");
var timerEl = document.querySelector("#countdown");             // timer element to countdown
var titleQuestion = document.querySelector("#title-question");
var textInfo = document.querySelector("#text-info");
//var startBtn = document.querySelector("#start-btn");
var selectedAnswer = "";
var questionCounter = 0;

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
    }
];

// ---------------------------- MAIN FUNCTIONS ----------------------------

// This will be run any time a button is clicked.
var clickButtonHandler = function(event) {
    // get target elemnt from event
    var targetEl = event.target;
    console.log(targetEl);

    // Start Quiz button was clicked
    if (targetEl.matches('.start-btn')) { // matches compares class
        console.log("the start button was pressed");
        countDownTimer();
        //gameStart();
        questionObject(questionCounter);
    }
    // if a choice/answer button was selected by the user
    if (targetEl.matches('.choice-btn')) {
        console.log(" A choice was made");
        var selectedAnswer = targetEl.getAttribute("choice-id");
        console.log(selectedAnswer);
        console.log("selected answer variable: " + selectedAnswer);
        answerCheck(selectedAnswer);
    }
}

// function to countdown from 
var countDownTimer = function() {
    var timeRemain = 5;

    // function will be called every second (1000ms) to display the countdown in the HTML page
    // (the function is writen in the original declaration)
    var timeInterval = setInterval(function() {
        // if timeRemain is greater than 1
        if (timeRemain > 0) {
            // set the value timerEl to timeRemain
            timerEl.textContent = timeRemain;
            timeRemain--;
        }
        else {
            // timeRemain gets to 0, leave 0 remaining
            timerEl.textContent = timeRemain;
        }
    }, 1000);
} 

// clear the contents of titleQuestion
var clearMain = function() {
    titleQuestion.textContent = "";
    textInfo.textContent = "";
    document.getElementById("start-btn").hidden = true;

}


// this will need to run inside of a loop
//convert the current question into a manageable object
var questionObject = function(questionCounter) {
    console.log(questions);
    console.log("This is the quesiton counter: " + questionCounter);
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
    console.log(questionDataObj);

    // initial setup call (we do not need to recreate buttons everytime)
    if (questionCounter === 0) {
        // call game start
        initialStart(questionDataObj);
    }
    // call function to update buttons, not create them
    else {
        gameStart(questionDataObj);
    }
    
}

// initial Start
var initialStart = function(questionDataObj) {   
    clearMain(); // clear intiial screen
    // create container for question and answers
    var questionAnswerContainer = document.createElement("li");
    questionAnswerContainer.className = "qa-container";

    // eventually add the question counter and utilize set attribute to questionAnswer Container

    // create div to hold the question
    var questionInfoEl = document.createElement("div");
    questionInfoEl.className = "question-info";
    questionInfoEl.innerHTML = "<h3 class='question-text'>" + questionDataObj.title;
    //taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // append the new div to the container
    questionAnswerContainer.appendChild(questionInfoEl);

    // append this new information into 
    //mainContentEl.appendChild(questionAnswerContainer); // move this to the end??

    // ------ Dynamically create buttons ----------
     
    for (i = 0; i < questionDataObj.c.length; i++) {
        var choice = document.createElement("button");
        choice.className = "choice-btn";
        choice.textContent = questionDataObj.c[i];
        choice.setAttribute("choice-id", i);
        questionAnswerContainer.appendChild(choice);
        console.log(choice);
    };

    // ------- Create location for correct or wrong to go -------
    // var correctWrongContainer = document.createElement("div1");
    // correctWrongContainer.className = ".answer-content";
    // correctWrongContainer.innerHTML = "<h3 class='answer-text'>" + "wrong";
    // questionAnswerContainer.appendChild(correctWrongContainer);
    
    mainContentEl.appendChild(questionAnswerContainer);
    //mainContentEl.appendChild(correctWrongContainer);
}    

var gameStart = function(questionDataObj) {
    // get question information so we can update the correct fields
    var questionInfoEl = document.querySelector(".question-info");
    console.log(questionInfoEl);
    questionInfoEl.innerHTML = "<h3 class='question-text'>" + questionDataObj.title;

    // get button information so we can update the correct fields
    for (i = 0; i < questionDataObj.c.length; i++) {
        var choice = document.querySelector(".choice-btn[choice-id='" + i + "']");
        console.log("game start function: " + choice.textContent);
        choice.textContent = questionDataObj.c[i];
    };    
}

// check the answer
var answerCheck = function(selectedAnswer, timeRemain) {
    // object to hold text to display to the user
    var result = "";
    
    console.log("This is the selected answer: " + selectedAnswer);
    console.log("This is the actual answer: " + questions[questionCounter].answer);

    // Check the user's selected answer against the actual asswer
    if (parseInt(selectedAnswer) === questions[questionCounter].answer) {
        console.log("question answered correctly!");
        result = "Correct!";
    }
    else {
        console.log("question answered incorrectly!");
        result = "Wrong!";
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

    if (timeRemain < 0 || questionCounter < questions.length) {
        questionCounter++;
        //document.querySelector(".qa-container").hidden = true;
        questionObject(questionCounter);
    }
    else {
        alert("end");
    }
}



// ---------------------------- EVENT LISTENERS ----------------------------
mainContentEl.addEventListener("click", clickButtonHandler);