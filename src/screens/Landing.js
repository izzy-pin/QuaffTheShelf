import React from "react";

import { Text, Button, View } from "react-native";

const Landing = ({ navigation }) => {
  return (
    <View>
      <Text>Hello from Landing</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    </View>
  );
};

export default Landing;
