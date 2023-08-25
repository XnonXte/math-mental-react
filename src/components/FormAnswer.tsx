import { useState } from "react";

interface FormAnswerProps {
  onAnswer: (answer: number) => void;
}

export default function FormAnswer({ onAnswer }: FormAnswerProps) {
  const [answer, setAnswer] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAnswer(parseInt(answer));
          setAnswer("");
        }}
        className="form-input"
      >
        <input
          type="number"
          name="answer"
          id="answer"
          placeholder="Your answer..."
          value={answer}
          required
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button type="submit">Answer</button>
      </form>
    </>
  );
}
