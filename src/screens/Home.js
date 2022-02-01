import React from "react";

import { Button, View } from "react-native";
import BookList from "../components/BookList";

const Home = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Add new book"
        onPress={() => {
          navigation.navigate("AddBook");
        }}
      />

      <BookList navigation={navigation} />
      <Button
        title="Groups I belong to"
        onPress={() => {
          navigation.navigate("ClubList");
        }}
      />
    </View>
  );
};

export default Home;
