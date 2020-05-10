import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Button,
    TouchableHighlight,
    ScrollView
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import Tile from '../components/Tile'
import List from '../components/List'
import Header from '../components/Header'
import GameOverScreen from '../screens/GameOverScreen'

import { data, correct, colors } from '../data/data'

var wordsearch = require('../GenerateRandomGrid');
var search = wordsearch(['mobile', 'kotlin', 'swift', 'java', 'variable', 'objectivec'], 10, 10)

const reset = (search) => {
    search = wordsearch(['mobile', 'kotlin', 'swift', 'java', 'variable', 'objectivec'], 10, 10);
    var c = 0;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            data[c].value = search.grid[i][j].toUpperCase();
            c++;
        }
    }
}


var words = correct.map(v => v.toLowerCase());
var colorIndex = 0;
var tileColor = colors[colorIndex];
var min = 0;
var sec = 0;

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}


const Grid = props => {

    const numColumns = 10;
    const [string, updatedString] = useState("");
    const [selectedLetters, setSelectedLetters] = useState([])
    const [correctedLetters, setCorrectedLetters] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [colorLetters, setColorLetters] = useState(new Map())
    const [colorString, setColorString] = useState(new Map())
    const [height, setHeight] = useState(Dimensions.get('window').height)
    const [width, setWidth] = useState(Dimensions.get('window').width)
    const [timerStart, setTimerStart] = useState(false)


    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const { mins, secs } = getRemaining(remainingSecs);

    const [constTime, setConstTime] = useState("")

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(remainingSecs => remainingSecs + 1);
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);


    useEffect(() => {
        const updateLayout = () => {
            setHeight(Dimensions.get('window').height)
            setWidth(Dimensions.get('window').width)
        };

        Dimensions.addEventListener('change', updateLayout)
        // return () => {
        //     Dimensions.removeEventListener('change', updateLayout)
        // };
    })


    if (words.includes(string.toLowerCase())) {
        setCorrectAnswers(correctAnswers => [...correctAnswers, string.toLowerCase()])
        setCorrectedLetters(correctedLetters => [...correctedLetters, ...selectedLetters])
        setColorString(new Map(colorString.set(string.toLowerCase(), colors[colorIndex])))
        if (correct.length === correctAnswers.length) {
            setConstTime(`${mins} : ${secs}`)
        }
        var colorMap = {};
        for (var i = 0; i < selectedLetters.length; i++) {
            colorMap[selectedLetters[i]] = colors[colorIndex];
        }
        min = mins
        sec = secs
        setColorLetters(Object.assign({}, colorLetters, colorMap));
        setSelectedLetters([])
        updatedString("");
        colorIndex++;
    }



    const item = {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: width / 10,
        borderRadius: 7,
    };

    const landscapeItem = {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: height / 14,
        borderRadius: 7,
    }

    const tileColor = colors[colorIndex];

    if (height < 500) {
        return (
            <View style={styles.landscape}>
                {correct.length !== correctAnswers.length ?
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={styles.header}>
                            <Header title="Word Search" />
                            <View style={styles.secondHeader}>
                                <Text style={styles.timer}>{`${mins} : ${secs}`}</Text>
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
                                            setColorLetters(new Map());
                                            colorIndex = 0;
                                            setRemainingSecs(0);
                                            setIsActive(false);
                                            // console.log(search.grid.forEach(function (row) { console.log(row.join(' ')); }))
                                            reset(search)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={styles.landscapeContainer, { height: height / 1.3, width: height / 1.2 }}>
                                <FlatList
                                    data={data}
                                    renderItem={({ item }) =>
                                        <Tile
                                            text={item.value}
                                            ind={item.key}
                                            tileColor={tileColor}
                                            colors={colors}
                                            colorLetters={colorLetters}
                                            startWordString={item => {
                                                if (selectedLetters.includes(item)) {
                                                    updatedString(string.replace(item, ""))
                                                } else {
                                                    updatedString(string.concat(item))
                                                }
                                            }}
                                            selectLetters={item => {
                                                setSelectedLetters(selectedLetters => [...selectedLetters, item])
                                                setIsActive(true)
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

                                <View style={styles.list, { height: height / 1.5, width: width / 2.2 }}>
                                    <List
                                        colorString={colorString}
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
                        setColorString={setColorString}
                        setColorLetters={setColorLetters}
                        changeIndex={item => {
                            colorIndex = item;
                        }}
                        setIsActive={setIsActive}
                        setRemainingSecs={setRemainingSecs}
                        min={min}
                        sec={sec}
                        search={search}
                        reset={reset}
                    />}

            </View>

        );
    } else {

        return (
            <View style={styles.con}>
                {correct.length !== correctAnswers.length ?
                    <View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={styles.header}>
                                <Header title="Word Search" />
                                <View style={styles.secondHeader}>
                                    <Text style={styles.timer}>{`${mins} : ${secs}`}</Text>
                                    <View style={styles.iconHeader}>
                                        <Ionicons
                                            name="ios-refresh"
                                            size={32}
                                            color="black"
                                            onPress={() => {
                                                updatedString("");
                                                setSelectedLetters([]);
                                                setCorrectedLetters([])
                                                setCorrectAnswers([]);
                                                setColorLetters(new Map());
                                                colorIndex = 0;
                                                setRemainingSecs(0);
                                                setIsActive(false);
                                                // console.log(search.grid.forEach(function (row) { console.log(row.join(' ')); }))
                                                reset(search)
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.container, { height: height / 1.56 }}>
                                <FlatList
                                    data={data}
                                    renderItem={({ item }) =>
                                        <Tile
                                            text={item.value}
                                            ind={item.key}
                                            tileColor={tileColor}
                                            colors={colors}
                                            colorLetters={colorLetters}
                                            startWordString={item => {
                                                if (selectedLetters.includes(item)) {
                                                    updatedString(string.replace(item, ""))
                                                } else {
                                                    updatedString(string.concat(item))
                                                }
                                            }}
                                            selectLetters={item => {
                                                setSelectedLetters(selectedLetters => [...selectedLetters, item])
                                                setIsActive(true)
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
                                        colorString={colorString}
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
                        setColorString={setColorString}
                        setColorLetters={setColorLetters}
                        changeIndex={item => {
                            colorIndex = item;
                        }}
                        setIsActive={setIsActive}
                        setRemainingSecs={setRemainingSecs}
                        min={min}
                        sec={sec}
                        search={search}
                        reset={reset}
                    />}

            </View>

        );
    }
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
        // backgroundColor: 'red'
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
        width: '65%',
        paddingTop: 36,
        alignItems: 'center',
        // justifyContent: '',
        paddingBottom: 36,
        paddingLeft: 65,
        marginHorizontal: 30,
    },
    iconHeader: {
        marginRight: 10,
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    gameOver: {
        opacity: 0.6
    },
    secondHeader: {
        flexDirection: 'row',
        marginRight: 20,
        // backgroundColor: 'red',
        width: 200,
        paddingHorizontal: 10
    },
    timer: {
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 5,
        fontSize: 18
    }
});

export default Grid;