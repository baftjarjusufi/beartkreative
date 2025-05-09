import React, {useState, useEffect, useRef} from 'react';
import {View, Text,Linking, Image, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import Navbar from './Navbar';
import Footer from './Footer'; // Adjust the path if needed
import BusCard from './BusCard';

import { Dimensions } from 'react-native';





const Contact = () => {

    // Inside your component:
    const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < 768);

    const [errors, setErrors] = useState({});

    const handleCall = () => {
        Linking.openURL('tel:+38970751551');
    };


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(Dimensions.get('window').width < 768);
        };

        Dimensions.addEventListener('change', handleResize);

        return () => {
            Dimensions.removeEventListener('change', handleResize);
        };
    }, []);

    const validateForm = () => {
        const newErrors = {};


        if (!formData.name.trim()) {
            newErrors.name = "Ju lutem Shkruani Emrin tuaj ...";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Emri duhet të jetë të paktën 3 karaktere.! ";
        }

        if (!formData.surname.trim()) {
            newErrors.surname = "Ju lutem Shkruani Mbiemrin tuaj...";
        } else if (formData.surname.trim().length < 3) {
            newErrors.surname = "Mbiemri duhet të jetë të paktën 3 karaktere.!";
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email-i është i kërkuar..";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Adresë email-i e gabuar.";
        }

        // Subject validation: must be at least 4 characters long
        if (!formData.subject.trim()) {
            newErrors.subject = "Tema është e kërkuar.";
        } else if (formData.subject.trim().length < 4) {
            newErrors.subject = "Tema duhet të jetë të paktën 4 karaktere.";
        }
        // Message validation: must contain more than 4 words
        if (!formData.message.trim()) {
            newErrors.message = "Mesazhi nuk mund të jetë bosh.";
        } else {
            const wordCount = formData.message.trim().split(/\s+/).length;
            if (wordCount <= 4) {
                newErrors.message = "Mesazhi duhet të përmbajë më shumë se 4 fjalë.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };




    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(''); // Declare successMessage state here


    // Handle input changes
    const handleChange = (text, field) => {
        setFormData({
            ...formData,
            [field]: text,
        });
    };



    const handleSubmit = async () => {
        if (!validateForm()) {
            const errorFields = Object.keys(errors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xqaqlqla', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });



            if (response.ok) {
                setSuccessMessage('Mesazhi juaj është dërguar me sukses!'); // Set success message
                setFormData({
                    name: '',
                    surname: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                setErrors({});
                setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
            } else {
                Alert.alert('Error', 'Pati një problem me dërgimin e mesazhit tuaj.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Pati një problem me dërgimin e mesazhit tuaj.');
        } finally {
            setIsSubmitting(false);
        }
    };


    const scrollRef = useRef();
    const inputRefs = {
        name: useRef(),
        surname: useRef(),
        email: useRef(),
        subject: useRef(),
        message: useRef(),
    };


    return (
        <ScrollView style={styles.container}>
            <Navbar />

            <View style={styles.content}>
                {/* BusCard Component */}
                <View style={styles.busCardWrapper}>
                    <BusCard />
                </View>

                <Text style={styles.title}>Na Kontaktoni</Text>

                {/* Success Message */}
                {successMessage && (
                    <Text style={styles.successMessage}>{successMessage}</Text>
                )}

                <View style={[styles.form, isMobile ? styles.mobileForm : styles.pcForm]}>

                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    <TextInput
                        ref={inputRefs.name}

                        style={styles.input}
                        placeholder="Emri Juaj.."
                        placeholderTextColor="#ccc"
                        value={formData.name}
                        onChangeText={(text) => handleChange(text, 'name')}
                        accessibilityLabel="First name input"

                    />

                    {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
                    <TextInput
                        ref={inputRefs.surname}

                        style={styles.input}
                        placeholder="Mbiemri Juaj.."
                        placeholderTextColor="#ccc"
                        value={formData.surname}
                        onChangeText={(text) => handleChange(text, 'surname')}
                        accessibilityLabel="Last name input"

                    />

                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <TextInput
                        ref={inputRefs.email}

                        style={styles.input}
                        placeholder="Emaili Juaj.."
                        placeholderTextColor="#ccc"
                        value={formData.email}
                        onChangeText={(text) => handleChange(text, 'email')}
                        keyboardType="email-address"
                        accessibilityLabel="Email input"
                    />

                    {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
                    <TextInput
                        ref={inputRefs.subject}

                        style={styles.input}
                        placeholder="Tema"
                        placeholderTextColor="#ccc"
                        value={formData.subject}
                        onChangeText={(text) => handleChange(text, 'subject')}
                        accessibilityLabel="Subject input"
                    />

                    {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
                    <TextInput
                        ref={inputRefs.message}

                        style={styles.textArea}
                        placeholder="Mesazhi Juaj....."
                        placeholderTextColor="#ccc"
                        value={formData.message}
                        onChangeText={(text) => handleChange(text, 'message')}
                        multiline
                        accessibilityLabel="Message input"
                    />

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        style={[styles.button, isSubmitting && { opacity: 0.6 }]}
                        accessibilityLabel="Dërgo mesazh"


                    >
                        <Text style={styles.buttonText}>
                            {isSubmitting ? 'Sending...' : 'Dërgo mesazh'}
                        </Text>



                    </TouchableOpacity>

                    {/* Contact directly */}
                    <View style={styles.contactContainer}>
                        <Text style={styles.contactText}>Na kontakto direkt: </Text>
                        <TouchableOpacity onPress={handleCall} style={styles.phoneContainer}>
                            <Image
                                source={require('../assets/images/phone-icon.png')} // Update this path
                                style={styles.phoneIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                </View>





            <Footer />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Black background for the entire page
    },
    content: {
        marginTop: 80, // space for the navbar
        padding: 20,
        alignItems: 'center',
    },
    successMessage: {
        color: 'green',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    busCardWrapper: {
        width: '100%',
        maxWidth: 500, // Slightly smaller BusCard
        marginBottom: 60, // Added more space between BusCard and form
    },
    title: {
        fontSize: 32,
        color: '#fff', // White text to contrast with black background
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        maxWidth: 800, // Much larger form width on PC
        marginVertical: 40,
        backgroundColor: '#333', // Darkened the form's background
        padding: 40, // Increased padding
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 80, // Added space towards footer
    },
    input: {
        height: 60, // Much taller inputs
        borderColor: '#444', // Darker border color
        borderWidth: 1,
        marginBottom: 20, // Increased margin between inputs
        paddingLeft: 12,
        fontSize: 18, // Larger font size
        borderRadius: 8,
        color: '#fff', // White text for inputs
        backgroundColor: '#222', // Darker background for inputs
    },
    textArea: {
        height: 250, // Much taller text area
        borderColor: '#444', // Darker border color
        borderWidth: 1,
        marginBottom: 20, // Increased margin between text area and button
        paddingLeft: 12,
        fontSize: 18, // Larger font size
        borderRadius: 8,
        color: '#fff', // White text for the text area
        backgroundColor: '#222', // Darker background for the text area
        textAlignVertical: 'top',
    },


    mobileForm: {
        width: '100%',
        maxWidth: 800,
        marginBottom: 150, // Added space towards footer

    },

    pcForm: {
        width: '80%',
        height: '60%',
        alignSelf: 'center',
        maxWidth: '80%',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 4,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#0066CC',
        padding: 20,
        borderRadius: 8,
        marginVertical: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    // New styles for the contact section
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    contactText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    phoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },


    phoneIcon: {
        width: 60,
        height: 60,
        marginLeft: 10, // Adds some space between the number and the icon
    },


});


export default Contact;
