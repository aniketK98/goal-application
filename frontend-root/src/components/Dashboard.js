import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "./GoalForm";
import GoalItem from "./GoalItem";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { getGoal, reset } from "../features/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    console.log("Dashboard");
    if (isError) {
      console.log(message);
    }
    console.log(user, isError, message);
    if (!user) {
      navigate("/login");
    }

    dispatch(getGoal());
    console.log("Dashboard out");

    return () => dispatch(reset());
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="dashboard">
        <h1>
          Welcome <span className="username">{user && user.name}</span>
        </h1>
        <h3>Goals Dashboard</h3>
        <GoalForm />

        <div className="content">
          {goals.length > 0 ? (
            <div className="goals">
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <center>
              <h3>You have not set any goals.</h3>
              <h3>Start Setting them now</h3>
            </center>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
