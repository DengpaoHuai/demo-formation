import { create } from "zustand";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { postData } from "../utils/fetchMethods";

const URL = "https://crudcrud.com/api/9263fe00f74f47b0bd02e08c5024de9a/";
const EXTENSION = "movies";

const useMoviesStore = create((set) => ({
  movies: [],
  error: null,
  setAll: async () => {
    const response = await fetch(URL + EXTENSION);
    const results = await response.json();
    set((state) => ({ movies: results }));
  },
  addMovie: async (movie) => {
    try {
      const result = await postData(URL + EXTENSION, movie);
      set((state) => ({ movies: [...state.movies, result] }));
    } catch (err) {
      set((state) => ({ error: err.message }));
    }
  },
}));

export default useMoviesStore;

export const useMoviesFetch = () => {
  const { setAll, ...properties } = useMoviesStore();

  useEffect(() => {
    setAll();
  }, []);

  return { setAll, ...properties };
};
