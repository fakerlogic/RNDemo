
import React from 'react'
import {View, Text, StyleSheet, Image, Button} from 'react-native'



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
      <View style={styles.container}>
        {this.renderSkuImage('https://heyguys-image.oss-cn-shenzhen.aliyuncs.com/29a8a23c739e77f5156bfbf9e360536d.png')}
        
        <View style={styles.textContainer}>
          {this.rendertitle('五得利五星特精粉(东明)')}
          {this.renderSubtitle('五得利五星特精粉（东明）25KG/包')}
          {this.renderPrice(12)}
        </View>
      </View>
    )
  }

  // renderSelectButton = (selected) => {
  //   return (
  //     <Button
  //       onPress={}
  //       title='dian'
  //     />
  //   )
  // }

  renderSkuImage = (skuImageUrl) => {
    return (
      <Image source={{uri: skuImageUrl}} style={{height: 80, width: 80, backgroundColor: 'green'}} />
    )
  }

  rendertitle = (title) => {
    return (
      <Text style={{color: 'red', fontSize: 15}}>{title}</Text>
    )
  }

  renderSubtitle = (subTitle) => {
    return (
      <Text style={{color: 'blue', fontSize: 13}}>{subTitle}</Text>
    )
  }

  renderPrice = (price) => {
    return (
      <Text style={{fontSize: 20, color: 'red'}}>{'¥' + price}</Text>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    // justifyContent: 'center',
    // marginLeft: 16,
    alignItems: 'flex-start',
  },
  textContainer: {
    backgroundColor: 'white',
    marginLeft: 8,
    // marginRight: 20,
  }
})