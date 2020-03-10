import React from 'react'; 
import { ActivityIndicator, FlatList, Image, Text, View, StyleSheet } from 'react-native';
import moment from 'moment'


class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.route.params.user_id,
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
                this.setState({
                    isLoading: false,
                    data: responseJson.recent_chits
                })
            })

            .catch((error) => {
                console.log('ProfileScreen: getProfileInfo:', error)
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
                console.log('ProfileScreen: getProfileFollowers:', error)
            })
    })

    getProfileFollowing = (async userId => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId+'/following', {method: 'GET'})

            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({followingCount: responseJson.length})
                this.setState({following: responseJson})
            })

            .catch((error) => {
                console.log('ProfileScreen: getProfileFollowing:', error)
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

    componentDidMount() {
        this.getProfileFollowers(this.state.user_id.toString())
        this.getProfileInfo(this.state.user_id.toString())
        this.getProfileFollowing(this.state.user_id.toString())
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
                        keyExtractor={item => item.chit_id.toString()}/>
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