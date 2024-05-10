import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import backButtonImage from "../assets/back.png";
import { useLocalSearchParams } from "expo-router";
import { db } from "../firebase/Config";
import { router } from "expo-router";
import Review from "./Review";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const { productId } = useLocalSearchParams();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const docRef = doc(db, "product", productId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        setProduct(docSnapshot.data());
      } else {
        console.log("No such document!");
        setProduct();
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setProduct();
    }
  };

  const sendComment = async () => {
    try {
    } catch (error) {
      console.error("Failed to send comment:", error);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/account/Home")}
        >
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.containerimag}>
          <Image
            source={{ uri: product.photoURL }}
            style={styles.productImage}
          />
        </View>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <View style={styles.reviewbox}>
          <Review />
        </View>
        {/* <View style={{flexDirection:'row', justifyContent: "space-between",}}>
          <TextInput
            placeholder="Write a comment..."
            style={styles.input}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity onPress={sendComment} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
          </View> */}
        <ScrollView style={styles.commentsContainer}></ScrollView>
        <TouchableOpacity
          // onPress={() => addToCart(product.id)}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Add to Cart</Text>
            <Image
              source={require("../assets/cart.png")}
              style={styles.buttonImage}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
  bottomContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    marginTop: "1%",
    padding: 10,
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
  containerimag: {
    marginTop: "10%",
    width: "70%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: "10%",
  },
  productImage: {
    width: 370,
    height: 270,
    borderRadius: 8,
  },
  productName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: "center",
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
  button: {
    alignSelf: "stretch",
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
  buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 4,
    tintColor: "white",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewbox: {
    width: "100%",
    height: "20%",
  },
  input: {
    width: "70%",
    height: "5%",
    borderWidth: 3,
    borderBottomColor: "black",
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#474745",
  },
  sendButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  commentsContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
});

export default SingleProduct;
