import React from "react";
import { View, Image, TouchableHighlight } from "react-native";

const Header = ({ navigation }) => {
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
    </View>
  );
};

const imageStyle = { width: 150, height: 50, resizeMode: "contain" };

export default Header;
