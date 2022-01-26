import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";

const Item = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks([
      {
        title: "The Psychopath Test",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
    ]);
  }, []);

  const renderItem = ({ item }) => {
    return <Item title={item.title} />;
  };

  return (
    <View>
      <Text>Hello from book list!</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.img_url}
        />
      </SafeAreaView>
    </View>
  );
};

// const imageStyle = { width: 300, height: 100, resizeMode: "contain" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  // item: {
  //   backgroundColor: "#f9c2ff",
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // title: {
  //   fontSize: 32,
  // },
});

export default BookList;
