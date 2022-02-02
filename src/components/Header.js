import React from "react";
import {
  View,
  Image,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from "react-native";
import { getAuth, signOut } from "@firebase/auth";
import styles from "../utils/styles"

const Header = ({ navigation }) => {
  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate("Landing");
    });
  };
  return (
    <View style={styles.headerBar}>
      <View style={styles.headerScreenTopMargin}></View>
      <View style={styles.headerContent}>
        <TouchableHighlight
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Image
            source={require("../assets/hamburger.png")}
            style={styles.headerBurger}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image source={require("../assets/QTSLogoTextless.png")} style={styles.headerImage} />
        </TouchableHighlight>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.headerLogOutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
