import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import HeroSection from './components/HeroSection';



const App = () => (
    <View style={styles.container}>
        <HeroSection />
        <Text>Hello</Text>
    </View>


);
console.log('App loaded'); // Check the browser console

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
});

export default App;