import React from 'react';
import { StyleSheet, View, Text, Linking, Dimensions } from 'react-native';

const Navbar = () => {
    const windowWidth = Dimensions.get('window').width;
    const isMobile = windowWidth < 768;

    const handleLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.navbar, isMobile && styles.navbarMobile]}>
                {/* Logo */}
                <Text style={[styles.logo, isMobile && styles.logoMobile]}>Beart</Text>

                {/* Navigation Links - Responsive */}
                <View style={styles.navLinks}>
                    <Text style={[styles.navItem, isMobile && styles.navItemMobile]} onPress={() => handleLink('/beart/public')}>Home</Text>
                    <Text style={[styles.navItem, isMobile && styles.navItemMobile]} onPress={() => handleLink('/services')}>Services</Text>
                    <Text style={[styles.navItem, isMobile && styles.navItemMobile]} onPress={() => handleLink('/contact')}>Contact</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 50,
    },
    navbar: {
        height: 80,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    navbarMobile: {
        height: 120,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    logo: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
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