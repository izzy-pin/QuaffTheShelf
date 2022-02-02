import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Text, View, FlatList, Image, Pressable } from "react-native";
import {
  readUserLibrary,
  readBookListDetails,
  deleteBookFromUserLibrary,
} from "../utils/firebase-funcs";
import defaultCover from "../assets/defaultCover.png";
import styles from "../utils/styles";

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [deleteRefresh, setDeleteRefresh] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  const Item = ({ bookTitle, bookCover, isbn }) => {
    return (
      <View>
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
          style={styles.bookListPressable}
        >
          <Image
            style={styles.bookCover}
            source={
              bookCover === "No image found" ? defaultCover : { uri: bookCover }
            }
          />
          <Text 
          style={styles.bookListBookTitle} 
          adjustsFontSizeToFit
          numberOfLines={2}>
             {bookTitle}
          </Text>
          
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
        <View>
          <Text style={styles.bookLibraryText}>
            You have {books.length} books in your library
          </Text>
        </View>
        {books.length == 0 ? (
          <Text>
            To get started finding the perfect drink pairing for your latest
            read, add your book to your library
          </Text>
        ) : (
          <FlatList
            style={styles.bookListFlat}
            horizontal
            centerContent={true}
            showsHorizontalScrollIndicator={true}
            data={books}
            renderItem={({ item }) => (
              <View style={styles.bookListItem}>
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

export default BookList;
