import React, { Component } from 'react'; 
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import moment from 'moment'
import {getToken, options} from '../utils/my-utils'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isFetching: false,
            list: []
        }
    }

    // refresh function to refresh FlatList
    onRefresh() {
        this.setState({
            isFetching: true
        }, function() {this.getData()})
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
                            <Text style={styles.content}>{post.chit_content}</Text>
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
                console.log('HomeScreen.js: getData: options: ', options)
                console.log('HomeScreen.js: getData: responseJson: ', responseJson)
                this.setState({
                    isLoading: false,
                    list: responseJson,
                    isFetching: false
                 });
            })
    
        .catch((error) => {
            console.log('HomeScreen.js: getData: error: ', error);
        });
    }

    componentDidMount() {
        console.log('HomeScreen')
        this.getData();
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
                <View style={styles.header}>
                    <View style={{flexDirection: "row", justifyContent: "center", flex: 1}}>
                        <Text style={styles.headerTitle}>Feed</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: 'flex-end', marginEnd: 12}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Post')} >
                            <Icon name='plus' size={18} color='#D8D9DB'></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={this.state.list}
                    onRefresh={() => this.onRefresh}
                    refreshing={this.state.isFetching}
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
        fontSize: 15,
        fontWeight: '500'
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4,
        color: '#838899'
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFFF',
        paddingTop: 24,
        paddingBottom: 16,
        alignItems: "center",
        elevation: 1
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    content: {
        marginTop: 14,
        fontSize: 14,
        color: '#838899'
    }
})

export default HomeScreen;