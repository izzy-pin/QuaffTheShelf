import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import { RadioButton, TextInput } from "react-native-paper";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import app from "../../firebase-config";
import { readUser } from "../utils/firebase-funcs";

const UserProfile = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReadError, setIsReadError] = useState(false);

  const [alcoholBool, setAlcoholBool] = useState(true);
  const [alcoholPrefs, setAlcoholPrefs] = useState({
    cocktails: false,
    redWine: false,
    whiteWine: false,
    roseWine: false,
    lager: false,
    ale: false,
    whiskey: false,
    gin: false,
  });
  const [noAlcoholPrefs, setNoAlcoholPrefs] = useState({
    mocktails: false,
    softDrinks: false,
    tea: false,
    coffee: false,
    alcoholFreeBeer: false,
    alcoholFreeWine: false,
  });

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
          setImgUrl(userPrefs.imgUrl);

          if (userPrefs.alcoholBool === true) {
            setAlcoholPrefs(userPrefs.drinksPrefs);
          } else {
            setNoAlcoholPrefs(userPrefs.drinksPrefs);
          }
        }
      })
      .catch(() => {
        setIsReadError(true);
      });
  }, []);

  const handleSave = async () => {
    const drinksPrefs = alcoholBool === true ? alcoholPrefs : noAlcoholPrefs;
    setIsError(false);
    setIsSaved(false);

    try {
      await setDoc(docRef, {
        imgUrl,
        alcoholBool,
        drinksPrefs,
      });
      setIsSaved(true);
    } catch (err) {
      setIsError(true);
      setIsSaved(false);
    }
  };

  const handleAlcoholCheckBoxChange = (drinkType) => {
    setIsSaved(false);
    setAlcoholPrefs((currentPrefs) => {
      return { ...currentPrefs, [drinkType]: !currentPrefs[drinkType] };
    });
  };

  const handleNoAlcoholCheckBoxChange = (drinkType) => {
    setIsSaved(false);
    setNoAlcoholPrefs((currentPrefs) => {
      return { ...currentPrefs, [drinkType]: !currentPrefs[drinkType] };
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        <View>
          <Text>Tell us about yourself</Text>
          <Text>{email}</Text>
          <TextInput
            placeholder="Please enter profile picture URL..."
            value={imgUrl}
            onChangeText={(text) => setImgUrl(text)}
          ></TextInput>
          <Text>Would you like alcoholic or nonalcoholic suggestions?</Text>
          <View style={styles.radioStyle}>
            <RadioButton
              value="alcohol"
              status={alcoholBool === true ? "checked" : "unchecked"}
              onPress={() => setAlcoholBool(true)}
            />
            <Text>Yes please to alcoholic drinks</Text>
          </View>
          <View style={styles.radioStyle}>
            <RadioButton
              value="no alcohol"
              status={alcoholBool === false ? "checked" : "unchecked"}
              onPress={() => setAlcoholBool(false)}
            />
            <Text>No thanks, I&apos;m teetotal</Text>
          </View>

          {alcoholBool ? (
            <View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.cocktails}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("cocktails");
                  }}
                />
                <Text>Cocktails</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.redWine}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("redWine");
                  }}
                />
                <Text>Red Wine</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.whiteWine}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("whiteWine");
                  }}
                />
                <Text>White Wine</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.roseWine}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("roseWine");
                  }}
                />
                <Text>Rose Wine</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.lager}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("lager");
                  }}
                />
                <Text>Lager</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.ale}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("ale");
                  }}
                />
                <Text>Ale</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.whiskey}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("whiskey");
                  }}
                />
                <Text>Whiskey</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={alcoholPrefs.gin}
                  onValueChange={() => {
                    handleAlcoholCheckBoxChange("gin");
                  }}
                />
                <Text>Gin</Text>
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={noAlcoholPrefs.mocktails}
                  onValueChange={() => {
                    handleNoAlcoholCheckBoxChange("mocktails");
                  }}
                />
                <Text>Mocktails</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={noAlcoholPrefs.softDrinks}
                  onValueChange={() => {
                    handleNoAlcoholCheckBoxChange("softDrinks");
                  }}
                />
                <Text>Soft Drinks</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={noAlcoholPrefs.tea}
                  onValueChange={() => {
                    handleNoAlcoholCheckBoxChange("tea");
                  }}
                />
                <Text>Tea</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={noAlcoholPrefs.coffee}
                  onValueChange={() => {
                    handleNoAlcoholCheckBoxChange("coffee");
                  }}
                />
                <Text>Coffee</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={noAlcoholPrefs.alcoholFreeBeer}
                  onValueChange={() => {
                    handleNoAlcoholCheckBoxChange("alcoholFreeBeer");
                  }}
                />
                <Text>Alcohol Free Beer</Text>
              </View>
              <View style={styles.checkboxStyle}>
                <Checkbox
                  value={noAlcoholPrefs.alcoholFreeWine}
                  onValueChange={() => {
                    handleNoAlcoholCheckBoxChange("alcoholFreeWine");
                  }}
                />
                <Text>Alcohol Free Wine</Text>
              </View>
            </View>
          )}

          <Button onPress={handleSave} title="Save"></Button>
          {isError ? (
            <Text>
              Sorry, there&apos;s been an error saving your preferences. Please
              retry.
            </Text>
          ) : null}
          {isSaved ? <Text>Preferences saved successfully!</Text> : null}
          {isReadError ? (
            <Text>
              Sorry, there was a problem retrieving your preferences. Please try
              again later.
            </Text>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkboxStyle: { alignItems: "center", flexDirection: "row" },
  radioStyle: { alignItems: "center", flexDirection: "row" },
});
export default UserProfile;
