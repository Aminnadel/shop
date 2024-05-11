import { router } from "expo-router";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Image, StyleSheet, Pressable, TouchableOpacity ,ScrollView } from 'react-native';
import {getDocFunc} from "../firebase/cities"
import {auth} from "../firebase/Config"

// Import your back button image from local files
import backButtonImage from '../assets/back.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userid, setuserid] = useState();


  useEffect(() => {

    const getProducts = async () => {
      console.log("cart item" ,cartItems)

      try {
        const uid = 'adkahsdkjahsdka2132';
        const collection = 'cart';
                console.log("sssssssss");

//`${userid}`
        const prods = await getDocFunc(collection,uid);
                console.log(prods);

        setCartItems(prods.cart);
      } catch (error) {
        console.error(error);
        // alert(error);
      } 
    };

// const getProducts = async () => {
//   console.log("cart item", cartItems);

//   try {
//     const uid = 'adkahsdkjahsdka2132';
//     const collection = 'cart';
//     console.log("sssssssss");

//     const prods = await getDocFunc(collection, uid);
//     console.log("Document snapshot:", prods);

//     if (prods) {
//       const cartData = prods.data();
//       console.log("Cart data:", cartData);

//       if (cartData && cartData.cart) {
//         console.log("Products in cart:", cartData.cart);
//         setCartItems(cartData.cart);
//       } else {
//         console.log("Cart data or products in cart are undefined.");
//       }
//     } else {
//       console.log("Document does not exist in the collection.");
//     }
//   } catch (error) {
//     console.error(error);
//     // alert(error);
//   }
// };



  //   const getcurrntuser = async() => {
  //     try {
  //         const user = await auth.currentUser;
  //         if (user !== null && user.uid) {
  //             setuserid(user.uid);
  //             console.log("user is ",user.uid)
  //         } else {
  //             console.log("No user is currently signed in.");
  //             // Handle the case where no user is signed in
  //         }
  //     } catch (error) {
  //         console.error(error);
  //         // Handle error here, maybe show a message to the user
  //     }
  // };


  const getcurrntuser = async () => {
    try {
      const user = auth.currentUser;
      if (user !== null && user.uid) {
        setuserid(user.uid);
        await AsyncStorage.setItem('userId', user.uid);
        console.log("User is ", user.uid);
      } else {
        console.log("No user is currently signed in.");
        // Handle the case where no user is signed in
      }
    } catch (error) {
      console.error(error);
      // Handle error here, maybe show a message to the user
    }
  };

  
    // const loadCartItems = async () => {
    //   try {
    //     const storedCartItems = await AsyncStorage.getItem('@cartItems');
    //     if (storedCartItems) {
    //       setCartItems(JSON.parse(storedCartItems));
    //     }
    //   } catch (error) {
    //     console.error('Error loading cart items:', error);
    //   }
    // };
    // loadCartItems();
    getProducts();
    getcurrntuser();
  }, []);

  const updateCartItem = async (itemId, newCount) => {
    try {
      // Find the item in cartItems array
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId) {
          // Update the count of the item
          item.count = newCount;
        }
        return item;
      });

      // Remove items with count 0
      const filteredCartItems = updatedCartItems.filter(item => item.count > 0);

      // Update AsyncStorage with the filtered cart items
      await AsyncStorage.setItem('@cartItems', JSON.stringify(filteredCartItems));
      
      // Update state to re-render
      setCartItems(filteredCartItems);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const deleteItem = (itemId) => {
    updateCartItem(itemId, 0); // Set count to 0 to remove the item
  };

  const incrementCount = (itemId) => {
    updateCartItem(itemId, cartItems.find(item => item.id === itemId).count + 1);
  };

  const decrementCount = (itemId) => {
    const currentCount = cartItems.find(item => item.id === itemId).count;
    if (currentCount > 0) {
      updateCartItem(itemId, currentCount - 1);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.count), 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.photoURL }} style={styles.imagep} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <Text style={styles.count}>Count: {item.count}</Text>
        <Text style={styles.totalPrice}>Total: ${item.price * item.count}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => decrementCount(item.id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => incrementCount(item.id)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        
        {/* Replace text with back button image */}
        <TouchableOpacity onPress={() => router.navigate("/account/Home")} style={styles.backButton}>
          <Image source={backButtonImage} style={styles.backButtonImage} />
        </TouchableOpacity>
        <View style={styles.cartTitleContainer}>
        <Image source={require('../assets/cartpage.png')} style={styles.cartIcon} />
          {/* <Text style={styles.cartText}>Cart</Text> */}
        </View>
      </View>

      {/* New container with similar qualities as the top container */}
      <View style={styles.bottomContainer}>
        <ScrollView>
        <View>
        {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.totalText}>Total Price: ${getTotalPrice()}</Text>
        </>
      )}
        </View>
        </ScrollView>


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
    width: '100%',
    borderColor: "#CCCCCC",
    borderRadius: 10,
  },
  topContainer: {
    width: '100%',
    height: '8%',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    flexDirection: 'row', // Added flexDirection for aligning items horizontally
    alignItems: 'center', // Align items vertically centered
    justifyContent: 'space-between', // Add space between title and back button
    paddingHorizontal: 15, // Add horizontal padding for better spacing
  },
  backButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
  },
  backButtonImage: {
    width: 30,
    height: 30,
    tintColor: "black", // Change the color of the image if necessary
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 10,
    marginTop:'1%',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
    paddingBottom: 80,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  cartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:'45%'
  },
  itemContainer: {
    // width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    marginBottom: 10,
  },
  imagep: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    // alignSelf: 'flex-start',
    // marginRight:"30%",
  
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
  },
  count: {
    fontSize: 14,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#6495ED',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalText: {
    textAlign: 'right',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  // cartText: {
  //   fontSize: 35,
  //   fontWeight: "bold",
  //   color: 'black',
  // },
  cartIcon: {
    width: 50,
    height: 50,
  },
});

export default Cart;


