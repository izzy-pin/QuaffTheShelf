import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { readBookDetails } from "../utils/firebase-funcs";
import defaultCover from "../assets/defaultCover.png";
const BookDetails = ({ route }) => {
  const { isbn } = route.params;
  const [book, setBook] = useState({});

  useEffect(() => {
    readBookDetails(isbn)
      .then((bookFromApi) => {
        setBook(bookFromApi);
        console.log(book);
      })
      .catch((err) => {
        console.log("There's been an error, ", err);
      });
  }, []);
  return (
    <View>
      <Text>{book.bookTitle}</Text>
      <Text>
        {book.bookSubTitle === "No Subtitle found" ? null : book.bookSubTitle}
      </Text>
      <Text>{book.bookAuthor}</Text>
      <Image
        style={styles.bookImage}
        source={
          book.bookCover === "No image found"
            ? defaultCover
            : { uri: book.bookCover }
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bookImage: {
    height: 118,
    resizeMode: "contain",
    width: 90,
  },
});

export default BookDetails;
