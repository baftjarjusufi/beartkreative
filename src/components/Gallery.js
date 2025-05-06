import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    PanResponder,
    Image,
    Modal,
    TouchableOpacity,
    useWindowDimensions,
    ImageBackground
} from 'react-native';
import Navbar from './Navbar';
import { ScrollView } from 'react-native-web';

import TestImage1 from '../assets/images/test-background.png';
import TestImage2 from '../assets/images/test-background1.jpeg';
import TestImage3 from '../assets/images/test-background2.jpeg';
import {useSwipeable} from "react-swipeable";
import Footer from "./Footer";

const Gallery = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);

    const { width } = useWindowDimensions();
    const scrollViewRef = useRef(null);

    const [imageDimensions, setImageDimensions] = useState([]);


    const imageArray = [TestImage1, TestImage2, TestImage3];




    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setCurrentImageIndex(null);
    };

    // Logic to go to the next image (or loop back to the first image)
    const handleNextImage = () => {
        if (currentImageIndex < imageArray.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0); // Loop back to the first image
        }
    };

    // Logic to go to the previous image (or loop back to the last image)
    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(imageArray.length - 1); // Loop back to the last image
        }
    };

    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    const disableSave = (e) => {
        e.preventDefault();
    };

    const disableDrag = (e) => {
        e.preventDefault();
    };

    const isMobile = width <= 600;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            handleNextImage(); // Move to the next image on swipe left (loop back if at the end)
        },
        onSwipedRight: () => {
            handlePrevImage(); // Move to the previous image on swipe right (loop back if at the start)
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });




    return (

        <View style={styles.container}>
            <Navbar />
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Our Gallery</Text>

                <View style={styles.galleryGrid}>
                    {imageArray.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleImageClick(index)}
                            style={[styles.imageWrapper, isMobile ? styles.imageMobile : styles.imageDesktop]}
                        >
                            <Image
                                source={image}
                                style={styles.image}
                                resizeMode="cover"
                                onContextMenu={disableSave}
                                onTouchStart={disableSave} // disables long touch on mobile
                            />
                        </TouchableOpacity>
                    ))}
                </View>

                {isModalVisible && currentImageIndex !== null && (
                    <Modal transparent={true} visible={isModalVisible} onRequestClose={handleCloseModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.zoomedImageWrapper} {...swipeHandlers}>
                                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                                    <Text style={styles.closeText}>X</Text>
                                </TouchableOpacity>

                                <Image
                                    source={imageArray[currentImageIndex]}
                                    style={isMobile ? styles.zoomedImageMobile : styles.zoomedImage}
                                    resizeMode="contain"
                                    onContextMenu={disableSave}
                                    onDragStart={disableDrag}
                                    onTouchStart={disableSave} // disables long touch on mobile
                                />

                                <View style={styles.navigationButtons}>
                                    <TouchableOpacity onPress={handlePrevImage} style={styles.navButton}>
                                        <Text style={styles.navButtonText}>Prev</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleNextImage} style={styles.navButton}>
                                        <Text style={styles.navButtonText}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </ScrollView>

            {/* Go to Top button */}
            <TouchableOpacity style={styles.goToTopButton} onPress={scrollToTop}>
                <Text style={styles.goToTopText}>↑</Text>
            </TouchableOpacity>


        </View>



    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        marginTop: 80,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: 'white',
        marginTop: 40,
        marginBottom: 80,
        fontWeight: 'bold',
    },
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    imageWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
        margin: 40,
    },
    imageDesktop: {
        width: 600,
        height: 450,
    },
    imageMobile: {
        width: '95%',
        height: 500,
        userSelect: 'none', // Disable text selection for web

    },
    image: {
        width: '100%',
        height: '100%',
        userSelect: 'none', // Disable text selection for web

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        userSelect: 'none', // Disable text selection for web
        backdropFilter: 'blur(15px)',
        webkitBackdropFilter: 'blur(15px)',

    },
    zoomedImage: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
        userSelect: 'none', // Disable text selection for web

    },
    zoomedImageMobile: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        userSelect: 'none', // Disable text selection for web

    },
    zoomedImageWrapper: {
        position: 'relative',
        width: '90%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none', // Disable text selection for web

    },
    closeButton: {
        position: 'absolute',
        top: 20,  // Keep the button fixed at the top-right corner
        right: 20,
        padding: 30,
        backgroundColor: 'rgba(223, 223, 223, 0.5)',  // Keep transparent but slightly visible
        borderRadius: 5,
        zIndex: 2,
    },
    closeText: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold',
        userSelect: 'none', // Disable text selection for web

    },
    navigationButtons: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        userSelect: 'none', // Disable text selection for web

    },
    navButton: {
        backgroundColor: 'rgba(223, 223, 223, 0.5)',
        padding: 30,
        borderRadius: 5,
        userSelect: 'none', // Disable text selection for web

    },
    navButtonText: {
        fontSize: 32,
        color: 'black',
        fontWeight: 'bold',
        userSelect: 'none', // Disable text selection for web

    },
    goToTopButton: {
        position: 'absolute',
        bottom: '12%',  // Percentage-based to adapt to screen size
        right: '10%',  // Same here, to avoid it going off-screen
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 50,
        padding: 15,
        zIndex: 9999,  // High enough to ensure it is on top
    },
    goToTopText: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Gallery;
