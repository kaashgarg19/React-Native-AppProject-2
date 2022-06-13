import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateUsername, signup } from '../actions/user'

class SignUp extends React.Component {

  state = {
    errors: [],
    loading: false,
    username: "",
    phone: "",
    address: ""
  };

  handleSignUp = () => {

    const errors = [];
    this.setState({ loading: true });
    this.props.signup(this.state.username,this.state.phone, this.state.address)
    Alert.alert(
      "Success!",
      "Your account has been created",
      [
        {
          text: "Continue",
          onPress: () => {
            this.props.navigation.navigate('HomeScreen')
          }
        }
      ],
      { cancelable: false }
    );

  }

  render() {
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Sign Up
          </Text>
          <Block middle>

            <Input
              label="Username"
              style={[styles.input, hasErrors("username")]}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              number
              label="Mobile Number"
              style={[styles.input, hasErrors("number")]}
              onChangeText={text => this.setState({ phone: text })}
            />

            <Input
              label="Address"
              style={[styles.input, hasErrors("address")]}
              onChangeText={text => this.setState({ address: text })}
            />

            <Input
              email
              label="Email"
              style={[styles.input, hasErrors("email")]}
              value={this.props.user.email}
              onChangeText={email => this.props.updateEmail(email)}
            />
            <Input
              secure
              label="Password"
              style={[styles.input, hasErrors("password")]}
              value={this.props.user.password}
              onChangeText={password => this.props.updatePassword(password)}
            />
            <Button gradient onPress={this.handleSignUp}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text bold white center>
                    Sign Up
                  </Text>
                )}
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateEmail, updateUsername, updatePassword, signup }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
