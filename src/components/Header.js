import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "@firebase/auth";
//import app from "../../firebase-config";

const Header = ({ navigation }) => {
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate("Landing");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TouchableOpacity onPress={handleLogOut}>
      <Text>Log Out</Text>
    </TouchableOpacity>
  );
};

export default Header;
