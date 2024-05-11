import { StyleSheet, Text, View } from "react-native";
import Login from "../screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { auth } from "../firebase/Config";
import { router } from "expo-router";
export default function Page() {
  
  return <Login />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
});
