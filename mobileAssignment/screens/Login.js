import React, { Component } from 'react'; 
import { Text, View, StyleSheet } from 'react-native';

class Login extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Login;