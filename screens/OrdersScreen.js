import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";

import StatusLabel from 'react-native-statuslabel';

import { Button, Badge, Block, Text } from "../components";
import { theme, mocks } from "../constants";

import { connect } from 'react-redux'

import Firebase, { db } from '../config/Firebase.js'

import { ListItem, Card, Icon } from 'react-native-elements'
import Icons from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get("window");

class OrdersScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      userArr: []
    };
  }

  async componentDidMount() {

    var email = await this.props.user.email
    this.firestoreRef = db.collection('orders').where('userId', '==', email)
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { c_date, total, items, status, userId } = res.data();
      userArr.push({
        key: res.id,
        res,
        c_date,
        total,
        items,
        status,
        userId
      });
    });
    this.setState({
      userArr,
      isLoading: false,
    });
  }

  render() {
    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2, marginBottom:50 }}
        >
          {
            this.state.userArr.map((item, i) => {
              return (
                <View>
                  <Card
                    key={i}
                    title={"Total Amount - $" + item.total}
                  >
                    <Text style={{ marginBottom: 10 }}>
                      Products List : 
                      {
                        item.items.map((product, j) => {
                        return <Text>{"\n"}Name : {product.name}, Price : {product.price} </Text>
                        })
                      }
                    </Text>
                    <StatusLabel
                      style={styles.margins}
                      theme={item.status == 'PENDING' ? 'yellow' : 'green'}
                      label={item.status}
                    />

                    <Text style={{ marginBottom: 10 }}>
                      Order Date : {item.c_date}
                    </Text>

                  </Card>

                </View>
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
    user: state.user
  }
}

const styles = StyleSheet.create({
  margins: {
    marginLeft: 50,
    marginEnd: 50
  }
})

export default connect(mapStateToProps)(OrdersScreen)
