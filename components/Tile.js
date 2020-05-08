import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';



const Tile = props => {

    var correctStyle = {}
    var correctText = {}

    if (props.selectedLetters.includes(props.ind)) {
        correctStyle = { backgroundColor: 'yellow' }
        correctText = { color: 'black' }
    }

    if (props.correctLetters.includes(props.ind)) {
        correctStyle = { backgroundColor: 'yellow' }
        correctText = { color: 'black' }
    }


    return (
        <TouchableOpacity
            onPress={() => {
                props.startWordString(props.text);
                props.selectLetters(props.ind);
                if (props.selectedLetters.includes(props.ind)) {
                    props.removeLetters(props.ind);
                }
            }}
            style={[styles.item, correctStyle]}
        >
            <View>
                <Text style={[styles.itemText, correctText]}>{props.text}</Text>
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    itemText: {
        color: 'white',
    },
    item: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 10,
        borderRadius: 7,
    },
    selectedItem: {
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 10,
        borderRadius: 7,
    },
    selectedItemText: {
        color: 'black'
    },
    landscapeItem: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').height / 14,
        borderRadius: 7,
    }
});

export default Tile;