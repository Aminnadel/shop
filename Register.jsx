import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { register } from "../firebase/auth";
import { db } from "../firebase/Config";
import { collection, doc, setDoc } from "firebase/firestore";
import reg from "../assets/register.png";
import { router } from "expo-router";

const Register = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handlePress = async () => {
    try {
      const trimmedUserName = userName.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const trimmedPhone = phone.trim();
      const trimmedAddress = address.trim();

      if (!validateInputs()) return;
      const credentials = await register(trimmedEmail, trimmedPassword);
      const id = credentials.user.uid;

      await setDoc(doc(db, "users", id), {
        userName: trimmedUserName,
        email: trimmedEmail,
        phone: trimmedPhone,
        address: trimmedAddress,
      });

      console.log("credentials", id);
      router.navigate(`/account/login`);
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError(error);
    }
  };

  const validateInputs = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={reg} style={styles.logo} />
        <Text style={styles.Header}>Register</Text>
      </View>
      <Text style={styles.label}>Name :</Text>
      <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Phone :</Text>
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <Text style={styles.label}>Email :</Text>
      <TextInput
        placeholder="e.g : example@something.com"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Text style={styles.label}>Password :</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/account/login")}>
        <Text style={styles.loginLink}>Login</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#F7F7F7",
    width: "100%",
    borderColor: "#CCCCCC",
    borderRadius: 12,
  },
  Header: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 5,
  },
  button: {
    backgroundColor: "darkcyan",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 22,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFF",
  },
  loginLink: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "darkcyan",
  },
  error: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#102C57",
  },
  input: {
    width: "70%",
    height: "5%",
    borderBottomWidth: 3,
    borderBottomColor: "black",
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#474745",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 22,
    marginTop: "25%",
  },
  label: {
    alignSelf: "flex-start",
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: "15%",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0.3, height: 0.3 },
    textShadowRadius: 5,
  },
});

export default Register;
