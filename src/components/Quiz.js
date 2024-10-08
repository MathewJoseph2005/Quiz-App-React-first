import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import { Howl } from 'howler';

const Quiz = ({ data, onFinish, setScore, setTimeSpent }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeSpent, setQuizTimeSpent] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    // Initialize sound effects
    const correctSound = new Howl({
        src: ['/sounds/correct.mp3'], // Correct sound path
    });

    const incorrectSound = new Howl({
        src: ['/sounds/incorrect.mp3'], // Incorrect sound path
    });

    const handleAnswer = (answer) => {
        if (isAnswered) return; // Prevent multiple answers
        setIsAnswered(true);

        if (answer === data.questions[currentQuestionIndex].correct) {
            setScore(prevScore => prevScore + 1);
            correctSound.play(); // Play correct sound
        } else {
            incorrectSound.play(); // Play incorrect sound
        }

        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        setAnimationClass('fade-out');
        setTimeout(() => {
            setAnimationClass('');
            if (currentQuestionIndex < data.questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setIsAnswered(false); // Reset answered state for the next question
            } else {
                onFinish(); // Finish quiz
            }
        }, 300); // Delay for the animation
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setQuizTimeSpent(prevTime => prevTime + 1);
            setTimeSpent(prevTime => prevTime + 1); // Update the overall time spent
        }, 1000);

        return () => clearInterval(timer); // Cleanup the timer on unmount
    }, [setTimeSpent]); // Added setTimeSpent to the dependency array

    return (
        <div className={`quiz animated ${animationClass}`}>
            <h2>Question {currentQuestionIndex + 1}/{data.questions.length}</h2>
            <p>{data.questions[currentQuestionIndex].question}</p>
            <Timer timeSpent={timeSpent} />
            <div className="choices">
                {data.questions[currentQuestionIndex].answers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswer(answer)} disabled={isAnswered}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;
