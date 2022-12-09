import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new Goal
export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get user Goal
export const getGoal = createAsyncThunk("goals/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getGoal(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//delete user Goal
export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(goalId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoal.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload._id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
