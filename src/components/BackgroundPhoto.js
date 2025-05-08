import React from 'react';
import {View, StyleSheet, Dimensions,Image, ImageBackground, Text, Linking, TouchableOpacity} from 'react-native';

const { width, height } = Dimensions.get('window');
import whatsappIcon from '../assets/images/whatsapp-icon.png';
import { useState } from 'react';

import fbIcon from '../assets/images/facebook-icon.png';  // Facebook icon
import igIcon from '../assets/images/Instagram-icon.png';  // Instagram icon




const BackgroundPhoto = () => {
    const [hovered, setHovered] = useState(false); // State to handle hover effect

    const disableSave = (e) => {
        e.preventDefault();
    };
    const handleWhatsApp = () => {
        Linking.openURL('whatsapp://send?phone=+38970751551');
    };

    const handleInstagram = () => {
        Linking.openURL('https://www.instagram.com/beartproduction10/?hl=en');  // Replace with your Instagram link
    };

    const handleFacebook = () => {
        Linking.openURL('https://www.facebook.com/creativevideostudio10/');  // Replace with your Facebook link
    };
    return (
        <ImageBackground
            source={require('../assets/images/bg-photo.jpeg')}
            style={styles.bgPhoto}
            resizeMode="cover"
            onContextMenu={disableSave} // disables right-click on image
            onTouchStart={disableSave} // disables long touch on mobile
        >
            <View style={styles.overlay}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>BEART</Text>
                    <View style={styles.line} />
                    <Text style={styles.subText}>Photography</Text>
                    <Text style={styles.description}>Capturing life's most precious moments with artistry and passion... </Text>


                    <TouchableOpacity
                        onPress={() => handleWhatsApp('https://wa.me/+38970751551')}
                        style={[styles.whatsappButton, hovered && styles.whatsappButtonHovered]} // Conditionally apply hover styles
                        onMouseEnter={() => setHovered(true)}  // When the mouse enters, set hover to true
                        onMouseLeave={() => setHovered(false)} // When the mouse leaves, set hover to false
                    >
                        <Image
                            source={require('../assets/images/whatsapp-icone.png')} // Add the image source here
                            style={styles.whatsappIcon} // Set the style for the image
                        />

                        <Text style={styles.whatsappButtonText}>{'Whatsapp +38970751551'}</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Social Media Icons */}
            <TouchableOpacity
                onPress={handleInstagram}
                style={styles.socialIconContainer}
            >
                <Image source={igIcon} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleFacebook}
                style={[styles.socialIconContainer, styles.facebookIcon]}
            >
                <Image source={fbIcon} style={styles.socialIcon} />
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgPhoto: {
        width: '100%',
        height: width > 768 ? height * 1.1 : height * 1.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        maxWidth: '100%',
        padding: 20,
        userSelect: 'none', // For web environments

    },
    mainText: {
        color: '#fff',
        fontSize: width > 768 ? 112 : 100,
        fontWeight: '300',
        textAlign: 'center',
        letterSpacing: 8,
        marginBottom: 10,
        userSelect: 'none', // For web environments

    },
    line: {
        width: width > 768 ? 200 : 150,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginVertical: 20,
    },
    subText: {
        color: '#fff',
        fontSize: width > 768 ? 36 : 34,
        fontWeight: '300',
        textAlign: 'center',
        letterSpacing: 4,
        marginBottom: 20,
        userSelect: 'none', // For web environments

    },
    description: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: width > 768 ? 32 : 30,
        textAlign: 'center',
        lineHeight: 28,
        letterSpacing: 1,
        maxWidth: width > 768 ? '60%' : '80%',
        userSelect: 'none', // For web environments
        marginBottom: 20,

    },
    // WhatsApp Button Styles
    whatsappButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 50,
        transition: 'all 0.3s ease',  // Smooth transition for hover effect

    },
    whatsappButtonText: {
        color: 'white',
        fontSize: 26,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    whatsappIcon: {
        width: 40, // Adjust the size of the icon
        height: 40, // Adjust the size of the icon
    },
    // Hovered Button Styles
    whatsappButtonHovered: {
        transform: 'scale(1.3)',  // Scale the button up when hovered
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight background change on hover
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 15 }, // Shadow position
        shadowOpacity: 0.5, // Shadow opacity
        shadowRadius: 15, // Shadow blur radius
        elevation: 15, // For Android devices
    },
    // Social Media Icons Container for the left side
    socialIconContainer: {
        position: 'absolute',
        left: 20,  // Position them to the left of the screen
        top: '50%',  // Center them vertically
        alignItems: 'center',  // Center the icons horizontally
        marginHorizontal: 20,
        marginRight:20,
    },
    socialIcon: {
        width: 70, // Icon size
        height: 70, // Icon size
        marginTop: -7, // Space for Facebook icon

    },
    facebookIcon:{
        width: 70, // Icon size
        height: 70, // Icon size
        marginTop: 100, // Space for Facebook icon


    },
});

export default BackgroundPhoto
