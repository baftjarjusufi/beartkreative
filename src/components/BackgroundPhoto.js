import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native';

const { width, height } = Dimensions.get('window');




const BackgroundPhoto = () => {

    const disableSave = (e) => {
        e.preventDefault();
    };

    return (
        <ImageBackground
            source={{ uri: '/test-background.png' }}
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
                    <Text style={styles.description}>Capturing life's most precious moments with artistry and passion</Text>
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
        height: width > 768 ? height * 0.7 : height * 1.2,
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
    },
    mainText: {
        color: '#fff',
        fontSize: width > 768 ? 112 : 100,
        fontWeight: '300',
        textAlign: 'center',
        letterSpacing: 8,
        marginBottom: 10,
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
    },
    description: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: width > 768 ? 32 : 30,
        textAlign: 'center',
        lineHeight: 28,
        letterSpacing: 1,
        maxWidth: width > 768 ? '60%' : '80%',
    },
});

export default BackgroundPhoto
