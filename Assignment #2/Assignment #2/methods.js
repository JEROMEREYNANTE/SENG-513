export async function fetchQs(difficulty = "easy") {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure it returns an array even if API fails or is empty
        return Array.isArray(data.results) ? data.results : [];
    } catch (error) {
        console.error("Error fetching questions:", error);
        return []; // Return empty array if API call fails
    }
}


export function* generator(quiz) {    
    while (true) {
        if (quiz.score >= 5 && quiz.score < 10) quiz.difficulty = "medium";
        else if (quiz.score >= 10) quiz.difficulty = "hard";

        const questions = fetchQs(quiz.difficulty);
            
        for (const question of questions) {
            const userAnswer = yield question;
            if (userAnswer.correct) quiz.addScore();
        }
    }
}

