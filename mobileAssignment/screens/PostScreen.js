import React, { Component } from 'react'; 
import { ActivityIndicator, FlatList, Image, TouchableOpacity, Text, View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import {returnToken} from '../utils/my-utils'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chitText: '',
            isLoading: false
        }
    }

    async createChitPost() {
        let token = await returnToken('token');
        console.log(token)
        console.log(this.state.chitText)
        return axios.post('http://10.0.2.2:3333/api/v0.0.5/chits', {
            chit_id: 0,
            timestamp: Date.now(),
            chit_content: this.state.chitText,
            location: {
                longitude: 0,
                latitude: 0,
            }
        }, {headers: {
            'X-Authorization': token,
            'Content-Type': 'application/json',
        }})
    
        .then((response) => {
            console.log(response)
            this.props.navigation.navigate('Home')
        })
    
        .catch(function(error) {
            console.log(error)
        })
    }
        
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(chitText) => this.setState({chitText})}
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{flex: 1}}
                        placeholder="Whats happening?">  
                    </TextInput>
                </View>
                <View>
                    <TouchableOpacity onPress={() => this.createChitPost()} style={{margin: 16, borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: 'cornflowerblue', width: 80, height: 40}}>
                        <Text style={{fontSize: 16}}>Post</Text>
                    </TouchableOpacity>
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