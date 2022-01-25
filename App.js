import React from "reacct";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "./src/screens/Landing";
import Home from "./src/screens/Home";
import AddBook from "./src/screens/AddBook";
import AddClub from "./src/screens/AddClub";
import BookDetails from "./src/screens/BookDetails";
import ClubDetails from "./src/screens/ClubDetails";
import ClubList from "./src/screens/ClubList";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="AddClub" component={AddClub} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="ClubDetails" component={ClubDetails} />
        <Stack.Screen name="ClubList" component={ClubList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const white = "#fff";

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     backgroundColor: white,
//     flex: 1,
//     justifyContent: "center",
//   },
// });

export default App;
