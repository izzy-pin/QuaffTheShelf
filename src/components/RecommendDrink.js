import React from "react";
import { Text, Button, View, ScrollView, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

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

  useEffect(() => {
    drinkRecs(email, isbn).then((recsFromDrinksRecs) => {
      setRecs(recsFromDrinksRecs);
      setItems(
        recsFromDrinksRecs.userDrinkArray.map((drink) => {
          return { label: drink, value: drink };
        })
      );
    });
  }, []);

  const handleUpVote = (drink) => {
    addVotes(email, isbn, drink);
    setAcceptedDrink(drink);
  };
  return (
    <View>
      {acceptedDrink.length > 0 ? (
        <Text>You have chosen {acceptedDrink}!</Text>
      ) : counter === 0 ? (
        <View>
          <Text>{recs.firstRec}</Text>
          <Button title="👍" onPress={() => handleUpVote(recs.firstRec)} />
          <Button
            title="👎"
            onPress={() => setCounter((currentCount) => (currentCount += 1))}
          />
        </View>
      ) : counter === 1 ? (
        <View>
          <Text>{recs.secondRec}</Text>
          <Button title="👍" onPress={() => handleUpVote(recs.secondRec)} />
          <Button
            title="👎"
            onPress={() => setCounter((currentCount) => (currentCount += 1))}
          />
        </View>
      ) : (
        <>
          <ScrollView nestedScrollEnabled={true}>
            <DropDownPicker
              style={styles.dropDown}
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
            {value !== null ? (
              <Button title="submit" onPress={() => handleUpVote(value)} />
            ) : null}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const crimson = "crimson";
const styles = StyleSheet.create({
  dropDown: {
    backgroundColor: crimson,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default RecommendDrink;
