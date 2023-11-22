import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function DemoScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>DemoScreen</Text>
      <CustomButton
        onPress={() => {
          navigation.navigate("DemoScreen2", {
            variable: "value",
          });
        }}
      >
        Navigate to PlanetList
      </CustomButton>
    </View>
  );
}
