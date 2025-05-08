import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = ({ menuOpen, setMenuOpen }) => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            setIsScrolled(value > 50);
        });

        return () => {
            scrollY.removeListener(listener);
        };
    }, []);

    const handleLink = (url) => {
        navigation.navigate(url);
        setMenuOpen(false); // close menu after navigation
    };

    const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < 768);

    useEffect(() => {
        const handleResize = ({ window }) => {
            setIsMobile(window.width < 768);
        };

        const subscription = Dimensions.addEventListener('change', handleResize);

        return () => {
            subscription?.remove?.(); // remove listener
        };
    }, []);

    const navbarTranslateY = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -80],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={[
                styles.navbar,
                isMobile && styles.navbarMobile,
                {
                    transform: [{ translateY: navbarTranslateY }],
                    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.05)',
                },
            ]}
            className="navbar"
        >
            <TouchableOpacity onPress={() => handleLink('Home')}>
                <Image
                    source={require('../assets/images/Logo2.png')}  // Replace with the path to your logo image
                    style={[styles.logo, isMobile && styles.logoMobile]}  // Apply styles for the logo
                />
            </TouchableOpacity>
            {isMobile ? (
                <>
                    <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} className="hamburger">
                        <Text style={styles.hamburger}>
                            {menuOpen ? '✗' : '☰'}
                        </Text>
                    </TouchableOpacity>

                    {menuOpen && (
                        <View style={styles.dropdown} className="dropdown">
                            <TouchableOpacity onPress={() => handleLink('Home')}>
                                <Text style={styles.navItemMobile}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleLink('Gallery')}>
                                <Text style={styles.navItemMobile}>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleLink('Contact')}>
                                <Text style={styles.navItemMobile}>Contact</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            ) : (
                <View style={styles.navLinks}>
                    <TouchableOpacity onPress={() => handleLink('Home')}>
                        <Text style={styles.navItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLink('Gallery')}>
                        <Text style={styles.navItem}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLink('Contact')}>
                        <Text style={styles.navItem}>Contact</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        height: 100,
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    logo: {
        width: 160,  // Set a specific width for the logo
        height: 80,  // Set a specific height for the logo
        marginLeft: 40,
    },
    logoMobile: {
        width: 200,  // Set a larger width for the mobile logo
        height: 80,  // Set a larger height for the mobile logo
        marginLeft: 60,
    },
    navLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    navItem: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,


    },

    hamburger: {
        fontSize: 60,
        color: '#fff',
        paddingHorizontal: 15,
        overflow: "visible"
    },

    navItemMobile: {
        fontSize: 45,
        color: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 40,
        textAlign: 'left',
        alignSelf: 'flex-start',
        letterSpacing: 2,
        fontWeight: '700',
        transition: 'all 0.3s ease',
    },
    dropdown: {
        position: 'absolute',
        top: 120,
        right: 30,
        backgroundColor: 'rgba(45,45,45,0.59)',
        borderRadius: 16,
        paddingVertical: 40,
        paddingHorizontal: 40,
        zIndex: 20,
        minWidth: 500,
        elevation: 10,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
    },

    dropdownItem: {
        color: '#fff',
        fontSize: 22,
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.15)',
        textAlign: 'left',
    },

    dropdownItemHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        transform: 'scale(1.05)',
    },

});

export default Navbar;