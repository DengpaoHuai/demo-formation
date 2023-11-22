import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CustomTextInput from "../../components/inputs/CustomTextInput";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = () => {
    fetch("https://crudcrud.com/api/9263fe00f74f47b0bd02e08c5024de9a/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://i.pinimg.com/564x/95/65/ac/9565acb26c627decd036b2118fdb68f3.jpg",
      }}
    >
      <View style={styles.buttonContainer}>
        <Text style={styles.pageTitle}>Vous êtes nouveau ? 🎅</Text>
        <CustomTextInput
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />

        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomTextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton onPress={() => onSubmit()}>
          Je crée mon compte 🚀
        </CustomButton>
      </View>
    </ImageBackground>
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
