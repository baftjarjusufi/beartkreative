import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';





import Navbar from "./components/Navbar";// Import BlackBackground
import Home from "./components/Home";


import {View} from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Services from "./components/Services";
import Contact from "./components/Contact";


const Stack = createNativeStackNavigator();

const App = () => {

    const styles = StyleSheet.create({
        container: {
            minHeight: "100vh",
            backgroundColor: "transparent",
            position: 'relative'
        },
    });

    const linking = {
        prefixes: ['http://localhost:3000', 'https://yourdomain.com'],
        config: {
            screens: {
                Home: '/',
                Services: 'services',
                Contact: 'contact',
            },
        },
    };

    return (

        <ScrollView contentContainerStyle={styles.container}>

            <NavigationContainer linking={linking} >

                <Stack.Navigator id={"mainNavigation"} screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                    />
                    <Stack.Screen
                        name="Services"
                        component={Services}
                    />
                    <Stack.Screen
                        name="Contact"
                        component={Contact}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ScrollView>

    );
};

export default App;