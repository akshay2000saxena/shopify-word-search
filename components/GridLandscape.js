import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Button
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import TileLandscape from '../components/TileLandscape'
import List from '../components/List'
import Header from '../components/Header'
import GameOverScreen from '../screens/GameOverScreen'

import { data } from '../data/data'
import { correct } from '../data/data'


var correctStyle = {}

var textColor = {}
var words = correct.map(v => v.toLowerCase());


const GridLandscape = props => {

    const numColumns = 10;
    const [string, updatedString] = useState("");
    const [selectedLetters, setSelectedLetters] = useState([])
    const [correctedLetters, setCorrectedLetters] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])

    if (words.includes(string.toLowerCase())) {
        setCorrectAnswers(correctAnswers => [...correctAnswers, string.toLowerCase()])
        setCorrectedLetters(correctedLetters => [...correctedLetters, ...selectedLetters])
        updatedString("");
        console.log(correctAnswers);
    }

    const landscapeItem = {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').height / 14,
        borderRadius: 7,
    }

    return (
        <View style={styles.landscape}>
            {correct.length !== correctAnswers.length ?
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={styles.header}>
                        <Header title="Word Search" />
                        <View style={styles.iconHeader}>
                            <Ionicons
                                name="ios-refresh"
                                size={32}
                                color="black"
                                onPress={() => {
                                    updatedString("");
                                    setSelectedLetters([]);
                                    setCorrectedLetters([])
                                    setCorrectAnswers([])
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.landscapeContainer}>
                            <FlatList
                                data={data}
                                renderItem={({ item }) =>
                                    <TileLandscape
                                        text={item.value}
                                        ind={item.key}

                                        startWordString={item => {
                                            console.log(item)
                                            if (selectedLetters.includes(item)) {
                                                updatedString(string.replace(item, ""))
                                            } else {
                                                updatedString(string.concat(item))
                                            }
                                        }}
                                        selectLetters={item => {
                                            setSelectedLetters(selectedLetters => [...selectedLetters, item])
                                            console.log(selectedLetters)
                                        }}
                                        removeLetters={item => {
                                            var newArr = selectedLetters.filter(
                                                j => j !== item
                                            );
                                            setSelectedLetters(newArr);
                                        }}

                                        selectedLetters={selectedLetters}
                                        correctLetters={correctedLetters}
                                        style={landscapeItem}
                                    />}
                                numColumns={numColumns}
                                keyExtractor={item => item.key}
                            />
                        </View>
                        <View style={{ marginHorizontal: 15 }}>
                            <View style={styles.textButtonContainer}>
                                <View>
                                    <Text style={{ fontSize: 18 }}>Word: {string}</Text>
                                </View>

                                <View>
                                    <Ionicons
                                        name="ios-close-circle"
                                        size={25}
                                        color="black"
                                        onPress={() => {
                                            updatedString("");
                                            setSelectedLetters([]);
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={styles.list}>
                                <List
                                    correctAnswers={correctAnswers}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                :
                <GameOverScreen
                    updatedString={updatedString}
                    setSelectedLetters={setSelectedLetters}
                    setCorrectedLetters={setCorrectedLetters}
                    setCorrectAnswers={setCorrectAnswers}
                />}

        </View>

    );
};

const styles = StyleSheet.create({
    con: {
        flex: 1,
        margin: 20,
    },
    landscape: {
        flex: 1,
        marginHorizontal: 20,
        flexDirection: 'column'
    },
    container: {
        height: Dimensions.get('window').height / 1.56,
        backgroundColor: 'white',
        borderRadius: 7
    },
    landscapeContainer: {
        height: Dimensions.get('window').height / 1.3,
        width: Dimensions.get('window').height / 1.2,
        // backgroundColor: 'red',
        borderRadius: 7
    },
    list: {
        height: Dimensions.get('window').height / 1.5,
        width: Dimensions.get('window').width / 2.2
    },
    button: {
        borderRadius: 10,
        color: 'black',
        marginHorizontal: 5
    },
    textButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        // backgroundColor: 'yellow'
    },
    header: {
        flexDirection: 'row',
        height: 90,
        width: '80%',
        paddingTop: 36,
        alignItems: 'center',
        paddingBottom: 36,
        paddingLeft: 20,
        marginHorizontal: 30,
    },
    iconHeader: {
        marginRight: 10
    }
});

export default GridLandscape;