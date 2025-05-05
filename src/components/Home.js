import React, {useRef, useState, useEffect} from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet} from 'react-native';
import { Text } from 'react-native';
import {View, SafeAreaView, Image} from 'react-native';

import Footer from "./Footer";
import BackgroundPhoto from './BackgroundPhoto'
import {useSwipeable} from "react-swipeable";

const { width } = Dimensions.get("window");

const Home = () => {
    const [activeCard, setActiveCard] = useState(null);
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = (event) => {
        setScrollY(event.nativeEvent.contentOffset.y);
    };
    const disableSave = (e) => {
        e.preventDefault();
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
            userSelect: 'none', // For web environments

            // minHeight: "100vh",
            backgroundColor: "black",
            // position: 'relative'
        },

        bgContainer: {
            width: '100%',
            position: 'relative',
            zIndex: -1, // Ensure background is behind navbar and other content
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
            userSelect: 'none', // For web environments

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
                userSelect: 'none', // For web environments

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
            userSelect: 'none', // For web environments

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
            userSelect: 'none', // For web environments

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
            userSelect: 'none', // For web environments

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
            userSelect: 'none', // For web environments

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
            userSelect: 'none', // For web environments

        },
        activeCardTitle: {
            color: '#ffffff',
            fontSize: width > 768 ? 32 : 36,
            textAlign: 'center',
            userSelect: 'none', // For web environments

        },
        activeCardText: {
            color: '#e0e0e0',
            fontSize: width > 768 ? 20 : 28,
            lineHeight: width > 768 ? 32 : 40,
            textAlign: 'center',
            maxWidth: '90%',
            userSelect: 'none', // For web environments

        },
        regularText: {
            fontSize: 40,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 44,
            marginTop: 40,
            marginBottom: 40,
            textAlign: 'center',
            letterSpacing: 0.3,
            userSelect: 'none', // For web environments
            flexWrap: 'wrap',
            maxWidth: '80%',
            alignSelf: 'center'

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


            <View style={styles.bgContainer}>
                <BackgroundPhoto />
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
                        <Image source={{ uri: '/iphone.png'  }}
                               style={styles.iphoneIcon}
                               userSelect="none"
                               accessibilityLabel="Icon representing swiping "
                               onContextMenu={disableSave} // disables right-click on image
                               onTouchStart={disableSave} // disables long touch on mobile


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
                                "Jo vetëm që janë fotografë të talentuar, por janë edhe njerëz të mrekullueshëm për të punuar me ta ✨ E bënë martesën tonë të thjeshtë të ndihet kaq speciale 💫"                            </Text>
                            <Text style={styles.testimonialAuthor}>- Laura & Donart 💝</Text>
                            <Text style={styles.testimonialDate}>Summer wedding 2023 🌸</Text>
                        </View>
                    </ScrollView>
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