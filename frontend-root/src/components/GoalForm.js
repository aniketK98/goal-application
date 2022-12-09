import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goalSlice";

function GoalForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  //   const user = useSelector((state) => state.auth);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={text}
            onChange={onChange}
            name="goal"
            id="goal"
            placeholder="Add Goal"
            required
          />
        </div>
        <div className="form-group">
          <button>Add Goal</button>
        </div>
      </form>
    </div>
  );
}

export default GoalForm;
