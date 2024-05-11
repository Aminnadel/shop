import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
// import Carousel from 'react-native-snap-carousel';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase/Config";
import ProductAdded from "./ProductAdded";
export default function Header() {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("@user_id");
              await auth.signOut();
              router.replace("/account/login");
              console.log("User logged out");
            } catch (error) {
              console.error("Error logging out:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const carouselData = [
    require("../assets/download.png"),
    require("../assets/download.png"),
    require("../assets/download.png"),
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item} style={styles.carouselImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Carousel
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={500}
        itemWidth={200}
        layout="default"
        loop
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
  
    backgroundColor: "#F7F7F7", 
    width: "100%",
    marginBottom: "2%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topcontainer: {
    width: "100%",
    height: "30%",
    backgroundColor: "lightgrey", 
    borderRadius: 10,
    marginBottom: "1%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  profileImage: {
    marginTop: 10,
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    marginLeft: 15,
    marginRight: 430,
    borderColor: "#102C57", 
  },
  username: {
    fontWeight: "bold",
    fontSize: 30,
    marginRight: 190,
    marginTop: -70,
    color: "#102C57", 
  },
  welcomeText: {
    fontSize: 18,
    marginRight: 200,
    marginTop: -55,
    color: "#474745", 
  },
  navigationBar: {
    marginLeft: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    marginBottom: "2%",
    width: "90%",
    backgroundColor: "#B2BEB5",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 40,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B2BEB5",
    margin: 1,
    borderRadius: 24,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginLeft: 7,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 40,
    width: 500,
    height: 50,
    backgroundColor: "#FFFFFF",
    opacity: 0.5,
  },
  searchIcon: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },
  searchInput: {
    fontSize: 20,
    marginLeft: 10,
    color: "#474745",
  },
  carouselItem: {
    marginTop: 20,
    width: 205,
    height: 200,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: "4%",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
