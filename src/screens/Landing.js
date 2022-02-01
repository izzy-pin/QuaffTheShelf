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
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import app from "../../firebase-config";

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
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <KeyboardAvoidingView behavior="position">
        <Image source={require("../assets/QTSLogo.png")} style={styles.image} />
        <View style={styles.content}>
          <TextInput
            style={styles.textInputBox}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            style={styles.textInputBox}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handleLogIn}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const wine = "#B43F5E";
const white = "#FFFFFF";
const gray = "gray";

const styles = StyleSheet.create({
  button: {
    backgroundColor: wine,
    borderRadius: 50,
    margin: 5,
    width: 200,
  },
  buttonText: {
    color: white,
    fontSize: 15,
    margin: 5,
    padding: 10,
    textAlign: "center",
  },
  content: {
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    height: 100,
    marginVertical: "30%",
    width: 100,
  },
  textInputBox: {
    borderColor: gray,
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 15,
    margin: 5,
    padding: 10,
    textAlign: "center",
    width: 200,
  },
});

export default Landing;
