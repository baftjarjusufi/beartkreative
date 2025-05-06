import React, {useState} from 'react';
import { ScrollView, StyleSheet, Animated ,TouchableWithoutFeedback, View} from 'react-native';





import Navbar from "./components/Navbar";// Import BlackBackground
import Home from "./components/Home";


import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";


const Stack = createNativeStackNavigator();

const App = () => {
    const scrollY = new Animated.Value(0);
    const [menuOpen, setMenuOpen] = useState(false);


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
                Gallery: 'gallery',
                Contact: 'contact',
            },
        },
    };

    // Function to close the menu globally when tapping outside
    const closeMenu = (e) => {
        if (menuOpen && !e.target.closest('.navbar') && !e.target.closest('.hamburger')) {
            setMenuOpen(false);
        }
    };

    return (
        <ScrollView 
            contentContainerStyle={styles.container}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
        >
            {/* Wrap everything with TouchableWithoutFeedback */}
            <TouchableWithoutFeedback onPress={(e) => closeMenu(e)}>
                <View style={{ flex: 1 }}>
                    <NavigationContainer linking={linking}>
                        {/* Pass menuOpen and setMenuOpen to Navbar */}
                        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollY={scrollY} />
                        <Stack.Navigator
                            id={'mainNavigation'}
                            screenOptions={{ headerShown: false }}
                        >
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Gallery" component={Gallery} />
                            <Stack.Screen name="Contact" component={Contact} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

export default App;