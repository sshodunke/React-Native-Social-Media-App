import React from 'react'; 
import { ActivityIndicator, PermissionsAndroid, Image, TouchableOpacity, Text, View, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux'

class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chitText: '',
            isLoading: false,
            toggle: false,
            longitude: 0,
            latitude: 0,
        }
    }

    componentDidMount() {
        if(!this.state.locationPermission) {
            this.state.locationPermission = this.requestLocationPermission()
        }
    }

    async createChitPost() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
            method: 'POST',
            headers: {
                'X-Authorization': this.props.userToken.userToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chit_id: 0,
                timestamp: Date.now(),
                chit_content: this.state.chitText,
                location: {
                    longitude: this.state.longitude,
                    latitude: this.state.latitude,
                }
            })
        })
    
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.props.navigation.navigate('Home')
        })
    
        .catch(function(error) {
            console.log('PostScreen: createChitPost', error)
        })
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Chitr',
                    message: 'This app requires access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            )
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can access location')
                return true
            } else {
                console.log('Location permission denied')
                return false
            }
        } catch(err) {
            console.warn(err)
        }
    }

    toggleLocation(permission) {        
        if(!permission) {
            this.setState({
                latitude: 0,
                longitude: 0
            })
        } else {
            this.findCoordinates()
        }

        this.setState({toggle: !this.state.toggle})
    }

    findCoordinates = () => {
        if(!this.state.locationPermission) {
            this.state.locationPermission = this.requestLocationPermission()
        } else {
            Geolocation.getCurrentPosition(
                (position) => {
                    let jsonString = JSON.stringify(position)
                    let location = JSON.parse(jsonString)
                    
                    this.setState({ location, latitude: location.coords.latitude, longitude: location.coords.longitude })
                    console.log('long', this.state.longitude)
                },
                (error) => {
                    Alert.alert(error.message)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 20000, 
                    maximumAge: 1000
                }
            )
        }
    }
        
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={(chitText) => this.setState({chitText})}
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{flex: 1}}
                        placeholder="Whats happening?">  
                    </TextInput>
                </View>
                <View style={{flex: 1, flexDirection: 'row', margin: 16,}}>
                    <TouchableOpacity onPress={() => this.createChitPost()} style={{borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: 'cornflowerblue', width: 80, height: 40}}>
                        <Text style={{fontSize: 16}}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.toggleLocation(!this.state.toggle)} style={{justifyContent: "center", alignItems: "center", width: 80, height: 40}}>
                        {
                            this.state.toggle === true ?
                            <Icon name='location-on' size={24}/>
                            :
                            <Icon name='location-off' size={24} color='grey'/>
                        }
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    inputContainer: {
        margin: 16,
        flexDirection: "row",
    }
})

const mapStateToProps = state => ({
    userToken: state.userToken,
    userId: state.userId
});

export default connect (mapStateToProps)(PostScreen)