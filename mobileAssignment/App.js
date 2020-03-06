import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
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
import PostScreen from './screens/PostScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen 
        name='Login' 
        component={Login} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp}
        options={{headerShown: false }} 
      />
      <Stack.Screen
        name="Home"
        component={MyDrawer}
        options={{headerShown: false }} 
      />
    </Stack.Navigator>
  )
}

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

function PostTitle() {
  return (
    <View style={styles.header}>
        <View style={{flexDirection: "row-reverse", justifyContent: "center", alignItems: 'center'}}>
            <Text style={styles.headerTitle}>Post</Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: 'flex-end', marginEnd: 12}}>
            <TouchableOpacity>
                <Icon name='plus' size={18} color='#D8D9DB'></Icon>
            </TouchableOpacity>
        </View>
    </View>
  )
}

function Home() {
  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={{headerTitle: props => <PostTitle {...props} />}}
        />
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
        <MyStack/>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
  },
  headerTitle: {
      fontSize: 20,
  },
})


// export default App
export default App