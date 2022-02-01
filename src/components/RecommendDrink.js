import React from "react";
import { Text } from "react-native";

import drinkRecs from "../utils/drinkRecs";
// import addVotes from "../utils/addVotes";
import { useEffect, useState } from "react/cjs/react.development";

const RecommendDrink = ({ email, isbn }) => {
  const [recs, setRecs] = useState({});

  useEffect(() => {
    drinkRecs(email, isbn).then((recsFromDrinksRecs) => {
      console.log(recsFromDrinksRecs);
      setRecs(recsFromDrinksRecs);
    });
  }, []);
  return (
    <Text>
      {recs.firstRec} {recs.secondRec}
    </Text>
    // text with first rec,  thumbs up/ thumbs down buttons (emoji)
    // if accept add vote on press
    // else show second rec y/n
    // if accept, add vote
    // else dropdown with options from their array + can select one (button onpress addVote)
  );
};

export default RecommendDrink;
