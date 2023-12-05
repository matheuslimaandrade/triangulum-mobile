import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../pages/Home';
import { History } from '../pages/History';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Stack = createNativeStackNavigator();


export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='SignIn'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                name="History"
                component={History} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}