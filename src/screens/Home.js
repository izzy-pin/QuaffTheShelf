import React from "react";

import { Text, Button, View } from "react-native";
import BookList from "../components/BookList";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Hello from Home...</Text>
      <Button
        title="Add new book"
        onPress={() => {
          navigation.navigate("AddBook");
        }}
      />
      <BookList navigation={navigation} />
    </View>
  );
};

export default Home;
