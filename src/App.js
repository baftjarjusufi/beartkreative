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
            flexDirection: width > 768 ? 'row' : 'column',
            flexWrap: width > 768 ? 'wrap' : 'nowrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#000000',
            gap: width > 768 ? 30 : 60,
            paddingVertical: width > 768 ? 50 : 80,
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: width > 768 ? 20 : 30,
            padding: width > 768 ? 30 : 45,
            margin: width > 768 ? 0 : 20,
            width: width > 768 ? 350 : '95%',
            minHeight: width > 768 ? 'auto' : 400,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 10,
            transform: [{scale: 1}],
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            ':hover': {
                transform: [{scale: 1.05}],
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
            }
        },
        cardTitle: {
            fontSize: width > 768 ? 24 : 36,
            fontWeight: '700',
            marginBottom: width > 768 ? 15 : 30,
            color: '#ffffff',
            letterSpacing: 0.5,
            textAlign: width > 768 ? 'left' : 'center',
        },
        cardText: {
            fontSize: width > 768 ? 16 : 24,
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: width > 768 ? 26 : 36,
            letterSpacing: 0.3,
            textAlign: width > 768 ? 'left' : 'center',
        },
        regularText: {
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 24,
            marginTop: 40,
            marginBottom: 40,
            textAlign: 'center',
            letterSpacing: 0.3,
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