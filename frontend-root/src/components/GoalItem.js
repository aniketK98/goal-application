import React from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();

  return (
    <div className="goal">
      <div>
        <p>{new Date(goal.updatedAt).toLocaleString("en-IN")}</p>
      </div>
      <h2>{goal.text}</h2>
      <button className="close" onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
  );
}

export default GoalItem;
