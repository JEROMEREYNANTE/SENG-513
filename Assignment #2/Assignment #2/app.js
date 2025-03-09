import { Quiz, Question, User } from "./classes.js";
import { generator } from "./methods.js";

document.addEventListener("DOMContentLoaded", async () => {
    const mainMenu = document.getElementById("mainMenu");
    const quizMenu = document.getElementById("quizMenu");
    const startButton = document.getElementById("startQuiz");
    const backToMenuButton = document.getElementById("backToMenu");
    const questionText = document.getElementById("question");
    const options = [
        document.getElementById("option1"),
        document.getElementById("option2"),
        document.getElementById("option3"),
        document.getElementById("option4")
    ];

    let quiz = new Quiz();
    let questionGenerator = generator(quiz);

    // Fetch all difficulty levels at the start
    let easyQuestions = await questionGenerator.next().value;
    let mediumQuestions = await questionGenerator.next().value;
    let hardQuestions = await questionGenerator.next().value;

    async function loadNextQuestion() {
        const { value: questions, done } = questionGenerator.next();
    
        if (!questions || questions.length === 0) {
            console.error("No questions available. Retrying in 2 seconds...");
            setTimeout(loadNextQuestion, 2000);
            return;
        }
    
        if (!done) {
            const currentQ = questions[0];
            let currentQuestion = new Question(
                currentQ.question,
                [...currentQ.incorrect_answers, currentQ.correct_answer].sort(() => Math.random() - 0.5),
                currentQ.correct_answer
            );
    
            displayQuestion(currentQuestion);
        }
    }
    

    function displayQuestion(questionObj) {
        questionText.innerHTML = questionObj.getQuestion();
        options.forEach((button, index) => {
            button.innerHTML = questionObj.getOptions()[index];
            button.onclick = () => {
                const isCorrect = questionObj.checkAnswer(button.innerHTML);
                questionGenerator.next({ correct: isCorrect });

                if (isCorrect) {
                    quiz.addScore();
                    console.log(`New Score: ${quiz.score}`);
                }

                loadNextQuestion();
            };
        });
    }

    startButton.addEventListener("click", () => {
        mainMenu.style.display = "none";
        quizMenu.style.display = "block";
        quiz.startQuiz();
        loadNextQuestion();
    });

    backToMenuButton.addEventListener("click", () => {
        mainMenu.style.display = "block";
        quizMenu.style.display = "none";
        quiz.endQuiz();
    });
});
