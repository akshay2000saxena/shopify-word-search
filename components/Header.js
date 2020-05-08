import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Header = props => {

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 80,
        width: '100%',
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 36
    },
    headerTitle: {
        color: 'black',
        fontSize: 22,
    }
});

export default Header;