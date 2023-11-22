import React, { useRef } from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const animation = useRef(null);

  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://i.pinimg.com/564x/95/65/ac/9565acb26c627decd036b2118fdb68f3.jpg",
      }}
    >
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 300,
          height: 300,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../../assets/robot.json")}
      />

      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => navigation.navigate("LoginScreen")}>
          Connexion
        </CustomButton>
        <CustomButton onPress={() => navigation.navigate("RegisterScreen")}>
          Inscription
        </CustomButton>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
  },
});
