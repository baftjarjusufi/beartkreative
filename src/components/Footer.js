import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ImageBackground } from 'react-native';

const Footer = () => {
    const handleGithubPress = () => {
        Linking.openURL('https://github.com/baftjarjusufi');
    };

    return (
        <ImageBackground 
            source="/wave.png"
            style={styles.footer}
            resizeMode="cover"
        >
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Developed by{' '}
                    <TouchableOpacity onPress={handleGithubPress}>
                        <Text style={styles.link}>BaftjarJusufi</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 150,
        marginTop: 'auto',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
    link: {
        color: '#000',
        textDecorationLine: 'underline',
    },
});

export default Footer; 