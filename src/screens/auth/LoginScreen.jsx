import React, { useState, useContext } from "react";
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
import { UserContext } from "../../contexts/UserContextProvider";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const onSubmit = () => {
    setUser({
      name: "test",
      email: "test",
    });
    navigation.navigate("Home", {
      name: "test",
    });
    /* fetch("https://crudcrud.com/api/9263fe00f74f47b0bd02e08c5024de9a/users", {})
      .then((response) => response.json())
      .then((results) => {
        const user = results.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          setUser(user);
          navigation.navigate("Home", {
            name: user.name,
          });
        } else {
          alert("Email ou mot de passe incorrect");
        }
      })
      .catch((error) => {
        console.log(error);
      });*/
  };
  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://i.pinimg.com/564x/95/65/ac/9565acb26c627decd036b2118fdb68f3.jpg",
      }}
    >
      <View style={styles.buttonContainer}>
        <Text style={styles.pageTitle}>Vous êtes de retour ! 🤵</Text>
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
        <CustomButton onPress={() => onSubmit()}>Connexion 🔑</CustomButton>
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
