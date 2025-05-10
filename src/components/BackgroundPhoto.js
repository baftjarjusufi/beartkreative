import React from 'react';
import {View, StyleSheet, Dimensions,Image, ImageBackground, Text, Linking, TouchableOpacity} from 'react-native';

const { width, height } = Dimensions.get('window');
import { useState } from 'react';


const BackgroundPhoto = () => {
    const [hovered, setHovered] = useState(false);

    const disableSave = (e) => {
        e.preventDefault();
    };
    const handleWhatsApp = () => {
        Linking.openURL('whatsapp://send?phone=+38970751551');
    };

    return (
        <ImageBackground
            source={require('../assets/images/bg-photos.jpeg')}
            style={styles.bgPhoto}
            resizeMode="cover"
            onContextMenu={disableSave}
            onTouchStart={disableSave}
        >
            <View style={styles.overlay}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>BEART</Text>
                    <View style={styles.line} />
                    <Text style={styles.subText}>Production</Text>
                    <Text style={styles.description}>Capturing life's most precious moments with artistry and passion... </Text>

                    <TouchableOpacity
                        onPress={() => handleWhatsApp('https://wa.me/+38970751551')}
                        style={[styles.whatsappButton, hovered && styles.whatsappButtonHovered]}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Image
                            source={require('../assets/images/whatsapp-icone.png')}
                            style={styles.whatsappIcon}
                        />

                        <Text style={styles.whatsappButtonText}>{'Whatsapp +38970751551'}</Text>
                    </TouchableOpacity>
                </View>

            </View>

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
        userSelect: 'none',
    },
    mainText: {
        color: '#fff',
        fontSize: width > 768 ? 112 : 100,
        fontWeight: '400',
        textAlign: 'center',
        letterSpacing: 8,
        marginBottom: 10,
        userSelect: 'none',
        fontFamily: 'Sansation, sans-serif',
        fontStyle: 'normal',
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
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 4,
        marginBottom: 20,
        userSelect: 'none',
        fontFamily: 'Roboto Serif, serif',
    },
    description: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: width > 768 ? 32 : 30,
        textAlign: 'center',
        lineHeight: 32,
        letterSpacing: 1,
        maxWidth: width > 768 ? '60%' : '80%',
        userSelect: 'none',
        marginBottom: 20,
        fontFamily: 'Playfair Display, serif',
        fontWeight:"600",
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
        transition: 'all 0.3s ease',
    },
    whatsappButtonText: {
        color: 'white',
        fontSize: 26,
        marginLeft: 20,
        fontWeight: 'bold',
    },
    whatsappIcon: {
        width: 40,
        height: 40,
    },
    // Hovered Button Styles
    whatsappButtonHovered: {
        transform: 'scale(1.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 15,
    },
});

export default BackgroundPhoto
