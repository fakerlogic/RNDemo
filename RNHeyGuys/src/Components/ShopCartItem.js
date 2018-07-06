
import React from 'react'
import {View, Text, StyleSheet, Image, Button} from 'react-native'


const ShopCartItemType {

}

export default class ShopCartItem extends React.Component {

  

  render() {
    const {
      id,
      type,
      onPress,
      selected,
      skuImage,
      spuName,
      skuName,
      price,
      minNum,
      maxNum,
      number
    } = this.props

    return (

    )
  }

  renderSelectButton = (selected) => {
    return (
      <Button
        onPress={}
        title='dian'
      />
    )
  }

  renderSkuImage = (skuImageUrl) => {
    return (
      <Image source={{uri: skuImageUrl} style={{height: 80, width: 80}}}  />
    )
  }

  rendertitle = (title) => {
    return (
      <Text>{title}</Text>
    )
  }

  renderSubtitle = (subTitle) => {
    return (
      <Text>{subTitle}</Text>
    )
  }

  renderPrice = (price) => {
    return (
      <Text>{price}</Text>
    )
  }


}

const styles = StyleSheet.create({
  
})