import React from 'react';
import {StyleSheet, View, Text, Linking, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";


const Navbar = () => {
    const windowWidth = Dimensions.get('window').width;
    const isMobile = windowWidth < 768;
    const navigation = useNavigation();

    const handleLink = (url) => {
        navigation.navigate(url);


    };

// Inside Navbar.js
    return (
        <View style={[styles.navbar, isMobile && styles.navbarMobile]}>

            <TouchableOpacity onPress={() => handleLink('Home')} >
                <Text style={[styles.logo, isMobile && styles.logoMobile]}>Beart</Text>
            </TouchableOpacity>

            <View style={styles.navLinks}>
                <TouchableOpacity onPress={() => handleLink('Home')} >
                    <Text style={[styles.navItem, isMobile && styles.navItemMobile]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>handleLink('Services')}>
                    <Text style={[styles.navItem, isMobile && styles.navItemMobile]}>Services</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>handleLink('Contact')}>
                    <Text style={[styles.navItem, isMobile && styles.navItemMobile]}>Contact</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({

    navbar: {
        position: 'absolute',
        height: 80,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // Much more transparent background
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Horizontal, Vertical, Blur Radius, Color

        // For blur effect, this may not work directly in React Native Web
        // Use CSS for web to achieve the blur effect
        backdropFilter: 'blur(6px)', // Corrected to JavaScript style
        webkitBackdropFilter: 'blur(8px)',// Safari support
        top: 0,
        left: 0,
        zIndex: 10,

    },


    navbarMobile: {
        height: 120,
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: 'space-between', // Ensure proper spacing between logo and nav links

    },
    logo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 40, // Add space to move logo to the right
    },
    logoMobile: {
        fontSize: 36,
    },
    navLinks: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navItem: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingHorizontal: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    navItemMobile: {
        fontSize: 28,
        paddingHorizontal: 16,
        letterSpacing: 0.5,
        fontWeight: '600',
    },
});

export default Navbar;