import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
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
        console.log("created user", user.email);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleLogIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in user", user.email);
        setSignedIn(true);
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log(err);
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
    <View>
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
    </View>
  );
};

export default Landing;
