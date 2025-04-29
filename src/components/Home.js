import React, { useState } from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { Text } from 'react-native';
import {View, SafeAreaView, Image} from 'react-native';

import { useEffect } from 'react';

import Spline from "@splinetool/react-spline";








import Navbar from "./Navbar";// Import BlackBackground
import Footer from "./Footer";
import SceneSpline from './SceneSpline'



const { width } = Dimensions.get("window");




const Home = () => {
    const [activeCard, setActiveCard] = useState(null);


    const cardData = {
        wedding: {
            title: "Wedding Stories at us",
            mainText: "Capturing your special moments with elegance and authenticity. Each wedding tells a unique story, and we're here to preserve those precious memories for generations to come.",
            detailText: "Our wedding photography packages include full-day coverage, a second photographer, high-resolution digital files, and a beautiful online gallery. We focus on both candid moments and artistic portraits to tell your complete wedding story. ✨💑"
        },
        engagement: {
            title: "Engagement Sessions",
            mainText: "Beautiful pre-wedding photos that celebrate your love story. Perfect for save-the-dates and wedding invitations, set in stunning locations across the region.",
            detailText: "Two-hour engagement sessions at your chosen location. Includes outfit changes, location suggestions, professional editing, and a mix of posed and natural shots. Perfect for announcements and wedding websites! 💍✨"
        },
        premium: {
            title: "Premium Packages",
            mainText: "From intimate ceremonies to grand celebrations, our customizable packages include full-day coverage, engagement sessions, luxury albums, and high-resolution digital files.",
            detailText: "Our premium service includes unlimited coverage hours, drone photography, same-day photo previews, luxury leather album, and all digital files with full printing rights. The ultimate wedding photography experience! 📸💝"
        }
    };


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
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            gap: width > 768 ? 50 : 40,
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
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: width > 768 ? 30 : 20,
            margin: width > 768 ? 10 : 15,
            width: width > 768 ? 450 : '90%',
            minHeight: width > 768 ? 500 : 400,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            cursor: 'pointer',
            transition: 'all 0.4s ease-in-out',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            position: 'relative',
        },
        cardArrow: {
            position: 'absolute',
            top: 20,
            right: 20,
            fontSize: width > 768 ? 42 : 48,
            opacity: 0.6,
            transform: [{rotate: '45deg'}],
            transition: 'all 0.4s ease-in-out',
            zIndex: 2,
            flexDirection: 'row',
            alignItems: 'center',
        },
        clickMeText: {
            position: 'absolute',
            top: 35,
            right: 90,
            fontSize: width > 768 ? 16 : 18,
            color: '#666666',
            fontStyle: 'italic',
            opacity: 0.8,
            transition: 'all 0.4s ease-in-out',
        },
        activeCardArrow: {
            transform: [{rotate: '225deg'}],
            opacity: 1,
        },
        activeCard: {
            backgroundColor: '#2c2c2c',
            transform: [{scale: 1.03}],
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 8,
        },
        cardTitle: {
            fontSize: width > 768 ? 32 : 32,
            fontWeight: '700',
            marginBottom: width > 768 ? 25 : 20,
            color: '#333333',
            letterSpacing: 0.5,
            textAlign: 'center',
            width: '100%',
            transition: 'color 0.4s ease-in-out',
        },
        cardText: {
            fontSize: width > 768 ? 20 : 24,
            color: '#666666',
            lineHeight: width > 768 ? 32 : 36,
            letterSpacing: 0.3,
            textAlign: 'center',
            transition: 'all 0.4s ease-in-out',
            paddingHorizontal: width > 768 ? 0 : 10,
            width: '100%',
            maxWidth: '90%',
        },
        activeCardTitle: {
            color: '#ffffff',
            fontSize: width > 768 ? 32 : 36,
            textAlign: 'center',
        },
        activeCardText: {
            color: '#e0e0e0',
            fontSize: width > 768 ? 20 : 28,
            lineHeight: width > 768 ? 32 : 40,
            textAlign: 'center',
            maxWidth: '90%',
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
        swipeMeContainer: {
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            flexDirection: 'row', // <-- image and text side by side
            justifyContent: 'center',
            alignItems: 'center',

        },

        swipeMeText: {
            textAlign: 'center',
            fontSize: width > 768 ? 32 : 36,
            color: '#333333',
            fontStyle: 'italic',
            marginLeft: 10, // space between image and text

        },

        iphoneIcon: {
            width: 40, // or whatever size you want
            height: 40,
            resizeMode: 'contain',
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
                <View
                    style={[
                        styles.card,
                        activeCard === 'wedding' && styles.activeCard
                    ]}
                    onClick={() => setActiveCard(activeCard === 'wedding' ? null : 'wedding')}
                >
                    <Text style={[
                        styles.cardArrow,
                        activeCard === 'wedding' && styles.activeCardArrow
                    ]}>↗️</Text>
                    <Text style={[
                        styles.clickMeText,
                        activeCard === 'wedding' && styles.activeClickMeText
                    ]}>click me</Text>
                    <Text style={[
                        styles.cardTitle,
                        activeCard === 'wedding' && styles.activeCardTitle
                    ]}>{cardData.wedding.title}</Text>
                    <Text style={[
                        styles.cardText,
                        activeCard === 'wedding' && styles.activeCardText
                    ]}>
                        {activeCard === 'wedding' ? cardData.wedding.detailText : cardData.wedding.mainText}
                    </Text>
                </View>

                <View
                    style={[
                        styles.card,
                        activeCard === 'engagement' && styles.activeCard
                    ]}
                    onClick={() => setActiveCard(activeCard === 'engagement' ? null : 'engagement')}
                >
                    <Text style={[
                        styles.cardArrow,
                        activeCard === 'engagement' && styles.activeCardArrow
                    ]}>↗️</Text>
                    <Text style={[
                        styles.clickMeText,
                        activeCard === 'engagement' && styles.activeClickMeText
                    ]}>click me</Text>
                    <Text style={[
                        styles.cardTitle,
                        activeCard === 'engagement' && styles.activeCardTitle
                    ]}>{cardData.engagement.title}</Text>
                    <Text style={[
                        styles.cardText,
                        activeCard === 'engagement' && styles.activeCardText
                    ]}>
                        {activeCard === 'engagement' ? cardData.engagement.detailText : cardData.engagement.mainText}
                    </Text>
                </View>

                <View
                    style={[
                        styles.card,
                        activeCard === 'premium' && styles.activeCard
                    ]}
                    onClick={() => setActiveCard(activeCard === 'premium' ? null : 'premium')}
                >
                    <Text style={[
                        styles.cardArrow,
                        activeCard === 'premium' && styles.activeCardArrow
                    ]}>↗️</Text>
                    <Text style={[
                        styles.clickMeText,
                        activeCard === 'premium' && styles.activeClickMeText
                    ]}>click me</Text>
                    <Text style={[
                        styles.cardTitle,
                        activeCard === 'premium' && styles.activeCardTitle
                    ]}>{cardData.premium.title}</Text>
                    <Text style={[
                        styles.cardText,
                        activeCard === 'premium' && styles.activeCardText
                    ]}>
                        {activeCard === 'premium' ? cardData.premium.detailText : cardData.premium.mainText}
                    </Text>
                </View>
            </View>

            <View style={styles.testimonialSection}>
                <View style={styles.testimonialWrapper}>
                    <Text style={styles.sectionTitle}>Client Love Stories</Text>

                    <View style={styles.swipeMeContainer}>
                        <Image source={{ uri: '/iphone.png' }}
                               style={styles.iphoneIcon}
                               accessibilityLabel="Icon representing swiping "
                        />
                        <Text style={styles.swipeMeText}>Swipe Me</Text>
                    </View>



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

export default Home;