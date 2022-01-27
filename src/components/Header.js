import React from "react";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from "react-native";
import { getAuth, signOut } from "@firebase/auth";

const Header = ({ navigation }) => {
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate("Landing");
    });
  };
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Image source={require("../assets/hamburger.png")} style={imageStyle} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Image source={require("../assets/logo.png")} style={imageStyle} />
      </TouchableHighlight>
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const imageStyle = { width: 150, height: 50, resizeMode: "contain" };

export default Header;
