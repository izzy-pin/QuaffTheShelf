import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { getAuth } from "firebase/auth";

import Landing from "./src/screens/Landing";
import Home from "./src/screens/Home";
import AddBook from "./src/screens/AddBook";
import BookDetails from "./src/screens/BookDetails";
import Header from "./src/components/Header";
import UserProfile from "./src/screens/UserProfile";

import app from "./firebase-config";

const Drawer = createDrawerNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState("false");

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Landing"
        screenOptions={{
          header: (props) => (loggedIn ? <Header {...props} /> : null),
        }}
      >
        <Drawer.Screen
          options={{ drawerItemStyle: { display: "none" } }}
          name="Landing"
          component={Landing}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="AddBook"
          component={AddBook}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          options={{
            unmountOnBlur: true,
            drawerItemStyle: { display: "none" },
          }}
          name="BookDetails"
          component={BookDetails}
        />
        <Drawer.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
