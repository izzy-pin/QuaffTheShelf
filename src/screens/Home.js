import React from "react";

import { Button, View } from "react-native";
import BookList from "../components/BookList";

const Home = ({ navigation }) => {
  return (
    <View>
      <BookList navigation={navigation} />
      <Button
        title="Add new book"
        onPress={() => {
          navigation.navigate("AddBook");
        }}
      />
    </View>
  );
};

export default Home;
