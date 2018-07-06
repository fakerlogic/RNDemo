import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Home extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>Home</Text>
      </View>
    );
  }
}

export default Home


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})