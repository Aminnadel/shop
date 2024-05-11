import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

const BackToProductsButton = () => {
  const goToProductAdded = () => {
    router.replace("/account/addpro");
  };

  return (
    <TouchableOpacity onPress={goToProductAdded} style={styles.button}>
      <Text style={styles.buttonText}>Back to Products!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6347",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    width: "40%",
    alignSelf: "center",
    borderRadius: 22,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BackToProductsButton;
