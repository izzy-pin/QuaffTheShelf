import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddBook from "../screens/AddBook";
import AddClub from "../screens/AddClub";
import ClubList from "../screens/ClubList";
import Home from "../screens/Home";
import JoinClub from "../screens/JoinClub";

import { View, Image, TouchableHighlight } from "react-native";

const Drawer = createDrawerNavigator();

const BurgerMenu = ({ navigation }) => {
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Image source={require("../assets/hamburger.png")} style={imageStyle} />
      </TouchableHighlight>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="AddBook" component={AddBook} />
        <Drawer.Screen name="AddClub" component={AddClub} />
        <Drawer.Screen name="JoinClub" component={JoinClub} />
        <Drawer.Screen name="ClubList" component={ClubList} />
      </Drawer.Navigator>
    </View>
  );
};

const imageStyle = { width: 150, height: 50, resizeMode: "contain" };
export default BurgerMenu;
