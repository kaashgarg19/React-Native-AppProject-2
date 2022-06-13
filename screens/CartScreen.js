import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet
} from "react-native";
import { ListItem, Card, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import Global from '../globals/Global'
import Firebase, { db } from '../config/Firebase.js'
import moment from 'moment';
import { Button, Badge, Block, Text } from "../components";

class CartScreen extends React.Component {

  state = {
    loading: false,
  }

  handleSignUp = () => {
    this.setState({ loading: true });
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss a');
    db.collection('orders')
      .doc()
      .set({
        'total': Global.total.toString(),
        'userId': this.props.user.email,
        'username': this.props.user.username,
        'phone': this.props.user.phone,
        'address': this.props.user.address,
        'items': this.props.cartItems,
        'status': 'PENDING',
        'c_date': date
      })
      this.props.cartItems.map((item, i) => {
        this.props.removeItem(item)
      }),
      this.setState({ loading: false });
      Alert.alert(
        "Success!",
        "Order Submit Succesfully",
        [
          {
            text: "Continue to Order",
            onPress: () => {
              this.props.navigation.navigate('HomeScreen')
            }
          }
        ],
        { cancelable: false }
      );
  }

  render() {
    const { loading } = this.state;
    return (
      <Block>
        {this.props.cartItems.length > 0 ?
          <ScrollView>
            {
              Global.total = 0,
              this.props.cartItems.map((item, i) => {
                return (
                  Global.total = Global.total + parseInt(item.price),
                  <Card
                    key={i}
                    title={item.name}
                    image={{ uri: item.image }}
                  >
                    <Text style={{ marginBottom: 10 }}>
                      {item.price}
                    </Text>
                    <Button gradient
                      icon={<Icon name='code' color='#ffffff' />}
                      buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                      onPress={() => this.props.removeItem(item)}>
                          <Text bold white center>
                                        REMOVE ITEM
                                    </Text>
                      </Button>
                  </Card>
                );
              })
            }</ScrollView>
          : <Text style={styles.container} center>No items in your cart</Text>
        }
        <Button gradient style={styles.margins}
          onPress={this.handleSignUp}>
            {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>ORDER NOW ${this.props.cartItems.length > 0 ? Global.total.toString() : '0'} </Text>
                )}
            
          </Button>
      </Block>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,  
    cartItems: state.cartItems
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250
  },
  margins: {
    margin:20
  }
});