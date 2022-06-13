import React, { Component } from "react";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/Firebase'

class Login extends React.Component {
    state = {
        errors: [],
        loading: false
    };

    componentDidMount = () => {

        Firebase.auth().onAuthStateChanged(user => {

            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.setState({
                        loading: false,
                    });
                    this.props.navigation.navigate('HomeScreen')
                }
            } else {
                this.setState({
                    loading: false,
                });
            }
        })
    }

    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>
                        Login
                    </Text>
                    <Block middle>
                        <Input
                            label="Email"
                            error={hasErrors("email")}
                            style={[styles.input, hasErrors("email")]}
                            value={this.props.user.email}
                            onChangeText={email => this.props.updateEmail(email)}
                        />
                        <Input
                            secure
                            label="Password"
                            error={hasErrors("password")}
                            style={[styles.input, hasErrors("password")]}
                            value={this.props.user.password}
                            onChangeText={password => this.props.updatePassword(password)}
                        />
                        <Button gradient onPress={() => {
                            this.setState({
                                loading: true,
                            });
                            this.props.login()
                        }}>
                            {loading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                    <Text bold white center>
                                        Login
                                    </Text>
                                )}
                        </Button>
                        <Button onPress={() => navigation.navigate("SignUp")}>
                            <Text
                                gray
                                caption
                                center
                                style={{ textDecorationLine: "underline" }}
                            >
                                New User? SignUp
              </Text>
                        </Button>

                    </Block>
                </Block>
            </KeyboardAvoidingView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

const styles = StyleSheet.create({
    login: {
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
