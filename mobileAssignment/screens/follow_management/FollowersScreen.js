import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, Button, Alert } from 'react-native';
import {connect} from 'react-redux'


class FollowersScreen extends React.Component{

    constructor(props){ 
        super(props); 
        this.state = {
            isLoading: false,
            followers: []
        }
    }

    // this function is called after a component is mounted
    componentDidMount() {
        console.log('FollowersScreen: componentDidMount: userToken:', this.props.userToken)
        console.log('FollowersScreen: componentDidMount: userId:', this.props.userToken.userId)
        this.getProfileFollowers()
    }

    getProfileFollowers = (async userId => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ this.props.userToken.userId +'/followers', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('getProfileFollowers: responseJson:', responseJson)
                this.setState({followers: responseJson})
            })

            .catch((error) => {
                console.log('getProfileFollowers: errors:', error)
            })
    })

    // create a single item for the list
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{post.given_name}</Text>
                            <Text style={styles.name}>{post.family_name}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.followers}
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
})

export default connect(mapStateToProps, null)(FollowersScreen)