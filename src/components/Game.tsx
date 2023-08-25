// TODO: Style the game with vanilla CSS.
// TODO: Add restart button. // DONE

import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Question from "./Question";
import FormAnswer from "./FormAnswer";
import GameFinished from "./GameFinished";
import StartingForm from "./StartingForm";

type MathQuestion = {
  question: string;
  answer: number | undefined;
};

type MathQuestionHistory = {
  id: string;
  question: string;
  answer: number | undefined;
  userAnswer: number;
  isCorrect: boolean;
};

export default function Game() {
  const [gameRunning, setGameRunning] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [gameEnding, setGameEnding] = useState(false);
  const [questions, setQuestions] = useState([] as MathQuestion[]);
  const [currentQuestion, setCurrentQuestion] = useState({} as MathQuestion);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [history, setHistory] = useState([] as MathQuestionHistory[]);

  function generateQuestions(amount: number) {
    const randomInt = (max: number) => Math.floor(Math.random() * max);
    const randomOperator = () =>
      ["+", "-", "/", "*"][Math.floor(Math.random() * 4)];

    const output: MathQuestion[] = [];

    for (let i = 0; i < amount; i++) {
      let num1 = randomInt(50);
      let num2 = randomInt(50);
      const operator = randomOperator();

      if (operator === "/") {
        num2 = randomInt(20);
        num1 = num2 * randomInt(10);
      }

      let answer;
      switch (operator) {
        case "+":
          answer = num1 + num2;
          break;
        case "-":
          answer = num1 - num2;
          break;
        case "*":
          answer = num1 * num2;
          break;
        case "/":
          answer = num1 / num2;
          break;
      }

      const displayOperator =
        operator === "*" ? "x" : operator === "/" ? "÷" : operator;
      const question = `${num1} ${displayOperator} ${num2}`;

      output.push({ question, answer });
    }

    setQuestions(() => output);
    setCurrentQuestion(() => output[0]);
  }

  function handleGameStart(e) {
    e.preventDefault();
    setAmountInput("");

    if (parseInt(amountInput) <= 0) {
      alert("The amount can't equal or less than 0!");
    } else {
      generateQuestions(parseInt(amountInput));
      setGameRunning(true);
    }
  }

  function processAnswer(answer: number) {
    setHistory(() => {
      return [
        ...history,
        {
          id: crypto.randomUUID(),
          question: currentQuestion.question,
          answer: currentQuestion.answer,
          userAnswer: answer,
          isCorrect: currentQuestion.answer === answer,
        },
      ];
    });

    if (currentQuestionIndex === questions.length - 1) {
      setGameRunning(false);
      setGameEnding(true);
    } else {
      showNextQuestion();
    }
  }

  function showNextQuestion() {
    const nextQuestionIndex = currentQuestionIndex + 1;
    const newQuestion = questions[nextQuestionIndex];
    setCurrentQuestion(() => newQuestion);
    setCurrentQuestionIndex(nextQuestionIndex);
  }

  function processReset() {
    setQuestions(() => []);
    setCurrentQuestion(() => {});
    setCurrentQuestionIndex(0);
    setHistory(() => []);
    setGameRunning(false);
    setGameEnding(false);
  }

  if (gameRunning && !gameEnding) {
    return (
      <div className="container">
        <Question
          questionText={currentQuestion.question}
          questionIndex={currentQuestionIndex + 1}
          questionLength={questions.length}
        />
        <FormAnswer onAnswer={processAnswer} />
      </div>
    );
  } else if (gameEnding) {
    return (
      <div className="container">
        <Header />
        <GameFinished history={history} onClick={processReset} />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="container">
        <Header />
        <StartingForm
          onGameStart={handleGameStart}
          amount={amountInput}
          onChange={setAmountInput}
        />
        <Footer />
      </div>
    );
  }
}
