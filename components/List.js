import React from 'react'
import { Text, View, StyleSheet, FlatList, Dimensions } from 'react-native'

import { correct } from '../data/data'


const ListItem = props => {
    var textColor = {}
    var styleColor = {}
    if (props.correctAnswers.includes(props.text.toLowerCase())) {
        textColor = {
            color: 'black',
            textDecorationLine: 'line-through'
        }
        styleColor = { backgroundColor: 'yellow' }
    }
    return (
        <View style={[styles.item, styleColor]}>
            <Text style={[styles.itemText, textColor]}>{props.text}</Text>
        </View>
    );
};

const List = props => {

    const numColumns = 2;

    return (
        <View style={styles.container}>
            <FlatList
                data={correct}
                renderItem={({ item }) =>
                    <ListItem
                        text={item}
                        correctAnswers={props.correctAnswers}
                    />}
                numColumns={numColumns}
                keyExtractor={item => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 7
    },
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
});

export default List;