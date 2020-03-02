import React, { Component } from 'react'; 
import { TouchableOpacity, KeyboardAvoidingView, Text, View, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            surname: '',
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <ScrollView style={styles.wrapper}>
                
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.header}>Register</Text>
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Username'
                            onChangeText={(username) => this.setState({username})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            style={styles.textInput}
                            placeholder='Surname'
                            onChangeText={(password) => this.setState({surname})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            style={styles.textInput}
                            placeholder='Email'
                            onChangeText={(username) => this.setState({email})}
                            underlineColorAndroid='transparent'/>

                        <TextInput
                            style={styles.textInput}
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            underlineColorAndroid='transparent'/>

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
            </ScrollView>
        );
    }

    register = () => {
        alert('register')
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#5c6bc0'
    },
    container: {
        flex: 1,
        paddingHorizontal: 30,
    },
    header: {
        fontFamily: 'Avenir Next',
        color: '#ffffff',
        marginTop: 48,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        marginBottom: 20,
        alignSelf: "stretch",
    },
    text: {
        fontFamily: 'Avenir Next',
        color: '#ffffff'
    },
    btn: {
        backgroundColor: '#26418f',
        fontSize: 16,
        borderRadius: 4,
        paddingVertical: 12,
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default SignUp;