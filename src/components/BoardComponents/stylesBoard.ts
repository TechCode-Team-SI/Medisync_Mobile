import { StyleSheet } from "react-native";

const stylesBoard = StyleSheet.create({
  //////General//////
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  searchContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  container3: {
    backgroundColor: "white",
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
    height: 200, 
    borderRadius: 10,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0", // Color de fondo para el placeholder
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
    color: "#yourColor", // Cambiar según el diseño
  },
  noPublicationsText: {
    color: "#818F8F", // Ajusta el color
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  dateText: {
    color: "#818F8F", // Ajusta el color según el diseño
    fontSize: 14,
    marginVertical: 5,
  },
});

export default stylesBoard;
