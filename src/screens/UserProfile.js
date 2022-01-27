import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { RadioButton } from "react-native-paper";
//import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../firebase-config";

const UserProfile = () => {
  const [alcoholBool, setAlcoholBool] = useState(true);
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //  const email = user.email
  const email = "user3@email.com";
  const firestore = getFirestore();

  const handleSave = async () => {
    const docRef = doc(firestore, `users/${email}`);
    try {
      await setDoc(docRef, {
        alcoholBool: alcoholBool,
      });
      console.log("Save successful!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Text>Tell us about yourself</Text>
      <Text>{email}</Text>
      <Text>Would you like alcoholic or nonalcoholic suggestions?</Text>
      <View style={radioStyle}>
        <RadioButton
          value="alcohol"
          status={alcoholBool === true ? "checked" : "unchecked"}
          onPress={() => setAlcoholBool(true)}
        />
        <Text>Yes please to alcoholic drinks</Text>
      </View>
      <View style={radioStyle}>
        <RadioButton
          value="no alcohol"
          status={alcoholBool === false ? "checked" : "unchecked"}
          onPress={() => setAlcoholBool(false)}
        />
        <Text>No thanks, I&apos;m teetotal</Text>
      </View>
      <Button onPress={handleSave}></Button>
      {/* <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      ></TextInput> */}
    </View>
  );
};
const radioStyle = { flexDirection: "row", alignItems: "center" };
export default UserProfile;
