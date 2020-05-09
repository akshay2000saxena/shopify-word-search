import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Portrait } from 'react-native';

import Grid from './components/Grid'
import GridLandscape from './components/GridLandscape'
import Header from './components/Header'
import List from './components/List'

export default function App() {

  const [orientation, setOrientation] = useState(Dimensions.height > Dimensions.width ? true : false)

  Dimensions.addEventListener('change', () => {
    setOrientation(!orientation);
  })

  // let tag;

  // if (orientation) {
  //   tag = <Grid />;
  // } else {
  //   tag = <GridLandscape />
  // }

  // var tag = orientation ? <Grid /> : <GridLandscape />


  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Grid />
        {/* {tag} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  grid: {
    height: Dimensions.get('window').height / 1.1
  },
});
