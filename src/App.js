import React from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet} from 'react-native';

import Navbar from "./components/Navbar";// Import BlackBackground
import {View, SafeAreaView} from 'react-native';



const {width,height} = Dimensions.get("window");


const App = () => {


    const styles = StyleSheet.create({
        container: {
            minHeight: "100vh"
            // backgroundColor:"black"



        },
    });


    return (

        <ScrollView contentContainerStyle={styles.container}>

            <SafeAreaView style={{height: "100%",width:"100%", backgroundColor:"orange"}}> AAAAAAAAAAAAAAAAAAAAAAA</SafeAreaView>


        </ScrollView>

    );



};

export default App;
