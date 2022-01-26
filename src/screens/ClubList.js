import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  Button,
} from "react-native";

const ClubList = ({ navigation }) => {
  const [clubs, setClubs] = useState([]);

  const Item = ({ title }) => {
    return (
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("ClubDetails");
          }}
        >
          <Text>{title}</Text>
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    setClubs([
      { title: "test club 1" },
      { title: "test club 2" },
      { title: "test club 3" },
    ]);
  }, []);

  const renderItem = ({ item }) => {
    return <Item title={item.title} />;
  };

  return (
    <View>
      <Text>Hello from club list!</Text>
      <SafeAreaView>
        <FlatList
          data={clubs}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </SafeAreaView>

      <Button
        title="Create new club"
        onPress={() => {
          navigation.navigate("AddClub");
        }}
      />
      <Button
        title="Join club"
        onPress={() => {
          navigation.navigate("JoinClub");
        }}
      />
    </View>
  );
};

export default ClubList;
