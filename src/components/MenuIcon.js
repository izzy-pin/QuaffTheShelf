import React from "react";

import { Image, TouchableHighlight } from "react-native";

const MenuIcon = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      <Image source={require("../assets/hamburger.png")} style={imageStyle} />
    </TouchableHighlight>
  );
};

const imageStyle = { width: 150, height: 50, resizeMode: "contain" };

export default MenuIcon;
