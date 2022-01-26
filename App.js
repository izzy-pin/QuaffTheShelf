import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "./src/screens/Landing";
import Home from "./src/screens/Home";
import AddBook from "./src/screens/AddBook";
import AddClub from "./src/screens/AddClub";
import BookDetails from "./src/screens/BookDetails";
import ClubDetails from "./src/screens/ClubDetails";
import ClubList from "./src/screens/ClubList";
import Header from "./src/components/Header";
import JoinClub from "./src/screens/JoinClub";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddBook" component={AddBook} />
        <Stack.Screen name="AddClub" component={AddClub} />
        <Stack.Screen name="JoinClub" component={JoinClub} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="ClubDetails" component={ClubDetails} />
        <Stack.Screen name="ClubList" component={ClubList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
