import { useRef } from "react";

export const NewTask = ({
  onAddTask,
}: {
  onAddTask: (data: FormData) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      action={(formData) => {
        onAddTask(formData);
        if (!inputRef.current) return;
        inputRef.current.value = ""; // Clear the input after submission
      }}
      className="w-full"
    >
      <div className="join w-full">
        <input
          ref={inputRef}
          name="description"
          type="text"
          className="input join-item grow"
          placeholder="Add something to do"
        />
        <button type="submit" className="btn join-item">
          Add
        </button>
      </div>
    </form>
  );
};
