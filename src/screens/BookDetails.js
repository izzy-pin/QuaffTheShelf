import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { readBookDetails } from "../utils/firebase-funcs";
import { getAuth } from "firebase/auth";

import defaultCover from "../assets/defaultCover.png";
const BookDetails = ({ route }) => {
  const { isbn } = route.params;
  const [book, setBook] = useState({});

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

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
    <View style={styles.container}>
      <View style={styles.book}>
        <View style={styles.bookText}>
          <Text style={styles.bookTitle}>{book.bookTitle}</Text>
          <Text>
            {book.bookSubTitle === "No Subtitle found"
              ? null
              : book.bookSubTitle}
          </Text>
          <Text>{book.bookAuthor}</Text>
        </View>

        <Image
          style={styles.bookImage}
          source={
            book.bookCover === "No image found"
              ? defaultCover
              : { uri: book.bookCover }
          }
        />
      </View>
      <View>
        {Object.keys(book).includes("drinkPairings") &&
        Object.keys(book.drinkPairings).includes(email) ? (
          <Text style={styles.drink}>
            Drink: {book.drinkPairings[email].drink}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  book: {
    margin: 10,
  },
  bookImage: {
    height: 118,
    resizeMode: "contain",
    width: 90,
  },
  bookText: {
    marginBottom: 10,
  },
  bookTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  drink: {
    fontSize: 20,
  },
});

export default BookDetails;
