import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import app from "../../firebase-config";
app; //<- added to pass linting!!
const Landing = () => {
  //may need to put navigation in as a prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      })
      .catch((err) => {
        console.log(err.message);
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
        <TouchableOpacity onPress={handleLogIn}>
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Landing;
