import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "../asyncThunkActions/moviesThunkActions";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAllMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getAllMovies.pending, (state, action) => {
        state.loading = true;
        state.movies = [];
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAllMovies } = movieSlice.actions;

export default movieSlice.reducer;
