import React from "react";
import { Text } from "react-native";

export default function DemoScreen2({ route }) {
  console.log(route.params);
  return <Text>DemoScreen2</Text>;
}
