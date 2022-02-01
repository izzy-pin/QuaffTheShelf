import React from "react";
import bookRecs from "../components/PairingLogic";

import { View, Text, Button } from "react-native";

const AddClub = () => {
  return (
    <View>
      <Text>Hello from AddClub...</Text>
      <Button
        title="Book Rec Test"
        onPress={() => {
          bookRecs();
        }}
      />
    </View>
  );
};

export default AddClub;
