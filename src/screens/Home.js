import React, { useEffect, useState } from "react";

import { Button, View, Text, Image } from "react-native";
import BookList from "../components/BookList";
import { getAuth } from "firebase/auth";
import { getUserProfile } from "../utils/firebase-funcs";
import styles from "../utils/styles";

const Home = ({ navigation }) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  useEffect(() => {
    getUserProfile(email).then((userDetails) => {
      setName(userDetails.name);
      setProfilePic(userDetails.profilePicUrl);
    });
  }, []);
  return (
    <View>
      <View style={styles.userProfileContent}>
        <Text style={styles.userProfileText}>Hi, {name}!</Text>

        <Image
          style={styles.profilePicture}
          source={
            profilePic
              ? {
                  uri: profilePic,
                }
              : require("../assets/anonAvatar.png")
          }
        />
      </View>

      <BookList navigation={navigation} />
      <Button
        title="Add new book, get drink pairing"
        onPress={() => {
          navigation.navigate("AddBook");
        }}
      />
      <Text style={styles.bookLibraryText}>
        Scroll through your library and click on a book to see your previous
        pairings
      </Text>
      <Text style={styles.bookLibraryText}>
        Press and hold to delete a book from your library
      </Text>
    </View>
  );
};

export default Home;
