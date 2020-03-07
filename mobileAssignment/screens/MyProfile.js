import React, { Component } from 'react'; 
import { ActivityIndicator, FlatList, Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import {getToken, options, clearAsyncStorage, returnToken} from '../utils/my-utils'
import moment from 'moment'


class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            forename: '',
            surname: '',
            data: [],
            followers: [],
            followersCount: '',
            following: [],
            followingCount: '',
            isLoading: false
        }
    }

    getProfileInfo = (async userId => {
        this.setState({isLoading: true})
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                this.setState({
                    isLoading: false,
                    forename: responseJson.given_name,
                    surname: responseJson.family_name,
                    data: responseJson.recent_chits

                })
                console.log(this.state.data)
            })

            .catch((error) => {
                console.log(error)
            })
    })

    getProfileFollowers = (async userId => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId+'/followers', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({followersCount: responseJson.length})
                this.setState({followers: responseJson})
            })

            .catch((error) => {
                console.log(error)
            })
    })

    getProfileFollowing = (async userId => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId+'/following', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('following', responseJson.length)
                this.setState({followingCount: responseJson.length})
                this.setState({following: responseJson})
            })

            .catch((error) => {
                console.log(error)
            })
    })

    // next -work on getting user profile photo

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

    async componentDidMount() {
        let userId = await returnToken('id')
        this.getProfileInfo(userId)
        this.getProfileFollowers(userId)
        this.getProfileFollowing(userId)
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
                    <Text style={styles.forename}>{this.state.forename}</Text>
                    <Text style={styles.surname}>{this.state.surname}</Text>
                </View>
                <View style={styles.followManagement}>
                    <View style={styles.followStats}>
                        <Text style={styles.followCount}>{this.state.followersCount}</Text>
                        <Text style={styles.followTitle}>Followers</Text>
                    </View>
                    <View style={styles.followStats}>
                        <Text style={styles.followCount}>{this.state.followingCount}</Text>
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

export default MyProfile;