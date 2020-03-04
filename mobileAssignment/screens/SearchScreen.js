import React, { Component } from 'react'; 
import { Text, View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import _ from 'lodash'


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

    // get chits from the API
    // .debounce delays function by 300ms to imrpove performance
    searchAPI = _.debounce(searchQuery => {
        this.setState({isLoading: true})
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+searchQuery)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    data: responseJson,
                 });
            })
    
        .catch((error) => {
            console.log(error);
        });
    }, 300)

    updateSearch = search => {
        if(search == null || search == '') {
            console.log('empty')
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
                        value={query}
                    />
                </View>
                <View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => this.renderPost(item)}
                        keyExtractor={item => item.user_id.toString()}
                    />
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

export default SearchScreen;