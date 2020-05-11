import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Grid from './components/Grid'




export default function App() {

  const [orientation, setOrientation] = useState(Dimensions.height > Dimensions.width ? true : false)

  Dimensions.addEventListener('change', () => {
    setOrientation(!orientation);
  })

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Grid />
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
