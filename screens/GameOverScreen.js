import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}> You Win!</Text>
            <Text style={styles.text2}> Play Again?</Text>
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
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconHeader: {

    },
    text: {
        fontSize: 36,
        // margin:,
        height: 100
    },
    text2: {
        fontSize: 22,
        margin: 15
    }

});

export default GameOverScreen;