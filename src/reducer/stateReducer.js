import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  pages: Array.from({ length: 10 }, (_, i) => i + 1),
  keyword: localStorage.getItem('keyword') || '',
};

export const stateReducer = createSlice({
  name: 'stateReducer',
  initialState,
  reducers: {
    updateKeyword: (state, action) => {
      state.keyword = action.payload;
      localStorage.setItem('keyword', action.payload);
    },
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, action) => {
      state.isLoading = false;
      state.result = action.payload;
      state.error = false;
    },
    fetchFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetPage: (state) => {
      state.pages = Array.from({ length: 10 }, (_, i) => i + 1);
    },
    previousPage: (state) => {
      console.log(state.pages[0]);
      state.pages[0] >= 1 &&
        state.pages.forEach((page, index) => state.pages[index]--);
    },
    targetPage: (state, action) => {
      for (let i = 0; i < 10; i++) {
        state.pages[i] = action.payload + i;
      }
    },
    nextPage: (state) => {
      console.log('next');
      state.pages.forEach((page, index) => state.pages[index]++);
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  fetchSuccess,
  resetPage,
  previousPage,
  nextPage,
  targetPage,
  updateKeyword,
} = stateReducer.actions;

export default stateReducer.reducer;
