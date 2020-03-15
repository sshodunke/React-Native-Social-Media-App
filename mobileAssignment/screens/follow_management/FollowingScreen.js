import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Button, Alert } from 'react-native';
import {connect} from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';


class FollowingScreen extends React.Component{

    constructor(props){ 
        super(props); 
        this.state = {
            isLoading: false,
            following: []
        }
    }

    // this function is called after a component is mounted
    componentDidMount() {
        console.log('FollowingScreen: componentDidMount: userToken:', this.props.userToken.userToken)
        console.log('FollowingScreen: componentDidMount: userId:', this.props.userToken.userId)
        this.getProfileFollowing()
    }

    
    getProfileFollowing = (async userId => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ this.props.userToken.userId +'/following', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('getProfileFollowing: responseJson:', responseJson)
                this.setState({following: responseJson})
            })

            .catch((error) => {
                console.log('getProfileFollowing: errors:', error)
            })
    })

    unfollowUser = (async userId => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId+'/follow', {
            method: 'DELETE', 
            headers: {
                'X-Authorization': this.props.userToken.userToken
            }
        })

            .then((response) => {
                console.log('unfollowUser: response:', response)
                this.getProfileFollowing()
            })

            .catch((error) => {
                console.log('unfollowUser: error:', error)
            })
    })

    // create a single item for the list
    renderPost = post => {
        console.log('FollowingScreen: renderPost:', post.user_id)
        return (
            <View style={styles.feedItem}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{post.given_name} {post.family_name}</Text>
                            <Text style={styles.email}>{post.email}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.unfollowUser(post.user_id)}>
                            <View>
                                <Text>Unfollow</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.following}
                    renderItem={({item}) => this.renderPost(item)}
                    keyExtractor={item => item.user_id.toString()} />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    userToken: state.userToken,
    userId: state.userId
})

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
    email: {
        fontSize: 14,
        color: '#838899'
    }
})

export default connect(mapStateToProps, null)(FollowingScreen)