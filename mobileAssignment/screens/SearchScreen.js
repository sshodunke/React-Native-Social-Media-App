import React, { Component } from 'react'; 
import { Text, View, StyleSheet } from 'react-native';

class SearchScreen extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>SearchScreen</Text>
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

export default SearchScreen;