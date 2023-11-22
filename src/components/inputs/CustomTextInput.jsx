import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function CustomTextInput({ ...props }) {
  return <TextInput {...props} style={styles.textInput} />;
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 17,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    width: "80%",
    alignSelf: "center",
  },
});
