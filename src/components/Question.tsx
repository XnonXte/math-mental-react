interface QuestionProps {
  questionText: string;
  questionIndex: number;
  questionLength: number;
}

export default function Question({
  questionText,
  questionIndex,
  questionLength,
}: QuestionProps) {
  return (
    <>
      <span>
        Question {questionIndex}/{questionLength}
      </span>
      <h1 className="question">What's {questionText}?</h1>
    </>
  );
}
