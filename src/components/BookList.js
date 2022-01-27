import React, { useEffect, useState } from "react"
import {
  Text,
  View,
  FlatList,
  StyleSheet,
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
          onLongPress={() => {
            alert("hurray! Deleted")
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
        title: "The Psychopath Test1",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
      {
        title: "The Psychopath Test2",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
      {
        title: "The Psychopath Test3",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
      {
        title: "The Psychopath Test4",
        author: "Jon Ronson",
        img_url:
          "https://images-eu.ssl-images-amazon.com/images/I/51ZGxfriOfL._SY291_BO1,204,203,200_QL40_ML2_.jpg",
      },
    ]);
  }, []);



  return (
    <View>
      <Text>Hello from book list!</Text>
      <View >
        {books.length == 0 ? <Text>Nothing to see here!</Text> : 
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          data={books}
          renderItem={({ item }) => (<View><Item title={item.title} img_url={item.img_url} /></View>)}
          keyExtractor={(item) => item.title}
        />}
      </View>
    </View>
  );
};

const imageStyle = { width: 300, height: 100, resizeMode: "contain" };

const styles = StyleSheet.create({
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
