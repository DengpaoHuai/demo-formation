import movieSlice from "./slices/movieSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    movie: movieSlice,
  },
});

export default store;
