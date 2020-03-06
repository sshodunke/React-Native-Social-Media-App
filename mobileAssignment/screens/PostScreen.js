import React, { Component } from 'react'; 
import { ActivityIndicator, FlatList, Image, TouchableOpacity, Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import {getToken, options, clearAsyncStorage} from '../utils/my-utils'
import Icon from 'react-native-vector-icons/FontAwesome';

class PostScreen extends React.Component {
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{flex: 1}}
                        placeholder="Whats happening?">  
                    </TextInput>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    inputContainer: {
        margin: 16,
        flexDirection: "row",
    }
})

export default PostScreen;