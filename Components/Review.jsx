import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const App = () => {
  const [defaultRating, setDefaultRating] = useState(2);
  const maxRating = 5;

  const starImgFilled = require("../assets/star_filled.png");
  const starImgUnFilled = require("../assets/star_unfilled.png");

  const CustomRatingBar = () => {
    const [defaultRating, setDefaultRating] = useState(2);

    return (
      <View style={styles.CustomRatingBar}>
        {[1, 2, 3, 4, 5].map((item) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.7}
            onPress={() => setDefaultRating(item)}
          >
            <Image
              style={styles.starImg}
              source={item <= defaultRating ? starImgFilled : starImgUnFilled}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Rate Us</Text>
      <CustomRatingBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 23,
    marginTop: 20,
  },
  CustomRatingBar: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  starImg: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    padding: 15,
    backgroundColor: "green",
  },
});

export default App;
