import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Modal,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import Navbar from './Navbar';
import { ScrollView } from 'react-native-web';
import galleryImages from "./galleryImages";
import Footer from "./Footer";
import { useSwipeable } from "react-swipeable";

const Gallery = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const { width } = useWindowDimensions();
    const scrollViewRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [loadedImages, setLoadedImages] = useState(5); // Initially load 5 images
    const imagesPerLoad = 5; // Number of images to load at once

    const imageArray = galleryImages;

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

    const handleScroll = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        const visibleHeight = event.nativeEvent.layoutMeasurement.height;

        // If the user has scrolled to the bottom (near the last image), load more images
        if (contentOffsetY + visibleHeight >= contentHeight - 100) {
            setLoadedImages(prev => prev + imagesPerLoad);
        }
    };

    const isMobile = width <= 600;

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNextImage,
        onSwipedRight: handlePrevImage,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.content}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Text style={styles.title}>Our Gallery</Text>
                <Text style={styles.introductionText}>
                    Këtu janë disa nga momentet tona të preferuara të kapura përmes kamerës sonë.
                    {'\n'}Klikoni çdo foto për ta parë atë në detaje.
                </Text>
                <View style={styles.linetest}></View>

                <View style={styles.galleryGrid}>
                    {imageArray.slice(0, loadedImages).map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleImageClick(index)}
                            style={[styles.imageWrapper, isMobile ? styles.imageMobile : styles.imageDesktop, isHovered ? styles.imageHovered : null]}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Image
                                source={image}
                                style={[styles.image, isHovered ? styles.imageTilt : null]}
                                resizeMode="cover"
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
                                />
                                <View style={styles.navigationButtons}>
                                    <TouchableOpacity onPress={handlePrevImage} style={styles.navButton}>
                                        <Text style={styles.navButtonText}>{"<"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleNextImage} style={styles.navButton}>
                                        <Text style={styles.navButtonText}>{">"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}

                <Footer />
            </ScrollView>

            <TouchableOpacity style={styles.goToTopButton} onPress={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}>
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
        fontSize: 60,
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
    introductionText: {
        fontSize: 40,
        color: 'white',
        marginBottom: 40,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 60,
    },
    linetest: {
        width: '60%',
        height: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'center',
        marginTop: 10,
    },
    imageWrapper: {
        borderRadius: 10,
        overflow: 'hidden',
        margin: 40,
        border: '5px solid white',
    },
    imageDesktop: {
        width: 600,
        height: 450,
    },
    imageMobile: {
        width: '95%',
        height: 500,
        userSelect: 'none',
    },
    image: {
        width: '100%',
        height: '100%',
        userSelect: 'none',
        transition: 'transform 0.5s ease',
    },
    imageHovered: {
        transform: 'scale(1.05)',
        border: '5px transparent #fff',
    },
    imageTilt: {
        transform: 'rotateX(20deg) rotateY(20deg)',
        border: '5px solid #fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    zoomedImage: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
    },
    zoomedImageMobile: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
    },
    zoomedImageWrapper: {
        position: 'relative',
        width: '90%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 30,
        backgroundColor: 'transparent',
        borderRadius: 5,
        zIndex: 999, // Ensure it is in front of other elements

    },
    closeText: {
        fontSize: 50,
        color: 'black',
        fontWeight: 'bold',
        WebkitTextStroke: '3px white',
    },
    navigationButtons: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    navButton: {
        backgroundColor: 'transparent',
        padding: 30,
        borderRadius: 5,
    },
    navButtonText: {
        fontSize: 50,
        color: 'black',
        fontWeight: 'bold',
        WebkitTextStroke: '3px white',
    },
    goToTopButton: {
        position: 'absolute',
        bottom: '12%',
        right: '10%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 50,
        padding: 15,
    },
    goToTopText: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Gallery;
