import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Modal,
    TouchableOpacity,
    useWindowDimensions,
    FlatList, Linking,
} from 'react-native';
import Navbar from './Navbar';
import galleryImages from "./galleryImages";
import Footer from "./Footer";
import { useSwipeable } from "react-swipeable";
import debounce from 'lodash.debounce';  // Ensure lodash.debounce is imported


const Gallery = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const { width } = useWindowDimensions();
    const scrollViewRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [loadedImages, setLoadedImages] = useState(5); // Initially load 5 images
    const imagesPerLoad = 2; // Number of images to load at once



    const imageArray = galleryImages;

    const imageRefs = useRef([]);

    // Lazy load when images enter viewport
    const handleImageIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = parseInt(entry.target.getAttribute("data-index"), 10);
                if (index >= loadedImages - 1) {
                    setLoadedImages((prev) => prev + imagesPerLoad);
                }
            }
        });
    };
    useEffect(() => {
        const observer = new IntersectionObserver(handleImageIntersection, {
            rootMargin: '1000px', // Start observing 1000px before the image enters the viewport
            threshold: 0.5, // Trigger when 50% of the image is in view
        });

        // Attach observer to each image
        imageRefs.current.forEach((image) => {
            if (image) {
                observer.observe(image);
            }
        });

        // Clean up observer on component unmount
        return () => {
            observer.disconnect();
        };
    }, []);

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

    // Lazy load more images when scrolling reaches the end
    const handleEndReached = () => {
        setLoadedImages(prev => prev + imagesPerLoad);
    };

    // The handleScroll function with debounce and useCallback
    const handleScroll = useCallback(
        debounce((event) => {
            const contentHeight = event.nativeEvent.contentSize.height;
            const contentOffsetY = event.nativeEvent.contentOffset.y;
            const visibleHeight = event.nativeEvent.layoutMeasurement.height;

            // Lazy load images when user scrolls near the end
            if (contentOffsetY + visibleHeight >= contentHeight - 100) {
                setLoadedImages((prev) => prev + imagesPerLoad);
            }
        }, 200),  // 200ms debounce delay
        [] // Empty dependency array so this callback does not change on re-renders
    );
    const handleSocialMediaPress = (url) => {
        Linking.openURL(url);
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

    const [currentStep, setCurrentStep] = useState(0); // Keeps track of which tutorial step we are on
    const [tutorialModalVisible, setTutorialModalVisible] = useState(true); // Tutorial modal visibility

    // Simplified renderItem
    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            ref={(el) => (imageRefs.current[index] = el)}
            data-index={index}
            onPress={() => handleImageClick(index)}
            style={[styles.imageWrapper, isMobile ? styles.imageMobile : styles.imageDesktop]}
        >
            <Image source={item} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Navbar />
            <FlatList
                scrollEnabled={true}

                data={imageArray.slice(0, loadedImages)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.content}

                onScroll={handleScroll}
                ListHeaderComponent={
                    <>
                        <Text style={styles.title}>Our Gallery</Text>
                        <Text style={styles.introductionText}>
                            Këtu janë disa nga momentet tona të preferuara të kapura përmes kamerës sonë.
                            {'\n'}Klikoni çdo foto për ta parë atë në detaje.
                        </Text>
                        <View style={styles.linetest}></View>

                        {/* Social Media and Contact in Same Line */}
                        <View style={styles.socialMediaContactContainer}>
                            {/* Social Media */}
                            <View style={styles.socialMediaContainer}>
                                <Text style={[styles.socialMediaText, isMobile ? styles.socialMediaTextMobile : null]}>Për më shumë Foto na ndjekni edhe në:</Text>
                                <View style={styles.socialMedia}>
                                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.instagram.com/beartproduction10/?hl=en')}>
                                        <Image source={require('../assets/images/Instagram-icon.png')} style={[styles.icon, isMobile ? styles.iconMobile : null]} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleSocialMediaPress('https://www.facebook.com/creativevideostudio10/')}>
                                        <Image source={require('../assets/images/facebook-icon.png')} style={[styles.icon, isMobile ? styles.iconMobile : null]} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </>
                }
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1} // Trigger lazy load when near the end
                numColumns={isMobile ? 1 : 3}

            />

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

            {/* Tutorial Modal */}
            {tutorialModalVisible && (
                <Modal transparent={true} visible={tutorialModalVisible} onRequestClose={() => setTutorialModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.tutorialModal}>
                            <Text style={styles.tutorialText}>
                                Klikoni mbi një foto, Swipe majtas ose djathtas për të lëvizur nëpër fotografi.
                            </Text>

                            <TouchableOpacity style={styles.nextButton} onPress={() => setTutorialModalVisible(false)}>
                                <Text style={styles.nextButtonText}>Okay</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            )}

            <Footer />
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
        minHeight: '100vh', // Ensures it fills full height of screen

    },
    title: {
        fontSize: 60,
        color: 'white',
        marginTop: 40,
        marginBottom: 80,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',  // Ensures the Text is centered in parent
        width: '100%',        // Optional: makes sure it spans full width
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
        borderColor: 'white',
        transition: 'border 0.3s ease', // Smooth transition for the border
        border: '5px solid white',

    },
    imageDesktop: {
        width: 600,
        height: 450,
    },
    imageMobile: {
        width: '100%',
        height: 500,
        aspectRatio: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageHovered: {
        transform: [{ scale: 1.05 }],
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
        zIndex: 999,
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

    // Tutorial Modal
    tutorialModal: {
        padding: 100,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width:'80%', maxWidth:500,
    },
    tutorialText: {
        fontSize: 36,
        color: 'black',
        marginBottom: 25,
        textAlign: 'center',
        lineHeight: 50,
    },
    nextButton: {
        backgroundColor: 'black',
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderRadius: 20,
        outline:'none',
        borderWidth:0,
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold' ,
        fontSize: 18,
    },
    socialMediaContactContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    socialMediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    socialMediaText: {
        color: 'white',
        fontSize: 32,
        marginRight: 10,
    },
    socialMediaTextMobile: {
        fontSize: 26,
    },
    socialMedia: {
        flexDirection: 'row',
    },
    icon: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 15, // Adjust space between icons as needed

    },
    iconMobile: {
        width: 55,
        height: 55,
        marginRight: 15, // Adjust space between icons as needed

    },

});

export default Gallery;
