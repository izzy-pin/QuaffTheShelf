import React from "react";
import { View, Image, Pressable } from "react-native";

const Header = ({ navigation }) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Image source={require("../assets/logo.png")} style={imagestyle} />
      </Pressable>
    </View>
  );
};

const imagestyle = { width: 150, height: 50, resizeMode: "contain" };

export default Header;
