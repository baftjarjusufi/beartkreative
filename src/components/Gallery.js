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

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

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

    const handleTouchStart = () => {
        if (!isMobile) {
            setIsHovered(true);  // Enable hover effect for desktop
        }
    };

    const handleTouchEnd = () => {
        if (!isMobile) {
            setIsHovered(false); // Disable hover effect when touch ends on desktop
        }
    };

    const [currentStep, setCurrentStep] = useState(0); // Keeps track of which tutorial step we are on
    const [tutorialModalVisible, setTutorialModalVisible] = useState(true); // Tutorial modal visibility

    // Function to go to the next tutorial step
    const nextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        } else {
            setTutorialModalVisible(false); // Close the tutorial after the last step
        }
    };

    return (

        <View style={styles.container}>
            <Navbar />
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Our Gallery</Text>

                <Text style={styles.introductionText}>
                     Këtu janë disa nga momentet tona të preferuara të kapura përmes kamerës sonë.
                    {'\n'}Klikoni çdo foto për ta parë atë në detaje.
                </Text>

                <View style={styles.linetest}></View>

                <View style={styles.galleryGrid}>
                    {imageArray.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleImageClick(index)}
                            style={[styles.imageWrapper,
                                isMobile ? styles.imageMobile : styles.imageDesktop,
                                isHovered ? styles.imageHovered : null,


                            ]}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={handleTouchStart}  // Add touch event for mobile
                            onTouchEnd={handleTouchEnd}
                        >
                            <Image
                                source={image}
                                style={[styles.image,
                                    isHovered ? styles.imageTilt : null,]}
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
        fontSize: 40,  // Adjust font size for mobile
        color: 'white',
        marginBottom: 40,  // Space between text and images
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
        border: '5px solid white', // Always white border
        transition: 'border 0.3s ease', // Smooth transition for the border

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
        transition: 'transform 0.5s ease',

    },
    imageHovered: {
        // Optional: Slight zoom on hover
        transform: 'scale(1.05)',
        border: '5px transparent #fff',  // Make the border white on hover
    },
    imageTilt: {
        transform: 'rotateX(20deg) rotateY(20deg)', // Tilt effect
        border: '5px solid #fff',  // Make the border white on hover

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
        backgroundColor: 'transparent',  // Keep transparent but slightly visible
        borderRadius: 5,
        zIndex: 2,
    },
    closeText: {
        fontSize: 50,
        color: 'black',
        fontWeight: 'bold',
        userSelect: 'none', // Disable text selection for web

        WebkitTextStroke: '3px white',  // Stroke the text
        WebkitTextFillColor: 'black',


    },
    navigationButtons: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        userSelect: 'none', // Disable text selection for web

    },
    navButton: {
        backgroundColor: 'transparent',
        padding: 30,
        borderRadius: 5,
        userSelect: 'none', // Disable text selection for web

    },
    navButtonText: {
        fontSize: 50,
        color: 'black',
        fontWeight: 'bold',
        userSelect: 'none', // Disable text selection for web
        WebkitTextStroke: '3px white',  // Stroke the text
        WebkitTextFillColor: 'black',  // Fill the text with black


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

    // Tutorial Modal
    tutorialModal: {
        padding: 100,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width:'80%', maxWidth:500,
        height:"auto",
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





});

export default Gallery;
