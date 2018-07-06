import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

class Mine extends React.Component {

  onPressToProfile = () => {
    this.props.navigator.push({
      screen: 'RNHeyGuys.Profile',
      title: '我的信息',
      animated: true,
      backButtonTitle: '返回'
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Mine</Text>
        <Button 
          onPress={this.onPressToProfile}
          title='用户信息'
          color='red'
        />
      </View>
    );
  }
}

export default Mine

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
