import React, { useState, useEffect } from 'react';
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

    const [height, setHeight] = useState(Dimensions.get('window').height)
    const [width, setWidth] = useState(Dimensions.get('window').width)


    // Change height and width when orientation changes
    useEffect(() => {
        const updateLayout = () => {
            setHeight(Dimensions.get('window').height)
            setWidth(Dimensions.get('window').width)
        };

        Dimensions.addEventListener('change', updateLayout)
    })


    if (props.selectedLetters.includes(props.ind)) {
        correctStyle = { backgroundColor: props.tileColor }
        correctText = { color: 'black' }
    }

    if (props.correctLetters.includes(props.ind)) {

        var color = props.colorLetters[props.ind];
        correctStyle = { backgroundColor: color }
        correctText = { color: 'black' }
    }

    // Landscape view
    if (height < 500) {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.startWordString(props.text);
                    props.selectLetters(props.ind);
                    if (props.selectedLetters.includes(props.ind)) {
                        props.removeLetters(props.ind);
                    }
                }}
                style={[styles.landscapeItem, correctStyle, { height: height / 14 }]}
            >
                <View>
                    <Text style={[styles.itemText, correctText]}>{props.text}</Text>
                </View>
            </TouchableOpacity >
        );
    } else {
        //Portrait view
        return (
            <TouchableOpacity
                onPress={() => {
                    props.startWordString(props.text);
                    props.selectLetters(props.ind);
                    if (props.selectedLetters.includes(props.ind)) {
                        props.removeLetters(props.ind);
                    }
                }}
                style={[styles.item, correctStyle, { height: width / 10 }]}
            >
                <View>
                    <Text style={[styles.itemText, correctText]}>{props.text}</Text>
                </View>
            </TouchableOpacity >
        );
    }
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
        borderRadius: 7,
    },
    selectedItem: {
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
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
        borderRadius: 7,
    }
});

export default Tile;