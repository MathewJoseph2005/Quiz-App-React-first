import React, { useState } from 'react';

const Home = ({ startQuiz }) => {
    const [loading, setLoading] = useState(false);

    const handleStartQuiz = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
            const data = await response.json();
            const formattedQuestions = {
                questions: data.results.map(q => ({
                    question: q.question,
                    answers: [...q.incorrect_answers, q.correct_answer].sort(), // Shuffle answers
                    correct: q.correct_answer,
                })),
            };
            startQuiz(formattedQuestions);
        } catch (error) {
            console.error('Error fetching quiz questions:', error);
        }
        setLoading(false);
    };

    return (
        <div className="home animated">
            <h1>Welcome to the Quiz App</h1>
            {loading ? <p>Loading questions...</p> : (
                <button className="start-button" onClick={handleStartQuiz}>Start Quiz</button>
            )}
        </div>
    );
};

export default Home;
