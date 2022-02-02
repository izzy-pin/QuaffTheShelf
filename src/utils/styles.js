import { StyleSheet} from "react-native";

const wine = "#B43F5E";
const white = "#FFFFFF";
const glass = "rgba(150, 150, 150, 0.5)";
const gray = "gray";


const styles = StyleSheet.create({
  addBookButtonContainer: {
    alignItems: "center",
  },
  addBookScanner: {
    ...StyleSheet.absoluteFillObject,
    bottom: 175,
    left: 10,
    right: 10,
    top: 10,
  },
  addBookScannerContainer: {
    flex: 1,
  },

  bookDetailsBackground: {
    resizeMode: "cover",
  },

  bookDetailsBook: {
    alignItems: "center",
    margin: 10,
  },
  bookDetailsBookImage: {
    height: 236,
    resizeMode: "contain",
    width: 180,
  },
  bookDetailsBookText: {
    alignItems: "center",
    marginBottom: 10,
  },
  bookDetailsBookTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  bookDetailsContainer: {
    alignItems: "center",
    flex: 1,
  },
  bookDetailsDrink: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  bookDetailsDrinkPick: {
    fontSize: 36,
    textAlign: "center",
  },

  bookDetailsGradiant: {
    paddingBottom: 250
  },

  button: {
    backgroundColor: wine,
    borderRadius: 10,
    margin: 5,
    width: 200,
  },

  buttonText: {
    borderColor: gray,
    borderRadius: 10,
    borderWidth: 2,
    color: white,
    fontSize: 15,
    padding: 10,
    textAlign: "center",
  },

  headerBar: {
    borderBottomWidth: 1,
  },

  headerBurger: {
    height: 35,
    resizeMode: "contain",
    width: 35,
  },
  headerContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  headerImage: {
    height: 50,
    resizeMode: "contain",
    width: 50,
  },
  headerLogOutText: {
    fontSize: 18,
  },
  headerScreenTopMargin: {
    height: 20,
  },

  landingBackground: {},

  landingContent: {
    alignItems: "center",
  },
  landingContentContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  landingGlassContent: {
    backgroundColor: glass,
    borderColor: gray,
    borderRadius: 10,
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  landingLargeLogo: {
    alignSelf: "center",
    height: 200,
    marginVertical: "30%",
    width: 200,
  },
  landingTextInputBox: {
    backgroundColor: white,
    borderColor: gray,
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 15,
    margin: 5,
    padding: 10,
    textAlign: "center",
    width: 200,
  },
});

export default styles;
