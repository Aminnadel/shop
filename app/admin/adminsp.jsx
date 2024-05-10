import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import backButtonImage from "../../assets/back.png";
import { useLocalSearchParams } from "expo-router";
import { db } from "../../firebase/Config";
import { router } from "expo-router";

const Adminsp = () => {
  const [product, setProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
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

  const deleteProduct = async (productId) => {
    try {
      const productDocRef = doc(db, "product", productId);
      await deleteDoc(productDocRef);
      console.log("Product deleted successfully!");
      router.replace("/account/adminhome");
    } catch (err) {
      console.log("Failed to delete product:", err.message);
    }
  };

  const updateProduct = async () => {
    const productRef = doc(db, "product", productId);
    try {
      await updateDoc(productRef, { name: newName, price: newPrice });
      console.log("Product updated successfully!");
      alert("Product updated successfully!");
      setIsModalVisible(false);
      getProduct();
    } catch (error) {
      console.error("Error updating product:", error);
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
          onPress={() => router.replace("/account/adminhome")}
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

        <View style={styles.reviewbox}></View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsModalVisible(true)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Update</Text>
            <Image
              source={require("../../assets/updating.png")}
              style={styles.buttonImage}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => deleteProduct(productId)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Delete</Text>
            <Image
              source={require("../../assets/trash.png")}
              style={styles.buttonImage}
            />
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Edit Product</Text>
              <TextInput
                placeholder="New Name"
                style={styles.input}
                value={newName}
                onChangeText={(text) => setNewName(text)}
              />
              <TextInput
                placeholder="New Price"
                style={styles.input}
                value={newPrice}
                onChangeText={(text) => setNewPrice(text)}
              />
              <TouchableOpacity
                style={styles.updateButton}
                onPress={updateProduct}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    backgroundColor: "darkcyan",
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
    height: "35%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: "darkcyan",
    padding: 10,
    borderRadius: 22,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 22,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Adminsp;
