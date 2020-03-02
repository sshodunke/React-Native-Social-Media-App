import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
      />
      <Tab.Screen name="Search" component={SearchScreen}/>
      <Tab.Screen name="Account" component={AccountScreen}/>
    </Tab.Navigator>
  );
}

class HomeScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

class SearchScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>Search</Text>
      </View>
    );
  }
}

class AccountScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>AccountScreen</Text>
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

export default function App() {
  return(
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}