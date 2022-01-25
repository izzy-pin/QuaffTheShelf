import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Image } from "react-native";

const BookList = ({ navigation }) => {
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

  return (
    <View>
      <Text>Hello from BookList</Text>
      <ul>
        {books.map((book, index) => {
          return (
            <li key={index}>
              <Pressable
                onPress={() => {
                  navigation.navigate("BookDetails");
                }}
              >
                <Image source={{ uri: book.img_url }} style={imageStyle} />
                <Text>{book.title}</Text>
              </Pressable>
            </li>
          );
        })}
      </ul>
    </View>
  );
};

const imageStyle = { width: 300, height: 100, resizeMode: "contain" };

export default BookList;
