import React, { useEffect, useState } from "react";

import { View, Text, Image } from "react-native";
import BookList from "../components/BookList";
import { getAuth } from "firebase/auth";
import { getUserProfile } from "../utils/firebase-funcs";
import styles from "../utils/styles";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    <View style={styles.userProfilesContentHigher}>
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
      <View style={styles.userProfileButton}>
      <TouchableOpacity 
      style={styles.button}
      onPress={() => {
        navigation.navigate("AddBook");
      }}>
        <Text style={styles.buttonText}>
          Add a new book and get drink pairing!
        </Text>
      </TouchableOpacity>
      </View>
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
