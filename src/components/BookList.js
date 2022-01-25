import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";

const BookList = ({ navigation }) => {
  console.log(navigation);
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
              <Button
                title={(book.title, book.img_url)}
                onPress={() => {
                  navigation.navigate("BookDetails");
                }}
              />
            </li>
          );
        })}
      </ul>
    </View>
  );
};

export default BookList;
