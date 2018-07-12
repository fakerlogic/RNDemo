import React from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import Toast from 'react-native-easy-toast'
import Icon from 'react-native-vector-icons/FontAwesome'



class Mine extends React.Component {

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true,
    navBarButtonColor: 'green',
    statusBarBlur: true
  }

  static navigatorButtons = {
    leftButtons: [
      {
        title: '登录',
        id: 'login',
        buttonColor: 'red',
        buttonFontSize: 15
      }
    ],
    rightButtons: [
      {
        icon: require('../img/mine/settingicon.png'),
        id: 'setting',
        title: '设置',
        buttonColor: 'red',
        buttonFontSize: 15
      },
      {
        icon: require('../img/mine/sign.png'),
        id: 'sign',
        title: '签到',
        buttonColor: 'red',
        buttonFontSize: 15
      }
    ]
  }
  
  state = {
    data: null,
    userIcon: null
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  onNavigatorEvent = event => {
    console.log('---------onNavigatorEvent------------')
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'setting') {
        this.refs.toast.show('点击了设置按钮', 500)
      }
      if (event.id == 'sign') {
        this.refs.toast.show('点击了签到按钮', 500)
      }
      if (event.id == 'login') {
        this.props.navigator && this.props.navigator.push({
          screen: 'RNHeyGuys.Login',
          title: '登录',
          animated: true,
          passProps: {
            type: 'login'
          },
          navigatorStyle: {
            tabBarHidden: true
          }
        })
      }
    }
  }

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
        <Text style={styles.text}>{this.state.data}</Text>
        <Button 
          onPress={this.onPressToProfile}
          title='用户信息'
          color='red'
        />

        <Toast ref='toast' positionValue={200} opacity={0.8} />
      </View>
    )
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
