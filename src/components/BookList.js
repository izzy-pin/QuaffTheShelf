import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import {
  readUserLibrary,
  readBookListDetails,
  deleteBookFromUserLibrary,
} from "../utils/firebase-funcs";
import defaultCover from "../assets/defaultCover.png";

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [deleteRefresh, setDeleteRefresh] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  const Item = ({ bookTitle, bookCover, isbn }) => {
    return (
      <View style={styles.item}>
        <Pressable
          onPress={() => {
            navigation.navigate("BookDetails", { isbn });
          }}
          onLongPress={() => {
            deleteBookFromUserLibrary(isbn, email)
              .then(() => {
                setDeleteRefresh(true);
              })
              .catch(() => {
                setIsError(true);
              });
          }}
        >
          <Text style={styles.title}>{bookTitle}</Text>
          <Image
            style={imageStyle}
            source={
              bookCover === "No image found" ? defaultCover : { uri: bookCover }
            }
          />
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    setIsError(false);
    setDeleteRefresh(false);
    readUserLibrary(email)
      .then((isbnLibrary) => {
        return isbnLibrary;
      })
      .then((isbnLibrary) => {
        return readBookListDetails(isbnLibrary);
      })
      .then((bookDetailsFromDB) => {
        setBooks(bookDetailsFromDB);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [deleteRefresh]);

  return isError ? (
    <View>
      <Text>Sorry, something went wrong...</Text>
    </View>
  ) : (
    <View>
      <View>
        <Text>You have {books.length} books in your library</Text>
        {books.length == 0 ? (
          <Text>Nothing to see here!</Text>
        ) : (
          <FlatList
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={true}
            data={books}
            renderItem={({ item }) => (
              <View>
                <Item
                  bookTitle={item.bookTitle}
                  bookCover={item.bookCover}
                  isbn={item.isbn}
                />
              </View>
            )}
            keyExtractor={(item) => item.isbn}
          />
        )}
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
