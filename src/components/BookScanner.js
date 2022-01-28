import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../firebase-config";

const firestore = getFirestore();

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
    axios({ method: "get", url: bookAddress })
      .then((bookDetails) => {
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
        let bookSubTitle = ""
        if (dataID.data.subtitle) {
          bookSubTitle = dataID.data.subtitle;
          console.log(bookSubTitle);
        } else {
            bookSubTitle = "No Subtitle found";
          console.log("no subtitle");
        }

        // cover
        let bookCover = ""
        if (dataID.data.cover) {
          bookCover = dataID.data.cover.medium;
          console.log("the cover url is ", bookCover);
        } else {
          bookCover = "No image found";
          console.log(bookCover);
        }

        return { bookTitle, bookSubTitle, bookAuthor, bookCover, bookISBN };
      })
      .then((scannedBook) => {
        const { bookTitle, bookSubTitle, bookAuthor, bookCover, bookISBN } =
          scannedBook;
        const docRef = doc(firestore, `books/${bookISBN}`);
        setDoc(docRef, {
          bookTitle,
          bookSubTitle,
          bookAuthor,
          bookCover,
        }).catch((error) => {
          console.log(error);
        });
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
