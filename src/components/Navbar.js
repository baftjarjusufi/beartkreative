import React from 'react';
import {StyleSheet, View, Text, Linking, Dimensions, TouchableOpacity, ScrollView, Animated} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useState, useEffect, useRef} from "react";

const Navbar = () => {
    const windowWidth = Dimensions.get('window').width;
    const isMobile = windowWidth < 768;
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            setIsScrolled(value > 50); // Change navbar behavior after scrolling 50 units
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, []);

    const handleLink = (url) => {
        navigation.navigate(url);
    };

    const navbarTranslateY = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -80], // Move navbar up by its height
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[
            styles.navbar, 
            isMobile && styles.navbarMobile,
            {
                transform: [{ translateY: navbarTranslateY }],
                backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.05)',
            }
        ]}>
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
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        height: 60,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)',
        webkitBackdropFilter: 'blur(8px)',
        top: 0,
        left: 0,
        zIndex: 10,
    },

    navbarMobile: {
        height: 80,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    logo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 40,
    },
    logoMobile: {
        fontSize: 28,
    },
    navLinks: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navItem: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    navItemMobile: {
        fontSize: 22,
        paddingHorizontal: 12,
        letterSpacing: 0.5,
        fontWeight: '600',
    },
});

export default Navbar;