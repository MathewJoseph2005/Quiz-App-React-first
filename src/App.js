import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import { Howl } from 'howler';

const App = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [backgroundMusic, setBackgroundMusic] = useState(null); // Manage background music as state

    useEffect(() => {
        // Initialize Howl instance for background music
        const music = new Howl({
            src: ['/sounds/background.mp3'], // Use leading slash for public path
            loop: true,
            volume: 0.5, // Optional: Set volume
        });

        setBackgroundMusic(music);

        return () => {
            music.stop(); // Stop music on cleanup
        };
    }, []); // Only runs once on mount

    const startQuiz = (data) => {
        setQuizData(data);
        setQuizStarted(true);
        backgroundMusic.play(); // Play background music
        setTimeSpent(0); // Reset timer on start
    };

    const finishQuiz = () => {
        backgroundMusic.stop(); // Stop music on quiz finish
        setShowResult(true);
    };

    return (
        <div className="App">
            {!quizStarted ? (
                <Home startQuiz={startQuiz} />
            ) : showResult ? (
                <div className="result animated">
                    <h2>Quiz Completed!</h2>
                    <p>Your score: {score}</p>
                    <p>Time spent: {timeSpent} seconds</p>
                    <button onClick={() => { 
                        setQuizStarted(false); 
                        setShowResult(false); 
                        setScore(0); 
                    }}>Restart Quiz</button>
                </div>
            ) : (
                <Quiz 
                    data={quizData} 
                    onFinish={finishQuiz} 
                    setScore={setScore} 
                    setTimeSpent={setTimeSpent} 
                />
            )}
        </div>
    );
};

export default App;
