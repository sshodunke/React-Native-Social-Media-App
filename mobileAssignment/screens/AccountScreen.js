import React from 'react'; 
import { ToastAndroid, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux'

class AccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forename: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            isLoading: false
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Manage Account</Text>
                </View>

                <View>
                    <TextInput
                        onSubmitEditing={() => this.surnameInput.focus()}
                        style={styles.textInput}
                        placeholder='Forename'
                        onChangeText={(forename) => this.setState({forename})}
                        underlineColorAndroid='transparent'/>

                    <TextInput
                        onSubmitEditing={() => this.emailInput.focus()}
                        ref={(input) => this.surnameInput = input} 
                        style={styles.textInput}
                        placeholder='Surname'
                        onChangeText={(surname) => this.setState({surname})}
                        underlineColorAndroid='transparent'/>

                    <TextInput
                        onSubmitEditing={() => this.passwordInput.focus()}
                        ref={(input) => this.emailInput = input} 
                        style={styles.textInput}
                        placeholder='Email'
                        onChangeText={(email) => this.setState({email})}
                        underlineColorAndroid='transparent'/>

                    <TextInput
                        onSubmitEditing={() => this.confirmPasswordInput.focus()}
                        ref={(input) => this.passwordInput = input}
                        style={styles.textInput}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        underlineColorAndroid='transparent'/>

                    <TextInput
                        ref={(input) => this.confirmPasswordInput = input}
                        style={styles.textInput}
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        underlineColorAndroid='transparent'/>
                </View>

                <View>
                    <TouchableOpacity style={styles.btn} onPress={() => this.verifyPassword()}>
                        <Text>Update Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => this.logoutRequest()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
    
    // sends a call to the API to logout - requires token in header
    async logoutRequest() {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
            method: 'POST',
            headers: {
                'X-Authorization': this.props.userToken.userToken
            }
        })
 
        .then((response) => {
            console.log('AccountScreen: logoutRequest:', response)
            this.props.destroyToken()
        })
 
        .catch(function(error) {
            console.log('AccountScreen: logoutRequest: error:',error)
        })
    }

    verifyPassword() {
        if(this.state.password === this.state.confirmPassword) {
            if(this.state.forename.length === 0 || this.state.surname.length === 0 || this.state.email.length === 0 || this.state.password.length === 0, this.state.confirmPassword.length === 0) {
                ToastAndroid.show('A field is empty', ToastAndroid.SHORT);
            } else {
                this.updateRequest(this.props.userToken.userId)
            }
        } else {
            ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
        }
    }

    async updateRequest(id) {
        return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+id, {
            method: 'PATCH',
            headers: { 
                Accept: 'application/json', 
                'Content-Type': 'application/json',
                'X-Authorization': this.props.userToken.userToken,
            },
            body: JSON.stringify({
                given_name: this.state.forename,
                family_name: this.state.surname,
                email: this.state.email,
                password: this.state.password
            }),
        })

        .then((response) => {
            console.log(response)
            ToastAndroid.show('Update successful', ToastAndroid.SHORT);
            this.props.navigation.navigate('Home')
        })

        .catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        console.log(this.props.userToken.userToken)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30
    },
    header: {
        marginTop: 48,
        marginBottom: 20,
        justifyContent: "center",
    },
    headerText: {
        fontSize: 24, 
        borderBottomColor: 'black', 
        borderBottomWidth: 1, 
        paddingBottom: 10
    },
    btn: {
        backgroundColor: '#8e99f3',
        fontSize: 16,
        borderRadius: 4,
        paddingVertical: 12,
        marginTop: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        marginBottom: 10,
        alignSelf: "stretch",
    },
})

const mapStateToProps = state => ({
    userToken: state.userToken,
    userId: state.userId
});

function mapDispatchToProps(dispatch) {
    return {
        destroyToken: () => dispatch({type:'DESTROY_TOKEN'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)