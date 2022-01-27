import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
} from "react-native";

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  const Item = ({ title, img_url }) => {
    return (
      <View style={styles.item}>
        <Pressable
          onPress={() => {
            navigation.navigate("BookDetails");
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Image style={imageStyle} source={{ uri: img_url }} />
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    setBooks([
      {
        title: "The Psychopath Test",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
      {
        title: "The Psychopath Test",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
      {
        title: "The Psychopath Test",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
      {
        title: "The Psychopath Test",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
    ]);
  }, []);

  const renderItem = ({ item }) => {
    return <Item title={item.title} img_url={item.img_url} />;
  };

  return (
    <View>
      <Text>Hello from book list!</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.img_url}
        />
      </SafeAreaView>
    </View>
  );
};

const imageStyle = { width: 300, height: 100, resizeMode: "contain" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default BookList;
