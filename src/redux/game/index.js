import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: localStorage.getItem('username') || '',
  scores: JSON.parse(localStorage.getItem('allScores')) || [],
  lastScore: 0,
  gameStatus: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.userName = payload;
    },
    addScores: (state, { payload }) => {
      state.scores = payload;
    },
    addLastScore: (state, { payload }) => {
      state.lastScore = payload;
    },
    setGameStatus: (state, { payload }) => {
      state.gameStatus = payload;
    },
    reset: state => {
      state.userName = '';
      state.lastScore = 0;
      state.gameStatus = '';
    },
  },
});

export const { setUsername, addScores, addLastScore, setGameStatus, reset } =
  gameSlice.actions;

export default gameSlice.reducer;
