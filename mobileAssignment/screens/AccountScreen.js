import React, { Component } from 'react'; 
import { TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';

class AccountScreen extends React.Component{


    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => Alert.alert('test')}>
                    <Text>Logout</Text>
                </TouchableOpacity>
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
    btn: {
        backgroundColor: '#8e99f3',
        fontSize: 16,
        borderRadius: 4,
    },
})

export default AccountScreen;