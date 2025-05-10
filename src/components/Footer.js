import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';

const Footer = () => {
    const { width } = Dimensions.get('window'); // Get the current screen width

    // Detect if on iOS (for React Native Web)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const handleSocialMediaPress = (url) => {
        Linking.openURL(url);
    };

    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <View style={[styles.footer, isMobile ? styles.footerMobile : null]}>
                <View style={styles.content}>


                    <View style={styles.headerContainer}>
                        <Text style={[styles.companyName, isMobile ? styles.companyNameMobile : null]}>
                            Beart Production
                        </Text>
                        <Text style={styles.addressText}>1200 Tetovë, Maqedonia e Veriut</Text>
                    </View>

                </View>


                <View style={styles.socialMediaContactContainer}>
                    <View style={styles.socialMediaContainer}>
                        <Text style={[styles.socialMediaText, isMobile ? styles.socialMediaTextMobile : null]}>Na ndjekni edhe në:</Text>
                        <View style={styles.socialMedia}>
                            <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.instagram.com/beartproduction10/?hl=en')}>
                                <Image source={require('../assets/images/Instagram-icon.png')} style={[styles.icon, isMobile ? styles.iconMobile : null]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.facebook.com/creativevideostudio10/')}>
                                <Image source={require('../assets/images/facebook-icon.png')} style={[styles.icon, isMobile ? styles.iconMobile : null]} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.contactContainer}>
                        <Text style={[styles.contactText, isMobile ? styles.contactTextMobile : null]}>Na kontaktoni në:</Text>
                        <TouchableOpacity onPress={() => handleSocialMediaPress('https://wa.me/+38970751551')}>
                            <Image source={require('../assets/images/whatsapp-icon.png')} style={[styles.whatsappIcon, isMobile ? styles.whatsappIconMobile : null]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSocialMediaPress('viber://chat?number=%2B38970751551')}>
                            <Image source={require('../assets/images/viber-icon.png')} style={[styles.whatsappIcon, isMobile ? styles.whatsappIconMobile : null]} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                </View>

                {/* Copyright Text */}
                <Text style={[styles.copyrightText , isMobile ? styles.copyrightTextMobile : null]}>Copyright 2025 Beart Production</Text>
            </View>

            <View style={styles.footerSpacing}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    footer: {
        width: '100%',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#fff',
        marginBottom: 20,
    },
    footerIOS: {
        paddingBottom: 100,
        height: 80,
    },
    footerMobile: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    companyName: {
        fontFamily: 'Sansation, sans-serif', // 👈 Add this line
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent:'center',
        marginBottom: 10,
    },
    companyNameMobile: {
        fontFamily: 'Sansation, sans-serif', // 👈 Add this line
        fontSize: 32,
    },
    socialMediaContactContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialMediaText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    socialMediaTextMobile: {
        fontSize: 18,
    },
    socialMedia: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        width: 40,
        height:  40,
        marginHorizontal: 12,
    },
    iconMobile: {
        width: 55,
        height: 55,
    },
    contactText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 10,
        fontWeight: 'bold',
    },
    contactTextMobile: {
        fontSize: 18,
    },
    whatsappIcon: {
        width:  40,
        height:  40,
        marginHorizontal: 12,
    },
    whatsappIconMobile: {
        width: 55,
        height: 55,
    },
    lineContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    line: {
        width: '60%',
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.5,
        marginBottom: 15,
    },
    copyrightText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
    },
    copyrightTextMobile: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    addressText: {
        fontFamily: 'Sansation, sans-serif',
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '300',
        marginLeft: 20,

    },

});

export default Footer;
