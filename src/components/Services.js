import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Navbar from './Navbar';

export default function Services() {
    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.content}>
                <Text style={styles.title}>Our Services</Text>
                {/* Add your services content here */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        marginTop: 80, // Offset for navbar height
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: 'white',
    },
});
