// WordPress will auto load wp-component instead of React & ReactDOM
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './frontend.scss';

const divsToUpdate = document.querySelectorAll('.paying-attention-update-me');

// Loop through attention-plugin divs on frontend
divsToUpdate.forEach(function (div) {
    const data = JSON.parse(div.querySelector('pre').innerHTML);
    ReactDOM.render(<Quiz {...data} />, div);
    div.classList.remove('paying-attention-update-me');
});

function Quiz(props) {
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [isCorrectDelayed, setIsCorrectDelayed] = useState(undefined);

    function handleAnswer(index) {
        if (index == props.correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    useEffect(() => {
        if (isCorrect == false) {
            setTimeout(() => setIsCorrect(undefined), 2600);
        }
        if (isCorrect == true) {
            setTimeout(() => {
                setIsCorrectDelayed(true);
            }, 1000);
        }
    }, [isCorrect]);

    return (
        <div className="paying-attention-frontend">
            <p>{props.question}</p>
            <ul>
                {props.answers.map(function (answer, index) {
                    return (
                        <li
                            className={
                                (isCorrectDelayed === true &&
                                index == props.correctAnswer
                                    ? 'no-click'
                                    : '') +
                                (isCorrectDelayed === true &&
                                index != props.correctAnswer
                                    ? 'fade-incorrect'
                                    : '')
                            }
                            onClick={
                                isCorrect === true
                                    ? undefined
                                    : () => handleAnswer(index)
                            }
                        >
                            {isCorrectDelayed == true &&
                                index == props.correctAnswer && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        className="bi bi-check-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                    </svg>
                                )}
                            {isCorrectDelayed == true &&
                                index != props.correctAnswer && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-x-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                                        />
                                    </svg>
                                )}
                            {answer}
                        </li>
                    );
                })}
            </ul>
            <div
                className={
                    'correct-message' +
                    (isCorrect === true ? ' correct-message--visible' : '')
                }
            >
                {/* HAPPY FACE */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="bi bi-emoji-smile-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                </svg>
                <p>That is correct!</p>
            </div>
            <div
                className={
                    'incorrect-message' +
                    (isCorrect === false ? ' correct-message--visible' : '')
                }
            >
                {/* SAD FACE */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="bi bi-emoji-frown-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
                </svg>
                <p>Sorry, try again</p>
            </div>
        </div>
    );
}
