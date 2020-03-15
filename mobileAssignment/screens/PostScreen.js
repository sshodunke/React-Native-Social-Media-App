import React from 'react'; 
import { ToastAndroid, ActivityIndicator, PermissionsAndroid, Image, TouchableOpacity, Text, View, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chitText: '',
            isLoading: false,
            toggle: false,
            longitude: 0,
            latitude: 0,
            imageSource: null,
            imageData: null,
            chit_id: null,
            post_photo: false,
            drafts_array: []
        }
    }

    componentDidMount() {
        if(!this.state.locationPermission) {
            this.state.locationPermission = this.requestLocationPermission()
        }
        this.getDrafts()
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
            if(!this.state.post_photo) {
                this.props.navigation.navigate('Home')
            }
            else {
                let chit_id = responseJson.chit_id
                this.uploadPhoto(chit_id)
            }
        })
    
        .catch(function(error) {
            console.log('PostScreen: createChitPost', error)
        })
    }

    async uploadPhoto(chit_id) {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/'+chit_id+'/photo', {
            method: 'POST',
            headers: {
                'X-Authorization': this.props.userToken.userToken,
                'Content-Type': 'image/jpeg',
            },
            body: this.state.imageData
        })

        .then((response) => {
            console.log(response)
            this.props.navigation.navigate('Home')
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
                })
            }
        })
    }

    checkPhoto = () => {
        if(this.state.imageSource == null) {
            this.setState({post_photo: false}, () => {
                console.log(this.state.post_photo);
                this.createChitPost()
            })
        } else {
            this.setState({post_photo: true}, () => {
                console.log(this.state.post_photo);
                this.createChitPost()
            })
        }
    }

    getDrafts = async () => {
        try {
            const storageArray = await AsyncStorage.getItem('drafts')
            if(storageArray !== null) {
                console.log('drafts:', JSON.parse(storageArray))
                this.setState({
                    drafts_array: JSON.parse(storageArray)
                })
            }
        } catch(error) {
            console.log(error)
        }
    }

    storeData = async () => {
        let json = JSON.stringify(this.state.drafts_array)
        console.log(json)
        try {
            await AsyncStorage.setItem('drafts', json)
            console.log('saved draft')
            ToastAndroid.show('Draft has been saved', ToastAndroid.SHORT)
        } catch (error) {
            console.log(error)
        }
    }

    addToDraft = () => {
        // make object of chit data to store
        let drafted_chit = {
            chit_content: this.state.chitText,
            image_source: this.state.imageData
        }

        // copy of array from state is created and updated 
        let updateArray = this.state.drafts_array
        updateArray.push(drafted_chit)

        // state updated with new array
        this.setState({
            drafts_array: updateArray
        }, () => {
            this.storeData()
        })
    }

    saveToDraftsAlert = () => {
        Alert.alert(
            'Save to drafts?',
            'Would you like to save this message to drafts?',
            [
                {text: 'No', onPress: () => console.log('No clicked'), style: 'cancel'},
                {text: 'Yes', onPress: () => this.addToDraft()}
            ],
            { cancelable: true },
        )
    }
        
    render() {
        return (
            <ScrollView style={styles.container}>
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
                <View style={{margin: 16}}>
                {
                    this.state.imageSource && <Image source={{uri: this.state.imageSource}} style={{width: 150,height: 150}}/>
                }
                </View>
                <View style={{flex: 1, flexDirection: 'row', margin: 16,}}>
                    <TouchableOpacity onPress={() => this.checkPhoto()} style={{borderRadius: 20, justifyContent: "center", alignItems: "center", backgroundColor: 'cornflowerblue', width: 80, height: 40}}>
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
                    <TouchableOpacity style={{justifyContent: "center", alignItems: "center", width: 80, height: 40}} onPress={() => this.imagePicker()} >
                        <Icon name='camera-alt' size={24}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: "center", alignItems: "center", width:80, height: 40}} onPress={() => this.saveToDraftsAlert()} >
                        <Icon name='add-box' size={24}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent: "center", alignItems: "center", width:80, height: 40}} onPress={() => this.props.navigation.navigate('Drafts')} >
                        <Icon name='insert-drive-file' size={24}></Icon>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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