// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.navText}>BeartKreative</Text>
            {/* Add navigation items if needed */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 60,
        width: '100%',
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    navText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontWeight: '600',
    },
});

export default Navbar;
