import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase/Config";
import { router } from "expo-router";

import backButtonImage from "../../assets/back.png";
import profileImage from "../../assets/user.png";
import uploadImageIcon from "../../assets/upload.png";
import logoutIcon from "../../assets/logout_icon.png";

const AdminProfile = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStoredImage = async () => {
      try {
        const storedImage = await AsyncStorage.getItem("profileImage");
        if (storedImage !== null) {
          setImage(storedImage);
        }
      } catch (error) {
        console.error("Error loading stored image:", error);
      }
    };

    loadStoredImage();
  }, []);

  const pickImage = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const uploadURL = await uploadImageAsync(result.assets[0].uri);
        setImage(uploadURL);
        await AsyncStorage.setItem("profileImage", uploadURL);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    try {
      const storageRef = ref(storage, `images/image-${Date.now()}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error(`Error uploading image: ${error}`);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@user_id");
      await auth.signOut();
      router.replace("/account/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
       
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/account/adminhome")}
        >
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.photoCont}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Image source={uploadImageIcon} style={styles.buttonImage} />
          <Text style={styles.text}>Upload your photo!</Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.text}>NAME:</Text>
          <Text style={styles.text}>PHONE:</Text>
          <Text style={styles.text}>ADDRESS:</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.text}>Log Out</Text>
          <Image source={logoutIcon} style={styles.buttonImage} />
        </TouchableOpacity>
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
  backButton: {
    position: "absolute",
    left: 15,
  },
  backButtonImage: {
    width: 30,
    height: 30,
    tintColor: "black",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10,
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
  photoCont: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 1,
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: "hidden",
    marginTop: "10%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 150,
  },
  button: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkcyan",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: "50%",
    flexDirection: "row",
  },
  info: {
    padding: 25,
    margin: 20,
    backgroundColor: "lightgrey",
    borderRadius: 25,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  logoutButton: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "maroon",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    width: "40%",
    flexDirection: "row",
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginLeft: 5,
    tintColor: "white",
  },
});

export default AdminProfile;
