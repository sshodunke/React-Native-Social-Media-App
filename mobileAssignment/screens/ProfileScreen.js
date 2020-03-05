import React, { Component } from 'react'; 
import { ActivityIndicator, FlatList, Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import {getToken, options, clearAsyncStorage} from '../utils/my-utils'
import moment from 'moment'


class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.route.params)
        this.state = {
            user_id: this.props.route.params.user_id,
            data: [],
            isLoading: false
        }
    }

    getProfileInfo = (userId => {
        this.setState({isLoading: true})
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                this.setState({
                    isLoading: false,
                    data: responseJson.recent_chits
                })
                console.log(this.state.data)
            })

            .catch((error) => {
                console.log(error);
            })
    })

    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()} </Text>
                            <Text style={styles.content}>{post.chit_content}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.getProfileInfo(this.state.user_id.toString())
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (    
            <View style={styles.container}>
                <View style={{marginTop: 24, alignItems: 'center'}}>
                    <View>
                        <Image style={styles.avatar} source={{uri: 'https://facebook.github.io/react/logo-og.png'}}></Image>
                    </View>
                    <Text style={styles.forename}>{this.props.route.params.given_name}</Text>
                    <Text style={styles.surname}>{this.props.route.params.family_name}</Text>
                </View>
                <View style={styles.followManagement}>
                    <View style={styles.followStats}>
                        <Text style={styles.followCount}>000</Text>
                        <Text style={styles.followTitle}>Followers</Text>
                    </View>
                    <View style={styles.followStats}>
                        <Text style={styles.followCount}>000</Text>
                        <Text style={styles.followTitle}>Following</Text>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => this.renderPost(item)}
                        keyExtractor={item => item.chit_id.toString()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 70,
    },
    forename: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold'
    },
    followManagement: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 24,
    },
    followStats: {
        alignItems: 'center',
        flex: 1,
    },
    followCount: {
        fontWeight: 'bold',
    },
    feedItem: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4
    },
    content: {
        marginTop: 14,
        fontSize: 14,
        color: '#838899'
    }
})

export default AccountScreen;