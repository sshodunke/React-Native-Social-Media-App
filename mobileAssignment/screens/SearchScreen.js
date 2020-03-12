import React, { Component } from 'react'; 
import { Text, View, StyleSheet, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash'
import {connect} from 'react-redux'


class SearchScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            isLoading: true,
            data: [],
        }
    }

    // create a single item for the list
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",}}>
                        <View style={{flex: 1}}>
                            <TouchableOpacity onPress={() => this.props.navigation.push('Profile', { 
                                user_id: post.user_id, 
                                given_name: post.given_name, 
                                family_name: post.family_name, 
                                email: post.email,
                            })}>
                                <Text style={styles.name}>{post.given_name}</Text>
                                <Text style={styles.name}>{post.family_name}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    // get chits from the API
    // .debounce delays function by 300ms to improve performance when searching API
    searchAPI = _.debounce(async searchQuery => {
        this.setState({isLoading: true})
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+searchQuery)

            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    data: responseJson,
                });
            })
    
        .catch((error) => {
            console.log('SearchScreen: searchAPI:', error);
        });
    }, 300)

    updateSearch = search => {
        if(search == null || search == '') {
            this.setState({ query: search})
            this.setState({data: []})
        } else {
            this.setState({ query: search });
            this.searchAPI(search)
        }
    };

    render() {
        const { query } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <SearchBar
                        lightTheme={true}
                        round={true}
                        placeholder='Search Users...'
                        onChangeText={this.updateSearch}
                        value={query}/>
                </View>

                <View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => this.renderPost(item)}
                        keyExtractor={item => item.user_id.toString()}/>
                </View>
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
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
})

const mapStateToProps = state => ({
    userToken: state.userToken,
    userId: state.userId
})

export default connect (mapStateToProps)(SearchScreen);