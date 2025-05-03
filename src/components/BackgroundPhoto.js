import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const BackgroundPhoto = () => {
    return (
        <ImageBackground
            source={{ uri: '/test-background.png' }}
            style={styles.bgPhoto}
            resizeMode="cover"
        />
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000', // optional
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgPhoto: {

        width: '100%',
        height: width > 768 ? height * 0.7 : height * 1.2, // Increased height for mobile
    },
});
export default BackgroundPhoto
