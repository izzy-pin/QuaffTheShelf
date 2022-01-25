import React from "react";

import { Text, Button, View } from "react-native";

const Landing = ({ navigation }) => {
  return (
    <View>
      <Text>Hello from Landing</Text>
      <Button
        title="Got to Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default Landing;
