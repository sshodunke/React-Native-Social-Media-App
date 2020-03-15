import React from 'react'; 
import { Image, Text, View, StyleSheet} from 'react-native';
import moment from 'moment'
import {ScrollView } from 'react-native-gesture-handler';
import Geocoder from 'react-native-geocoding';

class ChitDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chit_content: this.props.route.params.chit_content,
            chit_id: this.props.route.params.chit_id,
            timestamp: this.props.route.params.timestamp,
            user: this.props.route.params.user,
            location: this.props.route.params.location,
            hasImage: false,
            imageURI: null,
            formatted_address: null
        }
    }

    componentDidMount() {
        Geocoder.init('AIzaSyAij7gV5Ycuwv2OBvrzLUS6IpItRph7jK0')
        this.getPostPhoto()
        this.getLocation()
    }

    getLocation() {
        if(!(this.state.location == undefined)) {
            Geocoder.from(this.state.location.latitude, this.state.location.longitude) 
                .then(json => {
                    let formatted_address = json.results[0].formatted_address
                    this.setState({formatted_address: formatted_address})
                })

                .catch((error) => {
                    console.log(error)
                })
        }
    }

    async getPostPhoto() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/'+this.state.chit_id+'/photo', {
            method: 'GET',
            headers: {
                'Accept': 'image/jpg'
            }
        })
        
            .then((response) => {
                //console.log('ChitDetailsScreen: getPostPhoto: response:', response)

                var reader = new FileReader()
                reader.onload = () => this.setState({imageURI: reader.result}, () => console.log('state',this.state.imageURI))
                reader.readAsDataURL(response._bodyBlob)

                // if response 200 is recieved from API then an image is attached to the chit
                if(response.status === 200) {
                    // hasImage set to true; image view will be rendered
                    this.setState({hasImage: true})
                }
            })
    
        .catch((error) => {
            console.log('ChitDetailsScreen: getPostPhoto: error:', error);
        });
    }

    render() {
        return(
            <ScrollView style={styles.container}>
                <View style={styles.userInfo}>
                    <Text style={{fontSize: 24, fontWeight: "bold"}}>{this.state.user.given_name} {this.state.user.family_name}</Text>
                    <Text style={{fontSize: 16, paddingBottom: 8}}>{this.state.user.email}</Text>
                    <Text style={styles.timestamp}>{moment(this.state.timestamp).fromNow()}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={{fontSize: 18}}>{this.state.chit_content}</Text>
                </View>

                {this.state.location == undefined ?
                    null
                    :
                    <View style={styles.location}>
                        <Text style={styles.locationText}>{this.state.formatted_address}</Text>
                    </View>
                }

                {!this.state.hasImage ?
                    null
                    :
                    <View style={styles.image}>
                        <Image style={styles.imageProperties} source={{uri: this.state.imageURI}}></Image>
                        <Text style={styles.imageText}>Attached Image</Text>
                    </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfo: {
        marginHorizontal: 20,
        marginTop: 48,
    },
    content: {
        marginHorizontal: 20,
        marginTop: 24
    },
    location: {
        marginHorizontal: 20,
        marginTop: 4,
    },
    locationText: {
        fontSize: 11,
        color: '#838899'
    },
    timestamp: {
        fontSize: 11,
        marginTop: 4,
        color: '#838899'
    },
    image: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 20,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    imageProperties: {
        width: 250,
        height: 250,
    },
    imageText: {
        marginTop: 4,
        fontSize: 11,
        color: '#838899'
    }
})

export default ChitDetailsScreen