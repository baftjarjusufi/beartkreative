import React from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { Text } from 'react-native';

import { useEffect } from 'react';

import Spline from "@splinetool/react-spline";


import SceneSpline from "./components/SceneSpline"






import Navbar from "./components/Navbar";// Import BlackBackground
import Footer from "./components/Footer";

import {View, SafeAreaView} from 'react-native';





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
        splineContainer: {
            width: '100%',
            marginTop: 80, // Match navbar height
            backgroundColor: 'black'
        },
        cardContainer: {
            padding: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: '#f5f5f5',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            margin: 10,
            width: 300,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        cardTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        cardText: {
            fontSize: 16,
            color: '#666',
            lineHeight: 24,
        },
        regularText: {
            fontSize: 16,
            color: '#666',
            lineHeight: 24,
            marginTop: 20,
            textAlign: 'center'
        },
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.navbar}>
                <Navbar />
            </View>

            <View style={styles.splineContainer}>
                <SceneSpline style={{ width: '100%', height: '100%' }} />
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Creative Design</Text>
                    <Text style={styles.cardText}>
                        Explore innovative design solutions that push the boundaries of creativity and functionality.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>3D Excellence</Text>
                    <Text style={styles.cardText}>
                        Discover the power of 3D visualization and interactive experiences in modern web design.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Digital Innovation</Text>
                    <Text style={styles.cardText}>
                        Stay ahead of the curve with cutting-edge digital solutions and immersive experiences.
                    </Text>
                </View>
            </View>

            <Text style={styles.regularText}>
                This is some regular text below the Spline scene.
            </Text>
            
            <Footer />
        </ScrollView>
    );
};

export default App;