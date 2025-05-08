import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BusCard = () => {
    const cardRef = useRef(null);
    const [angle, setAngle] = useState(0);  // Starts at 0 (front)
    const [isInView, setIsInView] = useState(false);
    const [rotationInterval, setRotationInterval] = useState(null);

    // Track when the card enters or leaves the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the card is visible
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    // Rotate the card continuously back and forth when in view
    useEffect(() => {
        if (isInView && !rotationInterval) {
            // Start rotating the card back and forth every 30ms
            const interval = setInterval(() => {
                setAngle((prevAngle) => {
                    // This will continuously flip between 0 and 180
                    return prevAngle === 0 ? 180 : 0;
                });
            }, 1000); // Faster flip (1 second for each full flip)
            setRotationInterval(interval);
        }

        // Stop rotating when out of view
        if (!isInView && rotationInterval) {
            clearInterval(rotationInterval);
            setRotationInterval(null);
        }

        // Cleanup on component unmount
        return () => {
            if (rotationInterval) {
                clearInterval(rotationInterval);
            }
        };
    }, [isInView, rotationInterval]);

    return (
        <View ref={cardRef} style={styles.cardWrapper}>
            <View
                style={[
                    styles.card,
                    {
                        transform: [{ rotateY: `${angle}deg` }], // Rotate continuously between 0 and 180 degrees
                    },
                ]}
            >
                <View style={[styles.cardFace, styles.front]}>
                    <Image
                        source={require('../assets/images/Front-Card.jpg')} // Replace with your image path
                        style={styles.cardImage}
                    />
                </View>
                <View style={[styles.cardFace, styles.back]}>
                    <Image
                        source={require('../assets/images/Back-Card.jpg')} // Replace with your image path
                        style={styles.cardImage}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        width: 500,
        height: 300,
        margin: 'auto',
        perspective: 2500, // 3D effect
    },
    card: {
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s ease-in-out', // Flip animation speed
    },
    cardFace: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5, // Border width for both sides
    },
    front: {
        backgroundColor: '#fff',
        zIndex: 2,
        borderColor: '#fff', // White border for the front
    },
    back: {
        backgroundColor: '#ddd',
        transform: [{ rotateY: '180deg' }],
        borderColor: '#000', // Black border for the back
    },
    cardImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});

export default BusCard;
