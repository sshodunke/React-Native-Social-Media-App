import React, { Component } from 'react'; 
import { FlatList, Text, View, StyleSheet } from 'react-native';

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            list: []
        }
    }

    getData() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    isLoading: false,
                    list: responseJson,
                 });
            })
    
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HomeScreen</Text>
                <FlatList
                    data={this.state.list}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text>{item.chit_content}</Text>
                        </View>
                    )}
                    keyExtractor={({id}, index) => id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default HomeScreen;