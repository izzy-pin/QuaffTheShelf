import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

const UserDrinksChoices = ({
  option,
  alcoholPrefs,
  setAlcoholPrefs,
  noAlcoholPrefs,
  setNoAlcoholPrefs,
  setIsSaved,
}) => {
  const formatDrinkString = (str) => {
    const spaced = str.replace(/([A-Z]+)/g, " $1");
    return spaced[0].toUpperCase() + spaced.substring(1);
  };
  const handleCheckBoxChange = (drinkType) => {
    setIsSaved(false);
    if (alcoholPrefs) {
      setAlcoholPrefs((currentPrefs) => {
        return { ...currentPrefs, [drinkType]: !currentPrefs[drinkType] };
      });
    } else {
      setNoAlcoholPrefs((currentPrefs) => {
        return { ...currentPrefs, [drinkType]: !currentPrefs[drinkType] };
      });
    }
  };
  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        style={styles.checkbox}
        color={wine}
        value={alcoholPrefs ? alcoholPrefs[option] : noAlcoholPrefs[option]}
        onValueChange={() => {
          handleCheckBoxChange(option);
        }}
      />
      <Text>{formatDrinkString(option)}</Text>
    </View>
  );
};
const wine = "#B43F5E";

const styles = StyleSheet.create({
  checkbox: {
    color: wine,
    marginRight: 5,
  },
  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
    paddingLeft: "15%",
  },
});

UserDrinksChoices.defaultProps = {
  alcoholPrefs: undefined,
  setAlcoholPrefs: undefined,
  noAlcoholPrefs: undefined,
  setNoAlcoholPrefs: undefined,
};

export default UserDrinksChoices;
