import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <View style={{ width: 300, justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={styles.text}> You Win!</Text>
                </View>
                <View style={{ width: 300, justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={styles.text2}> You took: {props.min}:{props.sec} mins</Text>
                </View>
                <View style={{ width: 300, justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={styles.text2}> Play Again?</Text>
                </View>
                <View style={styles.iconHeader}>
                    <Ionicons
                        name="ios-refresh"
                        size={50}
                        color="black"
                        onPress={() => {
                            props.updatedString("");
                            props.setSelectedLetters([]);
                            props.setCorrectedLetters([])
                            props.setCorrectAnswers([])
                            props.setColorString(new Map())
                            props.changeIndex(0)
                            props.setIsActive(true)
                            props.setRemainingSecs(0)
                        }}
                    />
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 22,
        textAlign: 'center',
        // margin: 15,
        fontWeight: 'bold'
    },
    iconHeader: {
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }

});

export default GameOverScreen;