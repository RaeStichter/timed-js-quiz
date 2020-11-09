// ---------------------------- GLOBAL VARIABLES ----------------------------
var mainContentEl = document.querySelector("#main-content");
var timerEl = document.querySelector("#countdown");             // timer element to countdown



// This will be run any time a button is clicked.
var clickButtonHandler = function(event) {
    // get target elemnt from event
    var targetEl = event.target;
    console.log(targetEl);

    // Start Quiz button was clicked
    if (targetEl.matches('.btn')) { // matches compares class
        console.log("the start button was pressed");
        countDownTimer();
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















// ---------------------------- EVENT LISTENERS ----------------------------
mainContentEl.addEventListener("click", clickButtonHandler);