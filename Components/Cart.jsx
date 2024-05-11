import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../firebase/Config";
import { router } from "expo-router";
import backButtonImage from "../assets/back.png";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not authenticated.");
          return;
        }
  
        const userId = user.uid;
        const firestore = getFirestore();
        const cartRef = collection(firestore, "users", userId, "cart");
        const cartSnapshot = await getDocs(cartRef);
        const cartData = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(cartData);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  
    fetchCartItems();
  }, []);
  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.photo }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => router.navigate("/account/Home")}
          style={styles.backButton}
        >
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
        <View style={styles.cartTitleContainer}>
          <Image
            source={require("../assets/cartpage.png")}
            style={styles.cartIcon}
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        {cartItems.length === 0 ? (
          <Text>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    borderWidth: 1,
    backgroundColor: "#F7F7F7",
    width: "100%",
    borderColor: "#CCCCCC",
    borderRadius: 10,
  },
  topContainer: {
    width: "100%",
    height: "8%",
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
  },
  backButtonImage: {
    width: 30,
    height: 30,
    tintColor: "black",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 10,
    marginTop: "1%",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
  },
  cartTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "45%",
  },
  cartIcon: {
    width: 50,
    height: 50,
  },
});

export default Cart;
