import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';

const Footer = () => {
    const { width } = Dimensions.get('window'); // Get the current screen width

    // Detect if on iOS (for React Native Web)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const handleSocialMediaPress = (url) => {
        Linking.openURL(url);
    };

    // Check if the device is mobile (you can adjust the breakpoint as needed)
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <View style={[styles.footer, isMobile ? styles.footerMobile : null]}>
                <View style={styles.content}>


                    <View style={styles.headerContainer}>
                        <Text style={[styles.companyName, isMobile ? styles.companyNameMobile : null]}>
                            Beart Production
                        </Text>
                        <Text style={styles.addressText}>1200 Tetova, Maqedonia e Veriut</Text>
                    </View>

                </View>


                {/* Social Media and Contact in Same Line */}
                <View style={styles.socialMediaContactContainer}>
                    {/* Social Media */}
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

                    {/* Contact */}
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

                {/* Line above Copyright, Inline with Quick Links */}
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
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent:'center',
        marginBottom: 10,


    },
    companyNameMobile: {
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
        marginRight: 20,  // Added some space between social media and contact
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
        fontWeight: 'bold',
        marginRight: 10,
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
        color: '#fff',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',

    },
    headerContainer: {
        flexDirection: 'row',  // Align the company name and address in a row
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Ensure it takes full width to position correctly

        marginBottom: 10,  // Add space below the header
    },
    addressText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '300',
        marginLeft: 20, // Adds space between the company name and address

    },

});

export default Footer;
