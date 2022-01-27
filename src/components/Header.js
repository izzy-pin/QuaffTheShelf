import React from "react";
import { View, Image, TouchableHighlight } from "react-native";
import BurgerMenu from "./BurgerMenu";

const Header = ({ navigation }) => {
  return (
    <View>
      <BurgerMenu navigation={navigation} />
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
