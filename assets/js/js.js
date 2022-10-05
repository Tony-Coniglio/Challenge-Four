var header = document.querySelector(".header");
var container = document.querySelector(".container");
var result = document.querySelector(".result");

const questionsAr = [
    {
        question: "Commonly used data types do include:",
        options: {
            a: "strings", 
            b: "booleans", 
            c: "numbers", 
            d: "alerts",
        },
        answer: "d"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        options: {
            a: "quotes", 
            b: "curly brackets", 
            c: "parenthesis", 
            d: "square brackets",
        },
        answer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        options: {
            a: "numbers and strings", 
            b: "other arrays", 
            c: "booleans", 
            d: "all of the above",
        },
        answer: "d"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: {
            a: "quotes", 
            b: "curly brackets", 
            c: "parenthesis", 
            d: "commas",
        },
        answer: "a"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: {
            a: "JavaScript", 
            b: "terminal/bash", 
            c: "for loops", 
            d: "console.log",            
        },
        answer: "d"
    }
];


var scores = [];
var points = 0;
var index = 0;
var record = [];

function start() {
    
    var restart = container;
    while(restart.hasChildNodes()) {
        restart.removeChild(restart.firstChild);
    };

    
    var viewScore = document.createElement("p");
    viewScore.classList.add("banner", "high-score");
    viewScore.textContent = "High Scores";

    
    var time = document.createElement("p");
    time.classList.add("banner", "time");
    time.textContent = "Time Remaining: ";
    var second = document.createElement("span");
    second.setAttribute('id', "second");
    time.appendChild(second);

    
    var title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = "Challenge Four Quiz";

    
    var text = document.createElement("p");
    text.classList.add("text");
    text.textContent = "Please take the following coding quiz. Correct answer = 1 point; Wrong answer = -10 seconds";
    
    var startBtn = document.createElement("button");
    startBtn.classList.add("btn", "btn-start");
    startBtn.textContent = "Start Quiz";

    header.appendChild(viewScore);
    header.appendChild(time);
    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(startBtn);

    
    document.querySelector(".btn-start").addEventListener("click", timer);
    document.querySelector(".high-score").addEventListener("click", viewHighScore);
}

function quiz() {
    
    var restart = container;
    while(restart.hasChildNodes()) {
        restart.removeChild(restart.firstChild);
    };
    
    if (index < questionsAr.length) {
        
        var quizModule = document.createElement("div");
        quizModule.classList.add("quiz");
        container.appendChild(quizModule);
        
        var quizTitle = document.createElement("h1");
        quizTitle.classList.add("title");
        quizTitle.textContent = questionsAr[index].question;
        quizModule.appendChild(quizTitle);
        
        var optionsObj = questionsAr[index].options;
        for (var x in optionsObj) {
            var quizOption = document.createElement("button");
            quizOption.classList.add("btn", "btn-answer");
            if (x === questionsAr[index].answer) {
                quizOption.setAttribute("check", "correct");
            }
            quizOption.textContent = optionsObj[x];
            quizModule.appendChild(quizOption);
        }

        index++;


        
        document.querySelector(".quiz").addEventListener("click", checkResult);

    } else {


        var scoreTotal = document.createElement("p");
        scoreTotal.classList.add("text");
        scoreTotal.textContent = "Final score: " + points;
        container.appendChild(scoreTotal);

        var formEl = document.createElement("form");
        formEl.classList.add = ("form");
        container.appendChild(formEl);

        var initials = document.createElement("initials");
        initials.classList.add("text");
        initials.setAttribute("for", "name");
        initials.textContent = "Enter initials:";
        formEl.appendChild(initials);

        var input = document.createElement("input");
        input.classList.add("text");
        input.setAttribute("type", "text");
        input.setAttribute("name", "name");
        input.setAttribute("id", "name");
        input.setAttribute("placeholder", "name");
        formEl.appendChild(input); 

        var submit = document.createElement("button");
        submit.classList.add("btn", "btn-submit");
        submit.textContent = "Submit";
        formEl.appendChild(submit);

        document.querySelector(".btn-submit").addEventListener("click", recordHighScore);
    }
}

function timer() {

    var timeRemain = 60;

    var timeInterval = setInterval(function() {

        var timeEl = document.querySelector("#second");
        timeEl.textContent = timeRemain + "s";
        timeRemain--;

        if (result.textContent.match(/wrong/gi)) {
            timeRemain -= 10; 
        }

        if (timeRemain < 0 || scores.length === questionsAr.length) {

            clearInterval(timeInterval);
            timeEl.textContent = 0;
            index += questionsAr.length;

            quiz();
        }
    }, 1000);

    quiz();
}

function checkResult(event) {

    var targetEl = event.target;

    var check = document.createElement("p");
    check.classList.add("check-result");
    if (targetEl.hasAttribute("check")) {
        points += 1;
    }
    result.appendChild(check);
    scores.push(points);

    setTimeout(() => {
        check.remove();
        quiz();
    }, 1000);   
}

function recordHighScore(event) {

    event.preventDefault();

    
    scores.length = 0;
    index = 0;

    var playerName = document.querySelector("#name").value;

    if (playerName) {
        var recordObj = {
            name: playerName,
            highScore: points,
        }
    }

    record.push(recordObj);
    saveData();
    points = 0;
    viewHighScore();
}

function viewHighScore() {
    
    var removeHeader = header;
    while (removeHeader.hasChildNodes()) {
        removeHeader.removeChild(removeHeader.firstChild);
    }
    var removeContainer = container;
    while (removeContainer.hasChildNodes()) {
        removeContainer.removeChild(removeContainer.firstChild);
    }

    var highScoresTitle = document.createElement("h1");
    highScoresTitle.classList.add("title");
    highScoresTitle.textContent = "High Scores";
    container.appendChild(highScoresTitle);

    loadData();

    var goBack = document.createElement("button");
    goBack.classList.add("btn", "btn-goBack");
    goBack.textContent = "Back";
    container.appendChild(goBack);

    document.querySelector(".btn-goBack").addEventListener("click", start);
    document.querySelector(".btn-clear").addEventListener("click", clearHistory);
}

function saveData() {
    localStorage.setItem("high scores", JSON.stringify(record));
}

function loadData() {

    var load = localStorage.getItem("high scores");

    if (!load) {
        return false;
    }

    load = JSON.parse(load);

    for (var i = 0; i < load.length; i++) {
        var highScorestext = document.createElement("li");
        highScorestext.classList.add("list", "text");
        highScorestext.textContent = load[i].name + " : " + load[i].highScore;
        container.appendChild(highScorestext);
    }
}

start();