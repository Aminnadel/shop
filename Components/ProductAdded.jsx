import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import backButtonImage from "../assets/back.png";
import addpost from "../assets/blog.png";

const ProductAdded = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const firestore = getFirestore();
        const productsCollection = collection(firestore, "product");
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const goToProductAdded = () => {
    router.replace("/account/addpro");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/account/addpro")}
        >
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Image
          source={require("../assets/blog.png")}
          style={styles.addPostImage}
        />
      </View>

      <View style={styles.productsContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Image
              source={{ uri: product.photoURL }}
              style={styles.productImage}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F7F7F7",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "8%",
    backgroundColor: "#F7F7F7",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
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
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: "48%", 
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  backButton: {
    position: "absolute",
    left: 15,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    tintColor: "black",
  },
  addPostImage: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginRight: 10, 
  },
});

export default ProductAdded;
