import React, { Component } from 'react'; 
import { Text, View, StyleSheet } from 'react-native';

class SignUp extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>SignUp</Text>
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

export default SignUp;