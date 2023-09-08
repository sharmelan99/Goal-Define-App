import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';
import { startTransition } from 'react';

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  };

  export const createGoal = createAsyncThunk(
    'goal/create',
    async (goalData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);
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

  export const getGoal = createAsyncThunk(
    'goal/get',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoal(token);
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

  export const deleteGoal = createAsyncThunk(
    'goal/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(id, token);
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
    name: 'goals',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createGoal.pending, (state) => {
            startTransition.isLoading = true
        }).addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        }).addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }).addCase(getGoal.pending, (state) => {
            startTransition.isLoading = true
        }).addCase(getGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        }).addCase(getGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }).addCase(deleteGoal.pending, (state) => {
            startTransition.isLoading = true
        }).addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter(
              (goal) => goal._id !== action.payload.id
            );
        }).addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    },
});

export const {reset} = goalSlice.actions;
export default goalSlice.reducer;