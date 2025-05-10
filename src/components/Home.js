import React, {useRef, useState, useEffect} from 'react';
import {Animated, Dimensions, Linking, Pressable, ScrollView, StyleSheet} from 'react-native';
import { Text } from 'react-native';
import {View, Image} from 'react-native';

import Footer from "./Footer";
import BackgroundPhoto from './BackgroundPhoto'
import {useSwipeable} from "react-swipeable";


const { width } = Dimensions.get("window");

const Home = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [scrollY, setScrollY] = useState(0);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const testimonialScrollViewRef = useRef(null);

    const openLink = (url ) =>{
      Linking.openURL(url);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(Dimensions.get('window').width);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleScroll = (event) => {
        setScrollY(event.nativeEvent.contentOffset.y);
    };
    const disableSave = (e) => {
        e.preventDefault();
    };

    const scrollToTestimonial = (index) => {
        if (testimonialScrollViewRef.current) {
            const scrollAmount = width * 0.8;
            testimonialScrollViewRef.current.scrollTo({
                x: index * scrollAmount,
                animated: true
            });
            setCurrentTestimonialIndex(index);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (currentTestimonialIndex < 4) {
                scrollToTestimonial(currentTestimonialIndex + 1);
            }
        },
        onSwipedRight: () => {
            if (currentTestimonialIndex > 0) {
                scrollToTestimonial(currentTestimonialIndex - 1);
            }
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' && currentTestimonialIndex > 0) {
                scrollToTestimonial(currentTestimonialIndex - 1);
            } else if (e.key === 'ArrowRight' && currentTestimonialIndex < 4) {
                scrollToTestimonial(currentTestimonialIndex + 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentTestimonialIndex]);

    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const iconSize = screenWidth > 600 ? 60 : 80;
    const [clicked, setClicked] = useState(false);


    useEffect(() => {
        const onChange = (e) => setScreenWidth(e.window.width);

        Dimensions.addEventListener('change', onChange);
        return () => Dimensions.removeEventListener('change', onChange);
    }, []);

    const handlePress = () => {
        if (!clicked) {
            setClicked(true);
        }
    };

    const [scaleInstagram] = useState(new Animated.Value(1));
    const [scaleFacebook] = useState(new Animated.Value(1));

    const handlePressInInstagram = () => {
        Animated.spring(scaleInstagram, {
            toValue: 1.5,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOutInstagram = () => {
        Animated.spring(scaleInstagram, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handlePressInFacebook = () => {
        Animated.spring(scaleFacebook, {
            toValue: 1.5,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOutFacebook = () => {
        Animated.spring(scaleFacebook, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const cardData = {
        wedding: {
            title: "Momentet tuaja të dasmës me ne ",
            mainText: "Dokumentojmë momentet më të rëndësishme të jetës suaj me klas dhe autenticitet. Çdo dasmë ka historinë e saj, dhe ne jemi këtu për ta ruajtur atë në mënyrën më të bukur.",
            detailText: "Paketat tona të fotografisë së dasmës përfshijnë mbulim të plotë gjatë gjithë ditës së dasmës, një foto sesion, fotografi digjitale me rezolucion të lartë dhe një galeri elegante. Fokusi ynë është si në momentet spontane, ashtu edhe në portretet artistike, për të treguar tërësisht historinë tuaj të dasmës. ✨👰🏻🤵🏻"
        },
        engagement: {
            title: "Momente para dasmës",
            mainText: "Fotografi të bukura para dasmës që festojnë historinë tuaj të dashurisë ❤️. Të përsosura për ftesat dhe njoftimet e dasmës 📩, realizuar në lokacione mahnitëse nëpër rajon 🌄.",
            detailText: "Foto Sesione prej dy orësh në lokacionin që do të zgjidhni. Përfshin ndërrim veshjesh, sugjerime për lokacione, redaktim profesional dhe një kombinim të fotografive të pozicionuara dhe natyrale. Ideal për njoftime dhe faqe dasmash. 💍✨"
        },
        premium: {
            title: "Paketat Premiume",
            mainText: "Nga ngjarjet më të ngrohta deri te festat e paharrueshme, paketat tona të personalizueshme përfshijnë mbulim të plotë të ditës, sesione angazhimi, albume luksoze, fotografi digjitale në cilësi të lartë dhe regjistrim video me dron dhe kamerë të lëvizshme.",
            detailText: "Shërbimi ynë premium përfshin orë mbulimi të pakufizuara, fotografi me dron, pamje të fotografive në të njëjtën ditë, një album luksoz  dhe të gjitha skedarët digjitalë me të drejta të plota për printim. Përvoja më e plotë në fotografi dasmash! 📸💝"
        }
    };

    const styles = StyleSheet.create({
        container: {
            userSelect: 'none',
            backgroundColor: "black",
        },
        bgContainer: {
            width: '100%',
            position: 'relative',
            zIndex: -1,
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
            userSelect: 'none',
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
                userSelect: 'none',
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
            userSelect: 'none',
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
            userSelect: 'none',
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
            userSelect: 'none',
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
            userSelect: 'none',
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
            userSelect: 'none',
        },
        activeCardTitle: {
            color: '#ffffff',
            fontSize: width > 768 ? 32 : 36,
            textAlign: 'center',
            userSelect: 'none',
        },
        activeCardText: {
            color: '#e0e0e0',
            fontSize: width > 768 ? 20 : 28,
            lineHeight: width > 768 ? 32 : 40,
            textAlign: 'center',
            maxWidth: '90%',
            userSelect: 'none',
        },
        regularText: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: 40,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 44,
            marginTop: 40,
            marginBottom: 40,
            textAlign: 'center',
            letterSpacing: 0.3,
            userSelect: 'none',
            flexWrap: 'wrap',
            maxWidth: '80%',
            alignSelf: 'center'
        },
        testimonialSection: {
            padding: windowWidth > 770 ? 100 : 40,
            backgroundColor: 'transparent',
            position: 'relative',
            marginVertical: windowWidth > 770 ? 10 : 5,
        },
        testimonialWrapper: {
            backgroundColor: '#ffffff',
            borderRadius: 50,
            padding: windowWidth > 770 ? 80 : 40,
            margin: windowWidth > 770 ? 10 : 5,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 20,
            },
            shadowOpacity: 0.2,
            shadowRadius: 40,
            elevation: 20,
            cursor: 'grab',
        },
        sectionTitle: {
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
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
            cursor: 'grab',
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
            cursor: 'grab',
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
            padding: width > 768 ? 100 : 60,
            gap: 60,
        },
        statItem: {
            alignItems: 'center',
        },
        statNumber: {
            fontSize: width > 768 ? 60 : 48,
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: 15,
        },
        statLabel: {
            fontSize: width > 768 ? 22 : 20,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
        },
        swipeMeContainer: {
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        swipeMeText: {
            textAlign: 'center',
            fontSize: width > 768 ? 32 : 36,
            color: '#333333',
            fontStyle: 'italic',
            marginLeft: 10,
        },
        iphoneIcon: {
            width: 40,
            height: 40,
            resizeMode: 'contain',
        },
        whyUsSection: {
            padding: windowWidth > 770 ? 100 : 60,
            backgroundColor: 'transparent',
            position: 'relative',
            marginVertical: windowWidth > 770 ? 10 : 5,
        },
        whyUsWrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 0,
            padding: windowWidth > 770 ? 80 : 50,
            margin: windowWidth > 770 ? 10 : 5,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderStyle: 'solid',
        },
        whyUsTitle: {
            fontSize: windowWidth > 768 ? 48 : 42,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: windowWidth > 768 ? 60 : 50,
            fontWeight: '700',
            letterSpacing: 1.2,
            fontFamily: 'Sansation, sans-serif',
        },
        bulletPointsContainer: {
            flexDirection: windowWidth > 770 ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: windowWidth > 770 ? 20 : 60,
            flexWrap: 'wrap',
            maxWidth: windowWidth > 770 ? 1200 : '100%',
            marginHorizontal: 'auto',
        },
        bulletPoint: {
            flexDirection:'column',
            alignItems: 'center',
            gap: windowWidth > 770 ? 15 : 25,
            padding: windowWidth > 770 ? 15 : 0,
            width: windowWidth > 770 ? '30%' : '100%',
            marginHorizontal: windowWidth > 770 ? 5 : 0,
            maxWidth: windowWidth > 770 ? 'auto' : '100%',
            minHeight: windowWidth > 770 ? 'auto' : 120,
            backgroundColor: 'transparent',
        },
        bulletPointIcon: {
            width: windowWidth > 770 ? 40 : 70,
            height: windowWidth > 770 ? 40 : 70,
            tintColor: '#ffffff',
            opacity: 0.8,
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
        },
        bulletPointLine: {
            width: windowWidth > 770 ? 40 : 70,
            height: 1,
            backgroundColor: '#ffffff',
            marginVertical: windowWidth > 770 ? 2 : 3,
        },
        bulletPointText: {
            fontSize: windowWidth > 770 ? 16 : 20,
            color: '#ffffff',
            textAlign: 'center',
            whiteSpace: 'normal',
            maxWidth: '100%',
            paddingHorizontal: windowWidth > 770 ? 0 : 15,
            lineHeight: windowWidth > 770 ? 'normal' : 28,
            display: 'flex',
            flexDirection: 'column',
            gap: windowWidth > 770 ? 0 : 8,
        },
        socialContainer: {
            alignItems: 'center',
            cursor: 'pointer',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 10,
            position: 'relative',
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 5,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(50px)',
            webkitBackdropFilter: 'blur(50px)',
        },
        iconContainer: {
            flexDirection: 'row',
            gap: 15,
            alignItems: 'center',
        },
        icon: {
            padding: 10,
            resizeMode: 'contain',
        },
        iconWrapper: {
            marginHorizontal: 10,
        },
        textContainerNa: {
            marginBottom: 15,
            justifyContent: 'center',
        },
        text: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            marginRight: 30,
            fontStyle: 'italic',
        },
        blurOverlay:{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.9)',
            zIndex: -1,
            filter: 'blur(100px)',
        },
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.bgContainer}>
                <BackgroundPhoto />
            </View>

            <Pressable
                onPress={handlePress}
                style={styles.socialContainer}
            >
                <View style={styles.blurOverlay} />

                <View style={styles.textContainerNa}>
                    <Text style={styles.text}>Na ndjek edhe në:</Text>
                </View>

                <View style={styles.iconContainer}>
                    <Animated.View
                        style={[styles.iconWrapper, { transform: [{ scale: scaleInstagram  }] }]}
                    >
                        <Pressable
                            onPressIn={handlePressInInstagram}
                            onPressOut={handlePressOutInstagram}
                            onPress={() => openLink('https://www.instagram.com/beartproduction10/?hl=en')}
                        >
                            <Image
                                source={require('../assets/images/Instagram-Icones.png')}
                                style={[styles.icon, { width: iconSize, height: iconSize }]}
                            />
                        </Pressable>
                    </Animated.View>

                    <Animated.View
                        style={[styles.iconWrapper, { transform: [{ scale: scaleFacebook }] }]}
                    >
                        <Pressable
                            onPressIn={handlePressInFacebook}
                            onPressOut={handlePressOutFacebook}
                            onPress={() => openLink('https://www.facebook.com/creativevideostudio10/')}
                        >
                            <Image
                                source={require('../assets/images/Facebook-Icones.png')}
                                style={[styles.icon, { width: iconSize, height: iconSize }]}
                            />
                        </Pressable>
                    </Animated.View>
                </View>
            </Pressable>

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

            <View style={styles.whyUsSection}>
                <View style={styles.whyUsWrapper}>
                    <Text style={styles.whyUsTitle}>Pse Beart Production?</Text>
                    <View style={styles.bulletPointsContainer}>

                        <View style={styles.bulletPoint}>
                            <Image
                                source={require('../assets/images/camera-icon.png')}
                                style={styles.bulletPointIcon}
                                resizeMode="contain"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                            <View style={styles.bulletPointLine} />
                            <Text style={styles.bulletPointText}>
                                {windowWidth > 768 ? "Xhirime Profesionale në dasma me Kamera 4K " :
                                    "Xhirime Profesionale në dasma me Kamera 4K "}
                            </Text>
                        </View>

                        <View style={styles.bulletPoint}>
                            <Image
                                source={require('../assets/images/quality-icon.png')}
                                style={styles.bulletPointIcon}
                                resizeMode="contain"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                            <View style={styles.bulletPointLine} />
                            <Text style={styles.bulletPointText}>
                                {windowWidth > 768 ? "Kualitet kinematografik dhe momente të paharrueshme" :
                                    "Kualitet kinematografik dhe momente të paharrueshme "}
                            </Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Image
                                source={require('../assets/images/communication-icon.png')}
                                style={styles.bulletPointIcon}
                                resizeMode="contain"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                            <View style={styles.bulletPointLine} />
                            <Text style={styles.bulletPointText}>
                                {windowWidth > 768 ? "Komunikim dhe shërbime profesionale Për çdo detaj të dasmës suaj" :
                                    "Komunikim dhe shërbime profesionalen Për çdo detaj të dasmës suaj"}
                            </Text>
                        </View>

                        <View style={styles.bulletPoint}>
                            <Image
                                source={require('../assets/images/consultation-icon.png')}
                                style={styles.bulletPointIcon}
                                resizeMode="contain"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                            <View style={styles.bulletPointLine} />
                            <Text style={styles.bulletPointText}>
                                {windowWidth > 768 ? "Konsultime të drejtpërdrejta me klientin Për planifikim të përsosur" :
                                    "Konsultime të drejtpërdrejta me klientin Për planifikim të përsosur"}
                            </Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Image
                                source={require('../assets/images/script-icon.png')}
                                style={styles.bulletPointIcon}
                                resizeMode="contain"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                            <View style={styles.bulletPointLine} />
                            <Text style={styles.bulletPointText}>
                                {windowWidth > 768 ? "Planprogram për tërë mbrëmjen për një ditë të përsosur" :
                                    "Planprogram për tërë mbrëmjen për një ditë të përsosur"}
                            </Text>
                        </View>
                        <View style={styles.bulletPoint}>
                            <Image
                                source={require('../assets/images/team-icon.png')}
                                style={styles.bulletPointIcon}
                                resizeMode="contain"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                            />
                            <View style={styles.bulletPointLine} />
                            <Text style={styles.bulletPointText}>
                                {windowWidth > 768 ? "Ekip të gjithanshëm me shumë vite përvojë" :
                                    "Ekip të gjithanshëm me shumë vite përvojë"}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.testimonialSection}>
                <View style={styles.testimonialWrapper}>
                    <Text style={styles.sectionTitle}>Client Love Stories</Text>

                    <View style={styles.swipeMeContainer}>
                        <Image source={{ uri: '/iphone.png'  }}
                               style={styles.iphoneIcon}
                               userSelect="none"
                               accessibilityLabel="Icon representing swiping "
                               onContextMenu={disableSave}
                               onTouchStart={disableSave}
                        />
                        <Text style={styles.swipeMeText}>Swipe Me</Text>
                    </View>

                    <View {...swipeHandlers}>
                        <ScrollView
                            ref={testimonialScrollViewRef}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.testimonialScrollContainer}
                            onScroll={(event) => {
                                const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width * 0.8));
                                if (newIndex !== currentTestimonialIndex) {
                                    setCurrentTestimonialIndex(newIndex);
                                }
                            }}
                            scrollEventThrottle={16}
                        >
                            <View style={styles.testimonial}>
                                <Text style={styles.testimonialText}>
                                    "Fotografitë tona të dasmës janë thjesht mahnitëse ✨ Çdo herë që i shohim, rikthehemi në ato momente magjike. Vëmendja ndaj detajeve dhe mënyra se si kapën emocionet tona ishte perfekte! 💝"
                                </Text>
                                <Text style={styles.testimonialAuthor}>- Sara & Agon ❤️</Text>
                                <Text style={styles.testimonialDate}>Summer Wedding 2023 🌞</Text>
                            </View>

                            <View style={styles.testimonial}>
                                <Text style={styles.testimonialText}>
                                    "Foto sesioni ishte një përvojë kaq argëtuese! 🌟 Na bënë të ndihemi kaq komod dhe natyralë. Fotografitë dolën mrekullisht dhe kapën perfekt historinë tonë të dashurisë 👰🤵"
                                </Text>
                                <Text style={styles.testimonialAuthor}>- Ermira & Arben 💕</Text>
                                <Text style={styles.testimonialDate}>Summer Wedding 2024 🌊</Text>
                            </View>

                            <View style={styles.testimonial}>
                                <Text style={styles.testimonialText}>
                                    "Nuk mund të jemi më të lumtur me zgjedhjen tonë të kompanisë✨ Ata shkuan përtej pritshmërive për të kapur çdo moment të veçantë të dasmës sonë në destinacion. Profesionistë të vërtetë! 💫"
                                </Text>
                                <Text style={styles.testimonialAuthor}>- Ardita & Alban 💝</Text>
                                <Text style={styles.testimonialDate}>Autumn wedding 2024🌺</Text>
                            </View>

                            <View style={styles.testimonial}>
                                <Text style={styles.testimonialText}>
                                    "Përftimi i momenteve të natyrshme mes nesh dhe të ftuarve tanë ishte fantastik ✨ Çdo herë që shohim albumin, ndiejmë gëzim të thellë 💖"

                                </Text>
                                <Text style={styles.testimonialAuthor}>- Era & Flamur 💕</Text>
                                <Text style={styles.testimonialDate}>Spring Wedding 2023 🌸</Text>
                            </View>

                            <View style={styles.testimonial}>
                                <Text style={styles.testimonialText}>
                                    "Jo vetëm që janë fotografë të talentuar, por janë edhe njerëz të mrekullueshëm për të punuar me ta  ✨  E bënë martesën tonë të thjeshtë të ndihet kaq speciale 💫"                            </Text>
                                <Text style={styles.testimonialAuthor}>- Laura & Donart 💝</Text>
                                <Text style={styles.testimonialDate}>Summer wedding 2023 🌸</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>

            <Text style={styles.regularText}>
                Krijojmë momente të paharrueshme. Rezervoni takimin tuaj sot..
            </Text>
            <View style={styles.statsSection}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>200+</Text>
                    <Text style={styles.statLabel}>Dasma të Paharrueshme</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>15</Text>
                    <Text style={styles.statLabel}>Vite Eksperiencë</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>20+</Text>
                    <Text style={styles.statLabel}>Lokacione të Besuara</Text>
                </View>
            </View>
            <Footer />
        </ScrollView>
    );
};

export default Home;