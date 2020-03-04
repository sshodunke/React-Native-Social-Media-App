import React, { Component } from 'react'; 
import { ActivityIndicator, Image, FlatList, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import {getToken, options} from '../utils/my-utils'


class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            list: []
        }
    }

    // create a single item for the list
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{post.user.given_name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()} </Text>
                            <Text style={styles.feedPost}>{post.chit_content}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // get chits from the API
    async getData() {
        await getToken('token')
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', options)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(options)
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    list: responseJson,
                 });
            })
    
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>
                </View>
                <FlatList
                    data={this.state.list}
                    renderItem={({item}) => this.renderPost(item)}
                    keyExtractor={item => item.chit_id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFECF4'
    },
    feedItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4
    },
    header: {
        backgroundColor: '#FFFF',
        paddingTop: 24,
        paddingBottom: 16,
        alignItems: "center",
        justifyContent: "center",
        elevation: 1
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    }
})

export default HomeScreen;