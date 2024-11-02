import { StyleSheet } from "react-native";

const stylesBoard = StyleSheet.create({
  //////General//////
  container: {
    flex: 1,
    backgroundColor: "#yourBackgroundColor", // Reemplaza con tu color principal
    position: "relative",
  },
  container3: {
    backgroundColor: "#yourBackgroundColor",
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  ////ItemList///////////////
  container6: {
    margin: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 0,
  },
  image: {
    width: "100%",
    height: 200, // Ajusta según tu diseño
    borderRadius: 10,
  },
  description: {
    color: "#818F8F",
    marginVertical: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  title3: {
    color: "#A8DCD9",
    fontSize: 24,
    fontWeight: "bold",
  },
  readMoreText: {
    color: "#yourColor", // Cambia según tu diseño
  },

  // Agrega esto en stylesBoard
  noImageText: {
    color: "#FF0000", // Rojo para indicar un error
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default stylesBoard;
