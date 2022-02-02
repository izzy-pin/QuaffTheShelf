import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, ImageBackground } from "react-native";
import { readBookDetails } from "../utils/firebase-funcs";
import { getAuth } from "firebase/auth";
import defaultCover from "../assets/defaultCover.png";
import RecommendDrink from "../components/RecommendDrink";
import styles from "../utils/styles";
import { LinearGradient } from "expo-linear-gradient";

const BookDetails = ({ route }) => {
  const { isbn } = route.params;
  const [book, setBook] = useState({});
  const [isError, setIsError] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  useEffect(() => {
    setIsError(false);
    readBookDetails(isbn)
      .then((bookFromApi) => {
        setBook(bookFromApi);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);
  return isError ? (
    <View>
      <Text>Sorry, something went wrong...</Text>
    </View>
  ) : (
    <ScrollView>
      <ImageBackground
        source={
          book.bookCover === "No image found"
            ? defaultCover
            : { uri: book.bookCover }
        }
        resizeMode="cover"
        style={styles.bookDetailsBackground}
      >
        <LinearGradient
          colors={["rgba(255,255,255, 0.5)", "rgba(255,255,255, 1)"]}
          style={styles.bookDetailsGradiant}
        >
          <View style={styles.bookDetailsContainer}>
            <View style={styles.bookDetailsBook}>
              <View style={styles.bookDetailsBookText}>
                <Text style={styles.bookDetailsBookTitle}>
                  {book.bookTitle}
                </Text>
                <Text>
                  {book.bookSubTitle === "No Subtitle found"
                    ? null
                    : book.bookSubTitle}
                </Text>
                <Text>{book.bookAuthor}</Text>
              </View>

              <Image
                style={styles.bookDetailsBookImage}
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
                <>
                  <Text style={styles.bookDetailsDrink}>
                    Your recomended Drink is:
                  </Text>
                  <Text
                    style={styles.bookDetailsDrinkPick}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                  >
                    {book.drinkPairings[email].drink}
                  </Text>
                </>
              ) : (
                <RecommendDrink email={email} isbn={isbn} />
              )}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

export default BookDetails;
