import React from "react";
import ReactNative from "react-native";
import Colors from "./Colors";
import Fonts from "./Fonts";
import StyleSheet from "./StyleSheet";

// Text Elements
// =============================================================================

export function Text({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.text, style]} {...props} />;
}

export function Heading1({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h1, style]} {...props} />;
}

export function Heading2({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h2, style]} {...props} />;
}

export function Heading3({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h3, style]} {...props} />;
}

export function Heading4({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h4, style]} {...props} />;
}

export function Heading5({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.h5, style]} {...props} />;
}

export function Paragraph({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.p, style]} {...props} />;
}

// export function Hyperlink({style, ...props}: Object): ReactElement<ReactNative.Text> {
//   return <ReactNative.Text style={[styles.a, style]} {...props} />;
// }

export function HeaderTitle({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.Text style={[styles.headerTitle, style]} {...props} />;
}

export function HorizontalRule({
  style,
  ...props
}: Object): ReactElement<ReactNative.Text> {
  return <ReactNative.View style={[styles.hr, style]} {...props} />;
}

// Styles
// =============================================================================

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.default
  },
  h1: {
    fontFamily: Fonts.h1,
    fontSize: Fonts.normalize(30),
    lineHeight: Fonts.lineHeight(37),
    color: Colors.blue
  },
  h2: {
    fontFamily: Fonts.h2,
    fontSize: Fonts.normalize(23),
    lineHeight: Fonts.lineHeight(27), //, 1.4
    color: Colors.tangaroa,
    letterSpacing: -0.24
  },
  h3: {
    fontFamily: Fonts.h3,
    fontSize: Fonts.normalize(17),
    lineHeight: Fonts.lineHeight(20),
    color: Colors.sapphire,
    letterSpacing: -0.11
  },
  h4: {
    fontFamily: Fonts.h4,
    fontSize: Fonts.normalize(13),
    lineHeight: Fonts.lineHeight(22),
    color: Colors.tangaroa
  },
  h5: {
    fontFamily: Fonts.helvetica,
    fontSize: Fonts.normalize(13),
    lineHeight: Fonts.lineHeight(22),
    color: Colors.tangaroa
  },
  p: {
    fontFamily: Fonts.p,
    fontSize: Fonts.normalize(17),
    lineHeight: Fonts.lineHeight(25), //, 1.25
    color: Colors.tangaroa
  },
  // a: {
  //   color: F8Colors.blue,
  //   textDecorationLine: 'underline',
  // },
  hr: {
    height: 1,
    backgroundColor: Colors.colorWithAlpha("black", 0.1)
  },
  headerTitle: {
    fontFamily: Fonts.fontWithWeight("helvetica", "semibold"),
    ios: { fontSize: 17 },
    android: { fontSize: 20 }
  }
});