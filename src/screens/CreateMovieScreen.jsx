import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../components/inputs/CustomTextInput";
import useMoviesStore from "../stores/useMoviesStore";
import { db } from "../database/db";

export default function CreateMovieScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  //const { error, addMovie } = useMoviesStore();

  const onSubmit = async () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO movies (title, duration_minutes, release_year, director) VALUES ('test', 10, 2022, 'test')",
          [],
          (_, response) => console.log(JSON.stringify(response)),
          (tx, error) => {
            console.log(error);
          }
        );
      },
      null,
      true
    );
    /* await addMovie({
      title,
      duration,
    });*/
    navigation.goBack();
  };

  const add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  return (
    <View style={styles.background}>
      <Text style={styles.pageTitle}>Ajout de film🤵</Text>
      <CustomTextInput
        placeholder="title"
        value={title}
        onChangeText={setTitle}
      />
      <CustomTextInput
        placeholder="Mot de passe"
        value={duration}
        onChangeText={setDuration}
      />
      <CustomButton onPress={() => onSubmit()}>Créer le film 🔑</CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    alignSelf: "center",
  },
});
