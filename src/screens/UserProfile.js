import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../firebase-config";
import { readUser } from "../utils/firebase-funcs";
import UserDrinksChoices from "../components/UserDrinksChoices";

const UserProfile = ({ navigation }) => {
  const alcoholAllFalse = {
    cocktails: false,
    redWine: false,
    whiteWine: false,
    roseWine: false,
    lager: false,
    ale: false,
    whiskey: false,
    gin: false,
  };

  const noAlcoholAllFalse = {
    mocktails: false,
    softDrinks: false,
    tea: false,
    coffee: false,
    alcoholFreeBeer: false,
    alcoholFreeWine: false,
  };
  const [imgUrl, setImgUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReadError, setIsReadError] = useState(false);

  const [alcoholBool, setAlcoholBool] = useState(true);
  const [drinksBoth, setDrinksBoth] = useState(false);

  const [alcoholPrefs, setAlcoholPrefs] = useState(alcoholAllFalse);
  const alcoholOptions = Object.keys(alcoholAllFalse).sort((a, b) =>
    a.localeCompare(b)
  );

  const [noAlcoholPrefs, setNoAlcoholPrefs] = useState(noAlcoholAllFalse);
  const noAlcoholOptions = Object.keys(noAlcoholAllFalse).sort((a, b) =>
    a.localeCompare(b)
  );

  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;
  const firestore = getFirestore();
  const docRef = doc(firestore, `users/${email}`);

  useEffect(() => {
    setIsSaved(false);
    setIsReadError(false);

    readUser(docRef)
      .then((userPrefs) => {
        if (userPrefs) {
          setAlcoholBool(userPrefs.alcoholBool);
          setDrinksBoth(userPrefs.drinksBoth);
          setFirstName(userPrefs.firstName);
          setLastName(userPrefs.lastName);
          setImgUrl(userPrefs.imgUrl);
          setAlcoholPrefs(userPrefs.drinksPrefs.alcoholPrefs);
          setNoAlcoholPrefs(userPrefs.drinksPrefs.noAlcoholPrefs);
        }
      })
      .catch(() => {
        setIsReadError(true);
      });
  }, []);

  const alcoholRadio = () => {
    setAlcoholBool(true);
    setDrinksBoth(false);
  };

  const noAlcoholRadio = () => {
    setAlcoholBool(false);
    setDrinksBoth(false);
  };

  const bothRadio = () => {
    setAlcoholBool(true);
    setDrinksBoth(true);
  };

  const handleSave = async () => {
    let drinksPrefs;
    if (drinksBoth) {
      drinksPrefs = { alcoholPrefs, noAlcoholPrefs };
    } else if (alcoholBool) {
      drinksPrefs = {
        alcoholPrefs,
        noAlcoholPrefs: {
          ...noAlcoholAllFalse,
        },
      };
      setNoAlcoholPrefs(noAlcoholAllFalse);
    } else {
      drinksPrefs = {
        alcoholPrefs: {
          ...alcoholAllFalse,
        },
        noAlcoholPrefs,
      };
      setAlcoholPrefs(alcoholAllFalse);
    }

    setIsError(false);
    setIsSaved(false);

    try {
      await setDoc(
        docRef,
        { firstName, lastName, imgUrl, alcoholBool, drinksPrefs, drinksBoth },
        { merge: true }
      );
      setIsSaved(true);
    } catch (err) {
      setIsError(true);
      setIsSaved(false);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" style={styles.content}>
        <Text style={styles.greetingText}>Tell us about yourself, {email}</Text>

        <View style={styles.textInputContainer}>
          <View style={styles.namesContainer}>
            <TextInput
              placeholder="First name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              style={[styles.textInput, styles.nameInput]}
            ></TextInput>
            <TextInput
              placeholder="Last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              style={[styles.textInput, styles.nameInput]}
            ></TextInput>
          </View>
          <TextInput
            placeholder="Profile picture URL..."
            value={imgUrl}
            onChangeText={(text) => setImgUrl(text)}
            style={styles.textInput}
          ></TextInput>
        </View>
      </KeyboardAvoidingView>

      <Text style={styles.questionText}>
        What kind of pairing suggestions would you like with your books?
      </Text>
      <Text style={styles.selectText}>Please select:</Text>
      <View style={styles.radioQuestionsContainer}>
        <Pressable style={styles.radioContainer} onPress={alcoholRadio}>
          <RadioButton
            value="alcohol"
            color={wine}
            status={
              drinksBoth ? "unchecked" : !alcoholBool ? "unchecked" : "checked"
            }
          />
          <Text style={styles.radioText}>I&apos;d like alcoholic pairings</Text>
        </Pressable>

        <Pressable style={styles.radioContainer} onPress={noAlcoholRadio}>
          <RadioButton
            value="no alcohol"
            color={wine}
            status={
              drinksBoth ? "unchecked" : !alcoholBool ? "checked" : "unchecked"
            }
            onPress={noAlcoholRadio}
          />
          <Text style={styles.radioText}>
            I&apos;d prefer non-alcoholic pairings
          </Text>
        </Pressable>

        <Pressable style={styles.radioContainer} onPress={bothRadio}>
          <RadioButton
            value="both"
            color={wine}
            status={drinksBoth ? "checked" : "unchecked"}
            onPress={bothRadio}
          />
          <Text style={styles.radioText}>
            Best of both, alcoholic and non-alcoholic pairings
          </Text>
        </Pressable>
      </View>

      {drinksBoth ? (
        <>
          <View style={styles.alcoholPrefsContainer}>
            <Text style={styles.optionsText}> Alcohol preferences:</Text>
            {alcoholOptions.map((option, index) => {
              return (
                <UserDrinksChoices
                  key={option + index}
                  option={option}
                  alcoholPrefs={alcoholPrefs}
                  setAlcoholPrefs={setAlcoholPrefs}
                  setIsSaved={setIsSaved}
                />
              );
            })}
          </View>
          <View style={styles.alcoholPrefsContainer}>
            <Text style={styles.optionsText}> Non-alcoholic preferences:</Text>
            {noAlcoholOptions.map((option, index) => {
              return (
                <UserDrinksChoices
                  key={option + index}
                  option={option}
                  noAlcoholPrefs={noAlcoholPrefs}
                  setNoAlcoholPrefs={setNoAlcoholPrefs}
                  setIsSaved={setIsSaved}
                />
              );
            })}
          </View>
        </>
      ) : alcoholBool ? (
        <View style={styles.alcoholPrefsContainer}>
          <Text style={styles.optionsText}> Alcoholic preferences:</Text>
          {alcoholOptions.map((option, index) => {
            return (
              <UserDrinksChoices
                key={option + index}
                option={option}
                alcoholPrefs={alcoholPrefs}
                setAlcoholPrefs={setAlcoholPrefs}
                setIsSaved={setIsSaved}
              />
            );
          })}
        </View>
      ) : (
        <View style={styles.alcoholPrefsContainer}>
          <Text style={styles.optionsText}> Non-alcoholic preferences:</Text>
          {noAlcoholOptions.map((option, index) => {
            return (
              <UserDrinksChoices
                key={option + index}
                option={option}
                noAlcoholPrefs={noAlcoholPrefs}
                setNoAlcoholPrefs={setNoAlcoholPrefs}
                setIsSaved={setIsSaved}
              />
            );
          })}
        </View>
      )}

      <View style={styles.saveSection}>
        {isError ? (
          <Text>
            Sorry, there&apos;s been an error saving your preferences. Please
            retry.
          </Text>
        ) : null}
        {isSaved ? (
          <Text style={styles.saved}>Preferences saved successfully!</Text>
        ) : null}
        {isReadError ? (
          <Text>
            Sorry, there was a problem retrieving your preferences. Please try
            again later.
          </Text>
        ) : null}

        {isSaved ? (
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Home</Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

const wine = "#B43F5E";
const white = "#FFFFFF";

const styles = StyleSheet.create({
  alcoholPrefsContainer: {
    paddingLeft: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: wine,
    borderRadius: 20,
    margin: 5,
    width: 90,
  },
  buttonText: {
    color: white,
    margin: 10,
  },

  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: "10%",
  },
  greetingText: {
    fontSize: 18,
    paddingLeft: 5,
  },
  nameInput: {
    width: "47%",
  },
  namesContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionsText: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  questionText: {
    fontSize: 15,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },

  radioContainer: {
    alignItems: "center",
    borderColor: wine,
    borderRadius: 50,
    borderWidth: 2,
    flexDirection: "row",
    margin: 8,
    width: "77%",
  },

  radioQuestionsContainer: {
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 10,
  },
  radioText: {
    paddingRight: 35,
    paddingVertical: 10,
  },

  saveSection: {
    alignItems: "center",
    margin: 10,
  },
  saved: {
    fontSize: 15,
    margin: 10,
  },
  selectText: {
    fontSize: 15,
    paddingLeft: 15,
    paddingTop: 5,
  },
  textInput: {
    borderColor: wine,
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
    padding: 10,
  },
  textInputContainer: {
    display: "flex",
    marginHorizontal: 5,
    marginVertical: 20,
  },
});
export default UserProfile;
