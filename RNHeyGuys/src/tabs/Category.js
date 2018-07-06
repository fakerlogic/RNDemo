import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Category extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>Category</Text>
      </View>
    );
  }
}

export default Category

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})