import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllMovies = createAsyncThunk("movie/getAllMovies", async () => {
  const response = await fetch(
    "https://crudcrud.com/api/9263fe00f74f47b0bd02e08c5024de9a/movies"
  );
  const results = await response.json();
  return results;
});
