import React from 'react'
import { View, Text, StyleSheet, SectionList } from 'react-native'

class ShopCart extends React.Component {

  componentDidMount() {
    this.props.navigator.setTabBadge({
      badge: 12
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        >
        </SectionList>
      </View>
    );
  }
}


export default ShopCart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
