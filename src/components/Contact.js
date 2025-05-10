import React, {useState, useEffect, useRef} from 'react';
import {View, Text,Linking, Image, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity} from 'react-native';
import Navbar from './Navbar';
import Footer from './Footer';
import BusCard from './BusCard';

import { Dimensions } from 'react-native';


const Contact = () => {

    // Inside your component:
    const [isMobile, setIsMobile] = useState(Dimensions.get('window').width < 768);

    const [errors, setErrors] = useState({});

    const handleCall = () => {
        Linking.openURL('tel:+38970751551');
    };

    const [focusedField, setFocusedField] = useState('');

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

        if (!formData.subject.trim()) {
            newErrors.subject = "Tema është e kërkuar.";
        } else if (formData.subject.trim().length < 4) {
            newErrors.subject = "Tema duhet të jetë të paktën 4 karaktere.";
        }
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
    const [successMessage, setSuccessMessage] = useState('');


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
                setSuccessMessage('Mesazhi juaj është dërguar me sukses!');
                setFormData({
                    name: '',
                    surname: '',
                    email: '',
                    subject: '',
                    message: '',
                });
                setErrors({});
                setTimeout(() => setSuccessMessage(''), 3000);
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

                {successMessage && (
                    <Text style={styles.successMessage}>{successMessage}</Text>
                )}

                <View style={[styles.form, isMobile ? styles.mobileForm : styles.pcForm]}>

                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    <TextInput
                        ref={inputRefs.name}
                        style={[
                            styles.input,
                            focusedField === 'name' && styles.focusedInput
                        ]}
                        placeholder="Emri Juaj.."
                        placeholderTextColor="#ccc"
                        underlineColorAndroid="transparent"
                        value={formData.name}
                        onChangeText={(text) => handleChange(text, 'name')}
                        accessibilityLabel="First name input"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                    />

                    {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
                    <TextInput
                        ref={inputRefs.surname}
                        style={[
                            styles.input,
                            focusedField === 'surname' && styles.focusedInput
                        ]}
                        placeholder="Mbiemri Juaj.."
                        placeholderTextColor="#ccc"
                        underlineColorAndroid="transparent"
                        value={formData.surname}
                        onChangeText={(text) => handleChange(text, 'surname')}
                        accessibilityLabel="Last name input"
                        onFocus={() => setFocusedField('surname')}
                        onBlur={() => setFocusedField('')}
                    />

                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <TextInput
                        ref={inputRefs.email}
                        style={[
                            styles.input,
                            focusedField === 'email' && styles.focusedInput
                        ]}
                        placeholder="Emaili Juaj.."
                        placeholderTextColor="#ccc"
                        underlineColorAndroid="transparent"
                        value={formData.email}
                        onChangeText={(text) => handleChange(text, 'email')}
                        keyboardType="email-address"
                        accessibilityLabel="Email input"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                    />

                    {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
                    <TextInput
                        ref={inputRefs.subject}
                        style={[
                            styles.input,
                            focusedField === 'subject' && styles.focusedInput
                        ]}
                        placeholder="Tema"
                        placeholderTextColor="#ccc"
                        underlineColorAndroid="transparent"
                        value={formData.subject}
                        onChangeText={(text) => handleChange(text, 'subject')}
                        accessibilityLabel="Subject input"
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField('')}
                    />

                    {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
                    <TextInput
                        ref={inputRefs.message}
                        style={[
                            styles.textArea,
                            focusedField === 'message' && styles.focusedInput
                        ]}
                        placeholder="Mesazhi Juaj....."
                        placeholderTextColor="#ccc"
                        underlineColorAndroid="transparent"
                        value={formData.message}
                        onChangeText={(text) => handleChange(text, 'message')}
                        multiline
                        accessibilityLabel="Message input"
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                    />

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        style={[styles.buttonWrapper, isSubmitting && { opacity: 0.6 }]}
                        accessibilityLabel="Dërgo mesazh"
                    >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {isSubmitting ? 'Sending...' : 'Dërgo mesazh'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.contactContainer}>
                        <Text style={styles.contactText}>Na kontakto direkt: </Text>
                        <TouchableOpacity onPress={handleCall} style={styles.phoneContainer}>
                            <Image
                                source={require('../assets/images/phone-icon.png')}
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
        backgroundColor: 'black',
    },
    content: {
        marginTop: 80,
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
        maxWidth: 500,
        marginBottom: 60,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        maxWidth: 800,
        marginVertical: 40,
        backgroundColor: '#333',
        padding: 40,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 80,
    },
    input: {
        height: 80,
        borderColor: '#444',
        borderWidth: 1,
        marginBottom: 30,
        paddingLeft: 12,
        fontSize: 25,
        borderRadius: 8,
        color: '#fff',
        backgroundColor: '#222',

    },
    textArea: {
        height: 250,
        borderColor: '#444',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 12,
        fontSize: 25,
        borderRadius: 8,
        color: '#fff',
        backgroundColor: '#222',
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    focusedInput: {
        borderColor: '#fff',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 10,
    },
    mobileForm: {
        width: '100%',
        maxWidth: 800,
        marginBottom: 15,
        padding: 50,
        borderRadius: 30,

    },
    pcForm: {
        width: '80%',
        height: '60%',
        alignSelf: 'center',
        maxWidth: '80%',
        borderRadius: 30,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 4,
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 8,
    },
    buttonWrapper: {
        width: '100%',
        marginVertical: 20,
        borderRadius: 8,
        overflow: 'hidden',
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(to right, #FF4136, #00BCD4)',
        transition: 'border-color 0.3s ease',
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
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
        marginLeft: 10,
    },
});
export default Contact;
