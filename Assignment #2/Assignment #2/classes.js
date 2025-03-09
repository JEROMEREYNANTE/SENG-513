export class Quiz {
    constructor(){
        this.isStart = false;
        this._score = 0;
        this.difficulty = "Easy"
        this.next_q = "";
    }

    startQuiz() {
        this.isStart = true;
    }

    endQuiz() {
        this.isStart = false;
    }


    addScore() {
        this._score += 1;
    }

    get score() {
        return this._score;
    }

    set nextQuestion(question) {
        this.next_q = question;
    }

    get nextQuestion() {
        return this.next_q;
    }
}


export class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }

    checkAnswer(userAnswer) {
        return this.answer === userAnswer;
    }

    getQuestion() {
        return this.question;
    }

    getOptions() {
        return this.options;
    }

    getAnswer() {
        return this.answer;
    }
}

export class User {
    constructor(name) {
        this.name = name;
        this.currAttempt = currAttempt;
        this._scoreHistory = [];
    }

    addScore(score) {
        this._scoreHistory.push(score);
    }

    get scoreHistory() {
        return this.scoreHistory;
    }

    get name() {
        return this.name;
    }

    get currAttempt() {
        return this.currAttempt;
    }
}