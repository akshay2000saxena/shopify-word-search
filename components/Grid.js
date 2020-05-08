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

import Tile from '../components/Tile'
import List from '../components/List'
import Header from '../components/Header'
import GameOverScreen from '../screens/GameOverScreen'

import { data } from '../data/data'
import { correct } from '../data/data'

var correctStyle = {}
var textColor = {}
var words = correct.map(v => v.toLowerCase());


const Grid = props => {

    const numColumns = 10;
    const [string, updatedString] = useState("");
    const [selectedLetters, setSelectedLetters] = useState([])
    const [correctedLetters, setCorrectedLetters] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])

    if (words.includes(string.toLowerCase())) {
        setCorrectAnswers(correctAnswers => [...correctAnswers, string.toLowerCase()])
        setCorrectedLetters(correctedLetters => [...correctedLetters, ...selectedLetters])
        setSelectedLetters([])
        updatedString("");
        console.log(correctAnswers);
    }

    const item = {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 10,
        borderRadius: 7,
    };

    return (
        <View style={styles.con}>
            {correct.length !== correctAnswers.length ?
                <View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={styles.header}>
                            <Header title="WORD SEARCH" />
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
                        <View style={styles.container}>
                            <FlatList
                                data={data}
                                renderItem={({ item }) =>
                                    <Tile
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

                                            var ans = "";

                                            newArr.forEach((element) => {
                                                for (var i = 0; i < data.length; i++) {
                                                    if (data[i].key === element) {
                                                        ans += data[i].value
                                                    }
                                                }
                                            })

                                            updatedString(ans);
                                        }}

                                        selectedLetters={selectedLetters}
                                        correctLetters={correctedLetters}
                                        style={item}
                                    />}
                                numColumns={numColumns}
                                keyExtractor={item => item.key}
                            />
                        </View>

                        <View style={{ margin: 10 }}>
                            <View style={styles.textButtonContainer}>
                                <View>
                                    <Text style={{ fontSize: 18 }}>Word: {string}</Text>
                                </View>
                                {/* <Button
                                    title="random"
                                    onPress={() => {
                                        rand = wordsearch(correct, 10, 10);
                                        console.log(rand);
                                    }}
                                /> */}

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
    container: {
        height: Dimensions.get('window').height / 1.56,
        backgroundColor: 'white',
        borderRadius: 7
    },
    list: {
        height: Dimensions.get('window').height / 1.5,
    },
    button: {
        borderRadius: 10,
        color: 'black',
        marginHorizontal: 5
    },
    textButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    header: {
        flexDirection: 'row',
        height: 80,
        width: '80%',
        paddingTop: 36,
        alignItems: 'center',
        paddingBottom: 36,
        paddingLeft: 20,
        marginHorizontal: 30
    },
    iconHeader: {
        marginRight: 10
    }
});

export default Grid;