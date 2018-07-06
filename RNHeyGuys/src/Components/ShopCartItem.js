
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


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

    )
  }

  renderSkuImage = (skuImageUrl) => {
    return (

    )
  }

  rendertitle = (title) => {
    return (

    )
  }

  renderSubtitle = (subTitle) => {
    return (

    )
  }

  renderPrice = (price) => {
    return (

    )
  }


}

const styles = StyleSheet.create({
  
})