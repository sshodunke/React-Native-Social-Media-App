import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './screens/Login'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import AccountScreen from './screens/AccountScreen'

const Tab = createMaterialBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator 
      initialRouteName="Home">
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon 
              name='home'
              size={20}
              color={color}/>
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => <Icon 
              name='search'
              size={20}
              color={color}/>
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color}) => <Icon 
              name='user'
              size={20}
              color={color}/>
        }}
      />
    </Tab.Navigator>
  );
}

class App extends React.Component{
  render() {
    return (
      <NavigationContainer>
        <MyTabs/>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flex: 1,
  }
})

// export default App
export default Login