let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "In which year did the Chernobyl nuclear disaster occur?",
        options: ["1984", "1986", "1989", "1991"],
        correct: "1986",
    },
    {
        id: "1",
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correct: "Albert Einstein",
    },
    {
        id: "2",
        question: "Who invented Computer?",
        options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
        correct: "Charles Babbage",
    },
    {
        id: "3",
        question: "In which year did World War I end?",
        options: ["1916", "1920", "1918", "1919"],
        correct: "1918",
    },
    {
        id: "4",
        question: "Which scientist formulated the laws of motion and universal gravitation?",
        options: ["Isaac Newton", "Albert Einstein", "Marie Curie", "Galileo Galilei"],
        correct: "Isaac Newton",
    },
    {
        id: "5",
        question: "What is the largest organ in the human body?",
        options: ["Liver", "Lungs", "Heart", "Skin"],
        correct: "Skin",
    }, {
        id: "6",
        question: "Which planet is known as the 'Evening Star' or the 'Morning Star'?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: "Venus",
    },
    {
        id: "7",
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Michelangelo", "Leonardo da Vinci"],
        correct: "Leonardo da Vinci",
    },
    {
        id: "8",
        question: "Who is considered the founder of the Maurya Empire in ancient India?",
        options: ["Ashoka the Great", "Chandragupta Maurya", "Bindusara", "Chanakya"],
        correct: "Chandragupta Maurya",
    },
    {
        id: "9",
        question: "What ancient university in India is considered one of the world's first residential universities?",
        options: ["Takshashila University", "Pushpagiri University", "Vikramashila University", "Nalanda University"],
        correct: "Nalanda University",
    },
];

//Restart Quiz
/*restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
*/

nextBtn.addEventListener("click", () => {
    // Increment questionCount
    questionCount += 1;
    // If last question
    if (questionCount === quizArray.length) {
        // Hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        // Get the last user's name from the usernames array
        const usernames = JSON.parse(localStorage.getItem("usernames")) || [];
        const userName = usernames[usernames.length - 1];
        // Get the existing scores from local storage or create an empty array
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        // Check if the username already exists in scores array
        const userIndex = scores.findIndex((item) => item.userName === userName);
        // If user exists, update the score; otherwise, add a new entry
        if (userIndex !== -1) {
            scores[userIndex].score = scoreCount;
        } else {
            scores.push({ userName, score: scoreCount });
        }
        // Save the updated scores back to local storage
        localStorage.setItem("scores", JSON.stringify(scores));
        // Display the user's score
        userScore.innerHTML = "Your score is " + scoreCount + " out of " + quizArray.length;
    } else {
        // Display questionCount
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
        // Display quiz
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
});


//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
    // Randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    // Generate quiz
    for (let i of quizArray) {
        // Randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        // Quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        // Question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        // Question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        // Options
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

// ...

// Load quiz automatically when the page loads
window.onload = initial;

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    // clear interval (stop timer)
    clearInterval(countdown);
    // disable all options
    options.forEach((element) => {
        element.disabled = true;
    });

    // Check if this is the last question
    if (questionCount === quizArray.length - 1) {
        // Get the user's name from local storage
        const userName = JSON.parse(localStorage.getItem("usernames"))[0];

        // Get the existing scores from local storage or create an empty array
        const scores = JSON.parse(localStorage.getItem("scores")) || [];

        // Add the new score entry to the scores array
        scores.push({ userName, score: scoreCount });

        // Save the updated scores back to local storage
        localStorage.setItem("scores", JSON.stringify(scores));
    }
}


//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// Load quiz automatically when the page loads
window.onload = initial;
