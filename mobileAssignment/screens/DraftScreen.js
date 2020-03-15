import React from 'react'; 
import { ToastAndroid, Image, FlatList, Text, View, StyleSheet} from 'react-native';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class DraftScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drafts_array: []
        }
    }

    // create a single item for the list
    renderPost = (item, index) => {
        return (
            <View style={styles.feedItem}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",}}>
                        <View style={{width: '80%'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditDraft', {
                                    chit_content: item.chit_content,
                                    image_source: item.image_source,
                                    index: index
                            })}>
                                <Text numberOfLines={1} style={styles.name}>{item.chit_content}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity onPress={() => this.deleteDraft(index)}>
                                <Icon name='delete' size={24}></Icon>    
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    deleteDraft = (index) => {
        // copy of array from state is created and updated 
        let updateArray = this.state.drafts_array
        updateArray.splice(index, 1)

        // state updated with new array
        this.setState({
            drafts_array: updateArray
        }, () => {
            this.storeData()
        })
    }

    getDrafts = async () => {
        try {
            const storageArray = await AsyncStorage.getItem('drafts')
            if(storageArray !== null) {
                //console.log('drafts:', JSON.parse(storageArray))
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
        //console.log(json)
        try {
            await AsyncStorage.setItem('drafts', json)
            ToastAndroid.show('Draft List has been updated', ToastAndroid.SHORT)
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getDrafts()

        // used to call function whenever the screen changes
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getDrafts()
        })
    }

    componentWillUnmount() {
        this._unsubscribe()
    }

    render() {
        return(
            <View style={styles.container}>
                <FlatList 
                    data={this.state.drafts_array}
                    renderItem={({item, index}) => this.renderPost(item, index)}
                    keyExtractor={({id}, index) => index.toString()}/>
            </View>
        )
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

export default DraftScreen