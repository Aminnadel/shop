import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
export default function Categories() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories :</Text>
      <View style={styles.categories}>
        <TouchableOpacity
          style={styles.boxes}
          onPress={() => router.replace("/account/categoryone")}
        >
          <Image
            source={require("../assets/hawaiian-shirt.png")}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>Men's clothing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxes}
          onPress={() => router.replace("/account/categorytwo")}
        >
          <Image
            source={require("../assets/woman-clothes.png")}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>Women's clothing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxes}
          onPress={() => router.replace("/account/categorythree")}
        >
          <Image
            source={require("../assets/gems.png")}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>Jewelry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxes}
          onPress={() => router.replace("/account/categoryfour")}
        >
          <Image
            source={require("../assets/electronic-device.png")}
            style={styles.boxImage}
          />
          <Text style={styles.boxText}>Electronics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: "2%",
    padding: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
    borderColor: "#474745",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginRight: 375,
    marginLeft: 10,
    fontStyle: "italic",
    color: "#102C57",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  boxes: {
    marginBottom: 10,
    width: 130,
    height: 150, 
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxImage: {
    width: "90%",
    height: "65%",
    borderRadius: 20,
    marginLeft: "6%",
    marginTop: "0.5%",
  },
  boxText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
