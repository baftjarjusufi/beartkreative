import React, { useState } from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { Text } from 'react-native';

import { useEffect } from 'react';

import Spline from "@splinetool/react-spline";


import SceneSpline from "./components/SceneSpline"






import Navbar from "./components/Navbar";// Import BlackBackground
import Footer from "./components/Footer";
import Home from "./components/Home";


import {View, SafeAreaView, Image} from 'react-native';






const {width,height} = Dimensions.get("window");


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