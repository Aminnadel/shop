import Categories from "../../Components/Categories";
import Header from "../../Components/Header";
import Products from "../../Components/Products";
import { View, StyleSheet, ScrollView } from "react-native";
import AboveHeader from "../../Components/AboveHeader";
export default function Home() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <AboveHeader />
        <Header />
        {/* <Categories /> */}
        <Products />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
});
