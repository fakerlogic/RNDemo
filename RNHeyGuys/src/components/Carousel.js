import Carousel from 'react-native-snap-carousel'
import React from 'react'

export class MyCarousel extends React.Component {

  renderItem ({item, index}) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{ item.title }</Text>
      </View>
    )
  }
  
  render () {
    return (
      <Carousel
        ref={c => this._carousel = c}
        data={this.state.entries}
        renderItem={this.renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    )
  }
}