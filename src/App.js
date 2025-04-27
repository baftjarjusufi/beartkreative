import React from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { Text } from 'react-native';

import { useEffect } from 'react';

import Spline from "@splinetool/react-spline";


import SceneSpline from "./components/SceneSpline"






import Navbar from "./components/Navbar";// Import BlackBackground
import Footer from "./components/Footer";

import {View, SafeAreaView} from 'react-native';





const {width,height} = Dimensions.get("window");


const App = () => {
    const styles = StyleSheet.create({
        container: {
            minHeight: "100vh",
            backgroundColor: "black",
            position: 'relative'
        },
        navbar: {
            height: 80,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50
        },
        splineContainer: {
            width: '100%',
            marginTop: 80, // Match navbar height
            backgroundColor: 'black'
        },
        cardContainer: {
            padding: width > 768 ? 40 : 20,
            flexDirection: width > 768 ? 'row' : 'column',
            flexWrap: width > 768 ? 'wrap' : 'nowrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: 'transparent',
            gap: width > 768 ? 50 : 60,
            paddingVertical: width > 768 ? 100 : 80,
            position: 'relative',
            zIndex: 1,
            maxWidth: width > 768 ? 1600 : '100%',
            marginHorizontal: 'auto',
        },
        cardBackground: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(15px)',
            zIndex: -1,
        },
        card: {
            backgroundColor: '#f5f5f5',
            borderRadius: width > 768 ? 30 : 30,
            padding: width > 768 ? 50 : 45,
            margin: width > 768 ? 0 : 20,
            width: width > 768 ? 450 : '95%',
            minHeight: width > 768 ? 500 : 400,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 15,
            },
            shadowOpacity: 0.5,
            shadowRadius: 30,
            elevation: 20,
            transform: [{scale: 1}],
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            ':hover': {
                transform: [{scale: 1.05}],
                backgroundColor: '#ffffff',
            }
        },
        cardTitle: {
            fontSize: width > 768 ? 32 : 36,
            fontWeight: '700',
            marginBottom: width > 768 ? 25 : 30,
            color: '#333333',
            letterSpacing: 0.5,
            textAlign: width > 768 ? 'left' : 'center',
        },
        cardText: {
            fontSize: width > 768 ? 20 : 24,
            color: '#666666',
            lineHeight: width > 768 ? 32 : 36,
            letterSpacing: 0.3,
            textAlign: width > 768 ? 'left' : 'center',
        },
        regularText: {
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 24,
            marginTop: 40,
            marginBottom: 40,
            textAlign: 'center',
            letterSpacing: 0.3,
        },
        testimonialSection: {
            padding: width > 768 ? 100 : 40,
            backgroundColor: 'transparent',
            position: 'relative',
            marginVertical: 100,
        },
        testimonialWrapper: {
            backgroundColor: '#ffffff',
            borderRadius: 50,
            padding: width > 768 ? 80 : 40,
            margin: width > 768 ? 40 : 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 20,
            },
            shadowOpacity: 0.2,
            shadowRadius: 40,
            elevation: 20,
        },
        sectionTitle: {
            fontSize: width > 768 ? 48 : 36,
            color: '#333333',
            textAlign: 'center',
            marginBottom: width > 768 ? 60 : 80,
            fontWeight: '700',
            letterSpacing: 1.2,
        },
        testimonialScrollContainer: {
            paddingHorizontal: width > 768 ? 80 : 40,
            paddingBottom: 40,
            gap: width > 768 ? 60 : 40,
        },
        testimonial: {
            backgroundColor: '#2a2a2a',
            borderRadius: 40,
            padding: width > 768 ? 60 : 45,
            width: width > 768 ? '70vw' : '75vw',
            marginRight: width > 768 ? 60 : 40,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            minHeight: width > 768 ? 400 : 825,
            height: width > 768 ? 'auto' : 825,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 15,
            },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            elevation: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        testimonialText: {
            fontSize: width > 768 ? 28 : 24,
            color: '#ffffff',
            fontStyle: 'italic',
            lineHeight: width > 768 ? 46 : 38,
            textAlign: 'center',
            marginBottom: width > 768 ? 60 : 50,
            letterSpacing: 0.8,
            maxWidth: width > 768 ? '85%' : '90%',
            alignSelf: 'center',
        },
        testimonialAuthor: {
            fontSize: width > 768 ? 24 : 18,
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '600',
            marginBottom: width > 768 ? 12 : 8,
            letterSpacing: 1,
        },
        testimonialDate: {
            fontSize: width > 768 ? 18 : 14,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            letterSpacing: 0.5,
        },
        statsSection: {
            flexDirection: width > 768 ? 'row' : 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: width > 768 ? 80 : 40,
            gap: 40,
        },
        statItem: {
            alignItems: 'center',
        },
        statNumber: {
            fontSize: width > 768 ? 48 : 36,
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: 10,
        },
        statLabel: {
            fontSize: width > 768 ? 18 : 16,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
        },
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.navbar}>
                <Navbar />
            </View>

            <View style={styles.splineContainer}>
                <SceneSpline style={{ width: '100%', height: '100%' }} />
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.cardBackground} />
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Wedding Stories</Text>
                    <Text style={styles.cardText}>
                        Capturing your special moments with elegance and authenticity. Each wedding tells a unique story, and we're here to preserve those precious memories for generations to come.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Engagement Sessions</Text>
                    <Text style={styles.cardText}>
                        Beautiful pre-wedding photoshoots that celebrate your love story. Perfect for save-the-dates and wedding invitations, set in stunning locations across the region.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Premium Packages</Text>
                    <Text style={styles.cardText}>
                        From intimate ceremonies to grand celebrations, our customizable packages include full-day coverage, engagement sessions, luxury albums, and high-resolution digital files.
                    </Text>
                </View>
            </View>

            <View style={styles.testimonialSection}>
                <View style={styles.testimonialWrapper}>
                    <Text style={styles.sectionTitle}>Client Love Stories</Text>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.testimonialScrollContainer}
                    >
                        <View style={styles.testimonial}>
                            <Text style={styles.testimonialText}>
                                "Our wedding photos are absolutely breathtaking ✨ Every time we look at them, we relive those magical moments all over again. The attention to detail and the way they captured our emotions was perfect! 💝"
                            </Text>
                            <Text style={styles.testimonialAuthor}>- Sarah & James ❤️</Text>
                            <Text style={styles.testimonialDate}>Summer Wedding 2023 🌞</Text>
                        </View>

                        <View style={styles.testimonial}>
                            <Text style={styles.testimonialText}>
                                "The engagement shoot was such a fun experience! 🌟 They made us feel so comfortable and natural. The photos turned out amazing and perfectly captured our love story 💑"
                            </Text>
                            <Text style={styles.testimonialAuthor}>- Emily & Michael 💕</Text>
                            <Text style={styles.testimonialDate}>Beach Engagement 🌊</Text>
                        </View>

                        <View style={styles.testimonial}>
                            <Text style={styles.testimonialText}>
                                "We couldn't be happier with our choice of photographer ✨ They went above and beyond to capture every special moment of our destination wedding. True professionals! 💫"
                            </Text>
                            <Text style={styles.testimonialAuthor}>- Sofia & Alexander 💝</Text>
                            <Text style={styles.testimonialDate}>Destination Wedding in Italy 🌺</Text>
                        </View>

                        <View style={styles.testimonial}>
                            <Text style={styles.testimonialText}>
                                "The way they captured the candid moments between us and our guests was incredible ✨ Looking through our album brings tears of joy every time 💖"
                            </Text>
                            <Text style={styles.testimonialAuthor}>- Rachel & Thomas 💕</Text>
                            <Text style={styles.testimonialDate}>Spring Garden Wedding 🌸</Text>
                        </View>

                        <View style={styles.testimonial}>
                            <Text style={styles.testimonialText}>
                                "Not only are they talented photographers, but they're also amazing people to work with ✨ They made our elopement feel so special and intimate 💫"
                            </Text>
                            <Text style={styles.testimonialAuthor}>- Laura & David 💝</Text>
                            <Text style={styles.testimonialDate}>Mountain Elopement 🏔️</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.statsSection}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>200+</Text>
                    <Text style={styles.statLabel}>Weddings Captured</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>15</Text>
                    <Text style={styles.statLabel}>Years Experience</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>50+</Text>
                    <Text style={styles.statLabel}>Venues Partnered</Text>
                </View>
            </View>

            <Text style={styles.regularText}>
                Let's create timeless memories together. Book your consultation today.
            </Text>
            
            <Footer />
        </ScrollView>
    );
};

export default App;