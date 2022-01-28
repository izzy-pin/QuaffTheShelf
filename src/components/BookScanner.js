import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

const Barcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const bookAddress = `http://openlibrary.org/api/volumes/brief/isbn/${data}.json`;
    alert(`please navigate to ${bookAddress}`);

    // make an api call
    axios({ method: "get", url: bookAddress }).then((bookDetails) => {
      const dataID =
        bookDetails.data.records[Object.keys(bookDetails.data.records)[0]];

      //isbn
      const bookISBN = dataID.details.bib_key;
      console.log("the isbn is", bookISBN);

      //author
      const bookAuthor = dataID.data.authors[0].name;
      console.log("authors name is ", bookAuthor);

      //title
      const bookTitle = dataID.data.title;
      console.log("title is", bookTitle);

      //subtitle
      if (dataID.data.subtitle) {
        const bookSubTitle = dataID.data.subtitle;
        console.log(bookSubTitle);
      } else {
        console.log("no subtitle");
      }

      // cover
      if (dataID.data.cover) {
        const coverURL = dataID.data.cover.medium;
        console.log("the cover url is ", coverURL);
      } else {
        const coverURL = "No image found";
        console.log(coverURL);
      }
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={scannerStyle.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};
export default Barcode;

const scannerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});
