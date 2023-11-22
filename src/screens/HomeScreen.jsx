import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useFetch from "../hooks/useFetch";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setAllMovies } from "../store/slices/movieSlice";
import useMoviesStore, { useMoviesFetch } from "../stores/useMoviesStore";
import { getAllMovies } from "../store/asyncThunkActions/moviesThunkActions";
import { db } from "../database/db";

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  //const { movies } = useMoviesFetch();
  // const { movies, setAll } = useMoviesStore();

  /* const { movies, error, loading } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    //setAll();
    dispatch(getAllMovies());
  }, []);

  //console.log(movies);

  

  const data = useSelector((state) => state);
  console.log(data?.movie?.movies);
  useEffect(() => {
    if (!movies) return;
    dispatch(setAllMovies(movies));
  }, [movies]);*/

  /*useEffect(() => {
    navigation.addListener("focus", () => {
      console.log("focus");
      refetch();
    });

    return () => {
      navigation.removeListener("focus");
    };
  }, []);*/

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from movies`,
        [],
        (_, { rows: { _array: results } }) => {
          console.log("results");
          console.log(results);
          setMovies(results);
        },
        (tx, error) => {
          console.log(error);
        }
      );
    });
  }, []);

  return (
    <View>
      <CustomButton
        onPress={() => {
          navigation.navigate("DemoScreen2");
        }}
      >
        Créer un film
      </CustomButton>
      {movies?.map((movie) => {
        return <Text>{movie.title}</Text>;
      })}
    </View>
  );
}
