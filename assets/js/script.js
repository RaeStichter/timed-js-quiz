// ---------------------------- GLOBAL VARIABLES ----------------------------
var mainContentEl = document.querySelector("#question-content");
var timerEl = document.querySelector("#countdown");             // timer element to countdown
var titleQuestion = document.querySelector("#title-question");
var textInfo = document.querySelector("#text-info");
//var startBtn = document.querySelector("#start-btn");

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
        answer: "4. All of the above"
    },
    {
        title: "Which symbol is used for comments in JavaScript?",
        choices: [
            "1. <!--comment-->",
            "2. /* comment */",
            "3. // comment",
            "4. *( comment )*"
        ],
        answer: "3. // comment"
    },
    {
        title: "What are the looping structures in JavaScript?",
        choices: [
            "1. For",
            "2. If",
            "3. While",
            "4. Option 1. and 3."
        ],
        answer: "4. Option 1. and 3."
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
        questionObject();
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
var questionObject = function() {
    console.log(questions);
    var questionDataObj = {
        title: questions[0].title,
        c0: questions[0].choices[0],
        c1: questions[0].choices[1],
        c2: questions[0].choices[2],
        c3: questions[0].choices[3],
        a: questions[0].answer
    };
    console.log(questionDataObj);

    // call game start
    gameStart(questionDataObj);
}


// Game Start
var gameStart = function(questionDataObj) {   
    clearMain();

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

    // ------ create buttons ----------
    // create container for the buttons
    //var choiceContainer = document.createElement("div");
    //choiceContainer.className = "choices-container";

    // create the choice buttons
    var choice1 = document.createElement("button");
    choice1.className = "choice-btn";
    choice1.textContent = questionDataObj.c0;
    questionAnswerContainer.appendChild(choice1);

    var choice2 = document.createElement("button");
    choice2.className = "choice-btn";
    choice2.textContent = questionDataObj.c1;
    questionAnswerContainer.appendChild(choice2);

    var choice3 = document.createElement("button");
    choice3.className = "choice-btn";
    choice3.textContent = questionDataObj.c2;
    questionAnswerContainer.appendChild(choice3);

    var choice4 = document.createElement("button");
    choice4.className = "choice-btn";
    choice4.textContent = questionDataObj.c3;
    questionAnswerContainer.appendChild(choice4);

    
    
    
    
    
    
    

    
    
    
    
    mainContentEl.appendChild(questionAnswerContainer);

}    

// // dynamic button creation
// var createChoiceButton = function(questionDataObj) {
//     // create container for the buttons
//     var choiceContainer = document.createElement("div");
//     choiceContainer.className = "choices-container";

//     // create the choice buttons
//     var choice1 = document.createElement("button");
//     choice1.className = "start-btn";
//     choice1.textContent = 









//     // // give it some content
//     // var newConent = document.createTextNode("this is new content!!!");

//     // //add content to the new div
//     // choiceContainer.appendChild(newConent);

//     // // add new element and content into the DOM
//     // var currentDiv = document.getElementById("questions-holding");
//     // document.body.insertBefore(choiceContainer, currentDiv);





//     // create choice buttons
//     // var choiceButtonEl = document.createElement("button");
//     // choiceButtonEl.textContent = questions[1].choices[1];
//     // choiceButtonEl.className = "btn";

//     // choiceContainer.appendChild(choiceButtonEl);

//     // return choiceContainer;

// }


















// ---------------------------- EVENT LISTENERS ----------------------------
mainContentEl.addEventListener("click", clickButtonHandler);