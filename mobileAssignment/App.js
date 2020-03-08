import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './screens/Login'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import AccountScreen from './screens/AccountScreen'
import SignUp from './screens/SignUp'
import ProfileScreen from './screens/ProfileScreen'
import PostScreen from './screens/PostScreen'
import MyProfile from './screens/MyProfile'
import { returnToken } from './utils/my-utils'
import {connect, useDispatch} from 'react-redux'


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Search() {
  return (
    <Stack.Navigator initialRouteName='Search'>
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
      />
    </Stack.Navigator>
  )
}

function Home() {
  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Post" component={PostScreen} options={{headerTitleAlign: 'row'}}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function MyDrawer() {
  return (
      <Drawer.Navigator
        initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={MyTabs}>
          </Drawer.Screen>
          <Drawer.Screen
            name="Account Management"
            component={AccountScreen}>
          </Drawer.Screen>
          <Drawer.Screen
            name='My Profile'
            component={MyProfile}>
          </Drawer.Screen>
      </Drawer.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon
            name='home'
            size={20}
            color={color}/>
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => <Icon 
              name='search'
              size={20}
              color={color}/>
        }}
      />
    </Tab.Navigator>
  );
}

class App extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    console.log('App: componentDidMount:', this.props.userToken.userToken)
    //let userToken = await returnToken('token')
    this.setState({isLoading: false})
  }

  render() {
    if(this.state.isLoading) {
      return(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator/>
          </View>
      )
    }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.userToken.userToken == null ?  ( // no token found - redirect to login screen
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          ) : ( // token found - redirect to dashboard
            <Stack.Screen name="Home" component={MyDrawer} options={{headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  userToken: state.userToken,
  loggedIn: state.loggedIn,
});

// export default App
//export default connect(mapStateToProps, null)(App)
export default connect (mapStateToProps)(App)