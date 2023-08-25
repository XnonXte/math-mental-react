import History from "./History";

type MathQuestionHistory = {
  id: string;
  question: string;
  answer: number | undefined;
  userAnswer: number;
  isCorrect: boolean;
};

interface GameFinishedProps {
  history: MathQuestionHistory[];
  onClick: () => void;
}

export default function GameFinished({ history, onClick }: GameFinishedProps) {
  const correctCount = history.filter((item) => item.isCorrect).length;

  return (
    <>
      <h3>
        You've correctly solved {correctCount} out of {history.length}{" "}
        {correctCount === 0 && ":("}
      </h3>
      <ul className="list-container">
        <History history={history} />
      </ul>
      <button type="button" onClick={onClick}>
        Restart Game
      </button>
    </>
  );
}
