import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import Navbar from './Navbar';
import Footer from "./Footer"; // Adjust the path if needed
import BusCard from './BusCard';

const Contact= () => {
    return (
        <ScrollView style={styles.container}>
            <Navbar />
            <View style={styles.content}>
                <Text style={styles.title}>Our Contact</Text>
                {/* Add contact info here */}
            </View>

            <ScrollView>
                <BusCard />
                {/* Other content */}
            </ScrollView>

            <Footer />
        </ScrollView>
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