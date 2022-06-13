import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";

import { Button, Badge, Block, Text } from "../components";
import { theme, mocks } from "../constants";

import { connect } from 'react-redux'

import Firebase, { db } from '../config/Firebase.js'

import { ListItem, Card, Icon } from 'react-native-elements'
import Icons from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get("window");

class HomeScreen extends React.Component {

  constructor() {
    super();
    this.firestoreRef = db.collection('products');
    this.state = {
      isLoading: true,
      userArr: [],
      categories: ['Products','Order History']
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, price, description, image } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        price,
        description,
        image
      });
    });
    this.setState({
      userArr,
      isLoading: false,
    });
  }

  handleTab = tab => {
    if(tab.toLowerCase() == "order history")
    {
      this.props.navigation.navigate('OrdersScreen')
    }
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    const tabs = ["Products", "Order History"];
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Gifts &amp; Flowers
          </Text>
          <Button onPress={() => navigation.navigate("Profile")}>
            <Image source={require("../assets/images/avatar.png")} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          {
            this.state.userArr.map((item, i) => {
              return (
                <Card
                  key={i}
                  title={item.name}
                  image={{ uri: item.image }}
                >
                  <Text style={{ marginBottom: 10 }}>
                    {item.description}
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    Price - $ {item.price}
                  </Text>
                    
                    <Button gradient 
                    onPress={() => this.props.addItemToCart({ 'id': i, 'name': item.name, 'price': item.price, 'description': item.description, 'image': item.image })}
                    >
                            
                                    <Text bold white center>
                                        ADD TO CART
                                    </Text>
                        </Button>
                </Card>
              );
            })
          }
        </ScrollView>
      </Block>
    );
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  }
});
