
import React from 'react'
import { Modal, Animated, View, StyleSheet } from 'react-native'
import Colors from './Colors'
import { Heading3, Paragraph } from "./Text";

/* constants ================================================================ */

const INTRO_DELAY_DUR = 300,
  SHOW_DELAY_DUR = 800,
  OUTRO_ANIM_DUR = 150,
  TRANSLATE_Y_DISTANCE = 60;

class Toast extends React.Component {
  static defaultProps = {
    backgroundColor: Colors.colorWithAlpha('tangaroa', 0.95),
    titleColor: Colors.white,
    textColor: Colors.white,
    onComplete: () => {}
  }

  constructor() {
    super()
    this.state = {
      contentAnimation: new Animated.Value(0)
    }

    this.animatedContentStyles = {
      opacity: this.state.contentAnimation,
      transform: [
        {
          translateY: this.state.contentAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [TRANSLATE_Y_DISTANCE, 0]
          })
        }
      ]
    };

    this.intro();

  }

  render() {
    const { title, text, backgroundColor, titleColor, textColor } = this.props;
    if (!title && !text) {
      return null;
    }

    return (
      <Modal transparent={true} animationType="fade" visible={true}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.content,
              { backgroundColor },
              this.animatedContentStyles
            ]}
          >
            {title ? (
              <Heading3 style={[styles.title, { color: titleColor }]}>
                {title}
              </Heading3>
            ) : null}
            {text ? (
              <Paragraph style={[styles.text, { color: textColor }]}>
                {text}
              </Paragraph>
            ) : null}
          </Animated.View>
        </View>
      </Modal>
    )
  }

  intro = () => {
    Animated.spring(this.state.contentAnimation, {
      delay: INTRO_DELAY_DUR,
      toValue: 1
    }).start(this.outro);
  }

  outro = () => {
    Animated.timing(this.state.contentAnimation, {
      delay: SHOW_DELAY_DUR,
      toValue: 0,
      duration: OUTRO_ANIM_DUR
    }).start(this.props.onComplete);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 4
  },
  title: {
    marginBottom: 4,
    textAlign: "center"
  },
  text: {
    textAlign: "center"
  }
})

export default Toast