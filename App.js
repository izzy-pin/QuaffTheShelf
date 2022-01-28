import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Landing from "./src/screens/Landing";
import Home from "./src/screens/Home";
import AddBook from "./src/screens/AddBook";
import AddClub from "./src/screens/AddClub";
import BookDetails from "./src/screens/BookDetails";
import ClubDetails from "./src/screens/ClubDetails";
import ClubList from "./src/screens/ClubList";
import Header from "./src/components/Header";
import JoinClub from "./src/screens/JoinClub";
import UserProfile from "./src/screens/UserProfile";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Landing"
        screenOptions={{ header: (props) => <Header {...props} /> }}
      >
        <Drawer.Screen
          options={{ drawerItemStyle: { display: "none" } }}
          name="Landing"
          component={Landing}
        />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="AddBook" component={AddBook} />
        <Drawer.Screen name="AddClub" component={AddClub} />
        <Drawer.Screen name="JoinClub" component={JoinClub} />
        <Drawer.Screen
          options={{ drawerItemStyle: { display: "none" } }}
          name="BookDetails"
          component={BookDetails}
        />
        <Drawer.Screen
          options={{ drawerItemStyle: { display: "none" } }}
          name="ClubDetails"
          component={ClubDetails}
        />
        <Drawer.Screen name="ClubList" component={ClubList} />
        <Drawer.Screen name="UserProfile" component={UserProfile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
