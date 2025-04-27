// src/components/SceneSpline.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Spline from '@splinetool/react-spline';

const { width, height } = Dimensions.get('window');

const SceneSpline = () => {
    return (
        <View style={styles.splineWrapper}>
            <Spline scene="/scene.splinecode" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // optional
        alignItems: 'center',
        justifyContent: 'center',
    },
    splineWrapper: {
        width: '100%',
        height: width > 768 ? height * 0.7 : height * 1.2, // Increased height for mobile
    },
});
export default SceneSpline;
