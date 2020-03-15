import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
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
import {connect} from 'react-redux'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowersScreen from './screens/follow_management/FollowersScreen'
import FollowingScreen from './screens/follow_management/FollowingScreen'
import ChitDetailsScreen from './screens/ChitDetailsScreen'
import DraftScreen from './screens/DraftScreen'

const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// holds navigation for the search screen - includes profiles for once a user clicks on a searched user
function SearchNavigator() {
  return (
    <Stack.Navigator initialRouteName='Search'>
      <Stack.Screen name='Search' component={SearchScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  )
}

// holds navigation for the home screen - includes post screen for once a user wants to create a new post
function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="Post" component={PostScreen} options={{headerTitleAlign: 'row'}}/>
      <Stack.Screen name="ChitDetails" component={ChitDetailsScreen} options={{headerTitle: 'Post Details', headerTitleAlign: 'center'}}/>
      <Stack.Screen name='Drafts' component={DraftScreen} options={{headerTitleAlign: "center"}}/>
    </Stack.Navigator>
  )
}

// main drawer navigator for app - holds all draw items
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={MyTabs} />
      <Drawer.Screen name="Account Management" component={AccountScreen} />
      <Drawer.Screen name='My Profile' component={MyProfileNavigation} />
    </Drawer.Navigator>
  )
}

// main bottom navigator for the home and search screen. this navigator is nested inside the main drawer
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{keyboardHidesTabBar: true, style: {position: 'absolute'}}}>
      <Tab.Screen name="Home" component={HomeNavigator} options={{tabBarIcon: ({color}) => <Icon name='home' size={20} color={color}/>}}/>
      <Tab.Screen name="Search" component={SearchNavigator} options={{tabBarIcon: ({color}) => <Icon name='search' size={20} color={color}/>}}/>
    </Tab.Navigator>
  )
}

// top tab navigator - holds followers and following screen.
function FollowersManagement() {
  return(
    <TopTab.Navigator>
      <TopTab.Screen name='Following' component={FollowingScreen} />
      <TopTab.Screen name='Followers' component={FollowersScreen} />
    </TopTab.Navigator>
  )
}

// navigation for user profile - holds top tabs to access followers and following screen
function MyProfileNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyProfile' component={MyProfile} options={{headerShown: false}}></Stack.Screen>
      <TopTab.Screen name='FollowList' component={FollowersManagement} options={{headerTitleAlign: 'row', headerTitle: 'Manage Social'}}></TopTab.Screen>
    </Stack.Navigator>
  )
}

class App extends React.Component{
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.props.userToken.userToken == null ?  ( // no token found - redirect to login screen
          <>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          </>
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
  userId: state.userId,
});

export default connect (mapStateToProps)(App)