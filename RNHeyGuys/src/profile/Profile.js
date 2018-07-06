import React, { Component } from 'react'
import { FlatList, Text, View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { green, yellow } from 'ansi-colors'
import { Toast } from '../common/Toast'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  render() {
    if (this.state.data == null) {
      return (
        <View></View>
      )
    }
    return (
      <View style={styles.container}> 
          {this.renderAvatar('头像')}
          {this.state.data.map((element, index) => this.renderItem(element, index))}
      </View>
    )
  }

  onPress = (index) => {
    return(
      Alert.alert('clicked index: ' + (index + 11))
    )
  }

  renderAvatar = (title) => {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={styles.imageContainer}>
          <Text style={styles.title}>{title}</Text>
          <Image 
            source={require("../img/userInfo/userip.png")} 
            style={styles.image} 
          />
        </View>
        {this.renderSeprator()}
      </View>
    )
  }

  renderItem = (item, index) => {
    return (
      <ProfileItem 
        key={index}
        title={item.title}
        info={item.info}
        arrowShowable={true}
        onPress={ () => this.onPress(index)}
      />
    )
  }

  renderSeprator = () => {
    return (
      <View style={styles.seprator} /> 
    )
  }

  getUserInfo() {
    fetch('http://192.168.11.12:8181//getUserInfo', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => { 
      console.log(responseJson) 
      const data = this.transformData(responseJson.data)
      this.setState({data})
    })
    .catch((error) => { console.log(error) })
  }

  transformData = (data) => {
    return [
      {title: '*店铺名称', info: data.shopName},
      {title: '*用户姓名', info: data.userName},
      {title: '*手机号码', info: data.userPhone},
      {title: '*收获地址管理', info: null}
    ]
  }

}

class ProfileItem extends React.Component {

  props: {
    title: string,
    info?: string,
    arrowShowable: boolean,
    onPress?: () => void
  }

  render() {
    const { title, info, arrowShowable } = this.props
    console.log('item title =====>' + title)
    console.log('item info =====>' + info)

    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.itemContainer}>
            {title ? this.renderTitle(title): null}
            {info ? this.renderInfo(info) : null}
            {arrowShowable ? this.renderArrow() : null}
          </View>
          {this.renderSeprator()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderTitle = (title) => {
    return (
      <Text style={styles.title}>{title}</Text>
    )
  }

  renderInfo = (info) => {
    return (
      <Text style={styles.info}>{info}</Text>
    )
  }

  renderArrow = () => {
    return (
      <Image 
        source={require("../img/rightArrow.png")} 
        style={styles.arrow} 
      />
    )
  }

  renderSeprator = () => {
    return (
      <View style={styles.seprator}> 

      </View>
    )
  }

}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'green'
  },
  imageContainer: {
    padding: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 60
  },
  image: {
    width: 44, 
    height: 44, 
    resizeMode: 'center'
  },
  itemContainer: {
    padding: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 44
  },
  title: {
    fontSize: 15, 
  },
  info: {
    color: 'red', 
    textAlign: 'right', 
    fontSize: 15, 
    flexGrow: 2, 
    marginRight: 12
  },
  seprator: {
    backgroundColor: 'rgba(200, 199, 204, 1)', 
    height: 0.5, 
    marginLeft: 12
  },
  arrow: {
    width: 14, 
    height: 20, 
    flexBasis: 14, 
    resizeMode: 'center'
  }
})