import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import Profile from "../screens/Profile";
import OrdersScreen from "../screens/OrdersScreen";
import ShoppingCartIcon from "../screens/ShoppingCartIcon";

import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Login,
    SignUp,
    HomeScreen:{
      screen: HomeScreen,
      navigationOptions:{
        title: 'Shopping App',
        headerLeft: null,
        headerRight: (
          <ShoppingCartIcon />
        )
      }
    },
    CartScreen,
    OrdersScreen:{
      screen: OrdersScreen,
      navigationOptions:{
        title: 'Orders History'
      }
    },
    Profile
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      }
    }
  }
);

export default createAppContainer(screens);
