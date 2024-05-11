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

const AdminProductAdded = () => {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image
              source={{ uri: product.photoURL }}
              style={styles.productImage}
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <Text style={styles.productPrice}> {product.category}</Text>
            <TouchableOpacity
              onPress={() =>
                router.replace({
                  pathname: "/account/adminsp",
                  params: { productId: product.id },
                })
              }
              style={{
                backgroundColor: "#FF6347",
                padding: 10,
                alignItems: "center",
                marginTop: 10,
                borderRadius: 22,
                backgroundColor: "darkcyan",
              }}
            >
              <Text style={styles.buttonText}>Go to Product</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "center",
    padding: 10,
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
  button: {
    backgroundColor: "#FF6347",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
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
    width: "100%",
  },
  productContainer: {
    borderWidth: 1,

    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: "48%", 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});

export default AdminProductAdded;
