type MathQuestionHistory = {
  id: string;
  question: string;
  answer: number | undefined;
  userAnswer: number;
  isCorrect: boolean;
};

interface HistoryProps {
  history: MathQuestionHistory[];
}

export default function History({ history }: HistoryProps) {
  return history.map((item) => {
    return (
      <li
        key={item.id}
        className={`list-item ${item.isCorrect ? "correct" : "incorrect"}`}
      >
        {item.question} {item.isCorrect ? "=" : "≠"} {item.userAnswer}{" "}
        {!item.isCorrect && `(answer is ${item.answer}) `}
      </li>
    );
  });
}
