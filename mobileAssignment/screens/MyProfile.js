import React from 'react'; 
import { ActivityIndicator, FlatList, Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import moment from 'moment'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker';

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
            isLoading: false,
            imageSource: null,
            imageData: null,
        }
    }

    getProfileInfo = (async userId => {
        this.setState({isLoading: true})
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+userId)

            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    forename: responseJson.given_name,
                    surname: responseJson.family_name,
                    data: responseJson.recent_chits
                })
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
                this.setState({followingCount: responseJson.length})
                this.setState({following: responseJson})
            })

            .catch((error) => {
                console.log(error)
            })
    })

    uploadPhoto = async () => {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/photo', {
            method: 'POST',
            headers: {
                'X-Authorization': this.props.userToken.userToken,
                'Content-Type': 'image/png',
            },
            body: this.state.imageData
        })

        .then((response) => {
            console.log('uploadPhoto: response:',response)
            this._unsubscribe()
        })

        .catch((error) => {
            console.log('MyProfile: getProfileFollowing:', error)
        })
    }

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
        this.getProfileInfo(this.props.userToken.userId)
        this.getProfileFollowers(this.props.userToken.userId)
        this.getProfileFollowing(this.props.userToken.userId)

        // used to call function whenever the screen changes
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getProfileInfo(this.props.userToken.userId)
            this.getProfileFollowers(this.props.userToken.userId)
            this.getProfileFollowing(this.props.userToken.userId)
        })
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    imagePicker = () => {

        ImagePicker.showImagePicker((response) => {
            console.log('ImagePicker: response:', response)

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
                this.setState({
                    imageSource: source.uri,
                    imageData: response.data
                }, () => {
                    this.uploadPhoto()
                })
            }
        })
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
                        <TouchableOpacity onPress={() => this.imagePicker()}>
                            <Image style={styles.avatar} source={{uri:'https://facebook.github.io/react/logo-og.png'}}></Image>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.forename}>{this.state.forename}</Text>

                    <Text style={styles.surname}>{this.state.surname}</Text>
                </View>

                <View style={styles.followManagement}>
                    <View style={styles.followStats}>
                        <Text style={styles.followCount}>{this.state.followersCount}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowList')}>
                            <Text style={styles.followTitle}>Followers</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.followStats}>
                        <Text style={styles.followCount}>{this.state.followingCount}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowList')}>
                            <Text style={styles.followTitle}>Following</Text>
                        </TouchableOpacity>
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

const mapStateToProps = state => ({
    userToken: state.userToken,
    userId: state.userId
});

export default connect (mapStateToProps, null)(MyProfile)