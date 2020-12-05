import React from 'react';
import {
  Text,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// bring in all the screen
import Home from './screens/Home'
import Add from './screens/Add'
import Edit from './screens/Edit'

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#000"
            },
            title: 'Netflix App',
            headerTitleStyle: {
              color: "#AE1438",
              textAlign: "center"
            }
          }}
        >

        </Stack.Screen>
        <Stack.Screen
          name="Add"
          component={Add}
          options={{
            headerStyle: {
              backgroundColor: "#000"
            },
            title: 'Netflix App',
            headerTitleStyle: {
              color: "#AE1438",
              textAlign: "center"
            }
          }}
        >

        </Stack.Screen>
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{
            headerStyle: {
              backgroundColor: "#000"
            },
            title: 'Netflix App',
            headerTitleStyle: {
              color: "#AE1438",
              textAlign: "center"
            }
          }}
        >

        </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
  )
}

export default App;
