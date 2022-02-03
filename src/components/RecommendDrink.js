import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../utils/styles";
import drinkRecs from "../utils/drinkRecs";
import addVotes from "../utils/addVotes";
import { useEffect, useState } from "react/cjs/react.development";

const RecommendDrink = ({ email, isbn }) => {
  const [recs, setRecs] = useState({});
  const [counter, setCounter] = useState(0);
  const [acceptedDrink, setAcceptedDrink] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState(false);

  DropDownPicker.setListMode("MODAL");

  useEffect(() => {
    setIsError(false);
    drinkRecs(email, isbn)
      .then((recsFromDrinksRecs) => {
        setRecs(recsFromDrinksRecs);
        setItems(
          recsFromDrinksRecs.userDrinkArray.map((drink) => {
            return { label: drink, value: drink };
          })
        );
      })
      .catch(() => setIsError(true));
  }, []);

  const handleUpVote = (drink) => {
    setAcceptedDrink(drink);
    addVotes(email, isbn, drink).catch(() => setIsError(true));
  };
  return isError ? (
    <View>
      <Text>Sorry, something went wrong...</Text>
    </View>
  ) : (
    <View>
      {acceptedDrink.length > 0 ? (
        <Text style={styles.chosenDrink}>You have chosen {acceptedDrink}!</Text>
      ) : counter === 0 ? (
        <View>
          <Text style={styles.bookDetailsDrink}>We recommend for you:</Text>
          <Text
            style={styles.bookDetailsDrinkPick}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {recs.firstRec}
          </Text>
          <View style={styles.recContainer}>
            <TouchableOpacity
              style={styles.recButton}
              onPress={() => handleUpVote(recs.firstRec)}
            >
              <Text style={styles.recButtonText}> 👍 </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.recButton}
              onPress={() => setCounter((currentCount) => (currentCount += 1))}
            >
              <Text style={styles.recButtonText}> 👎 </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : counter === 1 ? (
        <View>
          <Text style={styles.bookDetailsDrink}>
            Alternatively, we recommend for you:
          </Text>
          <Text
            style={styles.bookDetailsDrinkPick}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {recs.secondRec}
          </Text>
          <View style={styles.recContainer}>
            <TouchableOpacity
              style={styles.recButton}
              onPress={() => handleUpVote(recs.secondRec)}
            >
              <Text style={styles.recButtonText}> 👍 </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.recButton}
              onPress={() => setCounter((currentCount) => (currentCount += 1))}
            >
              <Text style={styles.recButtonText}> 👎 </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <Text>Choose below from your favourite drinks instead</Text>
          <ScrollView nestedScrollEnabled={true}>
            <DropDownPicker
              style={styles.recDropDown}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            {value !== null ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpVote(value)}
              >
                <Text style={styles.buttonText}>Save drink pairing</Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default RecommendDrink;
