import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';
import ClientScreen from './ClientScreen';
import CameraScreen from './CameraScreen';
import MenuScreen from './MenuScreen';

import styles from './myStyles'; // assuming you have styles defined in 'myStyles.js'

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Pressable style={styles.buttonPressable} onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>

        <View style={styles.marginVertical10} />

        <Pressable style={styles.buttonPressable} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Client" component={ClientScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
