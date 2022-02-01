import React from "react";

import { View, Text, Button } from "react-native";
import addVotes from "../utils/addVotes";

const AddClub = () => {
  return (
    <View>
      <Text>Hello from AddClub...</Text>
      <Button
        title="Book Rec Test"
        onPress={() => {
          addVotes();
        }}
      />
    </View>
  );
};

export default AddClub;
