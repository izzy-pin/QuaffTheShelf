import React, { useEffect, useState } from "react";

import { Button, View, Text, Image, StyleSheet } from "react-native";
import BookList from "../components/BookList";
import { getAuth } from "firebase/auth";
import { getUserProfile } from "../utils/firebase-funcs";

const Home = ({ navigation }) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  // const [isError, setIsError] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  useEffect(() => {
    // setIsError(false);
    getUserProfile(email)
      .then((userDetails) => {
        setName(userDetails.name);
        setProfilePic(userDetails.profilePicUrl);
      })
      .catch(() => {
        // setIsError(true);
      });
  }, []);
  return (
    <View>
      <Text>Hi, {name}!</Text>

      <Image
        style={styles.image}
        source={
          profilePic
            ? {
                uri: profilePic,
              }
            : require("../assets/hamburger.png")
        }
      />
      <BookList navigation={navigation} />
      <Button
        title="Add new book"
        onPress={() => {
          navigation.navigate("AddBook");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 200 / 2,
    height: 200,
    resizeMode: "contain",
    width: 200,
  },
});

export default Home;
