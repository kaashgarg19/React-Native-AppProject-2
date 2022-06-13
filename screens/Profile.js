import React, { Component } from "react";
import { Image, StyleSheet, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch } from "../components";
import { theme, mocks } from "../constants";

import { connect } from 'react-redux'
import Firebase from '../config/Firebase'

class Profile extends React.Component {
  
  handleSignout = () => {
    Firebase.auth().signOut()
    this.props.navigation.navigate('Login')
  }

  render() {
    
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Profile
          </Text>
          <Button>
            <Image source={require("../assets/images/avatar.png")} style={styles.avatar} />
          </Button>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Username
                </Text>
                <Text bold>{this.props.user.username}</Text>
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Contact Number
                </Text>
                <Text bold>{this.props.user.phone}</Text>
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  E-mail
                </Text>
                <Text bold>{this.props.user.email}</Text>
              </Block>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Address
                </Text>
                <Text bold>{this.props.user.address}</Text>
              </Block>
            </Block>
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />


          <Block style={styles.toggles}>
           
            <Button gradient onPress={this.handleSignout}>
                            
                                    <Text bold white center>
                                        LOGOUT
                                    </Text>
                        </Button>
          </Block>
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

export default connect(mapStateToProps)(Profile)

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  }
});
