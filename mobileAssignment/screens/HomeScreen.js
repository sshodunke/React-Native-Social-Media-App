import React from 'react'; 
import { ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';
import moment from 'moment'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isFetching: false,
            list: [],
            start: 10
        }
    }

    // refresh function to refresh FlatList
    onRefresh() {
        this.setState({
            isFetching: true,
            locationPermission: false,
        }, function() {
            this.getData()
        })
    }

    // create a single item for the list
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => this.props.navigation.push('ChitDetails', {
                        chit_content: post.chit_content,
                        chit_id: post.chit_id,
                        timestamp: post.timestamp,
                        user: post.user,
                        location: post.location
                    })}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <View>
                                <Text style={styles.name}>{post.user.given_name}</Text>
                                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()} </Text>
                                <Text style={styles.content}>{post.chit_content}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // get chits from the API
    async getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=0&count='+this.state.start, {
            method: 'GET',
            headers: {
                'X-Authorization': this.props.userToken.userToken,
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                this.setState({
                    list: responseJson,
                    isFetching: false,
                    isLoading: false,
                 });
            })
    
        .catch((error) => {
            console.log('HomeScreen: getData: error: ', error);
        });
    }

    handleLoadMore() {
        this.setState({
            start: this.state.start + 10
        }, () => {
            this.getData()
        })
    }

    componentDidMount() {
        this.getData();

        // used to call function whenever the screen changes
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getData()
        })
    }

    componentWillUnmount() {
        this._unsubscribe()
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
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    renderItem={({item}) => this.renderPost(item)}
                    keyExtractor={item => item.chit_id.toString()}
                    showsVerticalScrollIndicator={true}
                    onEndReached={() => this.handleLoadMore()}
                    onEndThreshold={0}
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

const mapStateToProps = state => ({
    userToken: state.userToken,
});

export default connect (mapStateToProps)(HomeScreen)