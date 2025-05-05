import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
        <Animated.View style={[
            styles.navbar,
            isMobile && styles.navbarMobile,
            {
                transform: [{ translateY: navbarTranslateY }],
                backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.05)',
            }
        ]}>
            <TouchableOpacity onPress={() => handleLink('Home')}>
                <Text style={[styles.logo, isMobile && styles.logoMobile]}>Beart</Text>
            </TouchableOpacity>

            {isMobile ? (
                <>
                    <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
                        <Text style={styles.hamburger}>☰</Text>
                    </TouchableOpacity>

                    {menuOpen && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity onPress={() => handleLink('Home')}>
                                <Text style={styles.navItemMobile}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleLink('Services')}>
                                <Text style={styles.navItemMobile}>Services</Text>
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
                    <TouchableOpacity onPress={() => handleLink('Services')}>
                        <Text style={styles.navItem}>Services</Text>
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
        height: 90,
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
        fontSize: 44,
        marginLeft: 60,
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
        fontSize: 40,
        color: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 40,
        textAlign: 'left',
        alignSelf: 'flex-start',

        letterSpacing: 2,
        fontWeight: '600',
    },
    hamburger: {
        fontSize: 60,
        color: '#fff',
        paddingHorizontal: 15,
    },
    dropdown: {
        position: 'absolute',
        top: 100,
        right: 15,
        backgroundColor: 'rgba(51,51,51,0.45)', // semi-transparent
        borderRadius: 24,
        paddingVertical: 30,
        paddingHorizontal: 30,
        zIndex: 20,
        minWidth: 220, // ensure dropdown has width
        elevation: 5, // optional for Android shadow
    },

});

export default Navbar;
