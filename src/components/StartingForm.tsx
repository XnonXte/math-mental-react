interface StartingFormProps {
  onGameStart: (event: unknown) => void;
  onChange: (input: string) => void;
  amount: string;
}

export default function StartingForm({
  onGameStart,
  amount,
  onChange,
}: StartingFormProps) {
  return (
    <form onSubmit={onGameStart} className="form-input">
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={amount}
        required
      />
      <button type="submit">Start Game</button>
    </form>
  );
}
