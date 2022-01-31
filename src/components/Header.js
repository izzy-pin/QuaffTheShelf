import React from "react";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getAuth, signOut } from "@firebase/auth";

const Header = ({ navigation }) => {
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate("Landing");
    });
  };
  return (
    <>
      <View style={styles.screenTopMargin}></View>
      <View style={styles.content}>
        <TouchableHighlight
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Image
            source={require("../assets/hamburger.png")}
            style={styles.burger}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image source={require("../assets/logo.png")} style={styles.image} />
        </TouchableHighlight>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const white = "#FFFFFF";

const styles = StyleSheet.create({
  burger: {
    height: 35,
    resizeMode: "contain",
    width: 35,
  },
  content: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  image: {
    height: 50,
    resizeMode: "contain",
    width: 50,
  },
  logOutText: {
    fontSize: 18,
  },
  screenTopMargin: {
    color: white,
    height: 20,
  },
});

export default Header;
