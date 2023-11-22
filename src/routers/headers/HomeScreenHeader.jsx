import React, { useContext } from "react";
import CustomButton from "../../components/CustomButton";
import { UserContext } from "../../contexts/UserContextProvider";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreenHeader() {
  const { logout } = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <CustomButton
      onPress={() => {
        logout();
        navigation.reset({
          index: 0,
          routes: [{ name: "WelcomeScreen" }],
        });
      }}
    >
      Logout
    </CustomButton>
  );
}
