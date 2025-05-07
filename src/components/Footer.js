import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';

const Footer = () => {
    const { width } = Dimensions.get('window'); // Get the current screen width

    const handleSocialMediaPress = (url) => {
        Linking.openURL(url);
    };

    // Check if the device is mobile (you can adjust the breakpoint as needed)
    const isMobile = width < 768;

    return (
        <View style={styles.container}>
            <View style={[styles.footer, isMobile ? styles.footerMobile : null]}>
                <View style={styles.content}>
                    <Text style={[styles.companyName, isMobile ? styles.companyNameMobile : null]}>Beart Production</Text>
                    <Text style={[styles.motto, isMobile ? styles.mottoMobile : null]}>Capturing life's most precious moments with artistry and passion...</Text>
                </View>

                {/* "Na ndjekni edhe ne:" Text before the icons */}
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

                {/* Text and WhatsApp + Viber Icon */}
                <View style={styles.contactContainer}>
                    <Text style={[styles.contactText, isMobile ? styles.contactTextMobile : null]}>Na kontaktoni në: </Text>

                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://wa.me/+38970751551')}>
                        <Image source={require('../assets/images/whatsapp-icon.png')} style={[styles.whatsappIcon, isMobile ? styles.whatsappIconMobile : null]} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSocialMediaPress('viber://chat?number=%2B38970751551')}>
                        <Image source={require('../assets/images/viber-icon.png')} style={[styles.whatsappIcon, isMobile ? styles.whatsappIconMobile : null]} />
                    </TouchableOpacity>
                </View>


                {/* Line above Copyright, Inline with Quick Links */}
                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                </View>

                {/* Copyright Text */}
                <Text style={styles.copyrightText}>Copyright 2025 Beart Production</Text>
            </View>



            <View style={styles.footerSpacing}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    footer: {
        width: '100%',
        backgroundColor: '#000',
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginTop: 20,
        borderTopWidth: 2,
        borderTopColor: '#fff',
        opacity: 0.6,
        marginBottom: 30,
    },
    footerMobile: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    content: {
        alignItems: 'center',
        marginBottom: 30,
    },
    companyName: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    companyNameMobile: {
        fontSize: 26,  // Smaller on mobile
    },
    motto: {
        color: '#fff',
        fontSize: 32,
        textAlign: 'center',
        marginTop: 15,
    },
    mottoMobile: {
        fontSize: 20,  // Smaller on mobile
    },
    socialMediaTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    socialMediaText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 10,
    },
    socialMediaTextMobile: {
        fontSize: 18,  // Smaller on mobile
    },
    socialMedia: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    icon: {
        width: 85,
        height: 85,
        marginHorizontal: 10,
    },
    iconMobile: {
        width: 50,  // Smaller on mobile
        height: 50, // Smaller on mobile
    },
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    contactText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 10,
    },
    contactTextMobile: {
        fontSize: 18,  // Smaller on mobile
    },
    whatsappIcon: {
        width: 85,
        height: 85,
        marginHorizontal: 10,
    },
    whatsappIconMobile: {
        width: 50,  // Smaller on mobile
        height: 50, // Smaller on mobile
    },


    lineContainer: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 10,
    },
    line: {
        width: '60%',
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.5,
        marginBottom: 20,
        marginTop: 20,
    },
    copyrightText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'normal',
        textAlign: 'center',
    },
    footerSpacing: {
        height: 100,
        backgroundColor: '#000',
        marginBottom: 30,
    },
});

export default Footer;
