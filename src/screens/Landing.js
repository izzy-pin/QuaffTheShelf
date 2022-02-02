import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import app from "../../firebase-config";
import styles from "../utils/styles";

const Landing = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigation.navigate("UserProfile");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            alert("You have entered an invalid email.");
            break;
          case "auth/email-already-in-use":
            alert("User login already exists. Try user login instead.");
            break;
          case "auth/weak-password":
            alert("Password should be at least six characters.");
            break;
          default:
            alert(
              "Create account error. Please enter a valid email address and password."
            );
            break;
        }
      });
  };
  const handleLogIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            alert("You have entered an invalid email.");
            break;
          case "auth/user-not-found":
            alert("User not found. Please retry or create an account.");
            break;
          case "auth/wrong-password":
            alert("Password does not match email address.");
            break;
          default:
            alert(
              "Login error. Please enter a valid email address and password."
            );
            break;
        }
      });
  };
  return (
    <ImageBackground
      source={require("../assets/landingBackground.png")}
      resizeMode="cover"
      style={styles.landingBackground}
    >
      <ScrollView contentContainerStyle={styles.landingContentContainer}>
        <KeyboardAvoidingView behavior="position">
          <Image
            source={require("../assets/QTSLogo.png")}
            style={styles.landingLargeLogo}
          />
          <View style={styles.landingGlassContent}>
            <View style={styles.landingContent}>
              <TextInput
                style={styles.landingTextInputBox}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
              <TextInput
                style={styles.landingTextInputBox}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              ></TextInput>
            </View>
            <View style={styles.landingContent}>
              <TouchableOpacity style={styles.button} onPress={handleLogIn}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateAccount}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

export default Landing;
