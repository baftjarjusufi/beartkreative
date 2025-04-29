import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';





import Navbar from "./components/Navbar";// Import BlackBackground
import Home from "./components/Home";


import {View} from 'react-native';



const App = () => {



    const styles = StyleSheet.create({
        container: {
            minHeight: "100vh",
            backgroundColor: "black",
            position: 'relative'
        },
        navbar: {
            height: 80,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50
        },

    });

    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.navbar}>
                <Navbar />
            </View>

            <View>
                <Home />
            </View>




        </ScrollView>
        </>

    );
};

export default App;