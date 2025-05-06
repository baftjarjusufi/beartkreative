import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Navbar from './Navbar'; // Adjust the path if needed

const Contact= () => {
    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.content}>
                <Text style={styles.title}>Our Contact</Text>
                {/* Add contact info here */}
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
        marginTop: 80, // space for the navbar
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: 'white',
    },
});
export default Contact;