import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import app from "../../firebase-config";
app; //<- added to pass linting!!

const Landing = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  const handleCreateAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        navigation.navigate("Home"); //will changing to create account page
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
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        setSignedIn(true);
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
  const handleLogOut = () => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSignedIn(false);
        signOut(auth)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View>
          {signedIn === true ? (
            <TouchableOpacity onPress={handleLogOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLogIn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleCreateAccount}>
            <Text>Create Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Landing;
